# Login Landing Handoff - 2026-07-05

## Context

The login landing page was added after the Google Stitch mockup review. It is a development-friendly entry screen for the Campus Service Request and Maintenance System, not a production authentication system.

The page should give users a clear first impression, explain the service workflow, and let testers enter the app using the approved seeded roles.

## Implemented Behavior

- The app opens on a split login landing page.
- The left panel contains:
  - CampusOps branding.
  - Email or campus ID field.
  - Password field.
  - Sign In button.
  - Role preset buttons for Reporter, Admin, Technician, and Manager.
- The right panel contains:
  - Short explanation of the website.
  - Required workflow: Submitted -> Under Review -> Assigned -> In Progress -> Resolved -> Closed.
  - Role-based "How To Use It" cards.
- Selecting a role preset changes the active demo role.
- Clicking Sign In enters the app with the selected role.
- The app topbar includes Sign Out, which returns to the landing page.
- The existing in-app role selector still works after login for testing.

## Intentional Scope Boundaries

The login screen does not implement:

- Real authentication.
- Google login.
- Password reset email.
- User registration.
- Session persistence.
- Paid identity provider integration.

These are outside the approved scope unless explicitly requested later.

## Important Files

- `src/components/LoginPage.tsx`
- `src/session/demoSession.ts`
- `src/App.tsx`
- `src/styles/main.css`
- `public/index.html`
- `package.json`

The generated production assets in `public/assets/` were refreshed by `npm.cmd run build:frontend`.

## Verification Completed

- `npm.cmd run tsc:frontend`
- `npm.cmd run build:frontend`
- `npm.cmd test -- --run`
- Local worker check on `http://127.0.0.1:8788`
- Verified served HTML references the latest built JS and CSS assets.
- Verified the served JS bundle contains the new login landing copy.

## Testing Notes For Next Session

Use `npm.cmd run dev` or the explicit command below if the normal dev script has asset serving issues:

```powershell
npx.cmd wrangler dev worker/index.ts --assets public --port 8788
```

Recommended manual checks:

1. Open the landing page.
2. Select each access role.
3. Click Sign In and confirm the correct dashboard/workspace appears.
4. Use Sign Out and confirm the app returns to the landing page.
5. Resize to a mobile viewport and verify the split layout stacks cleanly.
6. Confirm workflow text still matches the required lifecycle.

## Open Revision Areas

- Replace placeholder letter icons with a real icon set if the project adopts one.
- Improve small-screen polish after the user reviews the landing page in browser.
- Decide whether role preset buttons should only select a role or immediately enter that role.
- Decide whether the login field labels should remain English or be localized to Indonesian.
