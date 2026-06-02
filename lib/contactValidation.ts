export type ContactBusinessPayload = {
  formKind: "business";
  projectType: string;
  industry: string;
  deliverables: string[];
  budget: string;
  description: string;
  email: string;
  companyWebsite?: string;
};

export type ContactCareerPayload = {
  formKind: "career";
  fullName: string;
  country: string;
  skills: string[];
  position: string;
  description: string;
  email: string;
  companyWebsite?: string;
};

export type ContactPayload = ContactBusinessPayload | ContactCareerPayload;

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function honeypotFilled(companyWebsite?: string): boolean {
  return Boolean(companyWebsite && String(companyWebsite).trim().length > 0);
}

export function isValidBusinessPayload(
  body: Partial<ContactBusinessPayload>
): body is ContactBusinessPayload {
  if (honeypotFilled(body.companyWebsite)) return false;

  return (
    body.formKind === "business" &&
    typeof body.projectType === "string" &&
    body.projectType.trim().length > 0 &&
    typeof body.industry === "string" &&
    body.industry.trim().length > 0 &&
    typeof body.budget === "string" &&
    body.budget.length > 0 &&
    typeof body.description === "string" &&
    body.description.trim().length >= 10 &&
    body.description.trim().length <= 5000 &&
    typeof body.email === "string" &&
    isValidEmail(body.email)
  );
}

export function isValidCareerPayload(
  body: Partial<ContactCareerPayload>
): body is ContactCareerPayload {
  if (honeypotFilled(body.companyWebsite)) return false;

  return (
    body.formKind === "career" &&
    typeof body.fullName === "string" &&
    body.fullName.trim().length > 0 &&
    typeof body.country === "string" &&
    body.country.trim().length > 0 &&
    Array.isArray(body.skills) &&
    body.skills.length > 0 &&
    typeof body.position === "string" &&
    body.position.length > 0 &&
    typeof body.description === "string" &&
    body.description.trim().length >= 10 &&
    body.description.trim().length <= 5000 &&
    typeof body.email === "string" &&
    isValidEmail(body.email)
  );
}

export function isValidPayload(body: Partial<ContactPayload>): body is ContactPayload {
  if (body.formKind === "career") {
    return isValidCareerPayload(body as Partial<ContactCareerPayload>);
  }
  return isValidBusinessPayload({
    formKind: "business",
    ...body,
  } as Partial<ContactBusinessPayload>);
}

export type ContactAttachment = {
  name: string;
  type: string;
  size: number;
  base64: string;
};

const MAX_FILES = 5;
const MAX_FILE_BYTES = 2 * 1024 * 1024;
const MAX_TOTAL_BYTES = 6 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
]);

export function parseDeliverables(raw: string | null): string[] {
  if (!raw?.trim()) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) {
      return parsed.filter((item): item is string => typeof item === "string");
    }
  } catch {
    /* fall through */
  }
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function parseSkills(raw: string | null): string[] {
  return parseDeliverables(raw);
}

export async function readAttachments(
  files: File[]
): Promise<{ ok: true; attachments: ContactAttachment[] } | { ok: false; error: string }> {
  if (files.length > MAX_FILES) {
    return { ok: false, error: `You can attach up to ${MAX_FILES} files.` };
  }

  let total = 0;
  const attachments: ContactAttachment[] = [];

  for (const file of files) {
    if (!ALLOWED_TYPES.has(file.type)) {
      return {
        ok: false,
        error: "Only JPG, PNG, WebP, GIF, and PDF files are allowed.",
      };
    }
    if (file.size > MAX_FILE_BYTES) {
      return { ok: false, error: "Each file must be 2 MB or smaller." };
    }
    total += file.size;
    if (total > MAX_TOTAL_BYTES) {
      return { ok: false, error: "Total attachment size must be 6 MB or smaller." };
    }

    const buf = Buffer.from(await file.arrayBuffer());
    attachments.push({
      name: file.name,
      type: file.type,
      size: file.size,
      base64: buf.toString("base64"),
    });
  }

  return { ok: true, attachments };
}
