import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("https://loudsrl.com/contact-us?c=career", {
  waitUntil: "networkidle",
  timeout: 90_000,
});
await page.waitForTimeout(4000);

const data = await page.evaluate(() => {
  const tabs = [...document.querySelectorAll("button")].filter((b) =>
    b.querySelector("p")?.textContent?.match(/Evolve|Start a company|Career/)
  );

  return {
    tabs: tabs.map((b) => ({
      html: b.innerHTML,
      after: b.querySelector("p")?.nextElementSibling?.outerHTML,
      parentHtml: b.parentElement?.innerHTML?.slice(0, 1500),
    })),
    indicator: document.querySelector("[class*='4E71FF']")?.outerHTML,
    allAbsoluteBottom: [...document.querySelectorAll(".absolute.bottom-0")].map(
      (el) => ({ class: el.className, bg: getComputedStyle(el).backgroundColor })
    ),
  };
});

console.log(JSON.stringify(data, null, 2));
await browser.close();
