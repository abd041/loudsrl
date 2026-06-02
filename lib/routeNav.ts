import { mainNav } from "@/data/navigation";

export const headerData = {
  nav: mainNav.map((item) => ({
    link: item.href,
    label: item.label,
  })),
};

export function findNavIndexFromPath(pathname: string): number {
  const clean = pathname.split("?")[0]?.split("#")[0] ?? pathname;

  const exact = mainNav.findIndex((item) => clean === item.href);
  if (exact !== -1) return exact;

  // Nested routes only — avoid /pillars/develop matching /pillars/design via startsWith
  return mainNav.findIndex((item) => clean.startsWith(`${item.href}/`));
}

export function getLiquidIndexForPath(pathname: string): number {
  if (pathname === "/") return 0;
  const navIndex = findNavIndexFromPath(pathname);
  return navIndex !== -1 ? navIndex + 1 : 0;
}

/** Only the homepage embeds liquid in-page; other routes use FooterLiquidBackdrop. */
export function pathUsesLiquidHero(pathname: string): boolean {
  const clean = pathname.split("?")[0]?.split("#")[0] ?? pathname;
  return clean === "/";
}

export function isPillarPath(pathname: string): boolean {
  return pathname.startsWith("/pillars/");
}

export function isWhiteHeroIndex(index: number): boolean {
  return index === 5;
}
