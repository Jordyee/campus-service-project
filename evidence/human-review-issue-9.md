# Human Review Notes - Issue #9

## Review Scope

- GitHub Issue #9 acceptance checks.
- Draft PR #22: https://github.com/Jordyee/campus-service-project/pull/22
- Reporter create-request API and form changes on branch `implementation/issue-9-create-report`.
- Requirement/design references: FR-001, FR-002, US-001, AC-001, AC-002, API-01, UI-02, UI-FORM-01.

## Review Decision

Main-agent review: Pass for draft PR.

Student review: Pending through draft PR.

## Findings

No must-fix findings remain.

Fixed during review:

- UI acceptance test initially read `public/index.html` from the wrong runtime path; it now fetches `/` through `SELF`, proving the app page serves in the test runtime.

## Acceptance Check Result

| Check | Result | Evidence |
|---|---|---|
| Reporter can submit required fields | Pass | `public/index.html`, `worker/requests.ts`, `tests/integration/create-request-api.spec.ts` |
| Successful submission creates Submitted request and number | Pass | `worker/requests.ts`, API integration test |
| Validation errors preserve form values | Pass | Form JavaScript does not reset fields on validation failure; validation tests cover error details |
| Created request is persisted | Pass | API integration test queries D1 after POST |
| No optional feature data required | Pass | API/form fields are limited to approved #9 fields |

## Tests Run

```powershell
npx.cmd tsc --noEmit
npm.cmd test -- --run
```

Result: TypeScript check passed; 6 test files passed, 22 tests passed.
