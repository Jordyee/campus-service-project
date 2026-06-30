# Database and API Design

## 1. Sources Read

| ID | Source | Notes |
|---|---|---|
| SRC-01 | `AGENTS.md` | Project rules, source-of-truth order, branch rules, evidence rules, and stage limits. |
| SRC-02 | `skills/jordy-workflows/github-workflow-jordy.md` | Branch, pull request, merge, and quality-check workflow. |
| SRC-03 | `AI_Assisted_Campus_Service_Project.md` | Assignment scope, required workflow, required features, optional features, and Cloudflare/D1 direction. |
| SRC-04 | `README.md` | Repository purpose, planned stack, and artifact structure. |
| SRC-05 | `CASE.md` | Case summary, actors, core workflow, and required features. |
| SRC-06 | `skills/07-database-api-design/SKILL.md` | Database/API design workflow, output structure, boundaries, and quality checks. |
| SRC-07 | `docs/requirements/03-specification.md` | Approved FR, NFR, BR, US, AC, deferred topics, and open details. |
| SRC-08 | `docs/requirements/04-prioritization.md` | Approved Must scope, risk/readiness notes, MVP boundary, and deferred topics. |
| SRC-09 | `docs/requirements/05-validation-change.md` | Approved validation findings and change requests `CR-001`, `CR-002`, and `CR-003`. |
| SRC-10 | `docs/requirements/traceability.md` | Current traceability baseline before database/API mapping. |
| SRC-11 | `docs/design/01-architecture.md` | Approved architecture components, flows, decisions, risks, and open questions. |
| SRC-12 | `evidence/design-architecture-ai-evidence.md` | Architecture AI evidence and approved human review status. |

## 2. Review Status and Boundary

This document defines the database and API design for the Campus Service Request and Maintenance System. It is based on the approved requirements and approved architecture design.

| Item | Status | Notes |
|---|---|---|
| Requirements Specification | Approved | Source baseline is `docs/requirements/03-specification.md`. |
| Requirements Prioritization | Approved | All approved baseline requirements remain Must scope. |
| Requirements Validation and Change | Approved | `CR-001`, `CR-002`, and `CR-003` are approved clarifications. |
| Architecture Design | Approved and merged to `development` | Source baseline is `docs/design/01-architecture.md`. |
| Database/API Design | Drafted for review | Human review is required before merge to `development`. |

### Boundary

This document includes entity design, table design, relationship notes, D1 migration draft, endpoint draft, request/response examples, validation/error states, and requirement mapping.

This document does not create UI design, wireframes, GitHub issues, tests, implementation code, migration files to execute, migration execution, deployment config, or Cloudflare deployment.

Deferred optional features remain out of required scope:

- Upload photo.
- Email notification.
- Google login.
- Room QR code.
- AI categorization.
- Spare-part inventory.
- Vendor management.

## 3. Database Design Goals

| Goal ID | Goal | Requirement Basis |
|---|---|---|
| DB-GOAL-001 | Store the report information needed to create, list, filter, view, review, assign, progress, resolve, close, reopen, and summarize service requests. | `FR-001` to `FR-015` |
| DB-GOAL-002 | Preserve lifecycle integrity by storing current status and append-only status history. | `FR-011`, `FR-013`, `FR-014`, `NFR-004`, `BR-001`, `BR-005`, `CR-001` |
| DB-GOAL-003 | Store comments/notes as append-only report context. | `FR-012`, `CR-002`, `ARCH-DEC-005` |
| DB-GOAL-004 | Support role-aware actions without selecting a production authentication provider. | `NFR-002`, `BR-003`, `BR-004`, `CR-003`, `ARCH-DEC-003` |
| DB-GOAL-005 | Keep D1 schema simple enough for a student project and compatible with SQLite constraints. | `NFR-005`, `NFR-006`, `NFR-007` |

## 4. Entity Overview

| Entity ID | Entity | Purpose | Requirement Basis |
|---|---|---|---|
| DB-01 | `app_users` | Stores simple actor records for Reporter, Administrator, Technician, and Facility Manager references. This supports role-aware design without choosing Google login or a production auth mechanism. | `NFR-002`, `BR-003`, `BR-004`, `CR-003` |
| DB-02 | `service_requests` | Stores the main service request record, current lifecycle state, category, priority, reporter contact snapshot, assignment, acceptance, and timestamps. | `FR-001` to `FR-011`, `FR-014`, `FR-015` |
| DB-03 | `request_comments` | Stores append-only comments/notes linked to a report. | `FR-012`, `BR-006`, `CR-002` |
| DB-04 | `request_status_history` | Stores append-only status history for every status change. | `FR-013`, `BR-005`, `CR-001` |
| DB-05 | Query indexes and constraints | Supports list/search/filter/detail/dashboard reads and protects valid enum values. | `FR-003`, `FR-004`, `FR-015`, `NFR-003`, `NFR-004` |

No separate dashboard table is planned. Dashboard values are derived from `service_requests` using aggregate queries.

## 5. Table Design

### DB-01: `app_users`

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | TEXT | Yes | Primary key, generated UUID. |
| `role` | TEXT | Yes | One of `REPORTER`, `ADMINISTRATOR`, `TECHNICIAN`, `FACILITY_MANAGER`. |
| `display_name` | TEXT | Yes | Human-readable actor name. |
| `contact` | TEXT | No | Email, phone, or campus contact value when available. |
| `is_active` | INTEGER | Yes | `1` for active, `0` for inactive. |
| `created_at` | TEXT | Yes | ISO-like timestamp, default current timestamp. |
| `updated_at` | TEXT | Yes | Timestamp updated by application logic. |

Design note: exact login/session handling remains open. API design assumes the backend can resolve an actor context with user ID and role.

### DB-02: `service_requests`

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | TEXT | Yes | Primary key, generated UUID. |
| `request_number` | TEXT | Yes | Unique human-readable number, for example `CSR-20260630-0001`. |
| `title` | TEXT | Yes | Short report title. |
| `description` | TEXT | Yes | Problem description. |
| `location` | TEXT | Yes | Campus location, room, or area. |
| `category` | TEXT | Yes | One of `INTERNET`, `AC`, `PERALATAN_KELAS`, `KEBERSIHAN`, `LABORATORIUM`, `LAINNYA`. |
| `priority` | TEXT | Yes | One of `LOW`, `MEDIUM`, `HIGH`. Defaults to `MEDIUM`. |
| `status` | TEXT | Yes | One of `SUBMITTED`, `UNDER_REVIEW`, `ASSIGNED`, `IN_PROGRESS`, `RESOLVED`, `CLOSED`. Defaults to `SUBMITTED`. |
| `reporter_user_id` | TEXT | No | Optional FK to `app_users.id` when a Reporter record exists. |
| `reporter_name` | TEXT | Yes | Reporter name snapshot required by `FR-002`. |
| `reporter_contact` | TEXT | Yes | Reporter contact snapshot required by `FR-002`. |
| `reviewed_by_user_id` | TEXT | No | FK to Administrator who reviewed the request. |
| `reviewed_at` | TEXT | No | Timestamp when review starts or is recorded. |
| `assigned_technician_id` | TEXT | No | FK to Technician assigned to the request. |
| `assigned_by_user_id` | TEXT | No | FK to Administrator who assigned the technician. |
| `assigned_at` | TEXT | No | Assignment timestamp. |
| `accepted_at` | TEXT | No | Timestamp when the assigned Technician accepts the task. |
| `resolved_at` | TEXT | No | Timestamp when status becomes `RESOLVED`. |
| `closed_at` | TEXT | No | Timestamp when status becomes `CLOSED`. |
| `created_at` | TEXT | Yes | Creation timestamp. |
| `updated_at` | TEXT | Yes | Last application update timestamp. |

Design note: assignment is stored on the main request because the initial scope needs one current assigned technician, not assignment history or reassign workflow.

### DB-03: `request_comments`

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | TEXT | Yes | Primary key, generated UUID. |
| `service_request_id` | TEXT | Yes | FK to `service_requests.id`. |
| `author_user_id` | TEXT | No | FK to `app_users.id` when available. |
| `author_role` | TEXT | Yes | Role snapshot at time of comment. |
| `comment_type` | TEXT | Yes | One of `COMMENT`, `NOTE`. Both are append-only and visible to authorized users who can view the report. |
| `body` | TEXT | Yes | Comment or note content. |
| `created_at` | TEXT | Yes | Creation timestamp. |

Design note: there are no update/delete fields because `CR-002` approved append-only comments/notes.

### DB-04: `request_status_history`

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | TEXT | Yes | Primary key, generated UUID. |
| `service_request_id` | TEXT | Yes | FK to `service_requests.id`. |
| `from_status` | TEXT | No | Previous status; null only for initial creation entry if recorded. |
| `to_status` | TEXT | Yes | New status after the transition. |
| `changed_by_user_id` | TEXT | No | FK to `app_users.id` when available. |
| `changed_by_role` | TEXT | Yes | Role snapshot for audit context. |
| `reason` | TEXT | No | Required by API validation for reopen and recommended for manual review actions. |
| `created_at` | TEXT | Yes | Transition timestamp. |

Design note: this table is append-only and is the source of lifecycle audit history.

## 6. Relationship and Constraint Notes

| Relationship ID | Relationship | Constraint / Handling |
|---|---|---|
| REL-001 | `service_requests.reporter_user_id` -> `app_users.id` | Optional because the exact auth/session mechanism is deferred. Reporter name/contact remain stored on the request. |
| REL-002 | `service_requests.reviewed_by_user_id` -> `app_users.id` | Must reference an Administrator actor when set. Role enforcement is handled by API validation, not SQLite alone. |
| REL-003 | `service_requests.assigned_technician_id` -> `app_users.id` | Must reference an active Technician actor when assigned. |
| REL-004 | `service_requests.assigned_by_user_id` -> `app_users.id` | Must reference an Administrator actor when set. |
| REL-005 | `request_comments.service_request_id` -> `service_requests.id` | Comments are linked to exactly one request and are append-only. |
| REL-006 | `request_status_history.service_request_id` -> `service_requests.id` | Status history is linked to exactly one request and is append-only. |
| REL-007 | Dashboard summaries | Derived from `service_requests`, not stored as duplicated summary rows. |

Constraint policy:

- Category, priority, role, status, and comment type use SQLite `CHECK` constraints where practical.
- Lifecycle transition rules are enforced in the Worker/API layer because they depend on actor role and current status.
- Role-specific action checks are enforced in the Worker/API layer because SQLite cannot validate current actor permissions.
- Deletion and archival behavior are not designed because retention/deletion policy is still open.

## 7. D1 Migration Draft

This SQL is a design draft only. Do not create or run a migration from this document without a later implementation-stage task.

```sql
CREATE TABLE app_users (
  id TEXT PRIMARY KEY,
  role TEXT NOT NULL CHECK (
    role IN ('REPORTER', 'ADMINISTRATOR', 'TECHNICIAN', 'FACILITY_MANAGER')
  ),
  display_name TEXT NOT NULL,
  contact TEXT,
  is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE service_requests (
  id TEXT PRIMARY KEY,
  request_number TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  category TEXT NOT NULL CHECK (
    category IN ('INTERNET', 'AC', 'PERALATAN_KELAS', 'KEBERSIHAN', 'LABORATORIUM', 'LAINNYA')
  ),
  priority TEXT NOT NULL DEFAULT 'MEDIUM' CHECK (
    priority IN ('LOW', 'MEDIUM', 'HIGH')
  ),
  status TEXT NOT NULL DEFAULT 'SUBMITTED' CHECK (
    status IN ('SUBMITTED', 'UNDER_REVIEW', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'CLOSED')
  ),
  reporter_user_id TEXT REFERENCES app_users(id),
  reporter_name TEXT NOT NULL,
  reporter_contact TEXT NOT NULL,
  reviewed_by_user_id TEXT REFERENCES app_users(id),
  reviewed_at TEXT,
  assigned_technician_id TEXT REFERENCES app_users(id),
  assigned_by_user_id TEXT REFERENCES app_users(id),
  assigned_at TEXT,
  accepted_at TEXT,
  resolved_at TEXT,
  closed_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE request_comments (
  id TEXT PRIMARY KEY,
  service_request_id TEXT NOT NULL REFERENCES service_requests(id),
  author_user_id TEXT REFERENCES app_users(id),
  author_role TEXT NOT NULL CHECK (
    author_role IN ('REPORTER', 'ADMINISTRATOR', 'TECHNICIAN', 'FACILITY_MANAGER')
  ),
  comment_type TEXT NOT NULL DEFAULT 'COMMENT' CHECK (
    comment_type IN ('COMMENT', 'NOTE')
  ),
  body TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE request_status_history (
  id TEXT PRIMARY KEY,
  service_request_id TEXT NOT NULL REFERENCES service_requests(id),
  from_status TEXT CHECK (
    from_status IS NULL OR from_status IN ('SUBMITTED', 'UNDER_REVIEW', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'CLOSED')
  ),
  to_status TEXT NOT NULL CHECK (
    to_status IN ('SUBMITTED', 'UNDER_REVIEW', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'CLOSED')
  ),
  changed_by_user_id TEXT REFERENCES app_users(id),
  changed_by_role TEXT NOT NULL CHECK (
    changed_by_role IN ('REPORTER', 'ADMINISTRATOR', 'TECHNICIAN', 'FACILITY_MANAGER')
  ),
  reason TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_service_requests_status ON service_requests(status);
CREATE INDEX idx_service_requests_category ON service_requests(category);
CREATE INDEX idx_service_requests_priority ON service_requests(priority);
CREATE INDEX idx_service_requests_location ON service_requests(location);
CREATE INDEX idx_service_requests_assigned_technician ON service_requests(assigned_technician_id);
CREATE INDEX idx_service_requests_created_at ON service_requests(created_at);
CREATE INDEX idx_request_comments_request ON request_comments(service_request_id, created_at);
CREATE INDEX idx_status_history_request ON request_status_history(service_request_id, created_at);
```

## 8. API Design Goals

| Goal ID | Goal | Requirement Basis |
|---|---|---|
| API-GOAL-001 | Provide endpoints for report creation, listing, searching/filtering, detail, review, classification, assignment, technician progress, comments, close/reopen, and dashboard summaries. | `FR-001` to `FR-015` |
| API-GOAL-002 | Keep lifecycle transitions backend-controlled and history-backed. | `FR-011`, `FR-013`, `FR-014`, `NFR-004`, `BR-001`, `BR-005` |
| API-GOAL-003 | Use actor context for role-sensitive actions without choosing a production auth provider in this design stage. | `NFR-002`, `CR-003`, `ARCH-DEC-003` |
| API-GOAL-004 | Return consistent validation and error responses suitable for later UI and test planning. | `NFR-001`, `NFR-003`, `NFR-005` |

### Actor Context Assumption

Each role-sensitive endpoint assumes the Worker can resolve an actor context:

```json
{
  "actorId": "user-admin-1",
  "role": "ADMINISTRATOR"
}
```

This document does not decide whether that context comes from a development role selector, headers, session cookies, or another mechanism. That mechanism remains a later approved design/implementation decision.

## 9. Endpoint Catalog

| API ID | Method and Path | Actor | Purpose | Requirement Basis |
|---|---|---|---|---|
| API-01 | `POST /api/requests` | Reporter | Create a new service request with `SUBMITTED` status. | `FR-001`, `FR-002`, `BR-002` |
| API-02 | `GET /api/requests` | Authorized report viewer | List, search, and filter requests. | `FR-003`, `FR-004` |
| API-03 | `GET /api/requests/{id}` | Authorized report viewer | View report detail with comments and status history. | `FR-005`, `FR-012`, `FR-013` |
| API-04 | `POST /api/requests/{id}/review` | Administrator | Move a submitted request to `UNDER_REVIEW` and optionally record review context. | `FR-006`, `BR-003` |
| API-05 | `PATCH /api/requests/{id}/classification` | Administrator | Set or update category and priority. | `FR-007`, `FR-008`, `BR-003` |
| API-06 | `POST /api/requests/{id}/assignment` | Administrator | Assign an active Technician and move request to `ASSIGNED`. | `FR-009`, `BR-003` |
| API-07 | `GET /api/technician/tasks` | Technician | View assigned technician work. | `FR-010`, `BR-004` |
| API-08 | `POST /api/requests/{id}/accept` | Assigned Technician | Record task acceptance before progress starts. | `FR-010`, `BR-004` |
| API-09 | `PATCH /api/requests/{id}/work-status` | Assigned Technician | Move assigned work to `IN_PROGRESS` or `RESOLVED`. | `FR-011`, `FR-013`, `BR-004`, `BR-005` |
| API-10 | `POST /api/requests/{id}/close` | Administrator | Close a resolved request and record history. | `FR-014`, `BR-003`, `BR-005` |
| API-11 | `POST /api/requests/{id}/reopen` | Administrator | Reopen a `RESOLVED` or `CLOSED` request to `UNDER_REVIEW` with reason/context. | `FR-014`, `BR-007`, `CR-001` |
| API-12 | `POST /api/requests/{id}/comments` | Authorized report viewer | Add an append-only comment or note to a request. | `FR-012`, `BR-006`, `CR-002` |
| API-13 | `GET /api/dashboard/summary` | Facility Manager | Return counts by status, category, priority, and recent reports. | `FR-015` |
| API-14 | `GET /api/users?role=TECHNICIAN` | Administrator | Return active technician choices for assignment. | `FR-009`, `NFR-002` |

## 10. Request and Response Examples

### API-01: Create Request

Request:

```json
{
  "title": "Proyektor tidak menyala",
  "description": "Proyektor di ruang 301 tidak menyala saat kelas dimulai.",
  "location": "Gedung A Ruang 301",
  "category": "PERALATAN_KELAS",
  "reporterName": "Budi Santoso",
  "reporterContact": "budi@example.edu"
}
```

Response `201`:

```json
{
  "data": {
    "id": "req-uuid-1",
    "requestNumber": "CSR-20260630-0001",
    "status": "SUBMITTED"
  }
}
```

### API-02: List and Filter Requests

Example path:

```text
GET /api/requests?status=UNDER_REVIEW&priority=HIGH&keyword=proyektor
```

Response `200`:

```json
{
  "data": [
    {
      "id": "req-uuid-1",
      "requestNumber": "CSR-20260630-0001",
      "title": "Proyektor tidak menyala",
      "location": "Gedung A Ruang 301",
      "category": "PERALATAN_KELAS",
      "priority": "HIGH",
      "status": "UNDER_REVIEW",
      "assignedTechnicianName": null,
      "createdAt": "2026-06-30T10:00:00Z"
    }
  ]
}
```

### API-03: Detail Request

Response `200`:

```json
{
  "data": {
    "id": "req-uuid-1",
    "requestNumber": "CSR-20260630-0001",
    "title": "Proyektor tidak menyala",
    "description": "Proyektor di ruang 301 tidak menyala saat kelas dimulai.",
    "location": "Gedung A Ruang 301",
    "category": "PERALATAN_KELAS",
    "priority": "HIGH",
    "status": "ASSIGNED",
    "reporterName": "Budi Santoso",
    "reporterContact": "budi@example.edu",
    "assignedTechnician": {
      "id": "user-tech-1",
      "displayName": "Siti Teknisi"
    },
    "comments": [
      {
        "id": "comment-1",
        "authorRole": "ADMINISTRATOR",
        "commentType": "NOTE",
        "body": "Prioritas dinaikkan karena dipakai untuk kelas pagi.",
        "createdAt": "2026-06-30T10:15:00Z"
      }
    ],
    "statusHistory": [
      {
        "fromStatus": "UNDER_REVIEW",
        "toStatus": "ASSIGNED",
        "changedByRole": "ADMINISTRATOR",
        "reason": "Assigned to technician.",
        "createdAt": "2026-06-30T10:20:00Z"
      }
    ]
  }
}
```

### API-06: Assign Technician

Request:

```json
{
  "technicianId": "user-tech-1",
  "reason": "Teknisi lab tersedia untuk ruang 301."
}
```

Response `200`:

```json
{
  "data": {
    "id": "req-uuid-1",
    "status": "ASSIGNED",
    "assignedTechnicianId": "user-tech-1"
  }
}
```

### API-09: Technician Work Status

Request:

```json
{
  "status": "IN_PROGRESS",
  "reason": "Teknisi mulai mengecek kabel dan sumber daya."
}
```

Response `200`:

```json
{
  "data": {
    "id": "req-uuid-1",
    "status": "IN_PROGRESS"
  }
}
```

### API-11: Reopen Request

Request:

```json
{
  "reason": "Proyektor kembali mati setelah dicoba ulang."
}
```

Response `200`:

```json
{
  "data": {
    "id": "req-uuid-1",
    "status": "UNDER_REVIEW"
  }
}
```

### API-13: Dashboard Summary

Response `200`:

```json
{
  "data": {
    "countsByStatus": {
      "SUBMITTED": 3,
      "UNDER_REVIEW": 2,
      "ASSIGNED": 4,
      "IN_PROGRESS": 1,
      "RESOLVED": 2,
      "CLOSED": 8
    },
    "countsByCategory": {
      "INTERNET": 4,
      "AC": 2,
      "PERALATAN_KELAS": 5,
      "KEBERSIHAN": 3,
      "LABORATORIUM": 2,
      "LAINNYA": 4
    },
    "countsByPriority": {
      "LOW": 4,
      "MEDIUM": 10,
      "HIGH": 6
    },
    "recentReports": [
      {
        "id": "req-uuid-1",
        "requestNumber": "CSR-20260630-0001",
        "title": "Proyektor tidak menyala",
        "status": "UNDER_REVIEW",
        "createdAt": "2026-06-30T10:00:00Z"
      }
    ]
  }
}
```

## 11. Validation and Error States

### Shared Response Shape

Success responses use:

```json
{
  "data": {}
}
```

Error responses use:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed.",
    "details": [
      {
        "field": "title",
        "message": "Title is required."
      }
    ]
  }
}
```

### Error Catalog

| Error ID | HTTP Status | Code | When Used |
|---|---:|---|---|
| ERR-001 | 400 | `BAD_REQUEST` | Request JSON or query parameter format is invalid. |
| ERR-002 | 403 | `FORBIDDEN_ACTION` | Actor role is not allowed to perform the action. |
| ERR-003 | 404 | `NOT_FOUND` | Request, user, technician, comment source, or dashboard source data is not found. |
| ERR-004 | 409 | `INVALID_STATUS_TRANSITION` | Requested lifecycle action is not valid from the current status. |
| ERR-005 | 409 | `ASSIGNMENT_CONFLICT` | Technician action is attempted by someone other than the assigned Technician. |
| ERR-006 | 422 | `VALIDATION_ERROR` | Required field is missing or enum value is invalid. |
| ERR-007 | 500 | `INTERNAL_ERROR` | Unexpected backend/database failure. |

### Validation Rules

| Validation ID | Applies To | Rule |
|---|---|---|
| VAL-DBAPI-001 | `POST /api/requests` | `title`, `description`, `location`, `category`, `reporterName`, and `reporterContact` are required. |
| VAL-DBAPI-002 | Category fields | Category must be one of `INTERNET`, `AC`, `PERALATAN_KELAS`, `KEBERSIHAN`, `LABORATORIUM`, `LAINNYA`. |
| VAL-DBAPI-003 | Priority fields | Priority must be one of `LOW`, `MEDIUM`, `HIGH`. |
| VAL-DBAPI-004 | Review | Only Administrator may move `SUBMITTED` to `UNDER_REVIEW`. |
| VAL-DBAPI-005 | Assignment | Only Administrator may assign an active Technician, and assignment moves the request to `ASSIGNED`. |
| VAL-DBAPI-006 | Technician acceptance | Only the assigned Technician may accept assigned work. |
| VAL-DBAPI-007 | Work status | Assigned Technician may move `ASSIGNED` to `IN_PROGRESS` after acceptance and `IN_PROGRESS` to `RESOLVED`. |
| VAL-DBAPI-008 | Close | Only Administrator may close a `RESOLVED` request. |
| VAL-DBAPI-009 | Reopen | Only Administrator may reopen `RESOLVED` or `CLOSED` to `UNDER_REVIEW`; `reason` is required. |
| VAL-DBAPI-010 | Comments/notes | Comment body is required and comments/notes are append-only. |
| VAL-DBAPI-011 | Dashboard | Dashboard returns empty/zero summaries when no reports exist. |

## 12. Requirement-to-Database/API Mapping

### Functional Requirements

| Requirement | Database Mapping | API Mapping |
|---|---|---|
| FR-001 | `DB-02`, `DB-04` | `API-01` |
| FR-002 | `DB-01`, `DB-02` | `API-01` |
| FR-003 | `DB-02`, `DB-05` | `API-02` |
| FR-004 | `DB-02`, `DB-05` | `API-02` |
| FR-005 | `DB-02`, `DB-03`, `DB-04` | `API-03` |
| FR-006 | `DB-02`, `DB-04` | `API-04`, `API-12` |
| FR-007 | `DB-02`, `DB-05` | `API-05` |
| FR-008 | `DB-02`, `DB-05` | `API-05` |
| FR-009 | `DB-01`, `DB-02`, `DB-04` | `API-06`, `API-14` |
| FR-010 | `DB-01`, `DB-02` | `API-07`, `API-08` |
| FR-011 | `DB-02`, `DB-04` | `API-09` |
| FR-012 | `DB-03` | `API-12` |
| FR-013 | `DB-04` | `API-03`, `API-09`, `API-10`, `API-11` |
| FR-014 | `DB-02`, `DB-04` | `API-10`, `API-11` |
| FR-015 | `DB-02`, `DB-05` | `API-13` |

### Non-Functional Requirements

| Requirement | Database/API Mapping |
|---|---|
| NFR-001 | `API-01` to `API-13` use predictable validation/error responses and readable enum values for later UI mapping. |
| NFR-002 | `DB-01`, role-aware endpoint actor rules, `API-04` to `API-14` for role-sensitive actions. |
| NFR-003 | `DB-02`, `DB-03`, `DB-04`, `DB-05`, validation rules `VAL-DBAPI-001` to `VAL-DBAPI-011`. |
| NFR-004 | `DB-04`, `API-04`, `API-06`, `API-09`, `API-10`, `API-11`, `ERR-004`. |
| NFR-005 | `DB-*`, `API-*`, and `VAL-DBAPI-*` IDs are mapped into traceability for later issues, code, and tests. |
| NFR-006 | D1-compatible SQL draft and Cloudflare Worker API boundary. |
| NFR-007 | No database/API dependency on object storage, email, Google login, QR, AI categorization, inventory, or vendors. |

### Business Rules

| Business Rule | Database/API Mapping |
|---|---|
| BR-001 | `DB-02.status`, `DB-04`, `API-04`, `API-06`, `API-09`, `API-10`, `API-11` |
| BR-002 | `DB-02.status DEFAULT 'SUBMITTED'`, `API-01` |
| BR-003 | `DB-01`, role validation on `API-04`, `API-05`, `API-06`, `API-10`, `API-11` |
| BR-004 | `DB-02.assigned_technician_id`, `DB-02.accepted_at`, `API-07`, `API-08`, `API-09` |
| BR-005 | `DB-04`, status-changing APIs |
| BR-006 | `DB-03`, `API-12` |
| BR-007 | `API-11`, `DB-04.reason` |
| BR-008 | Boundary rules in this design and no optional-service tables/endpoints |

## 13. Traceability Update Notes

`docs/requirements/traceability.md` should be updated with database/API design IDs for active FR and NFR rows.

Traceability update rules for this stage:

- Add `DB-*` and `API-*` IDs to the Design column.
- Keep Issue, Code, and Test columns as `Pending`.
- Do not add UI IDs, issue IDs, code file references, test IDs, or deployment references.
- Keep deferred optional topics deferred.

## 14. Risks, Constraints, and Open Design Questions

### Risks

| Risk ID | Risk | Related Items | Handling |
|---|---|---|---|
| DBAPI-RISK-001 | Exact auth/session mechanism is still open. | `NFR-002`, `CR-003`, `ARCH-OQ-001` | API design uses actor context but does not choose the mechanism. |
| DBAPI-RISK-002 | Search/filter behavior can grow too broad. | `FR-004`, `ARCH-OQ-003` | API supports practical filters only: status, category, priority, location, assigned technician, and keyword. |
| DBAPI-RISK-003 | Retention/deletion policy is not defined. | `OQD-006`, `ARCH-RISK-005` | No delete/archive endpoint is designed. |
| DBAPI-RISK-004 | Assignment history is not stored separately. | `FR-009`, `BR-004` | Acceptable for initial scope because reassign/reject is not a separate feature. Revisit only if scope changes. |
| DBAPI-RISK-005 | Dashboard query performance depends on request volume. | `FR-015` | Keep indexes simple and revisit only if test data shows a problem. |

### Constraints

| Constraint ID | Constraint |
|---|---|
| DBAPI-CON-001 | Use Cloudflare D1/SQLite-compatible schema design. |
| DBAPI-CON-002 | Use Cloudflare Worker as the API boundary. |
| DBAPI-CON-003 | Do not run migrations during this design stage. |
| DBAPI-CON-004 | Do not create implementation code or tests during this design stage. |
| DBAPI-CON-005 | Do not add optional features or paid services. |

### Open Design Questions

| Question ID | Question | Later Stage |
|---|---|---|
| DBAPI-OQ-001 | What exact mechanism will provide actor context to the Worker? | UI Design / Implementation |
| DBAPI-OQ-002 | Should implementation seed sample `app_users` for role-based testing and demo? | Implementation / Test Planning |
| DBAPI-OQ-003 | Are numeric NFR targets needed for API response time or dashboard query size? | Test Planning / Validation Change |
| DBAPI-OQ-004 | Does the project need formal deletion/archive behavior? | Validation Change only if requested |

## 15. Human Review Notes

### Review Needed

The student should review:

- whether four tables are simple enough for the class project;
- whether current assignment fields on `service_requests` are enough without an assignment-history table;
- whether the endpoint catalog supports every required feature without adding optional scope;
- whether actor context is acceptable as a design-level placeholder until implementation;
- whether the D1 migration draft should remain as design text only until an implementation issue is approved.

### Current Review Status

| Item | Status | Notes |
|---|---|---|
| AI draft for Skill 07 | Drafted | Created on branch `design/database-api`. |
| Human review by student | Pending | Required before merge to `development`. |
| Scope change | None | No optional feature was added as mandatory scope. |
| Code/test/deployment work | None | This stage produced documentation and evidence only. |
