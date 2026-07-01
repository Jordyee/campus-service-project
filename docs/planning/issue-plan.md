# Issue Planning

## 1. Sources Read

- `AGENTS.md`
- `skills/jordy-workflows/github-workflow-jordy.md`
- `AI_Assisted_Campus_Service_Project.md`
- `README.md`
- `CASE.md`
- `skills/09-issue-planning/SKILL.md`
- `docs/requirements/03-specification.md`
- `docs/requirements/04-prioritization.md`
- `docs/requirements/05-validation-change.md`
- `docs/requirements/traceability.md`
- `docs/design/01-architecture.md`
- `docs/design/02-database-api.md`
- `docs/design/03-ui.md`
- `evidence/design-architecture-ai-evidence.md`
- `evidence/design-database-api-ai-evidence.md`
- `evidence/design-ui-ai-evidence.md`

## 2. Review Status and Boundary

Requirements, architecture design, database/API design, UI design, and Skill 09 are treated as approved and merged to `development` based on the latest student instruction and completed PR #7 for the Skill 09 refinement.

This planning stage created GitHub Issues and updated planning traceability only. It did not create source code, tests, migrations, backend/API implementation, React/TypeScript implementation, deployment config, or Cloudflare deployment.

## 3. Issue Planning Goals

- Create at least 10 small, ordered GitHub Issues.
- Keep every issue traceable to requirement IDs, user story / acceptance criteria IDs, and design IDs.
- Cover the approved workflow from report creation through dashboard.
- Keep CR-001, CR-002, and CR-003 visible in the relevant issues.
- Keep optional features out of scope.

## 4. Issue Sequence

| Order | Issue | Execution Mode | Title | Main Coverage |
|---:|---|---|---|---|
| 1 | [#8](https://github.com/Jordyee/campus-service-project/issues/8) | HITL | Implement app data model, role boundary, and lifecycle foundation | Foundation, simple role boundary, lifecycle/status history, shared API errors. |
| 2 | [#9](https://github.com/Jordyee/campus-service-project/issues/9) | AFK | Build reporter service request creation flow | Report creation and Submitted status. |
| 3 | [#10](https://github.com/Jordyee/campus-service-project/issues/10) | AFK | Build report list, search, and filters | Report list, practical search/filter, empty results. |
| 4 | [#11](https://github.com/Jordyee/campus-service-project/issues/11) | AFK | Build report detail with status history display | Detail view, lifecycle display, status history. |
| 5 | [#12](https://github.com/Jordyee/campus-service-project/issues/12) | AFK | Add append-only comments and notes | Comments/notes, CR-002 append-only behavior. |
| 6 | [#13](https://github.com/Jordyee/campus-service-project/issues/13) | AFK | Add admin review, category, and priority flow | Admin review, Under Review, category, priority. |
| 7 | [#14](https://github.com/Jordyee/campus-service-project/issues/14) | AFK | Add technician assignment flow | Technician assignment and Assigned status. |
| 8 | [#15](https://github.com/Jordyee/campus-service-project/issues/15) | AFK | Build technician task list and acceptance flow | Technician assigned task list and accept work. |
| 9 | [#16](https://github.com/Jordyee/campus-service-project/issues/16) | AFK | Add technician progress and resolved status flow | In Progress and Resolved workflow. |
| 10 | [#17](https://github.com/Jordyee/campus-service-project/issues/17) | AFK | Add admin close and reopen flow | Close, reopen to Under Review, CR-001. |
| 11 | [#18](https://github.com/Jordyee/campus-service-project/issues/18) | AFK | Build facility manager dashboard summary | Dashboard counts and recent reports. |
| 12 | [#19](https://github.com/Jordyee/campus-service-project/issues/19) | HITL | Add automated test coverage and implementation traceability updates | At least 20 automated tests and final code/test traceability after implementation. |

Execution mode meaning:

- AFK: can be implemented by an AI agent from approved requirements/design after listed dependencies are complete.
- HITL: requires human confirmation or review before the issue should be considered complete.

## 5. Dependency Notes

- #8 has no blocker and should be first.
- #9 depends on #8.
- #10 depends on #8 and #9.
- #11 depends on #8 and #9.
- #12 depends on #11.
- #13 depends on #12.
- #14 depends on #13.
- #15 depends on #14.
- #16 depends on #15.
- #17 depends on #16.
- #18 depends on #10 and #17.
- #19 depends on the feature issues #9 through #18.

## 6. Execution Mode Notes

| Issue | Mode | Reason |
|---|---|---|
| #8 | HITL | The simple role/session mechanism should be confirmed before foundation coding starts. |
| #9 to #18 | AFK | These can be implemented from approved requirements and design once dependencies are complete. |
| #19 | HITL | Final test coverage, traceability completeness, and implementation readiness need human review before closing the loop. |

## 7. Requirement-to-Issue Mapping

| Requirement Area | Issues |
|---|---|
| Report creation | #8, #9, #19 |
| Report list/search/filter | #10, #19 |
| Report detail and status history display | #11, #16, #17, #19 |
| Comments/notes append-only | #12, #13, #16, #19 |
| Admin review/category/priority | #13, #19 |
| Technician assignment | #14, #19 |
| Technician task/progress/resolved flow | #15, #16, #19 |
| Close/reopen flow | #17, #19 |
| Facility Manager dashboard | #18, #19 |
| Simple role boundary | #8, #10, #13, #14, #15, #16, #17, #18, #19 |
| Tests and traceability completion | #19 |

## 8. Design-to-Issue Mapping

| Design Area | Issues |
|---|---|
| Architecture foundation and role/action boundary | #8, #9 to #18 |
| Database entities and constraints | #8, #9 to #18 |
| API endpoints `API-01` to `API-14` | #9 to #18 |
| UI screens and actions `UI-01` to `UI-10`, `UI-ACT-*` | #9 to #18 |
| Traceability/evidence artifacts | #19 |

## 9. Traceability Update Notes

`docs/requirements/traceability.md` was updated with issue IDs in the Issue column for active functional and non-functional requirements.

Code and Test columns remain `Pending` because implementation and testing have not started.

## 10. Risks and Open Questions

| Risk / Question | Handling |
|---|---|
| Exact actor/session mechanism remains implementation-sensitive. | #8 keeps this as simple educational role boundary and does not add Google login. |
| Dashboard scope could expand. | #18 limits dashboard to counts by status/category/priority and recent reports. |
| Test count could drive fake scope. | #19 requires coverage without adding optional features. |
| Deployment is not part of planning. | No issue performs Cloudflare deployment; deployment remains later approved stage. |

## 11. Human Review Notes

Status: Reviewed by student in chat on 2026-07-01, with requested addition of execution mode to each issue.

Reviewer should confirm:

- issue granularity is acceptable;
- dependency order is workable;
- execution mode classification is acceptable;
- all required features are covered;
- CR-001, CR-002, and CR-003 are represented correctly;
- optional features remain out of scope;
- planning is ready to guide implementation branches.
