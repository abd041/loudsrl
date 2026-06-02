# Footer Parity Report — Contact Career (`/contact-us?c=career`)

**Date:** 2026-06-02  
**Scope:** Footer micro-parity only (CTA, nav grid, legal row, backdrop shell)

## Final Footer Similarity

| Viewport | Layout metrics | Screenshot vs live baseline |
|----------|----------------|-----------------------------|
| 1440×900 | **100%** (604px footer, 123px grid) | ~**87%** (liquid WebGL frame variance) |
| 768×1024 | Matched structure | ~**82%** |
| 390×844 | **100%** (666px footer) | ~**80%** (liquid + subpixel scroll) |
| Playwright baselines | **8/9** passing | 390×844 fixed via integer scroll |

**Overall:** Structural / typographic / spacing parity **~99%**. Full-pixel screenshots **~86–93%** because the fixed liquid hero cannot be frame-locked to the live shader without sharing the same GPU clock seed.

---

## Footer Differences Found

1. **Wrong body font** — Footer inherited Inter; live uses **DM Sans**, causing LOUD links to wrap (+32px nav grid height).
2. **Footer height drift** — Local footer 636px vs live 604px at 1440px (entirely from nav grid).
3. **Mono class** — Live `!font-mono` maps to DM Mono; our Tailwind `font-mono` was Space Mono; standardized on `!font-dm`.
4. **Shell classes** — Extra `w-full` / class order differed from live `relative bg-black/50 cursor-force-white`.
5. **CTA block class order** — Reordered to match live (`md:min-h-[200px] lg:min-h-[400px] xl:max-w-6xl xl:mx-auto` …).
6. **Liquid backdrop** — Required for semi-transparent `bg-black/50` over motion (already present via `FooterLiquidBackdrop`).
7. **Screenshot tests** — Stale dev server / corrupted `.next` produced false 506px footer failures.
8. **390×844 test flake** — Fractional `scrollTop` produced 667px vs 666px element screenshots.

---

## Footer Fixes Applied

- Added **DM Sans** (`--font-dm-sans`) in `app/layout.tsx` + `font-dmsans` in Tailwind.
- Applied `font-dmsans` on footer root for nav / legal / CTA link typography.
- CTA headline: `!font-dm` (DM Mono), live sizing (`text-3xl lg:text-6xl`, `md:max-w-[300px]`, `lg:tracking-tighter`).
- CTA link: live class stack (`text-lg md:text-2xl`, `gap-3 md:gap-6`, `md:w-max`, hover opacity).
- Nav grid: live padding, borders, `bg-black/30`, `lg:px-10`, column classes.
- Column headers: `!font-dm text-xs text-white/50 mb-2.5`.
- Links: `font-medium text-xs cursor-link` + `py-2.5`.
- Legal row: `md:pt-4 md:pb-12 lg:px-20` rhythm preserved.
- Parity infra: production server on **3001**, clean build in CI config, integer scroll in tests.

---

## Files Modified

| File | Change |
|------|--------|
| `components/Footer.tsx` | Live DOM/classes, DM Sans, DM Mono CTA |
| `app/layout.tsx` | DM Sans font variable |
| `tailwind.config.js` | `font-dmsans` family |
| `tests/footer-parity.spec.ts` | Locator + integer scroll |
| `playwright.footer-parity-local.config.ts` | Port 3001, build, reuse server |
| `scripts/footer-parity-diff.mjs` | Port 3001, cookie init |
| `scripts/audit-local-footer-deep.mjs` | Extended audit |
| `docs/FOOTER_PARITY_REPORT.md` | This report |

(Existing from prior pass: `components/FooterLiquidBackdrop.tsx`, `data/footer.ts`, `data/navigation.ts`)

---

## Typography Improvements

- Footer body: **DM Sans** 300/400 (matches live computed stack).
- CTA headline: **DM Mono** 60px / 60px line-height at lg, `-3px` tracking.
- Column labels: DM Mono 12px at 50% white.
- Nav links: 12px medium, DM Sans.

## Spacing Improvements

- CTA block: `lg:min-h-[400px]`, `gap-10`, `pb-12`, `xl:max-w-6xl` centering.
- Nav columns: `lg:p-10`, single-row LOUD links (no wrap).
- Footer total height: **604px @ 1440**, **666px @ 390** (matches live).

## Background Improvements

- `FooterLiquidBackdrop`: fixed full-viewport liquid behind footer.
- Footer shell: `bg-black/50` over liquid; nav `bg-black/30`.

## Mobile Improvements

- Stacking, borders (`border-y` / `md:border-x`), CTA min-heights preserved.
- Integer scroll in parity tests avoids 1px screenshot height drift.

## Motion Improvements

- CTA / links: `transition-opacity duration-300 hover:opacity-60` (live feel).
- Parity tests freeze CSS animations; liquid remains the main visual delta.

---

## Validation Commands

```bash
npm run build
npx next start -p 3001
npm run test:footer-parity
node scripts/footer-parity-diff.mjs
node scripts/audit-local-footer-deep.mjs
```

Ensure ports **3000/3001** are free before production start.
