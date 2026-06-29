# AI Evidence - Requirements Specification

## Prompt / Invocation

User requested Requirements stage, third part: Specification, for the Campus Service Request and Maintenance System.

Required workflow:

- Read `AGENTS.md`.
- Follow `skills/jordy-workflows/github-workflow-jordy.md`.
- Do not work directly on `main` or `development`.
- Create branch/worktree `requirements/specification` from `development`.
- Verify `docs/requirements/01-inception-stakeholder.md` and `docs/requirements/02-elicitation.md` exist in the base branch.
- Read `skills/03-specification/SKILL.md`.
- Read required case, repository, requirement, and evidence sources.
- Use approved Inception and Elicitation status.
- Use `INT-001` in `docs/requirements/02-elicitation.md` as student decision evidence.
- Create `docs/requirements/03-specification.md`.
- Create or update `docs/requirements/traceability.md`.
- Create AI evidence for the Specification stage in `evidence/`.
- Do not create architecture design, database/API design, UI design, GitHub issues, tests, code, deployment, or mandatory optional features.

## Sources Used

- `AGENTS.md`
- `skills/jordy-workflows/github-workflow-jordy.md`
- `AI_Assisted_Campus_Service_Project.md`
- `README.md`
- `CASE.md`
- `skills/03-specification/SKILL.md`
- `docs/requirements/01-inception-stakeholder.md`
- `docs/requirements/02-elicitation.md`
- `evidence/requirements-inception-ai-evidence.md`
- `evidence/requirements-elicitation-ai-evidence.md`

## AI Raw Output

The AI-generated draft output for this stage is stored in:

- `docs/requirements/03-specification.md`
- `docs/requirements/traceability.md`

The draft includes:

- 15 functional requirements (`FR-001` to `FR-015`);
- 7 non-functional requirements (`NFR-001` to `NFR-007`);
- 8 business rules (`BR-001` to `BR-008`);
- 11 user stories (`US-001` to `US-011`);
- 22 acceptance criteria (`AC-001` to `AC-022`);
- 7 deferred requirement topics (`DR-001` to `DR-007`);
- initial traceability from requirements to user stories, acceptance criteria, business rules, and evidence.

## AI Handling Notes

AI used confirmed case facts, approved assumptions from Skill 01, and `INT-001` from Skill 02 as the allowed evidence baseline. AI labeled remaining details as open or deferred instead of turning them into final requirements.

AI did not create design, database/API design, UI design, issues, tests, code, or deployment work.

## Human Review

Status: Pending student review.

Reviewer should check:

- whether all requirements match the approved project scope;
- whether `INT-001` was used correctly as student decision evidence;
- whether every user story has at least two acceptance criteria;
- whether optional topics remain deferred and not mandatory;
- whether the traceability file is sufficient for the next requirements stages;
- whether this branch can later be merged into `development` after review.

## Final Output

Status: Draft completed for Skill 03, pending student review.

Final notes:

- Work was performed on branch `requirements/specification`.
- `development` and `main` were not modified directly.
- No optional feature was added to required scope.
- No design, issue, test, code, or deployment artifact was created.
