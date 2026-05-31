import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const LIVE = JSON.parse(
  fs.readFileSync(path.join(ROOT, "scripts/case-studies-live.json"), "utf8")
);

const ORDER = [
  "aste360",
  "balloon",
  "bike-room",
  "catasto-20",
  "cercacasa",
  "ennevolte",
  "shift2cal",
  "shiftpilot",
  "shopify-tech",
  "whuis",
  "witz",
];

function lexicalToText(value) {
  if (!value) return "";
  if (typeof value === "string") return value.trim();
  if (value.text) return String(value.text).trim();
  if (value.root) return lexicalToText(value.root);
  if (Array.isArray(value.children)) {
    return value.children.map(lexicalToText).join("").trim();
  }
  return "";
}

function mediaFromPayload(item) {
  if (!item || typeof item === "number") return null;
  return {
    url: `/media/${item.filename}`,
    alt: (item.alt ?? "").trim(),
    width: item.width ?? undefined,
    height: item.height ?? undefined,
  };
}

function transformCaseStudy(slug, entry) {
  const cs = entry.caseStudy;

  return {
    slug: cs.slug,
    title: cs.name,
    subtitle: cs.previewDescription,
    industry: cs.industryName,
    loudX: cs.loudX,
    link: cs.link ?? null,
    linkLabel: cs.linkLabel ?? null,
    projectTypeLabel: cs.projectTypeLabel,
    stageLabel: cs.stageLabel,
    deliverablesLabel: cs.deliverablesLabel,
    projectType: cs.projectType ?? [],
    stage: cs.stage ?? "",
    deliverables: cs.deliverables ?? [],
    status: cs.status ?? "",
    numberOfUsers: cs.numberOfUsers ?? "",
    introduction: lexicalToText(cs.introduction),
    previewImage: mediaFromPayload(cs.previewImage)?.url ?? "",
    mainPic: mediaFromPayload(cs.mainPic),
    functionalities: (cs.functionalities ?? []).map((fn) => ({
      title: fn.title,
      layout: fn.layout,
      description: lexicalToText(fn.description),
      secondDescription: fn.secondDescription
        ? lexicalToText(fn.secondDescription)
        : null,
      gallery: (fn.gallery ?? [])
        .map(mediaFromPayload)
        .filter(Boolean),
    })),
    testimonial: cs.cit?.author
      ? {
          quote: lexicalToText(cs.cit.citDesc),
          author: cs.cit.author,
          role: cs.cit.jobDescription,
        }
      : null,
    metaTitle: cs.metaTitle ?? `${cs.name} | LOUD`,
    metaDescription: cs.metaDescription ?? lexicalToText(cs.introduction),
    services: cs.deliverables ?? [],
    platform: cs.projectType?.[0] ?? "",
    year: "",
    description: lexicalToText(cs.introduction),
    challenge: lexicalToText(cs.functionalities?.[0]?.description),
    solution: lexicalToText(cs.functionalities?.[1]?.description),
  };
}

const caseStudies = ORDER.map((slug) => {
  const entry = LIVE[slug];
  if (!entry) throw new Error(`Missing live data for ${slug}`);
  return transformCaseStudy(slug, entry);
});

const allCaseStudies = caseStudies.map(({ slug, title }) => ({
  slug,
  name: title,
}));

const output = `/* Auto-generated from scripts/case-studies-live.json — do not edit by hand */

export type CaseStudyMedia = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

export type CaseStudyFunctionality = {
  title: string;
  layout: string;
  description: string;
  secondDescription: string | null;
  gallery: CaseStudyMedia[];
};

export type CaseStudyTestimonial = {
  quote: string;
  author: string;
  role: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  industry: string;
  loudX: string;
  link: string | null;
  linkLabel: string | null;
  projectTypeLabel: string;
  stageLabel: string;
  deliverablesLabel: string;
  projectType: string[];
  stage: string;
  deliverables: string[];
  status: string;
  numberOfUsers: string;
  introduction: string;
  previewImage: string;
  mainPic: CaseStudyMedia | null;
  functionalities: CaseStudyFunctionality[];
  testimonial: CaseStudyTestimonial | null;
  metaTitle: string;
  metaDescription: string;
  /** Legacy fields used by cards / rows */
  services: string[];
  platform: string;
  year: string;
  description: string;
  challenge: string;
  solution: string;
};

export const caseStudyOrder = ${JSON.stringify(ORDER)} as const;

export const allCaseStudies = ${JSON.stringify(allCaseStudies, null, 2)} as const;

export const caseStudies = ${JSON.stringify(caseStudies, null, 2)} as const satisfies readonly CaseStudy[];

export type CaseStudySlug = (typeof caseStudies)[number]["slug"];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export function getNextCaseStudy(slug: string) {
  const idx = caseStudyOrder.indexOf(slug as CaseStudySlug);
  if (idx === -1) return caseStudies[0];
  return caseStudies[(idx + 1) % caseStudies.length];
}
`;

fs.writeFileSync(path.join(ROOT, "data/caseStudies.ts"), output);
console.log(`Wrote ${caseStudies.length} case studies to data/caseStudies.ts`);
