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

**Status:** Not started

**Branch:** `implementation/issue-8-foundation`

**PR:** Pending

**Owner:** Unassigned

**Blockers:** Student confirmation required for simple role/session mechanism.

**Source of Truth:**

- GitHub Issue #8
- `docs/planning/implementation-queue.md`
- `docs/ai-native/07-issue-prompt.md`

**Cycle 1:**

- Build attempt:
- Files changed:
- AI assumptions:
- Review result:
- Tests/checks run:
- Evidence:
- Failures:
- Decision:

### Issue #9 - Build reporter service request creation flow

**Status:** Blocked by #8

**Branch:** `implementation/issue-9-create-report`

**PR:** Pending

**Owner:** Unassigned

### Issue #10 - Build report list, search, and filters

**Status:** Blocked by #8 and #9

**Branch:** `implementation/issue-10-report-list-filters`

**PR:** Pending

**Owner:** Unassigned

### Issue #11 - Build report detail with status history display

**Status:** Blocked by #8 and #9

**Branch:** `implementation/issue-11-report-detail-history`

**PR:** Pending

**Owner:** Unassigned

### Issue #12 - Add append-only comments and notes

**Status:** Blocked by #11

**Branch:** `implementation/issue-12-comments-notes`

**PR:** Pending

**Owner:** Unassigned

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
