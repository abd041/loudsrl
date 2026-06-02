/**
 * Sync client logo PNGs from loudsrl.com CMS (matches live logo wall).
 * Usage: node scripts/sync-client-logos.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const LOGOS_DIR = path.join(ROOT, "public/logos");
const CDN = "https://loudsrl.com/api/media/file";

/** Order on live /studio logo wall (light bg = black-*) */
const LIVE_BLACK_LOGOS = [
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
];

function toWhiteName(blackName) {
  return blackName.replace(/^black-/i, "white-");
}

async function download(filename) {
  const url = `${CDN}/${encodeURIComponent(filename)}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "loudsrl-clone-logo-sync/1.0" },
  });
  if (!res.ok) return null;
  const type = res.headers.get("content-type") ?? "";
  if (!type.startsWith("image/")) return null;
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 100) return null;
  return buf;
}

fs.mkdirSync(LOGOS_DIR, { recursive: true });

let ok = 0;
let fail = 0;

for (const black of LIVE_BLACK_LOGOS) {
  for (const name of [black, toWhiteName(black)]) {
    const out = path.join(LOGOS_DIR, name);
    if (fs.existsSync(out) && fs.statSync(out).size > 200) {
      console.log(`skip ${name}`);
      ok++;
      continue;
    }
    const buf = await download(name);
    if (buf) {
      fs.writeFileSync(out, buf);
      console.log(`✓ ${name} (${buf.length}b)`);
      ok++;
    } else {
      console.warn(`✗ ${name}`);
      fail++;
    }
  }
}

console.log(`\nDone: ${ok} ok, ${fail} failed`);
process.exit(fail > 0 ? 1 : 0);
