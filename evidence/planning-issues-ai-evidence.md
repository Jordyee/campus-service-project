# Planning Issues AI Evidence

## 1. Prompt / Invocation

User approved the Skill 09 refinement and asked the AI assistant to continue the Planning / GitHub Issues stage for the Campus Service Request and Maintenance System.

Required workflow:

- Merge approved PR #7 for Skill 09 refinement into `development`.
- Start from `development`.
- Create branch `planning/issues`.
- Read `AGENTS.md`.
- Follow `skills/jordy-workflows/github-workflow-jordy.md`.
- Use `skills/09-issue-planning/SKILL.md`.
- Read the approved requirements, design, traceability, and design evidence files.
- Create at least 10 GitHub Issues directly in `Jordyee/campus-service-project`.
- Update `docs/requirements/traceability.md` with issue IDs.
- Create planning evidence.
- Do not create implementation code, tests, migrations, backend/API implementation, React/TypeScript implementation, or deployment.
- Do not add optional features.

## 2. Sources Used

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

## 3. AI Draft Output

AI drafted a 12-issue sequence covering the approved scope from foundation to dashboard:

1. Foundation for D1 data model, simple role boundary, lifecycle/status history, and shared API errors.
2. Reporter service request creation.
3. Report list/search/filter.
4. Report detail with status history.
5. Append-only comments/notes.
6. Admin review/category/priority.
7. Technician assignment.
8. Technician task list and acceptance.
9. Technician progress and resolved status.
10. Admin close/reopen.
11. Facility Manager dashboard.
12. Automated test coverage and final implementation traceability update.

AI then created the GitHub Issues directly in the repository:

| Issue | Title | URL |
|---|---|---|
| #8 | Implement app data model, role boundary, and lifecycle foundation | https://github.com/Jordyee/campus-service-project/issues/8 |
| #9 | Build reporter service request creation flow | https://github.com/Jordyee/campus-service-project/issues/9 |
| #10 | Build report list, search, and filters | https://github.com/Jordyee/campus-service-project/issues/10 |
| #11 | Build report detail with status history display | https://github.com/Jordyee/campus-service-project/issues/11 |
| #12 | Add append-only comments and notes | https://github.com/Jordyee/campus-service-project/issues/12 |
| #13 | Add admin review, category, and priority flow | https://github.com/Jordyee/campus-service-project/issues/13 |
| #14 | Add technician assignment flow | https://github.com/Jordyee/campus-service-project/issues/14 |
| #15 | Build technician task list and acceptance flow | https://github.com/Jordyee/campus-service-project/issues/15 |
| #16 | Add technician progress and resolved status flow | https://github.com/Jordyee/campus-service-project/issues/16 |
| #17 | Add admin close and reopen flow | https://github.com/Jordyee/campus-service-project/issues/17 |
| #18 | Build facility manager dashboard summary | https://github.com/Jordyee/campus-service-project/issues/18 |
| #19 | Add automated test coverage and implementation traceability updates | https://github.com/Jordyee/campus-service-project/issues/19 |

## 4. Human Review Status

Status: Pending student review.

The student should review:

- whether the issue sequence and dependencies are correct;
- whether issue scope is small enough for implementation branches;
- whether every issue has acceptance checks and testing notes;
- whether every required feature is covered;
- whether optional features remain out of scope;
- whether traceability updates are accurate.

## 5. AI Handling Notes

AI used approved requirements and approved design as the baseline:

- `CR-001`: reopened reports return to `Under Review` and history records reason/context.
- `CR-002`: comments/notes are append-only and visible to authorized users who can view the report.
- `CR-003`: simple educational role boundary is approved while Google login remains deferred.

AI created 12 issues instead of the minimum 10 to avoid overly large tickets and to keep testing/traceability completion visible.

AI did not add optional features as mandatory scope. Deferred topics stayed deferred:

- upload photo;
- email notification;
- Google login;
- room QR code;
- AI categorization;
- spare-part inventory;
- vendor management.

AI did not create source code, tests, migrations, backend/API implementation, React/TypeScript implementation, deployment config, or Cloudflare deployment.

## 6. Final Output

Status: Completed for Skill 09 and ready for student review.

Final artifacts:

- GitHub Issues #8 to #19 created in `Jordyee/campus-service-project`.
- `docs/requirements/traceability.md` updated with issue IDs.
- `docs/planning/issue-plan.md` created as a concise issue sequence and mapping summary.
- `evidence/planning-issues-ai-evidence.md` created.

Final notes:

- Work was performed on branch `planning/issues`.
- `main` was not modified.
- No deployment was performed.
- No implementation code, tests, migrations, backend/API implementation, React/TypeScript implementation, or Cloudflare deployment artifact was created.
