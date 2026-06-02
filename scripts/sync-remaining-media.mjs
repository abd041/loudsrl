/**
 * Replaces public/media/*.svg placeholders with raster assets from loudsrl.com CDN.
 * Tries multiple extensions per basename; removes .svg after a successful download.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const MEDIA_DIR = path.join(ROOT, "public/media");
const CDN = "https://loudsrl.com/api/media/file";

const EXTENSIONS = [".webp", ".jpg", ".jpeg", ".png", ".avif"];

async function fetchAsset(filename) {
  const url = `${CDN}/${encodeURIComponent(filename)}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "loudsrl-clone-media-sync/1.0" },
  });
  if (!res.ok) return null;
  const type = res.headers.get("content-type") ?? "";
  if (!type.startsWith("image/")) return null;
  return Buffer.from(await res.arrayBuffer());
}

async function resolveRaster(basename) {
  for (const ext of EXTENSIONS) {
    const filename = `${basename}${ext}`;
    const dest = path.join(MEDIA_DIR, filename);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 800) {
      return filename;
    }
    const buf = await fetchAsset(filename);
    if (buf && buf.length > 800) {
      fs.writeFileSync(dest, buf);
      return filename;
    }
  }
  return null;
}

const svgs = fs
  .readdirSync(MEDIA_DIR)
  .filter((f) => f.endsWith(".svg"));

let replaced = 0;
let failed = 0;

for (const svg of svgs) {
  const basename = svg.replace(/\.svg$/i, "");
  const raster = await resolveRaster(basename);
  if (raster) {
    fs.unlinkSync(path.join(MEDIA_DIR, svg));
    replaced++;
    console.log(`✓ ${svg} → ${raster}`);
  } else {
    failed++;
    console.warn(`✗ no raster for ${svg}`);
  }
}

console.log(`\nDone: ${replaced} replaced, ${failed} still missing raster`);
