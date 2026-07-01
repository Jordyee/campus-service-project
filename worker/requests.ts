import {
  apiError,
  apiSuccess,
  canRolePerform,
  isCategory,
  isPriority,
  isRequestStatus,
  readActorContext,
  type ActorContext,
  type ApiErrorDetail,
  type Category,
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
