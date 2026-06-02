# Contributing

Thank you for helping maintain the LOUD site clone. This project prioritizes **stability and regression safety** over experimental UI changes.

## Branch flow

1. Branch from `main`: `feat/short-description` or `fix/issue-name`
2. Keep PRs focused — avoid mixing content, visual parity, and infra changes
3. Open a PR against `main`
4. Ensure **CI is green** before requesting review
5. Squash merge preferred

## Local checks (required before PR)

```bash
npm ci
npm run lint
npm run typecheck
npm run build
npm run test:smoke
```

Optional but recommended:

```bash
npm run test:parity
npm run lighthouse:ci   # after npm run start in another terminal
```

## Parity workflow

Visual baselines are **intentional contracts**. Do not update snapshots unless the visual change is deliberate.

### When UI changes are intentional

1. Run locally: `npm run build && npx playwright test tests/parity-against-live.spec.ts --update-snapshots`
2. Review diff images in Playwright report
3. Commit updated PNGs under `tests/parity-baselines/`
4. Note the change in the PR description

### CI parity scope

Pull requests run a **lightweight matrix**:

- Routes: `PARITY_CI_ROUTES` in `tests/lib/parity.ts`
- Viewports: `1440×900`, `390×844`

Routes without baselines are skipped automatically.

### Full parity (weekly / manual)

```bash
PARITY_FULL=1 npm run test:parity
```

Or wait for the scheduled `parity-weekly.yml` workflow.

## Content changes

Edit data files under `data/` — see [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md). Do not hand-edit generated `data/caseStudies.ts`.

## What not to do

- Disable CI checks to merge faster
- Commit `.env` or secrets
- Force-push to `main`
- Broad refactors without a dedicated PR

## Code style

- Match existing patterns (Tailwind, GSAP, component structure)
- No `console.log` in app code (use `reportError` / `reportMessage`)
- Prefer minimal diffs

## Questions

See [docs/ENGINEERING_REPORT.md](docs/ENGINEERING_REPORT.md) for pipeline details.
