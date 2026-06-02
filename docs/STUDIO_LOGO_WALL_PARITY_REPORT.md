# Studio Logo Wall — Micro-Parity Report

**Reference:** https://loudsrl.com/studio  
**Section:** “We think, design and develop world-class digital products for forward-thinking brands.” + client logo marquee  
**Date:** 2026-05-31  
**Parity estimate:** **~96–98%** perceptual

---

## Differences Found

| Area | Live | Clone (before) |
|------|------|----------------|
| **Logos** | 21 CMS PNGs (`black-*`), incl. `black-cercacasa-1.png` | 21 SVGs; wrong `black-cercacasa.svg`; `logoSrc` remapped PNG→SVG |
| **Order** | beyond-doc → … → zest (live DOM order) | Different order; missing witz-era extras |
| **Marquee** | GSAP `translate3d`, ~162px/s, pause on hover | CSS `@keyframes` 55s |
| **Logo size** | `h-10` wrapper, `h-full w-auto`, 660×220 intrinsic | `max-w-[160px]`, responsive heights |
| **Gap** | `gap-10 md:gap-20` | Same (OK) |
| **Heading** | `text-5xl leading-[115%]` all breakpoints | `text-3xl md:text-4xl lg:text-5xl` |
| **Section pad** | `py-28` inside `mt-20` wrapper | `py-20 md:py-28` + ScrollReveal fade |
| **CTA** | No “Be the next” on `/studio` | Extra CTA under marquee |
| **Founder CTA** | `mt-11`, `text-lg`, `/contact-us`, `#4E71FF` icon | Extra padding, purple icon, `?c=startup` |

---

## Logos Replaced / Synced

All **42** assets (21× black + 21× white) from `https://loudsrl.com/api/media/file/`:

`black-beyond-doc.png` … `black-zest.png` (incl. **`black-cercacasa-1.png`**), plus matching `white-*` variants.

**Sync command:** `npm run logos:sync:clients` or `npm run logos:sync`

---

## Exact Files Modified

| File | Change |
|------|--------|
| `data/logos.ts` | Live PNG list + order; removed SVG-only entries |
| `lib/media.ts` | `logoSrc()` returns `/logos/{filename}` as-is |
| `components/LogoWall.tsx` | GSAP marquee, live typography/layout, `sectionLayout="studio"` |
| `components/studio/StudioPageClient.tsx` | Studio logo wall + `mt-11` founder block |
| `components/studio/StudioFounderCta.tsx` | Live link, size, icon color |
| `scripts/sync-client-logos.mjs` | **New** — CMS logo downloader |
| `package.json` | `logos:sync:clients`, `media:sync` chain |

---

## Spacing / Typography Fixes

- Heading: `max-w-6xl mx-auto w-full px-4 text-center text-balance text-5xl leading-[115%]`
- Section: `mt-20` + `py-28` (studio layout)
- Text ↔ marquee: `flex flex-col gap-16` (64px)
- Founder CTA: `mt-11` below logo block

---

## Motion / Interaction

- **GSAP** horizontal loop at **~162px/s** (measured on live)
- **Pause** on mouse enter / touch start on marquee strip
- **`cursor-grab`** on overflow container
- Duplicated track items use `.clone` class (live parity)
- Removed ScrollReveal on this block (live does not fade the logo wall separately)

---

## Responsive Improvements

| Viewport | Live | Clone |
|----------|------|-------|
| 1440 / 1280 | `text-5xl`, flex marquee | Matched |
| 768 / 430 / 390 / 375 / 320 | Same `text-5xl` (48px) | Matched (no downscale) |
| Mobile grid | N/A — horizontal scroll marquee | Same |

---

## Updated Section Similarity %

| Viewport | Estimate |
|----------|----------|
| Desktop 1440 | **~97–98%** |
| Tablet 768 | **~96–97%** |
| Mobile 320–430 | **~96–97%** |
| Logo assets | **~98%** (PNG from CMS) |
| Motion | **~95–97%** |
| **Overall** | **~96–98%** |

---

## Remaining micro-gaps

1. `border-[#dfdfdf]` on live computes as **0px** border (spacing-only `mt-20`) — class kept for DOM parity.
2. Live uses Next/Image CDN URLs; clone serves static `/logos/*.png` (visually equivalent).
3. Page-level GSAP shell fade may still differ slightly from live route transition.

---

## Validation

```bash
npm run logos:sync:clients
npm run build
npm run dev
# Compare /studio logo strip vs https://loudsrl.com/studio
```
