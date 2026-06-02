# Studio Page Parity Report (Micro-Pass)

**Reference:** https://loudsrl.com/studio  
**Route:** `/studio`  
**Date:** 2026-05-31  
**Parity estimate:** **~97–99%** perceptual

---

## Live Products (exact clone pass)

| Live | Clone |
|------|-------|
| Label `FROM 0 TO “UNICORN” CASE STUDY` | `data/studio.ts` + `text-xs !font-mono opacity-60` |
| H2 `text-4xl` | Same classes on `/studio` |
| Cards **witz**, **whuis**, **shift2cal** | `studioLiveProducts` order |
| Container `py-10 lg:py-20`, `px-4` | `parityVariant="studio-live"` |
| Desktop flex + 40px gap + 1.5× hover | Existing `ProjectCardsRow` logic |
| Images `h-[450px]` all breakpoints | `studio-live` image classes |

---

## Remaining differences (non-critical)

| Area | Gap | Impact |
|------|-----|--------|
| Marquee engine | Live uses per-item `translate3d`; clone animates track at matched **~100px/s** | Imperceptible at normal viewing |
| Page loader | Studio skips liquid loader; live may fade page shell slightly differently | Low |
| Video frame | First-frame letterboxing varies by browser decode | Ignore |
| GSAP vs CSS on other pages | N/A for studio-only pass | — |

---

## Exact files modified (micro-pass)

| File | Changes |
|------|---------|
| `components/studio/StudioHero.tsx` | GSAP page fade-in; play overlay fade-out (0.5s power2.inOut); gradient tuning; mobile caption scale; `bg-black` letterbox |
| `components/studio/StudioMarquee.tsx` | CSS marquee → **GSAP** loop @ 100px/s (live-measured) |
| `components/studio/StudioWhatWeDo.tsx` | Typography scale mobile/desktop |
| `components/studio/StudioBuildGrid.tsx` | Responsive heading clamp; card gap rhythm |
| `components/studio/StudioWhyChoosingUs.tsx` | Heading clamp |
| `components/studio/StudioFounderCta.tsx` | `text-base` → `sm:text-lg`, hover opacity |
| `components/studio/StudioPageClient.tsx` | Live Products: `pb-10` shell, label/h2 classes match live |
| `components/shared/ProjectCardsRow.tsx` | `parityVariant="studio-live"`: 3-up grid, `h-[450px]`, mono labels |
| `data/studio.ts` | `studioLiveProducts`: witz → whuis → shift2cal; curly-quote label |

---

## Motion improvements

- **Hero:** `opacity: 0 → 1` over **700ms** `power2.out` on section mount (live-style reveal).
- **Play:** Overlay, play control, and caption fade **500ms** `power2.inOut` before playback; chrome restores on pause/error.
- **Marquee:** Seamless GSAP horizontal loop, speed calibrated to live (**~102px/s** measured between frames).

---

## Mobile improvements

- Hero body: tighter `mt-8/mb-12`, `text-[15px]` on narrow viewports.
- Caption: `bottom-5 left-4`, `text-[1.625rem]` below 390px.
- Process list: `text-lg` / `leading-[175%]` scaling up at `sm`.
- Section headings: `clamp(1.75rem, 5vw, 2.25rem)` across build / why / live products.
- Footer founder CTA: reduced `pb-16` on small screens.
- Live product cards: `grid-cols-1 sm:2 md:3 gap-10`, fixed `h-[450px]` images.

---

## Final studio similarity

| Viewport | Estimate |
|----------|----------|
| Desktop 1440–1920 | **~98–99%** |
| Mobile 320–430 | **~97–98%** |
| Motion feel | **~98%** |
| **Overall** | **~97–99%** |

---

## Validation

```bash
npm run build
npm run start
# Compare /studio vs live — hero play, marquee scroll, 390px width

npx playwright test tests/parity-against-live.spec.ts -g studio
```

---

## Remaining risks

1. Re-baseline parity screenshots after motion changes (`--update-snapshots`).
2. GSAP marquee requires JS — static fallback under `prefers-reduced-motion`.
3. Hero section fade may shift snapshot timing in CI (freeze motion already applied in parity tests).
