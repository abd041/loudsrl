/**
 * CI Lighthouse runner with score thresholds.
 * Requires production server at LIGHTHOUSE_BASE_URL (default http://127.0.0.1:3000).
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "docs/lighthouse");
const BASE = process.env.LIGHTHOUSE_BASE_URL ?? "http://127.0.0.1:3000";

const PERF_MIN_DEFAULT = Number(process.env.LH_PERF_MIN ?? 85);
const PERF_MIN_HOME = Number(process.env.LH_PERF_MIN_HOME ?? 68);
const A11Y_MIN = Number(process.env.LH_A11Y_MIN ?? 90);

const PAGES = [
  { route: "/", perfMin: PERF_MIN_HOME },
  { route: "/manifesto", perfMin: PERF_MIN_DEFAULT },
  { route: "/contact-us", perfMin: PERF_MIN_DEFAULT },
  { route: "/pillars/design", perfMin: PERF_MIN_DEFAULT },
];

async function runLighthouse(url) {
  return new Promise((resolve, reject) => {
    const args = [
      url,
      "--quiet",
      "--chrome-flags=--headless --no-sandbox --disable-dev-shm-usage",
      "--only-categories=performance,accessibility,best-practices,seo",
      "--output=json",
      "--output-path=stdout",
      "--preset=desktop",
    ];

    const child = spawn("npx", ["lighthouse@12", ...args], {
      shell: true,
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });

    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Lighthouse failed for ${url} (exit ${code})`));
        return;
      }
      try {
        resolve(JSON.parse(stdout));
      } catch (error) {
        reject(error);
      }
    });
  });
}

function scores(report) {
  const c = report.categories;
  return {
    performance: Math.round((c.performance?.score ?? 0) * 100),
    accessibility: Math.round((c.accessibility?.score ?? 0) * 100),
    bestPractices: Math.round((c["best-practices"]?.score ?? 0) * 100),
    seo: Math.round((c.seo?.score ?? 0) * 100),
  };
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const results = {};
const failures = [];

for (const { route, perfMin } of PAGES) {
  const url = `${BASE}${route}`;
  process.stdout.write(`Lighthouse ${url}…\n`);
  try {
    const report = await runLighthouse(url);
    const s = scores(report);
    results[route] = { ...s, thresholds: { performance: perfMin, accessibility: A11Y_MIN } };

    fs.writeFileSync(
      path.join(OUT_DIR, `${route.replace(/\//g, "_") || "home"}.json`),
      JSON.stringify(report, null, 0)
    );

    if (s.performance < perfMin) {
      failures.push(`${route} performance ${s.performance} < ${perfMin}`);
    }
    if (s.accessibility < A11Y_MIN) {
      failures.push(`${route} accessibility ${s.accessibility} < ${A11Y_MIN}`);
    }
  } catch (error) {
    results[route] = { error: String(error) };
    failures.push(`${route}: ${error}`);
  }
}

const summaryPath = path.join(OUT_DIR, "summary.json");
fs.writeFileSync(summaryPath, JSON.stringify(results, null, 2));
console.log(`Wrote ${summaryPath}`);

if (failures.length > 0) {
  console.error("\nLighthouse thresholds failed:\n", failures.join("\n"));
  process.exit(1);
}

console.log("\nAll Lighthouse thresholds passed.");
