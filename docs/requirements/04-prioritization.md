# Requirements Prioritization

## 1. Sources Read

| ID | Source | Notes |
|---|---|---|
| SRC-01 | `AGENTS.md` | Project rules, source-of-truth order, branch rules, stage boundaries, evidence rules, and ask-first decisions. |
| SRC-02 | `skills/jordy-workflows/github-workflow-jordy.md` | GitHub branch, worktree, review, merge, handoff, and quality-check workflow. |
| SRC-03 | `AI_Assisted_Campus_Service_Project.md` | Main assignment, required workflow, required features, optional features, deliverables, and AI process expectations. |
| SRC-04 | `README.md` | Repository purpose, planned stack, and artifact structure. |
| SRC-05 | `CASE.md` | Compact case summary, actors, workflow, and core feature list. |
| SRC-06 | `skills/04-prioritization/SKILL.md` | Prioritization process, MoSCoW method, value-risk handling, and output structure. |
| SRC-07 | `docs/requirements/01-inception-stakeholder.md` | Approved stakeholder discovery, scope boundaries, assumptions, risks, and deferred topics. |
| SRC-08 | `docs/requirements/02-elicitation.md` | Approved elicitation decisions, especially `INT-001`. |
| SRC-09 | `docs/requirements/03-specification.md` | Approved functional requirements, non-functional requirements, business rules, user stories, acceptance criteria, deferred topics, and open details. |
| SRC-10 | `docs/requirements/traceability.md` | Current requirement-to-story-to-AC traceability baseline. |
| SRC-11 | `evidence/requirements-inception-ai-evidence.md` | Approved AI evidence for Skill 01. |
| SRC-12 | `evidence/requirements-elicitation-ai-evidence.md` | Approved AI evidence for Skill 02. |
| SRC-13 | `evidence/requirements-specification-ai-evidence.md` | Approved AI evidence for Skill 03. |

## 2. Review Status and Boundary

This document prioritizes the approved requirements specification only. It does not create new requirements, design, database/API design, UI design, GitHub issues, tests, code, deployment work, or mandatory optional features.

| Item | Status | Notes |
|---|---|---|
| Inception | Approved | Approval recorded in SRC-07 and SRC-11. |
| Elicitation | Approved | Approval recorded in SRC-08 and SRC-12. |
| Specification | Approved | Approval recorded in SRC-09 and SRC-13. |
| Prioritization review | Approved by student on 2026-06-30 | Student approved prioritization and allowed merge to `development`. |
| Optional feature boundary | Confirmed deferred | Deferred topics stay out of required scope unless explicitly approved later. |

## 3. Prioritization Method

This stage uses the simple method required by Skill 04:

| Dimension | Values | Use |
|---|---|---|
| MoSCoW | Must, Should, Could, Won't for now | Defines required scope and deferred scope. |
| Value | High, Medium, Low | Indicates benefit for the campus workflow and assignment deliverables. |
| Risk/readiness | High, Medium, Low | Indicates uncertainty, dependency, or later design/policy risk. |
| Rationale | Text linked to requirement/story/evidence | Explains why the priority is assigned. |

Because `FR-001` to `FR-015`, `NFR-001` to `NFR-007`, and `BR-001` to `BR-008` are already approved baseline requirements/rules in SRC-09, they are treated as `Must` unless a later human review changes the specification. Deferred topics `DR-001` to `DR-007` are `Won't for now`.

## 4. Requirements Readiness Map

| Area | Items | Readiness | Risk Note |
|---|---|---|---|
| Core report intake | FR-001, FR-002, BR-002, US-001 | Supported / approved | FR-002 depends on `INT-001` for the initial field set, but it is approved enough for prioritization. |
| Report visibility | FR-003, FR-005, US-002 | Supported | Directly supported by required feature list and case workflow. |
| Search and filter | FR-004, US-003 | Supported with design detail pending | Required feature is clear; exact UI behavior remains a later design decision. |
| Admin review and triage | FR-006, FR-007, FR-008, BR-003, BR-006, US-004, US-005 | Supported / approved | Category set and duplicate handling depend on `INT-001`, but no optional merge feature is added. |
| Assignment and technician work | FR-009, FR-010, FR-011, BR-004, US-006, US-007, US-008 | Supported / approved | Technician reject/reassign remains outside initial scope. |
| Comments, notes, and history | FR-012, FR-013, BR-005, US-009 | Supported with visibility detail pending | Exact comment visibility policy remains open for later validation/design. |
| Close and reopen | FR-014, BR-007, US-010 | Supported / approved | Reopen is limited to Administrator action and approved conditions. |
| Dashboard | FR-015, US-011 | Supported with UI detail pending | Simple summary only; no advanced analytics or export scope. |
| Quality and constraints | NFR-001 to NFR-007, BR-001, BR-008 | Supported / approved | NFR-002 has readiness risk because exact authentication/session mechanism remains open. |
| Deferred topics | DR-001 to DR-007 | Deferred | Must not become required scope through prioritization. |

## 5. MoSCoW Prioritization Table

### Functional Requirements

| ID | MoSCoW | Value | Risk/Readiness | Rationale |
|---|---|---|---|---|
| FR-001 | Must | High | Low | Report creation starts the whole service request lifecycle and is explicitly required by SRC-03 and SRC-05. |
| FR-002 | Must | High | Medium | Initial data is needed to store useful reports; field set is approved through `INT-001`, with later design details still pending. |
| FR-003 | Must | High | Low | A report list is required so actors can view existing requests and coordinate work. |
| FR-004 | Must | Medium | Medium | Search/filter is required, but exact controls and matching behavior belong to later UI/design decisions. |
| FR-005 | Must | High | Low | Detail view is necessary for status, assignment, comments, and history visibility across the lifecycle. |
| FR-006 | Must | High | Low | Administrator review is a required step before assignment in the workflow. |
| FR-007 | Must | Medium | Medium | Category setting is required and the initial category set is approved by `INT-001`. |
| FR-008 | Must | High | Low | Priority setting is required by the case and supports admin triage. |
| FR-009 | Must | High | Low | Technician assignment is required to move work from review into execution. |
| FR-010 | Must | Medium | Low | Technician task visibility and acceptance support role clarity before progress starts. |
| FR-011 | Must | High | Low | Technician status updates are central to `Assigned -> In Progress -> Resolved`. |
| FR-012 | Must | Medium | Medium | Comments/notes are required for clarification, progress context, and duplicate handling; exact visibility remains open. |
| FR-013 | Must | High | Low | Status history is required and supports auditability of lifecycle changes. |
| FR-014 | Must | High | Medium | Close/reopen is required; reopen conditions are approved but should be reviewed carefully before design. |
| FR-015 | Must | Medium | Medium | A simple dashboard is required, but scope is limited to summary counts and recent reports. |

### Non-Functional Requirements

| ID | MoSCoW | Value | Risk/Readiness | Rationale |
|---|---|---|---|---|
| NFR-001 | Must | High | Low | Usability matters because reporters and campus staff may be non-technical users. |
| NFR-002 | Must | High | High | Role-specific action protection is essential, but exact auth/session implementation remains open. |
| NFR-003 | Must | High | Low | Data integrity protects reports, comments, history, assignment, category, and priority values. |
| NFR-004 | Must | High | Low | Lifecycle reliability prevents unsupported status changes and preserves audit history. |
| NFR-005 | Must | High | Low | Traceability is a required assignment deliverable. |
| NFR-006 | Must | High | Low | The project must remain deployable on the planned Cloudflare Workers and D1 stack. |
| NFR-007 | Must | High | Low | Avoiding unapproved optional services protects scope and free-tier feasibility. |

### Business Rules

| ID | MoSCoW | Value | Risk/Readiness | Rationale |
|---|---|---|---|---|
| BR-001 | Must | High | Low | Defines the approved lifecycle and prevents hidden additional statuses. |
| BR-002 | Must | High | Low | Establishes `Submitted` as the initial state for new reports. |
| BR-003 | Must | High | Medium | Defines Administrator authority; exact technical enforcement is later design work. |
| BR-004 | Must | Medium | Low | Keeps technician responsibilities clear and avoids adding reject/reassign scope. |
| BR-005 | Must | High | Low | Ensures every status change is traceable. |
| BR-006 | Must | Medium | Medium | Keeps duplicate handling simple without adding a merge feature. |
| BR-007 | Must | High | Medium | Limits reopen to approved Administrator-controlled conditions. |
| BR-008 | Must | High | Low | Prevents optional features from becoming mandatory without approval. |

### User Stories

| ID | MoSCoW | Value | Risk/Readiness | Rationale |
|---|---|---|---|---|
| US-001 | Must | High | Low | Creates the report that starts the workflow. |
| US-002 | Must | High | Low | Lets Reporter track status and details after submission. |
| US-003 | Must | Medium | Medium | Required for finding reports; specific filters remain design-level detail. |
| US-004 | Must | High | Medium | Supports admin review and duplicate/clarification handling before assignment. |
| US-005 | Must | High | Medium | Organizes reports by category and priority for assignment. |
| US-006 | Must | High | Low | Gives the work a clear Technician owner. |
| US-007 | Must | Medium | Low | Lets Technician identify and accept assigned tasks. |
| US-008 | Must | High | Low | Keeps maintenance progress visible through status changes. |
| US-009 | Must | Medium | Medium | Keeps clarification and progress context linked to the report. |
| US-010 | Must | High | Medium | Ensures lifecycle end states can be closed or reopened under approved conditions. |
| US-011 | Must | Medium | Medium | Provides Facility Manager summary visibility without advanced analytics. |

## 6. MVP Scope

For this project, MVP means the minimum required product scope that satisfies the approved case and assignment baseline, not a production-grade facilities platform.

### In MVP

| Scope Area | Included Items | Boundary |
|---|---|---|
| Report intake | FR-001, FR-002, US-001 | Create a report with approved initial fields and `Submitted` status. |
| Report visibility | FR-003, FR-005, US-002 | View list and detail with current status and relevant report information. |
| Finding reports | FR-004, US-003 | Search/filter by practical attributes; exact UI is later design work. |
| Admin workflow | FR-006, FR-007, FR-008, FR-009, US-004 to US-006 | Review, categorize, prioritize, and assign without adding multi-level admin scope. |
| Technician workflow | FR-010, FR-011, US-007, US-008 | View/accept work, update progress, and mark work resolved. |
| Communication and audit trail | FR-012, FR-013, US-009 | Comments/notes and status history are required, with visibility details handled later. |
| Closure control | FR-014, US-010 | Administrator can close or reopen within approved conditions. |
| Management summary | FR-015, US-011 | Simple counts by status/category/priority and recent reports only. |
| Quality constraints | NFR-001 to NFR-007, BR-001 to BR-008 | Keep roles, lifecycle, data integrity, traceability, Cloudflare feasibility, and scope control intact. |

### Out of MVP

| Deferred ID | Topic | Priority |
|---|---|---|
| DR-001 | Upload photo | Won't for now |
| DR-002 | Email notification | Won't for now |
| DR-003 | Google login | Won't for now |
| DR-004 | Room QR code | Won't for now |
| DR-005 | AI categorization | Won't for now |
| DR-006 | Spare-part inventory | Won't for now |
| DR-007 | Vendor management | Won't for now |

## 7. Value-Risk Notes

| Note ID | Item(s) | Value-Risk Summary | Handling |
|---|---|---|---|
| VR-001 | FR-001, FR-002, FR-003, FR-005 | High value and low-to-medium risk because they create and expose the core report record. | Keep in MVP and preserve traceability to US-001 and US-002. |
| VR-002 | FR-006 to FR-011 | High value because these items move the report through admin and technician workflow. | Keep in MVP; later design must respect one-level Administrator and no technician reject/reassign feature. |
| VR-003 | FR-012, OQD-003 | Medium value and medium risk because comments/notes are required, but visibility/edit policy is not yet specified. | Keep required, but do not invent detailed visibility policy in this stage. |
| VR-004 | FR-014, BR-007 | High value and medium risk because reopen affects lifecycle integrity. | Keep required; validation should confirm reopen boundary before design. |
| VR-005 | FR-015, OQD-004 | Medium value and medium risk because dashboard is required but should remain simple. | Keep only summary counts and recent reports in MVP. |
| VR-006 | NFR-002, OQD-001, OQD-002 | High value and high readiness risk because role protection is essential while auth design is open. | Keep as `Must`; choose mechanism only in later approved design stage. |
| VR-007 | DR-001 to DR-007 | Low MVP value and high scope risk for this assignment stage. | Keep `Won't for now`; revisit only through explicit change approval. |

## 8. Deferred Topics and Blockers

### Deferred Topics

| ID | Topic | Priority | Reason |
|---|---|---|---|
| DR-001 | Upload photo | Won't for now | Optional and may require object storage/service activation. |
| DR-002 | Email notification | Won't for now | Optional and not approved. |
| DR-003 | Google login | Won't for now | Optional; authentication remains simple for Specification. |
| DR-004 | Room QR code | Won't for now | Optional and not approved. |
| DR-005 | AI categorization | Won't for now | AI is process evidence, not an application feature. |
| DR-006 | Spare-part inventory | Won't for now | Optional and outside current campus request workflow scope. |
| DR-007 | Vendor management | Won't for now | Optional and outside current assignment scope. |

### Blockers

No approved requirement is blocked for prioritization. The following open details should be carried forward, but they do not block this stage:

| ID | Detail | Handling |
|---|---|---|
| OQD-001 | Exact authentication and session mechanism | Decide during later architecture/UI/implementation work only after approval. |
| OQD-002 | Exact role enforcement implementation | Decide during architecture/API design. |
| OQD-003 | Exact comment/note visibility rules | Validate before UI/design detail is finalized. |
| OQD-004 | Exact dashboard layout and interaction | Leave to UI design. |
| OQD-005 | Exact measurable NFR targets | Do not invent metrics; revisit during validation/testing. |
| OQD-006 | Retention, deletion, or archival policy | Revisit through validation/change if needed. |

## 9. Priority Conflicts

| Conflict ID | Potential Conflict | Resolution in This Stage |
|---|---|---|
| PC-001 | All approved requirements are `Must`, which can make implementation sequencing look flat. | Keep all approved requirements as `Must` because they are baseline assignment/case scope; use value and readiness risk to guide later planning without changing scope. |
| PC-002 | Role protection is required, but the exact authentication mechanism is still open. | Prioritize NFR-002 as `Must` with high readiness risk; do not select an auth design in this stage. |
| PC-003 | Dashboard is required, but dashboard scope could expand into analytics/reporting. | Prioritize FR-015 as `Must` but limit it to simple counts and recent reports. |
| PC-004 | Duplicate handling is useful, but a merge feature is optional complexity. | Keep BR-006 as a simple review/comment rule; do not add duplicate merge as required scope. |

## 10. Student Decisions Needed

| ID | Decision Needed | Recommended Decision | Why |
|---|---|---|---|
| SDN-P-001 | Approve that all approved `FR-*`, `NFR-*`, `BR-*`, and `US-*` remain `Must`. | Approve | They represent the already approved baseline specification and required assignment scope. |
| SDN-P-002 | Approve that deferred topics stay `Won't for now`. | Approve | This prevents hidden optional scope from affecting MVP, design, or issues. |
| SDN-P-003 | Confirm that high-risk readiness items are carried forward as risk notes, not solved here. | Approve | Prioritization should not decide auth, role enforcement implementation, dashboard layout, or comment visibility design. |

## 11. Traceability Notes

`docs/requirements/traceability.md` is updated with a Prioritization Traceability section. Design, issue, code, and test columns remain `Pending` because those stages have not been approved or created yet.

Prioritization does not change requirement IDs, user story IDs, acceptance criteria IDs, business rule IDs, or deferred topic IDs from SRC-09.

## 12. Human Review Notes

### Review Needed

The student should review:

- whether the `Must` classification for all approved baseline requirements is acceptable;
- whether any item should be explicitly deferred before validation/change;
- whether value and readiness risk notes are reasonable;
- whether deferred optional features remain outside required scope;
- whether this prioritization is ready to proceed to validation/change after approval.

### Current Review Status

| Item | Status | Notes |
|---|---|---|
| AI draft for Skill 04 | Reviewed | Created from approved Skill 01, Skill 02, and Skill 03 artifacts. |
| Human review by student | Approved on 2026-06-30 | Student approved prioritization and allowed merge to `development`. |
| Scope change | None | No optional feature was added as required scope. |
| Traceability | Updated | Prioritization traceability added without creating design, issue, code, or test artifacts. |
