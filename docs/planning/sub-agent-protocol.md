# Sub-Agent Engineering Protocol

## 1. Purpose

This protocol tells the main agent and sub-agents how to work on implementation issues without branch conflict, duplicated work, or scope drift.

## 2. Roles

Main agent:

- Owns the implementation queue.
- Assigns one issue to one sub-agent.
- Checks blockers before assignment.
- Prevents two agents from working on the same issue.
- Reviews PRs before any merge decision.
- Updates queue, loop log, evidence, and traceability status.
- Takes over only when a sub-agent is blocked, off-scope, or repeatedly failing the loop.
- Cuts off any sub-agent issue loop after 3 cycles and escalates instead of allowing token-heavy retries.

Sub-agent:

- Works on one assigned issue only.
- Uses the assigned branch only.
- Runs the engineering loop for that issue.
- Pushes branch and opens a draft PR when complete.
- Reports evidence and blockers.
- Does not merge PRs.
- Does not touch `main`.
- Does not run more than 3 loop cycles for one issue.

## 3. Required Sub-Agent Start Prompt

```text
You are assigned one issue only: GitHub Issue #<number>.

Read first:
- AGENTS.md
- docs/planning/implementation-queue.md
- docs/planning/issue-plan.md
- docs/planning/sub-agent-protocol.md
- docs/requirements/traceability.md
- docs/design/01-architecture.md
- docs/design/02-database-api.md
- docs/design/03-ui.md
- GitHub Issue #<number>

Use relevant skills:
- skills/10-implementation/SKILL.md
- run-the-loop
- ponytail
- tdd or rtk-tdd if tests drive the issue
- skills/13-automated-testing/SKILL.md when adding tests

Rules:
- Work only on issue #<number>.
- Use branch: implementation/issue-<number>-<short-name>.
- Do not work on blocked issues.
- Do not implement other issue scope.
- Do not add optional features.
- Do not deploy.
- Do not touch main.
- If blocked, report blocker instead of guessing.
- Stop after 3 failed loop cycles and report evidence, root cause hypothesis, and next recommended action.

Deliver:
- Code/tests/docs needed for this issue only.
- Updated loop log entry.
- Updated traceability/evidence only when real code/test references exist.
- Commit, push, and draft PR.
- Final report with files changed, tests run, acceptance checks, assumptions, blockers, and PR URL.
```

## 4. Branch Workflow

Run before starting:

```powershell
git status --short --branch
git checkout development
git pull
git checkout -b implementation/issue-<number>-<short-name>
```

If using a worktree for parallel sub-agent work, main agent must get explicit student approval first because project rules require approval before creating worktrees.

## 5. Commit and PR Workflow

After implementation and checks:

```powershell
git status --short
npm.cmd test -- --run
git add <changed-files>
git commit -m "Implement issue #<number>: <short title>"
git push -u origin implementation/issue-<number>-<short-name>
gh pr create --draft --base development --head implementation/issue-<number>-<short-name> --title "Implement issue #<number>: <short title>" --body-file <pr-body-file>
```

Use `.github/pull_request_template.md` when creating the PR body.

## 6. Sub-Agent Report Format

Use concise status reports. Caveman style is allowed for internal reports.

```text
Issue:
Branch:
PR:
Status: pass / needs fix / blocked
Files changed:
Tests run:
Acceptance checks:
Assumptions:
Blockers:
Out-of-scope avoided:
Skills used:
```

## 7. Main-Agent Review Checklist

- [ ] PR branch matches assigned issue.
- [ ] PR targets `development`, not `main`.
- [ ] Issue link is present.
- [ ] Scope matches acceptance checks.
- [ ] No unrelated issue is implemented.
- [ ] No optional feature is added.
- [ ] Tests run or a clear reason is documented.
- [ ] Role/action boundary is respected.
- [ ] Lifecycle/status history rules are respected.
- [ ] Traceability/evidence are updated when appropriate.
- [ ] Human review decision is recorded.

## 8. Blocker Handling

Sub-agent stops and reports if:

- The issue has reached 3 loop cycles without passing review and testing.
- Acceptance criteria are unclear.
- Required blocker issue is incomplete.
- Branch already exists with unrelated work.
- Another active agent is touching the same issue or same critical files.
- Implementation requires a scope decision.
- Implementation requires deployment, paid service, optional feature, auth policy, retention policy, or NFR target decision.

Main agent may then:

- clarify with the student;
- reassign after blocker is removed;
- split the issue;
- take over diagnosis;
- reject the PR and request a smaller fix.
- stop the continuous queue if the blocker is fatal to later implementation.

## 9. Merge Policy

- Sub-agents do not merge.
- Main agent does not merge to `main`.
- Main agent may merge to `development` after review and passing tests/checks.
- Final merge to `main` requires explicit student finalization approval.

## 10. Continuous Queue Policy

- Main agent may continue from one accepted issue to the next unblocked issue.
- Main agent must not continue past a failed, blocked, or fatal issue.
- Main agent must not spend more than 3 cycles on one issue before cutting the loop and reporting.
- Main agent should prefer diagnosis over repeated prompting after the third failed cycle.
