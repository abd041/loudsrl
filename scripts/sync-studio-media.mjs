/**
 * Downloads Studio page assets from loudsrl.com CMS.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public/media/studio");
const CDN = "https://loudsrl.com/api/media/file";

const FILES = [
  "loud-video-pres.mp4",
  "raven.png",
  "chef_hat.png",
  "wall_art.png",
  "data_object.png",
  "web_traffic.png",
  "dashboard_customize.png",
  "lightbulb_2.png",
  "Union_1.png",
  "Union-1.png",
];

fs.mkdirSync(OUT, { recursive: true });

async function download(filename) {
  const dest = path.join(OUT, filename);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 500) {
    return "skip";
  }

  const url = `${CDN}/${encodeURIComponent(filename)}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "loudsrl-clone-studio-sync/1.0" },
  });
  if (!res.ok) return `fail ${res.status}`;

  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 200) return "too small";
  fs.writeFileSync(dest, buf);
  return "ok";
}

for (const file of FILES) {
  const result = await download(file);
  console.log(result, file);
  if (file === "Union-1.png" && result === "ok") {
    const alias = path.join(OUT, "Union_1.png");
    if (!fs.existsSync(alias)) {
      fs.copyFileSync(path.join(OUT, "Union-1.png"), alias);
      console.log("ok", "Union_1.png (alias)");
    }
  }
}
