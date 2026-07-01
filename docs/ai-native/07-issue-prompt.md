# Issue Prompt Pack

## 1. Purpose

This file is the reusable prompt source for engineering loops. It does not replace GitHub Issues. For each loop, copy the template below and fill it with the assigned issue's GitHub body, branch name, blockers, and verification steps.

## 2. Sources Read

- `AGENTS.md`
- `docs/planning/issue-plan.md`
- `docs/planning/implementation-queue.md`
- `docs/planning/sub-agent-protocol.md`
- `docs/requirements/traceability.md`
- `docs/design/01-architecture.md`
- `docs/design/02-database-api.md`
- `docs/design/03-ui.md`
- GitHub Issues #8 to #19 in `Jordyee/campus-service-project`

## 3. Standard Implementation Prompt

```text
Use run-the-loop for one implementation issue.
Also use ponytail to keep the implementation minimal and scoped.
Use tdd or rtk-tdd if this issue changes non-trivial logic or tests are the clearest proof.

Assigned issue:
- GitHub Issue: #<number> - <title>
- Branch: implementation/issue-<number>-<short-name>
- PR target: development
- Blocked by: <issue list or none>

Read first:
- AGENTS.md
- docs/planning/implementation-queue.md
- docs/planning/sub-agent-protocol.md
- docs/planning/issue-plan.md
- docs/requirements/traceability.md
- docs/design/01-architecture.md
- docs/design/02-database-api.md
- docs/design/03-ui.md
- GitHub Issue #<number>

Source of truth:
- Goal: <copy from issue What to build>
- Requirement/design references: <copy from issue>
- Acceptance checks: <copy from issue>
- Testing notes: <copy from issue>
- Out of scope: <copy from issue>

Rules:
- Work only on this issue.
- Do not implement another issue's scope.
- Do not add optional features.
- Do not deploy.
- Do not touch main.
- Do not create/delete worktrees unless explicitly approved.
- Stop and report if a blocker is incomplete or a scope/auth/policy decision is needed.

Build:
- Inspect the existing code before editing.
- Reuse existing patterns.
- Prefer the smallest working change.
- Add tests proportional to risk and acceptance checks.
- Keep status transitions and role checks backend-controlled.
- Keep comments/notes append-only.

Verify:
- Run `npm.cmd test -- --run` when relevant.
- Record any manual checks if UI behavior cannot be fully automated yet.
- Update traceability only with real code/test references.

Deliver:
- Code/tests/docs for this issue only.
- Updated loop log entry in `docs/ai-native/08-loop-log.md`.
- Commit, push, and draft PR.
- Final report:
  - branch
  - PR URL
  - files changed
  - tests run
  - acceptance checks pass/fail
  - assumptions
  - blockers
  - skills used
```

## 4. First Issue Prompt: #8 Foundation

Use this after the student confirms the simple role/session mechanism.

```text
Use run-the-loop for one implementation issue.
Also use ponytail to keep the implementation minimal and scoped.
Use tdd or rtk-tdd for lifecycle transition, enum validation, and role/action checks.

Assigned issue:
- GitHub Issue: #8 - Implement app data model, role boundary, and lifecycle foundation
- Branch: implementation/issue-8-foundation
- PR target: development
- Blocked by: none, but HITL confirmation is required for simple role/session mechanism

Read first:
- AGENTS.md
- docs/planning/implementation-queue.md
- docs/planning/sub-agent-protocol.md
- docs/planning/issue-plan.md
- docs/requirements/traceability.md
- docs/design/01-architecture.md
- docs/design/02-database-api.md
- docs/design/03-ui.md
- GitHub Issue #8

Source of truth:
- Create D1 data model, simple educational actor/role context, shared API response/error handling, lifecycle status constants, and a backend-controlled status history write path.
- Core tables only: app_users, service_requests, request_comments, request_status_history.
- Support Reporter, Administrator, Technician, and Facility Manager without Google login or paid identity service.
- Validate lifecycle transitions and write request_status_history through one consistent path.
- Support shared API success/error shape for validation, forbidden, not found, invalid transition, assignment conflict, and internal errors.
- Do not add optional-feature tables, endpoints, UI, or services.

Testing:
- Add unit tests for enum validation, role/action checks, and allowed status transitions.
- Add integration checks for local D1 schema when practical.
- Do not deploy.

Stop if:
- The simple role/session mechanism is not confirmed.
- The implementation would require production auth, Google login, paid service, optional features, or deployment.
```
