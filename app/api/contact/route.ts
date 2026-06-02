import { NextResponse } from "next/server";
import {
  isValidPayload,
  parseDeliverables,
  parseSkills,
  readAttachments,
  type ContactPayload,
} from "@/lib/contactValidation";
import {
  contactEmailConfigured,
  sendContactEmail,
} from "@/lib/sendContactEmail";

export const runtime = "nodejs";
export const maxDuration = 30;

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 8;
const MAX_BODY_BYTES = 8 * 1024 * 1024;
const hits = new Map<string, { count: number; reset: number }>();

function clientKey(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || now > entry.reset) {
    hits.set(key, { count: 1, reset: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_MAX;
}

function bodyTooLarge(request: Request): boolean {
  const length = request.headers.get("content-length");
  if (!length) return false;
  const bytes = Number.parseInt(length, 10);
  return Number.isFinite(bytes) && bytes > MAX_BODY_BYTES;
}

async function parseContactRequest(request: Request): Promise<
  | { ok: true; payload: ContactPayload; files: File[] }
  | { ok: false; error: string; status: number }
> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    const formKind = String(form.get("formKind") ?? "business");
    const payload: Partial<ContactPayload> =
      formKind === "career"
        ? {
            formKind: "career",
            fullName: String(form.get("fullName") ?? ""),
            country: String(form.get("country") ?? ""),
            skills: parseSkills(form.get("skills") as string | null),
            position: String(form.get("position") ?? ""),
            description: String(form.get("description") ?? ""),
            email: String(form.get("email") ?? ""),
            companyWebsite: String(form.get("companyWebsite") ?? ""),
          }
        : {
            formKind: "business",
            projectType: String(form.get("projectType") ?? ""),
            industry: String(form.get("industry") ?? ""),
            deliverables: parseDeliverables(
              form.get("deliverables") as string | null
            ),
            budget: String(form.get("budget") ?? ""),
            description: String(form.get("description") ?? ""),
            email: String(form.get("email") ?? ""),
            companyWebsite: String(form.get("companyWebsite") ?? ""),
          };

    const files = form
      .getAll("files")
      .filter((entry): entry is File => entry instanceof File && entry.size > 0);

    if (!isValidPayload(payload)) {
      return {
        ok: false,
        error: "Please complete all required fields.",
        status: 400,
      };
    }

    return { ok: true, payload, files };
  }

  let body: Partial<ContactPayload>;
  try {
    body = (await request.json()) as Partial<ContactPayload>;
    if (!body.formKind) {
      body = { formKind: "business", ...body };
    }
  } catch {
    return {
      ok: false,
      error: "Invalid request body.",
      status: 400,
    };
  }

  if (!isValidPayload(body)) {
    return {
      ok: false,
      error: "Please complete all required fields.",
      status: 400,
    };
  }

  return { ok: true, payload: body, files: [] };
}

export async function POST(request: Request) {
  try {
    if (bodyTooLarge(request)) {
      return NextResponse.json(
        { error: "Request is too large. Reduce attachment size and try again." },
        { status: 413 }
      );
    }

    if (isRateLimited(clientKey(request))) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    const parsed = await parseContactRequest(request);
    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: parsed.status });
    }

    const { payload, files } = parsed;
    const attachmentResult = await readAttachments(files);
    if (!attachmentResult.ok) {
      return NextResponse.json({ error: attachmentResult.error }, { status: 400 });
    }

    const webhook = process.env.CONTACT_WEBHOOK_URL?.trim();
    const emailEnabled = contactEmailConfigured();
    const requireDelivery =
      process.env.CONTACT_REQUIRE_WEBHOOK === "true" ||
      process.env.VERCEL_ENV === "production";

    if (requireDelivery && !webhook && !emailEnabled) {
      console.error(
        "[contact] Set CONTACT_NOTIFY_EMAIL + RESEND_API_KEY and/or CONTACT_WEBHOOK_URL"
      );
      return NextResponse.json(
        {
          error:
            "Contact form is temporarily unavailable. Please email hello@loudsrl.com directly.",
        },
        { status: 503 }
      );
    }

    const submittedAt = new Date().toISOString();
    const emailPayload =
      payload.formKind === "career"
        ? {
            formKind: "career" as const,
            fullName: payload.fullName,
            country: payload.country,
            skills: payload.skills,
            position: payload.position,
            description: payload.description.trim(),
            email: payload.email.trim(),
            attachmentCount: attachmentResult.attachments.length,
            attachments: attachmentResult.attachments,
            submittedAt,
          }
        : {
            formKind: "business" as const,
            projectType: payload.projectType,
            industry: payload.industry,
            deliverables: payload.deliverables ?? [],
            budget: payload.budget,
            description: payload.description.trim(),
            email: payload.email.trim(),
            attachmentCount: attachmentResult.attachments.length,
            attachments: attachmentResult.attachments,
            submittedAt,
          };

    const webhookPayload =
      payload.formKind === "career"
        ? {
            source: "loudsrl.com",
            formKind: "career",
            fullName: payload.fullName,
            country: payload.country,
            skills: payload.skills,
            position: payload.position,
            description: payload.description.trim(),
            email: payload.email.trim(),
            attachmentCount: attachmentResult.attachments.length,
            submittedAt,
          }
        : {
            source: "loudsrl.com",
            formKind: "business",
            projectType: payload.projectType,
            industry: payload.industry,
            deliverables: payload.deliverables ?? [],
            budget: payload.budget,
            description: payload.description.trim(),
            email: payload.email.trim(),
            attachmentCount: attachmentResult.attachments.length,
            submittedAt,
          };

    if (emailEnabled) {
      const emailed = await sendContactEmail(emailPayload);
      if (!emailed.ok) {
        return NextResponse.json(
          { error: "Unable to send your message. Please try again later." },
          { status: 502 }
        );
      }
    }

    if (webhook) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webhookPayload),
        signal: AbortSignal.timeout(20_000),
      });

      if (!res.ok) {
        console.error("[contact] webhook failed", res.status);
        return NextResponse.json(
          { error: "Unable to send your message. Please try again later." },
          { status: 502 }
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.name === "TimeoutError") {
      return NextResponse.json(
        { error: "Unable to send your message. Please try again later." },
        { status: 504 }
      );
    }
    console.error("[contact]", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
