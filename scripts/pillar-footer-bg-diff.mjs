import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROUTE = "/pillars/think";
const OUT = path.join("scripts", ".pillar-footer-bg");
fs.mkdirSync(OUT, { recursive: true });

async function captureCtaBg(page, url, outPath) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 90_000 });
  await page.waitForTimeout(3500);
  await page.evaluate(() => {
    const doc = document.documentElement;
    doc.scrollTop = doc.scrollHeight - doc.clientHeight;
    const footer = document.querySelector("footer");
    if (footer) {
      const rect = footer.getBoundingClientRect();
      const adjust = rect.bottom - window.innerHeight;
      if (Math.abs(adjust) > 0.01 && Math.abs(adjust) < 2) {
        window.scrollBy(0, adjust);
      }
    }
  });
  await page.waitForTimeout(1500);
  await page.addStyleTag({
    content: `*, *::before, *::after { animation: none !important; transition: none !important; }`,
  });

  const footer = await page.$("footer");
  if (!footer) throw new Error("no footer");
  const ctaWrap = await page.$("footer > div:first-child");
  const box = (await ctaWrap?.boundingBox()) ?? (await footer.boundingBox());
  if (!box) throw new Error("no box");

  await page.screenshot({
    path: outPath,
    clip: {
      x: 0,
      y: Math.floor(box.y),
      width: page.viewportSize()?.width ?? 1440,
      height: Math.ceil(box.height),
    },
    animations: "disabled",
  });
}

async function diffImages(livePath, localPath, diffPath) {
  const live = await sharp(livePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const local = await sharp(localPath)
    .resize(live.info.width, live.info.height, { fit: "fill" })
    .ensureAlpha()
    .raw()
    .toBuffer();

  const { width, height } = live.info;
  let mismatched = 0;
  const diffBuf = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height * 4; i += 4) {
    const dr = Math.abs(live.data[i] - local[i]);
    const dg = Math.abs(live.data[i + 1] - local[i + 1]);
    const db = Math.abs(live.data[i + 2] - local[i + 2]);
    if (dr + dg + db > 40) {
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

  await sharp(diffBuf, { raw: { width, height, channels: 4 } }).png().toFile(diffPath);
  const pct = ((mismatched / (width * height)) * 100).toFixed(2);
  return { w: width, h: height, pct: Number(pct), similarity: (100 - Number(pct)).toFixed(2) };
}

const browser = await chromium.launch();
const viewports = [
  { name: "1440x900", width: 1440, height: 900 },
  { name: "390x844", width: 390, height: 844 },
];
const report = [];

for (const vp of viewports) {
  const livePath = path.join(OUT, `live-cta-${vp.name}.png`);
  const localPath = path.join(OUT, `local-cta-${vp.name}.png`);
  const diffPath = path.join(OUT, `diff-cta-${vp.name}.png`);

  const livePage = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await captureCtaBg(livePage, `https://loudsrl.com${ROUTE}`, livePath);
  await livePage.close();

  const localPage = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  try {
    await captureCtaBg(localPage, `http://127.0.0.1:3000${ROUTE}`, localPath);
    const diff = await diffImages(livePath, localPath, diffPath);
    report.push({ viewport: vp.name, ...diff });
  } catch (e) {
    report.push({ viewport: vp.name, error: String(e) });
  }
  await localPage.close();
}

await browser.close();
console.log(JSON.stringify(report, null, 2));
