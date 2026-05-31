import { execSync, spawnSync } from "node:child_process";
import { rmSync } from "node:fs";

function killDevPorts() {
  try {
    execSync("lsof -ti:3000,3001 | xargs kill -9 2>/dev/null || true", {
      stdio: "ignore",
      shell: true,
    });
  } catch {
    // ignore
  }
}

killDevPorts();
rmSync(".next", { recursive: true, force: true });

console.log("Starting fresh dev server…\n");
const result = spawnSync("npm", ["run", "dev"], { stdio: "inherit", shell: true });
process.exit(result.status ?? 1);
