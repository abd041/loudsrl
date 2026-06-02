# Complete Parity Review — LOUD Clone vs loudsrl.com

**Review date:** Production QA pass  
**Reference:** https://loudsrl.com/  
**Implementation:** `D:\loudsrl` (Next.js 14 + Tailwind)  
**Method:** Live site content audit, codebase inspection, Playwright baselines (36 snapshots), prior mobile/parity passes

---

## Updated similarity scores

| Page / area | Score | Notes |
|-------------|------:|-------|
| Home `/` | **90%** | Hero wrap fixed; WebGL feel ~85%; logo wall broken assets |
| Pillars (Think/Design/Develop) | **88%** | Develop CTA copy bug; table typo; parity tested mainly on Think |
| Manifesto | **92%** | Strong; dual CTA hint mismatch |
| Studio | **90%** | Video UX differs; marquee spacing |
| Contact | **91%** | White theme OK; featured cases + file upload gaps |
| Industries (×4) | **89%** | Carousel/marquee motion variance |
| Case studies (×11) | **86%** | Not in automated parity matrix |
| Global (header/footer/menu/cursor) | **88%** | Logo PNGs; placeholder header mark |
| Mobile 320–430px | **91%** | Post hero-clipping fix |
| **Overall weighted** | **~90%** | Target 95%+ blocked mainly on assets + ops |

---

## Critical issues (must fix before release)

### 1. Logo wall client logos 404 (PNG paths, SVG-only files)

| | |
|---|---|
| **Reference** | Live site shows full-color client logos in marquee (Beyond Doc, Bikeroom, etc.). |
| **Current** | `data/logos.ts` lists `white-*.png` / `black-*.png` but `public/logos/` only has `*.svg` (no PNGs). `logoSrc()` returns `.png` URLs → broken images in marquee. |
| **Required fix** | Download official logo PNGs from CMS or export from live; **or** change `data/logos.ts` + `logoSrc()` to use existing `.svg` filenames. |
| **Files** | `data/logos.ts`, `lib/media.ts`, `components/LogoWall.tsx`, `public/logos/*` |

### 2. Header brand mark is placeholder SVG

| | |
|---|---|
| **Reference** | Official LOUD logomark (PNG from CMS). |
| **Current** | `public/logos/logo-white.svg` / `logo-black.svg` are generated “L” placeholders; CDN `logo-white.png` returns 500. |
| **Required fix** | Add real `logo-white.png` / `logo-black.png` from brand assets; point `Header.tsx` to PNG with SVG fallback. |
| **Files** | `components/Header.tsx`, `public/logos/`, `scripts/download-case-study-media.mjs` |

### 3. Develop pillar — wrong Dual CTA copy

| | |
|---|---|
| **Reference** | Develop-specific agency CTA (engineering / product build angle). |
| **Current** | `agencyCta: "Want to evolve your real estate company?"` on Develop pillar — copy-paste from Real Estate industry. |
| **Required fix** | Replace with correct Develop CTA from live `/pillars/develop`. |
| **Files** | `data/pillars.ts` (develop entry, ~line 431) |

### 4. Contact — business featured case studies mismatch

| | |
|---|---|
| **Reference** | loudsrl.com/contact-us (business tab): **Shopify Tech**, **WHUIS** (live crawl; third card may be present in DOM). |
| **Current** | `business: ["shopify-tech", "bike-room", "ennevolte"]`. |
| **Required fix** | Align `contactFeatured.business` with live (likely `shopify-tech`, `whuis`, + third slug from live DOM). |
| **Files** | `data/contact.ts` |

### 5. Contact file upload non-functional

| | |
|---|---|
| **Reference** | Live shows “ATTACH FILES” UI; production may POST multipart to CMS. |
| **Current** | `FileUpload.tsx` is visual only; `/api/contact` accepts JSON only — files never sent. |
| **Required fix** | Either wire multipart + webhook or hide/disable upload if out of scope; style upload for **light** contact theme. |
| **Files** | `components/FileUpload.tsx`, `components/ContactForm.tsx`, `app/api/contact/route.ts` |

### 6. `CONTACT_WEBHOOK_URL` required in production

| | |
|---|---|
| **Reference** | Live form submits to backend. |
| **Current** | Without env, production returns **503** (correct) but form unusable until wired. |
| **Required fix** | Set `CONTACT_WEBHOOK_URL` + verify end-to-end on Vercel. |
| **Files** | `.env`, `app/api/contact/route.ts`, `.env.example` |

### 7. Orphan SVG placeholders in `public/media/` (35 files)

| | |
|---|---|
| **Reference** | All raster photography from CMS. |
| **Current** | 35 `*.svg` gradient placeholders still on disk; if any `data/` path lacks raster, `mediaSrc()` may serve placeholder. |
| **Required fix** | Run `npm run media:sync`; delete orphan SVGs when raster exists; audit paths in `data/caseStudies.ts`, `data/manifesto.ts`, `data/industryPages.ts`. |
| **Files** | `scripts/sync-remaining-media.mjs`, `public/media/*.svg`, `lib/media.ts` |

---

## High priority issues

### 8. Contact `FileUpload` still dark-theme styled on white page

| | |
|---|---|
| **Reference** | White form, dark borders/copy on upload zone. |
| **Current** | `border-white/20`, `text-white/50` hardcoded in `FileUpload.tsx`. |
| **Required fix** | Add `theme="light"` prop (mirror `ContactForm` / `CustomSelect`). |
| **Files** | `components/FileUpload.tsx`, `components/ContactForm.tsx` |

### 9. Dual CTA — Studio hint copy

| | |
|---|---|
| **Reference** | Manifesto footer CTAs both use **“POINT YOUR FINGER TO DISCOVER HOW TO DO THAT”**. |
| **Current** | `studioHint: "TAP TO DISCOVER HOW TO DO THAT"` in `data/dualCta.ts`. |
| **Required fix** | Match live string for studio card on manifesto (and globally if live uses same). |
| **Files** | `data/dualCta.ts` |

### 10. Pillar hero tables — “Approvation” vs live “Approval”

| | |
|---|---|
| **Reference** | Manifesto services list: **“Visual Design Approval”**. |
| **Current** | Think/Design pillar tables: **“Visual Design Approvation”** (typo). |
| **Required fix** | Use **Approval** everywhere or match live typo consistently (manifesto services already use Approval). |
| **Files** | `data/pillars.ts` |

### 11. Liquid hero — feel / frame parity (~85%)

| | |
|---|---|
| **Reference** | Smooth zoom-in, grain, mouse-reactive warp, preset timing on chapter change. |
| **Current** | Custom Three.js clone; Playwright allows **34%** pixel variance on home; tuning in `liquidPresets.ts` close but not identical. |
| **Required fix** | Side-by-side preset pass; optional freeze `iTime` for screenshots only. |
| **Files** | `data/liquidPresets.ts`, `components/LoudOriginalHero.tsx`, `lib/shaders/loud-fragment.glsl` |

### 12. Studio hero video — no poster / click-to-play only

| | |
|---|---|
| **Reference** | Live may autoplay muted in viewport or show poster frame immediately. |
| **Current** | Video `opacity-0` until play; black square until user clicks. |
| **Required fix** | Add `poster` image; consider `autoPlay muted playsInline` when in view (match live). |
| **Files** | `components/studio/StudioHero.tsx`, `data/studio.ts`, `public/media/studio/` |

### 13. Case studies — no automated parity coverage

| | |
|---|---|
| **Reference** | 11 case study templates with switcher, galleries, meta. |
| **Current** | Not in `tests/parity-against-live.spec.ts` routes. |
| **Required fix** | Add slugs to parity suite; visual pass per case study. |
| **Files** | `tests/parity-against-live.spec.ts` |

### 14. Pillars Design / Develop — limited parity testing

| | |
|---|---|
| **Reference** | Full pillar parity. |
| **Current** | Playwright baselines exist for **Think** only among pillars. |
| **Required fix** | Capture/compare Design + Develop at 1440/390. |
| **Files** | `tests/parity-against-live.spec.ts` |

---

## Medium issues

### 15. Home hero — mobile line breaks vs live

| | |
|---|---|
| **Reference** | live mobile: balanced 2–3 line mono headline, centered. |
| **Current** | Wrap enabled (fixed clipping); break points may differ from live. |
| **Required fix** | Compare 375px side-by-side; optional `<br>` or per-breakpoint `singleLine` only ≥768px. |
| **Files** | `components/HeroAnimatedText.tsx`, `app/globals.css` |

### 16. Home hero scroll — first chapter jump

| | |
|---|---|
| **Reference** | Chapter scroll may start from home then advance to Think. |
| **Current** | On first scroll increment when `hoverMenuIndex === null`, sets index **0** (Think), not home. |
| **Required fix** | Verify live behavior; adjust `useHeroHardScroll` initial transition. |
| **Files** | `hooks/useHeroHardScroll.ts` |

### 17. Header nav hover delay (1600ms) on home

| | |
|---|---|
| **Reference** | Liquid preview on nav hover timing. |
| **Current** | `setTimeout(..., 1600)` before first hover preview on home. |
| **Required fix** | Measure live delay; tune to match. |
| **Files** | `components/Header.tsx` |

### 18. Studio marquee text spacing

| | |
|---|---|
| **Reference** | Marquee may render **“Trusttheprocess.”** as continuous strip (no spaces). |
| **Current** | `studioMarqueeText: "Trust the process."` with spaces. |
| **Required fix** | Match live marquee string / letter-spacing. |
| **Files** | `data/studio.ts`, `components/studio/StudioMarquee.tsx` |

### 19. Show Industries vs Fullscreen menu — different patterns

| | |
|---|---|
| **Reference** | Two overlays: industries grid + main nav menu. |
| **Current** | `ShowIndustriesMenu` (fade, z-55) vs `FullscreenMenu` (clip-path, z-60); close button styles differ. |
| **Required fix** | Align motion (duration/easing) and close control styling. |
| **Files** | `components/ShowIndustriesMenu.tsx`, `components/FullscreenMenu.tsx` |

### 20. Custom cursor — desktop only

| | |
|---|---|
| **Reference** | Custom cursor on desktop; native on touch. |
| **Current** | Matches intent; tablet edge cases may feel odd. |
| **Required fix** | Confirm `(pointer: coarse)` coverage on iPad Pro. |
| **Files** | `components/shared/CustomCursor.tsx` |

### 21. Page loader — liquid routes only

| | |
|---|---|
| **Reference** | Loader on initial site entry. |
| **Current** | `PageLoader` blob animation on liquid routes; may differ duration from live. |
| **Required fix** | Compare first-visit timing with live. |
| **Files** | `components/PageLoader.tsx` |

### 22. Manifesto principles — touch has no hover preview

| | |
|---|---|
| **Reference** | Desktop hover shows image preview. |
| **Current** | `ManifestoHoverPreview` is `hidden lg:block` — mobile has no equivalent. |
| **Required fix** | Optional tap-to-preview on mobile if live provides it. |
| **Files** | `components/manifesto/ManifestoHoverPreview.tsx`, `ManifestoPrinciplesHover.tsx` |

### 23. Industry page — GSAP marquee stability

| | |
|---|---|
| **Reference** | Smooth infinite marquee. |
| **Current** | `IndustryScrollingMarquee` uses GSAP; parity capture required `updateSnapshots: "all"`. |
| **Required fix** | CSS marquee fallback for reduced motion + stable screenshots. |
| **Files** | `components/industries/IndustryScrollingMarquee.tsx` |

### 24. Contact email aside missing on mobile

| | |
|---|---|
| **Reference** | “Hate contact forms?” + email visible on desktop. |
| **Current** | Aside `hidden lg:block`; duplicate block below form on mobile — OK but layout differs from live narrow view. |
| **Required fix** | Visual check 390px against live. |
| **Files** | `app/contact-us/page.tsx` |

---

## Minor issues

### 25. Footer CTA “Work togheter”

| | |
|---|---|
| **Reference** | Live uses same intentional typo. |
| **Current** | `data/footer.ts` matches live typo. |
| **Required fix** | None unless client wants correction. |
| **Files** | `data/footer.ts` |

### 26. Services “Engeneering Validations”

| | |
|---|---|
| **Reference** | Live manifesto lists **“Engeneering Validations”** (typo). |
| **Current** | Matches live in `data/services.ts` and pillars. |
| **Required fix** | None for parity; fix only if client requests. |

### 27. Logo wall CTA “Be the next” vs home “Are you the next?”

| | |
|---|---|
| **Reference** | Different strings on purpose across site. |
| **Current** | Matches pattern. |
| **Required fix** | None. |

### 28. `section-label` tracking

| | |
|---|---|
| **Reference** | Small caps labels ~0.03rem tracking. |
| **Current** | `.section-label` uses `0.03rem`. |
| **Required fix** | None unless visual diff flags drift. |

### 29. Next.js 14.2.28 outdated banner

| | |
|---|---|
| **Reference** | N/A |
| **Current** | Dev overlay warns about Next version. |
| **Required fix** | Plan upgrade separately (regression risk). |

### 30. No Lenis smooth scroll

| | |
|---|---|
| **Reference** | Unclear if live uses Lenis (not confirmed in bundle audit). |
| **Current** | Native scroll + GSAP ScrollTrigger only. |
| **Required fix** | Only add if confirmed on live. |

---

## Responsive review summary

| Breakpoint | Status |
|------------|--------|
| 1920 / 1440 / 1280 | Strong; logo wall assets fail |
| 1024 / 768 | Good; pillar table horizontal scroll OK |
| 430 / 390 / 375 | Hero wrap fixed; contact tabs stack |
| 320 | Tagline hidden &lt;341px; hero scales down |

---

## Animation & motion summary

| System | Parity | Gap |
|--------|--------|-----|
| Liquid hero WebGL | ~85% | Frame variance, preset tuning |
| Home hero GSAP text | ~92% | Stagger/delay vs live |
| Home chapter scroll | ~88% | First-index behavior |
| CSS marquees | ~90% | Speeds tuned (36–55s) |
| Fullscreen menu clip | ~91% | 0.7s ease |
| Industry GSAP marquee | ~87% | Capture instability |
| Cursor GSAP | ~90% | Desktop-only OK |
| Scroll reveals | ~88% | ScrollTrigger vs live |

---

## Content review summary

| Item | Match? |
|------|--------|
| Nav labels (Think., Design., …) | Yes |
| Home hero copy | Yes |
| Manifesto principles (5) | Yes |
| Manifesto featured cases | Yes (`whuis`, `cercacasa`, `catasto-20`) |
| Studio live products | Yes (`whuis`, `shift2cal`) |
| Contact steps copy | Yes |
| Contact business featured | **No** — see Critical #4 |
| Develop pillar CTA | **No** — see Critical #3 |
| Industry per-page CTAs | Yes (in `industryPages.ts`) |
| Dual CTA submit label | Yes (“Submit your idea”) |

---

## Exact files to modify (priority order)

1. `data/logos.ts` + `public/logos/` — client logo assets  
2. `components/Header.tsx` + header logo assets  
3. `data/pillars.ts` — Develop `agencyCta`  
4. `data/contact.ts` — featured case slugs  
5. `components/FileUpload.tsx` + `ContactForm.tsx` + `app/api/contact/route.ts`  
6. `scripts/sync-remaining-media.mjs` + remove orphan `public/media/*.svg`  
7. `data/dualCta.ts` — studio hint  
8. `data/pillars.ts` — Approvation → Approval  
9. `components/studio/StudioHero.tsx` — video poster/autoplay  
10. `data/liquidPresets.ts` + `components/LoudOriginalHero.tsx`  
11. `hooks/useHeroHardScroll.ts` — chapter index behavior  
12. `components/Header.tsx` — hover delay  
13. `tests/parity-against-live.spec.ts` — case studies + pillars design/develop  

---

## Path to 95–100%

1. **Fix logo assets** (wall + header) — largest visible gap site-wide.  
2. **Fix content bugs** (Develop CTA, contact featured).  
3. **Complete media sync** (zero SVG placeholders).  
4. **Wire contact** (webhook + upload or remove).  
5. **Run full Playwright matrix** including case studies.  
6. **Liquid hero** side-by-side session (accept ~5% feel variance or invest in shader port).  

---

*Generated from codebase + live site audit. For implementation history see `CLONE_PARITY_REPORT.md`, `MOBILE_QA_REPORT.md`, `PRODUCTION_DELIVERY_REPORT.md`.*
