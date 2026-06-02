import { defineConfig, devices } from "@playwright/test";

/**
 * Ultra strict visual parity against committed baselines.
 * Use with: `npx playwright test tests/parity-against-live.spec.ts --config playwright.ultra-parity.config.ts`
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  timeout: 240_000,
  reporter: process.env.CI
    ? [["github"], ["html", { open: "never", outputFolder: "playwright-report" }]]
    : [["list"]],
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "off",
  },
  snapshotPathTemplate: "{testDir}/parity-baselines/{testFilePath}/{arg}{ext}",
  expect: {
    toHaveScreenshot: {
      // Target 99.5–100% parity: be extremely strict.
      maxDiffPixelRatio: 0.005,
      animations: "disabled",
      caret: "hide",
      scale: "css",
    },
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run start",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});

