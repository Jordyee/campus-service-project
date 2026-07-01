# AI Evidence - UI Design

## Prompt / Invocation

User approved PR #5 for `skills/08-ui-design/SKILL.md` and asked the AI assistant to continue to the UI Design stage for the Campus Service Request and Maintenance System.

Required workflow:

- Merge approved PR #5 for Skill 08 refinement into `development`.
- Start from `development`.
- Create branch `design/ui`.
- Read `AGENTS.md`.
- Follow `skills/jordy-workflows/github-workflow-jordy.md`.
- Use `skills/08-ui-design/SKILL.md`.
- Read required case, repository, requirements, traceability, architecture, database/API, and evidence sources.
- Create `docs/design/03-ui.md`.
- Update `docs/requirements/traceability.md` if relevant.
- Create `evidence/design-ui-ai-evidence.md`.
- Do not work directly on `main`.
- Do not deploy.
- Do not create GitHub issues, tests, React/TypeScript implementation, backend/API implementation, migration files, migration execution, or deployment.
- Keep UI work at design level: screen list, navigation flow, role-based views, form fields, table/list behavior, empty/error/loading states, UI action permissions, textual wireframes, and requirement-to-UI mapping.

## Sources Used

- `AGENTS.md`
- `skills/jordy-workflows/github-workflow-jordy.md`
- `AI_Assisted_Campus_Service_Project.md`
- `README.md`
- `CASE.md`
- `skills/08-ui-design/SKILL.md`
- `docs/requirements/03-specification.md`
- `docs/requirements/04-prioritization.md`
- `docs/requirements/05-validation-change.md`
- `docs/requirements/traceability.md`
- `docs/design/01-architecture.md`
- `docs/design/02-database-api.md`
- `evidence/design-architecture-ai-evidence.md`
- `evidence/design-database-api-ai-evidence.md`

## AI Raw Output

The AI-generated draft output for this stage is stored in:

- `docs/design/03-ui.md`
- `docs/requirements/traceability.md`

The draft includes:

- role-based entry points;
- navigation flows for Reporter, Administrator, Technician, and Facility Manager;
- screen catalog with `UI-*` IDs;
- form definitions and validation behavior;
- list, table, search, and filter behavior;
- report detail, status history, comments/notes, and lifecycle display behavior;
- UI action permissions with `UI-ACT-*` IDs;
- loading, empty, error, success, forbidden, invalid transition, and not found states;
- textual wireframes;
- requirement-to-UI mapping;
- traceability updates with UI design IDs.

## AI Handling Notes

AI used approved requirements, approved architecture, approved database/API design, and approved change requests as the baseline:

- `CR-001`: reopened reports return to `Under Review` and history records reason/context;
- `CR-002`: comments/notes are append-only and visible to authorized users who can view the report;
- `CR-003`: simple educational role boundary is approved while Google login remains deferred.

AI made these UI design choices:

- Use a simple role-aware app shell without choosing a production authentication/session mechanism.
- Keep Reporter, Administrator, Technician, and Facility Manager navigation separate and clear.
- Use one shared report detail screen with role-specific action panels.
- Present lifecycle status as `Submitted -> Under Review -> Assigned -> In Progress -> Resolved -> Closed`.
- Use append-only comment/note and status history timelines on the report detail screen.
- Keep Facility Manager dashboard limited to counts by status, category, priority, and recent reports.
- Record visual style only as lightweight direction, not final visual design.

AI noted one source-status mismatch:

- Some existing database/API evidence text still says human review was pending, but the latest student instruction states that Database/API Design was approved and PR #4 was merged to `development`.
- The UI design uses the latest student status as the working baseline and records the mismatch in `docs/design/03-ui.md`.

AI did not add optional features as mandatory scope. Deferred topics stayed deferred:

- upload photo;
- email notification;
- Google login;
- room QR code;
- AI categorization;
- spare-part inventory;
- vendor management.

AI did not create GitHub issues, tests, React/TypeScript source code, backend/API implementation, migration files, migration execution, deployment config, or Cloudflare deployment.

## Human Review

Status: Pending student review.

Review checklist:

- Confirm each actor flow is understandable from role entry to task completion.
- Confirm the lifecycle is visible and accurate, including reopen to `Under Review`.
- Confirm comments/notes are append-only and visible to authorized report viewers.
- Confirm role-specific actions match the simple educational role boundary.
- Confirm form fields and list/detail behavior match requirements and database/API design.
- Confirm the dashboard remains simple and does not become advanced analytics.
- Confirm no optional feature became required UI scope.
- Confirm the document is ready to become input for issue planning and implementation.

## Final Output

Status: Drafted for Skill 08 and awaiting student review.

Final notes:

- Work was performed on branch `design/ui`.
- `main` was not modified.
- No deployment was performed.
- No GitHub issues, tests, implementation code, migration execution, or deployment artifact was created.
- `docs/requirements/traceability.md` was updated with UI design mappings only; issue, code, and test references remain pending.
