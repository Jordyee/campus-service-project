# Validation dan Change

## 1. Sources Read

| ID | Source | Notes |
|---|---|---|
| SRC-01 | `AGENTS.md` | Project rules, source-of-truth order, branch rules, evidence rules, and stage boundaries. |
| SRC-02 | `skills/jordy-workflows/github-workflow-jordy.md` | Branch, worktree, review, merge, handoff, and quality-check workflow. |
| SRC-03 | `AI_Assisted_Campus_Service_Project.md` | Assignment scope, case description, required workflow, optional features, deliverables, and AI evidence expectations. |
| SRC-04 | `README.md` | Repository purpose, planned stack, deliverables, and repository structure. |
| SRC-05 | `CASE.md` | Compact case summary, confirmed actors, core workflow, and required feature list. |
| SRC-06 | `skills/05-validation-change/SKILL.md` | Validation method, change request rules, output structure, and boundaries for this stage. |
| SRC-07 | `docs/requirements/01-inception-stakeholder.md` | Approved stakeholder discovery, scope boundaries, assumptions, open questions, and risks. |
| SRC-08 | `docs/requirements/02-elicitation.md` | Approved elicitation decisions, especially `INT-001`. |
| SRC-09 | `docs/requirements/03-specification.md` | Approved requirements baseline: FR, NFR, BR, US, AC, deferred topics, and open details. |
| SRC-10 | `docs/requirements/04-prioritization.md` | Approved priority baseline, value-risk notes, and deferred topic handling. |
| SRC-11 | `docs/requirements/traceability.md` | Current requirement-to-story-to-AC and prioritization traceability baseline. |
| SRC-12 | `evidence/requirements-inception-ai-evidence.md` | AI evidence and human review status for Skill 01. |
| SRC-13 | `evidence/requirements-elicitation-ai-evidence.md` | AI evidence and human review status for Skill 02. |
| SRC-14 | `evidence/requirements-specification-ai-evidence.md` | AI evidence and human review status for Skill 03. |
| SRC-15 | `evidence/requirements-prioritization-ai-evidence.md` | AI evidence and human review status for Skill 04. |

## 2. Review Status and Boundary

This document validates the approved requirements baseline and records approved clarification change requests from student review. It does not add mandatory optional features, create design, create database/API design, create UI design, create GitHub issues, create tests, write code, or deploy.

| Item | Status | Notes |
|---|---|---|
| Inception | Approved | Approval recorded in SRC-07 and SRC-12. |
| Elicitation | Approved | Approval recorded in SRC-08 and SRC-13. |
| Specification | Approved | Approval recorded in SRC-09 and SRC-14. |
| Prioritization | Approved | Approval recorded in SRC-10 and SRC-15. |
| Validation/change review | Approved by student on 2026-06-30 | Student approved the validation/change artifact and asked the AI assistant to prepare it before the next stage. |
| Change requests | Approved by student on 2026-06-30 | `CR-001`, `CR-002`, and `CR-003` were approved and the affected requirements baseline was updated. |

### Boundary Confirmation

- Approved baseline requirements are changed only through approved `CR-*` clarifications recorded in this document and applied to `docs/requirements/03-specification.md`.
- Deferred topics `DR-001` to `DR-007` remain out of required scope.
- Approved change requests clarify existing baseline requirements without adding optional features.
- Role/authentication technical mechanism, measurable NFR targets, and retention/deletion policy are not decided here.

## 3. Validation Method

Validation uses the matrix required by Skill 05.

| Field | Meaning |
|---|---|
| Validation ID | `VAL-*` |
| Reviewed item | `FR-*`, `NFR-*`, `BR-*`, `US-*`, `AC-*`, priority item, `DR-*`, or `OQD-*` |
| Check type | Traceability, Consistency, Ambiguity, Readiness, Testability, or Priority-risk alignment |
| Result | Pass, Partial, Blocked, Risk, or Not testable yet |
| Evidence basis | Source IDs and baseline item IDs |
| Required action | No action, Clarify, Defer, Student approval needed, or Change request candidate |

`Pass` means the item is clear enough and testable at the current requirements level. `Partial` or `Risk` means the item can remain in the baseline, but later work needs a documented decision or careful handling.

## 4. Validation Inventory

| Inventory Area | Items | Validation Handling |
|---|---|---|
| Functional requirements | `FR-001` to `FR-015` | Validate evidence, clarity, testability, traceability, and priority alignment. |
| Non-functional requirements | `NFR-001` to `NFR-007` | Validate as quality concerns; no invented numeric targets. |
| Business rules | `BR-001` to `BR-008` | Validate lifecycle and role consistency. |
| User stories | `US-001` to `US-011` | Validate mapping to FR and AC. |
| Acceptance criteria | `AC-001` to `AC-022` | Validate testability at acceptance level. |
| Deferred topics | `DR-001` to `DR-007` | Validate as deferred; do not promote into active scope. |
| Open details | `OQD-001` to `OQD-006` | Treat as gaps or later decisions, not AI answers. |
| Priorities | MoSCoW, value, risk/readiness | Validate alignment between priority, readiness, and stage boundary. |

## 5. Validation Matrix

| Validation ID | Reviewed item | Check type | Result | Evidence basis | Finding | Required action |
|---|---|---|---|---|---|---|
| VAL-001 | `FR-001`, `FR-002`, `US-001`, `AC-001`, `AC-002` | Traceability | Pass | SRC-03, SRC-05, SRC-08, SRC-09, SRC-11 | Report creation has clear source evidence, maps to one user story, and has two testable AC. | No action |
| VAL-002 | `FR-003`, `FR-005`, `US-002`, `AC-003`, `AC-004` | Traceability | Pass | SRC-03, SRC-05, SRC-09, SRC-11 | Report list/detail visibility is required by the case and traceable to reporter status visibility. | No action |
| VAL-003 | `FR-004`, `US-003`, `AC-005`, `AC-006` | Ambiguity | Partial | SRC-03, SRC-05, SRC-09, SRC-10 | Search/filter is required and testable at a high level, but exact matching behavior and controls are later design details. | Defer |
| VAL-004 | `FR-006`, `US-004`, `AC-007`, `AC-008` | Consistency | Pass | SRC-03, SRC-05, SRC-08, SRC-09 | Administrator review is consistent with the required lifecycle and duplicate handling boundary. | No action |
| VAL-005 | `FR-007`, `FR-008`, `US-005`, `AC-009`, `AC-010` | Testability | Pass | SRC-08, SRC-09, SRC-11 | Category and priority value sets are explicit enough for acceptance testing. | No action |
| VAL-006 | `FR-009`, `US-006`, `AC-011`, `AC-012` | Consistency | Pass | SRC-03, SRC-05, SRC-09 | Assignment to Technician maps cleanly to `Assigned` and does not add reject/reassign scope. | No action |
| VAL-007 | `FR-010`, `US-007`, `AC-013`, `AC-014` | Readiness | Pass | SRC-03, SRC-05, SRC-08, SRC-09 | Technician task viewing and acceptance are clear enough for design, with no separate reject/reassign feature. | No action |
| VAL-008 | `FR-011`, `FR-013`, `US-008`, `AC-015`, `AC-016` | Testability | Pass | SRC-03, SRC-05, SRC-09 | Progress updates and status history have clear expected outcomes. | No action |
| VAL-009 | `FR-012`, `US-009`, `AC-017`, `AC-018`, `OQD-003` | Ambiguity | Pass | SRC-03, SRC-05, SRC-08, SRC-09, SRC-10, CR-002 | Comments/notes are required and now clarified as append-only context visible to authorized users who can view the related report. | No action |
| VAL-010 | `FR-014`, `US-010`, `AC-019`, `AC-020`, `BR-007` | Ambiguity | Pass | SRC-08, SRC-09, SRC-10, CR-001 | Close is testable, and reopen is clarified to move the report to Under Review with history reason/context. | No action |
| VAL-011 | `FR-015`, `US-011`, `AC-021`, `AC-022` | Readiness | Pass | SRC-03, SRC-05, SRC-08, SRC-09, SRC-10 | Dashboard scope is constrained to counts by status, category, priority, and recent reports. UI layout is correctly deferred. | No action |
| VAL-012 | `NFR-001` | Testability | Partial | SRC-03, SRC-07, SRC-09 | Usability is directionally clear, but detailed usability criteria should be refined during UI/test planning. | Defer |
| VAL-013 | `NFR-002`, `BR-003`, `BR-004`, `OQD-001`, `OQD-002` | Readiness | Partial | SRC-03, SRC-05, SRC-08, SRC-09, SRC-10, CR-003 | Role-specific action protection is required and the simple educational role boundary is approved; exact technical mechanism remains design work. | Defer |
| VAL-014 | `NFR-003`, `NFR-004`, `BR-001`, `BR-005` | Consistency | Pass | SRC-03, SRC-05, SRC-09 | Data integrity and lifecycle reliability align with status history and approved lifecycle rules. | No action |
| VAL-015 | `NFR-005` | Traceability | Pass | SRC-01, SRC-03, SRC-09, SRC-11 | Traceability is active and intentionally leaves design, issue, code, and test columns pending. | No action |
| VAL-016 | `NFR-006`, `NFR-007`, `BR-008` | Consistency | Pass | SRC-01, SRC-03, SRC-04, SRC-09 | Cloudflare/D1 feasibility and optional-service avoidance are consistent with project constraints. | No action |
| VAL-017 | `BR-001`, `BR-002` | Consistency | Pass | SRC-03, SRC-05, SRC-08, SRC-09 | Baseline lifecycle and initial Submitted status are explicit and consistent. | No action |
| VAL-018 | `BR-006` | Readiness | Pass | SRC-08, SRC-09, SRC-10 | Duplicate handling is intentionally limited to review and comments/notes; no merge feature is added. | No action |
| VAL-019 | `US-001` to `US-011` | Traceability | Pass | SRC-09, SRC-11 | Every user story maps to at least one functional requirement and at least two acceptance criteria. | No action |
| VAL-020 | `AC-001` to `AC-022` | Testability | Pass | SRC-09, SRC-11, CR-001, CR-002 | Acceptance criteria are testable at requirements level after clarifying `AC-018` and `AC-020`. | No action |
| VAL-021 | `DR-001` to `DR-007` | Scope consistency | Pass | SRC-03, SRC-07, SRC-09, SRC-10, SRC-11 | Optional features remain deferred and are not promoted into mandatory scope. | No action |
| VAL-022 | `OQD-001` to `OQD-006` | Readiness | Risk | SRC-09, SRC-10 | Open details are correctly visible; they should be resolved only through student decisions or later approved stages. | Student approval needed |
| VAL-023 | Priorities for `FR-001` to `FR-015` | Priority-risk alignment | Pass | SRC-09, SRC-10, SRC-11 | All approved FR remain `Must`, with risk/readiness notes used for sequencing rather than scope changes. | No action |
| VAL-024 | Priorities for `NFR-001` to `NFR-007` | Priority-risk alignment | Pass | SRC-09, SRC-10, SRC-11 | NFR priorities align with assignment quality concerns; high risk is recorded for `NFR-002` rather than hidden. | No action |
| VAL-025 | Priorities for `DR-001` to `DR-007` | Priority-risk alignment | Pass | SRC-03, SRC-10, SRC-11 | Deferred optional features are correctly `Won't for now`. | No action |

## 6. Readiness and Testability Risks

| Risk ID | Related Items | Risk | Impact if Not Resolved | Handling |
|---|---|---|---|---|
| VRISK-001 | `FR-014`, `AC-020`, `BR-001`, `BR-007` | Reopen behavior originally did not specify the next status after reopening. | Resolved by approved `CR-001`: reopened reports return to Under Review and history records reason/context. | Resolved |
| VRISK-002 | `FR-012`, `AC-018`, `OQD-003` | Comment/note visibility and edit rules were not defined. | Resolved by approved `CR-002`: comments/notes are append-only and visible to authorized users who can view the report. | Resolved |
| VRISK-003 | `NFR-002`, `BR-003`, `BR-004`, `OQD-001`, `OQD-002` | Role protection is required, but auth/session implementation is open. | Reduced by approved `CR-003`: simple educational role boundary is approved and Google login remains deferred. Exact mechanism remains later design work. | Defer exact mechanism |
| VRISK-004 | `NFR-001`, `OQD-005` | Usability and some NFRs do not have numeric targets. | Automated test planning may need qualitative acceptance checks. | Defer numeric targets unless student approves measurable criteria later. |
| VRISK-005 | `OQD-006` | Retention, deletion, or archival policy is not defined. | Later implementation should avoid inventing deletion/archival behavior. | Keep open unless student requests a change request. |

## 7. Traceability and Consistency Findings

| Finding ID | Finding | Status |
|---|---|---|
| FIND-001 | Every `FR-*` from `docs/requirements/03-specification.md` appears in `docs/requirements/traceability.md`. | Pass |
| FIND-002 | Every `NFR-*` from `docs/requirements/03-specification.md` appears in `docs/requirements/traceability.md`. | Pass |
| FIND-003 | Every `US-*` has at least two acceptance criteria. | Pass |
| FIND-004 | Deferred topics remain separately traceable and are not in the active MVP scope. | Pass |
| FIND-005 | Design, issue, code, and test columns remain `Pending`, which is correct because those stages have not been approved or created. | Pass |
| FIND-006 | Priority traceability exists and records risk/readiness without changing requirement scope. | Pass |
| FIND-007 | `AC-018` and `AC-020` are now testable after approved clarification of visibility and reopen target behavior. | Pass |
| FIND-008 | No contradiction was found between the approved workflow and active requirements; reopen returns to Under Review without adding a new status. | Pass |

## 8. Change Requests

These change requests were approved by the student on 2026-06-30. They clarify existing baseline requirements and do not add optional features as mandatory scope.

### CR-001: Clarify Reopen Target Status

| Field | Value |
|---|---|
| Change Request ID | CR-001 |
| Summary | Clarify what status a report should move to when an Administrator reopens a `Resolved` or `Closed` report. |
| Source of request | Validation finding `VAL-010`, `VAL-020`, and readiness risk `VRISK-001`. |
| Baseline affected | `FR-014`, `US-010`, `AC-020`, `BR-001`, `BR-007`, traceability row for `FR-014`. |
| Change type | Clarification, not feature expansion. |
| Evidence status | Approved clarification based on approved reopen requirement and open detail. |
| Impact analysis | Requirements may need one sentence clarifying the reopen target status and whether reason/context is required. Design/API/test work should then use that approved behavior. |
| Recommendation | Approve a simple clarification before design begins; do not add a new status unless explicitly approved. |
| Approval status | Approved by student on 2026-06-30. Baseline updated in `docs/requirements/03-specification.md`. |

### CR-002: Clarify Comment and Note Visibility

| Field | Value |
|---|---|
| Change Request ID | CR-002 |
| Summary | Clarify which roles can see and edit comments/notes, especially notes used for clarification, duplicate handling, and progress context. |
| Source of request | Validation finding `VAL-009`, `VAL-020`, and readiness risk `VRISK-002`. |
| Baseline affected | `FR-012`, `US-009`, `AC-017`, `AC-018`, `NFR-002`, `OQD-003`. |
| Change type | Clarification and role-policy detail, not optional feature expansion. |
| Evidence status | Approved clarification based on required comments/notes feature and open visibility detail. |
| Impact analysis | Requirements, UI design, API design, and acceptance tests may need consistent rules for who sees reporter comments, technician progress notes, admin duplicate notes, and any internal-only notes if approved. |
| Recommendation | Approve a minimal visibility rule before UI/API design; if internal-only notes are not approved, keep all notes visible only to authorized staff as later defined. |
| Approval status | Approved by student on 2026-06-30. Baseline updated in `docs/requirements/03-specification.md`. |

### CR-003: Clarify Simple Role/Auth Boundary

| Field | Value |
|---|---|
| Change Request ID | CR-003 |
| Summary | Clarify the simple role handling approach enough to support `NFR-002` without adding Google login or a full identity-provider design. |
| Source of request | Validation finding `VAL-013` and readiness risk `VRISK-003`. |
| Baseline affected | `NFR-002`, `BR-003`, `BR-004`, all role-sensitive acceptance criteria, `OQD-001`, `OQD-002`. |
| Change type | Clarification and design-readiness decision. |
| Evidence status | Approved clarification based on approved simple role boundary and deferred Google login. |
| Impact analysis | Later architecture/UI/API design needs a consistent way to model Reporter, Administrator, Technician, and Facility Manager actions without silently selecting a paid or optional auth service. |
| Recommendation | Approve a simple educational role model before architecture/design; keep Google login deferred. |
| Approval status | Approved by student on 2026-06-30. Baseline updated in `docs/requirements/03-specification.md`. |

## 9. Impact Analysis

| Impact Area | CR-001 | CR-002 | CR-003 |
|---|---|---|---|
| Requirement baseline | Updated `FR-014` and `AC-020`. | Updated `FR-012`, `AC-018`, and `OQD-003`. | Updated `NFR-002`, `OQD-001`, and `OQD-002`. |
| User stories | `US-010` may become clearer. | `US-009` may become clearer. | All role-sensitive stories may become clearer. |
| Priority | No change expected; affected items remain `Must`. | No change expected; affected items remain `Must`. | No change expected; affected items remain `Must`. |
| Design readiness | Reduces ambiguity for lifecycle design. | Reduces ambiguity for UI/API permissions. | Reduces ambiguity for architecture/API/UI role handling. |
| Test readiness | Makes `AC-020` directly testable. | Makes `AC-018` directly testable. | Makes role-sensitive AC easier to test later. |
| Scope risk | Low if clarification only. New statuses would need explicit approval. | Medium if internal notes become a new sub-feature; keep minimal. | Medium if it becomes full authentication; keep Google login deferred. |

## 10. Student Decisions Needed

| Decision ID | Decision Needed | Recommended Handling | Status |
|---|---|---|---|
| SDN-V-001 | Decide whether to approve, revise, reject, or defer `CR-001`. | Approved: reopen returns to Under Review and history records reason/context. | Complete |
| SDN-V-002 | Decide whether to approve, revise, reject, or defer `CR-002`. | Approved: comments/notes are append-only and visible to authorized report viewers. | Complete |
| SDN-V-003 | Decide whether to approve, revise, reject, or defer `CR-003`. | Approved: simple educational role boundary; Google login remains deferred. | Complete |
| SDN-V-004 | Decide whether numeric NFR targets are needed now. | Defer unless the instructor/student requires measurable targets before testing. | Pending |
| SDN-V-005 | Decide whether retention/deletion/archive policy needs a formal change request. | Defer unless project scope needs deletion/archive behavior. | Pending |

## 11. Human Review Notes

### Review Needed

The student should review:

- whether the validation matrix correctly identifies pass, partial, and risk items;
- whether approved clarifications `CR-001`, `CR-002`, and `CR-003` are recorded correctly;
- whether any risk should block the next design stage;
- whether optional features remain deferred and no new mandatory scope has been added;
- whether this document is ready to merge to `development` after review.

### Current Review Status

| Item | Status | Notes |
|---|---|---|
| AI draft for Skill 05 | Reviewed | Created from approved Skill 01 to Skill 04 artifacts. |
| Human review by student | Approved on 2026-06-30 | Student approved the validation/change artifact and asked the AI assistant to prepare it before the next stage. |
| Scope change | Clarifications approved | `CR-001`, `CR-002`, and `CR-003` clarify existing baseline requirements without adding optional features. |
| Traceability | Updated | Validation/change traceability should be added to `docs/requirements/traceability.md`. |
