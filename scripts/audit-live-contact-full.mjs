import { chromium } from "playwright";
import fs from "fs";

const browser = await chromium.launch();
const out = {};

for (const { path, name } of [
  { path: "/contact-us", name: "business" },
  { path: "/contact-us?c=startup", name: "startup" },
  { path: "/contact-us?c=career", name: "career" },
]) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`https://loudsrl.com${path}`, {
    waitUntil: "networkidle",
    timeout: 90_000,
  });
  await page.waitForTimeout(4000);

  out[name] = await page.evaluate(() => {
    const q = (sel) => document.querySelector(sel);
    const qa = (sel) => [...document.querySelectorAll(sel)];

    const logoP = qa("p").find((p) =>
      p.textContent?.includes("We think, design and develop")
    );
    const featuredRoot = logoP?.closest("div")?.previousElementSibling;

    const featured = featuredRoot
      ? [...featuredRoot.querySelectorAll("a[href^='/case-studies/']")].map((a) => ({
          slug: a.getAttribute("href")?.replace("/case-studies/", ""),
          t1: a.querySelector("p")?.textContent?.trim(),
          t2: qa("p", a)[1]?.textContent?.trim(),
          imgH: a.querySelector("img")?.getBoundingClientRect().height,
        }))
      : [];

    const form = q("form");
    const activeBtn = qa("button").find((b) => {
      const p = b.querySelector("p");
      return p && parseFloat(getComputedStyle(p).opacity) > 0.95;
    });

    return {
      featured,
      activeTab: activeBtn?.querySelector("p")?.textContent?.trim(),
      eyebrow: qa("p").find((p) => p.textContent?.includes("FIRST STEP"))?.className,
      formClass: form?.className,
      cellClass: form?.children[1]?.className,
      submitClass: form?.lastElementChild?.className,
      submitBg: form?.lastElementChild
        ? getComputedStyle(form.lastElementChild).backgroundColor
        : null,
      placeholders: {
        project: q("#project-type")?.getAttribute("placeholder"),
        industry: q("#industry")?.getAttribute("placeholder"),
        description: q("#description")?.getAttribute("placeholder"),
        email: q("#email")?.getAttribute("placeholder"),
      },
      steps: (() => {
        const whats = qa("p").find((p) => p.textContent?.trim() === "What's next.");
        const section = whats?.parentElement;
        return {
          sectionClass: section?.parentElement?.className,
          videoAspect: q("video")?.parentElement?.parentElement?.className,
          h2blue: whats?.className,
          h2black: whats?.nextElementSibling?.className,
          listClass: section?.querySelector("ol")?.className,
        };
      })(),
      logoSection: (() => {
        const wrap = logoP?.parentElement?.parentElement;
        return {
          wrapClass: wrap?.className,
          headingClass: logoP?.className,
          gap: wrap?.querySelector(".flex.flex-col")?.className,
        };
      })(),
      hateEmail: qa("p")
        .filter((p) => p.textContent?.includes("Hate contact"))
        .map((p) => ({
          vis: p.offsetParent !== null,
          parent: p.parentElement?.className,
        })),
    };
  });
}

// Mobile career
const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
await m.goto("https://loudsrl.com/contact-us?c=career", {
  waitUntil: "networkidle",
  timeout: 90_000,
});
await m.waitForTimeout(3000);
out.mobileCareer = await m.evaluate(() => ({
  formCols: document.querySelector("form")?.className,
  tabFont: document
    .querySelector("button p")
    ?.className?.slice(0, 120),
  featuredCount: [
    ...document.querySelectorAll("a[href^='/case-studies/']"),
  ].filter((a) => a.getBoundingClientRect().top > 500).length,
}));

fs.writeFileSync(
  "scripts/.audit-contact-live.json",
  JSON.stringify(out, null, 2)
);
console.log(JSON.stringify(out, null, 2));
await browser.close();
