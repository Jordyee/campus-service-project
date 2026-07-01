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
| DBAPI-01 | `docs/design/02-database-api.md` |
| UIDES-01 | `docs/design/03-ui.md` |

## 3. Functional Requirement Traceability

| Requirement | User Story | Acceptance Criteria | Business Rules | Evidence | Design | Issue | Code | Test | Status |
|---|---|---|---|---|---|---|---|---|---|
| FR-001 | US-001 | AC-001, AC-002 | BR-002 | SPEC-04, SPEC-05 | ARCH-COMP-001, ARCH-COMP-002, ARCH-COMP-003, ARCH-FLOW-001, DB-02, DB-04, API-01, UI-02, UI-FORM-01, UI-ACT-01 | #8, #9, #19 | `migrations/0001_foundation.sql`, `worker/foundation.ts`, `worker/status-history.ts`, `worker/requests.ts`, `worker/index.ts`, `public/index.html` | `tests/unit/foundation.spec.ts`, `tests/integration/foundation-schema.spec.ts`, `tests/unit/create-request.spec.ts`, `tests/integration/create-request-api.spec.ts`, `tests/unit/new-report-form.spec.ts` | Implemented for #9; final coverage pending #19 |
| FR-002 | US-001 | AC-001, AC-002 | BR-002 | INT-001 | ARCH-COMP-001, ARCH-COMP-002, ARCH-COMP-003, ARCH-FLOW-001, DB-01, DB-02, API-01, UI-02, UI-FORM-01 | #8, #9, #19 | `migrations/0001_foundation.sql`, `worker/foundation.ts`, `worker/requests.ts`, `worker/index.ts`, `public/index.html` | `tests/unit/foundation.spec.ts`, `tests/integration/foundation-schema.spec.ts`, `tests/unit/create-request.spec.ts`, `tests/integration/create-request-api.spec.ts`, `tests/unit/new-report-form.spec.ts` | Implemented for #9; final coverage pending #19 |
| FR-003 | US-002, US-003 | AC-003, AC-005, AC-006 | - | SPEC-04, SPEC-05 | ARCH-COMP-001, ARCH-COMP-002, ARCH-COMP-003, DB-02, DB-05, API-02, UI-03, UI-07, UI-ACT-02 | #10, #19 | `worker/requests.ts`, `worker/index.ts`, `public/index.html` | `tests/integration/list-requests-api.spec.ts`, `tests/unit/new-report-form.spec.ts` | Implemented for #10; final coverage pending #19 |
| FR-004 | US-003 | AC-005, AC-006 | - | SPEC-04, SPEC-05, INT-001 | ARCH-COMP-001, ARCH-COMP-002, ARCH-COMP-003, DB-02, DB-05, API-02, UI-03, UI-LIST-01, UI-STATE-02 | #10, #19 | `worker/requests.ts`, `worker/index.ts`, `public/index.html` | `tests/unit/create-request.spec.ts`, `tests/integration/list-requests-api.spec.ts`, `tests/unit/new-report-form.spec.ts` | Implemented for #10; final coverage pending #19 |
| FR-005 | US-002 | AC-003, AC-004 | BR-005 | SPEC-04, SPEC-05 | ARCH-COMP-001, ARCH-COMP-002, ARCH-COMP-003, ARCH-FLOW-004, DB-02, DB-03, DB-04, API-03, UI-04, UI-DETAIL-01 | #11, #19 | `worker/requests.ts`, `worker/index.ts`, `public/index.html` | `tests/integration/request-detail-api.spec.ts`, `tests/unit/new-report-form.spec.ts` | Implemented for #11; final coverage pending #19 |
| FR-006 | US-004 | AC-007, AC-008 | BR-003, BR-006 | SPEC-04, SPEC-05 | ARCH-COMP-002, ARCH-COMP-004, ARCH-FLOW-002, DB-02, DB-04, API-04, API-12, UI-05, UI-FORM-02, UI-ACT-04 | #12, #13, #19 | `worker/requests.ts`, `worker/index.ts`, `public/index.html` | `tests/integration/admin-review-api.spec.ts`, `tests/unit/new-report-form.spec.ts` | Implemented for #13; assignment pending #14 |
| FR-007 | US-005 | AC-009 | BR-003 | INT-001 | ARCH-COMP-002, ARCH-COMP-004, ARCH-FLOW-002, DB-02, DB-05, API-05, UI-05, UI-FORM-02, UI-ACT-05 | #13, #19 | `worker/requests.ts`, `worker/index.ts`, `public/index.html` | `tests/integration/admin-review-api.spec.ts`, `tests/unit/new-report-form.spec.ts` | Implemented for #13; final coverage pending #19 |
| FR-008 | US-005 | AC-010 | BR-003 | SPEC-04, SPEC-05, INT-001 | ARCH-COMP-002, ARCH-COMP-004, ARCH-FLOW-002, DB-02, DB-05, API-05, UI-05, UI-FORM-02, UI-ACT-05 | #13, #19 | `worker/requests.ts`, `worker/index.ts`, `public/index.html` | `tests/integration/admin-review-api.spec.ts`, `tests/unit/new-report-form.spec.ts` | Implemented for #13; final coverage pending #19 |
| FR-009 | US-006 | AC-011, AC-012 | BR-003 | SPEC-04, SPEC-05 | ARCH-COMP-002, ARCH-COMP-004, ARCH-FLOW-002, DB-01, DB-02, DB-04, API-06, API-14, UI-06, UI-FORM-03, UI-ACT-06 | #14, #19 | Pending | Pending | Issue planned |
| FR-010 | US-007 | AC-013, AC-014 | BR-004 | SPEC-04, SPEC-05 | ARCH-COMP-001, ARCH-COMP-002, ARCH-COMP-004, ARCH-FLOW-003, DB-01, DB-02, API-07, API-08, UI-07, UI-08, UI-ACT-07 | #15, #19 | Pending | Pending | Issue planned |
| FR-011 | US-008 | AC-015, AC-016 | BR-001, BR-004, BR-005 | SPEC-04, SPEC-05, INT-001 | ARCH-COMP-002, ARCH-COMP-005, ARCH-FLOW-003, DB-02, DB-04, API-09, UI-08, UI-FORM-05, UI-ACT-08, UI-ACT-09 | #16, #19 | Pending | Pending | Issue planned |
| FR-012 | US-004, US-009 | AC-008, AC-017, AC-018 | BR-006 | SPEC-04, SPEC-05, INT-001, CR-002 | ARCH-COMP-002, ARCH-COMP-003, ARCH-FLOW-004, ARCH-DEC-005, DB-03, API-12, UI-04, UI-FORM-04, UI-COMP-03, UI-ACT-10 | #12, #13, #16, #19 | `worker/requests.ts`, `worker/index.ts`, `public/index.html` | `tests/integration/comments-api.spec.ts`, `tests/integration/admin-review-api.spec.ts`, `tests/unit/new-report-form.spec.ts` | Implemented through #13; progress comment context pending #16 |
| FR-013 | US-008 | AC-015, AC-016 | BR-005 | SPEC-04, SPEC-05 | ARCH-COMP-002, ARCH-COMP-003, ARCH-COMP-005, ARCH-FLOW-004, DB-04, API-03, API-09, API-10, API-11, UI-04, UI-COMP-01, UI-COMP-02 | #8, #11, #16, #17, #19 | Foundation: `migrations/0001_foundation.sql`, `worker/status-history.ts`; detail display: `worker/requests.ts`, `public/index.html` | `tests/unit/foundation.spec.ts`, `tests/integration/foundation-schema.spec.ts`, `tests/integration/request-detail-api.spec.ts`, `tests/unit/new-report-form.spec.ts` | Foundation and detail display implemented; progress/close flows pending #16 and #17 |
| FR-014 | US-010 | AC-019, AC-020 | BR-003, BR-007 | SPEC-04, SPEC-05, INT-001, CR-001 | ARCH-COMP-002, ARCH-COMP-004, ARCH-COMP-005, ARCH-FLOW-005, ARCH-DEC-004, DB-02, DB-04, API-10, API-11, UI-06, UI-FORM-06, UI-ACT-11, UI-ACT-12 | #17, #19 | Pending | Pending | Issue planned |
| FR-015 | US-011 | AC-021, AC-022 | - | SPEC-04, SPEC-05, INT-001 | ARCH-COMP-001, ARCH-COMP-002, ARCH-COMP-003, ARCH-COMP-006, ARCH-FLOW-006, ARCH-DEC-006, DB-02, DB-05, API-13, UI-09, UI-STATE-03, UI-ACT-13 | #18, #19 | Pending | Pending | Issue planned |

## 4. Non-Functional Requirement Traceability

| Requirement | Related User Stories | Related AC | Evidence | Design | Issue | Code | Test | Status |
|---|---|---|---|---|---|---|---|---|
| NFR-001 | US-001 to US-011 | All relevant AC | SPEC-04, SPEC-03 | ARCH-COMP-001, ARCH-COMP-004, API-01 to API-13, VAL-DBAPI-001 to VAL-DBAPI-011, UI-01 to UI-10 | #9, #10, #11, #12, #13, #14, #15, #16, #17, #18, #19 | `public/index.html`, `worker/requests.ts`, `worker/index.ts`, `worker/foundation.ts` | `tests/unit/create-request.spec.ts`, `tests/integration/create-request-api.spec.ts`, `tests/integration/list-requests-api.spec.ts`, `tests/integration/request-detail-api.spec.ts`, `tests/integration/comments-api.spec.ts`, `tests/integration/admin-review-api.spec.ts`, `tests/unit/new-report-form.spec.ts` | Partially implemented through #13; remaining issue flows pending |
| NFR-002 | US-001 to US-011 | Role-sensitive AC | SPEC-04, SPEC-05, INT-001, CR-003 | ARCH-COMP-004, ARCH-DEC-003, DB-01, API-04 to API-14, UI-01, UI-ACT-01 to UI-ACT-13 | #8, #10, #12, #13, #14, #15, #16, #17, #18, #19 | `worker/foundation.ts`, `worker/requests.ts`, `migrations/0001_foundation.sql`, `public/index.html` | `tests/unit/foundation.spec.ts`, `tests/integration/foundation-schema.spec.ts`, `tests/integration/list-requests-api.spec.ts`, `tests/integration/comments-api.spec.ts`, `tests/integration/admin-review-api.spec.ts` | Implemented through #13 for current list/detail/comment/admin boundaries; remaining role-sensitive flows pending |
| NFR-003 | US-001 to US-010 | AC-001, AC-015, AC-016, AC-019, AC-020 | SPEC-04, SPEC-05 | ARCH-COMP-002, ARCH-COMP-003, ARCH-COMP-005, DB-02, DB-03, DB-04, DB-05, VAL-DBAPI-001 to VAL-DBAPI-011, UI-FORM-01 to UI-FORM-06, UI-STATE-04, UI-STATE-06 | #8, #9, #10, #11, #12, #13, #14, #15, #16, #17, #18, #19 | `migrations/0001_foundation.sql`, `worker/foundation.ts`, `worker/status-history.ts`, `worker/requests.ts` | `tests/unit/foundation.spec.ts`, `tests/integration/foundation-schema.spec.ts`, `tests/unit/create-request.spec.ts`, `tests/integration/create-request-api.spec.ts`, `tests/integration/list-requests-api.spec.ts`, `tests/integration/request-detail-api.spec.ts`, `tests/integration/comments-api.spec.ts`, `tests/integration/admin-review-api.spec.ts` | Implemented through #13; remaining issue flows pending |
| NFR-004 | US-008, US-010 | AC-015, AC-016, AC-019, AC-020 | SPEC-04, SPEC-05 | ARCH-COMP-002, ARCH-COMP-005, ARCH-DEC-004, DB-04, API-04, API-06, API-09, API-10, API-11, ERR-004, UI-COMP-01, UI-COMP-02, UI-ACT-04, UI-ACT-06, UI-ACT-08, UI-ACT-09, UI-ACT-11, UI-ACT-12 | #8, #11, #13, #14, #16, #17, #19 | `worker/status-history.ts`, `worker/foundation.ts`, `migrations/0001_foundation.sql`, `worker/requests.ts`, `public/index.html` | `tests/unit/foundation.spec.ts`, `tests/integration/foundation-schema.spec.ts`, `tests/integration/request-detail-api.spec.ts`, `tests/integration/admin-review-api.spec.ts`, `tests/unit/new-report-form.spec.ts` | Review status history implemented for #13; remaining update flows pending |
| NFR-005 | US-001 to US-011 | All relevant AC | SPEC-04, AGENTS.md, Skill 03 | ARCH-COMP-007, DB-01 to DB-05, API-01 to API-14, VAL-DBAPI-001 to VAL-DBAPI-011, UI-* traceability IDs | #8, #9, #10, #11, #12, #13, #14, #15, #16, #17, #18, #19 | `docs/requirements/traceability.md`, `docs/ai-native/08-loop-log.md`, `evidence/implementation-issue-8-ai-evidence.md`, `evidence/human-review-issue-8.md`, `evidence/implementation-issue-9-ai-evidence.md`, `evidence/human-review-issue-9.md`, `evidence/implementation-issue-10-ai-evidence.md`, `evidence/human-review-issue-10.md`, `evidence/implementation-issue-11-ai-evidence.md`, `evidence/human-review-issue-11.md`, `evidence/implementation-issue-12-ai-evidence.md`, `evidence/human-review-issue-12.md`, `evidence/implementation-issue-13-ai-evidence.md`, `evidence/human-review-issue-13.md` | `npm.cmd test -- --run` evidence in `docs/ai-native/08-loop-log.md` | Traceability updated through #13 |
| NFR-006 | US-001 to US-011 | All relevant AC | SPEC-04, README.md, AGENTS.md | ARCH-COMP-001, ARCH-COMP-002, ARCH-COMP-003, ARCH-DEC-001, ARCH-DEC-002, D1 migration draft, API Worker boundary, UI React TypeScript design assumption | #8, #9, #19 | `migrations/0001_foundation.sql`, `worker/index.ts`, `worker/requests.ts`, `public/index.html`, `wrangler.jsonc`, `vitest.config.mts` | `tests/integration/health.spec.ts`, `tests/integration/foundation-schema.spec.ts`, `tests/integration/create-request-api.spec.ts`, `tests/unit/new-report-form.spec.ts` | Implemented for #8 and #9 |
| NFR-007 | US-001 to US-011 | All relevant AC | SPEC-04, AGENTS.md, INT-001 | ARCH-DEC-007, DBAPI-CON-005, UI-CON-004, no optional-feature UI screens | #8, #9, #10, #11, #12, #13, #14, #15, #16, #17, #18, #19 | `migrations/0001_foundation.sql`, `worker/foundation.ts`, `worker/requests.ts`, `public/index.html` | `tests/unit/foundation.spec.ts`, `tests/integration/foundation-schema.spec.ts`, `tests/unit/create-request.spec.ts`, `tests/integration/create-request-api.spec.ts`, `tests/integration/list-requests-api.spec.ts`, `tests/integration/comments-api.spec.ts` | Implemented through #12; optional features still deferred |

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
- design and issue columns now include created IDs where available; code and test columns remain `Pending`;
- deferred topics remain out of required scope;
- `INT-001` is used only as student decision evidence, not as a real stakeholder interview;
- prioritization status has been added without creating design, issue, code, test, or deployment artifacts.

Validation/change update status:

- `docs/requirements/05-validation-change.md` has been approved by student review;
- `CR-001`, `CR-002`, and `CR-003` are approved clarifications;
- affected specification rows have been updated before moving to design;
- no optional feature has been added as required scope;
- design and issue columns now include created IDs where available; code and test columns remain `Pending`.

Student approved the Specification stage in chat on 2026-06-30 and requested merge to `development`. Student approved the Prioritization stage in chat on 2026-06-30 and allowed merge to `development`.

Architecture design update status:

- `docs/design/01-architecture.md` is drafted on branch `design/architecture`;
- architecture-level design IDs have been added to active FR and NFR rows;
- human review for architecture is approved by the student in chat;
- merge to `development` should happen only through the approved GitHub workflow.

Database/API design update status:

- `docs/design/02-database-api.md` is approved and merged to `development` according to the latest student status;
- database/API design IDs have been added to active FR and NFR rows;
- human review for database/API design is complete according to the latest student status;
- issue IDs have since been added by the Issue Planning stage; code and test columns remain `Pending`;
- no UI design, issue planning, tests, implementation code, migration execution, or deployment artifacts were created during this update.

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
- Issue IDs have since been added by the Issue Planning stage; code and test columns remain `Pending`.
- No database/API detail, UI design, issue planning, tests, code, or deployment artifacts were created during this update.

## 11. Database and API Design Traceability

This section records database/API-level mapping from `docs/design/02-database-api.md`. It does not create UI design, issue, code, test, migration execution, or deployment references.

### Database Design IDs

| Database ID | Description |
|---|---|
| DB-01 | `app_users` simple actor records for role-aware design. |
| DB-02 | `service_requests` main request record and current lifecycle state. |
| DB-03 | `request_comments` append-only comments/notes. |
| DB-04 | `request_status_history` append-only status history. |
| DB-05 | Query indexes and constraints for list, filter, detail, and dashboard support. |

### API Design IDs

| API ID | Description |
|---|---|
| API-01 | `POST /api/requests` create a submitted request. |
| API-02 | `GET /api/requests` list, search, and filter requests. |
| API-03 | `GET /api/requests/{id}` view request detail with comments and history. |
| API-04 | `POST /api/requests/{id}/review` move submitted request to review. |
| API-05 | `PATCH /api/requests/{id}/classification` set category and priority. |
| API-06 | `POST /api/requests/{id}/assignment` assign technician and move to assigned. |
| API-07 | `GET /api/technician/tasks` list assigned technician work. |
| API-08 | `POST /api/requests/{id}/accept` record technician acceptance. |
| API-09 | `PATCH /api/requests/{id}/work-status` update technician work status. |
| API-10 | `POST /api/requests/{id}/close` close a resolved request. |
| API-11 | `POST /api/requests/{id}/reopen` reopen resolved/closed request to under review. |
| API-12 | `POST /api/requests/{id}/comments` add append-only comment/note. |
| API-13 | `GET /api/dashboard/summary` return dashboard summaries. |
| API-14 | `GET /api/users?role=TECHNICIAN` return active technicians for assignment. |

### Database/API Constraints and Validation IDs

| ID | Description |
|---|---|
| VAL-DBAPI-001 to VAL-DBAPI-011 | Validation rules for required fields, enums, role-sensitive actions, lifecycle transitions, comments, and dashboard empty state. |
| ERR-001 to ERR-007 | Shared API error catalog for request format, forbidden action, not found, invalid transition, assignment conflict, validation, and internal failure. |
| DBAPI-CON-001 to DBAPI-CON-005 | D1/SQLite compatibility, Worker API boundary, no migration execution, no code/tests, and no optional paid services. |

Database/API update status:

- `docs/design/02-database-api.md` is approved and merged to `development` according to the latest student status.
- Functional and non-functional requirement rows now include database/API design IDs.
- Issue IDs have since been added by the Issue Planning stage; code and test columns remain `Pending`.
- No UI design, issue planning, tests, code, migration execution, or deployment artifacts were created during this update.

## 12. UI Design Traceability

This section records UI-level mapping from `docs/design/03-ui.md`. It does not create GitHub issues, code, tests, backend/API implementation, migration execution, or deployment references.

### UI Screens

| UI ID | Description |
|---|---|
| UI-01 | Role-Aware App Shell for current role context and navigation. |
| UI-02 | New Report Form for Reporter report creation. |
| UI-03 | Report List, Search, and Filters. |
| UI-04 | Report Detail with report information, assignment, comments/notes, and status history. |
| UI-05 | Admin Review and Classification Panel. |
| UI-06 | Admin Assignment and Closure Panel. |
| UI-07 | Technician Task List. |
| UI-08 | Technician Task Detail and Progress Panel. |
| UI-09 | Facility Manager Dashboard. |
| UI-10 | Shared Feedback and State Views. |

### UI Forms, Components, Actions, and States

| UI ID | Description |
|---|---|
| UI-FORM-01 to UI-FORM-06 | New report, admin classification, assignment, comment/note, technician progress, and close/reopen forms. |
| UI-LIST-01 | Shared report list with search and filters for status, category, priority, location, and keyword. |
| UI-DETAIL-01 | Report detail layout. |
| UI-COMP-01 | Lifecycle indicator for Submitted -> Under Review -> Assigned -> In Progress -> Resolved -> Closed. |
| UI-COMP-02 | Read-only status history timeline. |
| UI-COMP-03 | Append-only comments/notes timeline. |
| UI-ACT-01 to UI-ACT-13 | Role-based UI actions for creation, list/detail viewing, review, classification, assignment, technician progress, comments/notes, close/reopen, and dashboard. |
| UI-STATE-01 to UI-STATE-09 | Loading, empty, validation, forbidden, invalid transition, not found, success, and server error states. |

UI design update status:

- `docs/design/03-ui.md` is drafted on branch `design/ui`.
- Functional and non-functional requirement rows now include UI design IDs.
- Issue IDs have been added by the Issue Planning stage.
- Code and test columns remain `Pending`.
- No GitHub issues, tests, React/TypeScript implementation, backend/API implementation, migration execution, or deployment artifacts were created during this update.

## 13. Issue Planning Traceability

This section records GitHub Issues created during the Issue Planning stage. It does not create code, tests, migrations, backend/API implementation, React/TypeScript implementation, or deployment artifacts.

### Issue Catalog

| Issue | Execution Mode | Title | Primary Coverage |
|---|---|---|---|
| #8 | HITL | Implement app data model, role boundary, and lifecycle foundation | Foundation for D1 data model, simple role boundary, lifecycle constants/history, shared API errors, and no optional services. |
| #9 | AFK | Build reporter service request creation flow | `FR-001`, `FR-002`, `US-001`, `AC-001`, `AC-002`, `API-01`, `UI-02`. |
| #10 | AFK | Build report list, search, and filters | `FR-003`, `FR-004`, `US-002`, `US-003`, `AC-003`, `AC-005`, `AC-006`, `API-02`, `UI-03`. |
| #11 | AFK | Build report detail with status history display | `FR-005`, `FR-013`, `US-002`, `US-008`, `AC-003`, `AC-004`, `AC-015`, `AC-016`, `API-03`, `UI-04`. |
| #12 | AFK | Add append-only comments and notes | `FR-012`, `US-004`, `US-009`, `AC-008`, `AC-017`, `AC-018`, `CR-002`, `API-12`, `UI-COMP-03`. |
| #13 | AFK | Add admin review, category, and priority flow | `FR-006`, `FR-007`, `FR-008`, `US-004`, `US-005`, `AC-007` to `AC-010`, `API-04`, `API-05`, `UI-05`. |
| #14 | AFK | Add technician assignment flow | `FR-009`, `US-006`, `AC-011`, `AC-012`, `API-06`, `API-14`, `UI-06`. |
| #15 | AFK | Build technician task list and acceptance flow | `FR-010`, `US-007`, `AC-013`, `AC-014`, `API-07`, `API-08`, `UI-07`, `UI-08`. |
| #16 | AFK | Add technician progress and resolved status flow | `FR-011`, `FR-013`, `US-008`, `AC-015`, `AC-016`, `API-09`, `UI-ACT-08`, `UI-ACT-09`. |
| #17 | AFK | Add admin close and reopen flow | `FR-014`, `US-010`, `AC-019`, `AC-020`, `CR-001`, `API-10`, `API-11`, `UI-ACT-11`, `UI-ACT-12`. |
| #18 | AFK | Build facility manager dashboard summary | `FR-015`, `US-011`, `AC-021`, `AC-022`, `API-13`, `UI-09`. |
| #19 | HITL | Add automated test coverage and implementation traceability updates | `NFR-005`, all active FR/US/AC, at least 20 automated tests, and final code/test traceability after implementation. |

### Issue Planning Update Status

- GitHub Issues #8 to #19 were created directly in `Jordyee/campus-service-project`.
- Execution mode was added to GitHub Issues #8 to #19.
- Functional and non-functional requirement rows now include issue IDs.
- Code and test columns remain `Pending` until implementation/testing stages produce real references.
- No source code, tests, migrations, backend/API implementation, React/TypeScript implementation, or deployment artifacts were created during issue planning.
