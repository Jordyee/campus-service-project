import {
  apiError,
  apiSuccess,
  canRolePerform,
  isCategory,
  isCommentType,
  isPriority,
  isRequestStatus,
  readActorContext,
  REQUEST_STATUSES,
  type ActorContext,
  type ApiErrorDetail,
  type Category,
  type CommentType,
  type Priority,
  type RequestStatus,
} from "./foundation";
import { transitionRequestStatus } from "./status-history";

export interface CreateRequestInput {
  title: string;
  description: string;
  location: string;
  category: Category;
  reporterName: string;
  reporterContact: string;
}

export interface CreatedRequest {
  id: string;
  requestNumber: string;
  status: "SUBMITTED";
}

export interface RequestListItem {
  id: string;
  requestNumber: string;
  title: string;
  location: string;
  category: Category;
  priority: Priority;
  status: RequestStatus;
  assignedTechnicianName: string | null;
  createdAt: string;
}

export interface RequestDetail {
  id: string;
  requestNumber: string;
  title: string;
  description: string;
  location: string;
  category: Category;
  priority: Priority;
  status: RequestStatus;
  reporterName: string;
  reporterContact: string;
  assignedTechnician: { id: string; displayName: string } | null;
  createdAt: string;
  updatedAt: string;
  lifecycle: RequestStatus[];
  comments: RequestComment[];
  statusHistory: RequestStatusHistoryItem[];
}

export interface RequestComment {
  id: string;
  authorRole: ActorContext["role"];
  commentType: CommentType;
  body: string;
  createdAt: string;
}

export interface RequestStatusHistoryItem {
  fromStatus: RequestStatus | null;
  toStatus: RequestStatus;
  changedByRole: ActorContext["role"];
  reason: string | null;
  createdAt: string;
}

export interface AddCommentInput {
  body: string;
  commentType: CommentType;
}

export interface CreatedComment {
  id: string;
  authorRole: ActorContext["role"];
  commentType: CommentType;
  body: string;
  createdAt: string;
}

export interface ReviewRequestInput {
  note?: string;
}

export interface ClassificationInput {
  category: Category;
  priority: Priority;
  note?: string;
}

export interface ReviewedRequest {
  id: string;
  status: "UNDER_REVIEW";
}

export interface ClassifiedRequest {
  id: string;
  category: Category;
  priority: Priority;
}

export interface TechnicianChoice {
  id: string;
  displayName: string;
  contact: string | null;
}

export interface AssignmentInput {
  technicianId: string;
  reason?: string;
}

export interface AssignedRequest {
  id: string;
  status: "ASSIGNED";
  assignedTechnicianId: string;
}

export type RequestDetailResult =
  | { ok: true; data: RequestDetail }
  | { ok: false; reason: "not_found" | "forbidden" };

export type AddCommentResult =
  | { ok: true; data: CreatedComment }
  | { ok: false; reason: "not_found" | "forbidden" };

export type AssignmentResult =
  | { ok: true; data: AssignedRequest }
  | {
      ok: false;
      reason: "not_found" | "invalid_technician" | "invalid_transition";
    };

export interface ListRequestFilters {
  status?: RequestStatus;
  category?: Category;
  priority?: Priority;
  location?: string;
  keyword?: string;
}

export type ValidationResult =
  | { ok: true; data: CreateRequestInput }
  | { ok: false; errors: ApiErrorDetail[] };

export type FilterValidationResult =
  | { ok: true; data: ListRequestFilters }
  | { ok: false; errors: ApiErrorDetail[] };

export type CommentValidationResult =
  | { ok: true; data: AddCommentInput }
  | { ok: false; errors: ApiErrorDetail[] };

export type ReviewValidationResult =
  | { ok: true; data: ReviewRequestInput }
  | { ok: false; errors: ApiErrorDetail[] };

export type ClassificationValidationResult =
  | { ok: true; data: ClassificationInput }
  | { ok: false; errors: ApiErrorDetail[] };

export type AssignmentValidationResult =
  | { ok: true; data: AssignmentInput }
  | { ok: false; errors: ApiErrorDetail[] };

const REQUIRED_FIELDS = [
  ["title", "Title is required."],
  ["description", "Description is required."],
  ["location", "Location is required."],
  ["reporterName", "Reporter name is required."],
  ["reporterContact", "Reporter contact is required."],
] as const;

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function readRequiredText(
  input: Record<string, unknown>,
  field: string,
  message: string,
  errors: ApiErrorDetail[],
): string {
  const value = input[field];

  if (typeof value !== "string" || value.trim() === "") {
    errors.push({ field, message });
    return "";
  }

  return value.trim();
}

function readOptionalText(
  input: Record<string, unknown>,
  field: string,
  message: string,
  errors: ApiErrorDetail[],
): string | undefined {
  const value = input[field];

  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  if (typeof value !== "string") {
    errors.push({ field, message });
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}

export function validateCreateRequestInput(payload: unknown): ValidationResult {
  const input = asRecord(payload);
  const errors: ApiErrorDetail[] = [];
  const values = Object.fromEntries(
    REQUIRED_FIELDS.map(([field, message]) => [
      field,
      readRequiredText(input, field, message, errors),
    ]),
  ) as Omit<CreateRequestInput, "category">;

  const rawCategory = input.category;

  if (typeof rawCategory !== "string" || rawCategory.trim() === "") {
    errors.push({ field: "category", message: "Category is required." });
  } else if (!isCategory(rawCategory)) {
    errors.push({ field: "category", message: "Category is invalid." });
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      ...values,
      category: rawCategory as Category,
    },
  };
}

export function validateListRequestQuery(
  params: URLSearchParams,
): FilterValidationResult {
  const errors: ApiErrorDetail[] = [];
  const filters: ListRequestFilters = {};
  const status = params.get("status")?.trim();
  const category = params.get("category")?.trim();
  const priority = params.get("priority")?.trim();
  const location = params.get("location")?.trim();
  const keyword = params.get("keyword")?.trim();

  if (status) {
    if (isRequestStatus(status)) filters.status = status;
    else errors.push({ field: "status", message: "Status is invalid." });
  }

  if (category) {
    if (isCategory(category)) filters.category = category;
    else errors.push({ field: "category", message: "Category is invalid." });
  }

  if (priority) {
    if (isPriority(priority)) filters.priority = priority;
    else errors.push({ field: "priority", message: "Priority is invalid." });
  }

  if (location) filters.location = location;
  if (keyword) filters.keyword = keyword;

  return errors.length > 0
    ? { ok: false, errors }
    : { ok: true, data: filters };
}

export function validateAddCommentInput(
  payload: unknown,
): CommentValidationResult {
  const input = asRecord(payload);
  const errors: ApiErrorDetail[] = [];
  const body = readRequiredText(
    input,
    "body",
    "Comment body is required.",
    errors,
  );
  const rawCommentType = input.commentType;

  if (typeof rawCommentType !== "string" || rawCommentType.trim() === "") {
    errors.push({ field: "commentType", message: "Comment type is required." });
  } else if (!isCommentType(rawCommentType)) {
    errors.push({ field: "commentType", message: "Comment type is invalid." });
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: { body, commentType: rawCommentType as CommentType },
  };
}

export function validateReviewRequestInput(
  payload: unknown,
): ReviewValidationResult {
  const input = asRecord(payload);
  const errors: ApiErrorDetail[] = [];
  const note = readOptionalText(
    input,
    "note",
    "Review note must be text.",
    errors,
  );

  return errors.length > 0 ? { ok: false, errors } : { ok: true, data: { note } };
}

export function validateClassificationInput(
  payload: unknown,
): ClassificationValidationResult {
  const input = asRecord(payload);
  const errors: ApiErrorDetail[] = [];
  const rawCategory = input.category;
  const rawPriority = input.priority;
  const note = readOptionalText(
    input,
    "note",
    "Review note must be text.",
    errors,
  );

  if (typeof rawCategory !== "string" || rawCategory.trim() === "") {
    errors.push({ field: "category", message: "Category is required." });
  } else if (!isCategory(rawCategory)) {
    errors.push({ field: "category", message: "Category is invalid." });
  }

  if (typeof rawPriority !== "string" || rawPriority.trim() === "") {
    errors.push({ field: "priority", message: "Priority is required." });
  } else if (!isPriority(rawPriority)) {
    errors.push({ field: "priority", message: "Priority is invalid." });
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      category: rawCategory as Category,
      priority: rawPriority as Priority,
      note,
    },
  };
}

export function validateAssignmentInput(
  payload: unknown,
): AssignmentValidationResult {
  const input = asRecord(payload);
  const errors: ApiErrorDetail[] = [];
  const technicianId = readRequiredText(
    input,
    "technicianId",
    "Technician is required.",
    errors,
  );
  const reason = readOptionalText(
    input,
    "reason",
    "Assignment reason must be text.",
    errors,
  );

  return errors.length > 0
    ? { ok: false, errors }
    : { ok: true, data: { technicianId, reason } };
}

async function nextRequestNumber(db: D1Database, now: string): Promise<string> {
  const datePart = now.slice(0, 10).replaceAll("-", "");
  const row = await db
    .prepare(
      `SELECT COUNT(*) AS count
       FROM service_requests
       WHERE request_number LIKE ?`,
    )
    .bind(`CSR-${datePart}-%`)
    .first<{ count: number }>();
  const sequence = String((row?.count ?? 0) + 1).padStart(4, "0");

  return `CSR-${datePart}-${sequence}`;
}

export async function createServiceRequest(
  db: D1Database,
  input: CreateRequestInput,
  actor: ActorContext,
  now = new Date().toISOString(),
): Promise<CreatedRequest> {
  const id = crypto.randomUUID();
  const requestNumber = await nextRequestNumber(db, now);

  await db
    .prepare(
      `INSERT INTO service_requests (
        id,
        request_number,
        title,
        description,
        location,
        category,
        priority,
        status,
        reporter_user_id,
        reporter_name,
        reporter_contact,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, 'MEDIUM', 'SUBMITTED', ?, ?, ?, ?, ?)`,
    )
    .bind(
      id,
      requestNumber,
      input.title,
      input.description,
      input.location,
      input.category,
      actor.id,
      input.reporterName,
      input.reporterContact,
      now,
      now,
    )
    .run();

  await transitionRequestStatus({
    db,
    requestId: id,
    fromStatus: null,
    toStatus: "SUBMITTED",
    actor,
    reason: "Request submitted.",
    now,
  });

  return { id, requestNumber, status: "SUBMITTED" };
}

export async function listServiceRequests(
  db: D1Database,
  actor: ActorContext,
  filters: ListRequestFilters,
): Promise<RequestListItem[]> {
  const where: string[] = [];
  const values: string[] = [];

  if (actor.role === "REPORTER") {
    where.push("r.reporter_user_id = ?");
    values.push(actor.id);
  } else if (actor.role === "TECHNICIAN") {
    where.push("r.assigned_technician_id = ?");
    values.push(actor.id);
  }

  if (filters.status) {
    where.push("r.status = ?");
    values.push(filters.status);
  }

  if (filters.category) {
    where.push("r.category = ?");
    values.push(filters.category);
  }

  if (filters.priority) {
    where.push("r.priority = ?");
    values.push(filters.priority);
  }

  if (filters.location) {
    where.push("r.location LIKE ?");
    values.push(`%${filters.location}%`);
  }

  if (filters.keyword) {
    const keyword = `%${filters.keyword}%`;
    where.push(`(
      r.request_number LIKE ?
      OR r.title LIKE ?
      OR r.description LIKE ?
      OR r.location LIKE ?
      OR r.reporter_name LIKE ?
      OR r.reporter_contact LIKE ?
    )`);
    values.push(keyword, keyword, keyword, keyword, keyword, keyword);
  }

  const whereSql = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";
  const { results } = await db
    .prepare(
      `SELECT
        r.id,
        r.request_number,
        r.title,
        r.location,
        r.category,
        r.priority,
        r.status,
        r.created_at,
        technician.display_name AS assigned_technician_name
       FROM service_requests r
       LEFT JOIN app_users technician
         ON technician.id = r.assigned_technician_id
       ${whereSql}
       ORDER BY r.created_at DESC, r.request_number DESC`,
    )
    .bind(...values)
    .all<{
      id: string;
      request_number: string;
      title: string;
      location: string;
      category: Category;
      priority: Priority;
      status: RequestStatus;
      assigned_technician_name: string | null;
      created_at: string;
    }>();

  return results.map((row) => ({
    id: row.id,
    requestNumber: row.request_number,
    title: row.title,
    location: row.location,
    category: row.category,
    priority: row.priority,
    status: row.status,
    assignedTechnicianName: row.assigned_technician_name,
    createdAt: row.created_at,
  }));
}

export async function listActiveTechnicians(
  db: D1Database,
): Promise<TechnicianChoice[]> {
  const { results } = await db
    .prepare(
      `SELECT id, display_name, contact
       FROM app_users
       WHERE role = 'TECHNICIAN' AND is_active = 1
       ORDER BY display_name ASC`,
    )
    .all<{ id: string; display_name: string; contact: string | null }>();

  return results.map((technician) => ({
    id: technician.id,
    displayName: technician.display_name,
    contact: technician.contact,
  }));
}

function canActorViewRequest(
  actor: ActorContext,
  request: {
    reporter_user_id: string | null;
    assigned_technician_id: string | null;
  },
): boolean {
  if (actor.role === "ADMINISTRATOR" || actor.role === "FACILITY_MANAGER") {
    return true;
  }

  if (actor.role === "REPORTER") {
    return request.reporter_user_id === actor.id;
  }

  return request.assigned_technician_id === actor.id;
}

export async function getServiceRequestDetail(
  db: D1Database,
  requestId: string,
  actor: ActorContext,
): Promise<RequestDetailResult> {
  const row = await db
    .prepare(
      `SELECT
        r.id,
        r.request_number,
        r.title,
        r.description,
        r.location,
        r.category,
        r.priority,
        r.status,
        r.reporter_user_id,
        r.reporter_name,
        r.reporter_contact,
        r.assigned_technician_id,
        r.created_at,
        r.updated_at,
        technician.display_name AS assigned_technician_name
       FROM service_requests r
       LEFT JOIN app_users technician
         ON technician.id = r.assigned_technician_id
       WHERE r.id = ?`,
    )
    .bind(requestId)
    .first<{
      id: string;
      request_number: string;
      title: string;
      description: string;
      location: string;
      category: Category;
      priority: Priority;
      status: RequestStatus;
      reporter_user_id: string | null;
      reporter_name: string;
      reporter_contact: string;
      assigned_technician_id: string | null;
      assigned_technician_name: string | null;
      created_at: string;
      updated_at: string;
    }>();

  if (!row) {
    return { ok: false, reason: "not_found" };
  }

  if (!canActorViewRequest(actor, row)) {
    return { ok: false, reason: "forbidden" };
  }

  const [comments, history] = await Promise.all([
    db
      .prepare(
        `SELECT id, author_role, comment_type, body, created_at
         FROM request_comments
         WHERE service_request_id = ?
         ORDER BY created_at ASC, id ASC`,
      )
      .bind(requestId)
      .all<{
        id: string;
        author_role: ActorContext["role"];
        comment_type: CommentType;
        body: string;
        created_at: string;
      }>(),
    db
      .prepare(
        `SELECT from_status, to_status, changed_by_role, reason, created_at
         FROM request_status_history
         WHERE service_request_id = ?
         ORDER BY created_at ASC, id ASC`,
      )
      .bind(requestId)
      .all<{
        from_status: RequestStatus | null;
        to_status: RequestStatus;
        changed_by_role: ActorContext["role"];
        reason: string | null;
        created_at: string;
      }>(),
  ]);

  return {
    ok: true,
    data: {
      id: row.id,
      requestNumber: row.request_number,
      title: row.title,
      description: row.description,
      location: row.location,
      category: row.category,
      priority: row.priority,
      status: row.status,
      reporterName: row.reporter_name,
      reporterContact: row.reporter_contact,
      assignedTechnician: row.assigned_technician_id
        ? {
            id: row.assigned_technician_id,
            displayName: row.assigned_technician_name ?? "Unknown technician",
          }
        : null,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      lifecycle: [...REQUEST_STATUSES],
      comments: comments.results.map((comment) => ({
        id: comment.id,
        authorRole: comment.author_role,
        commentType: comment.comment_type,
        body: comment.body,
        createdAt: comment.created_at,
      })),
      statusHistory: history.results.map((entry) => ({
        fromStatus: entry.from_status,
        toStatus: entry.to_status,
        changedByRole: entry.changed_by_role,
        reason: entry.reason,
        createdAt: entry.created_at,
      })),
    },
  };
}

export async function addRequestComment(
  db: D1Database,
  requestId: string,
  actor: ActorContext,
  input: AddCommentInput,
  now = new Date().toISOString(),
): Promise<AddCommentResult> {
  const request = await db
    .prepare(
      `SELECT reporter_user_id, assigned_technician_id
       FROM service_requests
       WHERE id = ?`,
    )
    .bind(requestId)
    .first<{
      reporter_user_id: string | null;
      assigned_technician_id: string | null;
    }>();

  if (!request) {
    return { ok: false, reason: "not_found" };
  }

  if (!canActorViewRequest(actor, request)) {
    return { ok: false, reason: "forbidden" };
  }

  const id = crypto.randomUUID();

  await db
    .prepare(
      `INSERT INTO request_comments (
        id,
        service_request_id,
        author_user_id,
        author_role,
        comment_type,
        body,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      id,
      requestId,
      actor.id,
      actor.role,
      input.commentType,
      input.body,
      now,
    )
    .run();

  return {
    ok: true,
    data: {
      id,
      authorRole: actor.role,
      commentType: input.commentType,
      body: input.body,
      createdAt: now,
    },
  };
}

export async function reviewServiceRequest(
  db: D1Database,
  requestId: string,
  actor: ActorContext,
  input: ReviewRequestInput,
  now = new Date().toISOString(),
): Promise<ReviewedRequest | null | "invalid_transition"> {
  const row = await db
    .prepare("SELECT status FROM service_requests WHERE id = ?")
    .bind(requestId)
    .first<{ status: RequestStatus }>();

  if (!row) {
    return null;
  }

  if (row.status !== "SUBMITTED") {
    return "invalid_transition";
  }

  await transitionRequestStatus({
    db,
    requestId,
    fromStatus: "SUBMITTED",
    toStatus: "UNDER_REVIEW",
    actor,
    reason: input.note ?? "Review started.",
    now,
  });

  await db
    .prepare(
      `UPDATE service_requests
       SET reviewed_by_user_id = ?, updated_at = ?
       WHERE id = ?`,
    )
    .bind(actor.id, now, requestId)
    .run();

  if (input.note) {
    await addRequestComment(
      db,
      requestId,
      actor,
      { commentType: "NOTE", body: input.note },
      now,
    );
  }

  return { id: requestId, status: "UNDER_REVIEW" };
}

export async function classifyServiceRequest(
  db: D1Database,
  requestId: string,
  actor: ActorContext,
  input: ClassificationInput,
  now = new Date().toISOString(),
): Promise<ClassifiedRequest | null> {
  const row = await db
    .prepare("SELECT id FROM service_requests WHERE id = ?")
    .bind(requestId)
    .first<{ id: string }>();

  if (!row) {
    return null;
  }

  await db
    .prepare(
      `UPDATE service_requests
       SET category = ?, priority = ?, updated_at = ?
       WHERE id = ?`,
    )
    .bind(input.category, input.priority, now, requestId)
    .run();

  if (input.note) {
    await addRequestComment(
      db,
      requestId,
      actor,
      { commentType: "NOTE", body: input.note },
      now,
    );
  }

  return { id: requestId, category: input.category, priority: input.priority };
}

export async function assignTechnicianToRequest(
  db: D1Database,
  requestId: string,
  actor: ActorContext,
  input: AssignmentInput,
  now = new Date().toISOString(),
): Promise<AssignmentResult> {
  const request = await db
    .prepare("SELECT status FROM service_requests WHERE id = ?")
    .bind(requestId)
    .first<{ status: RequestStatus }>();

  if (!request) {
    return { ok: false, reason: "not_found" };
  }

  if (request.status !== "UNDER_REVIEW") {
    return { ok: false, reason: "invalid_transition" };
  }

  const technician = await db
    .prepare(
      `SELECT id
       FROM app_users
       WHERE id = ? AND role = 'TECHNICIAN' AND is_active = 1`,
    )
    .bind(input.technicianId)
    .first<{ id: string }>();

  if (!technician) {
    return { ok: false, reason: "invalid_technician" };
  }

  await transitionRequestStatus({
    db,
    requestId,
    fromStatus: "UNDER_REVIEW",
    toStatus: "ASSIGNED",
    actor,
    reason: input.reason ?? "Assigned to technician.",
    now,
  });

  await db
    .prepare(
      `UPDATE service_requests
       SET assigned_technician_id = ?,
           assigned_by_user_id = ?,
           updated_at = ?
       WHERE id = ?`,
    )
    .bind(input.technicianId, actor.id, now, requestId)
    .run();

  return {
    ok: true,
    data: {
      id: requestId,
      status: "ASSIGNED",
      assignedTechnicianId: input.technicianId,
    },
  };
}

export async function handleCreateRequest(
  request: Request,
  db: D1Database,
): Promise<Response> {
  const actor = readActorContext(request);

  if (!actor || !canRolePerform(actor.role, "CREATE_REQUEST")) {
    return apiError(
      "FORBIDDEN_ACTION",
      "Only a Reporter can create a service request.",
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return apiError("BAD_REQUEST", "Request body must be valid JSON.");
  }

  const validation = validateCreateRequestInput(payload);

  if (!validation.ok) {
    return apiError("VALIDATION_ERROR", "Validation failed.", validation.errors);
  }

  try {
    return apiSuccess(
      await createServiceRequest(db, validation.data, actor),
      201,
    );
  } catch {
    return apiError("INTERNAL_ERROR", "Could not create service request.");
  }
}

export async function handleListUsers(
  request: Request,
  db: D1Database,
): Promise<Response> {
  const actor = readActorContext(request);

  if (!actor || !canRolePerform(actor.role, "ASSIGN_TECHNICIAN")) {
    return apiError(
      "FORBIDDEN_ACTION",
      "Only an Administrator can view technician choices.",
    );
  }

  const role = new URL(request.url).searchParams.get("role");

  if (role !== "TECHNICIAN") {
    return apiError("VALIDATION_ERROR", "Validation failed.", [
      {
        field: "role",
        message: "Only TECHNICIAN role choices are supported.",
      },
    ]);
  }

  try {
    return apiSuccess(await listActiveTechnicians(db));
  } catch {
    return apiError("INTERNAL_ERROR", "Could not list users.");
  }
}

export async function handleListRequests(
  request: Request,
  db: D1Database,
): Promise<Response> {
  const actor = readActorContext(request);

  if (!actor || !canRolePerform(actor.role, "LIST_REQUESTS")) {
    return apiError("FORBIDDEN_ACTION", "This role cannot view reports.");
  }

  const validation = validateListRequestQuery(new URL(request.url).searchParams);

  if (!validation.ok) {
    return apiError("BAD_REQUEST", "Invalid report filters.", validation.errors);
  }

  try {
    return apiSuccess(await listServiceRequests(db, actor, validation.data));
  } catch {
    return apiError("INTERNAL_ERROR", "Could not load reports.");
  }
}

export async function handleGetRequestDetail(
  request: Request,
  db: D1Database,
  requestId: string,
): Promise<Response> {
  const actor = readActorContext(request);

  if (!actor || !canRolePerform(actor.role, "VIEW_REQUEST")) {
    return apiError("FORBIDDEN_ACTION", "This role cannot view report detail.");
  }

  try {
    const result = await getServiceRequestDetail(db, requestId, actor);

    if (!result.ok && result.reason === "not_found") {
      return apiError("NOT_FOUND", "Report not found.");
    }

    if (!result.ok) {
      return apiError("FORBIDDEN_ACTION", "You cannot view this report.");
    }

    return apiSuccess(result.data);
  } catch {
    return apiError("INTERNAL_ERROR", "Could not load report detail.");
  }
}

export async function handleAddRequestComment(
  request: Request,
  db: D1Database,
  requestId: string,
): Promise<Response> {
  const actor = readActorContext(request);

  if (!actor || !canRolePerform(actor.role, "ADD_COMMENT")) {
    return apiError("FORBIDDEN_ACTION", "This role cannot add comments.");
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return apiError("BAD_REQUEST", "Request body must be valid JSON.");
  }

  const validation = validateAddCommentInput(payload);

  if (!validation.ok) {
    return apiError("VALIDATION_ERROR", "Validation failed.", validation.errors);
  }

  try {
    const result = await addRequestComment(
      db,
      requestId,
      actor,
      validation.data,
    );

    if (!result.ok && result.reason === "not_found") {
      return apiError("NOT_FOUND", "Report not found.");
    }

    if (!result.ok) {
      return apiError("FORBIDDEN_ACTION", "You cannot comment on this report.");
    }

    return apiSuccess(result.data, 201);
  } catch {
    return apiError("INTERNAL_ERROR", "Could not add comment.");
  }
}

export async function handleReviewRequest(
  request: Request,
  db: D1Database,
  requestId: string,
): Promise<Response> {
  const actor = readActorContext(request);

  if (!actor || !canRolePerform(actor.role, "REVIEW_REQUEST")) {
    return apiError("FORBIDDEN_ACTION", "Only an Administrator can review.");
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return apiError("BAD_REQUEST", "Request body must be valid JSON.");
  }

  const validation = validateReviewRequestInput(payload);

  if (!validation.ok) {
    return apiError("VALIDATION_ERROR", "Validation failed.", validation.errors);
  }

  try {
    const result = await reviewServiceRequest(
      db,
      requestId,
      actor,
      validation.data,
    );

    if (result === null) {
      return apiError("NOT_FOUND", "Report not found.");
    }

    if (result === "invalid_transition") {
      return apiError(
        "INVALID_STATUS_TRANSITION",
        "Only submitted reports can be moved under review.",
      );
    }

    return apiSuccess(result);
  } catch {
    return apiError("INTERNAL_ERROR", "Could not review report.");
  }
}

export async function handleClassifyRequest(
  request: Request,
  db: D1Database,
  requestId: string,
): Promise<Response> {
  const actor = readActorContext(request);

  if (!actor || !canRolePerform(actor.role, "CLASSIFY_REQUEST")) {
    return apiError("FORBIDDEN_ACTION", "Only an Administrator can classify.");
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return apiError("BAD_REQUEST", "Request body must be valid JSON.");
  }

  const validation = validateClassificationInput(payload);

  if (!validation.ok) {
    return apiError("VALIDATION_ERROR", "Validation failed.", validation.errors);
  }

  try {
    const result = await classifyServiceRequest(
      db,
      requestId,
      actor,
      validation.data,
    );

    if (!result) {
      return apiError("NOT_FOUND", "Report not found.");
    }

    return apiSuccess(result);
  } catch {
    return apiError("INTERNAL_ERROR", "Could not classify report.");
  }
}

export async function handleAssignTechnician(
  request: Request,
  db: D1Database,
  requestId: string,
): Promise<Response> {
  const actor = readActorContext(request);

  if (!actor || !canRolePerform(actor.role, "ASSIGN_TECHNICIAN")) {
    return apiError(
      "FORBIDDEN_ACTION",
      "Only an Administrator can assign technicians.",
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return apiError("BAD_REQUEST", "Request body must be valid JSON.");
  }

  const validation = validateAssignmentInput(payload);

  if (!validation.ok) {
    return apiError("VALIDATION_ERROR", "Validation failed.", validation.errors);
  }

  try {
    const result = await assignTechnicianToRequest(
      db,
      requestId,
      actor,
      validation.data,
    );

    if (result.ok) {
      return apiSuccess(result.data);
    }

    if (result.reason === "not_found") {
      return apiError("NOT_FOUND", "Report not found.");
    }

    if (result.reason === "invalid_technician") {
      return apiError("NOT_FOUND", "Technician not found.");
    }

    return apiError(
      "INVALID_STATUS_TRANSITION",
      "Only under-review reports can be assigned.",
    );
  } catch {
    return apiError("INTERNAL_ERROR", "Could not assign technician.");
  }
}
