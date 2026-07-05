# Demo Login Session AI Evidence

## Scope

Branch: `implementation/demo-login-session`

Task: Replace the in-header role selector with a demo login/session flow that keeps the existing seeded actor context and does not add production authentication.

## Human Request

The student asked to continue from `development`, add a simple login page/session as the next iteration of the demo actor context, then later changed the login format so users manually enter username, role, and password using the existing seeded user data.

## Implementation Summary

- Added a demo login page with username, role, and password fields.
- Used seeded actor IDs as the current demo username and password values.
- Stored only the resolved frontend demo session, not a production credential.
- Kept backend actor headers and business workflow unchanged.
- Removed the old role selector component from the active app shell.
- Fixed the Technician UI so `Tandai In Progress` is hidden until a task has been accepted.

## Files Changed

- `src/components/LoginPage.tsx`
- `src/session/demoSession.ts`
- `src/App.tsx`
- `src/components/TechnicianPanel.tsx`
- `src/types/api.ts`
- `src/styles/main.css`
- `tests/unit/demo-session.spec.ts`
- `docs/design/03-ui.md`
- `docs/requirements/traceability.md`
- `public/index.html` and generated `public/assets/*`

## Verification

Commands run:

```powershell
npm.cmd run build:frontend
npx.cmd tsc --noEmit
npx.cmd tsc --project tsconfig.frontend.json --noEmit
npm.cmd test -- --run
```

Result:

- Frontend build passed.
- TypeScript checks passed.
- Full Vitest suite passed: 16 files, 66 tests.
- Browser smoke test passed: wrong password is rejected, valid seeded credentials are accepted.
- Browser end-to-end workflow passed after the Technician UI fix: Reporter create, Admin review/classify/assign, Technician accept/progress/resolve, Admin close, Manager dashboard, Admin reopen.

## Scope Boundaries

- No Google login.
- No registration.
- No password reset.
- No email verification.
- No production authentication or identity provider.
- No backend workflow change.
- No optional features such as upload photo, email notification, inventory, or vendor management.

## Remaining Limitation

This remains a demo-only frontend session mechanism. Passwords are not secure credentials; they intentionally mirror seeded actor IDs for class demo simplicity.
