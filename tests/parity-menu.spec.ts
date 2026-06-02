import { test, expect } from "@playwright/test";
import { dismissCookies, freezeMotion, installParityMocks } from "./lib/parity";

test.describe("parity menu state", () => {
  test("mobile menu open 390x844", async ({ page }, testInfo) => {
    await installParityMocks(page);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/manifesto", { waitUntil: "domcontentloaded" });
    await dismissCookies(page);
    await page.getByRole("button", { name: /open menu/i }).click();
    await page.waitForTimeout(900);
    await freezeMotion(page);

    const snapshot = "menu-open-manifesto-390x844.png";
    const isUpdating =
      testInfo.config.updateSnapshots === "all" ||
      testInfo.config.updateSnapshots === "missing";

    if (isUpdating) {
      await page.screenshot({
        path: testInfo.snapshotPath(snapshot)!,
        animations: "disabled",
      });
      return;
    }

    await expect(page).toHaveScreenshot(snapshot, {
      animations: "disabled",
      maxDiffPixelRatio: 0.2,
    });
  });
});
