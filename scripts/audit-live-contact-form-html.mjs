import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("https://loudsrl.com/contact-us?c=career", {
  waitUntil: "networkidle",
  timeout: 90_000,
});
await page.waitForTimeout(4000);

const html = await page.evaluate(() => {
  const form = document.querySelector("form");
  const stepsBlock = [...document.querySelectorAll("p")].find((p) =>
    p.textContent?.trim() === "What's next."
  )?.parentElement?.parentElement;

  return {
    formOuter: form?.parentElement?.parentElement?.className,
    tabRow: document.querySelector(".flex.items-end.gap-6")?.parentElement?.className,
    submitInner: form?.lastElementChild?.querySelector(".form-animatable")?.className,
    listHTML: stepsBlock?.querySelector("ol")?.outerHTML?.slice(0, 600),
    deliverableLabel: document.querySelector("label[for*='Product_Design']")?.className,
    featuredHTML: document
      .querySelector("p")
      ?.textContent?.includes("We think")
      ? document
          .querySelector("p")
          ?.closest("div")
          ?.parentElement?.previousElementSibling?.outerHTML?.slice(0, 800)
      : null,
  };
});

console.log(JSON.stringify(html, null, 2));
await browser.close();
