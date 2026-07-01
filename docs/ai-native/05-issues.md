# AI-Native Issue Source Map

## 1. Purpose

This file adapts the generic AI-native loop artifact `05-issues.md` to this repository. It does not create new issues. The source issue plan remains `docs/planning/issue-plan.md` and GitHub Issues #8 to #19.

## 2. Sources Read

- `AGENTS.md`
- `docs/planning/issue-plan.md`
- `docs/planning/implementation-queue.md`
- GitHub Issues #8 to #19 in `Jordyee/campus-service-project`

## 3. Canonical Issue Sources

| Source | Purpose |
|---|---|
| `docs/planning/issue-plan.md` | Approved issue order, dependencies, execution mode, traceability mapping. |
| GitHub Issues #8 to #19 | Detailed issue bodies, acceptance checks, testing notes, dependencies, out-of-scope boundaries. |
| `docs/planning/implementation-queue.md` | Active execution queue, branch names, owner lock table, PR readiness state. |

## 4. Issue Queue Summary

| Order | Issue | Mode | Branch | Blocked By |
|---:|---|---|---|---|
| 1 | #8 Foundation data model, role boundary, lifecycle | HITL | `implementation/issue-8-foundation` | None |
| 2 | #9 Reporter request creation | AFK | `implementation/issue-9-create-report` | #8 |
| 3 | #10 Report list, search, filters | AFK | `implementation/issue-10-report-list-filters` | #8, #9 |
| 4 | #11 Report detail and status history | AFK | `implementation/issue-11-report-detail-history` | #8, #9 |
| 5 | #12 Append-only comments and notes | AFK | `implementation/issue-12-comments-notes` | #11 |
| 6 | #13 Admin review, category, priority | AFK | `implementation/issue-13-admin-review-classification` | #12 |
| 7 | #14 Technician assignment | AFK | `implementation/issue-14-technician-assignment` | #13 |
| 8 | #15 Technician task list and acceptance | AFK | `implementation/issue-15-technician-tasks-acceptance` | #14 |
| 9 | #16 Technician progress and resolved | AFK | `implementation/issue-16-technician-progress-resolved` | #15 |
| 10 | #17 Admin close and reopen | AFK | `implementation/issue-17-close-reopen` | #16 |
| 11 | #18 Facility manager dashboard | AFK | `implementation/issue-18-dashboard-summary` | #10, #17 |
| 12 | #19 Tests and traceability | HITL | `implementation/issue-19-tests-traceability` | #9 to #18 |

## 5. Loop Rule

Every implementation issue must be handled as one loop unit:

```text
issue -> focused prompt -> build -> review -> test -> fix -> decision
```

Multiple issues may be prepared in the queue, but each sub-agent executes only one issue at a time.
