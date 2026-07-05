# Acceptance Test Results

## 1. Purpose

This document records acceptance testing results for the Campus Service Request and Maintenance System based on:

- `docs/testing/01-test-plan.md`
- `docs/requirements/03-specification.md`
- `docs/requirements/traceability.md`

It is intended to capture:

- end-to-end user-flow results;
- pass/fail status by acceptance flow;
- evidence already available;
- remaining manual verification work.

## 2. Sources Read

- `docs/testing/01-test-plan.md`
- `docs/testing/test-execution-report-2026-07-02.md`
- `docs/requirements/03-specification.md`
- `docs/requirements/traceability.md`
- `skills/14-acceptance-testing/SKILL.md`

## 3. Test Environment

| Item | Value |
|---|---|
| Branch | `development` |
| Local app mode | Cloudflare Worker local run |
| Database mode | local D1 |
| Main local command | `npm.cmd run dev` |
| Supporting checks | `npx.cmd tsc --noEmit`, `npm.cmd test -- --run` |

## 4. Acceptance Result Summary

| Flow | Scope | Current Result | Notes |
|---|---|---|---|
| Flow A | Reporter creates and tracks request | Pass | Browser flow and API smoke both passed; screenshot evidence still optional to attach. |
| Flow B | Administrator reviews and assigns | Pass | Browser flow and API smoke both passed. |
| Flow C | Technician accepts and resolves | Pass | Browser flow and API smoke both passed. |
| Flow D | Administrator closes and reopens | Pass | Browser flow and API smoke both passed. |
| Flow E | Facility Manager reviews dashboard | Pass | Browser flow and API smoke both passed. |

## 5. Acceptance Flow Results

### Flow A: Reporter Creates and Tracks a Request

**Verifies:** `US-001`, `US-002`, `US-003`, `US-009`, `FR-001` to `FR-005`, `FR-012`, `AC-001` to `AC-006`, `AC-017`, `AC-018`

| Check | Result | Evidence |
|---|---|---|
| Reporter submits a valid report | Pass | Recorded in `docs/testing/test-execution-report-2026-07-02.md` |
| New request starts as `SUBMITTED` | Pass | Smoke test result |
| Request appears in report list | Pass | Smoke test result |
| Request detail loads with visible status/detail/history | Pass | Smoke test result |
| Reporter can add comment | Pass | Smoke test result |
| Search and status filter return matching request | Pass | Smoke test result |
| Empty-state behavior in browser UI | Pass | Browser acceptance run confirmed list state changes and filter behavior |

### Flow B: Administrator Reviews and Assigns

**Verifies:** `US-004`, `US-005`, `US-006`, `FR-006` to `FR-009`, `AC-007` to `AC-012`

| Check | Result | Evidence |
|---|---|---|
| Administrator starts review on submitted report | Pass | Smoke test result |
| Status moves to `UNDER_REVIEW` | Pass | Smoke test result |
| Category and priority can be saved | Pass | Smoke test result |
| Assignment list returns active technician options | Pass | Smoke test result |
| Administrator assigns technician | Pass | Smoke test result |
| Assignment state is visible afterward | Pass | Smoke test result |
| Browser UI admin panel behavior | Pass | Verified through in-app browser acceptance run |

### Flow C: Technician Accepts and Resolves Work

**Verifies:** `US-007`, `US-008`, `FR-010`, `FR-011`, `FR-013`, `AC-013` to `AC-016`

| Check | Result | Evidence |
|---|---|---|
| Technician sees assigned task | Pass | Smoke test result |
| Technician accepts assigned work | Pass | Smoke test result |
| Technician marks task `IN_PROGRESS` | Pass | Smoke test result |
| Technician marks task `RESOLVED` | Pass | Smoke test result |
| Status history is updated through progression | Pass | Smoke test result |
| Browser UI technician task controls | Pass | Verified through in-app browser acceptance run |

### Flow D: Administrator Closes and Reopens

**Verifies:** `US-010`, `FR-014`, `AC-019`, `AC-020`, `CR-001`

| Check | Result | Evidence |
|---|---|---|
| Administrator closes resolved report | Pass | Smoke test result |
| Status changes to `CLOSED` | Pass | Smoke test result |
| Administrator reopens report with reason | Pass | Smoke test result |
| Status returns to `UNDER_REVIEW` | Pass | Smoke test result |
| Reopen reason/context is preserved | Pass | Smoke test result |
| Browser UI close/reopen controls | Pass | Verified through in-app browser acceptance run |

### Flow E: Facility Manager Reviews Dashboard

**Verifies:** `US-011`, `FR-015`, `AC-021`, `AC-022`

| Check | Result | Evidence |
|---|---|---|
| Facility Manager opens dashboard | Pass | Smoke test result |
| Dashboard shows summary counts | Pass | Smoke test result |
| Dashboard shows recent reports | Pass | Smoke test result |
| Empty dashboard state | Covered by automated test | `tests/integration/dashboard-summary-api.spec.ts` |
| Browser UI dashboard rendering | Pass | Verified through in-app browser acceptance run |

## 6. Cross-Flow Role Boundary Checks

| Check | Result | Evidence |
|---|---|---|
| Reporter should not perform Administrator review actions | Pass | Detail-panel role state checked in browser and role-restricted routes are covered by automated tests |
| Technician should not update another technician's task | Covered by automated test | `tests/integration/technician-work-status-api.spec.ts` |
| Non-manager should not access dashboard | Covered by automated test | `tests/integration/dashboard-summary-api.spec.ts` |
| Invalid lifecycle transitions should be rejected | Covered by automated tests | Admin/Technician integration test suite |

## 7. Evidence Already Available

- automated test evidence from `npm.cmd test -- --run`
- type-check evidence from `npx.cmd tsc --noEmit`
- local D1 migration evidence
- end-to-end API smoke evidence in `docs/testing/test-execution-report-2026-07-02.md`

## 8. Evidence Still Useful To Add

- final visual screenshots for each flow (optional for automated verification, required only if rubric mandates it)
- Existing files under `evidence/Screenshoots/` are draft captures only. Capture final screenshots using `docs/testing/03-final-screenshot-guide.md` and treat the new captures as the official visual evidence.

## 9. Current Problems / Limitations

- Role handling still uses development-friendly actor switching and should not be treated as real production authentication.
- Final demo defense for role handling: the login page uses seeded demo actors to create a development-friendly actor context for testing role-based workflow. It is not claimed as production authentication; in production, the actor context would come from a real identity/session provider.
- Optional feature defense: upload photo, email notification, Google login, QR code, AI categorization, spare-part inventory, and vendor management remain deferred.
- Dependency audit remains unresolved and is treated as a known limitation, not a submission blocker, because the findings are in development/test tooling dependencies while application workflow checks, type-checking, automated tests, and deployment verification passed.
- Full Vitest reruns may intermittently fail from `workerd` memory pressure even when targeted tests pass.
- One UI polish fix was applied after acceptance browsing: Reporter role summary now restores its own submitted-request text when switching back from another role.
- A final verification on 2026-07-06 passed type-checking, 66 automated tests across 16 files, frontend build, and public URL health smoke.

## 10. Current Acceptance Decision

Current decision: `Pass for acceptance workflow with noted limitations`

Reason:

- the core required workflow passes automated coverage, API smoke checks, and direct browser acceptance flow checks;
- remaining limitations are environment/tooling related, not a confirmed scope failure in the main workflow.

## 11. Next Required Work

1. Capture and attach final screenshots using `docs/testing/03-final-screenshot-guide.md` if the course requires visual evidence in the final report.
2. Record any reproduction steps if a later manual retest finds a failure.
3. Use the final reviewed version of this file as submission evidence.

## 12. Final Demo Data Strategy

Final demonstration should start from an empty service-request dataset with the seeded demo actors only. The student will create one request live and move it through the required end-to-end workflow so the demo proves the lifecycle instead of relying on pre-existing request records.

## 13. Human Review Checklist

- Confirm that each flow result reflects real observed behavior.
- Confirm that no required flow is marked `Pass` without evidence.
- Confirm that final manual UI screenshots, not only draft captures, are attached or referenced before final submission.
- Confirm that limitations are written clearly and do not hide known failures.
