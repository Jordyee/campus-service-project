# AI Evidence - Requirements Prioritization

## Prompt / Invocation

User requested Requirements stage, fourth part: Prioritization, for the Campus Service Request and Maintenance System.

Required workflow:

- Read `AGENTS.md`.
- Follow `skills/jordy-workflows/github-workflow-jordy.md`.
- Do not work directly on `main`.
- Do not deploy.
- Create branch/worktree `requirements/prioritization` from `development`.
- Read `skills/04-prioritization/SKILL.md`.
- Read required case, repository, requirements, traceability, and evidence sources.
- Use approved Inception, Elicitation, and Specification status.
- Create `docs/requirements/04-prioritization.md`.
- Update `docs/requirements/traceability.md` if relevant.
- Create AI evidence for the Prioritization stage in `evidence/`.
- Do not create architecture design, database/API design, UI design, GitHub issues, tests, code, deployment, or mandatory optional features.

## Sources Used

- `AGENTS.md`
- `skills/jordy-workflows/github-workflow-jordy.md`
- `AI_Assisted_Campus_Service_Project.md`
- `README.md`
- `CASE.md`
- `skills/04-prioritization/SKILL.md`
- `docs/requirements/01-inception-stakeholder.md`
- `docs/requirements/02-elicitation.md`
- `docs/requirements/03-specification.md`
- `docs/requirements/traceability.md`
- `evidence/requirements-inception-ai-evidence.md`
- `evidence/requirements-elicitation-ai-evidence.md`
- `evidence/requirements-specification-ai-evidence.md`

## AI Raw Output

The AI-generated draft output for this stage is stored in:

- `docs/requirements/04-prioritization.md`
- `docs/requirements/traceability.md`

The draft includes:

- MoSCoW priority for approved functional requirements, non-functional requirements, business rules, and user stories;
- value and risk/readiness classification;
- MVP scope boundary;
- deferred topic handling for `DR-001` to `DR-007`;
- priority conflict notes and student decisions needed;
- traceability update for prioritization status.

## AI Handling Notes

AI treated approved baseline requirements from `docs/requirements/03-specification.md` as the prioritization inventory. AI did not create new requirements or promote deferred optional topics into required scope.

AI used `Must` for approved baseline requirements because they represent assignment/case-required scope. AI used value and risk/readiness to distinguish planning concern without changing requirement scope.

AI did not create design, database/API design, UI design, issues, tests, code, or deployment work.

## Human Review

Status: Approved by student on 2026-06-30.

Review outcome:

- Student approved the Prioritization stage in chat.
- Student allowed commit, push, and merge to `development`.
- Approved baseline requirements remain `Must`.
- Deferred topics remain correctly marked `Won't for now`.
- No design, implementation, issue, test, or deployment decision was added.

## Final Output

Status: Completed for Skill 04 and approved for merge to `development`.

Final notes:

- Work was performed on branch `requirements/prioritization`.
- `main` was not modified.
- Merge to `development` was approved by the student.
- No optional feature was added to required scope.
- No design, issue, test, code, or deployment artifact was created.
