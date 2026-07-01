export const ROLES = [
  "REPORTER",
  "ADMINISTRATOR",
  "TECHNICIAN",
  "FACILITY_MANAGER",
] as const;

export const CATEGORIES = [
  "INTERNET",
  "AC",
  "PERALATAN_KELAS",
  "KEBERSIHAN",
  "LABORATORIUM",
  "LAINNYA",
] as const;

export const PRIORITIES = ["LOW", "MEDIUM", "HIGH"] as const;

export const REQUEST_STATUSES = [
  "SUBMITTED",
  "UNDER_REVIEW",
  "ASSIGNED",
  "IN_PROGRESS",
  "RESOLVED",
  "CLOSED",
] as const;

export const COMMENT_TYPES = ["COMMENT", "NOTE"] as const;

export const ACTIONS = [
  "CREATE_REQUEST",
  "LIST_REQUESTS",
  "VIEW_REQUEST",
  "REVIEW_REQUEST",
  "CLASSIFY_REQUEST",
  "ASSIGN_TECHNICIAN",
  "ACCEPT_TASK",
  "UPDATE_WORK_STATUS",
  "ADD_COMMENT",
  "CLOSE_REQUEST",
  "REOPEN_REQUEST",
  "VIEW_DASHBOARD",
] as const;

export type Role = (typeof ROLES)[number];
export type Category = (typeof CATEGORIES)[number];
export type Priority = (typeof PRIORITIES)[number];
export type RequestStatus = (typeof REQUEST_STATUSES)[number];
export type CommentType = (typeof COMMENT_TYPES)[number];
export type Action = (typeof ACTIONS)[number];

export interface ActorContext {
  id: string;
  role: Role;
}

export const ACTOR_ID_HEADER = "x-actor-id";
export const ACTOR_ROLE_HEADER = "x-actor-role";

export const SEEDED_ACTORS: Record<Role, ActorContext> = {
  REPORTER: { id: "user-reporter-1", role: "REPORTER" },
  ADMINISTRATOR: { id: "user-admin-1", role: "ADMINISTRATOR" },
  TECHNICIAN: { id: "user-tech-1", role: "TECHNICIAN" },
  FACILITY_MANAGER: { id: "user-manager-1", role: "FACILITY_MANAGER" },
};

export type ApiErrorCode =
  | "BAD_REQUEST"
  | "FORBIDDEN_ACTION"
  | "NOT_FOUND"
  | "INVALID_STATUS_TRANSITION"
  | "ASSIGNMENT_CONFLICT"
  | "VALIDATION_ERROR"
  | "INTERNAL_ERROR";

export interface ApiErrorDetail {
  field?: string;
  message: string;
}

export const API_ERROR_STATUS: Record<ApiErrorCode, number> = {
  BAD_REQUEST: 400,
  FORBIDDEN_ACTION: 403,
  NOT_FOUND: 404,
  INVALID_STATUS_TRANSITION: 409,
  ASSIGNMENT_CONFLICT: 409,
  VALIDATION_ERROR: 422,
  INTERNAL_ERROR: 500,
};

const ROLE_ACTIONS: Record<Role, readonly Action[]> = {
  REPORTER: ["CREATE_REQUEST", "LIST_REQUESTS", "VIEW_REQUEST", "ADD_COMMENT"],
  ADMINISTRATOR: [
    "LIST_REQUESTS",
    "VIEW_REQUEST",
    "REVIEW_REQUEST",
    "CLASSIFY_REQUEST",
    "ASSIGN_TECHNICIAN",
    "ADD_COMMENT",
    "CLOSE_REQUEST",
    "REOPEN_REQUEST",
  ],
  TECHNICIAN: [
    "LIST_REQUESTS",
    "VIEW_REQUEST",
    "ACCEPT_TASK",
    "UPDATE_WORK_STATUS",
    "ADD_COMMENT",
  ],
  FACILITY_MANAGER: ["LIST_REQUESTS", "VIEW_REQUEST", "VIEW_DASHBOARD"],
};

const STATUS_TRANSITIONS: Record<RequestStatus, readonly RequestStatus[]> = {
  SUBMITTED: ["UNDER_REVIEW"],
  UNDER_REVIEW: ["ASSIGNED"],
  ASSIGNED: ["IN_PROGRESS"],
  IN_PROGRESS: ["RESOLVED"],
  RESOLVED: ["CLOSED", "UNDER_REVIEW"],
  CLOSED: ["UNDER_REVIEW"],
};

function isOneOf<T extends readonly string[]>(
  values: T,
  value: unknown,
): value is T[number] {
  return typeof value === "string" && values.includes(value);
}

export function isRole(value: unknown): value is Role {
  return isOneOf(ROLES, value);
}

export function isCategory(value: unknown): value is Category {
  return isOneOf(CATEGORIES, value);
}

export function isPriority(value: unknown): value is Priority {
  return isOneOf(PRIORITIES, value);
}

export function isRequestStatus(value: unknown): value is RequestStatus {
  return isOneOf(REQUEST_STATUSES, value);
}

export function isCommentType(value: unknown): value is CommentType {
  return isOneOf(COMMENT_TYPES, value);
}

export function readActorContext(request: Request): ActorContext | null {
  const role = request.headers.get(ACTOR_ROLE_HEADER);

  if (!isRole(role)) {
    return null;
  }

  const actorId = request.headers.get(ACTOR_ID_HEADER)?.trim();
  return { id: actorId || SEEDED_ACTORS[role].id, role };
}

export function canRolePerform(role: Role, action: Action): boolean {
  return ROLE_ACTIONS[role].includes(action);
}

export function canTransitionStatus(
  fromStatus: RequestStatus | null,
  toStatus: RequestStatus,
): boolean {
  if (fromStatus === null) {
    return toStatus === "SUBMITTED";
  }

  return STATUS_TRANSITIONS[fromStatus].includes(toStatus);
}

export function apiSuccess<T>(data: T, status = 200): Response {
  return Response.json({ data }, { status });
}

export function apiError(
  code: ApiErrorCode,
  message: string,
  details?: ApiErrorDetail[],
): Response {
  return Response.json(
    {
      error: {
        code,
        message,
        ...(details ? { details } : {}),
      },
    },
    { status: API_ERROR_STATUS[code] },
  );
}
