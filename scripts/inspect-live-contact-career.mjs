import { chromium } from "playwright";

const browser = await chromium.launch();

for (const path of ["/contact-us", "/contact-us?c=startup", "/contact-us?c=career"]) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`https://loudsrl.com${path}`, {
    waitUntil: "networkidle",
    timeout: 90_000,
  });
  await page.waitForTimeout(3500);

  const slugs = await page.evaluate(() => {
    const body = document.body.innerText;
    const start = body.indexOf("Let's collaborate") !== -1
      ? body.indexOf("Let's collaborate")
      : body.indexOf("Let\u2019s collaborate");
    const end = body.indexOf("We think, design and develop");
    if (start < 0 || end < 0) return { error: "markers", start, end };

    const slice = body.slice(start, end);
    const links = [...document.querySelectorAll("a[href^='/case-studies/']")].filter(
      (a) => {
        const t = a.textContent || "";
        return slice.includes(t.slice(0, 12).trim()) || false;
      }
    );

    // Better: find featured row container between h2 area and logo
    const logo = [...document.querySelectorAll("p")].find((p) =>
      p.textContent?.includes("We think, design and develop")
    );
    const row = logo?.parentElement?.previousElementSibling;

    const fromRow = row
      ? [...row.querySelectorAll("a[href^='/case-studies/']")].map((a) =>
          a.getAttribute("href")?.replace("/case-studies/", "")
        )
      : [];

    if (fromRow.length) return { path: location.pathname + location.search, slugs: fromRow };

    // fallback: links above logo heading
    const logoEl = logo;
    const all = [...document.querySelectorAll("a[href^='/case-studies/']")]
      .filter((a) => {
        if (!logoEl) return false;
        const r = a.getBoundingClientRect();
        const l = logoEl.getBoundingClientRect();
        return r.top > 400 && r.bottom < l.top + 50;
      })
      .map((a) => a.getAttribute("href")?.replace("/case-studies/", ""));

    return { path: location.pathname + location.search, slugs: [...new Set(all)].slice(0, 3) };
  });

  console.log(JSON.stringify(slugs));
}

await browser.close();
