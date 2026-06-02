import { defineConfig, devices } from "@playwright/test";

/** Capture footer baselines from https://loudsrl.com */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  updateSnapshots: "all",
  timeout: 180_000,
  use: {
    baseURL: "https://loudsrl.com",
    trace: "on-first-retry",
  },
  snapshotPathTemplate: "{testDir}/footer-baselines/{arg}{ext}",
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
