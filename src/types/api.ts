/**
 * Type definitions untuk API response dari backend Worker.
 * Disalin dan disesuaikan dari worker/foundation.ts dan worker/requests.ts.
 * JANGAN menambah tipe yang tidak ada di backend.
 */

// ─── Enum Constants ────────────────────────────────────────────────────────────

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

// ─── Type Aliases ──────────────────────────────────────────────────────────────

export type Role = (typeof ROLES)[number];
export type Category = (typeof CATEGORIES)[number];
export type Priority = (typeof PRIORITIES)[number];
export type RequestStatus = (typeof REQUEST_STATUSES)[number];
export type CommentType = (typeof COMMENT_TYPES)[number];

// ─── Actor Context (header-based, development-friendly) ───────────────────────

export const ACTOR_ID_HEADER = "x-actor-id";
export const ACTOR_ROLE_HEADER = "x-actor-role";

export interface SeededActor {
  id: string;
  role: Role;
  displayName: string;
}

export const SEEDED_ACTORS: Record<Role, SeededActor> = {
  REPORTER: { id: "user-reporter-1", role: "REPORTER", displayName: "Rina Reporter" },
  ADMINISTRATOR: { id: "user-admin-1", role: "ADMINISTRATOR", displayName: "Agus Administrator" },
  TECHNICIAN: { id: "user-tech-1", role: "TECHNICIAN", displayName: "Tono Technician" },
  FACILITY_MANAGER: { id: "user-manager-1", role: "FACILITY_MANAGER", displayName: "Maya Facility Manager" },
};

// ─── Request / Response Shapes (sesuai worker/requests.ts) ────────────────────

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

export interface TechnicianTaskItem {
  id: string;
  requestNumber: string;
  title: string;
  location: string;
  priority: Priority;
  status: RequestStatus;
  accepted: boolean;
  acceptedAt: string | null;
  updatedAt: string;
}

export interface DashboardRecentReport {
  id: string;
  requestNumber: string;
  title: string;
  status: RequestStatus;
  priority: Priority;
  createdAt: string;
}

export interface DashboardSummary {
  countsByStatus: Record<RequestStatus, number>;
  countsByCategory: Record<Category, number>;
  countsByPriority: Record<Priority, number>;
  recentReports: DashboardRecentReport[];
}

export interface RequestComment {
  id: string;
  authorRole: Role;
  commentType: CommentType;
  body: string;
  createdAt: string;
}

export interface RequestStatusHistoryItem {
  fromStatus: RequestStatus | null;
  toStatus: RequestStatus;
  changedByRole: Role;
  reason: string | null;
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
  acceptedAt: string | null;
  createdAt: string;
  updatedAt: string;
  lifecycle: RequestStatus[];
  comments: RequestComment[];
  statusHistory: RequestStatusHistoryItem[];
}

export interface TechnicianChoice {
  id: string;
  displayName: string;
  contact: string | null;
}

export interface AddCommentInput {
  body: string;
  commentType: CommentType;
}

export interface ReviewRequestInput {
  note?: string;
}

export interface ClassificationInput {
  category: Category;
  priority: Priority;
  note?: string;
}

export interface AssignmentInput {
  technicianId: string;
  reason?: string;
}

export interface WorkStatusInput {
  status: "IN_PROGRESS" | "RESOLVED";
  note?: string;
}

export interface CloseRequestInput {
  reason?: string;
}

export interface ReopenRequestInput {
  reason: string;
}

export interface ListRequestFilters {
  status?: RequestStatus;
  category?: Category;
  priority?: Priority;
  location?: string;
  keyword?: string;
}

// ─── API Response Wrapper ──────────────────────────────────────────────────────

export interface ApiSuccessResponse<T> {
  data: T;
}

export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    details?: { field?: string; message: string }[];
  };
}
