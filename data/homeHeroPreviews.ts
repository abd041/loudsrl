import { pillars } from "./pillars";

export type HomeHeroPreview = {
  key: string;
  label: string;
  title: string;
  body: string;
  href: string;
  eyebrow?: string;
};

export const HOME_HERO_PREVIEWS: HomeHeroPreview[] = [
  {
    key: "home",
    label: "LOUD",
    eyebrow: "I•VI PILLARS",
    title: "We make digital products.",
    body: "",
    href: "/",
  },
  {
    key: "think",
    label: "Think",
    eyebrow: pillars[0].eyebrow,
    title: pillars[0].heroTitle,
    body: pillars[0].heroBody,
    href: "/pillars/think",
  },
  {
    key: "design",
    label: "Design",
    eyebrow: pillars[1].eyebrow,
    title: pillars[1].heroTitle,
    body: pillars[1].heroBody,
    href: "/pillars/design",
  },
  {
    key: "develop",
    label: "Develop",
    eyebrow: pillars[2].eyebrow,
    title: pillars[2].heroTitle,
    body: pillars[2].heroBody,
    href: "/pillars/develop",
  },
  {
    key: "manifesto",
    label: "Manifesto",
    eyebrow: "MANIFESTO",
    title: "We are in a constant state of becoming.",
    body: "",
    href: "/manifesto",
  },
  {
    key: "studio",
    label: "Studio",
    eyebrow: "STUDIO",
    title: "A new model for building companies",
    body:
      "Do you have a business idea? Are you an expert in a specific market? But do you lack a team of technology enthusiasts? We are here for that.",
    href: "/studio",
  },
];

export function getHomeHeroPreview(index: number): HomeHeroPreview {
  return HOME_HERO_PREVIEWS[clampHeroIndex(index)] ?? HOME_HERO_PREVIEWS[0];
}

export function clampHeroIndex(index: number): number {
  return Math.max(0, Math.min(index, HOME_HERO_PREVIEWS.length - 1));
}
