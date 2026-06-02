/**
 * Summarizes Playwright JSON results after a failed parity run.
 * Usage: node scripts/parity-diff-report.mjs
 */
import fs from "node:fs";
import path from "node:path";

const resultsFile = path.join(process.cwd(), "test-results/results.json");

if (!fs.existsSync(resultsFile)) {
  console.log("No test-results/results.json — run parity tests first.");
  process.exit(0);
}

const data = JSON.parse(fs.readFileSync(resultsFile, "utf8"));
const failed = [];

function walk(suite) {
  for (const spec of suite.specs ?? []) {
    for (const test of spec.tests ?? []) {
      const outcome = test.results?.[0]?.status;
      if (outcome === "failed" || outcome === "timedOut") {
        failed.push({
          title: spec.title,
          file: suite.file,
          error: test.results[0]?.error?.message?.slice(0, 200),
        });
      }
    }
  }
  for (const child of suite.suites ?? []) {
    walk(child);
  }
}

for (const suite of data.suites ?? []) {
  walk(suite);
}

const outDir = path.join(process.cwd(), "docs/parity");
fs.mkdirSync(outDir, { recursive: true });
const reportPath = path.join(outDir, "last-failure-report.json");
fs.writeFileSync(reportPath, JSON.stringify({ failed, generatedAt: new Date().toISOString() }, null, 2));

console.log(`Parity failures: ${failed.length}`);
console.log(`Report: ${reportPath}`);
for (const f of failed.slice(0, 20)) {
  console.log(` - ${f.title}`);
}
