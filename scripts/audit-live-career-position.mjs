import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("https://loudsrl.com/contact-us?c=career", {
  waitUntil: "networkidle",
  timeout: 90_000,
});
await page.waitForTimeout(5000);

const data = await page.evaluate(() => {
  const positionCell = [...document.querySelectorAll("label")].find((l) =>
    l.textContent?.includes("POSITION")
  )?.parentElement;

  return {
    positionHTML: positionCell?.innerHTML?.slice(0, 1200),
    positionSelect: positionCell?.querySelector("select")?.outerHTML,
    positionOptions: positionCell
      ? [...positionCell.querySelectorAll("option")].map((o) => o.textContent)
      : [],
    submitBtn: document.querySelector("form button")?.outerHTML?.slice(0, 400),
  };
});

console.log(JSON.stringify(data, null, 2));
await browser.close();
