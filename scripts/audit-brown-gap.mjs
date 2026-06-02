import { chromium } from "playwright";

const ROUTE = "/pillars/think";

const browser = await chromium.launch();
for (const [label, base] of [
  ["live", "https://loudsrl.com"],
  ["local", "http://127.0.0.1:3000"],
]) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await page.goto(`${base}${ROUTE}`, { waitUntil: "networkidle", timeout: 90_000 });
  } catch {
    /* ok */
  }
  await page.waitForTimeout(3000);

  const full = await page.evaluate(() => {
    const dualCta = [...document.querySelectorAll("main section")].find((s) =>
      s.textContent?.includes("LOUD AGENCY")
    );
    const footer = document.querySelector("footer");
    const ctaText = footer?.querySelector("p");
    const logoMarquee = document.querySelector(".logo-marquee-scroll");

    const pick = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return {
        top: Math.round(r.top + window.scrollY),
        bottom: Math.round(r.bottom + window.scrollY),
        h: Math.round(r.height),
        bg: s.backgroundColor,
        class: String(el.className).slice(0, 100),
      };
    };

    return {
      logoMarquee: pick(logoMarquee),
      dualCta: pick(dualCta),
      footer: pick(footer),
      ctaText: pick(ctaText),
      ctaInner: pick(footer?.querySelector("footer > div > div")),
      gapLogoToFooter: logoMarquee && footer ? pick(footer).top - pick(logoMarquee).bottom : null,
      gapDualToFooter: dualCta && footer ? pick(footer).top - pick(dualCta).bottom : null,
      gapDualToText: dualCta && ctaText ? pick(ctaText).top - pick(dualCta).bottom : null,
      docH: document.documentElement.scrollHeight,
    };
  });

  console.log(`\n${label}:`, JSON.stringify(full, null, 2));
  await page.close();
}
await browser.close();
