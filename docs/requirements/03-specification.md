# Requirements Specification

## 1. Sources Read

| ID | Source | Notes |
|---|---|---|
| SRC-01 | `AGENTS.md` | Project rules, source-of-truth order, stage boundaries, branch rules, ask-first decisions, and evidence rules. |
| SRC-02 | `skills/jordy-workflows/github-workflow-jordy.md` | Branch, worktree, review, merge, and quality-check workflow. |
| SRC-03 | `AI_Assisted_Campus_Service_Project.md` | Main assignment, case description, required workflow, required features, optional features, deliverables, and AI evidence expectations. |
| SRC-04 | `README.md` | Repository purpose, planned stack, repository structure, and current project status. |
| SRC-05 | `CASE.md` | Compact case summary, actors, core workflow, and required feature list. |
| SRC-06 | `skills/03-specification/SKILL.md` | Specification process, output structure, ID rules, evidence rules, and quality checks. |
| SRC-07 | `docs/requirements/01-inception-stakeholder.md` | Approved stakeholder discovery, confirmed facts, assumptions, open questions, constraints, and risks. |
| SRC-08 | `docs/requirements/02-elicitation.md` | Approved elicitation guide, decision log, readiness criteria, and `INT-001` student decision evidence. |
| SRC-09 | `evidence/requirements-inception-ai-evidence.md` | AI evidence and human review status for Skill 01. |
| SRC-10 | `evidence/requirements-elicitation-ai-evidence.md` | AI evidence and human review status for Skill 02. |

## 2. Review Status and Boundary

This document is limited to Requirements Specification for the Campus Service Request and Maintenance System. It converts approved inception and elicitation evidence into functional requirements, non-functional requirements, business rules, user stories, acceptance criteria, deferred topics, and initial traceability.

This document does not create architecture design, database design, API design, UI design, GitHub issues, tests, code, or deployment changes.

### Review Baseline

| Item | Status | Evidence |
|---|---|---|
| Inception artifact | Approved | SRC-07, SRC-09 |
| Elicitation artifact | Approved | SRC-08, SRC-10 |
| Student decision evidence | Approved | `INT-001` in SRC-08 |
| Optional feature boundary | Confirmed deferred unless explicitly approved | SRC-03, SRC-07, SRC-08 |
| Specification readiness | Ready | RC-01 to RC-08 in SRC-08 |

### Evidence Boundary

Requirements below may use confirmed case facts, approved Skill 01 assumptions, and `INT-001` student decision evidence. Details that still lack enough evidence are labeled as open, assumption-based, or deferred, and are not treated as final implementation policy.

## 3. Specification Readiness Map

### Ready for Specification

| Area | Readiness | Evidence |
|---|---|---|
| Actors | Ready | Reporter, Administrator, Technician, and Facility Manager are confirmed actors. SRC-03, SRC-05, SRC-07 |
| Reporter role grouping | Ready | Students and lecturers remain one Reporter role for initial scope. INT-001 |
| Core lifecycle | Ready | Use `Submitted -> Under Review -> Assigned -> In Progress -> Resolved -> Closed`. SRC-03, SRC-05, INT-001 |
| Report creation | Ready | Required feature and initial fields are approved. SRC-03, SRC-05, INT-001 |
| List, search, filter, and detail | Ready | Required feature areas are confirmed. SRC-03, SRC-05 |
| Review, priority, and assignment | Ready | Required feature areas are confirmed; one administrator level is approved. SRC-03, SRC-05, INT-001 |
| Technician progress updates | Ready | Required feature area is confirmed; reject/reassign is not separate initial scope. SRC-03, SRC-05, INT-001 |
| Comments and notes | Ready with boundary | Used for clarification, duplicate handling, and progress notes. Visibility details remain open. SRC-03, SRC-05, INT-001 |
| Status history | Ready | Required feature area is confirmed. SRC-03, SRC-05 |
| Close and reopen | Ready with boundary | Administrator may reopen when result is unsuitable or follow-up problem exists. INT-001 |
| Simple dashboard | Ready with boundary | Summary counts by status, category, priority, and recent reports. INT-001 |

### Partial, Open, or Deferred

| ID | Topic | Classification | Handling |
|---|---|---|---|
| ASM-SPEC-01 | Simple role handling without Google login | Approved boundary | Requirements can mention roles and permissions, but must not define full authentication design. |
| OPEN-SPEC-01 | Exact authentication mechanism | Open for later design | Do not require Google login or a complete identity provider. |
| OPEN-SPEC-02 | Exact measurable performance/security targets | Open for later validation | NFRs avoid invented numeric targets. |
| OPEN-SPEC-03 | Detailed comment visibility and edit policy | Open for later design/validation | Requirements only require comments/notes to be linked to reports and actor actions. |
| DR-001 to DR-007 | Optional feature topics | Deferred | Not mandatory requirements unless explicitly approved later. |

## 4. Functional Requirements

| ID | Requirement | Evidence | Status |
|---|---|---|---|
| FR-001 | The system shall allow a Reporter to create a new service request for a campus facility problem. | SRC-03, SRC-05 | Baseline requirement |
| FR-002 | The system shall capture initial report information including title, description, location, category, reporter name/contact, status, priority, and timestamps where applicable. | INT-001 | Baseline requirement |
| FR-003 | The system shall show a report list so authorized users can view existing service requests relevant to their role. | SRC-03, SRC-05 | Baseline requirement |
| FR-004 | The system shall support searching and filtering reports by practical report attributes such as status, category, priority, location, or keyword, subject to later UI/design decisions. | SRC-03, SRC-05, INT-001 | Baseline requirement |
| FR-005 | The system shall show report detail including the report information, current status, priority, assigned technician when available, comments/notes, and status history. | SRC-03, SRC-05 | Baseline requirement |
| FR-006 | The system shall allow an Administrator to review newly submitted reports before assignment. | SRC-03, SRC-05 | Baseline requirement |
| FR-007 | The system shall allow an Administrator to set or update the report category from the approved initial category set: Internet, AC, Peralatan Kelas, Kebersihan, Laboratorium, and Lainnya. | INT-001 | Baseline requirement |
| FR-008 | The system shall allow an Administrator to set report priority using Low, Medium, or High. | SRC-03, SRC-05, INT-001 | Baseline requirement |
| FR-009 | The system shall allow an Administrator to assign a reviewed report to a Technician. | SRC-03, SRC-05 | Baseline requirement |
| FR-010 | The system shall allow a Technician to view assigned work and accept a task before starting progress. | SRC-03, SRC-05 | Baseline requirement |
| FR-011 | The system shall allow a Technician to update work status through the approved lifecycle and mark work as Resolved when the work is completed. | SRC-03, SRC-05, INT-001 | Baseline requirement |
| FR-012 | The system shall allow authorized users to add comments or notes to a report for clarification, progress updates, duplicate handling, or review context. | SRC-03, SRC-05, INT-001 | Baseline requirement |
| FR-013 | The system shall store status history for each report whenever status changes occur. | SRC-03, SRC-05 | Baseline requirement |
| FR-014 | The system shall allow an Administrator to close a resolved report or reopen a resolved/closed report when the result is not suitable or a related follow-up problem exists. | SRC-03, SRC-05, INT-001 | Baseline requirement |
| FR-015 | The system shall display a simple Facility Manager dashboard with summary counts by status, category, priority, and recent reports. | SRC-03, SRC-05, INT-001 | Baseline requirement |

## 5. Non-Functional Requirements

| ID | Requirement | Evidence | Status |
|---|---|---|---|
| NFR-001 | The system shall be usable by non-technical campus users with clear labels, readable status names, and predictable role-specific actions. | SRC-03, SRC-07 | Baseline requirement |
| NFR-002 | The system shall protect role-specific actions so users only perform actions appropriate to Reporter, Administrator, Technician, or Facility Manager responsibilities. | SRC-03, SRC-05, INT-001 | Baseline requirement, auth mechanism open |
| NFR-003 | The system shall preserve data integrity for reports, status history, comments/notes, assignment, category, and priority values. | SRC-03, SRC-05 | Baseline requirement |
| NFR-004 | The system shall keep the request lifecycle reliable by preventing unsupported status changes and preserving an audit trail of status updates. | SRC-03, SRC-05 | Baseline requirement |
| NFR-005 | The system shall remain maintainable for a student project by keeping requirements traceable to design, issues, code, and tests as those artifacts are created. | SRC-03, SRC-01, SRC-06 | Baseline requirement |
| NFR-006 | The system shall be deployable on the planned free Cloudflare Workers and D1 stack unless a later approved change request changes the deployment approach. | SRC-03, SRC-04, SRC-01 | Baseline requirement |
| NFR-007 | The system shall avoid requiring non-approved optional services such as object storage, email delivery, Google login, QR scanning, AI categorization, inventory, or vendor management. | SRC-03, SRC-01, INT-001 | Baseline requirement |

## 6. Business Rules

| ID | Rule | Evidence | Status |
|---|---|---|---|
| BR-001 | A service request shall follow the baseline lifecycle: Submitted, Under Review, Assigned, In Progress, Resolved, Closed. | SRC-03, SRC-05, INT-001 | Baseline rule |
| BR-002 | A newly created report starts as Submitted unless a later approved requirement changes the initial status policy. | SRC-03, SRC-05 | Baseline rule |
| BR-003 | Only an Administrator reviews submitted reports, sets category/priority, assigns technicians, closes reports, and reopens reports in the initial scope. | SRC-03, SRC-05, INT-001 | Baseline rule |
| BR-004 | A Technician may update assigned work progress and mark assigned work as Resolved, but technician reject/reassign is not a separate feature in the initial scope. | SRC-03, SRC-05, INT-001 | Baseline rule |
| BR-005 | Every status change shall create a status history entry linked to the report. | SRC-03, SRC-05 | Baseline rule |
| BR-006 | Duplicate reports do not require a merge feature in the initial scope; Administrator handles suspected duplicates through review and comments/notes. | INT-001 | Baseline rule |
| BR-007 | Reopen is allowed for an Administrator when the reported result is not suitable or a related follow-up problem exists. | INT-001 | Baseline rule |
| BR-008 | Optional features listed as deferred shall not become mandatory project scope without explicit approval. | SRC-03, SRC-01, INT-001 | Baseline rule |

## 7. User Stories

| ID | User Story | Related Requirements | Evidence |
|---|---|---|---|
| US-001 | As a Reporter, I want to create a campus facility problem report so that the issue can enter the maintenance workflow. | FR-001, FR-002 | SRC-03, SRC-05, INT-001 |
| US-002 | As a Reporter, I want to view my report status and details so that I know how the issue is progressing. | FR-003, FR-005 | SRC-03, SRC-05 |
| US-003 | As a user who can view reports, I want to search and filter reports so that I can find relevant requests quickly. | FR-003, FR-004 | SRC-03, SRC-05 |
| US-004 | As an Administrator, I want to review submitted reports so that incomplete or duplicate reports can be handled before assignment. | FR-006, FR-012 | SRC-03, SRC-05, INT-001 |
| US-005 | As an Administrator, I want to set category and priority so that reports are organized before technician assignment. | FR-007, FR-008 | SRC-03, SRC-05, INT-001 |
| US-006 | As an Administrator, I want to assign a reviewed report to a Technician so that the work has a clear owner. | FR-009 | SRC-03, SRC-05 |
| US-007 | As a Technician, I want to view and accept assigned work so that I know which maintenance tasks I am responsible for. | FR-010 | SRC-03, SRC-05 |
| US-008 | As a Technician, I want to update progress and mark work resolved so that other users can see the latest maintenance status. | FR-011, FR-013 | SRC-03, SRC-05 |
| US-009 | As a Reporter or staff user, I want to add comments or notes to a report so that clarification and progress context stay with the request. | FR-012 | SRC-03, SRC-05, INT-001 |
| US-010 | As an Administrator, I want to close or reopen reports so that the lifecycle reflects whether the work is actually finished. | FR-014 | SRC-03, SRC-05, INT-001 |
| US-011 | As a Facility Manager, I want a simple dashboard so that I can understand overall maintenance activity at a glance. | FR-015 | SRC-03, SRC-05, INT-001 |

## 8. Acceptance Criteria

| ID | User Story | Acceptance Criteria |
|---|---|---|
| AC-001 | US-001 | Given a Reporter provides the required initial report information, when the report is submitted, then the system creates a service request with status Submitted. |
| AC-002 | US-001 | Given required report information is missing, when the Reporter submits the report, then the system prevents creation and shows which information must be completed. |
| AC-003 | US-002 | Given a Reporter opens a report they are allowed to view, when the report detail loads, then the current status and main report information are visible. |
| AC-004 | US-002 | Given a report has comments or status history, when the detail view is opened, then the related comments/history are available with the report. |
| AC-005 | US-003 | Given reports exist, when a user applies a status, category, priority, location, or keyword filter, then the report list updates to matching reports. |
| AC-006 | US-003 | Given no reports match the search/filter criteria, when the list is displayed, then the system shows an empty result state instead of misleading data. |
| AC-007 | US-004 | Given a report is Submitted, when an Administrator reviews it, then the report can move to Under Review. |
| AC-008 | US-004 | Given an Administrator identifies duplicate or unclear information, when reviewing the report, then the Administrator can record clarification or duplicate context through comments/notes. |
| AC-009 | US-005 | Given an Administrator edits a report category, when the category is saved, then the value is one of Internet, AC, Peralatan Kelas, Kebersihan, Laboratorium, or Lainnya. |
| AC-010 | US-005 | Given an Administrator edits priority, when the priority is saved, then the value is Low, Medium, or High. |
| AC-011 | US-006 | Given a report is ready for assignment, when an Administrator assigns a Technician, then the report records the assigned Technician and can move to Assigned. |
| AC-012 | US-006 | Given a report has no assigned Technician, when it is viewed by staff, then the assignment state is clear and not confused with In Progress work. |
| AC-013 | US-007 | Given a Technician has assigned work, when they view their task list, then assigned reports are visible with enough summary information to identify the work. |
| AC-014 | US-007 | Given a Technician accepts assigned work, when acceptance is recorded, then the task can proceed toward In Progress according to the lifecycle. |
| AC-015 | US-008 | Given a Technician starts work on an assigned task, when status is updated to In Progress, then the current report status changes and a history entry is stored. |
| AC-016 | US-008 | Given work is completed, when the Technician marks it Resolved, then the report status becomes Resolved and the status history records the change. |
| AC-017 | US-009 | Given an authorized user writes a comment or note on a report, when it is saved, then it remains linked to that report. |
| AC-018 | US-009 | Given a report is used for clarification or duplicate handling, when notes are added, then the note content is visible to authorized users who need the context. |
| AC-019 | US-010 | Given a report is Resolved, when an Administrator closes it, then the report status becomes Closed and the change is recorded in history. |
| AC-020 | US-010 | Given a report is Resolved or Closed and the result is unsuitable or a follow-up problem exists, when an Administrator reopens it, then the report leaves the closed/resolved end state and history records the reason/context. |
| AC-021 | US-011 | Given Facility Manager opens the dashboard, when summary data is available, then counts by status, category, priority, and recent reports are displayed. |
| AC-022 | US-011 | Given there are no reports yet, when the dashboard is viewed, then the system shows zero/empty summaries without errors. |

## 9. Deferred Requirement Topics

| ID | Topic | Status | Reason / Evidence |
|---|---|---|---|
| DR-001 | Upload photo | Deferred / not required | Listed as not required; object storage may require additional service activation. SRC-03 |
| DR-002 | Email notification | Deferred / not required | Listed as not required and not approved as scope. SRC-03, INT-001 |
| DR-003 | Google login | Deferred / not required | Listed as not required; authentication remains simple for Specification. SRC-03, INT-001 |
| DR-004 | Room QR code | Deferred / not required | Listed as not required and not approved as scope. SRC-03 |
| DR-005 | AI categorization | Deferred / not required | AI is required for process evidence, not as an application feature. SRC-03 |
| DR-006 | Spare-part inventory | Deferred / not required | Listed as not required and not approved as scope. SRC-03 |
| DR-007 | Vendor management | Deferred / not required | Listed as not required and not approved as scope. SRC-03 |

## 10. Open Questions Blocking Detail

No open question blocks this Specification stage because `INT-001` resolves the Skill 01 open questions enough for initial requirements. The following details remain open for later stages and must not be silently turned into design or implementation decisions.

| ID | Open Detail | Why It Remains Open | Later Stage |
|---|---|---|---|
| OQD-001 | Exact authentication and session mechanism | Specification uses simple roles, but does not choose login implementation. | Architecture / UI / Implementation |
| OQD-002 | Exact role enforcement implementation | Role responsibilities are specified, but technical enforcement belongs to design. | Architecture / API Design |
| OQD-003 | Exact comment/note visibility rules | Requirement supports comments/notes; visibility details need design and validation. | UI Design / Validation |
| OQD-004 | Exact dashboard layout and interaction | Dashboard metrics are specified; UI layout belongs to design. | UI Design |
| OQD-005 | Exact measurable NFR targets | Student decision says not to invent precise numbers without later evidence. | Validation / Testing |
| OQD-006 | Retention, deletion, or archival policy | Not covered by confirmed case facts or `INT-001`. | Validation / Change |

## 11. Traceability Matrix

| Requirement | User Story | Acceptance Criteria | Business Rules | Source Evidence | Design | Issue | Code | Test | Status |
|---|---|---|---|---|---|---|---|---|---|
| FR-001 | US-001 | AC-001, AC-002 | BR-002 | SRC-03, SRC-05 | Pending | Pending | Pending | Pending | Specified |
| FR-002 | US-001 | AC-001, AC-002 | BR-002 | INT-001 | Pending | Pending | Pending | Pending | Specified |
| FR-003 | US-002, US-003 | AC-003, AC-005, AC-006 | - | SRC-03, SRC-05 | Pending | Pending | Pending | Pending | Specified |
| FR-004 | US-003 | AC-005, AC-006 | - | SRC-03, SRC-05, INT-001 | Pending | Pending | Pending | Pending | Specified |
| FR-005 | US-002 | AC-003, AC-004 | BR-005 | SRC-03, SRC-05 | Pending | Pending | Pending | Pending | Specified |
| FR-006 | US-004 | AC-007, AC-008 | BR-003, BR-006 | SRC-03, SRC-05 | Pending | Pending | Pending | Pending | Specified |
| FR-007 | US-005 | AC-009 | BR-003 | INT-001 | Pending | Pending | Pending | Pending | Specified |
| FR-008 | US-005 | AC-010 | BR-003 | SRC-03, SRC-05, INT-001 | Pending | Pending | Pending | Pending | Specified |
| FR-009 | US-006 | AC-011, AC-012 | BR-003 | SRC-03, SRC-05 | Pending | Pending | Pending | Pending | Specified |
| FR-010 | US-007 | AC-013, AC-014 | BR-004 | SRC-03, SRC-05 | Pending | Pending | Pending | Pending | Specified |
| FR-011 | US-008 | AC-015, AC-016 | BR-001, BR-004, BR-005 | SRC-03, SRC-05, INT-001 | Pending | Pending | Pending | Pending | Specified |
| FR-012 | US-004, US-009 | AC-008, AC-017, AC-018 | BR-006 | SRC-03, SRC-05, INT-001 | Pending | Pending | Pending | Pending | Specified |
| FR-013 | US-008 | AC-015, AC-016 | BR-005 | SRC-03, SRC-05 | Pending | Pending | Pending | Pending | Specified |
| FR-014 | US-010 | AC-019, AC-020 | BR-003, BR-007 | SRC-03, SRC-05, INT-001 | Pending | Pending | Pending | Pending | Specified |
| FR-015 | US-011 | AC-021, AC-022 | - | SRC-03, SRC-05, INT-001 | Pending | Pending | Pending | Pending | Specified |
| NFR-001 | US-001 to US-011 | All relevant AC | - | SRC-03, SRC-07 | Pending | Pending | Pending | Pending | Specified |
| NFR-002 | US-001 to US-011 | All role-sensitive AC | BR-003, BR-004 | SRC-03, SRC-05, INT-001 | Pending | Pending | Pending | Pending | Specified |
| NFR-003 | US-001 to US-010 | AC-001, AC-015, AC-016, AC-019, AC-020 | BR-005 | SRC-03, SRC-05 | Pending | Pending | Pending | Pending | Specified |
| NFR-004 | US-008, US-010 | AC-015, AC-016, AC-019, AC-020 | BR-001, BR-005, BR-007 | SRC-03, SRC-05 | Pending | Pending | Pending | Pending | Specified |
| NFR-005 | US-001 to US-011 | All relevant AC | - | SRC-03, SRC-01, SRC-06 | Pending | Pending | Pending | Pending | Specified |
| NFR-006 | US-001 to US-011 | All relevant AC | - | SRC-03, SRC-04, SRC-01 | Pending | Pending | Pending | Pending | Specified |
| NFR-007 | US-001 to US-011 | All relevant AC | BR-008 | SRC-03, SRC-01, INT-001 | Pending | Pending | Pending | Pending | Specified |

## 12. Human Review Notes

### Review Needed

The student should check:

- Whether the `FR-*`, `NFR-*`, `BR-*`, `US-*`, and `AC-*` entries match the approved case scope.
- Whether `INT-001` has been used correctly as student decision evidence.
- Whether any optional feature accidentally became mandatory scope.
- Whether assumptions and open details are labeled clearly enough for the next stage.
- Whether this specification is ready to proceed to prioritization after review.

### Current Review Status

| Item | Status | Notes |
|---|---|---|
| AI draft for Skill 03 | Pending student review | Created from approved inception, elicitation, and `INT-001` decision evidence. |
| Human review by student | Pending | Must be reviewed before merge to `development` and before Skill 04. |
| Scope change | None | Optional features remain deferred. |
| Traceability | Started | Initial requirement-to-story-to-AC traceability is documented here and in `docs/requirements/traceability.md`. |
