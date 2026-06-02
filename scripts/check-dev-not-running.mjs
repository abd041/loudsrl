import { execSync } from "node:child_process";
import { platform } from "node:os";

/**
 * Prevents `next build` while `next dev` is running — mixing dev + prod output
 * corrupts `.next` (missing vendor-chunks like motion-dom.js) and breaks
 * `next start`, Playwright smoke tests, and production runtime.
 */
function portInUse(port) {
  if (process.env.CI === "true" || process.env.VERCEL === "1") {
    return false;
  }

  try {
    if (platform() === "win32") {
      const out = execSync(`netstat -ano | findstr ":${port}"`, {
        encoding: "utf8",
        stdio: ["pipe", "pipe", "ignore"],
      });
      return /LISTENING/i.test(out);
    }

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
      "   and you get MODULE_NOT_FOUND errors (e.g. vendor-chunks/motion-dom.js).\n\n" +
      "   Fix: stop dev, then run `npm run dev:clean`\n"
  );
  process.exit(1);
}
