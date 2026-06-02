import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("https://loudsrl.com/contact-us", {
  waitUntil: "networkidle",
  timeout: 90_000,
});
await page.waitForTimeout(3000);

const d = await page.evaluate(() => {
  const form = document.querySelector("form");
  const submit = form?.lastElementChild;

  const stepsRoot = [...document.querySelectorAll("p")].find((p) =>
    p.textContent?.includes("What's next")
  )?.parentElement?.parentElement;

  return {
    submitFull: submit?.innerHTML?.slice(0, 1500),
    shortDescCell: [...form?.children || []].find((c) =>
      c.textContent?.includes("SHORT DESCRIPTION")
    )?.className,
    shortDescColSpan: [...form?.children || []].find((c) =>
      c.textContent?.includes("SHORT DESCRIPTION")
    )?.className,
    cell4: form?.children[4]?.className,
    stepsRootHTML: stepsRoot?.outerHTML?.slice(0, 2000),
    mainPadding: document.querySelector("main")?.className,
    cursorInvert: document.querySelector("main")?.classList.contains("cursor-invert"),
  };
});

console.log(JSON.stringify(d, null, 2));

// mobile form
const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
await m.goto("https://loudsrl.com/contact-us", { waitUntil: "networkidle", timeout: 90000 });
await m.waitForTimeout(2000);
const mobile = await m.evaluate(() => ({
  formClass: document.querySelector("form")?.className,
  tabFont: [...document.querySelectorAll("button")].find((b) =>
    b.textContent?.includes("Evolve")
  )?.querySelector("p")?.className,
  hateVisible: [...document.querySelectorAll("p")].filter((p) =>
    p.textContent?.includes("Hate contact")
  ).map((p) => ({
    visible: p.offsetParent !== null,
    class: p.parentElement?.className,
  })),
}));
console.log("\nmobile:", JSON.stringify(mobile, null, 2));

await browser.close();
