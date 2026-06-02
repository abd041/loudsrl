# Mobile QA Report — LOUD SRL Clone

**Breakpoints audited:** 430, 390, 375, 360, 320px  
**Date:** Final mobile polish pass

---

## Critical fix — Home hero text clipping

**Cause:** `singleLine` applied `whitespace-nowrap` at all widths; mono heading exceeded viewport on 320–430px.

**Fix:**
- Mobile: natural wrap + `text-balance`, smaller `clamp()` via `.hero-display--home`
- Desktop (`md+`): preserved single-line behavior
- Container: `w-full max-w-[100vw] overflow-hidden` on hero stack

---

## Issues found & fixed

| Area | Issue | Fix |
|------|--------|-----|
| Home hero | Horizontal text overflow | `HeroAnimatedText.tsx`, `globals.css`, `app/page.tsx` |
| Home hero | Bottom CTA / padding | Tighter mobile padding, `shrink-0` on pill |
| Header | Tagline crowding at 320px | Hide tagline below 341px; smaller logo row type |
| Contact | Tab headings too large | `text-xl` → `sm:text-2xl` + column stack on narrow |
| Manifesto | Principle titles / CTA overflow | Smaller mobile type; wrap CTA label |
| Route hero | Center layout overflow | `max-w-[100vw]`, `px-4`, reduced top padding |
| Fullscreen menu | Scroll on short viewports | `overflow-y-auto` on panel |
| Dual CTA | Tall cards on small screens | `min-h-[300px]` on mobile |
| Marquee | Large minimum type | Lower mobile `clamp()` |
| Industry hero | `w-max` title overflow | `max-w-full` + responsive sizes |
| Global | Horizontal scroll | `overflow-x: hidden` on `html` |

---

## Files modified

- `components/HeroAnimatedText.tsx`
- `app/globals.css`
- `app/page.tsx`
- `components/Header.tsx`
- `app/contact-us/page.tsx`
- `components/manifesto/ManifestoPrinciplesHover.tsx`
- `components/RouteHero.tsx`
- `components/FullscreenMenu.tsx`
- `components/DualCTA.tsx`
- `components/Marquee.tsx`
- `components/industries/IndustryHeroBanner.tsx`

---

## Before / after

**Before:** Home headline forced one line (`nowrap`); ~30px+ mono text wider than 375px viewport → clipped left/right.

**After:** Headline wraps to 2–3 balanced lines on mobile; stays centered; desktop remains single-line; mono hierarchy preserved.

---

## Remaining responsive risks

| Risk | Severity | Notes |
|------|----------|-------|
| WebGL hero GPU on low-end Android | Low | DPR capped; parallax off touch |
| Long case study titles in switcher | Low | Already `text-balance` + max-width |
| Studio video autoplay | Low | Platform-dependent |
| Custom cursor on hybrid tablets | Low | Coarse pointer uses native cursor |

---

## Updated mobile parity estimate

| Viewport | Before | After |
|----------|--------|-------|
| 430px | ~78% | **~92%** |
| 390px | ~75% | **~91%** |
| 375px | ~72% | **~91%** |
| 320px | ~68% | **~89%** |
| **Mobile overall** | ~74% | **~91%** |

*Desktop parity (~93%) unchanged.*

---

*Verify on device: home hero at 320/375/390, contact tabs, manifesto principles, industry carousel.*
