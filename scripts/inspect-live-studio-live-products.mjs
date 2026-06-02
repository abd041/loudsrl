import { chromium } from "playwright";

const browser = await chromium.launch();
for (const vp of [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
]) {
  const page = await browser.newPage({ viewport: vp });
  await page.goto("https://loudsrl.com/studio", { waitUntil: "networkidle", timeout: 90_000 });
  await page.waitForTimeout(2500);

  const data = await page.evaluate(() => {
    const h2 = [...document.querySelectorAll("h2")].find((h) =>
      h.textContent?.includes("Live Products")
    );
    const label = h2?.previousElementSibling;
    const cardsContainer = h2?.parentElement?.querySelector("div.flex, div.grid");
    const row = cardsContainer ?? h2?.parentElement?.querySelector("a[href*='witz']")?.parentElement;

    const getPath = (el) => {
      const parts = [];
      let n = el;
      for (let i = 0; i < 6 && n; i++) {
        parts.push(
          `${n.tagName.toLowerCase()}${n.className ? "." + n.className.split(" ").filter(Boolean).slice(0, 4).join(".") : ""}`
        );
        n = n.parentElement;
      }
      return parts.join(" > ");
    };

    return {
      labelOuter: label ? getPath(label) : null,
      h2Outer: h2 ? getPath(h2) : null,
      rowClass: row?.className,
      rowDisplay: row ? getComputedStyle(row).display : null,
      rowGap: row ? getComputedStyle(row).gap : null,
      cardsMt: cardsContainer?.previousElementSibling
        ? null
        : h2?.nextElementSibling?.className,
      sectionTree: h2?.parentElement?.outerHTML?.slice(0, 1200),
      imgClasses: document
        .querySelector("a[href*='witz'] img")
        ?.className,
      linkClass: document.querySelector("a[href*='witz']")?.className,
    };
  });

  console.log(`\n=== ${vp.name} ===\n`, JSON.stringify(data, null, 2));
}
await browser.close();
