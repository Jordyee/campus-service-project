# AI Evidence - Database and API Design

## Prompt / Invocation

User approved the refined Skill 07 workflow and asked the AI assistant to continue with best practice for the Campus Service Request and Maintenance System.

Required workflow:

- Merge approved PR #3 for Skill 07 refinement into `development`.
- Start from `development`.
- Create branch `design/database-api`.
- Read `AGENTS.md`.
- Follow `skills/jordy-workflows/github-workflow-jordy.md`.
- Use `skills/07-database-api-design/SKILL.md`.
- Read required case, repository, requirements, traceability, architecture, and evidence sources.
- Create `docs/design/02-database-api.md`.
- Update `docs/requirements/traceability.md` if relevant.
- Create `evidence/design-database-api-ai-evidence.md`.
- Do not work directly on `main`.
- Do not deploy.
- Do not create UI design, wireframes, GitHub issues, tests, implementation code, migration files to execute, API implementation, migration execution, or deployment.

## Sources Used

- `AGENTS.md`
- `skills/jordy-workflows/github-workflow-jordy.md`
- `AI_Assisted_Campus_Service_Project.md`
- `README.md`
- `CASE.md`
- `skills/07-database-api-design/SKILL.md`
- `docs/requirements/03-specification.md`
- `docs/requirements/04-prioritization.md`
- `docs/requirements/05-validation-change.md`
- `docs/requirements/traceability.md`
- `docs/design/01-architecture.md`
- `evidence/design-architecture-ai-evidence.md`

## AI Raw Output

The AI-generated draft output for this stage is stored in:

- `docs/design/02-database-api.md`
- `docs/requirements/traceability.md`

The draft includes:

- database goals;
- entity overview with `DB-*` IDs;
- table design for `app_users`, `service_requests`, `request_comments`, and `request_status_history`;
- relationship and constraint notes;
- D1 migration draft as design text only;
- API goals and actor context assumption;
- endpoint catalog with `API-*` IDs;
- request/response examples;
- validation and error states;
- requirement-to-database/API mapping;
- traceability update notes;
- risks, constraints, and open design questions.

## AI Handling Notes

AI used approved requirements, approved architecture, and approved change requests as the baseline:

- `CR-001`: reopened reports return to `Under Review` and history records reason/context;
- `CR-002`: comments/notes are append-only and visible to authorized users who can view the report;
- `CR-003`: simple educational role boundary is approved while Google login remains deferred.

AI made these design choices:

- Use four core tables to keep the schema simple.
- Store current assignment on `service_requests` instead of adding assignment history because reassign/reject is not separate initial scope.
- Store comments/notes and status history as append-only records.
- Derive dashboard summaries from `service_requests` instead of storing duplicated summary rows.
- Use actor context as a design-level assumption without choosing a production auth/session mechanism.

AI did not add optional features as mandatory scope. Deferred topics stayed deferred:

- upload photo;
- email notification;
- Google login;
- room QR code;
- AI categorization;
- spare-part inventory;
- vendor management.

AI did not create UI design, wireframes, GitHub issues, tests, source code, migration files, migration execution, deployment config, or Cloudflare deployment.

## Human Review

Status: Pending student review.

Review checklist:

- Confirm the database design is simple enough for the class project.
- Confirm the endpoint catalog supports all approved required features.
- Confirm the actor context assumption is acceptable for design while exact auth/session remains open.
- Confirm no optional feature became required database/API scope.
- Confirm the D1 migration draft remains design text only until implementation is approved.
- Confirm the document is ready to become input for later UI design, issue planning, and implementation.

## Final Output

Status: Drafted for Skill 07 and awaiting student review.

Final notes:

- Work was performed on branch `design/database-api`.
- `main` was not modified.
- No deployment was performed.
- No UI design, GitHub issues, tests, implementation code, migration execution, or deployment artifact was created.
- `docs/requirements/traceability.md` was updated with database/API design mappings only; issue, code, and test references remain pending.
