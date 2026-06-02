import { chromium } from "playwright";

const ROUTE = "/pillars/think";

const browser = await chromium.launch();
for (const [label, url] of [
  ["live", `https://loudsrl.com${ROUTE}`],
  ["local", `http://127.0.0.1:3000${ROUTE}`],
]) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 90_000 });
  } catch {
    console.log(label, "goto timeout/partial");
  }
  await page.waitForTimeout(4000);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1500);

  const data = await page.evaluate(() => {
    const footer = document.querySelector("footer");
    const cta = footer?.querySelector("p");
    const pick = (el) => {
      if (!el) return null;
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        class: String(el.className).slice(0, 120),
        bg: s.backgroundColor,
        h: Math.round(r.height),
        top: Math.round(r.top),
      };
    };

    const fixedCanvas = [...document.querySelectorAll("*")].filter((el) => {
      const s = getComputedStyle(el);
      return s.position === "fixed" && el.querySelector("canvas");
    });

    const heroCanvas = [...document.querySelectorAll("section canvas, canvas")];

    return {
      footerH: footer ? Math.round(footer.getBoundingClientRect().height) : null,
      footer: pick(footer),
      ctaWrap: pick(footer?.children[0]),
      ctaText: pick(cta),
      canvasCount: document.querySelectorAll("canvas").length,
      fixedCanvas: fixedCanvas.map((el) => pick(el)),
      heroSection: pick(document.querySelector("section")),
      grainEl: pick(footer?.querySelector(".footer-liquid-grain")),
    };
  });
  console.log("\n===", label, "===\n", JSON.stringify(data, null, 2));
  await page.close();
}
await browser.close();
