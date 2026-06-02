import type { ContactAttachment } from "@/lib/contactValidation";

export type ContactEmailPayload =
  | {
      formKind: "business";
      projectType: string;
      industry: string;
      deliverables: string[];
      budget: string;
      description: string;
      email: string;
      attachmentCount: number;
      attachments: ContactAttachment[];
      submittedAt: string;
    }
  | {
      formKind: "career";
      fullName: string;
      country: string;
      skills: string[];
      position: string;
      description: string;
      email: string;
      attachmentCount: number;
      attachments: ContactAttachment[];
      submittedAt: string;
    };

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtmlBody(payload: ContactEmailPayload): string {
  if (payload.formKind === "career") {
    const skills =
      payload.skills.length > 0 ? payload.skills.map(escapeHtml).join(", ") : "—";
    return `
    <h2>New LOUD career application</h2>
    <p><strong>Submitted:</strong> ${escapeHtml(payload.submittedAt)}</p>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      <tr><td><strong>Name</strong></td><td>${escapeHtml(payload.fullName)}</td></tr>
      <tr><td><strong>Country</strong></td><td>${escapeHtml(payload.country)}</td></tr>
      <tr><td><strong>Position</strong></td><td>${escapeHtml(payload.position)}</td></tr>
      <tr><td><strong>Skills</strong></td><td>${skills}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(payload.email)}</td></tr>
    </table>
    <p><strong>Description</strong></p>
    <p style="white-space:pre-wrap;">${escapeHtml(payload.description)}</p>
    <p><strong>Attachments:</strong> ${payload.attachmentCount}</p>
  `.trim();
  }

  const deliverables =
    payload.deliverables.length > 0
      ? payload.deliverables.map(escapeHtml).join(", ")
      : "—";

  return `
    <h2>New LOUD contact form submission</h2>
    <p><strong>Submitted:</strong> ${escapeHtml(payload.submittedAt)}</p>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      <tr><td><strong>Project type</strong></td><td>${escapeHtml(payload.projectType)}</td></tr>
      <tr><td><strong>Industry</strong></td><td>${escapeHtml(payload.industry)}</td></tr>
      <tr><td><strong>Budget</strong></td><td>${escapeHtml(payload.budget)}</td></tr>
      <tr><td><strong>Deliverables</strong></td><td>${deliverables}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(payload.email)}</td></tr>
    </table>
    <p><strong>Description</strong></p>
    <p style="white-space:pre-wrap;">${escapeHtml(payload.description)}</p>
    <p><strong>Attachments:</strong> ${payload.attachmentCount}</p>
  `.trim();
}

function buildTextBody(payload: ContactEmailPayload): string {
  if (payload.formKind === "career") {
    return [
      "New LOUD career application",
      "",
      `Submitted: ${payload.submittedAt}`,
      `Name: ${payload.fullName}`,
      `Country: ${payload.country}`,
      `Position: ${payload.position}`,
      `Skills: ${payload.skills.join(", ") || "—"}`,
      `Email: ${payload.email}`,
      "",
      "Description:",
      payload.description,
      "",
      `Attachments: ${payload.attachmentCount}`,
    ].join("\n");
  }

  return [
    "New LOUD contact form submission",
    "",
    `Submitted: ${payload.submittedAt}`,
    `Project type: ${payload.projectType}`,
    `Industry: ${payload.industry}`,
    `Budget: ${payload.budget}`,
    `Deliverables: ${payload.deliverables.join(", ") || "—"}`,
    `Email: ${payload.email}`,
    "",
    "Description:",
    payload.description,
    "",
    `Attachments: ${payload.attachmentCount}`,
  ].join("\n");
}

export function contactEmailConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY?.trim() &&
      process.env.CONTACT_NOTIFY_EMAIL?.trim()
  );
}

/**
 * Sends form submission to CONTACT_NOTIFY_EMAIL via Resend.
 * @see https://resend.com/docs/api-reference/emails/send-email
 */
export async function sendContactEmail(
  payload: ContactEmailPayload
): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_NOTIFY_EMAIL?.trim();

  if (!apiKey || !to) {
    return { ok: false, error: "Email is not configured." };
  }

  const from =
    process.env.CONTACT_FROM_EMAIL?.trim() ??
    "LOUD Contact <onboarding@resend.dev>";

  const subject =
    payload.formKind === "career"
      ? `Career application: ${payload.position} — ${payload.fullName}`
      : `New contact: ${payload.projectType} — ${payload.industry}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html: buildHtmlBody(payload),
      text: buildTextBody(payload),
      attachments: payload.attachments.map((file) => ({
        filename: file.name,
        content: file.base64,
      })),
    }),
    signal: AbortSignal.timeout(20_000),
  });

  if (!res.ok) {
    let detail = "";
    try {
      const body = (await res.json()) as { message?: string };
      detail = body.message ? `: ${body.message}` : "";
    } catch {
      /* ignore */
    }
    console.error("[contact] Resend failed", res.status, detail);
    return {
      ok: false,
      error: `Email delivery failed (${res.status})${detail}`,
    };
  }

  return { ok: true };
}
