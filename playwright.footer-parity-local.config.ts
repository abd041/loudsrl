import { defineConfig, devices } from "@playwright/test";

/** Compare localhost footer against baselines captured from loudsrl.com */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  timeout: 180_000,
  use: {
    baseURL: "http://127.0.0.1:3001",
    trace: "retain-on-failure",
  },
  snapshotPathTemplate: "{testDir}/footer-baselines/{arg}{ext}",
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.06,
      animations: "disabled",
    },
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run build && npx next start -p 3001",
    url: "http://127.0.0.1:3001",
    reuseExistingServer: true,
    timeout: 300_000,
  },
});
