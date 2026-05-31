import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const MEDIA_DIR = path.join(ROOT, "public/media");
const LIST = path.join(ROOT, "scripts/case-studies-media.txt");

const EXTRA = [
  "earthquake-1.png",
  "album-1.png",
  "arrow_outward.png",
  "Union-1.png",
];

const files = [
  ...new Set([
    ...fs.readFileSync(LIST, "utf8").trim().split("\n").filter(Boolean),
    ...EXTRA,
  ]),
];

async function download(filename) {
  const dest = path.join(MEDIA_DIR, filename);
  if (fs.existsSync(dest)) {
    return "skip";
  }

  const url = `https://loudsrl.com/api/media/file/${encodeURIComponent(filename)}`;
  const res = await fetch(url);
  if (!res.ok) {
    return `fail ${res.status}`;
  }

  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  return "ok";
}

let ok = 0;
let skip = 0;
let fail = 0;

for (const filename of files) {
  const result = await download(filename);
  if (result === "ok") {
    ok++;
    console.log("downloaded", filename);
  } else if (result === "skip") {
    skip++;
  } else {
    fail++;
    console.warn(result, filename);
  }
}

console.log(`Done: ${ok} downloaded, ${skip} skipped, ${fail} failed`);
