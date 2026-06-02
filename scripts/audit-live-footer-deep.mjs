import { chromium } from "playwright";
import fs from "node:fs";

const viewports = [
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1280x900", width: 1280, height: 900 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "430x932", width: 430, height: 932 },
  { name: "390x844", width: 390, height: 844 },
  { name: "375x812", width: 375, height: 812 },
  { name: "320x568", width: 320, height: 568 },
];

const browser = await chromium.launch();
const out = {};

for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await page.goto("https://loudsrl.com/contact-us?c=career", {
    waitUntil: "networkidle",
    timeout: 90_000,
  });
  await page.waitForTimeout(3500);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1200);

  out[vp.name] = await page.evaluate(() => {
    const footer = document.querySelector("footer");
    if (!footer) return null;
    const fr = footer.getBoundingClientRect();

    const ctaBlock = footer.querySelector("p")?.parentElement;
    const ctaP = footer.querySelector("p");
    const ctaLink = [...footer.querySelectorAll("a")].find((a) =>
      a.textContent?.includes("Work")
    );

    const cols = [...footer.querySelectorAll("p")].filter((p) =>
      /^(SOCIAL|LOUD|CONTACT)$/.test(p.textContent?.trim() ?? "")
    );

    const bottomRow = footer.querySelector(".flex.flex-col.md\\:flex-row");
    const bottomPs = bottomRow ? [...bottomRow.querySelectorAll("p")] : [];

    const pick = (el) => {
      if (!el) return null;
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        class: el.className?.slice(0, 160),
        font: s.fontFamily,
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        lineHeight: s.lineHeight,
        letterSpacing: s.letterSpacing,
        opacity: s.opacity,
        color: s.color,
        padding: s.padding,
        margin: s.margin,
        gap: s.gap,
        w: Math.round(r.width),
        h: Math.round(r.height),
        top: Math.round(r.top),
      };
    };

    return {
      footer: pick(footer),
      footerH: Math.round(fr.height),
      footerTop: Math.round(fr.top),
      ctaContainer: pick(ctaBlock),
      ctaText: pick(ctaP),
      ctaLink: pick(ctaLink),
      ctaTextContent: ctaP?.textContent,
      grid: pick(footer.querySelector(".grid")),
      columns: cols.map((p) => ({
        header: pick(p),
        col: pick(p.parentElement),
        links: [...p.parentElement.querySelectorAll("a")].map((a) => ({
          text: a.textContent?.trim(),
          class: a.className,
          li: a.closest("li")?.className,
        })),
      })),
      bottomRow: pick(bottomRow),
      bottomTexts: bottomPs.map((p) => ({
        text: p.textContent?.trim(),
        ...pick(p),
      })),
    };
  });

  const footer = await page.$("footer");
  if (footer) {
    const box = await footer.boundingBox();
    if (box) {
      fs.mkdirSync("scripts/.footer-parity", { recursive: true });
      await page.screenshot({
        path: `scripts/.footer-parity/live-${vp.name}.png`,
        clip: {
          x: 0,
          y: Math.max(0, box.y - 2),
          width: vp.width,
          height: Math.min(vp.height - box.y + 2, box.height + 4),
        },
      });
    }
  }
  await page.close();
}

fs.writeFileSync(
  "scripts/.footer-parity/live-audit.json",
  JSON.stringify(out, null, 2)
);
console.log(JSON.stringify(out, null, 2));
await browser.close();
