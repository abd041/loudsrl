import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("https://loudsrl.com/contact-us?c=career", {
  waitUntil: "networkidle",
  timeout: 90_000,
});
await page.waitForTimeout(4000);

const html = await page.evaluate(() => {
  const eyebrow = [...document.querySelectorAll("p")].find((p) =>
    p.textContent?.includes("FIRST STEP")
  );
  const section = eyebrow?.parentElement;
  return section?.querySelector(".flex.flex-col")?.innerHTML?.slice(0, 2500);
});

console.log(html);
await browser.close();
