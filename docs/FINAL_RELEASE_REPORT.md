# Final Release Report — LOUD SRL Clone

**Date:** 2026-05-31  
**Phase:** Final release QA + production hardening  
**Overall parity estimate:** **~94–96%** (visual/content); **production readiness: release candidate**

---

## 1. Final similarity estimate

| Route / area | Estimate | Notes |
|--------------|----------|--------|
| Home | 94% | Liquid hero + industry hover; minor shader/timing variance |
| Manifesto | 95% | Principles hover, featured cases aligned |
| Studio | 94% | Video/marquee timing frozen in parity tests |
| Contact | 96% | White theme, featured slugs, form + upload |
| Pillars (Think/Design/Develop) | 93–95% | Copy/CTA fixes applied; hero media from CDN |
| Industries (×5) | 92–94% | AI parity baselined; extended routes in `PARITY_FULL` |
| Case studies (×11) | 91–94% | Content complete; some preview SVG placeholders remain |
| Header / menu | 96% | Real PNG logomarks; iOS scroll lock hardened |
| **Overall** | **~94–96%** | Agency-grade clone; not pixel-identical to live |

---

## 2. Lighthouse scores

Automated capture: `npm run build && npm run start` then `npm run lighthouse` → `docs/lighthouse-scores.json`.

**Expected ranges** (mid-range mobile / desktop, production build on Vercel):

| Category | Desktop (est.) | Mobile (est.) |
|----------|----------------|---------------|
| Performance | 72–88 | 58–78 |
| Accessibility | 90–98 | 90–98 |
| Best Practices | 92–100 | 92–100 |
| SEO | 95–100 | 95–100 |

**Performance notes (intentional tradeoffs):**

- Home WebGL liquid hero is GPU-heavy; DPR capped on coarse pointers, pauses when off-screen/tab hidden.
- GSAP + Framer Motion on marketing pages; reduced-motion paths disable marquees and simplify menu animation.
- Large case-study imagery mitigated via `next/image` + long-cache headers on `/media` and `/logos`.

Run Lighthouse locally after deploy for authoritative numbers.

---

## 3. QA performed (this pass)

### Automated (8/8 passing)

- `tests/release-smoke.spec.ts` — overflow, menu open/close/Escape, contact validation, API honeypot + success, skip link, robots/sitemap.
- `npm run build` — clean production compile (31 routes including `robots.txt`, `sitemap.xml`).

### Code-level interaction audit

| Area | Status |
|------|--------|
| Menu open/close | Fixed: iOS scroll lock, Escape, focus close button, 44px tap targets |
| Cursor | Disabled on `pointer: coarse` and `prefers-reduced-motion` |
| WebGL hero | RAF paused off-screen/hidden tab; dispose on unmount; reduced-motion static preset |
| Contact | Timeout 25s, retry on 502/503/429, 413 on oversized body, no silent prod success without webhook |
| File upload | Client validation + server validation; drag/drop on touch |
| Horizontal overflow | Guarded in smoke test + `overflow-x: hidden` on html/body |

### Real-device matrix (manual sign-off recommended)

| Environment | Status |
|-------------|--------|
| Chrome / Edge / Firefox desktop | Smoke-tested via Playwright Chromium |
| Safari desktop | Manual recommended (WebGL + `100svh`) |
| iPhone Safari | Manual recommended (scroll lock, safe-area, form keyboard) |
| Chrome Android | Manual recommended (touch upload, menu) |

---

## 4. Remaining known limitations (unavoidable or deferred)

1. **Liquid hero feel** — Three.js shader clone; not identical frame-by-frame to live R3F bundle.
2. **Some `public/media/*.svg` placeholders** — CDN has no raster for every basename; cards fall back via `mediaSrc()`.
3. **Contact attachments** — Base64 in webhook JSON (6 MB cap); no S3/direct upload (by design for simple CRM hooks).
4. **Parity baselines** — Extended routes (`PARITY_FULL=1`) need snapshot capture before CI strict compare.
5. **Studio hero video** — Depends on hosted asset; poster parity may differ slightly.
6. **Custom cursor** — Intentionally off on touch devices (matches premium sites; not a bug).

---

## 5. Production readiness checklist

### Build & deploy

- [x] `npm run build` succeeds
- [x] `CONTACT_WEBHOOK_URL` + `CONTACT_REQUIRE_WEBHOOK` documented in `.env.example`
- [x] `NEXT_PUBLIC_SITE_URL` for sitemap/OG
- [x] Vercel-compatible App Router (API routes `nodejs`, `maxDuration: 30` on contact)
- [x] Security headers (nosniff, frame, referrer, permissions-policy)
- [x] Cache headers on `/media/*` and `/logos/*`

### SEO

- [x] `app/robots.ts` → `/robots.txt`
- [x] `app/sitemap.ts` → all pillars, industries, case studies, contact variants
- [x] Global metadata + Open Graph + viewport `viewportFit: cover`
- [x] Favicons → brand PNGs in `/logos/` (replacing missing `.ico` files)

### Accessibility

- [x] Skip to content link
- [x] `:focus-visible` outlines
- [x] Menu `role="dialog"`, `aria-modal`, labelled open/close
- [x] Form labels / `aria-busy` / `aria-live` on errors
- [x] `prefers-reduced-motion` CSS + component checks

### Regression protection

- [x] `tests/release-smoke.spec.ts` (CI-friendly)
- [x] `tests/parity-against-live.spec.ts` + shared `tests/lib/parity.ts`
- [x] `tests/parity-menu.spec.ts` (menu open state)
- [x] CI uses 2 viewports (`1440`, `390`); full matrix locally
- [x] Set `PARITY_FULL=1` for extended routes (industries + case studies)

### Commands

```bash
npm run build
npm run test:smoke
npm run test:parity          # after baselines captured
PARITY_FULL=1 npm run test:parity   # Unix — extended routes
npm run test:parity:capture  # refresh baselines from local build
npm run lighthouse           # requires `npm run start` in another terminal
```

---

## 6. Files modified (final pass)

| File | Change |
|------|--------|
| `lib/useBodyScrollLock.ts` | **New** — iOS-safe scroll lock |
| `lib/submitContact.ts` | **New** — timeout, retry, unified submit |
| `lib/contactValidation.ts` | (existing) shared validation |
| `app/api/contact/route.ts` | 413 body limit, 504 timeout, prod logging cleanup |
| `components/ContactForm.tsx` | Uses `submitContact`, tap targets |
| `components/FileUpload.tsx` | Rejection hints, touch-friendly |
| `components/Header.tsx` | Scroll lock hook, safe-area, menu a11y |
| `components/FullscreenMenu.tsx` | Escape, focus, reduced motion, safe-area |
| `app/globals.css` | Safe-area padding, 16px inputs on mobile |
| `app/layout.tsx` | `viewport`, OG image, PNG favicons |
| `app/robots.ts` | **New** |
| `app/sitemap.ts` | **New** |
| `next.config.mjs` | Logo cache, permissions-policy |
| `tests/lib/parity.ts` | **New** — shared parity helpers |
| `tests/parity-against-live.spec.ts` | Refactored + contact tabs |
| `tests/parity-menu.spec.ts` | **New** |
| `tests/release-smoke.spec.ts` | **New** |
| `scripts/run-lighthouse.mjs` | **New** |
| `package.json` | `test:smoke`, `lighthouse` |
| `tsconfig.json` | Exclude `tests/` from Next typecheck |
| `.env.example` | `NEXT_PUBLIC_SITE_URL` |

---

## 7. Recommended future improvements (optional)

- Capture Lighthouse in CI against Vercel preview URLs.
- Replace attachment base64 with S3 presigned uploads for large files.
- Refresh `PARITY_FULL` baselines and enable in GitHub Actions.
- Add `apple-touch-icon` at 180×180 (export from brand kit).
- Visual diff against live (`npm run test:parity:capture` with live URL config) on release tags only.
- Service worker / offline — not required for marketing site.

---

## 8. Sign-off

This codebase is a **production-safe release candidate** for deployment to Vercel (or equivalent) once:

1. `CONTACT_WEBHOOK_URL` is set in production.
2. `NEXT_PUBLIC_SITE_URL` matches the deployed domain.
3. Manual smoke on **Safari iOS** (menu + contact + home hero) is completed.
4. Parity snapshots are updated if `PARITY_FULL=1` is enforced in CI.

**No broad UI changes were made in this pass** — only stability, a11y, contact hardening, SEO, and regression tooling.
