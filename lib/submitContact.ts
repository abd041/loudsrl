export type ContactBusinessSubmitFields = {
  formKind: "business";
  projectType: string;
  industry: string;
  deliverables: string[];
  budget: string;
  description: string;
  email: string;
  companyWebsite: string;
  files?: File[];
};

export type ContactCareerSubmitFields = {
  formKind: "career";
  fullName: string;
  country: string;
  skills: string[];
  position: string;
  description: string;
  email: string;
  companyWebsite: string;
  files?: File[];
};

export type ContactSubmitFields =
  | ContactBusinessSubmitFields
  | ContactCareerSubmitFields;

const SUBMIT_TIMEOUT_MS = 25_000;
const RETRYABLE = new Set([502, 503, 429]);

import { reportError } from "@/lib/observability/reportError";

export async function submitContact(
  fields: ContactSubmitFields,
  options?: { signal?: AbortSignal }
): Promise<{ ok: true } | { ok: false; error: string }> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);

  const onExternalAbort = () => controller.abort();
  options?.signal?.addEventListener("abort", onExternalAbort);

  const attempt = async (): Promise<Response> => {
    const { files = [], ...rest } = fields;

    if (files.length > 0) {
      const form = new FormData();
      form.set("formKind", rest.formKind);
      if (rest.formKind === "career") {
        form.set("fullName", rest.fullName);
        form.set("country", rest.country);
        form.set("skills", JSON.stringify(rest.skills));
        form.set("position", rest.position);
        form.set("description", rest.description.trim());
        form.set("email", rest.email.trim());
      } else {
        form.set("projectType", rest.projectType);
        form.set("industry", rest.industry);
        form.set("deliverables", JSON.stringify(rest.deliverables));
        form.set("budget", rest.budget);
        form.set("description", rest.description.trim());
        form.set("email", rest.email.trim());
      }
      form.set("companyWebsite", rest.companyWebsite);
      for (const file of files) {
        form.append("files", file);
      }
      return fetch("/api/contact", {
        method: "POST",
        body: form,
        signal: controller.signal,
      });
    }

    return fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rest),
      signal: controller.signal,
    });
  };

  try {
    let res = await attempt();
    if (RETRYABLE.has(res.status)) {
      await new Promise((r) => window.setTimeout(r, 800));
      res = await attempt();
    }

    let data: { error?: string } = {};
    try {
      data = (await res.json()) as { error?: string };
    } catch {
      /* non-JSON error body */
    }

    if (!res.ok) {
      return {
        ok: false,
        error: data.error ?? "Unable to send your message. Please try again.",
      };
    }

    return { ok: true };
  } catch (error) {
    reportError(error, { surface: "submitContact" });
    if (error instanceof DOMException && error.name === "AbortError") {
      return {
        ok: false,
        error:
          "The request timed out. Check your connection and try again, or email hello@loudsrl.com.",
      };
    }
    return {
      ok: false,
      error: "Unable to send your message. Please try again.",
    };
  } finally {
    window.clearTimeout(timeout);
    options?.signal?.removeEventListener("abort", onExternalAbort);
  }
}
