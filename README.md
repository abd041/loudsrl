# LOUD SRL — Digital Product Company (Next.js clone)

Production-grade marketing site clone of [loudsrl.com](https://loudsrl.com), built with **Next.js 14**, **Tailwind CSS**, **GSAP**, **Three.js**, and **Playwright** regression tests.

## Requirements

- Node.js **20+**
- npm **10+**

## Quick start

```bash
npm ci
cp .env.example .env.local   # optional for contact webhook
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript (`tsc --noEmit`) |
| `npm run ci` | Lint + typecheck + build |
| `npm run test:smoke` | Release smoke tests (Playwright) |
| `npm run test:parity` | Build + visual parity vs baselines |
| `npm run test:parity:capture` | Capture baselines from live site |
| `npm run lighthouse` | Lighthouse scores (local, non-gating) |
| `npm run lighthouse:ci` | Lighthouse with CI thresholds |
| `npm run analyze` | Bundle analyzer (`ANALYZE=true`) |
| `npm run media:sync` | Sync media/logos from loudsrl.com CDN |

## Environment variables

See [`.env.example`](.env.example). Required for production contact delivery:

- `CONTACT_WEBHOOK_URL`
- `CONTACT_REQUIRE_WEBHOOK=true`
- `NEXT_PUBLIC_SITE_URL` (canonical URL for sitemap/OG)

Optional observability:

- `NEXT_PUBLIC_VERCEL_ANALYTICS` / `NEXT_PUBLIC_VERCEL_SPEED_INSIGHTS`
- `NEXT_PUBLIC_ERROR_REPORT_URL`
- `NEXT_PUBLIC_REPORT_WEB_VITALS=true`

## Testing

```bash
npm run build
npm run test:smoke
npm run test:parity          # CI uses 6 routes × 2 viewports
PARITY_FULL=1 npm run test:parity   # extended routes (Unix)
```

Parity baselines live in `tests/parity-baselines/`. Update with:

```bash
npm run test:parity:capture
```

## CI/CD

GitHub Actions workflows in [`.github/workflows/`](.github/workflows/):

- **`ci.yml`** — PR + push: lint, typecheck, build, Playwright smoke tests, Lighthouse thresholds

Production deploys use **Vercel Git integration** (not GitHub Actions). `vercel.json` runs a clean production build and pins functions to `fra1`.

## Documentation

| Doc | Purpose |
|-----|---------|
| [CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md) | Content & asset editing |
| [DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md) | Vercel + env + webhooks |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Branch flow & PR process |
| [FINAL_RELEASE_REPORT.md](docs/FINAL_RELEASE_REPORT.md) | Release QA sign-off |
| [ENGINEERING_REPORT.md](docs/ENGINEERING_REPORT.md) | CI/CD & maintenance |

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `vendor-chunks/motion-dom.js` or GSAP errors | Stop dev server, then `npm run clean && npm run build` |
| Playwright browsers missing | `npx playwright install --with-deps chromium` |
| Parity fails on new route | Capture baseline or add route to `PARITY_CI_ROUTES` |
| Contact 503 in production | Set `RESEND_API_KEY` + `CONTACT_NOTIFY_EMAIL` and/or `CONTACT_WEBHOOK_URL` in Vercel |
| Vercel deploy fails (regions) | Hobby plan allows one region only — use `"regions": ["fra1"]` in `vercel.json` |
| Lighthouse perf fails on home | Home uses WebGL; CI allows lower threshold (`LH_PERF_MIN_HOME`) |

## License

Private — LOUD SRL clone for agency use.
