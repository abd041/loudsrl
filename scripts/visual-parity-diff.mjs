/**
 * Compare localhost vs loudsrl.com viewport screenshots.
 * Usage: npm run build && npm run start (in another terminal) OR rely on playwright webServer
 *        node scripts/visual-parity-diff.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const REFERENCE = "https://loudsrl.com";
const LOCAL = process.env.PARITY_LOCAL_URL ?? "http://localhost:3000";
const OUT = path.resolve(import.meta.dirname, "..", "tests/parity-output");

const VIEWPORTS = [
  { name: "1920", width: 1920, height: 1080 },
  { name: "1440", width: 1440, height: 900 },
  { name: "1280", width: 1280, height: 900 },
  { name: "768", width: 768, height: 1024 },
  { name: "390", width: 390, height: 844 },
  { name: "375", width: 375, height: 812 },
];

const PAGES = [
  "/",
  "/manifesto",
  "/studio",
  "/contact-us",
  "/pillars/think",
  "/pillars/design",
  "/industries/ai",
  "/case-studies/whuis",
];

async function dismissOverlays(page) {
  const accept = page.getByRole("button", {
    name: /accept all cookies/i,
  });
  if (await accept.isVisible({ timeout: 2000 }).catch(() => false)) {
    await accept.click();
    await page.waitForTimeout(400);
  }
}

async function preparePage(page, url) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await dismissOverlays(page);
  await page.waitForTimeout(1500);
  if (url.includes("localhost") && url.endsWith("/")) {
    await page.waitForTimeout(2000);
  }
}

function diffRatio(img1, img2) {
  const w = Math.min(img1.width, img2.width);
  const h = Math.min(img1.height, img2.height);
  const diff = new PNG({ width: w, height: h });
  let mismatched = 0;
  pixelmatch(
    img1.data,
    img2.data,
    diff.data,
    w,
    h,
    { threshold: 0.15, includeAA: true },
    (x, y) => {
      mismatched++;
    }
  );
  const total = w * h;
  return { ratio: mismatched / total, diff };
}

async function screenshot(page, filePath) {
  await page.screenshot({ path: filePath, fullPage: false });
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const results = [];

  for (const vp of VIEWPORTS) {
    for (const route of PAGES) {
      const slug = route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "_");
      const dir = path.join(OUT, vp.name, slug);
      fs.mkdirSync(dir, { recursive: true });

      const refPage = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      const locPage = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });

      const refPath = path.join(dir, "reference.png");
      const locPath = path.join(dir, "local.png");
      const diffPath = path.join(dir, "diff.png");

      try {
        await preparePage(refPage, `${REFERENCE}${route}`);
        await preparePage(locPage, `${LOCAL}${route}`);
        await screenshot(refPage, refPath);
        await screenshot(locPage, locPath);

        const refPng = PNG.sync.read(fs.readFileSync(refPath));
        const locPng = PNG.sync.read(fs.readFileSync(locPath));

        if (refPng.width !== locPng.width || refPng.height !== locPng.height) {
          const w = Math.min(refPng.width, locPng.width);
          const h = Math.min(refPng.height, locPng.height);
          refPng.width = w;
          refPng.height = h;
          locPng.width = w;
          locPng.height = h;
        }

        const { ratio, diff } = diffRatio(refPng, locPng);
        fs.writeFileSync(diffPath, PNG.sync.write(diff));

        results.push({
          viewport: vp.name,
          route,
          mismatchPercent: (ratio * 100).toFixed(1),
          ratio,
        });
        console.log(
          `${vp.name} ${route} → ${(ratio * 100).fixed(1)}% mismatch`
        );
      } catch (err) {
        console.warn("FAIL", vp.name, route, err.message);
        results.push({
          viewport: vp.name,
          route,
          mismatchPercent: "FAIL",
          ratio: 1,
        });
      } finally {
        await refPage.close();
        await locPage.close();
      }
    }
  }

  await browser.close();

  results.sort((a, b) => b.ratio - a.ratio);
  fs.writeFileSync(
    path.join(OUT, "report.json"),
    JSON.stringify(results, null, 2)
  );

  console.log("\n--- Top mismatches ---");
  results.slice(0, 15).forEach((r) => {
    console.log(`${r.mismatchPercent}%  ${r.viewport}  ${r.route}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
