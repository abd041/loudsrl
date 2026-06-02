import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("https://loudsrl.com/contact-us", {
  waitUntil: "networkidle",
  timeout: 90_000,
});
await page.waitForTimeout(3000);

const data = await page.evaluate(() => {
  const form = document.querySelector("form");
  const cells = form ? [...form.children].map((c, i) => ({
    i,
    class: c.className,
    label: c.querySelector("label")?.textContent?.trim().slice(0, 25),
    colSpan: c.className.includes("col-span") ? c.className.match(/col-span-\S+/)?.[0] : null,
  })) : [];

  const navTabs = [...document.querySelectorAll("a, button")].filter((el) =>
    /Evolve my Business|Start a company|^Career$/i.test(el.textContent?.trim() || "")
  );

  const wrapper = form?.parentElement;
  const layoutHTML = wrapper?.outerHTML?.slice(0, 2500);

  const stepsArticles = [...document.querySelectorAll("article, div")].filter(
    (el) => el.textContent?.includes("Send us a message")
  );

  const stepBlock = stepsArticles[0]?.closest("div[class*='grid'], section");

  return {
    cells,
    navTabs: navTabs.map((el) => ({
      tag: el.tagName,
      text: el.textContent?.trim(),
      class: el.className,
      href: el.getAttribute("href"),
    })),
    wrapperClass: wrapper?.className,
    layoutHTML,
    stepParent: stepBlock?.className,
    stepItems: stepBlock
      ? [...stepBlock.children].slice(0, 5).map((c) => ({
          class: c.className,
          t: c.textContent?.trim().slice(0, 50),
        }))
      : [],
    featuredRow: (() => {
      const a = document.querySelector("a[href*='shopify-tech']");
      const row = a?.closest("div.flex, div[class*='flex']");
      return row?.className;
    })(),
  };
});

console.log(JSON.stringify(data, null, 2));
await browser.close();
