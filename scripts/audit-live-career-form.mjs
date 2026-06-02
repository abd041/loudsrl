import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("https://loudsrl.com/contact-us?c=career", {
  waitUntil: "networkidle",
  timeout: 90_000,
});
await page.waitForTimeout(5000);

const data = await page.evaluate(() => {
  const form = document.querySelector("form");
  const fields = [...form.querySelectorAll("textarea, input:not([type=file]):not([type=hidden])")].map(
    (el) => ({
      id: el.id,
      name: el.name,
      type: el.tagName,
      placeholder: el.getAttribute("placeholder"),
    })
  );

  const skills = [...form.querySelectorAll("label")].filter((l) =>
    l.textContent?.includes("SKILLS")
  );
  const skillPills = skills.length
    ? [...form.querySelectorAll("label[for^='skill'], label[for*='Skill']")].map((l) =>
        l.textContent?.trim()
      )
    : [];

  const allPills = [...form.querySelectorAll("label")].filter((l) =>
    l.className?.includes("rounded")
  ).map((l) => l.textContent?.trim());

  return {
    fields,
    skillPills: allPills,
    submitText: form?.querySelector("button")?.textContent?.trim(),
    emailPh: document.querySelector("#email")?.getAttribute("placeholder"),
  };
});

console.log(JSON.stringify(data, null, 2));
await browser.close();
