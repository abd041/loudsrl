import { test, expect } from "@playwright/test";
import {
  installParityMocks,
  maxDiffForRoute,
  parityRoutes,
  parityViewports,
  shouldRunParityCase,
  stabilize,
} from "./lib/parity";

for (const viewport of parityViewports()) {
  for (const route of parityRoutes()) {
    const slug = route === "/" ? "home" : route.slice(1).replace(/[/?=&]/g, "-");
    const snapshot = `${slug}-${viewport.name}.png`;

    test(`parity ${snapshot}`, async ({ page }, testInfo) => {
      test.skip(
        !shouldRunParityCase(route, viewport.name),
        `No baseline for ${route} @ ${viewport.name}`
      );
      await installParityMocks(page);
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto(route, { waitUntil: "domcontentloaded", timeout: 90_000 });
      await stabilize(page, route);

      const isUpdating =
        testInfo.config.updateSnapshots === "all" ||
        testInfo.config.updateSnapshots === "missing";

      if (isUpdating) {
        const path = testInfo.snapshotPath(snapshot);
        await page.screenshot({
          path: path!,
          fullPage: false,
          animations: "disabled",
        });
        return;
      }

      await expect(page).toHaveScreenshot(snapshot, {
        fullPage: false,
        maxDiffPixelRatio: maxDiffForRoute(route),
        animations: "disabled",
        caret: "hide",
        timeout: 15_000,
      });
    });
  }
}
