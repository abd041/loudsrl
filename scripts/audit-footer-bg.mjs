import { chromium } from "playwright";

const urls = [
  ["live", "https://loudsrl.com/contact-us?c=career"],
  ["local", "http://127.0.0.1:3001/contact-us?c=career"],
];

const browser = await chromium.launch();
for (const [label, url] of urls) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
  } catch {
    console.log(label, "goto failed");
  }
  await page.waitForTimeout(3000);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  const data = await page.evaluate(() => {
    const footer = document.querySelector("footer");
    const pick = (el) => {
      if (!el) return null;
      const s = getComputedStyle(el);
      return {
        class: String(el.className).slice(0, 140),
        bg: s.backgroundColor,
        opacity: s.opacity,
        z: s.zIndex,
      };
    };
    const fixedEls = [...document.querySelectorAll("*")].filter((el) => {
      const s = getComputedStyle(el);
      return s.position === "fixed" && el.querySelector("canvas");
    });
    return {
      footer: pick(footer),
      ctaWrap: pick(footer?.children[0]),
      grid: pick(footer?.querySelector(".grid")),
      legal: pick(footer?.querySelector(".grid")?.nextElementSibling),
      canvasCount: document.querySelectorAll("canvas").length,
      fixedCanvas: fixedEls.map((el) => pick(el)),
    };
  });
  console.log(label, JSON.stringify(data, null, 2));
  await page.close();
}
await browser.close();
