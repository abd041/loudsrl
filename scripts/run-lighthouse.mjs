/**
 * Runs Lighthouse against a production server on localhost:3000.
 * Usage: npm run build && npm run start (separate terminal) && node scripts/run-lighthouse.mjs
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "docs/lighthouse-scores.json");
const BASE = process.env.LIGHTHOUSE_BASE_URL ?? "http://localhost:3000";

const PAGES = ["/", "/manifesto", "/contact-us", "/pillars/design"];

async function runLighthouse(url) {
  return new Promise((resolve, reject) => {
    const args = [
      url,
      "--quiet",
      "--chrome-flags=--headless --no-sandbox",
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

const results = {};

for (const route of PAGES) {
  const url = `${BASE}${route}`;
  process.stdout.write(`Lighthouse ${url}…\n`);
  try {
    const report = await runLighthouse(url);
    results[route] = scores(report);
  } catch (error) {
    results[route] = { error: String(error) };
  }
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(results, null, 2));
console.log(`Wrote ${OUT}`);
