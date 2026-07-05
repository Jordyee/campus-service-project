# Release Note

## Campus Service Request Deployment

The Campus Service Request and Maintenance System has been deployed to Cloudflare Workers with Static Assets and Cloudflare D1.

Public URL: <https://campus-service-project.gerungan-dj.workers.dev>

Included in this deployment:

- React frontend built with Vite.
- Cloudflare Worker API.
- Cloudflare D1 SQLite database binding.
- Foundation database migration with seeded demo actors.
- Health check, request workflows, technician assignment, comments, status history, close/reopen, and dashboard APIs.

Verification:

- 62 automated tests passed.
- Remote D1 migration applied successfully.
- Production health check returned OK.
- Production dashboard and technician-user endpoints returned OK with expected actor headers.

## Final Deployment Sync - 2026-07-05

The existing Cloudflare Worker deployment was rebuilt and redeployed so the public URL serves the latest React login/demo-session assets.

Public URL: <https://campus-service-project.gerungan-dj.workers.dev>

Version ID: `7d8b7e54-649a-46d4-a616-c47cdfcc31fa`

Included in this sync:

- Existing Cloudflare Worker + Static Assets deployment reused.
- Latest Vite frontend build deployed from `public/`.
- Login page with seeded demo actor session flow verified on the public URL.
- Reporter portal smoke verified without creating remote service-request data.

Verification:

- `npx.cmd tsc --noEmit` passed.
- `npm.cmd test -- --run` passed: 16 files, 66 tests.
- `npm.cmd run build:frontend` passed.
- `npm.cmd run deploy` deployed to the existing Worker.
- Root HTML returned 200.
- Public asset URLs matched local `public/index.html`.
- `/api/health` returned OK.
- Reporter, technician-user, and dashboard public API smoke checks returned 200.
- `npm audit fix` was not run; dependency audit remains a documented known limitation.
