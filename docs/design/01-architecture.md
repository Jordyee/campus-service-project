# Architecture Design

## 1. Sources Read

| ID | Source | Notes |
|---|---|---|
| SRC-01 | `AGENTS.md` | Project rules, source-of-truth order, stage boundaries, branch rules, evidence rules, and scope limits. |
| SRC-02 | `skills/jordy-workflows/github-workflow-jordy.md` | Branch, worktree, pull request, merge, and quality-check workflow. |
| SRC-03 | `AI_Assisted_Campus_Service_Project.md` | Assignment scope, case description, required workflow, required and optional features, stack direction, and deliverables. |
| SRC-04 | `README.md` | Repository purpose, planned stack, and artifact structure. |
| SRC-05 | `CASE.md` | Compact case summary, actors, core workflow, and required feature list. |
| SRC-06 | `skills/06-architecture-design/SKILL.md` | Architecture design workflow, output structure, boundaries, and quality checks. |
| SRC-07 | `docs/requirements/03-specification.md` | Approved FR, NFR, BR, US, AC, deferred topics, and open details. |
| SRC-08 | `docs/requirements/04-prioritization.md` | Approved Must scope, risk/readiness notes, MVP boundary, and deferred topics. |
| SRC-09 | `docs/requirements/05-validation-change.md` | Approved validation findings and change requests `CR-001`, `CR-002`, and `CR-003`. |
| SRC-10 | `docs/requirements/traceability.md` | Current requirement traceability baseline before architecture mapping. |
| SRC-11 | `evidence/requirements-specification-ai-evidence.md` | AI evidence and human review status for Skill 03. |
| SRC-12 | `evidence/requirements-prioritization-ai-evidence.md` | AI evidence and human review status for Skill 04. |
| SRC-13 | `evidence/requirements-validation-change-ai-evidence.md` | AI evidence and human review status for Skill 05. |

## 2. Review Status and Boundary

This document defines the first design artifact for the Campus Service Request and Maintenance System: high-level architecture only.

| Item | Status | Notes |
|---|---|---|
| Requirements Inception | Approved and merged to `development` | Status provided by student and prior evidence. |
| Requirements Elicitation | Approved and merged to `development` | Status provided by student and prior evidence. |
| Requirements Specification | Approved and merged to `development` | Source baseline is `docs/requirements/03-specification.md`. |
| Requirements Prioritization | Approved and merged to `development` | Source baseline is `docs/requirements/04-prioritization.md`. |
| Requirements Validation and Change | Approved and merged to `development` | `CR-001`, `CR-002`, and `CR-003` are approved clarifications. |
| Architecture Design | Approved by student | Student approved the architecture draft in chat and asked to continue documenting it in GitHub. |

### Boundary

This architecture design includes components, responsibilities, high-level data flow, architecture decisions, risks, open design questions, and requirement-to-architecture mapping.

This document does not create database schema, API route detail, request/response schemas, UI screens, wireframes, GitHub issues, tests, code, deployment config, or Cloudflare deployment.

Deferred optional features remain out of required scope:

- Upload photo.
- Email notification.
- Google login.
- Room QR code.
- AI categorization.
- Spare-part inventory.
- Vendor management.

## 3. Architecture Goals and Drivers

### Goals

| Goal ID | Goal | Requirement Basis |
|---|---|---|
| ARCH-GOAL-001 | Support the complete approved service request lifecycle from report submission to closure. | `FR-001` to `FR-014`, `BR-001`, `BR-002`, `BR-005`, `CR-001` |
| ARCH-GOAL-002 | Keep the architecture simple enough for a student project while covering required roles and traceability. | `NFR-005`, `NFR-006`, `NFR-007` |
| ARCH-GOAL-003 | Preserve data integrity for reports, status history, comments/notes, assignment, category, and priority. | `NFR-003`, `NFR-004`, `BR-003` to `BR-007` |
| ARCH-GOAL-004 | Use the planned free Cloudflare stack without adding optional services. | `NFR-006`, `NFR-007`, `BR-008` |
| ARCH-GOAL-005 | Keep role-sensitive actions explicit without requiring Google login or a production identity provider. | `NFR-002`, `CR-003`, `DR-003` |

### Architecture Drivers

| Driver ID | Driver | Impact on Architecture |
|---|---|---|
| ARCH-DRV-001 | Four confirmed actors: Reporter, Administrator, Technician, Facility Manager. | The system needs role-aware capabilities and role-specific actions. |
| ARCH-DRV-002 | Approved lifecycle: Submitted -> Under Review -> Assigned -> In Progress -> Resolved -> Closed. | Lifecycle transitions should be controlled by the backend boundary and recorded in status history. |
| ARCH-DRV-003 | Reopen clarification from `CR-001`. | Reopened reports return to Under Review and require history reason/context. |
| ARCH-DRV-004 | Append-only comments/notes from `CR-002`. | Comments/notes should be treated as immutable report context at architecture level. |
| ARCH-DRV-005 | Simple educational role boundary from `CR-003`. | Architecture should isolate role checks as a concern without selecting Google login or a paid auth service. |
| ARCH-DRV-006 | Cloudflare Workers and D1 baseline. | The system should use a React frontend, a Cloudflare Worker backend boundary, and Cloudflare D1 persistence. |
| ARCH-DRV-007 | Deferred optional services. | Architecture must not depend on object storage, email delivery, Google login, QR, AI categorization, inventory, or vendor integration. |

## 4. System Context

| Context ID | External Actor/System | Relationship |
|---|---|---|
| ARCH-CTX-001 | Reporter | Uses the web application to create reports, view status/detail, add comments, and confirm/report unsuitable results through the approved workflow. |
| ARCH-CTX-002 | Administrator | Uses the web application to review reports, set category and priority, assign technicians, close reports, and reopen reports. |
| ARCH-CTX-003 | Technician | Uses the web application to view assigned work, accept tasks, update progress, and mark work resolved. |
| ARCH-CTX-004 | Facility Manager | Uses the web application to view dashboard summaries and recent report activity. |
| ARCH-CTX-005 | Cloudflare Workers runtime | Hosts the backend boundary and serves the deployed worker application later. |
| ARCH-CTX-006 | Cloudflare D1 | Stores persistent application data at a high level. Detailed schema belongs to Skill 07. |
| ARCH-CTX-007 | GitHub repository artifacts | Store requirements, design, evidence, traceability, code, tests, and later PR history. |

High-level context:

```text
Campus users and staff
  -> React + TypeScript web app
  -> Cloudflare Worker backend boundary
  -> Cloudflare D1 persistence
  -> Documentation, evidence, and traceability in GitHub
```

## 5. High-Level Architecture

| Component ID | Component | Purpose |
|---|---|---|
| ARCH-COMP-001 | React TypeScript Frontend | Presents role-appropriate views and actions for reports, review, assignment, technician progress, comments/notes, lifecycle actions, and dashboard summaries. |
| ARCH-COMP-002 | Cloudflare Worker Backend Boundary | Receives frontend requests, applies role/action boundaries, coordinates lifecycle rules, validates high-level business actions, and reads/writes persistent data. |
| ARCH-COMP-003 | Cloudflare D1 Persistence Layer | Stores service request data, role-related references, comments/notes, status history, assignment information, category/priority values, and dashboard source data at a high level. |
| ARCH-COMP-004 | Role and Action Boundary | Defines which actor type may perform each sensitive action without selecting a production authentication mechanism in this stage. |
| ARCH-COMP-005 | Lifecycle and Audit Concern | Ensures status changes follow the approved lifecycle, reopen returns to Under Review, and every status change creates status history. |
| ARCH-COMP-006 | Dashboard Summary Concern | Provides simple status, category, priority, and recent-report summaries from stored request data. |
| ARCH-COMP-007 | Traceability and Evidence Artifacts | Maintains project documentation links from requirements to design, later issues, code, tests, deployment, and AI evidence. |

### Architecture View

```text
ARCH-COMP-001 Frontend
  - role-aware pages/actions
  - report forms, lists, detail, dashboard presentation

        calls
          |
          v

ARCH-COMP-002 Worker Backend Boundary
  - validates actions at application boundary
  - coordinates lifecycle, assignment, comments, dashboard reads
  - keeps optional integrations out of the initial architecture

        persists/reads
          |
          v

ARCH-COMP-003 D1 Persistence Layer
  - stores reports and related workflow data at high level
  - feeds list/detail/history/dashboard needs
```

## 6. Component Responsibilities

| Component ID | Responsibilities | Out of Scope for This Component at This Stage |
|---|---|---|
| ARCH-COMP-001 | Collect report input, show lists/details, expose role-appropriate actions, display comments/history, and present dashboard summaries. | Final screen list, navigation design, visual layout, wireframes, and exact UI controls. |
| ARCH-COMP-002 | Act as the application boundary for report creation, review, category/priority changes, assignment, technician progress, comments/notes, lifecycle changes, close/reopen, and dashboard reads. | Final API route list, request body schemas, response schemas, and implementation code. |
| ARCH-COMP-003 | Persist records needed by the approved requirements and provide data for detail, history, comments, assignment, and summaries. | Table names, columns, indexes, migrations, ERD, and query design. |
| ARCH-COMP-004 | Keep Reporter, Administrator, Technician, and Facility Manager capabilities separated according to approved responsibilities. | Exact login/session mechanism and production identity-provider design. |
| ARCH-COMP-005 | Enforce allowed lifecycle direction and record status history for every status change. | Low-level state-machine implementation and test cases. |
| ARCH-COMP-006 | Support simple Facility Manager summaries by status, category, priority, and recent reports. | Advanced analytics, exports, charts, forecasting, or reporting tools. |
| ARCH-COMP-007 | Keep architecture IDs mapped to requirements and preserve AI evidence for review. | GitHub issues, PR creation, code references, test IDs, and deployment evidence. |

## 7. Data Flow Overview

### ARCH-FLOW-001: Create Report

1. Reporter enters initial report information through the frontend.
2. Frontend sends the action to the Worker backend boundary.
3. Worker validates required report information at a high level and creates a report with `Submitted` status.
4. Worker stores the report in D1 and records the creation/status context needed for later traceability.
5. Frontend shows the created report or list/detail state.

### ARCH-FLOW-002: Review, Category, Priority, and Assignment

1. Administrator views submitted reports.
2. Worker exposes review actions only through the Administrator role boundary.
3. Administrator moves a submitted report into review, sets approved category and priority values, and assigns a Technician.
4. Worker updates persistent report state and records status history when status changes.
5. Assigned report becomes available to the Technician through role-appropriate views.

### ARCH-FLOW-003: Technician Progress and Resolution

1. Technician views assigned work.
2. Technician accepts the assigned task before work progresses.
3. Worker moves the request through allowed progress states.
4. Technician updates work status to `In Progress` and later `Resolved`.
5. Worker persists current status and status history for each status change.

### ARCH-FLOW-004: Comments, Notes, and Status History

1. Authorized users who can view a report add append-only comments or notes.
2. Worker links comments/notes to the related report.
3. Worker keeps comments/notes available as report context for authorized report viewers.
4. Report detail reads current report information, comments/notes, and status history together at a high level.

### ARCH-FLOW-005: Close and Reopen

1. Administrator reviews a `Resolved` report.
2. Administrator closes the report when work is acceptable.
3. If a resolved or closed result is unsuitable or has a related follow-up problem, Administrator reopens the report.
4. Worker returns reopened reports to `Under Review` and records reason/context in status history.

### ARCH-FLOW-006: Dashboard Summary

1. Facility Manager opens the dashboard.
2. Frontend requests simple summary data.
3. Worker reads stored request data and prepares counts by status, category, priority, and recent reports.
4. Frontend displays summaries without advanced analytics or export scope.

## 8. Architecture Decisions

| Decision ID | Decision | Rationale | Requirement Basis | Tradeoff | Consequence |
|---|---|---|---|---|---|
| ARCH-DEC-001 | Use React with TypeScript, Cloudflare Worker, and Cloudflare D1 as the baseline architecture. | This matches the planned project stack and assignment constraint. | `NFR-006`, SRC-03, SRC-04 | Keeps the stack simple but ties design to Cloudflare constraints. | Later database/API design must fit Worker and D1 capabilities. |
| ARCH-DEC-002 | Use one Cloudflare Worker as the backend application boundary for the initial project. | The project is small and benefits from a single clear backend boundary. | `NFR-005`, `NFR-006` | Less service separation, but lower complexity for a student project. | API, role checks, lifecycle coordination, and dashboard reads are designed around one backend boundary. |
| ARCH-DEC-003 | Keep role handling as a simple educational role boundary and defer exact auth/session mechanism. | `CR-003` approves simple role handling and keeps Google login deferred. | `NFR-002`, `BR-003`, `BR-004`, `DR-003`, `CR-003` | Avoids premature auth complexity, but role enforcement needs later design detail. | Database/API/UI design must explicitly decide how roles are represented before implementation. |
| ARCH-DEC-004 | Treat lifecycle transitions and status history as backend-controlled concerns. | Lifecycle reliability and status history are core requirements. | `FR-011`, `FR-013`, `FR-014`, `NFR-004`, `BR-001`, `BR-005`, `CR-001` | Frontend remains simpler, but backend must consistently validate status-changing actions. | Later implementation should not allow arbitrary status changes from the frontend. |
| ARCH-DEC-005 | Treat comments/notes as append-only report context visible to authorized users who can view the report. | `CR-002` clarifies comments/notes without adding internal-only notes. | `FR-012`, `AC-017`, `AC-018`, `CR-002` | Simpler than editable or internal-only notes, but limits note-management features. | Later design should not add comment editing/deletion unless a new change request approves it. |
| ARCH-DEC-006 | Keep dashboard architecture limited to simple summaries and recent reports. | The requirement asks for a simple dashboard, not analytics. | `FR-015`, `AC-021`, `AC-022`, `NFR-007` | Avoids advanced reporting capability, but still supports manager visibility. | Later UI/API design should keep dashboard data needs small and traceable. |
| ARCH-DEC-007 | Exclude deferred optional features from mandatory architecture dependencies. | Optional features are explicitly deferred and some may require extra services. | `NFR-007`, `BR-008`, `DR-001` to `DR-007` | Limits product capability, but protects scope and free-tier feasibility. | Architecture must not depend on object storage, email delivery, Google login, QR scanning, AI categorization, inventory, or vendor systems. |

## 9. Requirement-to-Architecture Mapping

### Functional Requirements

| Requirement | Architecture Mapping |
|---|---|
| FR-001 | `ARCH-COMP-001`, `ARCH-COMP-002`, `ARCH-COMP-003`, `ARCH-FLOW-001` |
| FR-002 | `ARCH-COMP-001`, `ARCH-COMP-002`, `ARCH-COMP-003`, `ARCH-FLOW-001` |
| FR-003 | `ARCH-COMP-001`, `ARCH-COMP-002`, `ARCH-COMP-003` |
| FR-004 | `ARCH-COMP-001`, `ARCH-COMP-002`, `ARCH-COMP-003` |
| FR-005 | `ARCH-COMP-001`, `ARCH-COMP-002`, `ARCH-COMP-003`, `ARCH-FLOW-004` |
| FR-006 | `ARCH-COMP-002`, `ARCH-COMP-004`, `ARCH-FLOW-002` |
| FR-007 | `ARCH-COMP-002`, `ARCH-COMP-004`, `ARCH-FLOW-002` |
| FR-008 | `ARCH-COMP-002`, `ARCH-COMP-004`, `ARCH-FLOW-002` |
| FR-009 | `ARCH-COMP-002`, `ARCH-COMP-004`, `ARCH-FLOW-002` |
| FR-010 | `ARCH-COMP-001`, `ARCH-COMP-002`, `ARCH-COMP-004`, `ARCH-FLOW-003` |
| FR-011 | `ARCH-COMP-002`, `ARCH-COMP-005`, `ARCH-FLOW-003` |
| FR-012 | `ARCH-COMP-002`, `ARCH-COMP-003`, `ARCH-FLOW-004`, `ARCH-DEC-005` |
| FR-013 | `ARCH-COMP-002`, `ARCH-COMP-003`, `ARCH-COMP-005`, `ARCH-FLOW-004` |
| FR-014 | `ARCH-COMP-002`, `ARCH-COMP-004`, `ARCH-COMP-005`, `ARCH-FLOW-005`, `ARCH-DEC-004` |
| FR-015 | `ARCH-COMP-001`, `ARCH-COMP-002`, `ARCH-COMP-003`, `ARCH-COMP-006`, `ARCH-FLOW-006`, `ARCH-DEC-006` |

### Non-Functional Requirements

| Requirement | Architecture Mapping |
|---|---|
| NFR-001 | `ARCH-COMP-001`, `ARCH-COMP-004` |
| NFR-002 | `ARCH-COMP-004`, `ARCH-DEC-003` |
| NFR-003 | `ARCH-COMP-002`, `ARCH-COMP-003`, `ARCH-COMP-005` |
| NFR-004 | `ARCH-COMP-002`, `ARCH-COMP-005`, `ARCH-DEC-004` |
| NFR-005 | `ARCH-COMP-007` |
| NFR-006 | `ARCH-COMP-001`, `ARCH-COMP-002`, `ARCH-COMP-003`, `ARCH-DEC-001`, `ARCH-DEC-002` |
| NFR-007 | `ARCH-DEC-007` |

### Business Rules

| Business Rule | Architecture Mapping |
|---|---|
| BR-001 | `ARCH-COMP-005`, `ARCH-DEC-004` |
| BR-002 | `ARCH-FLOW-001`, `ARCH-COMP-005` |
| BR-003 | `ARCH-COMP-004`, `ARCH-DEC-003` |
| BR-004 | `ARCH-COMP-004`, `ARCH-FLOW-003` |
| BR-005 | `ARCH-COMP-005`, `ARCH-DEC-004` |
| BR-006 | `ARCH-FLOW-004`, `ARCH-DEC-005` |
| BR-007 | `ARCH-FLOW-005`, `ARCH-DEC-004` |
| BR-008 | `ARCH-DEC-007` |

## 10. Risks, Constraints, and Open Design Questions

### Risks

| Risk ID | Risk | Related Items | Handling |
|---|---|---|---|
| ARCH-RISK-001 | Exact authentication/session mechanism is not decided. | `NFR-002`, `CR-003`, `OQD-001`, `OQD-002` | Keep architecture role-aware, but defer mechanism to later approved design/implementation decision. |
| ARCH-RISK-002 | Search/filter exact behavior may become too broad if not constrained later. | `FR-004`, `VAL-003` | Keep architecture generic; decide controls and matching behavior during UI/API design. |
| ARCH-RISK-003 | Database/API detail can expand beyond architecture scope. | Skill 06 boundary | Keep this document at component and flow level only. |
| ARCH-RISK-004 | Numeric performance/security targets remain undefined. | `NFR-001`, `OQD-005`, `SDN-V-004` | Do not invent targets; revisit during validation/testing if required. |
| ARCH-RISK-005 | Retention, deletion, or archival policy is not defined. | `OQD-006`, `SDN-V-005` | Avoid adding delete/archive behavior unless approved through a later change request. |
| ARCH-RISK-006 | Dashboard could expand into analytics or reporting scope. | `FR-015`, `NFR-007` | Keep dashboard architecture limited to counts and recent reports. |

### Constraints

| Constraint ID | Constraint |
|---|---|
| ARCH-CON-001 | Must use the planned React with TypeScript, Cloudflare Worker, and Cloudflare D1 stack unless a later approved change request changes the stack. |
| ARCH-CON-002 | Must not require paid services or non-approved optional Cloudflare features. |
| ARCH-CON-003 | Must not add Google login, object storage, email delivery, QR scanning, AI categorization, inventory, or vendor integration as mandatory architecture dependencies. |
| ARCH-CON-004 | Must keep traceability and evidence current as later design, issue, code, test, and deployment artifacts are created. |

### Open Design Questions

| Question ID | Question | Why It Remains Open | Later Stage |
|---|---|---|---|
| ARCH-OQ-001 | What exact simple auth/session mechanism will represent Reporter, Administrator, Technician, and Facility Manager? | `CR-003` approves simple role boundary but not the mechanism. | Database/API Design, UI Design, Implementation |
| ARCH-OQ-002 | How will role-sensitive actions be enforced in specific API and UI behavior? | Architecture identifies the boundary; detailed rules belong later. | Database/API Design, UI Design |
| ARCH-OQ-003 | What exact search/filter controls and matching behavior will be implemented? | Requirements approve search/filter but defer exact behavior. | Database/API Design, UI Design |
| ARCH-OQ-004 | What dashboard layout will present the approved summaries? | Architecture only defines summary data scope. | UI Design |
| ARCH-OQ-005 | Are measurable NFR targets needed before testing? | Validation left numeric targets pending. | Test Planning / Validation Change |
| ARCH-OQ-006 | Is retention, deletion, or archival policy needed? | Requirements do not define it. | Validation Change, if student requests it |

## 11. Traceability Update Notes

`docs/requirements/traceability.md` should be updated at this stage by filling architecture-level design IDs for active FR and NFR rows. Issue, code, and test columns must remain `Pending` because those stages have not started.

Architecture mapping should use only high-level IDs from this document:

- `ARCH-COMP-*` for components.
- `ARCH-FLOW-*` for data flows.
- `ARCH-DEC-*` for architecture decisions.

No database/API IDs, UI IDs, issue IDs, code references, test IDs, or deployment references should be added during this stage.

## 12. Human Review Notes

### Review Needed

The student should review:

- whether the architecture is simple enough for the class project;
- whether component responsibilities cover the approved requirements;
- whether role/auth handling is appropriately deferred without blocking architecture;
- whether optional features remain out of scope;
- whether open design questions are clear enough for Skill 07 Database/API Design.

### Current Review Status

| Item | Status | Notes |
|---|---|---|
| AI draft for Skill 06 | Reviewed | Created on branch `design/architecture`. |
| Human review by student | Approved | Student approved the architecture draft in chat and asked to continue documenting it in GitHub. |
| Scope change | None | No optional feature was added as mandatory architecture scope. |
| Code/test/deployment work | None | This stage produced documentation and evidence only. |
