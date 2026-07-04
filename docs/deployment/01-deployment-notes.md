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
