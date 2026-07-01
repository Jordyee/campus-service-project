# Implementation Queue

## 1. Purpose

This file is the execution control board for engineering loop work. It does not replace `docs/planning/issue-plan.md` or GitHub Issues. It turns the approved issue plan into a branch-safe, PR-based implementation queue.

Main rule:

```text
One issue -> one owner -> one branch -> one PR -> one engineering loop
```

## 2. Sources Read

- `AGENTS.md`
- `skills/jordy-workflows/github-workflow-jordy.md`
- `skills/10-implementation/SKILL.md`
- `skills/11-code-review/SKILL.md`
- `skills/13-automated-testing/SKILL.md`
- `docs/planning/issue-plan.md`
- `docs/requirements/traceability.md`
- `docs/design/01-architecture.md`
- GitHub Issues #8 to #19 in `Jordyee/campus-service-project`

## 3. Queue Rules

- Start from `development`.
- Do not touch `main`.
- Do not create a branch, worktree, commit, push, deploy, merge, or delete a branch/worktree without the required project approval.
- Each sub-agent may own only one issue at a time.
- Each issue may have only one owner at a time.
- Each issue must use a unique branch named `implementation/issue-<number>-<short-name>`.
- A sub-agent must not work on an issue while any listed blocker is incomplete.
- A sub-agent must not silently implement another issue's blocker.
- Every implementation branch must end in a PR for main-agent review.
- Every PR must document issue, scope, files changed, tests run, AI skills used, AI mistakes found, human review status, and evidence.
- Main agent may merge a PR into `development` after review and testing pass.
- Main agent must not merge into `main`.
- Each issue loop is limited to 3 cycles. If an issue is still failing after 3 cycles, stop that issue loop and escalate instead of spending more tokens.
- If the blocker/failure is fatal to the full implementation queue, stop the continuous queue and report to the student.
- Deployment remains out of scope until the student explicitly approves deployment work.

## 4. Skill Policy

Default skills for implementation work:

| Work Type | Required / Recommended Skill |
|---|---|
| Every implementation issue | `skills/10-implementation/SKILL.md`, `run-the-loop`, `ponytail` |
| Test-first or test-heavy issue | `tdd` or `rtk-tdd`, then `skills/13-automated-testing/SKILL.md` |
| Issue readiness, blockers, queue state | `triage` or `rtk-triage` |
| PR review | `skills/11-code-review/SKILL.md`, `review-the-code` |
| Acceptance/manual checks | `skills/14-acceptance-testing/SKILL.md`, `test-the-app` |
| Short sub-agent status reports | `caveman` style allowed for internal reports only |

Optional skill creation:

- Allowed only when a repeated workflow appears across multiple issues.
- Do not create a custom skill for a one-off task.
- Useful candidates, if repetition appears later:
  - Cloudflare D1 CRUD implementation loop.
  - Campus service request lifecycle/status-history workflow.
  - PR evidence and traceability checklist.

## 5. Branch and PR Naming

| Issue | Branch | Draft PR Title |
|---|---|---|
| #8 | `implementation/issue-8-foundation` | `Implement issue #8 foundation data model and lifecycle` |
| #9 | `implementation/issue-9-create-report` | `Implement issue #9 reporter request creation` |
| #10 | `implementation/issue-10-report-list-filters` | `Implement issue #10 report list search and filters` |
| #11 | `implementation/issue-11-report-detail-history` | `Implement issue #11 report detail and status history` |
| #12 | `implementation/issue-12-comments-notes` | `Implement issue #12 append-only comments and notes` |
| #13 | `implementation/issue-13-admin-review-classification` | `Implement issue #13 admin review and classification` |
| #14 | `implementation/issue-14-technician-assignment` | `Implement issue #14 technician assignment` |
| #15 | `implementation/issue-15-technician-tasks-acceptance` | `Implement issue #15 technician task acceptance` |
| #16 | `implementation/issue-16-technician-progress-resolved` | `Implement issue #16 technician progress and resolved flow` |
| #17 | `implementation/issue-17-close-reopen` | `Implement issue #17 admin close and reopen` |
| #18 | `implementation/issue-18-dashboard-summary` | `Implement issue #18 facility manager dashboard` |
| #19 | `implementation/issue-19-tests-traceability` | `Implement issue #19 test coverage and traceability` |

## 6. Execution Queue

| Order | Issue | Mode | Status | Blocked By | Owner | Branch | PR | Main-Agent Decision |
|---:|---|---|---|---|---|---|---|---|
| 1 | #8 Foundation data model, role boundary, lifecycle | HITL | Merged to `development` | None | Main agent | `implementation/issue-8-foundation` | [#21](https://github.com/Jordyee/campus-service-project/pull/21) | Pass / merged |
| 2 | #9 Reporter request creation | AFK | Merged to `development` | #8 complete | Main agent | `implementation/issue-9-create-report` | [#22](https://github.com/Jordyee/campus-service-project/pull/22) | Pass / merged |
| 3 | #10 Report list, search, filters | AFK | Merged to `development` | #8 and #9 complete | Main agent | `implementation/issue-10-report-list-filters` | [#23](https://github.com/Jordyee/campus-service-project/pull/23) | Pass / merged |
| 4 | #11 Report detail and status history | AFK | Merged to `development` | #8 and #9 complete | Main agent | `implementation/issue-11-report-detail-history` | [#24](https://github.com/Jordyee/campus-service-project/pull/24) | Pass / merged |
| 5 | #12 Append-only comments and notes | AFK | Merged to `development` | #11 complete | Main agent | `implementation/issue-12-comments-notes` | [#25](https://github.com/Jordyee/campus-service-project/pull/25) | Pass / merged |
| 6 | #13 Admin review, category, priority | AFK | Merged to `development` | #12 complete | Main agent | `implementation/issue-13-admin-review-classification` | [PR #26](https://github.com/Jordyee/campus-service-project/pull/26) | Pass / merged |
| 7 | #14 Technician assignment | AFK | Merged to `development` | #13 complete | Main agent | `implementation/issue-14-technician-assignment` | [PR #27](https://github.com/Jordyee/campus-service-project/pull/27) | Pass / merged |
| 8 | #15 Technician task list and acceptance | AFK | Merged to `development` | #14 complete | Main agent | `implementation/issue-15-technician-tasks-acceptance` | [PR #28](https://github.com/Jordyee/campus-service-project/pull/28) | Pass / merged |
| 9 | #16 Technician progress and resolved | AFK | Merged to `development` | #15 complete | Main agent | `implementation/issue-16-technician-progress-resolved` | [PR #29](https://github.com/Jordyee/campus-service-project/pull/29) | Pass / merged |
| 10 | #17 Admin close and reopen | AFK | Implementation complete; tests pass; PR pending | #16 complete | Main agent | `implementation/issue-17-close-reopen` | Pending | Pass / pending PR |
| 11 | #18 Facility manager dashboard | AFK | Blocked | #10, #17 | Unassigned | `implementation/issue-18-dashboard-summary` | Pending | Pending |
| 12 | #19 Tests and implementation traceability | HITL | Blocked | #9, #10, #11, #12, #13, #14, #15, #16, #17, #18 | Unassigned | `implementation/issue-19-tests-traceability` | Pending | Pending |

## 7. Parallelization Policy

Safe default:

```text
#8 and #9 should be serial.
After foundation is stable, parallel work is allowed only when branches do not touch the same files and blockers are complete.
```

Likely serial path:

- #8 -> #9
- #13 -> #14 -> #15 -> #16 -> #17

Potential parallel candidates after their blockers are complete:

- #10 and #11 after #9.
- #12 after #11, while #10 continues only if file conflict risk is low.
- #18 after #10 and #17.
- #19 after all feature issues.

Main agent must pause parallel assignment when two issues are likely to edit the same module, route table, migration, shared type, or UI shell.

## 8. Readiness Checklist Before Assigning a Sub-Agent

- [ ] Issue is open and not already owned.
- [ ] All blockers are complete or explicitly approved as no longer blocking.
- [ ] Branch name is unique.
- [ ] Source files likely touched by this issue do not conflict with another active issue.
- [ ] Acceptance checks are clear.
- [ ] Required skill set is named.
- [ ] Verification command is known, usually `npm.cmd test -- --run`.
- [ ] No deployment, optional feature, or `main` change is included.

## 9. Completion Checklist Before Main-Agent Review

- [ ] Sub-agent pushed the issue branch.
- [ ] Draft PR exists.
- [ ] PR links the GitHub issue.
- [ ] PR lists files changed and scope boundaries.
- [ ] Tests or manual checks are recorded.
- [ ] Loop log entry is updated.
- [ ] Traceability update is included when code/test references exist.
- [ ] No unrelated issue was implemented.
- [ ] No optional feature was added.

## 10. Confirmation Needed Before First Loop

Issue #8 is HITL. The student approved the simple role/session mechanism on 2026-07-01.

Approved minimal option:

```text
Use seeded/simple app_users records and a development-friendly role selector/header-based actor context. No Google login, no paid identity service.
```

This keeps `CR-003` satisfied without adding production authentication scope.

## 11. Continuous Queue Stop Policy

The student approved continuous queue mode on 2026-07-01 with these limits:

- Continue from one completed issue to the next unblocked issue without requiring a new prompt.
- A completed issue means: implementation done, tests/checks pass, draft PR created, main-agent review passes, and PR may be merged to `development`.
- Do not continue an issue beyond 3 engineering loop cycles.
- After 3 failed cycles, stop that issue loop, preserve evidence, and notify the student.
- If the issue failure blocks later issues but is not fatal, pause the queue at that blocker.
- If the issue failure is fatal to the architecture, data model, branch history, or project scope, stop the continuous queue entirely and notify the student.
- Never deploy or merge to `main` during continuous queue mode.
