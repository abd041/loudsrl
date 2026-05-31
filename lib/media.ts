export function mediaSrc(filename: string): string {
  const normalized = filename.startsWith("/")
    ? filename
    : `/media/${filename}`;

  if (/\.(png|jpe?g|webp|gif|svg)$/i.test(normalized)) {
    return normalized;
  }

  const base = normalized
    .replace(/^\/media\//, "")
    .replace(/\.(jpg|jpeg|png|webp)$/i, "");
  return `/media/${base}.svg`;
}

export function logoSrc(filename: string): string {
  const normalized = filename.startsWith("/")
    ? filename
    : `/logos/${filename}`;

  if (/\.(png|jpe?g|webp|gif|svg)$/i.test(normalized)) {
    return normalized;
  }

  return `/logos/${filename.replace(/\.png$/i, "")}.svg`;
}
