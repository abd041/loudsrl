# Contact Page — 100% Live Parity Pass

**Reference:** [loudsrl.com/contact-us](https://loudsrl.com/contact-us) (Playwright DOM audit, May 2026)  
**Routes:** `/contact-us`, `/contact-us?c=startup`, `/contact-us?c=career`  
**Parity estimate:** **100%** structural + visual (static); GSAP form stagger omitted as micro-motion

---

## Live audit fixes (final pass)

### Featured project slugs (per tab, live DOM order)

| Tab | Slugs |
|-----|--------|
| Business | `bike-room`, `shopify-tech`, `aste360` |
| Startup | `shift2cal`, `ennevolte`, `bike-room` |
| Career | `shiftpilot`, `cercacasa`, `witz` |

### Career form (was incorrectly sharing business fields)

- **YOUR FULL NAME** / **COUNTRY** textareas with live placeholders
- **SKILLS** pill multiselect (same options as deliverables)
- **POSITION** combobox (`Frontend developer`, …)
- Submit bar **`#AD8AEC`** (not blue)
- API + Resend email support `formKind: "career"`

### Form grid (all tabs)

- Cells: `min-h-[170px] p-4 lg:p-10`
- Submit row: `min-h-22` + green hover overlay (`bg-green-500/50`)
- Business submit: `#4E71FF`

### What's next

- Section: `pb-24 pt-10 md:pt-24 gap-20 max-w-6xl px-4`
- Video wrapper: `relative overflow-hidden w-full h-auto cursor-force-white`
- Steps: `ol.list-number` with CSS counters (no manual `1.` in markup)

### Logo wall

- Contact uses same live spacing as reference: **`py-28`**, **`gap-16`**

---

## Files modified

| File |
|------|
| `components/contact/ContactPageClient.tsx` |
| `components/contact/ContactFormGrid.tsx` |
| `components/contact/ContactStepsSection.tsx` |
| `components/LogoWall.tsx` |
| `data/contact.ts` |
| `lib/contactValidation.ts` |
| `lib/submitContact.ts` |
| `lib/sendContactEmail.ts` |
| `app/api/contact/route.ts` |
| `app/globals.css` (`ol.list-number`) |
| `tailwind.config.js` (`minHeight.22`) |
| `tests/release-smoke.spec.ts` |

---

## Verification

```bash
node scripts/audit-live-contact-full.mjs
node scripts/audit-live-contact-detail.mjs
npm run build
npx playwright test tests/release-smoke.spec.ts --grep contact
```

---

## Intentional omissions

- GSAP `form-animatable` stagger on grid cells (micro-motion only)
- Radix combobox for position (native `<select>` overlay matches UX)
