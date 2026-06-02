import { test, expect } from "@playwright/test";
import {
  dismissCookies,
  freezeMotion,
  installParityMocks,
  PARITY_CLOCK_ISO,
} from "./lib/parity";

const ROUTE = "/contact-us?c=career";

const VIEWPORTS = [
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1280x900", width: 1280, height: 900 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "430x932", width: 430, height: 932 },
  { name: "390x844", width: 390, height: 844 },
  { name: "375x812", width: 375, height: 812 },
  { name: "320x568", width: 320, height: 568 },
] as const;

async function footerShot(page: import("@playwright/test").Page, name: string) {
  await installParityMocks(page);
  await page.goto(ROUTE, { waitUntil: "domcontentloaded", timeout: 90_000 });
  await dismissCookies(page);
  await freezeMotion(page);
  await page.evaluate(() => document.fonts?.ready);
  await page.waitForTimeout(2000);
  await page.evaluate(() => document.fonts?.ready);
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

  const footer = page.locator("footer");
  await expect(footer).toBeVisible();
  await expect(footer).toHaveScreenshot(`footer-${name}.png`, {
    animations: "disabled",
    maxDiffPixelRatio: 0.06,
    timeout: 20_000,
  });
}

for (const vp of VIEWPORTS) {
  test(`footer parity ${vp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await footerShot(page, vp.name);
  });
}

test("footer CTA uses DM Mono headline", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(ROUTE, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  const cta = page.locator('footer p[class*="font-dm"]').first();
  await expect(cta).toBeVisible();
  const font = await cta.evaluate((el) => getComputedStyle(el).fontFamily);
  expect(font.toLowerCase()).toMatch(/mono/);
});

test("footer shell classes", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(ROUTE, { waitUntil: "domcontentloaded" });
  const footer = page.locator("footer");
  await expect(footer).toHaveClass(/bg-black\/50/);
});
