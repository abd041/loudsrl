/**
 * Downloads header logomark assets from the live site (webpack static URLs).
 */
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const ROOT = path.resolve(import.meta.dirname, "..");
const LOGOS_DIR = path.join(ROOT, "public/logos");

async function downloadUrl(url, dest) {
  const res = await fetch(url.startsWith("http") ? url : `https://loudsrl.com${url}`);
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 80) throw new Error(`${url} too small`);
  fs.writeFileSync(dest, buf);
  return buf.length;
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

try {
  await page.goto("https://loudsrl.com/", { waitUntil: "networkidle", timeout: 90_000 });
  await page.waitForTimeout(2000);

  const logoImg = page.locator('header a[href="/"] img, header a[href="#"] img').first();
  const src = await logoImg.getAttribute("src");
  console.log("home dark header logo src:", src);

  if (src) {
    const ext = src.includes(".svg") ? ".svg" : ".png";
    const bytes = await downloadUrl(src, path.join(LOGOS_DIR, `logo-white${ext}`));
    console.log(`saved logo-white${ext} (${bytes} bytes)`);
  }

  await page.goto("https://loudsrl.com/contact-us", {
    waitUntil: "networkidle",
    timeout: 90_000,
  });
  await page.waitForTimeout(1500);

  const lightLogo = page.locator('header a[href="/"] img, header a[href="#"] img').first();
  const lightSrc = await lightLogo.getAttribute("src");
  console.log("contact light header logo src:", lightSrc);

  if (lightSrc) {
    const ext = lightSrc.includes(".svg") ? ".svg" : ".png";
    const bytes = await downloadUrl(lightSrc, path.join(LOGOS_DIR, `logo-black${ext}`));
    console.log(`saved logo-black${ext} (${bytes} bytes)`);
  }
} finally {
  await browser.close();
}
