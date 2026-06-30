# Requirements Traceability Matrix

## 1. Purpose

This file starts project traceability from requirements to later design, issues, code, and tests. At the Specification stage, design, issues, code, and tests are intentionally pending because those stages have not been approved or created yet.

## 2. Sources

| ID | Source |
|---|---|
| SPEC-01 | `docs/requirements/03-specification.md` |
| SPEC-02 | `docs/requirements/02-elicitation.md`, especially `INT-001` |
| SPEC-03 | `docs/requirements/01-inception-stakeholder.md` |
| SPEC-04 | `AI_Assisted_Campus_Service_Project.md` |
| SPEC-05 | `CASE.md` |
| ARCH-01 | `docs/design/01-architecture.md` |

## 3. Functional Requirement Traceability

| Requirement | User Story | Acceptance Criteria | Business Rules | Evidence | Design | Issue | Code | Test | Status |
|---|---|---|---|---|---|---|---|---|---|
| FR-001 | US-001 | AC-001, AC-002 | BR-002 | SPEC-04, SPEC-05 | ARCH-COMP-001, ARCH-COMP-002, ARCH-COMP-003, ARCH-FLOW-001 | Pending | Pending | Pending | Architecture mapped |
| FR-002 | US-001 | AC-001, AC-002 | BR-002 | INT-001 | ARCH-COMP-001, ARCH-COMP-002, ARCH-COMP-003, ARCH-FLOW-001 | Pending | Pending | Pending | Architecture mapped |
| FR-003 | US-002, US-003 | AC-003, AC-005, AC-006 | - | SPEC-04, SPEC-05 | ARCH-COMP-001, ARCH-COMP-002, ARCH-COMP-003 | Pending | Pending | Pending | Architecture mapped |
| FR-004 | US-003 | AC-005, AC-006 | - | SPEC-04, SPEC-05, INT-001 | ARCH-COMP-001, ARCH-COMP-002, ARCH-COMP-003 | Pending | Pending | Pending | Architecture mapped |
| FR-005 | US-002 | AC-003, AC-004 | BR-005 | SPEC-04, SPEC-05 | ARCH-COMP-001, ARCH-COMP-002, ARCH-COMP-003, ARCH-FLOW-004 | Pending | Pending | Pending | Architecture mapped |
| FR-006 | US-004 | AC-007, AC-008 | BR-003, BR-006 | SPEC-04, SPEC-05 | ARCH-COMP-002, ARCH-COMP-004, ARCH-FLOW-002 | Pending | Pending | Pending | Architecture mapped |
| FR-007 | US-005 | AC-009 | BR-003 | INT-001 | ARCH-COMP-002, ARCH-COMP-004, ARCH-FLOW-002 | Pending | Pending | Pending | Architecture mapped |
| FR-008 | US-005 | AC-010 | BR-003 | SPEC-04, SPEC-05, INT-001 | ARCH-COMP-002, ARCH-COMP-004, ARCH-FLOW-002 | Pending | Pending | Pending | Architecture mapped |
| FR-009 | US-006 | AC-011, AC-012 | BR-003 | SPEC-04, SPEC-05 | ARCH-COMP-002, ARCH-COMP-004, ARCH-FLOW-002 | Pending | Pending | Pending | Architecture mapped |
| FR-010 | US-007 | AC-013, AC-014 | BR-004 | SPEC-04, SPEC-05 | ARCH-COMP-001, ARCH-COMP-002, ARCH-COMP-004, ARCH-FLOW-003 | Pending | Pending | Pending | Architecture mapped |
| FR-011 | US-008 | AC-015, AC-016 | BR-001, BR-004, BR-005 | SPEC-04, SPEC-05, INT-001 | ARCH-COMP-002, ARCH-COMP-005, ARCH-FLOW-003 | Pending | Pending | Pending | Architecture mapped |
| FR-012 | US-004, US-009 | AC-008, AC-017, AC-018 | BR-006 | SPEC-04, SPEC-05, INT-001, CR-002 | ARCH-COMP-002, ARCH-COMP-003, ARCH-FLOW-004, ARCH-DEC-005 | Pending | Pending | Pending | Architecture mapped |
| FR-013 | US-008 | AC-015, AC-016 | BR-005 | SPEC-04, SPEC-05 | ARCH-COMP-002, ARCH-COMP-003, ARCH-COMP-005, ARCH-FLOW-004 | Pending | Pending | Pending | Architecture mapped |
| FR-014 | US-010 | AC-019, AC-020 | BR-003, BR-007 | SPEC-04, SPEC-05, INT-001, CR-001 | ARCH-COMP-002, ARCH-COMP-004, ARCH-COMP-005, ARCH-FLOW-005, ARCH-DEC-004 | Pending | Pending | Pending | Architecture mapped |
| FR-015 | US-011 | AC-021, AC-022 | - | SPEC-04, SPEC-05, INT-001 | ARCH-COMP-001, ARCH-COMP-002, ARCH-COMP-003, ARCH-COMP-006, ARCH-FLOW-006, ARCH-DEC-006 | Pending | Pending | Pending | Architecture mapped |

## 4. Non-Functional Requirement Traceability

| Requirement | Related User Stories | Related AC | Evidence | Design | Issue | Code | Test | Status |
|---|---|---|---|---|---|---|---|---|
| NFR-001 | US-001 to US-011 | All relevant AC | SPEC-04, SPEC-03 | ARCH-COMP-001, ARCH-COMP-004 | Pending | Pending | Pending | Architecture mapped |
| NFR-002 | US-001 to US-011 | Role-sensitive AC | SPEC-04, SPEC-05, INT-001, CR-003 | ARCH-COMP-004, ARCH-DEC-003 | Pending | Pending | Pending | Architecture mapped |
| NFR-003 | US-001 to US-010 | AC-001, AC-015, AC-016, AC-019, AC-020 | SPEC-04, SPEC-05 | ARCH-COMP-002, ARCH-COMP-003, ARCH-COMP-005 | Pending | Pending | Pending | Architecture mapped |
| NFR-004 | US-008, US-010 | AC-015, AC-016, AC-019, AC-020 | SPEC-04, SPEC-05 | ARCH-COMP-002, ARCH-COMP-005, ARCH-DEC-004 | Pending | Pending | Pending | Architecture mapped |
| NFR-005 | US-001 to US-011 | All relevant AC | SPEC-04, AGENTS.md, Skill 03 | ARCH-COMP-007 | Pending | Pending | Pending | Architecture mapped |
| NFR-006 | US-001 to US-011 | All relevant AC | SPEC-04, README.md, AGENTS.md | ARCH-COMP-001, ARCH-COMP-002, ARCH-COMP-003, ARCH-DEC-001, ARCH-DEC-002 | Pending | Pending | Pending | Architecture mapped |
| NFR-007 | US-001 to US-011 | All relevant AC | SPEC-04, AGENTS.md, INT-001 | ARCH-DEC-007 | Pending | Pending | Pending | Architecture mapped |

## 5. Deferred Topic Traceability

| Deferred ID | Topic | Evidence | Current Status | Later Action |
|---|---|---|---|---|
| DR-001 | Upload photo | SPEC-04 | Deferred / not required | Only revisit through explicit scope approval or change request. |
| DR-002 | Email notification | SPEC-04, INT-001 | Deferred / not required | Only revisit through explicit scope approval or change request. |
| DR-003 | Google login | SPEC-04, INT-001 | Deferred / not required | Only revisit through explicit scope approval or change request. |
| DR-004 | Room QR code | SPEC-04 | Deferred / not required | Only revisit through explicit scope approval or change request. |
| DR-005 | AI categorization | SPEC-04 | Deferred / not required | Only revisit through explicit scope approval or change request. |
| DR-006 | Spare-part inventory | SPEC-04 | Deferred / not required | Only revisit through explicit scope approval or change request. |
| DR-007 | Vendor management | SPEC-04 | Deferred / not required | Only revisit through explicit scope approval or change request. |

## 6. Prioritization Traceability

This section records the priority assigned in `docs/requirements/04-prioritization.md`. It does not create design, issue, code, or test artifacts.

### Functional Requirement Priorities

| Requirement | MoSCoW | Value | Risk/Readiness | Priority Status |
|---|---|---|---|---|
| FR-001 | Must | High | Low | Prioritized |
| FR-002 | Must | High | Medium | Prioritized |
| FR-003 | Must | High | Low | Prioritized |
| FR-004 | Must | Medium | Medium | Prioritized |
| FR-005 | Must | High | Low | Prioritized |
| FR-006 | Must | High | Low | Prioritized |
| FR-007 | Must | Medium | Medium | Prioritized |
| FR-008 | Must | High | Low | Prioritized |
| FR-009 | Must | High | Low | Prioritized |
| FR-010 | Must | Medium | Low | Prioritized |
| FR-011 | Must | High | Low | Prioritized |
| FR-012 | Must | Medium | Medium | Prioritized |
| FR-013 | Must | High | Low | Prioritized |
| FR-014 | Must | High | Medium | Prioritized |
| FR-015 | Must | Medium | Medium | Prioritized |

### Non-Functional Requirement Priorities

| Requirement | MoSCoW | Value | Risk/Readiness | Priority Status |
|---|---|---|---|---|
| NFR-001 | Must | High | Low | Prioritized |
| NFR-002 | Must | High | High | Prioritized |
| NFR-003 | Must | High | Low | Prioritized |
| NFR-004 | Must | High | Low | Prioritized |
| NFR-005 | Must | High | Low | Prioritized |
| NFR-006 | Must | High | Low | Prioritized |
| NFR-007 | Must | High | Low | Prioritized |

### Deferred Topic Priorities

| Deferred ID | MoSCoW | Priority Status | Notes |
|---|---|---|---|
| DR-001 | Won't for now | Deferred | Upload photo remains optional/not required. |
| DR-002 | Won't for now | Deferred | Email notification remains optional/not required. |
| DR-003 | Won't for now | Deferred | Google login remains optional/not required. |
| DR-004 | Won't for now | Deferred | Room QR code remains optional/not required. |
| DR-005 | Won't for now | Deferred | AI categorization remains optional/not required. |
| DR-006 | Won't for now | Deferred | Spare-part inventory remains optional/not required. |
| DR-007 | Won't for now | Deferred | Vendor management remains optional/not required. |

### Priority Conflict Status

| Conflict ID | Related Items | Status |
|---|---|---|
| PC-001 | FR-001 to FR-015, NFR-001 to NFR-007, BR-001 to BR-008 | Approved by student: all approved baseline requirements are treated as `Must`. |
| PC-002 | NFR-002, OQD-001, OQD-002 | Carried forward as readiness risk; no auth design decision made. |
| PC-003 | FR-015, US-011, OQD-004 | Resolved for prioritization: simple dashboard only. |
| PC-004 | BR-006, FR-012 | Resolved for prioritization: no duplicate merge feature added. |

## 7. Traceability Maintenance Notes

| Stage | Expected Update |
|---|---|
| Prioritization | Added priority and conflict-resolution status in this file. |
| Validation and Change | Add validation result, change request links, and approved/rejected status changes. |
| Architecture Design | Fill design IDs and architecture components. |
| Database and API Design | Add database/API design IDs where relevant. |
| UI Design | Add UI flow and screen IDs where relevant. |
| Issue Planning | Add GitHub issue IDs. |
| Implementation | Add code file/module references. |
| Testing | Add unit, integration, and acceptance test IDs. |
| Deployment | Add deployment evidence and release references where applicable. |

## 8. Validation and Change Traceability

This section records the validation status from `docs/requirements/05-validation-change.md`. It does not approve any change request and does not create design, issue, code, or test artifacts.

### Validation Summary

| Validation Area | Related Items | Result | Notes |
|---|---|---|---|
| Core report intake | `FR-001`, `FR-002`, `US-001`, `AC-001`, `AC-002` | Pass | Traceability and acceptance criteria are clear enough for later stages. |
| Report visibility | `FR-003`, `FR-005`, `US-002`, `AC-003`, `AC-004` | Pass | List/detail behavior is traceable to required case features. |
| Search and filter | `FR-004`, `US-003`, `AC-005`, `AC-006` | Partial | Requirement is valid; exact controls and matching behavior remain design detail. |
| Admin review, category, priority, assignment | `FR-006` to `FR-009`, `US-004` to `US-006`, `AC-007` to `AC-012` | Pass | Baseline is consistent with the approved workflow and one-level Administrator scope. |
| Technician work and status history | `FR-010`, `FR-011`, `FR-013`, `US-007`, `US-008`, `AC-013` to `AC-016` | Pass | Technician progression and history storage are testable at requirements level. |
| Comments and notes | `FR-012`, `US-009`, `AC-017`, `AC-018` | Pass | `CR-002` approved append-only comments/notes visible to authorized users who can view the report. |
| Close and reopen | `FR-014`, `US-010`, `AC-019`, `AC-020`, `BR-007` | Pass | `CR-001` approved reopen to Under Review with history reason/context. |
| Simple dashboard | `FR-015`, `US-011`, `AC-021`, `AC-022` | Pass | Scope remains limited to summary counts and recent reports. |
| Non-functional requirements | `NFR-001` to `NFR-007` | Partial | `CR-003` approved a simple educational role boundary; exact auth/session mechanism and numeric NFR targets remain later decisions. |
| Business rules | `BR-001` to `BR-008` | Pass | Rules align with the approved lifecycle and deferred optional scope. |
| Deferred topics | `DR-001` to `DR-007` | Pass | Optional topics remain deferred and not required. |

### Change Requests

| Change Request | Status | Baseline Affected | Traceability Impact |
|---|---|---|---|
| CR-001 | Approved by student on 2026-06-30 | `FR-014`, `US-010`, `AC-020`, `BR-001`, `BR-007` | Specification updated: reopen returns to Under Review and history records reason/context. |
| CR-002 | Approved by student on 2026-06-30 | `FR-012`, `US-009`, `AC-017`, `AC-018`, `NFR-002`, `OQD-003` | Specification updated: comments/notes are append-only and visible to authorized users who can view the report. |
| CR-003 | Approved by student on 2026-06-30 | `NFR-002`, `BR-003`, `BR-004`, role-sensitive AC, `OQD-001`, `OQD-002` | Specification updated: simple educational role boundary approved; Google login remains deferred. |

### Student Decisions

| Decision ID | Related Items | Status |
|---|---|---|
| SDN-V-001 | `CR-001` reopen target clarification | Complete |
| SDN-V-002 | `CR-002` comments/notes visibility clarification | Complete |
| SDN-V-003 | `CR-003` simple role/auth boundary clarification | Complete |
| SDN-V-004 | Numeric NFR target decision | Pending |
| SDN-V-005 | Retention/deletion/archive policy decision | Pending |

## 9. Human Review Notes

Status: Prioritization update approved by student on 2026-06-30.

Review outcome:

- every `FR-*` in `03-specification.md` appears in this traceability file;
- design, issue, code, and test columns stay `Pending` until those stages exist;
- deferred topics remain out of required scope;
- `INT-001` is used only as student decision evidence, not as a real stakeholder interview;
- prioritization status has been added without creating design, issue, code, test, or deployment artifacts.

Validation/change update status:

- `docs/requirements/05-validation-change.md` has been approved by student review;
- `CR-001`, `CR-002`, and `CR-003` are approved clarifications;
- affected specification rows have been updated before moving to design;
- no optional feature has been added as required scope;
- design, issue, code, and test columns remain `Pending`.

Student approved the Specification stage in chat on 2026-06-30 and requested merge to `development`. Student approved the Prioritization stage in chat on 2026-06-30 and allowed merge to `development`.

Architecture design update status:

- `docs/design/01-architecture.md` is drafted on branch `design/architecture`;
- architecture-level design IDs have been added to active FR and NFR rows;
- human review for architecture is approved by the student in chat;
- merge to `development` should happen only through the approved GitHub workflow.

## 10. Architecture Design Traceability

This section records architecture-level mapping from `docs/design/01-architecture.md`. It does not create database/API design, UI design, issue, code, test, or deployment references.

### Architecture Components

| Architecture ID | Description |
|---|---|
| ARCH-COMP-001 | React TypeScript Frontend |
| ARCH-COMP-002 | Cloudflare Worker Backend Boundary |
| ARCH-COMP-003 | Cloudflare D1 Persistence Layer |
| ARCH-COMP-004 | Role and Action Boundary |
| ARCH-COMP-005 | Lifecycle and Audit Concern |
| ARCH-COMP-006 | Dashboard Summary Concern |
| ARCH-COMP-007 | Traceability and Evidence Artifacts |

### Architecture Flows

| Architecture ID | Description |
|---|---|
| ARCH-FLOW-001 | Create Report |
| ARCH-FLOW-002 | Review, Category, Priority, and Assignment |
| ARCH-FLOW-003 | Technician Progress and Resolution |
| ARCH-FLOW-004 | Comments, Notes, and Status History |
| ARCH-FLOW-005 | Close and Reopen |
| ARCH-FLOW-006 | Dashboard Summary |

### Architecture Decisions

| Architecture ID | Description |
|---|---|
| ARCH-DEC-001 | Use React with TypeScript, Cloudflare Worker, and Cloudflare D1 as the baseline architecture. |
| ARCH-DEC-002 | Use one Cloudflare Worker as the backend application boundary for the initial project. |
| ARCH-DEC-003 | Keep role handling as a simple educational role boundary and defer exact auth/session mechanism. |
| ARCH-DEC-004 | Treat lifecycle transitions and status history as backend-controlled concerns. |
| ARCH-DEC-005 | Treat comments/notes as append-only report context visible to authorized users who can view the report. |
| ARCH-DEC-006 | Keep dashboard architecture limited to simple summaries and recent reports. |
| ARCH-DEC-007 | Exclude deferred optional features from mandatory architecture dependencies. |

Architecture update status:

- `docs/design/01-architecture.md` is approved by student review.
- Functional and non-functional requirement rows now include architecture-level design IDs.
- Issue, code, and test columns remain `Pending`.
- No database/API detail, UI design, issue planning, tests, code, or deployment artifacts were created during this update.
