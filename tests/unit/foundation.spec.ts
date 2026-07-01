import { describe, expect, it } from "vitest";
import {
  API_ERROR_STATUS,
  CATEGORIES,
  COMMENT_TYPES,
  PRIORITIES,
  REQUEST_STATUSES,
  ROLES,
  apiError,
  canRolePerform,
  canTransitionStatus,
  isCategory,
  isCommentType,
  isPriority,
  isRequestStatus,
  isRole,
  readActorContext,
} from "../../worker/foundation";

describe("foundation value sets", () => {
  it("matches the approved role, status, category, priority, and comment values", () => {
    expect(ROLES).toEqual([
      "REPORTER",
      "ADMINISTRATOR",
      "TECHNICIAN",
      "FACILITY_MANAGER",
    ]);
    expect(REQUEST_STATUSES).toEqual([
      "SUBMITTED",
      "UNDER_REVIEW",
      "ASSIGNED",
      "IN_PROGRESS",
      "RESOLVED",
      "CLOSED",
    ]);
    expect(CATEGORIES).toEqual([
      "INTERNET",
      "AC",
      "PERALATAN_KELAS",
      "KEBERSIHAN",
      "LABORATORIUM",
      "LAINNYA",
    ]);
    expect(PRIORITIES).toEqual(["LOW", "MEDIUM", "HIGH"]);
    expect(COMMENT_TYPES).toEqual(["COMMENT", "NOTE"]);
  });

  it("validates approved enum values and rejects unknown values", () => {
    expect(isRole("TECHNICIAN")).toBe(true);
    expect(isRole("GOOGLE_USER")).toBe(false);
    expect(isRequestStatus("RESOLVED")).toBe(true);
    expect(isRequestStatus("ARCHIVED")).toBe(false);
    expect(isCategory("PERALATAN_KELAS")).toBe(true);
    expect(isCategory("SPARE_PART")).toBe(false);
    expect(isPriority("HIGH")).toBe(true);
    expect(isPriority("URGENT")).toBe(false);
    expect(isCommentType("NOTE")).toBe(true);
    expect(isCommentType("PRIVATE_NOTE")).toBe(false);
  });
});

describe("actor and role boundaries", () => {
  it("reads development actor context from headers without an identity provider", () => {
    const request = new Request("https://example.com/api/test", {
      headers: { "x-actor-role": "ADMINISTRATOR" },
    });

    expect(readActorContext(request)).toEqual({
      id: "user-admin-1",
      role: "ADMINISTRATOR",
    });
  });

  it("uses an explicit actor id header when provided", () => {
    const request = new Request("https://example.com/api/test", {
      headers: {
        "x-actor-id": "custom-tech",
        "x-actor-role": "TECHNICIAN",
      },
    });

    expect(readActorContext(request)).toEqual({
      id: "custom-tech",
      role: "TECHNICIAN",
    });
  });

  it("rejects unknown roles and keeps sensitive actions role-bound", () => {
    const request = new Request("https://example.com/api/test", {
      headers: { "x-actor-role": "FACULTY" },
    });

    expect(readActorContext(request)).toBeNull();
    expect(canRolePerform("ADMINISTRATOR", "ASSIGN_TECHNICIAN")).toBe(true);
    expect(canRolePerform("REPORTER", "ASSIGN_TECHNICIAN")).toBe(false);
    expect(canRolePerform("TECHNICIAN", "UPDATE_WORK_STATUS")).toBe(true);
    expect(canRolePerform("FACILITY_MANAGER", "VIEW_DASHBOARD")).toBe(true);
    expect(canRolePerform("FACILITY_MANAGER", "ADD_COMMENT")).toBe(false);
  });
});

describe("lifecycle transitions", () => {
  it("allows only approved lifecycle transitions and reopen paths", () => {
    expect(canTransitionStatus(null, "SUBMITTED")).toBe(true);
    expect(canTransitionStatus("SUBMITTED", "UNDER_REVIEW")).toBe(true);
    expect(canTransitionStatus("UNDER_REVIEW", "ASSIGNED")).toBe(true);
    expect(canTransitionStatus("ASSIGNED", "IN_PROGRESS")).toBe(true);
    expect(canTransitionStatus("IN_PROGRESS", "RESOLVED")).toBe(true);
    expect(canTransitionStatus("RESOLVED", "CLOSED")).toBe(true);
    expect(canTransitionStatus("RESOLVED", "UNDER_REVIEW")).toBe(true);
    expect(canTransitionStatus("CLOSED", "UNDER_REVIEW")).toBe(true);
  });

  it("rejects lifecycle jumps outside the approved workflow", () => {
    expect(canTransitionStatus("SUBMITTED", "ASSIGNED")).toBe(false);
    expect(canTransitionStatus("ASSIGNED", "RESOLVED")).toBe(false);
    expect(canTransitionStatus("CLOSED", "RESOLVED")).toBe(false);
  });
});

describe("shared API responses", () => {
  it("maps the approved error catalog to HTTP status codes", () => {
    expect(API_ERROR_STATUS).toEqual({
      BAD_REQUEST: 400,
      FORBIDDEN_ACTION: 403,
      NOT_FOUND: 404,
      INVALID_STATUS_TRANSITION: 409,
      ASSIGNMENT_CONFLICT: 409,
      VALIDATION_ERROR: 422,
      INTERNAL_ERROR: 500,
    });
  });

  it("returns the approved error response shape", async () => {
    const response = apiError("VALIDATION_ERROR", "Validation failed.", [
      { field: "title", message: "Title is required." },
    ]);
    const body = await response.json();

    expect(response.status).toBe(422);
    expect(body).toEqual({
      error: {
        code: "VALIDATION_ERROR",
        message: "Validation failed.",
        details: [{ field: "title", message: "Title is required." }],
      },
    });
  });
});
