# Inception dan Stakeholder

## 1. Sources Read

| ID | Source | Notes |
|---|---|---|
| SRC-01 | `AI_Assisted_Campus_Service_Project.md` | Main assignment, case description, required learning sequence, required deliverables, non-required features, Cloudflare/D1 constraints, and AI evidence expectations. |
| SRC-02 | `CASE.md` | Compact case summary, actors, workflow, and core feature list. |
| SRC-03 | `README.md` | Repository purpose, planned stack, repository structure, and current project status. |
| SRC-04 | `AGENTS.md` | Project agent rules, source-of-truth order, branch rules, evidence rules, and stage boundaries. |
| SRC-05 | `skills/01-inception-stakeholder/SKILL.md` | Inception-specific process and required output structure. |
| SRC-06 | `skills/jordy-workflows/github-workflow-jordy.md` | GitHub workflow for branch, review, and merge discipline. |

## 2. Evidence Summary

### Confirmed Case Facts

| ID | Evidence | Source |
|---|---|---|
| FACT-01 | The project is a Software Engineering final project using a Campus Service Request and Maintenance System case. | SRC-01, SRC-02, SRC-03 |
| FACT-02 | The application is used by students or lecturers to report campus facility problems such as broken projectors, internet issues, AC issues, damaged chairs, lab equipment issues, or dirty rooms. | SRC-01, SRC-02 |
| FACT-03 | The confirmed actors are Reporter/Pelapor, Administrator, Technician/Teknisi, and Facility Manager/Manajer Fasilitas. | SRC-01, SRC-02, SRC-04 |
| FACT-04 | The confirmed workflow is `Submitted -> Under Review -> Assigned -> In Progress -> Resolved -> Closed`. | SRC-01, SRC-02, SRC-04 |
| FACT-05 | The case lists core capability areas: creating reports, viewing report lists and details, searching/filtering reports, reviewing reports, setting priority, assigning technicians, updating work status, adding comments/notes, storing status history, closing/reopening reports, and displaying a simple dashboard. | SRC-01, SRC-02, SRC-04 |
| FACT-06 | Upload photo, email notification, Google login, room QR code, AI categorization, spare-part inventory, and vendor management are not required unless explicitly approved. | SRC-01, SRC-04 |
| FACT-07 | The planned stack is React with TypeScript, Cloudflare Worker, Cloudflare D1, Vitest, and Cloudflare Workers deployment. | SRC-03, SRC-04 |
| FACT-08 | The project must show process evidence, including AI output, human review, testing, traceability, and deployment evidence. | SRC-01, SRC-04 |
| FACT-09 | The repository is currently before authored requirements documents; this stage should start with inception and stakeholder discovery. | SRC-04 |

### Assumptions

| ID | Assumption | Rationale | Needs Review |
|---|---|---|---|
| ASM-01 | "Students or lecturers" can be grouped under the Reporter/Pelapor actor for early stakeholder discovery. | SRC-01 and SRC-02 describe them as application users who report problems, while the actor table names the role as Reporter/Pelapor. | Yes |
| ASM-02 | The course instructor or reviewer is an external project stakeholder because the assignment requires reviewable evidence and GitHub/Cloudflare deliverables. | The assignment defines grading artifacts and review expectations, but does not list the instructor as a system actor. | Yes |
| ASM-03 | A system maintainer/developer role exists for project operation and deployment work. | The assignment requires repository, deployment, tests, and evidence, but does not define this as an application actor. | Yes |
| ASM-04 | The dashboard is intended to support summary visibility for facility management, not detailed analytics at this stage. | The case says "simple dashboard" and "summary reports"; no advanced analytics scope is confirmed. | Yes |

### Open Question Index

Open questions are listed in section 11 and use `OQ-*` IDs. They must be answered or explicitly deferred before later requirements stages turn them into requirement details.

## 3. Problem Statement

Campus facility problems such as broken classroom equipment, internet issues, AC problems, damaged furniture, lab equipment issues, and dirty rooms need a clear reporting and follow-up process. The case confirms that reports should move from submission through review, assignment, technician progress, resolution, and closure.

The initial problem is not only data entry. The system needs to help different campus roles share one visible request lifecycle: reporters need to submit and track issues, administrators need to review and coordinate work, technicians need to update progress, and facility managers need summary visibility. At this inception stage, this is a problem framing only, not a final requirements specification.

## 4. Initial Objectives

| ID | Objective | Evidence Type | Source |
|---|---|---|---|
| OBJ-01 | Establish a shared starting understanding of the campus service request problem and the confirmed system actors. | Confirmed case fact | SRC-01, SRC-02 |
| OBJ-02 | Identify the initial request lifecycle from submitted report to closed report. | Confirmed case fact | SRC-01, SRC-02 |
| OBJ-03 | Separate confirmed scope from assumptions, open questions, and deferred optional features. | Derived need | SRC-01, SRC-04, SRC-05 |
| OBJ-04 | Prepare a reviewed inception artifact that can guide later elicitation without prematurely creating requirements, user stories, priorities, design, issues, tests, or code. | Derived need | SRC-04, SRC-05 |
| OBJ-05 | Keep project evidence and human review visible so later work can be traced back to source documents and decisions. | Confirmed case fact | SRC-01, SRC-04 |

## 5. Stakeholder Discovery

| Stakeholder | Type | Interest / Concern | Early Need | Evidence | Uncertainty |
|---|---|---|---|---|---|
| Reporter / Pelapor | Confirmed system actor | Wants campus facility problems to be reported, tracked, discussed, and confirmed after resolution. | Needs a way to create reports, view status, add comments, and confirm results. | SRC-01, SRC-02, SRC-04 | Whether Reporter includes both students and lecturers under one permission model remains open. See OQ-01. |
| Administrator | Confirmed system actor | Coordinates report review and operational assignment. | Needs a way to review reports, set category/priority, assign technicians, close reports, and reopen reports when needed. | SRC-01, SRC-02, SRC-04 | Exact administrator authority and reopening rules remain open. See OQ-02 and OQ-06. |
| Technician / Teknisi | Confirmed system actor | Needs clear assigned work and a way to communicate progress. | Needs to view tasks, accept assignments, update progress, and mark work resolved. | SRC-01, SRC-02, SRC-04 | Whether technicians can reject tasks, reassign work, or request more information remains open. See OQ-03. |
| Facility Manager / Manajer Fasilitas | Confirmed system actor | Needs summary visibility into facility service activity. | Needs a simple dashboard and summary reports. | SRC-01, SRC-02, SRC-04 | Exact dashboard measures and report periods remain open. See OQ-04. |
| Course Instructor / Reviewer | Assumed external stakeholder | Evaluates process quality, evidence, traceability, and final delivery. | Needs reviewable documentation, GitHub history, AI evidence, tests, and Cloudflare deployment evidence. | ASM-02 based on SRC-01 | Role is not a system actor and should not become application scope without approval. |
| Student Developer / Maintainer | Assumed project stakeholder | Builds, tests, documents, and deploys the project without losing traceability or adding hidden scope. | Needs clear stage boundaries, branch discipline, and documented decisions. | ASM-03 based on SRC-01, SRC-03, SRC-04 | Operational responsibilities after grading are not defined. |

## 6. Preliminary Scope

This scope is preliminary. It records case-confirmed capability areas for later elicitation and specification. It does not define final functional requirements.

### Case-Confirmed Capability Areas

| Area | Evidence | Notes |
|---|---|---|
| New report creation | SRC-01, SRC-02, SRC-04 | Reporter-facing capability area. |
| Report list and report detail visibility | SRC-01, SRC-02, SRC-04 | Supports tracking and coordination. |
| Search and filtering | SRC-01, SRC-02, SRC-04 | Later elicitation must define fields and filters. |
| Report review | SRC-01, SRC-02, SRC-04 | Administrator-facing capability area. |
| Category and priority handling | SRC-01, SRC-02, SRC-04 | Details are not final at inception. |
| Technician assignment | SRC-01, SRC-02, SRC-04 | Assignment rules remain open. |
| Work status updates | SRC-01, SRC-02, SRC-04 | Must align with the confirmed lifecycle. |
| Comments or notes | SRC-01, SRC-02, SRC-04 | Audience, visibility, and edit rules remain open. |
| Status history | SRC-01, SRC-02, SRC-04 | History detail level remains open. |
| Close or reopen reports | SRC-01, SRC-02, SRC-04 | Reopen authority and conditions remain open. |
| Simple dashboard | SRC-01, SRC-02, SRC-04 | Metrics remain open. |

### Lifecycle Boundary

The confirmed baseline lifecycle is:

```text
Submitted -> Under Review -> Assigned -> In Progress -> Resolved -> Closed
```

The assignment allows additional statuses only if later explained in requirements and business rules. No additional status is approved at this stage.

## 7. Out of Scope / Deferred

The following topics are not required unless explicitly approved later:

| Topic | Status | Evidence | Notes |
|---|---|---|---|
| Upload photo | Deferred / not required | SRC-01, SRC-04 | The assignment notes object storage may require additional service activation. |
| Email notification | Deferred / not required | SRC-01, SRC-04 | No notification requirement is confirmed. |
| Google login | Deferred / not required | SRC-01, SRC-04 | Authentication choice remains an ask-first decision. |
| Room QR code | Deferred / not required | SRC-01, SRC-04 | Not part of required case scope. |
| AI categorization | Deferred / not required | SRC-01, SRC-04 | AI is required for project process, not as an application feature. |
| Spare-part inventory | Deferred / not required | SRC-01, SRC-04 | Not part of required case scope. |
| Vendor management | Deferred / not required | SRC-01, SRC-04 | Not part of required case scope. |

## 8. Constraints

| ID | Constraint | Evidence |
|---|---|---|
| CON-01 | Work must follow the requirements/design/planning/implementation/testing/deployment sequence and not jump directly to the full application. | SRC-01, SRC-04, SRC-05 |
| CON-02 | This stage must not produce final functional requirements, non-functional requirements, business rules, user stories, priorities, design, issues, tests, or code. | SRC-05 |
| CON-03 | Normal work must not be done directly on `main`; this stage uses topic branch `requirements/inception`. | SRC-04, SRC-06 |
| CON-04 | The planned implementation stack is React with TypeScript, Cloudflare Worker, Cloudflare D1, Vitest, and Cloudflare Workers. | SRC-03, SRC-04 |
| CON-05 | Deployment must use Cloudflare without paid services unless explicitly approved. | SRC-01, SRC-04 |
| CON-06 | AI output must be reviewed by a human; AI must not make final decisions. | SRC-01, SRC-04 |
| CON-07 | Evidence, assumptions, open questions, and final artifacts must remain separated. | SRC-01, SRC-04, SRC-05 |
| CON-08 | Optional features listed as not required must not be silently added to mandatory scope. | SRC-01, SRC-04, SRC-05 |

## 9. Quality Concerns

These are early quality concerns for later discussion. They are not final non-functional requirements.

| ID | Concern | Evidence Type | Notes |
|---|---|---|---|
| QC-01 | Traceability must be maintained from requirement through design, issue, code, and test once those artifacts exist. | Confirmed assignment concern | SRC-01, SRC-04 |
| QC-02 | The app should remain simple enough for the required Cloudflare Workers and D1 stack. | Derived need | Based on SRC-01, SRC-03, SRC-04 |
| QC-03 | Role-specific workflows must be clear enough that reporters, administrators, technicians, and facility managers do not confuse responsibilities. | Derived need | Based on confirmed actors in SRC-01 and SRC-02 |
| QC-04 | Status changes and history need enough reliability to support coordination and review. | Derived need | Based on confirmed workflow and status history capability area |
| QC-05 | Evidence and human review must be understandable for grading and later project handoff. | Confirmed assignment concern | SRC-01, SRC-04 |

## 10. Risks

| ID | Risk | Source / Basis | Mitigation Direction |
|---|---|---|---|
| RISK-01 | Scope creep from optional features could make the project too large for the assignment timeline. | SRC-01, SRC-04 | Keep optional topics deferred unless explicitly approved. |
| RISK-02 | Turning assumptions into requirements too early could produce incorrect requirements. | SRC-04, SRC-05 | Keep `ASM-*` and `OQ-*` visible until human review or elicitation resolves them. |
| RISK-03 | Role and permission decisions are not yet defined. | OQ-01, OQ-02, OQ-03 | Ask during elicitation before specification. |
| RISK-04 | Dashboard expectations may become too broad if metrics are not constrained. | ASM-04, OQ-04 | Define simple dashboard measures later. |
| RISK-05 | Workflow edge cases such as reopening, cancellation, duplicate reports, or rejected assignments are not yet defined. | OQ-05, OQ-06, OQ-07 | Capture as open questions for later requirements work. |
| RISK-06 | AI-generated artifacts could be accepted without adequate review. | SRC-01, SRC-04 | Keep human review notes and evidence explicit. |

## 11. Open Questions

| ID | Question | Why It Matters | Suggested Review Stage |
|---|---|---|---|
| OQ-01 | Are students and lecturers treated identically as Reporter/Pelapor, or do they need different data fields or permissions? | Affects actor model and report creation details. | Elicitation |
| OQ-02 | What exact actions can an Administrator perform, and are there multiple administrator levels? | Affects authority for review, assignment, close, and reopen actions. | Elicitation |
| OQ-03 | Can a Technician reject, return, or request clarification on an assigned task? | Affects workflow edge cases. | Elicitation |
| OQ-04 | What summary information should the Facility Manager dashboard show? | Affects dashboard scope without defining design yet. | Elicitation / Specification |
| OQ-05 | Are duplicate reports allowed, merged, or rejected? | Affects reporting workflow and data rules. | Elicitation |
| OQ-06 | Who can reopen a closed or resolved report, and under what condition? | Affects lifecycle and authority. | Elicitation / Specification |
| OQ-07 | Are additional statuses beyond the confirmed lifecycle needed? | The assignment allows more statuses only if justified later. | Specification |
| OQ-08 | What report fields are required at creation time? | Affects later functional requirements and validation. | Elicitation |
| OQ-09 | What categories and priority levels should be available? | Affects review and prioritization behavior. | Elicitation |
| OQ-10 | What human review evidence is expected for each requirements artifact? | Affects evidence completeness for grading. | Validation / Change |

## 12. Human Review Notes

### AI Draft Review Needed

Reviewer should check:

- Whether the problem statement matches the campus service request case.
- Whether all confirmed actors are represented correctly.
- Whether `ASM-*` entries are acceptable assumptions or should be removed.
- Whether `OQ-*` entries cover the biggest unknowns before elicitation.
- Whether optional features remain deferred and are not treated as mandatory scope.
- Whether this document avoids final requirements, user stories, priorities, design, issues, tests, and code.

### Current Review Status

| Item | Status | Notes |
|---|---|---|
| Human review by student | Approved on 2026-06-30 | Student approved the baseline decisions before completing elicitation readiness. |
| Scope approval | Approved | Optional features remain deferred. |
| Assumption approval | Approved for baseline | `ASM-*` entries are accepted as baseline assumptions unless later evidence changes them. |
| Open question review | Completed for Skill 02 | `OQ-*` entries were carried into `docs/requirements/02-elicitation.md` and answered by student decision evidence. |
