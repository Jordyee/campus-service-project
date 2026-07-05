# Deployment Notes

## Deployment Summary

- Date: 2026-07-02
- Platform: Cloudflare Workers with Static Assets
- Database: Cloudflare D1 SQLite
- Worker name: `campus-service-project`
- Public URL: <https://campus-service-project.gerungan-dj.workers.dev>
- Version ID: `0c47ac25-7390-4762-8b05-81af8f82a945`

## Cloudflare Resources

- Account: `Gerungan.dj@gmail.com's Account`
- D1 database name: `campus-service-project`
- D1 database ID: `02b0478c-3400-46ba-b129-5a6240c54886`
- D1 region: APAC
- Worker binding: `DB`

## Commands Run

```powershell
npm.cmd test -- --run
npm.cmd run tsc:frontend
npm.cmd run build:frontend
npx.cmd wrangler d1 create campus-service-project
npm.cmd run cf-typegen
npx.cmd wrangler deploy --dry-run
npx.cmd wrangler d1 migrations apply campus-service-project --remote
npm.cmd run deploy
```

## Verification Results

- Automated tests: 62 passed across 15 test files.
- Frontend TypeScript check: passed.
- Frontend production build: passed.
- Wrangler deploy dry-run: passed.
- Remote D1 migration `0001_foundation.sql`: applied successfully.
- Health check: `GET /api/health` returned `{"data":{"status":"ok"}}`.
- SPA navigation: root URL returned HTML 200 for browser navigation.
- Dashboard API: `GET /api/dashboard/summary` returned 200 for `FACILITY_MANAGER`.
- Technician choices API: `GET /api/users?role=TECHNICIAN` returned 200 for `ADMINISTRATOR`.
- D1 seed check: `SELECT COUNT(*) AS user_count FROM app_users` returned `4`.
- Final demo data strategy: keep the service-request dataset empty before the demo and create one request live through the full workflow.
- Final demo URL decision: use the current public Cloudflare Workers URL for final demonstration. Redeploy only if runtime code, frontend assets, Worker configuration, or D1 migrations change after final review.

## Notes

- The deployment uses Workers Static Assets rather than a separate Cloudflare Pages project. This keeps the React frontend, Worker API, and D1 binding in one deployable Cloudflare Worker.
- `assets.not_found_handling` is set to `single-page-application` so browser navigation can load the React app for client-side routes.
- `assets.run_worker_first` is set for `/api/*` so API routes are always handled by the Worker before static assets.
- No secrets or tokens were added to the repository.

## Final Deployment Sync - 2026-07-05

- Date/time: 2026-07-05 23:44 +07:00
- Platform: existing Cloudflare Worker with Static Assets
- Worker name: `campus-service-project`
- Public URL: <https://campus-service-project.gerungan-dj.workers.dev>
- Version ID: `7d8b7e54-649a-46d4-a616-c47cdfcc31fa`

### Commands Run

```powershell
npx.cmd tsc --noEmit
npm.cmd test -- --run
npm.cmd run build:frontend
npm.cmd run deploy
```

### Verification Results

- TypeScript check: passed.
- Automated tests: 66 passed across 16 test files.
- Frontend production build: passed.
- Deploy target: existing Worker `campus-service-project`; no new Worker or Pages project was created.
- Root HTML: `GET /` returned 200.
- Static assets: public URL asset paths matched local `public/index.html`:
  - `/assets/index-Chp3Y0af.js`
  - `/assets/index-BMZqSDhn.css`
- Asset responses: both public asset URLs returned 200 with expected byte lengths.
- Health check: `GET /api/health` returned status `ok`.
- Login/demo session UI: public URL rendered the login screen with email/password fields and Reporter/Admin/Technician/Manager role presets.
- Reporter demo session smoke: signing in as seeded Reporter reached the Reporter Portal with Create Report, My Service Requests, and connected Worker API status visible.
- Form validation smoke: submitting the empty Create Report form showed required-field validation without creating remote data.
- Read-only public API smoke:
  - `GET /api/requests` as Reporter returned 200 and an empty list.
  - `GET /api/users?role=TECHNICIAN` as Administrator returned 200 and the seeded technician.
  - `GET /api/dashboard/summary` as Facility Manager returned 200 with zero counts.

### Notes

- `npm audit fix` was not run. The dependency audit remains a documented known limitation in testing notes.
- The final sync preserved the demo data strategy: no service request record was created during public smoke verification.
