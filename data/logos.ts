/**
 * Client logos in public/logos/ (PNG from CMS — sync via npm run logos:sync).
 * Light sections use black-*; dark sections use white-* (same order).
 */
export const logosForLightBackground = [
  "black-beyond-doc.png",
  "black-bikeroom.png",
  "black-cercacasa-1.png",
  "black-ennevolte.png",
  "black-fimi.png",
  "black-gonext.png",
  "black-idntt.png",
  "black-mae.png",
  "black-whuis.png",
  "black-zero.png",
  "black-acqua-di-parma.png",
  "black-banca-sella.png",
  "black-bitbull.png",
  "black-deloitte.png",
  "black-ied.png",
  "black-mcsaatchi.png",
  "black-moneymour.png",
  "black-samso.png",
  "black-tag.png",
  "black-vitesicure.png",
  "black-zest.png",
] as const;

export const logosForDarkBackground: readonly string[] =
  logosForLightBackground.map((name) => name.replace(/^black-/i, "white-"));

/** @deprecated Use logosForLightBackground */
export const clientLogos = logosForLightBackground;
export const logos = logosForLightBackground;

export const logoWallText =
  "We think, design and develop world-class digital products for forward-thinking brands.";
