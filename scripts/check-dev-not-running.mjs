import { execSync } from "node:child_process";

function portInUse(port) {
  try {
    execSync(`lsof -ti:${port}`, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

if (portInUse(3000) || portInUse(3001)) {
  console.error(
    "\n⚠️  Dev server is still running on port 3000/3001.\n" +
      "   Stop it before `npm run build` — otherwise `.next` cache corrupts\n" +
      "   and you get MODULE_NOT_FOUND errors (e.g. ./948.js).\n\n" +
      "   Fix: stop dev, then run `npm run dev:clean`\n"
  );
  process.exit(1);
}
