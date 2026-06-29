# Project Agent Rules

## Purpose

This file is the compact operating context for AI agents working on this repository. Read this first before scanning the whole project.

The project is a Software Engineering final project for a Campus Service Request and Maintenance System. The system lets campus users report facility issues, administrators review and assign requests, technicians update progress, and facility managers view summary dashboards.

## Sources Read

- `AI_Assisted_Campus_Service_Project.md`
- `README.md`
- `CASE.md`
- `skills/`
- `.github/`

The formal PRD, architecture plan, and issue breakdown are not written yet. Do not invent them. Build them through the requirements and design workflow.

## Source Of Truth

Use these files in this order when deciding project intent:

1. `AI_Assisted_Campus_Service_Project.md`
2. `CASE.md`
3. `README.md`
4. `docs/requirements/`
5. `docs/design/`
6. `docs/testing/`
7. `docs/deployment/`
8. `evidence/`
9. `skills/`

If a later reviewed document contradicts an earlier draft, prefer the reviewed document and note the contradiction.

## Current Case

Application: Campus Service Request and Maintenance System.

Confirmed actors:

- Pelapor / Reporter: creates reports, views status, adds comments, confirms results.
- Administrator: reviews reports, sets category and priority, assigns technicians, closes reports.
- Teknisi / Technician: views tasks, accepts work, updates progress, marks work resolved.
- Manajer Fasilitas / Facility Manager: views dashboard and summary reports.

Required workflow:

```text
Submitted -> Under Review -> Assigned -> In Progress -> Resolved -> Closed
```

Required features:

- Create a new report.
- View report list.
- Search and filter reports.
- View report detail.
- Review reports.
- Set priority.
- Assign technician.
- Update work status.
- Add comments or notes.
- Store status history.
- Close or reopen reports.
- Display a simple dashboard.

Not required unless explicitly approved:

- Upload photo.
- Email notification.
- Google login.
- Room QR code.
- AI categorization.
- Spare-part inventory.
- Vendor management.

## Minimum Deliverables

- 15 project skills under `skills/`.
- 12 functional requirements.
- 6 non-functional requirements.
- 5 business rules.
- 10 user stories.
- At least 2 acceptance criteria for every user story.
- 10 GitHub Issues.
- 6 Pull Requests.
- 20 automated tests.
- 1 change request.
- 1 public Cloudflare URL.
- Traceability from requirement to design, issue, code, and test.
- AI evidence: prompt/invocation, raw output, human review, final output.

## Stack

- Frontend: planned React with TypeScript.
- Backend: Cloudflare Worker.
- Database: Cloudflare D1.
- Tests: Vitest and Cloudflare Workers test tooling.
- Deployment: Cloudflare Workers.
- GitHub CLI is available and authenticated for this repository.

Known local command note:

- Prefer `npm.cmd` and `npx.cmd` on this Windows machine when PowerShell `npm` behaves oddly.

## Commands

- Install dependencies: `npm.cmd install`
- Run local worker: `npm.cmd run dev`
- Run tests: `npm.cmd test -- --run`
- Generate Cloudflare types: `npm.cmd run cf-typegen`
- Deploy later: `npm.cmd run deploy`

Do not deploy until the student explicitly approves deployment work.

## Git Workflow

Main branch rule:

- `main` is final-only.
- Do not commit directly to `main`.
- Do not merge into `main` unless the student says the work is finalized.

Development branch rule:

- `development` is the active integration branch.
- All normal work starts from `development`.
- Current branch should normally be `development` or a topic branch based on it.

Topic branch naming:

- Use `requirements/inception`
- Use `requirements/elicitation`
- Use `requirements/specification`
- Use `requirements/prioritization`
- Use `requirements/validation-change`
- Use `design/architecture`
- Use `design/database-api`
- Use `design/ui`
- Use `planning/issues`
- Use `implementation/<issue-id-or-feature>`
- Use `testing/<test-area>`
- Use `deployment/cloudflare`

Do not use branch names like `development/requirements` while a branch named `development` exists. Git treats branch names as paths internally, so that naming conflicts with `development`.

Worktree guidance:

- Use separate worktrees for long-running parallel work only when needed.
- Worktree folder names should be clear, for example `Final_SWE__requirements-inception` or `Final_SWE__design-architecture`.
- Before creating a worktree, check `git status --short --branch`.
- Never delete a worktree or branch without explicit student approval.

## Skills Workflow

Use project skills in order unless the student explicitly asks otherwise:

1. `skills/01-inception-stakeholder/SKILL.md`
2. `skills/02-elicitation/SKILL.md`
3. `skills/03-specification/SKILL.md`
4. `skills/04-prioritization/SKILL.md`
5. `skills/05-validation-change/SKILL.md`
6. `skills/06-architecture-design/SKILL.md`
7. `skills/07-database-api-design/SKILL.md`
8. `skills/08-ui-design/SKILL.md`
9. `skills/09-issue-planning/SKILL.md`
10. `skills/10-implementation/SKILL.md`
11. `skills/11-code-review/SKILL.md`
12. `skills/12-test-planning/SKILL.md`
13. `skills/13-automated-testing/SKILL.md`
14. `skills/14-acceptance-testing/SKILL.md`
15. `skills/15-deployment/SKILL.md`

Custom student workflow skills live under `skills/jordy-workflows/`.

## Documentation Rules

- Do not rely on chat memory when a project file exists.
- Update the relevant document before moving to the next stage.
- Put requirements artifacts in `docs/requirements/`.
- Put design artifacts in `docs/design/`.
- Put test artifacts in `docs/testing/`.
- Put deployment artifacts in `docs/deployment/`.
- Put AI evidence and human review notes in `evidence/`.
- Keep traceability current once `docs/requirements/traceability.md` exists.

## Evidence Rules

- AI may draft, compare, and revise.
- The student remains responsible for final decisions.
- Separate confirmed facts, assumptions, open questions, AI output, and human review.
- Do not turn an assumption into a requirement.
- Do not add features outside the assignment scope without explicit student approval.

## Coding Rules

- Keep changes scoped to the active branch and active stage.
- Do not refactor unrelated files.
- Prefer simple Cloudflare Workers + D1 implementation that satisfies the requirements.
- Add tests in proportion to risk.
- Run relevant tests before saying work is done.
- Do not commit secrets, Cloudflare tokens, `.env`, `.dev.vars`, or credentials.

## Ask First When

Ask the student before:

- Changing project scope.
- Touching `main`.
- Creating, deleting, or merging branches.
- Creating or deleting worktrees.
- Adding paid services or non-free Cloudflare features.
- Deploying to Cloudflare.
- Adding optional features listed as not required.
- Choosing authentication, role policy, retention policy, notification behavior, or measurable NFR targets.
- Rewriting large parts of the architecture or repo structure.

## Current Status

- GitHub repo exists: `Jordyee/campus-service-project`.
- `main` contains finalized setup up to initial Cloudflare worker app and adapted first 5 requirement skills.
- `development` is the branch for ongoing work.
- Cloudflare login has succeeded previously.
- Cloudflare setup exists but final deployment should happen later.
- Requirements documents have not been authored yet.

## Next Recommended Work

Start with Skill 01 and create:

- `docs/requirements/01-inception-stakeholder.md`

Then review it with the student before continuing to elicitation.

