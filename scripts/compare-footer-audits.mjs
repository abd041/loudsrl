import fs from "node:fs";

const live = JSON.parse(
  fs.readFileSync("scripts/.footer-parity/live-audit.json", "utf8")
);
const local = JSON.parse(
  fs.readFileSync("scripts/.footer-parity/local-audit.json", "utf8")
);

const vp = "1440x900";
const l = live[vp];
const loc = local[vp];

console.log("footerH", { live: l.footerH, local: loc.footerH, delta: loc.footerH - l.footerH });
console.log("ctaContainer.h", {
  live: l.ctaContainer?.h,
  local: loc.ctaContainer?.h,
});
console.log("grid.h", { live: l.grid?.h, local: loc.grid?.h });
console.log("bottomRow.h", { live: l.bottomRow?.h, local: loc.bottomRow?.h });
