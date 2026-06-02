/**
 * Sync LOUD header logomarks from loudsrl.com CMS (Vector assets used on live).
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const LOGOS_DIR = path.join(ROOT, "public/logos");
const CDN = "https://loudsrl.com/api/media/file";

const ASSETS = [
  { filename: "Vector%207-1.png", dest: "logo-white.png" },
  { filename: "Vector 7-1.png", dest: "logo-white.png" },
  { filename: "Vector%207%20(1)-1.png", dest: "logo-black.png" },
  { filename: "Vector 7 (1)-1.png", dest: "logo-black.png" },
  { filename: "Vector%207.png", dest: "logo-black.png" },
  { filename: "Vector 7.png", dest: "logo-black.png" },
];

async function tryDownload(filename) {
  const url = `${CDN}/${filename}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "loudsrl-clone-logo-sync/1.0" },
  });
  if (!res.ok) return null;
  const type = res.headers.get("content-type") ?? "";
  if (!type.startsWith("image/")) return null;
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 200) return null;
  return buf;
}

for (const { filename, dest } of ASSETS) {
  const out = path.join(LOGOS_DIR, dest);
  if (fs.existsSync(out) && fs.statSync(out).size > 400) {
    console.log(`skip ${dest} (exists)`);
    continue;
  }
  const buf = await tryDownload(filename);
  if (buf) {
    fs.writeFileSync(out, buf);
    console.log(`✓ ${dest} ← ${filename} (${buf.length} bytes)`);
  } else {
    console.warn(`✗ ${filename}`);
  }
}
