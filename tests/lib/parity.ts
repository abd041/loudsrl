import { expect, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

export const PARITY_CLOCK_ISO = "2025-06-15T20:00:00.000Z";

const BASELINE_DIR = path.join(
  process.cwd(),
  "tests/parity-baselines/parity-against-live.spec.ts"
);

/** Routes with committed baselines for CI viewports (1440x900, 390x844). */
export const PARITY_CI_ROUTES = [
  "/",
  "/manifesto",
  "/studio",
  "/contact-us",
  "/pillars/think",
  "/industries/ai",
] as const;

export const PARITY_CORE_ROUTES = [
  ...PARITY_CI_ROUTES,
  "/contact-us?c=startup",
  "/contact-us?c=career",
  "/pillars/design",
  "/pillars/develop",
] as const;

export const PARITY_EXTENDED_ROUTES = [
  "/industries/e-commerce",
  "/industries/mobile-apps",
  "/industries/real-estate",
  "/case-studies/whuis",
  "/case-studies/shopify-tech",
  "/case-studies/bike-room",
] as const;

export const PARITY_VIEWPORTS_FULL = [
  { name: "1920x1080", width: 1920, height: 1080 },
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1280x900", width: 1280, height: 900 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "430x932", width: 430, height: 932 },
  { name: "390x844", width: 390, height: 844 },
  { name: "375x812", width: 375, height: 812 },
  { name: "320x568", width: 320, height: 568 },
] as const;

export const PARITY_VIEWPORTS_CI = [
  { name: "1440x900", width: 1440, height: 900 },
  { name: "390x844", width: 390, height: 844 },
] as const;

export function parityBaselineExists(route: string, viewportName: string): boolean {
  const slug = route === "/" ? "home" : route.slice(1).replace(/[/?=&]/g, "-");
  const file = path.join(BASELINE_DIR, `${slug}-${viewportName}.png`);
  return fs.existsSync(file);
}

export function parityRoutes(): readonly string[] {
  if (process.env.CI) {
    return [...PARITY_CI_ROUTES];
  }
  const extended = process.env.PARITY_FULL === "1";
  return extended
    ? [...PARITY_CORE_ROUTES, ...PARITY_EXTENDED_ROUTES]
    : [...PARITY_CORE_ROUTES];
}

export function parityViewports() {
  return process.env.CI ? [...PARITY_VIEWPORTS_CI] : [...PARITY_VIEWPORTS_FULL];
}

/** Skip parity cases without baselines (avoids flaky missing-snapshot failures). */
export function shouldRunParityCase(route: string, viewportName: string): boolean {
  if (!process.env.CI) return true;
  return parityBaselineExists(route, viewportName);
}

export async function installParityMocks(page: Page) {
  await page.addInitScript((iso) => {
    try {
      localStorage.setItem("loud-cookies", "all");
    } catch {
      /* ignore */
    }

    const fixed = new Date(iso).getTime();
    const RealDate = Date;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).Date = class extends RealDate {
      constructor(...args: ConstructorParameters<typeof RealDate>) {
        if (args.length === 0) {
          super(fixed);
        } else {
          super(...args);
        }
      }
      static now() {
        return fixed;
      }
    };
    Date.parse = RealDate.parse;
    Date.UTC = RealDate.UTC;
  }, PARITY_CLOCK_ISO);
}

export async function dismissCookies(page: Page) {
  await page.evaluate(() => {
    try {
      localStorage.setItem("loud-cookies", "all");
    } catch {
      /* ignore */
    }
  });
  const banner = page.locator(".fixed.bottom-0").filter({ hasText: /cookies/i });
  if (await banner.isVisible({ timeout: 800 }).catch(() => false)) {
    await page
      .getByRole("button", { name: /accept all cookies/i })
      .dispatchEvent("click");
    await page.waitForTimeout(400);
  }
}

export async function freezeMotion(page: Page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
      }
    `,
  });
  await page.evaluate(() => {
    const w = window as Window & {
      gsap?: { globalTimeline: { pause: () => void } };
    };
    w.gsap?.globalTimeline.pause();
    document.querySelectorAll("video").forEach((el) => {
      el.pause();
    });
    window.scrollTo(0, 0);
  });
}

export async function stabilize(page: Page, route: string) {
  await page.waitForLoadState("domcontentloaded");
  await dismissCookies(page);
  await freezeMotion(page);
  await page.evaluate(() => document.fonts?.ready);

  if (route === "/") {
    await page.waitForTimeout(4500);
  } else if (route.startsWith("/industries/")) {
    await page.waitForTimeout(2800);
  } else if (route.startsWith("/case-studies/")) {
    await page.waitForTimeout(2000);
  } else {
    await page.waitForTimeout(1200);
  }
}

export function maxDiffForRoute(route: string): number {
  if (route === "/") return 0.34;
  if (route.startsWith("/pillars/")) return 0.22;
  if (route === "/contact-us" || route.startsWith("/contact-us?")) return 0.28;
  if (route === "/studio") return 0.2;
  if (route.startsWith("/industries/")) return 0.18;
  if (route.startsWith("/case-studies/")) return 0.2;
  return 0.14;
}

export async function assertNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return doc.scrollWidth > doc.clientWidth + 1;
  });
  expect(overflow, "page should not scroll horizontally").toBe(false);
}
