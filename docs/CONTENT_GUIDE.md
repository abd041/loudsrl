# LOUD Website — Content Update Guide (Detailed Edition)

This document is the **complete reference** for updating the LOUD marketing website: text, images, videos, logos, navigation, SEO, case studies, and more.

**Who this is for:** marketing teams, content editors, and anyone maintaining the site who may not write code daily.

**What you need:** a text editor (VS Code, Cursor, etc.), access to the project folder, and optionally Node.js to preview changes locally.

---

## Table of contents

### Getting started
1. [How the site stores content](#1-how-the-site-stores-content)
2. [Glossary](#2-glossary)
3. [Complete file index](#3-complete-file-index)
4. [Site URL map](#4-site-url-map)
5. [Quick reference — page → files](#5-quick-reference--page--files)

### Media & assets
6. [Images — paths, folders, and rules](#6-images--paths-folders-and-rules)
7. [Videos](#7-videos)
8. [Logos (header + client wall)](#8-logos-header--client-wall)
9. [Media guidelines](#9-media-guidelines)

### Global settings
10. [SEO, browser title, favicons](#10-seo-browser-title-favicons)
11. [Navigation, footer & social links](#11-navigation-footer--social-links)

### Page-by-page content
12. [Homepage — full section map](#12-homepage--full-section-map)
13. [Think / Design / Develop (Pillar pages)](#13-think--design--develop-pillar-pages)
14. [Industry pages](#14-industry-pages)
15. [Manifesto page](#15-manifesto-page)
16. [Studio page](#16-studio-page)
17. [Contact page & form](#17-contact-page--form)
18. [Case studies](#18-case-studies)
19. [Dual CTA block (Agency / Studio)](#19-dual-cta-block-agency--studio)
20. [Logo wall component](#20-logo-wall-component)
21. [Homepage hero colors (liquid animation)](#21-homepage-hero-colors-liquid-animation)

### Reference
22. [Cross-reference: when you change X, also check Y](#22-cross-reference-when-you-change-x-also-check-y)
23. [Hardcoded content (developer help needed)](#23-hardcoded-content-developer-help-needed)
24. [Step-by-step tutorials](#24-step-by-step-tutorials)
25. [How to preview & deploy](#25-how-to-preview--deploy)
26. [Troubleshooting](#26-troubleshooting)
27. [Master checklist](#27-master-checklist)

---

## 1. How the site stores content

The LOUD site is a **Next.js** application. Content is split into two layers:

| Layer | Folder | Contains |
|-------|--------|----------|
| **Content definitions** | `data/` | Text, URLs, lists, image *paths*, references to case studies |
| **Media files** | `public/` | Actual PNG, JPG, WebP, MP4, ICO files |

### The golden rule

Every image path in a data file must match a real file in `public/`.

```
Path in data file:     "/media/think-hero.webp"
Actual file on disk:   public/media/think-hero.webp
```

Paths always start with `/` and never include `public/` in the string.

### Folder structure

```
loudsrl/
├── data/                    ← EDIT TEXT & PATHS HERE (primary)
│   ├── navigation.ts
│   ├── footer.ts
│   ├── logos.ts
│   ├── homeHeroPreviews.ts
│   ├── pillars.ts
│   ├── industryPages.ts
│   ├── industries.ts        ← auto-derived; rarely edit manually
│   ├── manifesto.ts
│   ├── services.ts
│   ├── studio.ts
│   ├── contact.ts
│   ├── dualCta.ts
│   ├── liquidPresets.ts
│   └── caseStudies.ts       ← AUTO-GENERATED — do not edit by hand
│
├── public/                  ← UPLOAD FILES HERE
│   ├── logos/
│   ├── media/
│   │   ├── deliverables/
│   │   └── studio/
│   ├── favicon-light.ico
│   ├── favicon-dark.ico
│   └── apple-touch-icon-light.png
│
├── app/                     ← Page routes + some hardcoded copy + SEO
├── components/              ← Layout + some hardcoded UI strings
└── scripts/
    ├── case-studies-live.json      ← Case study source (CMS export)
    ├── build-case-studies-data.mjs ← Regenerates data/caseStudies.ts
    └── download-case-study-media.mjs
```

### How pages load content

Most pages follow this pattern:

1. A **page file** in `app/` (e.g. `app/studio/page.tsx`) sets the route.
2. A **client component** renders sections.
3. **Data** is imported from `data/*.ts`.
4. **Images** are loaded from paths pointing to `public/`.

You almost never need to touch React components for routine copy updates — only `data/` and `public/`.

---

## 2. Glossary

| Term | Meaning |
|------|---------|
| **Slug** | URL-friendly ID, e.g. `whuis` → `/case-studies/whuis` |
| **Eyebrow** | Small uppercase label above a headline (e.g. `PRODUCT STRATEGY`) |
| **Marquee** | Infinitely scrolling text band |
| **Pillar** | One of Think, Design, Develop — core service pages |
| **Logo wall** | Scrolling strip of client logos + “Be the next” CTA |
| **Dual CTA** | Split block: LOUD AGENCY (left) + LOUD STUDIO (right) |
| **Liquid hero** | Animated color background on the homepage |
| **Case study slug** | Short name used to link projects across the site |

---

## 3. Complete file index

Every file in `data/` and what it controls:

| File | Controls |
|------|----------|
| `navigation.ts` | Header menu (`mainNav`), footer link columns (`footerNav`), social URLs |
| `footer.ts` | Footer hero CTA lines, copyright, legal address, tagline |
| `logos.ts` | Client logo filenames (light/dark), logo wall headline |
| `homeHeroPreviews.ts` | Homepage hero text for each scroll “chapter” (Home → Studio) |
| `pillars.ts` | Full Think / Design / Develop page content |
| `industryPages.ts` | All four industry detail pages + homepage card source data |
| `industries.ts` | Homepage industry cards & marquee (derived from `industryPages`) |
| `manifesto.ts` | Principles, deliverables grid, featured case studies, overview |
| `services.ts` | 12-column services grid on Manifesto page |
| `studio.ts` | Entire Studio page: hero, video, cards, bullets, live products |
| `contact.ts` | Contact tabs, form options, “What’s next” steps, featured case studies |
| `dualCta.ts` | Agency/Studio CTA backgrounds and default copy |
| `liquidPresets.ts` | Homepage animated background colors (6 presets + home default) |
| `caseStudies.ts` | **Generated** — all 11 case study pages |

---

## 4. Site URL map

| URL | Page name |
|-----|-----------|
| `/` | Homepage |
| `/pillars/think` | Think pillar |
| `/pillars/design` | Design pillar |
| `/pillars/develop` | Develop pillar |
| `/manifesto` | Manifesto |
| `/studio` | Studio |
| `/contact-us` | Contact (default tab: business) |
| `/contact-us?c=startup` | Contact — Start a company tab |
| `/contact-us?c=career` | Contact — Career tab |
| `/industries/ai` | Artificial Intelligence industry |
| `/industries/e-commerce` | E-Commerce industry |
| `/industries/mobile-apps` | Mobile Apps industry |
| `/industries/real-estate` | Real Estate industry |
| `/case-studies/{slug}` | Individual case study (11 slugs — see §18) |

**Redirect:** `/industries/artificial-intelligence` → `/industries/ai` (in `next.config.mjs`).

---

## 5. Quick reference — page → files

| Page | Primary data files | Media location |
|------|-------------------|----------------|
| Home | `homeHeroPreviews.ts`, `industryPages.ts`, `logos.ts`, `liquidPresets.ts` | `public/media/`, `public/logos/` |
| Think / Design / Develop | `pillars.ts` | `public/media/` |
| Industries | `industryPages.ts` | `public/media/` |
| Manifesto | `manifesto.ts`, `services.ts` | `public/media/deliverables/` |
| Studio | `studio.ts` | `public/media/studio/` |
| Contact | `contact.ts` + `app/contact-us/page.tsx` (email) | — |
| Case studies | `scripts/case-studies-live.json` → `caseStudies.ts` | `public/media/` |
| All pages (nav/footer) | `navigation.ts`, `footer.ts` | `public/logos/` |
| SEO (global) | `app/layout.tsx` | `public/favicon-*.ico` |

---

## 6. Images — paths, folders, and rules

### Where to put files

| Content type | Upload to | Example path in data |
|--------------|-----------|----------------------|
| General photos, heroes, backgrounds | `public/media/` | `"/media/think-hero.webp"` |
| Case study images | `public/media/` | `"/media/aste360-cover.png"` |
| Studio card icons | `public/media/studio/` | `"/media/studio/raven.png"` |
| Manifesto deliverable icons | `public/media/deliverables/` | `"/media/deliverables/mobile.png"` |
| Client logos | `public/logos/` | `"white-bikeroom.png"` (in `logos.ts`) |
| LOUD header logo | `public/logos/` | `logo-white.png`, `logo-black.png` |
| Dual CTA backgrounds | `public/media/` | `"/media/loud-agency-background.jpg"` |

### Common field names explained

| Field | Used on | What it is |
|-------|---------|------------|
| `heroImage` | Pillar pages | Large image beside hero text |
| `imageBackground` | Industry pages, homepage hover | Main background / card image |
| `gallery` | Industry pages | Array of images in gallery section |
| `background` | Industry problem cards | Default card image |
| `backgroundHover` | Industry problem cards | Image when user interacts |
| `icon` | Studio cards, Manifesto deliverables | Small square icon |
| `images` | Manifesto principles | Array shown on hover |
| `previewImage` | Case studies | Thumbnail on cards |
| `mainPic` | Case studies | Hero image on detail page |

### SVG fallback

If a referenced `.jpg` / `.webp` / `.png` is **missing**, the site may fall back to a placeholder SVG at `public/media/{name}.svg`. For production, always upload the real asset — placeholders are for development only.

### Image component behavior

Most images use `MediaImage` or `logoSrc()` from `lib/media.ts`:

- **Logos:** tries `.png` first, falls back to `.svg` with same base name.
- **Media:** paths must include extension (`.webp`, `.jpg`, etc.).

---

## 7. Videos

There is **one video** on the entire site today.

| Property | Value |
|----------|-------|
| **Location on site** | Studio page hero |
| **File** | `public/media/studio/loud-video-pres.mp4` |
| **Data file** | `data/studio.ts` → `studioHero` |

```ts
export const studioHero = {
  title: "A new model for building companies",
  body: "Do you have a business idea? Are you an expert in a specific market? ...",
  videoCaption: "What is LOUD Studio?",              // Text near play button
  videoSrc: "/media/studio/loud-video-pres.mp4",    // Video file path
};
```

### Replace the Studio video

**Option A — same filename:** overwrite `public/media/studio/loud-video-pres.mp4` with the new file. No data change needed.

**Option B — new filename:**
1. Upload e.g. `public/media/studio/my-new-video.mp4`
2. Change `videoSrc` in `data/studio.ts`
3. Optionally update `videoCaption`

**Format:** MP4 with H.264 encoding. Target under ~20 MB for fast loading. No autoplay with sound — the component uses a play overlay.

---

## 8. Logos (header + client wall)

### A. LOUD brand logo (site header, every page)

| Background | File | When shown |
|------------|------|------------|
| Dark hero / dark pages | `public/logos/logo-white.png` | White logo |
| Light hero / white sections | `public/logos/logo-black.png` | Black logo |

**To update:** replace the PNG files. Filenames must stay the same unless a developer updates `components/Header.tsx`.

**Adjacent text** (not in data files):
- `"LOUD."` — shown on homepage only
- `"Digital Product Company."` — shown on all pages  
Both are in `components/Header.tsx`.

---

### B. Client logo wall

Appears on: Homepage, Manifesto, Studio, Contact, Case studies, Pillars, Industries.

**Headline:** `data/logos.ts` → `logoWallText`

**Logo lists:** two arrays — one for dark backgrounds, one for light:

```ts
export const logosForDarkBackground = [
  "white-beyond-doc.png",
  "white-bikeroom.png",
  // ... white versions for dark sections
];

export const logosForLightBackground = [
  "black-beyond-doc.png",
  "black-bikeroom.png",
  // ... black versions for light sections
];
```

**Files:** `public/logos/{filename}`

#### Current client logos (both variants required)

| Client | White filename (dark bg) | Black filename (light bg) |
|--------|--------------------------|---------------------------|
| Beyond Doc | `white-beyond-doc.png` | `black-beyond-doc.png` |
| BikeRoom | `white-bikeroom.png` | `black-bikeroom.png` |
| Cercacasa | `white-cercacasa.png` | `black-cercacasa.png` |
| Cercacasa (alt) | `white-cercacasa-1.png` | `black-cercacasa-1.png` |
| Ennevolte | `white-ennevolte.png` | `black-ennevolte.png` |
| FIMI | `white-fimi.png` | `black-fimi.png` |
| GoNext | `white-gonext.png` | `black-gonext.png` |
| IDNTT | `white-idntt.png` | `black-idntt.png` |
| MAE | `white-mae.png` | `black-mae.png` |
| Whuis | `white-whuis.png` | `black-whuis.png` |
| Zero | `white-zero.png` | `black-zero.png` |
| Acqua di Parma | `white-acqua-di-parma.png` | `black-acqua-di-parma.png` |
| Banca Sella | `white-banca-sella.png` | `black-banca-sella.png` |
| Bitbull | `white-bitbull.png` | `black-bitbull.png` |
| Deloitte | `white-deloitte.png` | `black-deloitte.png` |
| IED | `white-ied.png` | `black-ied.png` |
| M&C Saatchi | `white-mcsaatchi.png` | `black-mcsaatchi.png` |
| Moneymour | `white-moneymour.png` | `black-moneymour.png` |
| Samso | `white-samso.png` | `black-samso.png` |
| TAG | `white-tag.png` | `black-tag.png` |
| Vitesicure | `white-vitesicure.png` | `black-vitesicure.png` |
| Zest | `white-zest.png` | `black-zest.png` |

SVG fallbacks also exist in `public/logos/` for several clients (used if PNG is missing).

---

## 9. Media guidelines

| Asset type | Format | Suggested size |
|------------|--------|----------------|
| Hero / cover images | WebP or JPG | 1920×1080 px or larger |
| Case study gallery | WebP or JPG | 1200 px+ wide |
| Industry gallery | WebP or JPG | 1400×900 px typical |
| Client logos | PNG (transparent) | ~140×40 px display; source higher res |
| Deliverable icons | PNG | 64×64 or 128×128 px |
| Studio card icons | PNG | 128×128 px |
| Video | MP4 (H.264) | 1920×1080, &lt; 20 MB |
| Favicon | ICO | 32×32 multi-size |
| Apple touch icon | PNG | 180×180 px |

**Naming:** lowercase, hyphens, no spaces — `think-hero.webp`, `black-acme-corp.png`

**Case sensitivity:** production servers (Linux) treat `Think-Hero.webp` and `think-hero.webp` as different files. Match exactly.

---

## 10. SEO, browser title, favicons

### Global defaults

**File:** `app/layout.tsx`

```ts
export const metadata: Metadata = {
  title: "LOUD. Digital Product Company.",
  description: "LOUD designs, validates and builds digital products end to end.",
  icons: {
    icon: [
      { url: "/favicon-light.ico", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-dark.ico", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/apple-touch-icon-light.png",
  },
};
```

| Field | Where it appears |
|-------|------------------|
| `title` | Browser tab when no page-specific title |
| `description` | Google search snippet / social previews (default) |
| `icons` | Browser tab icon (favicon) |

### Per-page titles

| Page | File | Title format |
|------|------|--------------|
| Manifesto | `app/manifesto/page.tsx` | `Manifesto \| LOUD` |
| Studio | `app/studio/page.tsx` | `Studio \| LOUD` |
| Contact | `app/contact-us/page.tsx` | `Contact us \| LOUD` |
| Pillars | `app/pillars/[slug]/page.tsx` | `{navLabel} \| LOUD` e.g. `Think. \| LOUD` |
| Industries | `app/industries/[slug]/page.tsx` | `{title} \| LOUD` + `description` from `heroLine` |
| Case studies | From case study data | `metaTitle`, `metaDescription` in CMS JSON |

---

## 11. Navigation, footer & social links

### Header menu

**File:** `data/navigation.ts` → `mainNav`

```ts
export const mainNav = [
  { label: "Think.", href: "/pillars/think", withPeriod: true },
  { label: "Design.", href: "/pillars/design", withPeriod: true },
  { label: "Develop.", href: "/pillars/develop", withPeriod: true },
  { label: "Manifesto", href: "/manifesto", withPeriod: false },
  { label: "Studio", href: "/studio", withPeriod: false },
];
```

| Field | Purpose |
|-------|---------|
| `label` | Text shown in header |
| `href` | Link destination |
| `withPeriod` | Styling hint (period in label) |

---

### Footer navigation

**File:** `data/navigation.ts` → `footerNav`

Three columns rendered in the footer:

| Column | Key | Contents |
|--------|-----|----------|
| Social | `footerNav.social` | LinkedIn, Instagram URLs |
| LOUD | `footerNav.loud` | Think, Design, Develop, Manifesto, Studio |
| Contact | `footerNav.contact` | Careers, Contact Us, Start a company |

**Column headings** (`Social`, `LOUD`, `Contact`) are hardcoded in `components/Footer.tsx`.

---

### Footer hero block

**File:** `data/footer.ts`

```ts
export const footer = {
  ctaTitleLines: ["Let's", "build", "something", "great..."],  // Large stacked headline
  ctaLink: "Work togheter",                                       // Link text (note: typo in source)
  ctaHref: "/contact-us?c=career",                               // Link destination
  copyright: "2026 ©",
  legal: "LOUD Srl – Via vittorio Emanuele II, Bresca (IT) – 03902100985",
  tagline: "Always with ❤️ and a lot of ☕",
};
```

Each string in `ctaTitleLines` renders on its own line in the large footer headline.

---

## 12. Homepage — full section map

**Route:** `/`  
**Page file:** `app/page.tsx`  
**Data files:** `homeHeroPreviews.ts`, `industryPages.ts`, `industries.ts`, `logos.ts`, `liquidPresets.ts`

### Section 1 — Animated hero (full viewport)

| Element | Source | Notes |
|---------|--------|-------|
| Background colors | `liquidPresets.ts` | Changes as user scrolls through menu sections |
| Eyebrow (small label) | `homeHeroPreviews.ts` → `eyebrow` | e.g. `I•VI PILLARS`, `PRODUCT STRATEGY` |
| Main headline | `homeHeroPreviews.ts` → `title` | Large animated text |
| Body paragraph | `homeHeroPreviews.ts` → `body` | Empty string `""` hides paragraph |
| Industry links (bottom left) | Derived from `industryPages.ts` | Hover shows industry context |
| Scroll progress (bottom center) | Component | Not in data |
| **"Are you the next?"** button | Hardcoded in `app/page.tsx` | Links to `/contact-us` |

#### Hero chapters (scroll order)

**File:** `data/homeHeroPreviews.ts` — array `HOME_HERO_PREVIEWS`

| Index | Key | Section | Title source |
|-------|-----|---------|--------------|
| 0 | `home` | Default home | `"We make digital products."` |
| 1 | `think` | Think preview | From `pillars[0].heroTitle` |
| 2 | `design` | Design preview | From `pillars[1].heroTitle` |
| 3 | `develop` | Develop preview | From `pillars[2].heroTitle` |
| 4 | `manifesto` | Manifesto preview | `"We are in a constant state of becoming."` |
| 5 | `studio` | Studio preview | `"A new model for building companies"` |

**To change Think/Design/Develop hero text on homepage:** edit `data/pillars.ts` (homepage pulls from there automatically).

**To change Manifesto or Studio hero text on homepage:** edit the corresponding entry in `homeHeroPreviews.ts`.

---

### Section 2 — "Show Industries" button

| Element | Source |
|---------|--------|
| Button label `"Show Industries"` | Hardcoded `app/page.tsx` |
| Fullscreen industry menu | `industries` from `data/industries.ts` |
| Menu label `"Industries"` | Hardcoded `ShowIndustriesMenu.tsx` |

---

### Section 3 — Scrolling marquee

**File:** `data/industries.ts` → `industryMarqueeItems`

Auto-generated from industry names in uppercase (e.g. `ARTIFICIAL INTELLIGENCE`, `E-COMMERCE`).

---

### Section 4 — "I•VI PILLARS" label

Hardcoded in `app/page.tsx` as `"I•VI PILLARS"`.

---

### Section 5 — Industry cards grid

**Source:** `data/industryPages.ts` (via `industries.ts`)

Each card shows:
- `title` — industry name
- `homeDescription` — card text
- `tags` — joined as comma-separated string
- `imageBackground` — card image

---

### Section 6 — Logo wall

See [§20 Logo wall](#20-logo-wall-component).

---

### Section 7 — Footer

See [§11 Navigation, footer](#11-navigation-footer--social-links).

---

## 13. Think / Design / Develop (Pillar pages)

**Routes:** `/pillars/think`, `/pillars/design`, `/pillars/develop`  
**File:** `data/pillars.ts` — array of 3 objects, index 0 = Think, 1 = Design, 2 = Develop

### Page section map (top to bottom)

| # | Section | Data fields |
|---|---------|-------------|
| 1 | Route hero (title + body) | `eyebrow`, `heroTitle`, `heroBody` |
| 2 | Consulting intro | `consultingLabel`, `consultingText` |
| 3 | Hero image | `heroImage` |
| 4 | Process table | `heroTable[]` — groups with `title` + `items[]` |
| 5 | Table footnote | `PILLAR_HERO_TABLE_NOTE` (shared constant) |
| 6 | Potential accordion | `potentialCards[]` |
| 7 | Marquee | `marqueeText` |
| 8 | Case study showcase | `caseStudySlugs[]` |
| 9 | Logo wall | `data/logos.ts` |
| 10 | Dual CTA | `agencyCta` (optional override) or default from `dualCta.ts` |

### Every field on a pillar object

| Field | Type | Description |
|-------|------|-------------|
| `slug` | `"think"` \| `"design"` \| `"develop"` | URL segment — do not change casually |
| `navLabel` | string | Header/footer label e.g. `"Think."` |
| `eyebrow` | string | Small hero label |
| `heroTitle` | string | Main headline |
| `heroBody` | string | Intro paragraph |
| `marqueeText` | string | Scrolling band text |
| `heroTable` | array | Process steps table |
| `consultingLabel` | string | Consulting section label |
| `consultingText` | string | Consulting paragraph |
| `heroImage` | string | Image path e.g. `"/media/think-hero.webp"` |
| `potentialTitle` | string | **Currently unused in UI** — accordion title is hardcoded |
| `potentialIntro` | string | Intro above accordion cards |
| `potentialCards` | array | Expandable content cards (see below) |
| `caseStudySlugs` | string[] | Case studies to display |
| `showcaseLayout` | `"tagline-first"` \| `"projects-first"` | Layout variant |
| `agencyCta` | string (optional) | Custom agency CTA headline on this page |

### `heroTable` structure

```ts
heroTable: [
  {
    title: "Product Vision & Strategy",    // Column/group heading
    items: [
      "Market Research",
      "Stakeholder Interviews",
      // ...
    ],
  },
  // more groups...
]
```

### `potentialCards` structure

Each card powers one accordion panel:

| Field | Description |
|-------|-------------|
| `title` | Card heading |
| `summary` | Short description when collapsed |
| `items` | Bullet list titles |
| `itemDescriptions` | Long text for each bullet (same order as `items`) |
| `itemIcons` | Optional icon keys (internal identifiers, not file paths) |

### Current hero images

| Pillar | Path |
|--------|------|
| Think | `/media/think-hero.webp` |
| Design | `/media/design-hero.webp` |
| Develop | `/media/develop-hero.webp` |

### Current case study assignments

| Pillar | `caseStudySlugs` |
|--------|------------------|
| Think | `cercacasa`, `shiftpilot`, `bike-room` |
| Design | `catasto-20`, `witz`, `shift2cal` |
| Develop | (see `pillars.ts` third entry) |

---

## 14. Industry pages

**File:** `data/industryPages.ts`  
**Routes:** `/industries/ai`, `/industries/e-commerce`, `/industries/mobile-apps`, `/industries/real-estate`

### Page section map

| # | Section | Data fields |
|---|---------|-------------|
| 1 | Hero | `eyebrow`, `heroLine`, `imageBackground` |
| 2 | Intro + tags | `tags`, `badgeColor` |
| 3 | Image gallery | `gallery[]` |
| 4 | Marquee | `marqueeText` |
| 5 | Methodology | `methodologyIntro`, `thinkLabel/Items`, `designLabel/Items`, `developLabel/Items` |
| 6 | Problem cards | `problems[]` |
| 7 | Testimonial | `testimonial` |
| 8 | Related projects | `related[]` (case study slugs) |
| 9 | Logo wall | `logos.ts` |
| 10 | Dual CTA | `agencyCta` |
| 11 | Next industry nav | `nextSlug` |

### Every field on an industry object

| Field | Description |
|-------|-------------|
| `slug` | URL: `/industries/{slug}` |
| `title` | Display name + SEO title |
| `eyebrow` | Hero label e.g. `LOUD x AI` |
| `heroLine` | Main hero sentence; also **meta description** for Google |
| `homeDescription` | Text on homepage industry card |
| `tags` | Badge strings e.g. `["Efficiency", "Data-Driven"]` |
| `badgeColor` | Hex color with optional alpha e.g. `"#F58E6BB3"` |
| `imageBackground` | Hero + homepage card image |
| `gallery` | Array of image paths |
| `marqueeText` | Scrolling text |
| `methodologyIntro` | Paragraph above Think/Design/Develop columns |
| `thinkLabel`, `designLabel`, `developLabel` | Column headers |
| `thinkItems`, `designItems`, `developItems` | Bullet lists per column |
| `problems` | Interactive problem/solution cards |
| `testimonial` | Quote block (or `null`) |
| `related` | Case study slugs for related projects row |
| `agencyCta` | Dual CTA agency side headline override |
| `nextSlug` | Next industry in circular navigation |

### `problems[]` structure

```ts
{
  text: "The problem statement shown on the card...",
  solution: "How LOUD solved it...",
  projectSlug: "witz",                              // Links to case study
  background: "/media/home-witz.webp",              // Default image
  backgroundHover: "/media/witz-ai-worlds.jpg",     // Hover image
  ctaLabel: "Case studio - BikeRoom",               // Optional button text
}
```

### `testimonial` structure

```ts
{
  quote: "Customer quote text...",
  name: "Android User",
  role: "Google Play Store",
  image: "/media/home-witz.webp",
  projectSlug: "witz",           // Optional — links to case study
  ctaLabel: "Case studio - ...", // Optional
}
```

Set `testimonial: null` to hide the section.

### Industry navigation ring

| Industry | `nextSlug` (links to) |
|----------|----------------------|
| ai | e-commerce |
| e-commerce | mobile-apps |
| mobile-apps | real-estate |
| real-estate | ai |

---

## 15. Manifesto page

**Route:** `/manifesto`  
**Files:** `data/manifesto.ts`, `data/services.ts`

### Page section map

| # | Section | Source |
|---|---------|--------|
| 1 | Hero title | Hardcoded in `ManifestoPageClient.tsx` **and** duplicated in `homeHeroPreviews.ts` |
| 2 | Principles (hover + images) | `manifestoPrinciples[]` |
| 3 | Featured case studies | `featuredCaseStudies[]` |
| 4 | Deliverables grid | `manifestoDeliverables[]` |
| 5 | Services grid (12 columns) | `services[]` in `services.ts` |
| 6 | Services overview heading | `manifestoServicesOverview` |
| 7 | Logo wall | `logos.ts` |
| 8 | Dual CTA | `dualCta.ts` — uses `manifestoAgencyTitle` on this page |

### Principles (`manifestoPrinciples`)

```ts
{
  title: "Making something that people want",
  cta: "Discover Design Process",
  images: [
    "/media/last-shot-shift2cal.png",
    "/media/review-witz-flat-background.png",
    "/media/preview-home-shift2cal-2.png",
  ],
}
```

Five principles total. Images rotate on hover/interaction.

### Deliverables (`manifestoDeliverables`)

```ts
{
  title: "E-commerce",
  desc: "The online shop where you can sell your products.",
  icon: "/media/deliverables/add_shopping_cart.png",
  href: "/industries/e-commerce",    // Optional link
}
```

Eight deliverables. Icons in `public/media/deliverables/`.

### Hardcoded Manifesto labels

In `ManifestoCapabilitiesSection.tsx`:
- `"Deliverables."`
- `"Including but not limited to."`
- `"Our services. The full list!"`
- `"Build with Us"` (link to contact)

### Services grid (`data/services.ts`)

12 sections, each with:
- `title` — column header (uppercase)
- `items[]` — bullet list

Also exports `servicesIntro` (duplicate of `manifestoServicesOverview` — keep in sync if editing).

### Featured case studies

```ts
export const featuredCaseStudies = ["whuis", "cercacasa", "catasto-20"];
```

---

## 16. Studio page

**Route:** `/studio`  
**File:** `data/studio.ts`

### Page section map

| # | Section | Export | Key fields |
|---|---------|--------|------------|
| 1 | Hero + video | `studioHero` | `title`, `body`, `videoSrc`, `videoCaption` |
| 2 | What we do | `studioWhatWeDo` | `label`, `description`, `unicornLabel` |
| 3 | Process marquee | `studioProcess`, `studioMarqueeText` | String array + marquee text |
| 4 | Build cards (6) | `studioBuildSection`, `studioBuildCards` | Titles, descriptions, icons |
| 5 | Why choose us | `studioWhySection`, `studioWhyChoosingUs` | Heading + bullet list |
| 6 | Live products | `studioLiveSection`, `studioLiveProducts` | Case study slugs |
| 7 | Founder CTA | Hardcoded component | `"Consult with a Founder Expert"` |
| 8 | Logo wall | `logos.ts` | — |

### Build cards (`studioBuildCards`)

Six cards — one per discipline:

```ts
{
  title: "BRANDING",
  description: "Shape a distinctive brand that fits product and market.",
  icon: "/media/studio/raven.png",
}
```

| Card | Icon file |
|------|-----------|
| Branding | `/media/studio/raven.png` |
| Product Design | `/media/studio/chef_hat.png` |
| Visual & UX Design | `/media/studio/wall_art.png` |
| Engineering | `/media/studio/data_object.png` |
| Go-To-Market | `/media/studio/web_traffic.png` |
| Product Management | `/media/studio/dashboard_customize.png` |

### Live products

```ts
export const studioLiveProducts = ["witz", "whuis", "shift2cal"];
```

These slugs must exist in case studies.

### Extra hardcoded images

`StudioWhatWeDo.tsx` uses decorative images:
- `/media/studio/lightbulb_2.png`
- `/media/studio/Union_1.png`

---

## 17. Contact page & form

**Route:** `/contact-us` (tabs via `?c=startup` or `?c=career`)  
**Files:** `data/contact.ts`, `app/contact-us/page.tsx`, `components/ContactForm.tsx`

### Page section map

| # | Section | Source |
|---|---------|--------|
| 1 | Page label | Hardcoded: `"FIRST STEP OF OUR RELATIONSHIP :)"` |
| 2 | Tab navigation | `contactTabs` |
| 3 | Email fallback | Hardcoded: `hello@loudsrl.com` in `page.tsx` |
| 4 | Contact form | `ContactForm.tsx` + options from `contact.ts` |
| 5 | "What's next" steps | `contactSteps` |
| 6 | Featured case studies | `contactFeatured` per tab |
| 7 | Logo wall | `logos.ts` |

### Contact tabs (`contactTabs`)

| Tab ID | Label | URL |
|--------|-------|-----|
| `business` | Evolve my Business | `/contact-us` |
| `startup` | Start a company | `/contact-us?c=startup` |
| `career` | Career | `/contact-us?c=career` |

### Featured case studies per tab (`contactFeatured`)

```ts
export const contactFeatured: Record<ContactTabId, string[]> = {
  business: ["shift2cal", "shiftpilot", "shopify-tech"],
  startup: ["balloon", "shopify-tech", "shiftpilot"],
  career: ["shopify-tech", "ennevolte", "shift2cal"],
};
```

Change slugs to swap which project cards appear. Each slug must exist in case studies.

### Form fields

| Field | Source | Editable in |
|-------|--------|-------------|
| Project type dropdown | `projectTypes` | `contact.ts` |
| Industry dropdown | Auto from `industries.ts` | Edit `industryPages.ts` titles |
| Deliverables checkboxes | `deliverableOptions` | `contact.ts` |
| Budget dropdown | `budgetOptions` | `contact.ts` |
| Short description | Placeholder text | Hardcoded in `ContactForm.tsx` |
| File upload | Label + hint | Hardcoded in `FileUpload.tsx` |
| Submit button | `"Send us message"` | Hardcoded in `ContactForm.tsx` |

### Form labels hardcoded in components

| Label | File |
|-------|------|
| `PROJECT TYPE` | `ContactForm.tsx` |
| `INDUSTRY` | `ContactForm.tsx` |
| `DELIVERABLES*` | `ContactForm.tsx` |
| `BUDGET RANGE` | `ContactForm.tsx` |
| `SHORT DESCRIPTION` | `ContactForm.tsx` |
| `ATTACH FILES` | `FileUpload.tsx` |
| `Drop files here or click to upload` | `FileUpload.tsx` |
| `Select your budget range` | `ContactForm.tsx` |
| `Tell us about your project...` | `ContactForm.tsx` |

### Important: form does not send email

The form's `onSubmit` prevents default — **no backend is connected**. Submissions go nowhere until a developer integrates email (Resend, Formspree, custom API, etc.).

### Email address

Search `hello@loudsrl.com` in `app/contact-us/page.tsx` — **4 occurrences** (2 mailto links + 2 visible text).

---

## 18. Case studies

**Routes:** `/case-studies/{slug}`  
**Source of truth:** `scripts/case-studies-live.json`  
**Generated output:** `data/caseStudies.ts` (**never edit by hand**)

### All case study slugs

| Slug | Project name |
|------|--------------|
| `aste360` | Aste360 |
| `balloon` | Balloon |
| `bike-room` | Bike-Room |
| `catasto-20` | Catasto 2.0 |
| `cercacasa` | Cercacasa |
| `ennevolte` | Ennevolte |
| `shift2cal` | Shift2Cal |
| `shiftpilot` | ShiftPilot |
| `shopify-tech` | Shopify Tech |
| `whuis` | Whuis |
| `witz` | WITZ |

### Update workflow

```bash
# 1. Edit the JSON export (from CMS or manually)
#    File: scripts/case-studies-live.json

# 2. Regenerate TypeScript data
node scripts/build-case-studies-data.mjs

# 3. Download missing images from production CMS (optional)
node scripts/download-case-study-media.mjs

# 4. Restart dev server or rebuild
npm run dev
```

### CMS JSON → website field mapping

| JSON path (`caseStudy.*`) | Website field | Used for |
|---------------------------|---------------|----------|
| `slug` | `slug` | URL |
| `name` | `title` | Page title |
| `previewDescription` | `subtitle` | Cards, hero subtitle |
| `industryName` | `industry` | Meta labels |
| `introduction` | `introduction` | Main intro (Lexical rich text → plain text) |
| `previewImage.filename` | `previewImage` | Card thumbnail → `/media/{filename}` |
| `mainPic` | `mainPic` | Hero image with alt/ dimensions |
| `functionalities[]` | `functionalities` | Content sections with galleries |
| `cit.citDesc` | `testimonial.quote` | Customer quote |
| `cit.author` | `testimonial.author` | Name |
| `cit.jobDescription` | `testimonial.role` | Role/company |
| `metaTitle` | `metaTitle` | Browser tab / SEO |
| `metaDescription` | `metaDescription` | Google description |
| `projectType` | `projectType` | Tag list |
| `deliverables` | `deliverables` | Tag list |
| `link` / `linkLabel` | External project link | Optional CTA to live product |

### Case study page sections

| Section | Data |
|---------|------|
| Project switcher | All slugs from `caseStudyOrder` |
| Hero meta (type, stage, deliverables) | Labels + arrays |
| Main image | `mainPic` |
| Functionality blocks | `functionalities[]` — each has title, descriptions, gallery |
| Testimonial | `testimonial` |
| Logo wall | `logos.ts` |
| Dual CTA | `dualCta.ts` |
| Next case study | Order in `caseStudyOrder` |

### Where slugs are referenced elsewhere

| File | Field | Purpose |
|------|-------|---------|
| `pillars.ts` | `caseStudySlugs` | Pillar showcase |
| `industryPages.ts` | `problems[].projectSlug`, `related[]` | Problem cards & related |
| `manifesto.ts` | `featuredCaseStudies` | Manifesto featured row |
| `studio.ts` | `studioLiveProducts` | Live products |
| `contact.ts` | `contactFeatured` | Contact page cards |

If you **rename a slug**, update every reference above.

---

## 19. Dual CTA block (Agency / Studio)

Appears at the bottom of: Pillars, Industries, Manifesto, Case studies.

**File:** `data/dualCta.ts`

```ts
export const dualCtaImages = {
  agency: "/media/loud-agency-background.jpg",   // Hover background — Agency card
  studio: "/media/loud-studio-background.png",   // Hover background — Studio card
};

export const dualCtaCopy = {
  agencyTitle: "Want to be our next success story?",
  manifestoAgencyTitle: "Want to rethink your entire company?",  // Manifesto only
  studioTitle: "Want to start a company with us?",
  studioHoverText: "Do you have a business idea? ...",           // Shown on Studio card hover
};
```

### Hardcoded in component (`DualCTA.tsx`)

| Text | Notes |
|------|-------|
| `LOUD AGENCY` | Left card label — not in data |
| `LOUD STUDIO` | Right card label — not in data |
| `Point your finger to discover how to do that` | Hover hint on both cards |
| `Next consulting way` | Shown when navigating between pillars |

### Per-page overrides

| Page type | Override field | File |
|-----------|----------------|------|
| Pillar pages | `agencyCta` | `pillars.ts` |
| Industry pages | `agencyCta` | `industryPages.ts` |
| Manifesto | Uses `manifestoAgencyTitle` automatically | — |

**Links (hardcoded):** Agency → `/contact-us`, Studio → `/contact-us?c=startup`

---

## 20. Logo wall component

**Data:** `data/logos.ts`  
**Component:** `components/LogoWall.tsx`

| Prop / field | Default | Description |
|--------------|---------|-------------|
| `logoWallText` | (in data) | Large centered headline |
| `logosForDarkBackground` | (in data) | White logos — used when `variant="dark"` |
| `logosForLightBackground` | (in data) | Black logos — used when `variant="light"` |
| `ctaLabel` prop | `"Be the next"` | Button text — hardcoded default in component |

**Variant by page:** most pages use light background (`variant="light"`). Dark variant used on dark sections.

**CTA link:** always `/contact-us` (hardcoded in component).

---

## 21. Homepage hero colors (liquid animation)

**File:** `data/liquidPresets.ts`

The homepage hero background is an animated “liquid” shader. Colors change as the user scrolls through menu sections (Home → Think → Design → Develop → Manifesto → Studio).

### Preset index mapping

| Index | Menu section | Primary colors (colour1/2/3) |
|-------|--------------|--------------------------------|
| 0 | Home (default) | Dark blue / grey / black |
| 1 | Think | Warm brown / peach tones |
| 2 | Design | Blue / periwinkle |
| 3 | Develop | Blue-grey / slate |
| 4 | Manifesto | Purple / lavender |
| 5 | Studio | White / off-white (light hero) |
| 6 | (extra preset) | Cyan / magenta — experimental |

### Fields per preset

| Field | What it does | Safe to edit? |
|-------|--------------|---------------|
| `colour1`, `colour2`, `colour3` | Hex background colors | ✅ Yes — with design review |
| `contrast`, `lighting`, `spinAmount` | Visual intensity | ⚠️ Advanced — small changes only |
| `spinSpeed`, `spinRotation` | Animation motion | ⚠️ Advanced |
| `grainStrength`, `useGrain` | Film grain texture | ⚠️ Advanced |
| `zoom` | Zoom level on transition | ⚠️ Advanced |

**Recommendation:** only edit the three `colour#` hex values unless working with a developer.

---

## 22. Cross-reference: when you change X, also check Y

| If you change… | Also update… |
|----------------|--------------|
| Pillar `heroTitle` or `heroBody` | Homepage hero (auto-syncs via `homeHeroPreviews.ts`) |
| Industry `title` | Homepage cards, contact form industry dropdown (auto-syncs) |
| Industry `homeDescription` | Homepage industry cards (auto-syncs) |
| Industry `imageBackground` | Homepage hover menu image (auto-syncs) |
| Manifesto hero title | `homeHeroPreviews.ts` index 4 **and** `ManifestoPageClient.tsx` |
| Studio hero title/body | `homeHeroPreviews.ts` index 5 **and** `studio.ts` → `studioHero` |
| Case study slug in CMS | All `caseStudySlugs`, `contactFeatured`, `featuredCaseStudies`, `studioLiveProducts`, industry `problems`/`related` |
| Client logo filename | Both `logosForDarkBackground` and `logosForLightBackground` arrays |
| `manifestoServicesOverview` | Consider syncing `servicesIntro` in `services.ts` |
| Footer `ctaHref` | Ensure destination page exists |
| Navigation `href` | Ensure route exists in `app/` |

---

## 23. Hardcoded content (developer help needed)

Complete inventory of text **not** in `data/` files:

### `app/page.tsx`
| Text | Context |
|------|---------|
| `Are you the next?` | Hero CTA button → `/contact-us` |
| `Show Industries` | Opens industry menu |
| `I•VI PILLARS` | Section label above industry grid |

### `app/contact-us/page.tsx`
| Text | Context |
|------|---------|
| `FIRST STEP OF OUR RELATIONSHIP :)` | Page eyebrow |
| `Hate contact forms?` | Above email |
| `hello@loudsrl.com` | Email (×4) |
| `What's next.` | Steps section label |
| `Fourth base on a first date?` | Steps section headline |

### `app/not-found.tsx`
| Text | Context |
|------|---------|
| `404` | Error code |
| `Page not found` | Message |
| `Back to home` | Link |

### `components/Header.tsx`
| Text / asset | Context |
|--------------|---------|
| `/logos/logo-white.png` | Header logo path |
| `/logos/logo-black.png` | Header logo path |
| `LOUD.` | Logo text (homepage) |
| `Digital Product Company.` | Tagline |
| `Open menu` | Accessibility label |

### `components/Footer.tsx`
| Text | Context |
|------|---------|
| `Social`, `LOUD`, `Contact` | Column headings |

### `components/DualCTA.tsx`
| Text | Context |
|------|---------|
| `LOUD AGENCY`, `LOUD STUDIO` | Card labels |
| `Point your finger to discover how to do that` | Hover instruction |
| `Next consulting way` | Pillar navigation |

### `components/LogoWall.tsx`
| Text | Context |
|------|---------|
| `Be the next` | Default CTA button |

### `components/CookieConsent.tsx`
| Text | Context |
|------|---------|
| Full cookie banner paragraph | Legal copy |
| `Accept only technical cookies` | Button |
| `Accept all cookies` | Button |

### `components/FullscreenMenu.tsx` & `ShowIndustriesMenu.tsx`
| Text | Context |
|------|---------|
| `Close` | Close button |
| `Industries` | Menu section label |

### `components/ContactForm.tsx` & `FileUpload.tsx`
All form labels, placeholders, button text — see [§17](#17-contact-page--form).

### `components/manifesto/`
| File | Text |
|------|------|
| `ManifestoPageClient.tsx` | Hero: `"We are in a constant state of becoming."` |
| `ManifestoCapabilitiesSection.tsx` | `Deliverables.`, `Including but not limited to.`, `Our services. The full list!`, `Build with Us` |

### `components/studio/`
| File | Text |
|------|------|
| `StudioFounderCta.tsx` | `Consult with a Founder Expert` |
| `StudioWhatWeDo.tsx` | Decorative image paths |

### `components/pillars/PotentialAccordionCards.tsx`
| Text | Context |
|------|---------|
| `Unleash Your / Product's Potential` | Accordion heading (ignores `potentialTitle` in data) |

### `components/industries/IndustryProblemCardsRow.tsx`
| Text | Context |
|------|---------|
| `POINT YOUR FINGER…` / `TAP TO DISCOVER…` | Mobile/desktop hints |

### `components/shared/BackHomeToast.tsx`
| Text | Context |
|------|---------|
| Return navigation toast message | After using back button |

---

## 24. Step-by-step tutorials

### Tutorial A — Change the Think page headline

1. Open `data/pillars.ts`
2. Find the first object (`slug: "think"`)
3. Edit `heroTitle` and/or `heroBody`
4. Save — homepage Think preview updates automatically
5. Run `npm run dev` and visit `/pillars/think`

---

### Tutorial B — Replace a pillar hero image

1. Export new image as WebP or JPG (1920px+ wide)
2. Save to `public/media/` — e.g. `think-hero.webp` (overwrite) or new name
3. Open `data/pillars.ts` → Think entry → set `heroImage: "/media/think-hero.webp"`
4. Hard refresh browser (`Ctrl+Shift+R`)

---

### Tutorial C — Add a new client logo to the logo wall

1. Prepare two PNGs with transparent background:
   - `white-newclient.png` (light logo for dark backgrounds)
   - `black-newclient.png` (dark logo for light backgrounds)
2. Upload both to `public/logos/`
3. Open `data/logos.ts`
4. Add `"white-newclient.png"` to `logosForDarkBackground`
5. Add `"black-newclient.png"` to `logosForLightBackground`
6. Save and check any page with logo wall (homepage bottom)

---

### Tutorial D — Update LinkedIn URL

1. Open `data/navigation.ts`
2. Find `footerNav.social` array
3. Change the `href` for Linkedin entry
4. Save — footer updates on all pages

---

### Tutorial E — Change contact form budget options

1. Open `data/contact.ts`
2. Edit `budgetOptions` array:
   ```ts
   export const budgetOptions = [
     "Under €10k",
     "€10k – €25k",
     // add or remove options
   ];
   ```
3. Save and visit `/contact-us`

---

### Tutorial F — Update a case study from CMS export

1. Receive updated JSON from CMS (or edit `scripts/case-studies-live.json`)
2. Find the project key e.g. `"witz": { "caseStudy": { ... } }`
3. Edit text fields or media `filename` values
4. Run: `node scripts/build-case-studies-data.mjs`
5. Run: `node scripts/download-case-study-media.mjs` (if new images)
6. Verify at `/case-studies/witz`

---

### Tutorial G — Change Studio video

1. Export video as MP4 (H.264)
2. Copy to `public/media/studio/loud-video-pres.mp4` (overwrite)
   - OR upload new file and update `videoSrc` in `data/studio.ts`
3. Update `videoCaption` if needed
4. Visit `/studio` and test play button

---

### Tutorial H — Add a new industry (advanced — needs developer)

Adding an industry requires:
1. New entry in `data/industryPages.ts` with all required fields
2. Images in `public/media/`
3. Possibly updating `app/industries/[slug]/page.tsx` static params
4. Homepage will auto-include via `industries.ts` derivation

Recommend involving a developer for new pages/routes.

---

## 25. How to preview & deploy

### First-time setup

```bash
cd loudsrl          # project folder
npm install         # install dependencies (once)
```

### Local preview

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Changes to `data/` files hot-reload automatically. New files in `public/` may need a hard refresh.

### Other useful commands

| Command | Purpose |
|---------|---------|
| `npm run build` | Production build — catches errors before deploy |
| `npm run start` | Run production build locally |
| `npm run lint` | Check code quality |
| `npm run test:visual` | Visual regression tests (Playwright) |

### Before going live

1. Preview all changed pages locally
2. Check images load (not placeholders)
3. Run `npm run build` — fix any errors
4. Deploy via your hosting (e.g. Vercel)
5. Hard refresh production site and spot-check

### What editors can safely change alone

✅ Any `data/*.ts` file (except `caseStudies.ts`)  
✅ Any file in `public/`  
✅ `scripts/case-studies-live.json` + regenerate  
✅ Email strings in `app/contact-us/page.tsx`  
✅ SEO in `app/layout.tsx`

### What needs a developer

⚠️ React components (`components/`, `app/page.tsx` hardcoded strings)  
⚠️ Contact form backend / email delivery  
⚠️ New pages or routes  
⚠️ `liquidPresets.ts` advanced animation values  
⚠️ Cookie policy links (currently text only, no URLs)

---

## 26. Troubleshooting

| Problem | Likely cause | Solution |
|---------|--------------|----------|
| Image not showing | Wrong path or missing file | Verify `public/media/filename.ext` exists; path matches exactly including extension |
| Logo shows SVG instead of PNG | PNG missing | Upload PNG to `public/logos/` or check filename in `logos.ts` |
| Old text still visible | Browser cache | Hard refresh: `Ctrl+Shift+R` (Windows) / `Cmd+Shift+R` (Mac) |
| Case study edit reverted | Edited `caseStudies.ts` directly | Edit JSON + run `node scripts/build-case-studies-data.mjs` |
| Build script error "Missing live data" | Slug in ORDER but not in JSON | Add entry to `case-studies-live.json` or remove from ORDER in script |
| Homepage Think text wrong | Edited wrong file | Edit `pillars.ts` not `homeHeroPreviews.ts` for Think/Design/Develop |
| Industry card wrong on homepage | Wrong field edited | Edit `homeDescription` / `imageBackground` in `industryPages.ts` |
| Video won't play | Wrong codec or path | Use H.264 MP4; check `videoSrc` path |
| Form submits but nothing happens | Expected — no backend | Integrate email API (developer task) |
| TypeScript error after data edit | Syntax mistake | Check quotes, commas, brackets in `.ts` file |
| Page 404 for case study | Invalid slug | Use slug from approved list in §18 |
| Light logo on light background | Wrong array | White logos → `logosForDarkBackground`; black logos → `logosForLightBackground` |

### Syntax tips for `data/*.ts` files

- Strings use double quotes: `"Hello"`
- Arrays end items with commas: `"Item 1",`
- Do not use smart/curly quotes `"` `"` — use straight `"` quotes
- Paths start with `/media/` or `/logos/`

---

## 27. Master checklist

### Brand & global
- [ ] Site title & description → `app/layout.tsx`
- [ ] Favicons → `public/favicon-*.ico`, `apple-touch-icon-light.png`
- [ ] Header logo PNGs → `public/logos/logo-white.png`, `logo-black.png`
- [ ] Header menu → `data/navigation.ts` → `mainNav`
- [ ] Footer links & social → `data/navigation.ts` → `footerNav`
- [ ] Footer CTA & legal → `data/footer.ts`

### Homepage
- [ ] Hero chapters → `data/homeHeroPreviews.ts` + `data/pillars.ts`
- [ ] Hero colors → `data/liquidPresets.ts`
- [ ] Industry cards → `data/industryPages.ts`
- [ ] Logo wall → `data/logos.ts` + `public/logos/`

### Service pages
- [ ] Think / Design / Develop → `data/pillars.ts` + `public/media/`
- [ ] Industries (×4) → `data/industryPages.ts` + `public/media/`
- [ ] Manifesto → `data/manifesto.ts`, `data/services.ts`
- [ ] Studio → `data/studio.ts` + `public/media/studio/`

### Contact & conversion
- [ ] Contact tabs & steps → `data/contact.ts`
- [ ] Email address → `app/contact-us/page.tsx`
- [ ] Dual CTA copy & images → `data/dualCta.ts`
- [ ] Cookie banner → `components/CookieConsent.tsx` (developer)

### Case studies
- [ ] CMS JSON → `scripts/case-studies-live.json`
- [ ] Regenerate → `node scripts/build-case-studies-data.mjs`
- [ ] Media → `node scripts/download-case-study-media.mjs`
- [ ] Cross-references → pillars, industries, contact, manifesto, studio

---

*Document version: Detailed Edition — covers LOUD Next.js site structure as of project audit. For form integration, new routes, or moving hardcoded copy into data files, contact your development team.*
