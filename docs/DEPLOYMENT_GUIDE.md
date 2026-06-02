# Deployment Guide

## Recommended platform

**Vercel** (Next.js 14 App Router). The repo includes `vercel.json` and a GitHub Actions deploy workflow.

## Option A — Vercel Git integration (simplest)

1. Import the GitHub repository in [Vercel](https://vercel.com/new)
2. Framework preset: **Next.js**
3. Build command: `npm run build`
4. Install command: `npm ci`
5. Add environment variables (see below)
6. Deploy — previews on PRs, production on `main`

## Option B — GitHub Actions deploy

Add repository secrets:

| Secret | Description |
|--------|-------------|
| `VERCEL_TOKEN` | Vercel personal token |
| `VERCEL_ORG_ID` | Team/user ID |
| `VERCEL_PROJECT_ID` | Project ID |

Optional repository variable:

| Variable | Example |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` |

Workflow: [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) runs smoke tests then `vercel-action --prod`.

## Required environment variables (production)

```env
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
CONTACT_WEBHOOK_URL=https://your-crm-or-zapier-endpoint/hooks/contact
CONTACT_REQUIRE_WEBHOOK=true
```

## Contact webhook setup

The API (`/api/contact`) POSTs JSON:

```json
{
  "source": "loudsrl.com",
  "projectType": "...",
  "industry": "...",
  "deliverables": [],
  "budget": "...",
  "description": "...",
  "attachmentCount": 0,
  "attachments": [{ "name": "...", "type": "...", "size": 1234, "base64": "..." }],
  "submittedAt": "ISO-8601"
}
```

Test locally without webhook: omit `CONTACT_REQUIRE_WEBHOOK` in `.env.local` (dev accepts submissions).

## Optional observability

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_VERCEL_ANALYTICS` | Vercel Analytics (default on) |
| `NEXT_PUBLIC_VERCEL_SPEED_INSIGHTS` | Speed Insights (default on) |
| `NEXT_PUBLIC_ERROR_REPORT_URL` | POST client errors to your webhook |
| `NEXT_PUBLIC_REPORT_WEB_VITALS` | Log Web Vitals in dev tooling |

### Sentry (optional)

Install `@sentry/nextjs` per Sentry docs and call `Sentry.captureException` from `lib/observability/reportError.ts`.

## Production verification checklist

After deploy:

- [ ] Home hero renders (WebGL or black fallback)
- [ ] Mobile menu opens/closes; no background scroll
- [ ] `/contact-us` form submits (check webhook received)
- [ ] `/robots.txt` and `/sitemap.xml` return 200
- [ ] Favicon visible in browser tab
- [ ] Lighthouse spot-check (Performance may be lower on home due to WebGL)
- [ ] Custom domain + `NEXT_PUBLIC_SITE_URL` match

## Cache invalidation

Static assets under `/media` and `/logos` use `immutable` long-cache headers. After replacing assets:

1. Deploy new build (new hashed Next chunks)
2. For media filename changes, no purge needed
3. If overwriting same filename on CDN, purge Vercel cache or rename files

## Rollback

- Vercel: promote previous deployment in dashboard
- Git: revert commit on `main` and redeploy

## Troubleshooting

| Symptom | Action |
|---------|--------|
| Contact 503 | Set `CONTACT_WEBHOOK_URL` |
| 413 on upload | Total attachments ≤ 6 MB |
| Build fails GSAP | Run `npm run clean` locally; verify `next.config.mjs` externals |
| Preview works, prod 500 | Check env vars on production environment |
