# Human Review Notes - Issue #12

## Review Scope

- GitHub Issue #12 acceptance checks.
- Append-only comments/notes API and UI changes on branch `implementation/issue-12-comments-notes`.
- Requirement/design references: FR-012, US-004, US-009, AC-008, AC-017, AC-018, BR-006, CR-002, API-12, UI-FORM-04, UI-COMP-03, UI-ACT-10.

## Review Decision

Main-agent review: Pass for draft PR #25 and merge to `development`.

Student review: Pending.

## Findings

No must-fix findings remain.

Scope kept out intentionally:

- Comment editing/deleting.
- Private/internal-only note policy.
- Duplicate merge feature.
- Notifications.
- Deployment.

## Acceptance Check Result

| Check | Result | Evidence |
|---|---|---|
| Authorized viewers can add comment/note with required body | Pass | `worker/requests.ts`, `tests/integration/comments-api.spec.ts` |
| Saved entries link to report and appear chronologically | Pass | `request_comments` insert path and detail reload test |
| Comments/notes are append-only | Pass | No edit/delete UI/API route; `tests/integration/comments-api.spec.ts` |
| Author role, type, body, timestamp are visible | Pass | Detail API/UI mapping in `worker/requests.ts` and `public/index.html` |
| Clarification context can be recorded as note without duplicate merge | Pass | `NOTE` support without merge feature |

## Tests Run

```powershell
npx.cmd tsc --noEmit
npm.cmd test -- --run
```

Result: TypeScript check passed; 9 test files passed, 35 tests passed.

## PR

https://github.com/Jordyee/campus-service-project/pull/25
