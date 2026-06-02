const RASTER_EXT = /\.(png|jpe?g|webp|gif|avif)$/i;

/**
 * Resolves a media path for use in img/Image src.
 * Paths without a raster extension fall back to .svg (legacy placeholder).
 */
export function mediaSrc(filename: string): string {
  const normalized = filename.startsWith("/")
    ? filename
    : `/media/${filename}`;

  if (/\.(png|jpe?g|webp|gif|svg|avif)$/i.test(normalized)) {
    return normalized;
  }

  const base = normalized
    .replace(/^\/media\//, "")
    .replace(/\.(jpg|jpeg|png|webp)$/i, "");
  return `/media/${base}.svg`;
}

export function isRasterMedia(path: string): boolean {
  return RASTER_EXT.test(path);
}

/**
 * Resolves logo paths under /logos/ (filename as stored in public/logos/).
 */
export function logoSrc(filename: string): string {
  if (filename.startsWith("/")) return filename;
  return `/logos/${filename}`;
}
