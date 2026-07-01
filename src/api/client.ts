/**
 * API client — satu-satunya tempat yang boleh memanggil fetch() ke backend.
 * Semua endpoint berdasarkan worker/index.ts. Tidak ada endpoint yang dibuat-buat.
 */

import type {
  Role,
  RequestListItem,
  RequestDetail,
  TechnicianTaskItem,
  TechnicianChoice,
  DashboardSummary,
  CreatedRequest,
  CreateRequestInput,
  AddCommentInput,
  ReviewRequestInput,
  ClassificationInput,
  AssignmentInput,
  WorkStatusInput,
  CloseRequestInput,
  ReopenRequestInput,
  ListRequestFilters,
  ApiSuccessResponse,
} from "../types/api";

import { SEEDED_ACTORS, ACTOR_ID_HEADER, ACTOR_ROLE_HEADER } from "../types/api";

// ─── Helper ────────────────────────────────────────────────────────────────────

function actorHeaders(role: Role): HeadersInit {
  const actor = SEEDED_ACTORS[role];
  return {
    "Content-Type": "application/json",
    [ACTOR_ROLE_HEADER]: actor.role,
    [ACTOR_ID_HEADER]: actor.id,
  };
}

async function apiFetch<T>(
  url: string,
  options: RequestInit
): Promise<{ ok: true; data: T } | { ok: false; message: string; status: number }> {
  try {
    const res = await fetch(url, options);
    const json = await res.json();
    if (res.ok) {
      return { ok: true, data: (json as ApiSuccessResponse<T>).data };
    }
    const errJson = json as { error?: { message?: string } };
    return {
      ok: false,
      message: errJson.error?.message ?? "Unknown error",
      status: res.status,
    };
  } catch {
    return { ok: false, message: "Network error — backend tidak terhubung.", status: 0 };
  }
}

// ─── Health ────────────────────────────────────────────────────────────────────

/** GET /api/health */
export async function checkHealth(): Promise<boolean> {
  try {
    const res = await fetch("/api/health");
    return res.ok;
  } catch {
    return false;
  }
}

// ─── Requests List ─────────────────────────────────────────────────────────────

/** GET /api/requests */
export async function listRequests(
  role: Role,
  filters: ListRequestFilters = {}
) {
  const params = new URLSearchParams();
  if (filters.status) params.set("status", filters.status);
  if (filters.category) params.set("category", filters.category);
  if (filters.priority) params.set("priority", filters.priority);
  if (filters.location) params.set("location", filters.location);
  if (filters.keyword) params.set("keyword", filters.keyword);
  const qs = params.toString();
  return apiFetch<RequestListItem[]>(
    `/api/requests${qs ? "?" + qs : ""}`,
    { method: "GET", headers: actorHeaders(role) }
  );
}

// ─── Create Request ────────────────────────────────────────────────────────────

/** POST /api/requests */
export async function createRequest(
  role: Role,
  body: CreateRequestInput
) {
  return apiFetch<CreatedRequest>("/api/requests", {
    method: "POST",
    headers: actorHeaders(role),
    body: JSON.stringify(body),
  });
}

// ─── Request Detail ────────────────────────────────────────────────────────────

/** GET /api/requests/:id */
export async function getRequestDetail(role: Role, id: string) {
  return apiFetch<RequestDetail>(`/api/requests/${encodeURIComponent(id)}`, {
    method: "GET",
    headers: actorHeaders(role),
  });
}

// ─── Admin: Review ─────────────────────────────────────────────────────────────

/** POST /api/requests/:id/review */
export async function reviewRequest(
  role: Role,
  id: string,
  body: ReviewRequestInput
) {
  return apiFetch<{ id: string; status: "UNDER_REVIEW" }>(
    `/api/requests/${encodeURIComponent(id)}/review`,
    { method: "POST", headers: actorHeaders(role), body: JSON.stringify(body) }
  );
}

// ─── Admin: Classification ─────────────────────────────────────────────────────

/** PATCH /api/requests/:id/classification */
export async function classifyRequest(
  role: Role,
  id: string,
  body: ClassificationInput
) {
  return apiFetch<{ id: string; category: string; priority: string }>(
    `/api/requests/${encodeURIComponent(id)}/classification`,
    { method: "PATCH", headers: actorHeaders(role), body: JSON.stringify(body) }
  );
}

// ─── Admin: Assignment ─────────────────────────────────────────────────────────

/** GET /api/users?role=TECHNICIAN */
export async function listTechnicians(role: Role) {
  return apiFetch<TechnicianChoice[]>("/api/users?role=TECHNICIAN", {
    method: "GET",
    headers: actorHeaders(role),
  });
}

/** POST /api/requests/:id/assignment */
export async function assignTechnician(
  role: Role,
  id: string,
  body: AssignmentInput
) {
  return apiFetch<{ id: string; status: "ASSIGNED"; assignedTechnicianId: string }>(
    `/api/requests/${encodeURIComponent(id)}/assignment`,
    { method: "POST", headers: actorHeaders(role), body: JSON.stringify(body) }
  );
}

// ─── Admin: Close / Reopen ─────────────────────────────────────────────────────

/** POST /api/requests/:id/close */
export async function closeRequest(
  role: Role,
  id: string,
  body: CloseRequestInput
) {
  return apiFetch<{ id: string; status: "CLOSED" }>(
    `/api/requests/${encodeURIComponent(id)}/close`,
    { method: "POST", headers: actorHeaders(role), body: JSON.stringify(body) }
  );
}

/** POST /api/requests/:id/reopen */
export async function reopenRequest(
  role: Role,
  id: string,
  body: ReopenRequestInput
) {
  return apiFetch<{ id: string; status: "UNDER_REVIEW" }>(
    `/api/requests/${encodeURIComponent(id)}/reopen`,
    { method: "POST", headers: actorHeaders(role), body: JSON.stringify(body) }
  );
}

// ─── Technician: Tasks ─────────────────────────────────────────────────────────

/** GET /api/technician/tasks */
export async function listTechnicianTasks(role: Role) {
  return apiFetch<TechnicianTaskItem[]>("/api/technician/tasks", {
    method: "GET",
    headers: actorHeaders(role),
  });
}

/** POST /api/requests/:id/accept */
export async function acceptTask(role: Role, id: string) {
  return apiFetch<{ id: string; status: "ASSIGNED"; acceptedAt: string }>(
    `/api/requests/${encodeURIComponent(id)}/accept`,
    { method: "POST", headers: actorHeaders(role), body: JSON.stringify({}) }
  );
}

/** PATCH /api/requests/:id/work-status */
export async function updateWorkStatus(
  role: Role,
  id: string,
  body: WorkStatusInput
) {
  return apiFetch<{ id: string; status: string }>(
    `/api/requests/${encodeURIComponent(id)}/work-status`,
    { method: "PATCH", headers: actorHeaders(role), body: JSON.stringify(body) }
  );
}

// ─── Comments ──────────────────────────────────────────────────────────────────

/** POST /api/requests/:id/comments */
export async function addComment(
  role: Role,
  id: string,
  body: AddCommentInput
) {
  return apiFetch<{ id: string; authorRole: string; commentType: string; body: string; createdAt: string }>(
    `/api/requests/${encodeURIComponent(id)}/comments`,
    { method: "POST", headers: actorHeaders(role), body: JSON.stringify(body) }
  );
}

// ─── Dashboard ─────────────────────────────────────────────────────────────────

/** GET /api/dashboard/summary */
export async function getDashboardSummary(role: Role) {
  return apiFetch<DashboardSummary>("/api/dashboard/summary", {
    method: "GET",
    headers: actorHeaders(role),
  });
}
