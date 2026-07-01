# Test Plan

## 1. Purpose

This document defines the planned testing approach for the Campus Service Request and Maintenance System before final automated testing and acceptance testing are completed.

It covers:

- unit testing;
- integration testing;
- acceptance testing;
- required test data;
- requirement-to-test mapping;
- evidence expectations for later testing stages.

## 2. Sources Read

- `docs/requirements/03-specification.md`
- `docs/requirements/traceability.md`
- `docs/testing/implementation-test-coverage.md`
- `skills/12-test-planning/SKILL.md`
- `skills/13-automated-testing/SKILL.md`
- `skills/14-acceptance-testing/SKILL.md`

## 3. Scope

### In Scope

- `FR-001` to `FR-015`
- `NFR-001` to `NFR-007` where they are testable through behavior or evidence
- `US-001` to `US-011`
- `AC-001` to `AC-022`
- `CR-001`, `CR-002`, and `CR-003`
- approved lifecycle:

```text
Submitted -> Under Review -> Assigned -> In Progress -> Resolved -> Closed
```

### Out of Scope

- `DR-001` Upload photo
- `DR-002` Email notification
- `DR-003` Google login
- `DR-004` Room QR code
- `DR-005` AI categorization
- `DR-006` Spare-part inventory
- `DR-007` Vendor management
- deployment verification to public Cloudflare URL at this stage

## 4. Test Strategy

### Unit Tests

Use unit tests for:

- enum and validation rules;
- role/action boundary behavior;
- lifecycle transition rules;
- shared API error behavior;
- static UI shell smoke coverage where browser automation is not yet available.

### Integration Tests

Use integration tests for:

- Worker routes;
- D1 persistence behavior;
- list/detail/query behavior;
- role-restricted actions;
- status history writes;
- comments and notes;
- dashboard summary behavior.

### Acceptance Tests

Use acceptance tests for:

- complete user flows from report creation to dashboard visibility;
- visible role boundaries across Reporter, Administrator, Technician, and Facility Manager;
- manual confirmation that the implemented UI and local app behavior match the requirements.

## 5. Test Environment

### Planned Stack

- Frontend/UI served from Worker static assets in `public/`
- Backend: Cloudflare Worker in `worker/`
- Database: local Cloudflare D1 via Wrangler
- Test command: `npm.cmd test -- --run`
- Type check: `npx.cmd tsc --noEmit`
- Local dev server: `npm.cmd run dev`

### Environment Notes

- On this Windows machine, prefer `npm.cmd` and `npx.cmd`.
- Use local Wrangler URL for manual testing; do not open `public/index.html` directly for API-backed checks.
- If local D1 is empty or corrupted, apply migrations again before acceptance testing.

## 6. Test Data

### Seeded Actors

Use the approved development-friendly actor context:

- Reporter: `user-reporter-1`
- Administrator: `user-admin-1`
- Technician: `user-tech-1`
- Facility Manager: `user-manager-1`

### Core Request Data

Use at least these request categories during testing:

- `INTERNET`
- `AC`
- `PERALATAN_KELAS`
- `LAINNYA`

Use at least these priorities during testing:

- `LOW`
- `MEDIUM`
- `HIGH`

Use at least these data variants:

- valid request payload
- missing required fields
- invalid category or priority
- request with no assignment
- request already accepted by technician
- request with comments and status history
- empty dashboard state

## 7. Automated Test Plan

### Planned Unit Test Areas

| Area | Verifies | Requirement Coverage |
|---|---|---|
| Foundation constants and role boundary | Valid roles, statuses, allowed actions, transitions, shared errors | `NFR-002`, `NFR-003`, `NFR-004`, `BR-001` to `BR-005` |
| Request creation validation | Required fields, invalid category, valid input normalization | `FR-001`, `FR-002`, `AC-001`, `AC-002` |
| List/filter validation | Search/filter query validation and empty cases | `FR-003`, `FR-004`, `AC-005`, `AC-006` |
| Static UI smoke | Presence of required controls and role-aware sections | `NFR-001`, `FR-001`, `FR-003`, `FR-005`, `FR-015` |

### Planned Integration Test Areas

| Area | Route / Behavior | Requirement Coverage |
|---|---|---|
| Health | `GET /api/health` | `NFR-006` |
| Foundation schema | D1 tables, seeded actors, schema constraints, status history helper | `NFR-002`, `NFR-003`, `FR-013` |
| Create request | `POST /api/requests` | `FR-001`, `FR-002`, `US-001`, `AC-001`, `AC-002` |
| Report list and filters | `GET /api/requests` | `FR-003`, `FR-004`, `US-002`, `US-003`, `AC-003`, `AC-005`, `AC-006` |
| Report detail | `GET /api/requests/{id}` | `FR-005`, `FR-013`, `AC-003`, `AC-004`, `AC-015`, `AC-016` |
| Comments and notes | `POST /api/requests/{id}/comments` | `FR-012`, `US-009`, `AC-017`, `AC-018` |
| Admin review/classification | `/review`, `/classification` | `FR-006`, `FR-007`, `FR-008`, `US-004`, `US-005`, `AC-007` to `AC-010` |
| Technician assignment | `/assignment`, `/users?role=TECHNICIAN` | `FR-009`, `US-006`, `AC-011`, `AC-012` |
| Technician task list/acceptance | `/api/technician/tasks`, `/accept` | `FR-010`, `US-007`, `AC-013`, `AC-014` |
| Technician work status | `/work-status` | `FR-011`, `FR-013`, `US-008`, `AC-015`, `AC-016` |
| Close and reopen | `/close`, `/reopen` | `FR-014`, `US-010`, `AC-019`, `AC-020` |
| Dashboard summary | `/api/dashboard/summary` | `FR-015`, `US-011`, `AC-021`, `AC-022` |

### Automated Quality Target

- At least 20 automated tests must exist.
- Happy path, validation failure, forbidden role, and invalid transition cases must all be present.
- Tests must be rerunnable through the project test command.

## 8. Acceptance Test Plan

### Acceptance Flow A: Reporter Creates and Tracks a Request

**Verifies:** `US-001`, `US-002`, `US-003`, `US-009`, `FR-001` to `FR-005`, `FR-012`, `AC-001` to `AC-006`, `AC-017`, `AC-018`

Steps:

1. Open the local app in Reporter mode.
2. Submit a valid report.
3. Confirm the request appears in the list.
4. Open the detail view.
5. Confirm status, description, and history are visible.
6. Add a comment.
7. Apply search and filters.
8. Confirm empty-state behavior when filters return no results.

Expected Result:

- Request is created as `Submitted`.
- Reporter sees only relevant report data.
- Comment is saved and visible in detail.

### Acceptance Flow B: Administrator Reviews and Assigns

**Verifies:** `US-004`, `US-005`, `US-006`, `FR-006` to `FR-009`, `AC-007` to `AC-012`

Steps:

1. Switch to Administrator mode.
2. Open a submitted report.
3. Start review.
4. Set category and priority.
5. Assign an active technician.
6. Reopen list/detail to confirm assignment state.

Expected Result:

- Submitted report moves to `Under Review`.
- Category and priority save only approved values.
- Technician assignment is stored and visible.

### Acceptance Flow C: Technician Accepts and Resolves Work

**Verifies:** `US-007`, `US-008`, `FR-010`, `FR-011`, `FR-013`, `AC-013` to `AC-016`

Steps:

1. Switch to Technician mode.
2. Open assigned task list.
3. Accept assigned work.
4. Mark work `In Progress`.
5. Add progress note if needed.
6. Mark work `Resolved`.
7. Reopen detail to confirm history entries.

Expected Result:

- Assigned task appears in technician task list.
- Acceptance is recorded.
- Status history records `Assigned -> In Progress -> Resolved`.

### Acceptance Flow D: Administrator Closes and Reopens

**Verifies:** `US-010`, `FR-014`, `AC-019`, `AC-020`, `CR-001`

Steps:

1. Switch to Administrator mode.
2. Open a resolved report.
3. Close the report.
4. Reopen the report with reason.
5. Confirm detail and history updates.

Expected Result:

- Resolved report becomes `Closed`.
- Reopened report returns to `Under Review`.
- History stores the reopen reason/context.

### Acceptance Flow E: Facility Manager Reviews Dashboard

**Verifies:** `US-011`, `FR-015`, `AC-021`, `AC-022`

Steps:

1. Switch to Facility Manager mode.
2. Open dashboard.
3. Review counts by status, category, and priority.
4. Review recent reports.
5. Confirm empty state when no reports exist.

Expected Result:

- Dashboard loads without role violations.
- Counts and recent report list reflect current data.
- Empty state is stable and readable.

## 9. Edge Cases and Failure Cases

### Edge Cases

- valid report with different categories and priorities
- no reports available yet
- no technicians available for assignment
- reopening a previously closed report
- technician tries to progress work without acceptance
- dashboard with zero counts in every category

### Failure Cases

- missing required report fields
- invalid category or priority
- Reporter tries admin-only action
- Technician tries another technician's task
- Administrator tries invalid lifecycle transition
- invalid filter query values
- backend unavailable during UI action

## 10. Evidence To Collect

The following evidence must be collected in later testing stages:

- `npx.cmd tsc --noEmit` result
- `npm.cmd test -- --run` result
- screenshots for each acceptance flow
- screenshots for validation and empty states
- local run notes for role switching and lifecycle progression
- failed-case notes with reproduction steps if a flow breaks

## 11. Pass / Fail Rules

A test area is `Pass` only if:

- the main flow completes successfully;
- expected result matches actual behavior;
- no role violation or silent error occurs;
- evidence is recorded.

A test area is `Fail` if:

- one main step in the flow fails;
- a required requirement is missing;
- data is saved incorrectly;
- status history or role restrictions are wrong.

## 12. Current Planning Notes

- Automated coverage has already exceeded the minimum requirement with 62 tests across 15 files.
- Browser-based acceptance evidence still needs to be recorded in a dedicated results file.
- Current role handling is still development-friendly and must be interpreted carefully during acceptance review.
- Numeric NFR targets remain pending and should not be invented during test reporting.

## 13. Human Review Checklist

- Check that all major user stories appear in this plan.
- Check that every acceptance flow maps to requirement IDs.
- Check that failure cases include role and validation errors.
- Check that the plan stays inside approved project scope.
- Check that this plan is realistic for the local environment and available tooling.
