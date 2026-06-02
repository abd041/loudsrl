import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const viewports = [
  { name: "1440x900", width: 1440, height: 900 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "390x844", width: 390, height: 844 },
];

const OUT = path.join("scripts", ".footer-parity");
fs.mkdirSync(OUT, { recursive: true });

async function captureFooter(page, url, outPath) {
  await page.addInitScript(() => {
    try {
      localStorage.setItem("loud-cookies", "all");
    } catch {
      /* ignore */
    }
  });
  await page.goto(url, { waitUntil: "networkidle", timeout: 90_000 });
  await page.waitForTimeout(3500);
  await page.evaluate(() => {
    try {
      localStorage.setItem("loud-cookies", "all");
    } catch {
      /* ignore */
    }
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.waitForTimeout(1500);
  await page.evaluate(() => document.fonts?.ready);
  await page.addStyleTag({
    content: `*, *::before, *::after { animation: none !important; transition: none !important; }`,
  });

  const footer = await page.$("footer");
  if (!footer) throw new Error(`No footer on ${url}`);
  const box = await footer.boundingBox();
  if (!box) throw new Error("No footer box");

  const vp = page.viewportSize();
  await page.screenshot({
    path: outPath,
    clip: {
      x: 0,
      y: Math.max(0, Math.floor(box.y)),
      width: vp.width,
      height: Math.min(Math.ceil(box.height) + 2, vp.height - Math.floor(box.y)),
    },
    animations: "disabled",
  });
  return box;
}

async function diffImages(livePath, localPath, diffPath) {
  const w = 1440;
  const live = await sharp(livePath)
    .resize(w, null, { fit: "contain", background: "#000" })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const local = await sharp(localPath)
    .resize(w, live.info.height, { fit: "fill" })
    .raw()
    .toBuffer();

  const { width, height } = live.info;
  let mismatched = 0;
  const channels = 4;
  const diffBuf = Buffer.alloc(width * height * channels);

  for (let i = 0; i < width * height * channels; i += channels) {
    const dr = Math.abs(live.data[i] - local[i]);
    const dg = Math.abs(live.data[i + 1] - local[i + 1]);
    const db = Math.abs(live.data[i + 2] - local[i + 2]);
    if (dr + dg + db > 45) {
      mismatched++;
      diffBuf[i] = 255;
      diffBuf[i + 1] = 0;
      diffBuf[i + 2] = 0;
      diffBuf[i + 3] = 200;
    } else {
      diffBuf[i] = live.data[i];
      diffBuf[i + 1] = live.data[i + 1];
      diffBuf[i + 2] = live.data[i + 2];
      diffBuf[i + 3] = 120;
    }
  }

  await sharp(diffBuf, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(diffPath);

  const pct = ((mismatched / (width * height)) * 100).toFixed(2);
  return {
    w: width,
    h: height,
    mismatched,
    pct: Number(pct),
    similarity: (100 - Number(pct)).toFixed(2),
  };
}

const browser = await chromium.launch();
const report = [];

for (const vp of viewports) {
  const livePath = path.join(OUT, `live-${vp.name}.png`);
  const localPath = path.join(OUT, `local-${vp.name}.png`);
  const diffPath = path.join(OUT, `diff-${vp.name}.png`);

  const livePage = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await captureFooter(livePage, "https://loudsrl.com/contact-us?c=career", livePath);
  await livePage.close();

  const localPage = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  try {
    await captureFooter(
      localPage,
      "http://127.0.0.1:3001/contact-us?c=career",
      localPath
    );
  } catch (e) {
    report.push({ viewport: vp.name, error: String(e) });
    await localPage.close();
    continue;
  }
  await localPage.close();

  const result = await diffImages(livePath, localPath, diffPath);
  report.push({ viewport: vp.name, ...result });
}

fs.writeFileSync(path.join(OUT, "report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
await browser.close();
