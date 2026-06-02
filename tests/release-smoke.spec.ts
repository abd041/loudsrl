import { test, expect } from "@playwright/test";
import {
  assertNoHorizontalOverflow,
  dismissCookies,
  installParityMocks,
} from "./lib/parity";

const MOBILE = { width: 390, height: 844 };
const DESKTOP = { width: 1440, height: 900 };

test.describe("release smoke", () => {
  test.beforeEach(async ({ page }) => {
    await installParityMocks(page);
    await dismissCookies(page);
  });

  test("home loads without horizontal overflow", async ({ page }) => {
    await page.setViewportSize(MOBILE);
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    await assertNoHorizontalOverflow(page);
    await expect(page.locator("#main-content")).toBeVisible();
  });

  test("mobile menu opens and closes", async ({ page }) => {
    await page.setViewportSize(MOBILE);
    await page.goto("/manifesto", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: /open menu/i }).click();
    await expect(page.getByRole("dialog", { name: /site menu/i })).toBeVisible();
    await page.getByRole("button", { name: /close menu/i }).click();
    await expect(page.getByRole("dialog", { name: /site menu/i })).toBeHidden();
  });

  test("mobile menu closes on Escape", async ({ page }) => {
    await page.setViewportSize(MOBILE);
    await page.goto("/studio", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: /open menu/i }).click();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: /site menu/i })).toBeHidden();
  });

  test("contact form shows validation error", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto("/contact-us", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: /send us message/i }).click();
    await expect(page.locator(":invalid")).not.toHaveCount(0);
  });

  test("contact API rejects honeypot", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: {
        formKind: "business",
        projectType: "New product",
        industry: "AI",
        deliverables: [],
        budget: "€50k–€100k",
        description: "Valid description for honeypot test.",
        email: "test@example.com",
        companyWebsite: "https://spam.example",
      },
    });
    expect(res.status()).toBe(400);
  });

  test("contact API accepts valid JSON", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: {
        formKind: "business",
        projectType: "New product",
        industry: "AI",
        deliverables: ["Design"],
        budget: "€50k–€100k",
        description: "Smoke test submission from Playwright.",
        email: "smoke@example.com",
        companyWebsite: "",
      },
    });
    expect(res.status()).toBe(200);
    const body = (await res.json()) as { ok?: boolean };
    expect(body.ok).toBe(true);
  });

  test("skip link targets main content", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: /skip to content/i });
    await expect(skip).toBeFocused();
  });

  test("robots.txt and sitemap respond", async ({ request }) => {
    const robots = await request.get("/robots.txt");
    expect(robots.status()).toBe(200);
    expect(await robots.text()).toContain("Sitemap");

    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    expect(await sitemap.text()).toContain("/pillars/think");
  });
});
