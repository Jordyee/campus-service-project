# Loop Log

## 1. Purpose

This file records engineering loop evidence for implementation issues. It is intentionally prepared before coding starts so each sub-agent has the same evidence format.

## 2. Sources Read

- `AGENTS.md`
- `docs/ai-native/05-issues.md`
- `docs/ai-native/07-issue-prompt.md`
- `docs/planning/implementation-queue.md`
- `docs/planning/sub-agent-protocol.md`
- `docs/planning/issue-plan.md`

## 3. Loop Rules

- One loop entry per issue.
- One issue per sub-agent.
- Maximum 3 cycles per issue before diagnosis or human help.
- After 3 failed cycles, cut the issue loop and notify the student instead of retrying.
- If the failure is fatal to later issues, stop the continuous queue.
- Every cycle must record build, review, test, and decision evidence.
- Passing tests alone is not enough; acceptance checks and scope boundaries must pass.
- Student/main-agent decision is required before a loop is accepted.

## 4. Stop Conditions

An issue loop can stop only when:

- [ ] Acceptance checks pass.
- [ ] Required tests or manual checks pass.
- [ ] Review has no critical issue.
- [ ] No unrelated files were changed.
- [ ] No optional features were added.
- [ ] Traceability/evidence updates are complete where relevant.
- [ ] Student or main agent can explain the change.
- [ ] Remaining limitations are documented.

## 5. Issue Loop Entries

### Issue #8 - Implement app data model, role boundary, and lifecycle foundation

**Status:** Merged to `development`

**Branch:** `implementation/issue-8-foundation`

**PR:** https://github.com/Jordyee/campus-service-project/pull/21

**Owner:** Main agent

**Blockers:** None. Student approved simple role/session mechanism on 2026-07-01.

**Source of Truth:**

- GitHub Issue #8
- `docs/planning/implementation-queue.md`
- `docs/ai-native/07-issue-prompt.md`

**Cycle 1:**

- Build attempt: Added the D1 foundation migration, seeded demo actors, shared enum/role/action/lifecycle helpers, shared API response helpers, and a single status transition/history helper.
- Files changed: `migrations/0001_foundation.sql`, `worker/foundation.ts`, `worker/status-history.ts`, `worker/index.ts`, `vitest.config.mts`, `tests/unit/foundation.spec.ts`, `tests/integration/foundation-schema.spec.ts`, `tests/integration/health.spec.ts`, `docs/requirements/traceability.md`, `evidence/implementation-issue-8-ai-evidence.md`, `evidence/human-review-issue-8.md`.
- AI assumptions: Actor context is provided by development headers `x-actor-role` and optional `x-actor-id`; missing actor ID falls back to seeded demo users. No Google login, paid identity service, deployment, or optional-feature tables were added.
- Review result: Pass after focused fixes. Review found one schema-test false positive from Miniflare internal `_cf_METADATA` table and one status-history safety risk where history could be written after a zero-row update; both were fixed.
- Tests/checks run: `npx.cmd tsc --noEmit`; `npm.cmd test -- --run`.
- Evidence: First run failed 1 schema assertion because `_cf_METADATA` was counted; typecheck then passed; final test run passed 3 files and 15 tests.
- Failures: None remaining.
- Decision: Accept Cycle 1 for draft PR creation and main-agent review.

**Cycle 2:**

- Build attempt:
- Files changed:
- AI assumptions:
- Review result:
- Tests/checks run:
- Evidence:
- Failures:
- Decision:

**Cycle 3:**

- Build attempt:
- Files changed:
- AI assumptions:
- Review result:
- Tests/checks run:
- Evidence:
- Failures:
- Decision:

**After Cycle 3 if still failing:**

- Stop issue loop.
- Report blocker and evidence to student.
- Do not continue to #9 unless main agent determines #8 passed review/testing.

### Issue #9 - Build reporter service request creation flow

**Status:** Merged to `development`

**Branch:** `implementation/issue-9-create-report`

**PR:** https://github.com/Jordyee/campus-service-project/pull/22

**Owner:** Main agent

**Blockers:** #8 completed and merged through PR #21.

**Source of Truth:**

- GitHub Issue #9
- `docs/planning/implementation-queue.md`
- `docs/requirements/traceability.md`
- `docs/design/02-database-api.md`
- `docs/design/03-ui.md`

**Cycle 1:**

- Build attempt: Added Reporter create-request validation, `POST /api/requests`, D1 persistence with `SUBMITTED` status and initial status history, D1 binding config, and a static Reporter form that posts with the approved header-based actor context.
- Files changed: `worker/requests.ts`, `worker/index.ts`, `wrangler.jsonc`, `public/index.html`, `tests/unit/create-request.spec.ts`, `tests/integration/create-request-api.spec.ts`, `tests/unit/new-report-form.spec.ts`, `docs/ai-native/08-loop-log.md`, `docs/planning/implementation-queue.md`, `docs/requirements/traceability.md`, `evidence/implementation-issue-9-ai-evidence.md`, `evidence/human-review-issue-9.md`.
- AI assumptions: The existing repo has no React/Vite frontend build, so Issue #9 uses the current Cloudflare static asset path for the Reporter form instead of adding frontend dependencies. The API requires `x-actor-role: REPORTER`.
- Review result: Pass after focused fix. Review kept admin review, lists, detail, assignment, technician flow, dashboard, deployment, and optional-feature fields out of scope.
- Tests/checks run: `npx.cmd tsc --noEmit`; `npm.cmd test -- --run`.
- Evidence: First test run failed because the form test read `public/index.html` from the Worker bundle path; fixed by fetching the app page through `SELF`. Final run passed 6 files and 22 tests.
- Failures: None remaining.
- Decision: Accept Cycle 1 for draft PR creation and main-agent review.

### Issue #10 - Build report list, search, and filters

**Status:** Merged to `development`

**Branch:** `implementation/issue-10-report-list-filters`

**PR:** https://github.com/Jordyee/campus-service-project/pull/23

**Owner:** Main agent

**Blockers:** #8 and #9 completed and merged through PR #21 and PR #22.

**Source of Truth:**

- GitHub Issue #10
- `docs/planning/implementation-queue.md`
- `docs/requirements/traceability.md`
- `docs/design/02-database-api.md`
- `docs/design/03-ui.md`

**Cycle 1:**

- Build attempt: Added `GET /api/requests`, role-scoped list reads, status/category/priority/location/keyword filters, practical keyword matching, assigned technician display, role selector, list/filter UI, clear filters action, and no-results empty states.
- Files changed: `worker/requests.ts`, `worker/index.ts`, `public/index.html`, `tests/unit/create-request.spec.ts`, `tests/unit/new-report-form.spec.ts`, `tests/integration/list-requests-api.spec.ts`, `docs/ai-native/08-loop-log.md`, `docs/planning/implementation-queue.md`, `docs/requirements/traceability.md`, `evidence/implementation-issue-10-ai-evidence.md`, `evidence/human-review-issue-10.md`.
- AI assumptions: Reporter list is scoped to `reporter_user_id`, Technician list to `assigned_technician_id`, and Administrator/Facility Manager see all reports. Detail navigation remains out of scope until #11.
- Review result: Pass after focused test fix. Review kept report detail, comments, dashboard analytics, and deployment out of scope.
- Tests/checks run: `npx.cmd tsc --noEmit`; `npm.cmd test -- --run`.
- Evidence: First test run failed because the invalid-filter expectation omitted the standard API error `message`; fixed the test expectation. Final rerun after checkpoint passed typecheck and 7 files / 28 tests.
- Failures: None remaining.
- Decision: Accept Cycle 1 for PR #23 review and merge to `development`.

### Issue #11 - Build report detail with status history display

**Status:** Merged to `development`

**Branch:** `implementation/issue-11-report-detail-history`

**PR:** https://github.com/Jordyee/campus-service-project/pull/24

**Owner:** Main agent

**Blockers:** #8 and #9 completed and merged through PR #21 and PR #22.

**Source of Truth:**

- GitHub Issue #11
- `docs/planning/implementation-queue.md`
- `docs/requirements/traceability.md`
- `docs/design/02-database-api.md`
- `docs/design/03-ui.md`

**Cycle 1:**

- Build attempt: Added `GET /api/requests/{id}`, role-sensitive detail access, core report/assignment/comment/status-history response data, lifecycle order data, a same-page detail panel opened from report numbers, loading/error/not-found/forbidden UI messaging, and detail reset on role change.
- Files changed: `worker/requests.ts`, `worker/index.ts`, `public/index.html`, `tests/integration/request-detail-api.spec.ts`, `tests/unit/new-report-form.spec.ts`, `docs/ai-native/08-loop-log.md`, `docs/planning/implementation-queue.md`, `docs/requirements/traceability.md`, `evidence/implementation-issue-11-ai-evidence.md`, `evidence/human-review-issue-11.md`.
- AI assumptions: Comments/notes are read-only if already present because creating comments belongs to #12. Detail UI stays in the current static Worker asset because the repo has no React/Vite frontend build yet.
- Review result: Pass. Review kept add-comment, admin actions, technician actions, close/reopen, dashboard, and deployment out of scope.
- Tests/checks run: `npx.cmd tsc --noEmit`; `npm.cmd test -- --run`.
- Evidence: Focused detail test failed before implementation with route-level 404, then passed after adding API/UI support. Final run passed typecheck and 8 files / 31 tests.
- Failures: None remaining.
- Decision: Accept Cycle 1 for PR #24 review and merge to `development`.

### Issue #12 - Add append-only comments and notes

**Status:** Draft PR open; review/testing pass

**Branch:** `implementation/issue-12-comments-notes`

**PR:** https://github.com/Jordyee/campus-service-project/pull/25

**Owner:** Main agent

**Blockers:** #11 completed and merged through PR #24.

**Source of Truth:**

- GitHub Issue #12
- `docs/planning/implementation-queue.md`
- `docs/requirements/traceability.md`
- `docs/design/02-database-api.md`
- `docs/design/03-ui.md`

**Cycle 1:**

- Build attempt: Added `POST /api/requests/{id}/comments`, comment/note validation, append-only D1 writes, role/request access checks, detail timeline refresh after submission, UI comment/note form, and tests proving no edit/delete routes exist.
- Files changed: `worker/requests.ts`, `worker/index.ts`, `public/index.html`, `tests/integration/comments-api.spec.ts`, `tests/unit/new-report-form.spec.ts`, `docs/ai-native/08-loop-log.md`, `docs/planning/implementation-queue.md`, `docs/requirements/traceability.md`, `evidence/implementation-issue-12-ai-evidence.md`, `evidence/human-review-issue-12.md`.
- AI assumptions: Facility Manager remains read-only for comments because `UI-ACT-10` and the existing role/action map deny `ADD_COMMENT` to Facility Manager. Comment/note edit/delete, duplicate merge, private note policy, notifications, and deployment remain out of scope.
- Review result: Pass. Review kept comments append-only and did not add admin review, technician progress, duplicate merge, notifications, or deployment.
- Tests/checks run: `npx.cmd tsc --noEmit`; `npm.cmd test -- --run`.
- Evidence: Focused comments test failed before implementation with route-level 404, then passed after adding API/UI support. Final run passed typecheck and 9 files / 35 tests.
- Failures: None remaining.
- Decision: Accept Cycle 1 for PR #25 review and merge to `development`.

### Issue #13 - Add admin review, category, and priority flow

**Status:** Blocked by #12

**Branch:** `implementation/issue-13-admin-review-classification`

**PR:** Pending

**Owner:** Unassigned

### Issue #14 - Add technician assignment flow

**Status:** Blocked by #13

**Branch:** `implementation/issue-14-technician-assignment`

**PR:** Pending

**Owner:** Unassigned

### Issue #15 - Build technician task list and acceptance flow

**Status:** Blocked by #14

**Branch:** `implementation/issue-15-technician-tasks-acceptance`

**PR:** Pending

**Owner:** Unassigned

### Issue #16 - Add technician progress and resolved status flow

**Status:** Blocked by #15

**Branch:** `implementation/issue-16-technician-progress-resolved`

**PR:** Pending

**Owner:** Unassigned

### Issue #17 - Add admin close and reopen flow

**Status:** Blocked by #16

**Branch:** `implementation/issue-17-close-reopen`

**PR:** Pending

**Owner:** Unassigned

### Issue #18 - Build facility manager dashboard summary

**Status:** Blocked by #10 and #17

**Branch:** `implementation/issue-18-dashboard-summary`

**PR:** Pending

**Owner:** Unassigned

### Issue #19 - Add automated test coverage and implementation traceability updates

**Status:** Blocked by #9 through #18

**Branch:** `implementation/issue-19-tests-traceability`

**PR:** Pending

**Owner:** Unassigned

## 6. Fix Prompt Template

```text
We attempted issue #<number>, but verification failed.

Source of truth:
<issue goal + acceptance checks>

What changed:
<changed files or diff summary>

Review/test evidence:
<errors, failed checks, screenshots, or review findings>

Task:
Fix only the failing part. Do not rewrite unrelated code. Do not change issue scope. Explain root cause, files changed, and verification run.
```
