import { defineConfig, devices } from "@playwright/test";

/** Captures reference screenshots from https://loudsrl.com (no local webServer). */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  updateSnapshots: "all",
  timeout: 180000,
  use: {
    baseURL: "https://loudsrl.com",
    trace: "on-first-retry",
  },
  snapshotPathTemplate: "{testDir}/parity-baselines/{testFilePath}/{arg}{ext}",
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
