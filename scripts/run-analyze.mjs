import { spawnSync } from "node:child_process";

process.env.ANALYZE = "true";
const result = spawnSync("npm", ["run", "build"], {
  stdio: "inherit",
  shell: true,
});
process.exit(result.status ?? 1);
