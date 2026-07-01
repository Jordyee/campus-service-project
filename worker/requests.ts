import {
  apiError,
  apiSuccess,
  canRolePerform,
  isCategory,
  readActorContext,
  type ActorContext,
  type ApiErrorDetail,
  type Category,
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

export type ValidationResult =
  | { ok: true; data: CreateRequestInput }
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
