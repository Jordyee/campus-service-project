# Implementation Issue #12 AI Evidence

## Issue

- GitHub Issue: #12 - Add append-only comments and notes
- Branch: `implementation/issue-12-comments-notes`
- PR: https://github.com/Jordyee/campus-service-project/pull/25
- Date: 2026-07-02

## Sources Read

- `AGENTS.md`
- `docs/planning/issue-plan.md`
- `docs/planning/implementation-queue.md`
- `docs/planning/sub-agent-protocol.md`
- `docs/ai-native/05-issues.md`
- `docs/ai-native/07-issue-prompt.md`
- `docs/ai-native/08-loop-log.md`
- `docs/requirements/traceability.md`
- `docs/design/01-architecture.md`
- `docs/design/02-database-api.md`
- `docs/design/03-ui.md`
- GitHub Issue #12
- Code merged from Issues #8 through #11

## Prompt / Invocation

Continuous engineering queue advanced to Issue #12 after Issue #11 was merged to `development`.

Task: implement append-only comment/note creation for authorized viewers, make saved entries visible in detail chronology, and avoid edit/delete/private-note/duplicate-merge scope.

## Raw AI Output Summary

- Added `POST /api/requests/{id}/comments`.
- Added required body and comment type validation.
- Added append-only `request_comments` inserts.
- Added role/request access checks for adding comments.
- Added comment/note form to the detail UI.
- Added detail refresh after comment submission.
- Added integration tests for success, validation, unauthorized action, and absence of edit/delete routes.

## Review Notes

- Facility Manager remains read-only for comments because existing role/action rules and UI permissions deny `ADD_COMMENT`.
- No edit/delete route, duplicate merge, notification, private note policy, or deployment was added.

## Verification

```powershell
npx.cmd vitest tests/integration/comments-api.spec.ts --run
npx.cmd vitest tests/integration/comments-api.spec.ts tests/integration/request-detail-api.spec.ts tests/unit/new-report-form.spec.ts --run
npx.cmd tsc --noEmit
npm.cmd test -- --run
```

Final result:

```text
TypeScript check passed
9 test files passed
35 tests passed
```
