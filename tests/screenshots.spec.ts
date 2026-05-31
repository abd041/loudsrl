import { test, expect } from "@playwright/test";

const pages = [
  "/",
  "/manifesto",
  "/studio",
  "/contact-us",
  "/contact-us?c=startup",
  "/contact-us?c=career",
  "/pillars/think",
  "/pillars/design",
  "/pillars/develop",
  "/industries/ai",
  "/industries/e-commerce",
  "/industries/mobile-apps",
  "/industries/real-estate",
  "/case-studies/aste360",
  "/case-studies/balloon",
  "/case-studies/bike-room",
  "/case-studies/catasto-20",
  "/case-studies/cercacasa",
  "/case-studies/ennevolte",
  "/case-studies/shift2cal",
  "/case-studies/shiftpilot",
  "/case-studies/shopify-tech",
  "/case-studies/whuis",
  "/case-studies/witz",
];

for (const path of pages) {
  test(`screenshot ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(path);
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot({
      fullPage: true,
      maxDiffPixelRatio: 0.1,
    });
  });
}
