import { pillars } from "@/data/pillars";

export const PILLAR_ORDER = ["think", "design", "develop"] as const;

export type PillarSlug = (typeof PILLAR_ORDER)[number];

export type Pillar = (typeof pillars)[number];

export function toRoman(n: number): string {
  const numerals = ["I", "II", "III", "IV", "V", "VI"];
  return numerals[n - 1] ?? String(n);
}

export function getPrevIndex(index: number, length: number): number {
  return (index - 1 + length) % length;
}

export function getNextIndex(index: number, length: number): number {
  return (index + 1) % length;
}

export function slugToPillarIndex(slug: string): number {
  const clean = slug.replace(/^\/?pillars\//, "").replace(/^\//, "");
  return pillars.findIndex((p) => p.slug === clean);
}
