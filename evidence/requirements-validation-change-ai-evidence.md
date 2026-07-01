# AI Evidence - Requirements Validation and Change

## Prompt / Invocation

User requested Requirements stage, fifth part: Validation dan Change, for the Campus Service Request and Maintenance System.

Required workflow:

- Read `AGENTS.md`.
- Follow `skills/jordy-workflows/github-workflow-jordy.md`.
- Do not work directly on `main`.
- Do not deploy.
- Create branch/worktree `requirements/validation-change` from `development`.
- Read `skills/05-validation-change/SKILL.md`.
- Read required case, repository, requirements, traceability, and evidence sources.
- Use approved Inception, Elicitation, Specification, and Prioritization status.
- Create `docs/requirements/05-validation-change.md`.
- Update `docs/requirements/traceability.md` if relevant.
- Create AI evidence for the Validation and Change stage in `evidence/`.
- Do not create architecture design, database/API design, UI design, GitHub issues, tests, code, deployment, or mandatory optional features.
- Keep change requests proposed until student approval.
- After student approval, update affected baseline requirements before moving to design.

## Sources Used

- `AGENTS.md`
- `skills/jordy-workflows/github-workflow-jordy.md`
- `AI_Assisted_Campus_Service_Project.md`
- `README.md`
- `CASE.md`
- `skills/05-validation-change/SKILL.md`
- `docs/requirements/01-inception-stakeholder.md`
- `docs/requirements/02-elicitation.md`
- `docs/requirements/03-specification.md`
- `docs/requirements/04-prioritization.md`
- `docs/requirements/traceability.md`
- `evidence/requirements-inception-ai-evidence.md`
- `evidence/requirements-elicitation-ai-evidence.md`
- `evidence/requirements-specification-ai-evidence.md`
- `evidence/requirements-prioritization-ai-evidence.md`

## AI Raw Output

The AI-generated draft output for this stage is stored in:

- `docs/requirements/05-validation-change.md`
- `docs/requirements/traceability.md`

The draft includes:

- validation inventory for approved FR, NFR, BR, US, AC, priorities, deferred topics, and open details;
- validation matrix using `VAL-*` IDs;
- readiness and testability risks;
- traceability and consistency findings;
- change requests `CR-001`, `CR-002`, and `CR-003`;
- impact analysis and pending student decisions.

## AI Handling Notes

AI validated the approved requirements baseline without changing approved requirement text. AI treated `DR-*` items as deferred and `OQD-*` items as open details instead of silently answering them.

AI created change request candidates and then, after student approval, updated the affected baseline requirements:

- `CR-001`: clarify reopen target status;
- `CR-002`: clarify comments/notes visibility;
- `CR-003`: clarify simple role/auth boundary.

AI did not add optional features as mandatory scope and did not create design, database/API design, UI design, issues, tests, code, or deployment work.

## Human Review

Status: Approved by student on 2026-06-30.

Review outcome:

- Student approved the validation/change artifact.
- Student approved `CR-001`, `CR-002`, and `CR-003`.
- Affected baseline requirements were updated in `docs/requirements/03-specification.md`.
- Numeric NFR targets and retention/deletion/archive policy remain pending/deferred unless requested later.
- No optional feature was promoted into mandatory scope.

## Final Output

Status: Completed for Skill 05 and approved by student review.

Final notes:

- Work was performed on branch `requirements/validation-change`.
- `main` was not modified.
- No deployment was performed.
- No design, issue, test, code, or deployment artifact was created.
- `CR-001`, `CR-002`, and `CR-003` are approved clarifications.
- Numeric NFR targets and retention/deletion/archive policy remain pending/deferred unless requested later.
