import { chromium } from "playwright";

const ROUTE = "/pillars/think";
const viewports = [
  { name: "1440x900", width: 1440, height: 900 },
  { name: "390x844", width: 390, height: 844 },
];

const browser = await chromium.launch();

for (const [label, base] of [
  ["live", "https://loudsrl.com"],
  ["local", "http://127.0.0.1:3000"],
]) {
  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    try {
      await page.goto(`${base}${ROUTE}`, { waitUntil: "networkidle", timeout: 60_000 });
    } catch {
      /* partial ok */
    }
    await page.waitForTimeout(3000);
    await page.evaluate(() => {
      const doc = document.documentElement;
      doc.scrollTop = doc.scrollHeight - doc.clientHeight;
      const footer = document.querySelector("footer");
      if (footer) {
        const rect = footer.getBoundingClientRect();
        const adjust = rect.bottom - window.innerHeight;
        if (Math.abs(adjust) > 0.01 && Math.abs(adjust) < 2) window.scrollBy(0, adjust);
      }
    });
    await page.waitForTimeout(800);

    const data = await page.evaluate(() => {
      const footer = document.querySelector("footer");
      const ctaWrap = footer?.children[0];
      const ctaInner = ctaWrap?.querySelector("div");
      const ctaText = footer?.querySelector("p");
      const dualCta = document.querySelector("section.page-padding, section[class*='py-20']");
      const sections = [...document.querySelectorAll("main section, main > div")];
      const lastBeforeFooter = sections[sections.length - 1];

      const pick = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const s = getComputedStyle(el);
        return {
          top: Math.round(r.top),
          bottom: Math.round(r.bottom),
          h: Math.round(r.height),
          mt: s.marginTop,
          mb: s.marginBottom,
          pt: s.paddingTop,
          pb: s.paddingBottom,
          minH: s.minHeight,
        };
      };

      return {
        footer: pick(footer),
        ctaWrap: pick(ctaWrap),
        ctaInner: pick(ctaInner),
        ctaTextTop: ctaText ? Math.round(ctaText.getBoundingClientRect().top) : null,
        lastSection: pick(lastBeforeFooter),
        gapLastToFooter:
          footer && lastBeforeFooter
            ? Math.round(footer.getBoundingClientRect().top - lastBeforeFooter.getBoundingClientRect().bottom)
            : null,
        overlay: pick(footer?.querySelector("[aria-hidden]")),
      };
    });

    console.log(`${label} ${vp.name}:`, JSON.stringify(data, null, 2));
    await page.close();
  }
}

await browser.close();
