import { chromium } from "playwright";

const browser = await chromium.launch();

async function inspect(path) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`https://loudsrl.com${path}`, {
    waitUntil: "networkidle",
    timeout: 90_000,
  });
  await page.waitForTimeout(5000);

  return page.evaluate(() => {
    const form = document.querySelector("form");
    const cells = form ? [...form.children].map((c) => ({
      tag: c.tagName,
      class: c.className?.slice(0, 120),
      label: c.querySelector("label")?.textContent?.trim(),
    })) : [];

    const cards = [...document.querySelectorAll("a[href^='/case-studies/']")]
      .map((a) => ({
        slug: a.getAttribute("href")?.replace("/case-studies/", ""),
        y: Math.round(a.getBoundingClientRect().top),
        h: Math.round(a.getBoundingClientRect().height),
      }))
      .filter((c) => c.y > 400 && c.h > 200);

    const submit = form?.lastElementChild;
    const submitInner = submit?.querySelector("div");

    return {
      path: location.pathname + location.search,
      cellCount: cells.length,
      cells,
      submitOuter: submit?.className,
      submitInner: submitInner?.className,
      submitBg: submit ? getComputedStyle(submit).backgroundColor : null,
      featured: cards,
      listItems: [...(document.querySelector("ol.list-number")?.children || [])].map(
        (li) => li.innerHTML?.slice(0, 80)
      ),
      videoWrap: document.querySelector("video")?.parentElement?.className,
      videoParent: document.querySelector("video")?.parentElement?.parentElement?.className,
    };
  });
}

const results = {};
for (const p of ["/contact-us", "/contact-us?c=startup", "/contact-us?c=career"]) {
  results[p] = await inspect(p);
}

console.log(JSON.stringify(results, null, 2));
await browser.close();
