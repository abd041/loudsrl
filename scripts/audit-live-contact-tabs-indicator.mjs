import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

for (const path of ["/contact-us", "/contact-us?c=career"]) {
  await page.goto(`https://loudsrl.com${path}`, {
    waitUntil: "networkidle",
    timeout: 90_000,
  });
  await page.waitForTimeout(4000);

  const data = await page.evaluate(() => {
    const tabBar = [...document.querySelectorAll("button")].find((b) =>
      b.querySelector("p")?.textContent?.includes("Evolve")
    )?.parentElement?.parentElement;

    const bars = tabBar
      ? [...tabBar.querySelectorAll("div")].filter((d) => {
          const bg = getComputedStyle(d).backgroundColor;
          return bg !== "rgba(0, 0, 0, 0)" && d.className.includes("absolute");
        })
      : [];

    return {
      path: location.pathname + location.search,
      tabBarClass: tabBar?.className,
      coloredBars: bars.map((d) => ({
        class: d.className,
        bg: getComputedStyle(d).backgroundColor,
        h: getComputedStyle(d).height,
        transform: d.style.transform,
      })),
      strikeLines: [...document.querySelectorAll("button")].filter((b) =>
        b.textContent?.includes("Evolve")
      )[0]
        ? [...document.querySelectorAll("button")]
            .filter((b) => b.querySelector("p")?.textContent?.match(/Evolve|Career/))
            .map((b) => {
              const line = b.querySelector(".h-\\[2px\\]");
              return {
                text: b.querySelector("p")?.textContent?.trim(),
                lineTransform: line?.style.transform,
                lineClass: line?.className,
              };
            })
        : [],
    };
  });

  console.log(JSON.stringify(data, null, 2));
}

await browser.close();
