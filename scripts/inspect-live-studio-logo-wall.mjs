import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("https://loudsrl.com/studio", {
  waitUntil: "networkidle",
  timeout: 90_000,
});
await page.waitForTimeout(3000);

const cta = await page.evaluate(() => {
  const a = [...document.querySelectorAll("a")].find((el) =>
    el.textContent?.includes("Be the next")
  );
  const root = [...document.querySelectorAll("p")].find((el) =>
    el.textContent?.includes("We think, design and develop")
  )?.parentElement?.parentElement?.parentElement;

  return {
    cta: a && {
      className: a.className,
      html: a.outerHTML.slice(0, 400),
      parentClass: a.parentElement?.className,
      grandParent: a.parentElement?.parentElement?.className,
    },
    rootSiblings: root?.parentElement
      ? [...root.parentElement.children].map((c) => ({
          tag: c.tagName,
          class: c.className,
        }))
      : null,
    py28Next: root?.nextElementSibling?.className,
  };
});

console.log(JSON.stringify(cta, null, 2));

// GSAP speed sample
const speeds = [];
for (let i = 0; i < 5; i++) {
  await page.waitForTimeout(400);
  const x = await page.evaluate(() => {
    const track = [...document.querySelectorAll("div.flex.gap-10")].find(
      (d) => d.querySelector("img[src*='black-beyond']")
    );
    if (!track) return null;
    const m = track.style.transform.match(/translate3d\(([-\d.]+)px/);
    return m ? parseFloat(m[1]) : null;
  });
  speeds.push(x);
}
console.log("\nGSAP translate samples:", speeds);

await browser.close();
