import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("https://loudsrl.com/contact-us?c=career", {
  waitUntil: "networkidle",
  timeout: 90_000,
});
await page.waitForTimeout(4000);

const data = await page.evaluate(() => {
  const eyebrow = [...document.querySelectorAll("p")].find((p) =>
    p.textContent?.includes("FIRST STEP")
  );
  const tabs = [...document.querySelectorAll("button")].filter((b) =>
    b.querySelector("p")?.textContent?.match(/Evolve|Start a company|Career/)
  );

  return {
    eyebrow: eyebrow
      ? {
          class: eyebrow.className,
          font: getComputedStyle(eyebrow).fontFamily,
          color: getComputedStyle(eyebrow).color,
          opacity: getComputedStyle(eyebrow).opacity,
        }
      : null,
    tabRow: tabs[0]?.parentElement?.className,
    tabs: tabs.map((b) => {
      const p = b.querySelector("p");
      const cs = getComputedStyle(p);
      return {
        text: p?.textContent?.trim(),
        pClass: p?.className,
        opacity: cs.opacity,
        color: cs.color,
        fontFamily: cs.fontFamily,
        fontWeight: cs.fontWeight,
        fontSize: cs.fontSize,
        letterSpacing: cs.letterSpacing,
        wordSpacing: cs.wordSpacing,
        textDecoration: cs.textDecorationLine,
        btnClass: b.className,
      };
    }),
    indicator: document.querySelector(".bg-\\[\\#4E71FF\\]")?.className,
    indicatorAlt: [...document.querySelectorAll("div")].find(
      (d) =>
        d.className?.includes("rounded-sm") &&
        d.parentElement?.querySelector("button p")
    )?.className,
    bottomBar: (() => {
      const bar = tabs[0]?.parentElement?.parentElement;
      const ind = bar?.querySelector(".absolute.bottom-0");
      return ind
        ? {
            class: ind.className,
            bg: getComputedStyle(ind).backgroundColor,
            height: getComputedStyle(ind).height,
          }
        : null;
    })(),
  };
});

console.log(JSON.stringify(data, null, 2));
await browser.close();
