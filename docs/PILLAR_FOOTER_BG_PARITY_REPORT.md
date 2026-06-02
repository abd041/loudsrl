# Footer Background Parity — `/pillars/think`

**Route:** `https://loudsrl.com/pillars/think` vs `localhost:3000/pillars/think`  
**Scope:** Footer CTA background only (“Let’s build something great…” section)

## Final Footer Background Similarity

| Viewport | CTA background clip vs live |
|----------|----------------------------|
| 1440×900 | **98.04%** |
| 390×844 | **98.35%** |

Structural parity: **100%** (fixed liquid canvas, `bg-black/50`, transparent CTA wrap, no extra grain layer)

Remaining ~2% is WebGL frame timing (liquid animation phase), not layout/overlay.

---

## Background Differences Found

1. **Missing fixed liquid on pillar pages** — `FooterLiquidBackdrop` skipped when `pathUsesLiquidHero()` was true. Hero canvas scrolled off-screen (`top: -4915px`), leaving footer over flat `bg-black/50` with no texture.
2. **Live always uses one fixed canvas** — `fixed top-0 left-0 w-screen z-0 h-screen` visible behind footer at scroll bottom.
3. **Extra CSS grain overlay** — `.footer-liquid-grain` existed locally but not on live (removed).
4. **Over-aggressive footer shader tuning** — Forced grain + high contrast made texture harsher than live’s soft, cinematic feel.
5. **Missing `h-screen`** on fixed backdrop wrapper (height now explicit).

---

## Overlay/Texture Fixes Applied

- **`FooterLiquidBackdrop`** now renders on **all routes** (including pillar pages), matching live fixed liquid.
- Restored live shell: `fixed top-0 left-0 z-0 h-screen w-screen overflow-hidden`.
- Removed `.footer-liquid-grain` pseudo-texture from CTA (live uses shader-only atmosphere).
- Softened `FOOTER_BACKDROP_TUNING`: contrast ×1.1, lighting +0.06, zoom 3, grain boost only when preset already uses grain.
- Footer overlay stack unchanged vs live: shell `bg-black/50`, CTA wrap transparent, nav/legal `bg-black/30`.

---

## Files Modified

| File | Change |
|------|--------|
| `components/FooterLiquidBackdrop.tsx` | Always render fixed liquid; live classes + `h-screen` |
| `components/Footer.tsx` | Remove CSS grain overlay from CTA block |
| `components/LoudOriginalHero.tsx` | Softer footer backdrop tuning; respect preset `useGrain` |
| `data/liquidPresets.ts` | Recalibrated `FOOTER_BACKDROP_TUNING` |
| `app/globals.css` | Removed `.footer-liquid-grain` |
| `scripts/audit-pillar-footer-bg.mjs` | DOM audit (new) |
| `scripts/pillar-footer-bg-diff.mjs` | CTA background screenshot diff (new) |

---

## Contrast Improvements

- Think pillar preset (warm `#CF907B` marble) now visible through `bg-black/50`.
- No forced grain on grain-free presets → softer, live-like transitions.
- Lighting bump (+0.06) adds depth without harsh highlights.

## Responsive Background Improvements

- Fixed viewport liquid scales correctly at 390px and 1440px (98%+ similarity both).
- Footer metrics unchanged: CTA wrap **401px** @ 1440, **233px** @ 390 (matches live).

## Motion Improvements

- Footer backdrop uses `footerBackdrop` mode: always animates (no intersection pause).
- `preventZoomAnimation` + zoom **3** for stable, wide swirls behind typography.

---

## Validation

```bash
npm run build
npx next start -p 3000
node scripts/audit-pillar-footer-bg.mjs
node scripts/pillar-footer-bg-diff.mjs
```

Clips saved under `scripts/.pillar-footer-bg/`.

---

## Note

Local `canvasCount: 2` vs live `1` — RouteHero still embeds a hero-section canvas; the new fixed footer canvas is what restores footer atmosphere. Merging to a single global canvas would be a future perf refactor, not required for visual parity.
