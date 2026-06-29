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

## 3. Functional Requirement Traceability

| Requirement | User Story | Acceptance Criteria | Business Rules | Evidence | Design | Issue | Code | Test | Status |
|---|---|---|---|---|---|---|---|---|---|
| FR-001 | US-001 | AC-001, AC-002 | BR-002 | SPEC-04, SPEC-05 | Pending | Pending | Pending | Pending | Specified |
| FR-002 | US-001 | AC-001, AC-002 | BR-002 | INT-001 | Pending | Pending | Pending | Pending | Specified |
| FR-003 | US-002, US-003 | AC-003, AC-005, AC-006 | - | SPEC-04, SPEC-05 | Pending | Pending | Pending | Pending | Specified |
| FR-004 | US-003 | AC-005, AC-006 | - | SPEC-04, SPEC-05, INT-001 | Pending | Pending | Pending | Pending | Specified |
| FR-005 | US-002 | AC-003, AC-004 | BR-005 | SPEC-04, SPEC-05 | Pending | Pending | Pending | Pending | Specified |
| FR-006 | US-004 | AC-007, AC-008 | BR-003, BR-006 | SPEC-04, SPEC-05 | Pending | Pending | Pending | Pending | Specified |
| FR-007 | US-005 | AC-009 | BR-003 | INT-001 | Pending | Pending | Pending | Pending | Specified |
| FR-008 | US-005 | AC-010 | BR-003 | SPEC-04, SPEC-05, INT-001 | Pending | Pending | Pending | Pending | Specified |
| FR-009 | US-006 | AC-011, AC-012 | BR-003 | SPEC-04, SPEC-05 | Pending | Pending | Pending | Pending | Specified |
| FR-010 | US-007 | AC-013, AC-014 | BR-004 | SPEC-04, SPEC-05 | Pending | Pending | Pending | Pending | Specified |
| FR-011 | US-008 | AC-015, AC-016 | BR-001, BR-004, BR-005 | SPEC-04, SPEC-05, INT-001 | Pending | Pending | Pending | Pending | Specified |
| FR-012 | US-004, US-009 | AC-008, AC-017, AC-018 | BR-006 | SPEC-04, SPEC-05, INT-001 | Pending | Pending | Pending | Pending | Specified |
| FR-013 | US-008 | AC-015, AC-016 | BR-005 | SPEC-04, SPEC-05 | Pending | Pending | Pending | Pending | Specified |
| FR-014 | US-010 | AC-019, AC-020 | BR-003, BR-007 | SPEC-04, SPEC-05, INT-001 | Pending | Pending | Pending | Pending | Specified |
| FR-015 | US-011 | AC-021, AC-022 | - | SPEC-04, SPEC-05, INT-001 | Pending | Pending | Pending | Pending | Specified |

## 4. Non-Functional Requirement Traceability

| Requirement | Related User Stories | Related AC | Evidence | Design | Issue | Code | Test | Status |
|---|---|---|---|---|---|---|---|---|
| NFR-001 | US-001 to US-011 | All relevant AC | SPEC-04, SPEC-03 | Pending | Pending | Pending | Pending | Specified |
| NFR-002 | US-001 to US-011 | Role-sensitive AC | SPEC-04, SPEC-05, INT-001 | Pending | Pending | Pending | Pending | Specified |
| NFR-003 | US-001 to US-010 | AC-001, AC-015, AC-016, AC-019, AC-020 | SPEC-04, SPEC-05 | Pending | Pending | Pending | Pending | Specified |
| NFR-004 | US-008, US-010 | AC-015, AC-016, AC-019, AC-020 | SPEC-04, SPEC-05 | Pending | Pending | Pending | Pending | Specified |
| NFR-005 | US-001 to US-011 | All relevant AC | SPEC-04, AGENTS.md, Skill 03 | Pending | Pending | Pending | Pending | Specified |
| NFR-006 | US-001 to US-011 | All relevant AC | SPEC-04, README.md, AGENTS.md | Pending | Pending | Pending | Pending | Specified |
| NFR-007 | US-001 to US-011 | All relevant AC | SPEC-04, AGENTS.md, INT-001 | Pending | Pending | Pending | Pending | Specified |

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

## 6. Traceability Maintenance Notes

| Stage | Expected Update |
|---|---|
| Prioritization | Add priority and conflict-resolution status for each requirement. |
| Validation and Change | Add validation result, change request links, and approved/rejected status changes. |
| Architecture Design | Fill design IDs and architecture components. |
| Database and API Design | Add database/API design IDs where relevant. |
| UI Design | Add UI flow and screen IDs where relevant. |
| Issue Planning | Add GitHub issue IDs. |
| Implementation | Add code file/module references. |
| Testing | Add unit, integration, and acceptance test IDs. |
| Deployment | Add deployment evidence and release references where applicable. |

## 7. Human Review Notes

Status: Pending student review.

Reviewer should confirm that:

- every `FR-*` in `03-specification.md` appears in this traceability file;
- design, issue, code, and test columns stay `Pending` until those stages exist;
- deferred topics remain out of required scope;
- `INT-001` is used only as student decision evidence, not as a real stakeholder interview.
