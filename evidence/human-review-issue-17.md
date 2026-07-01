# Human Review Notes - Issue #17

## Review Scope

- GitHub Issue #17 acceptance checks.
- Admin close/reopen API and UI changes on branch `implementation/issue-17-close-reopen`.
- Requirement/design references: FR-014, FR-013, US-010, AC-019, AC-020, BR-001, BR-003, BR-005, BR-007, CR-001, API-10, API-11, VAL-DBAPI-008, VAL-DBAPI-009, UI-06, UI-FORM-06, UI-ACT-11, UI-ACT-12.

## Review Decision

Main-agent review: Pass for PR #30 merge to `development`.

Student review: Pending.

## Findings

No must-fix findings remain.

Scope kept out intentionally:

- Retention, deletion, or archive behavior.
- Extra lifecycle statuses.
- Notifications.
- Facility Manager dashboard summary.
- Deployment.

## Acceptance Check Result

| Check | Result | Evidence |
|---|---|---|
| Administrator can close a Resolved report and status becomes Closed | Pass | `closeServiceRequest`, integration test |
| Administrator can reopen Resolved or Closed only with reason/context | Pass | `reopenServiceRequest`, required reason validation, integration test |
| Reopened reports return to Under Review | Pass | `transitionRequestStatus`, integration test |
| Close and reopen append status history entries | Pass | detail/status history assertions in integration test |
| Invalid transitions and forbidden actors are rejected consistently | Pass | 409/403 integration assertions |
| UI shows close/reopen actions and refreshes detail/history | Pass | `public/index.html`, UI smoke test |

## Tests Run

```powershell
npx.cmd tsc --noEmit
npm.cmd test -- --run
```

Result: TypeScript check passed; 14 test files passed, 59 tests passed.
