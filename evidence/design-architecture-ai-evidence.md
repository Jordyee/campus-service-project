# AI Evidence - Architecture Design

## Prompt / Invocation

User requested Design stage, first part: Architecture Design, for the Campus Service Request and Maintenance System.

Required workflow:

- Read `AGENTS.md`.
- Follow `skills/jordy-workflows/github-workflow-jordy.md`.
- Do not work directly on `main`.
- Do not deploy.
- Create branch `design/architecture` from `development`.
- Read and use `skills/06-architecture-design/SKILL.md`.
- Read required case, repository, requirements, traceability, and evidence sources.
- Use approved Requirements Inception, Elicitation, Specification, Prioritization, and Validation/Change status.
- Create `docs/design/01-architecture.md`.
- Update `docs/requirements/traceability.md` if relevant.
- Create AI evidence for the Architecture Design stage in `evidence/`.
- Do not create database/API design detail, UI design or wireframes, GitHub issues, tests, code, or deployment.
- Keep architecture at component, responsibility, high-level data flow, architecture decision, risk, open-question, and requirement-to-architecture mapping level.

## Sources Used

- `AGENTS.md`
- `skills/jordy-workflows/github-workflow-jordy.md`
- `AI_Assisted_Campus_Service_Project.md`
- `README.md`
- `CASE.md`
- `skills/06-architecture-design/SKILL.md`
- `docs/requirements/03-specification.md`
- `docs/requirements/04-prioritization.md`
- `docs/requirements/05-validation-change.md`
- `docs/requirements/traceability.md`
- `evidence/requirements-specification-ai-evidence.md`
- `evidence/requirements-prioritization-ai-evidence.md`
- `evidence/requirements-validation-change-ai-evidence.md`

## AI Raw Output

The AI-generated draft output for this stage is stored in:

- `docs/design/01-architecture.md`
- `docs/requirements/traceability.md`

The draft includes:

- architecture goals and drivers;
- system context;
- high-level architecture components `ARCH-COMP-*`;
- high-level data flows `ARCH-FLOW-*`;
- architecture decisions `ARCH-DEC-*`;
- risks, constraints, and open design questions;
- requirement-to-architecture mapping;
- traceability updates for architecture-level design IDs.

## AI Handling Notes

AI used approved requirements and approved change requests as the baseline:

- `CR-001`: reopened reports return to `Under Review` and history records reason/context;
- `CR-002`: comments/notes are append-only and visible to authorized users who can view the report;
- `CR-003`: simple educational role boundary is approved while Google login remains deferred.

AI did not add optional features as mandatory scope. Deferred topics stayed deferred:

- upload photo;
- email notification;
- Google login;
- room QR code;
- AI categorization;
- spare-part inventory;
- vendor management.

AI did not create database schema, API route details, UI screens, wireframes, GitHub issues, tests, code, deployment config, or Cloudflare deployment.

## Human Review

Status: Approved by student in chat.

Review checklist:

- Confirm the architecture is simple enough for the class project.
- Confirm all approved requirement areas are represented at architecture level.
- Confirm no optional feature became required architecture scope.
- Confirm open design questions should be carried into later design stages.
- Confirm the document is ready to become input for Skill 07 Database/API Design.

Review outcome:

- Student approved the Architecture Design stage in chat.
- Student asked the AI assistant to continue so the work is documented in GitHub.
- No optional feature was promoted into mandatory scope.
- No database/API detail, UI design, issues, tests, code, or deployment work was added.

## Final Output

Status: Completed for Skill 06 and approved by student review.

Final notes:

- Work was performed on branch `design/architecture`.
- `main` was not modified.
- No deployment was performed.
- No database/API detail, UI design, issue planning, tests, code, or deployment artifact was created.
- `docs/requirements/traceability.md` was updated with architecture-level design mappings only; issue, code, and test references remain pending.
