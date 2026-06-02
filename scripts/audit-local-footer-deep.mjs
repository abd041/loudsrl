import { chromium } from "playwright";
import fs from "node:fs";

const BASE = process.env.FOOTER_AUDIT_URL ?? "http://127.0.0.1:3001/contact-us?c=career";

const viewports = [
  { name: "1440x900", width: 1440, height: 900 },
];

const browser = await chromium.launch();
const out = {};

for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await page.goto(BASE, { waitUntil: "networkidle", timeout: 90_000 });
  await page.waitForTimeout(3500);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1200);

  out[vp.name] = await page.evaluate(() => {
    const footer = document.querySelector("footer");
    if (!footer) return null;
    const fr = footer.getBoundingClientRect();

    const ctaBlock = footer.querySelector("p")?.parentElement;
    const ctaP = footer.querySelector("p");
    const grid = footer.querySelector(".grid");
    const legalRow = footer.querySelector(".bg-black\\/30.flex");

    const pick = (el) => {
      if (!el) return null;
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        class: el.className?.slice(0, 200),
        font: s.fontFamily,
        fontSize: s.fontSize,
        lineHeight: s.lineHeight,
        padding: s.padding,
        margin: s.margin,
        w: Math.round(r.width),
        h: Math.round(r.height),
      };
    };

    const children = [...footer.children].map((el, i) => ({
      i,
      tag: el.tagName,
      class: el.className?.slice(0, 120),
      h: Math.round(el.getBoundingClientRect().height),
    }));

    return {
      footerH: Math.round(fr.height),
      footer: pick(footer),
      children,
      ctaWrapper: pick(footer.children[0]),
      ctaContainer: pick(ctaBlock),
      ctaText: pick(ctaP),
      grid: pick(grid),
      legalRow: pick(legalRow),
    };
  });
  await page.close();
}

fs.mkdirSync("scripts/.footer-parity", { recursive: true });
fs.writeFileSync(
  "scripts/.footer-parity/local-audit.json",
  JSON.stringify(out, null, 2)
);
console.log(JSON.stringify(out, null, 2));
await browser.close();
