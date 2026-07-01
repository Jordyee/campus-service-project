import {
  SELF,
  applyD1Migrations,
  env,
  type D1Migration,
} from "cloudflare:test";
import { beforeEach, describe, expect, it } from "vitest";

declare module "cloudflare:test" {
  interface ProvidedEnv {
    DB: D1Database;
    TEST_MIGRATIONS: D1Migration[];
  }
}

beforeEach(async () => {
  await applyD1Migrations(env.DB, env.TEST_MIGRATIONS);

  await env.DB.batch([
    env.DB.prepare(
      `INSERT INTO app_users (id, role, display_name, contact, is_active)
       VALUES (?, 'TECHNICIAN', ?, ?, ?)`,
    ).bind("user-tech-inactive", "Inactive Technician", "inactive@example.edu", 0),
    env.DB.prepare(
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
        reviewed_by_user_id,
        reviewed_at,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ).bind(
      "req-assignable",
      "CSR-20260701-0401",
      "AC leak",
      "AC is leaking near the projector.",
      "Gedung C Ruang 401",
      "AC",
      "HIGH",
      "UNDER_REVIEW",
      "user-reporter-1",
      "Demo Reporter",
      "reporter@example.edu",
      "user-admin-1",
      "2026-07-01T02:00:00.000Z",
      "2026-07-01T01:00:00.000Z",
      "2026-07-01T02:00:00.000Z",
    ),
    env.DB.prepare(
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
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ).bind(
      "req-submitted",
      "CSR-20260701-0402",
      "Submitted request",
      "Still waiting for review.",
      "Gedung D Ruang 101",
      "LAINNYA",
      "MEDIUM",
      "SUBMITTED",
      "user-reporter-1",
      "Demo Reporter",
      "reporter@example.edu",
      "2026-07-01T01:00:00.000Z",
      "2026-07-01T01:00:00.000Z",
    ),
  ]);
});

async function requestJson(
  path: string,
  init: RequestInit = {},
  role = "ADMINISTRATOR",
) {
  const response = await SELF.fetch(`https://example.com${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      "x-actor-role": role,
      ...init.headers,
    },
  });

  return {
    response,
    body: (await response.json()) as {
      data?: unknown;
      error?: {
        code: string;
        message: string;
        details?: { field: string; message: string }[];
      };
    },
  };
}

async function assignTechnician(payload: unknown, role = "ADMINISTRATOR") {
  return requestJson(
    "/api/requests/req-assignable/assignment",
    { method: "POST", body: JSON.stringify(payload) },
    role,
  );
}

describe("technician assignment API", () => {
  it("lists active technician choices for administrators", async () => {
    const { response, body } = await requestJson("/api/users?role=TECHNICIAN");

    expect(response.status).toBe(200);
    expect(body.data).toEqual([
      {
        id: "user-tech-1",
        displayName: "Demo Technician",
        contact: "technician@example.edu",
      },
    ]);
  });

  it("assigns an under-review report and updates detail/list state plus history", async () => {
    const { response, body } = await assignTechnician({
      technicianId: "user-tech-1",
      reason: "Technician has AC coverage today.",
    });

    expect(response.status).toBe(200);
    expect(body.data).toMatchObject({
      id: "req-assignable",
      status: "ASSIGNED",
      assignedTechnicianId: "user-tech-1",
    });

    const detail = await requestJson("/api/requests/req-assignable");
    expect(detail.body.data).toMatchObject({
      status: "ASSIGNED",
      assignedTechnician: {
        id: "user-tech-1",
        displayName: "Demo Technician",
      },
    });
    expect(
      (
        detail.body.data as {
          statusHistory: {
            fromStatus: string | null;
            toStatus: string;
            reason: string | null;
          }[];
        }
      ).statusHistory,
    ).toMatchObject([
      {
        fromStatus: "UNDER_REVIEW",
        toStatus: "ASSIGNED",
        reason: "Technician has AC coverage today.",
      },
    ]);

    const list = await requestJson("/api/requests?status=ASSIGNED");
    expect(list.body.data).toMatchObject([
      {
        id: "req-assignable",
        status: "ASSIGNED",
        assignedTechnicianName: "Demo Technician",
      },
    ]);
  });

  it("rejects missing technician selection", async () => {
    const { response, body } = await assignTechnician({});

    expect(response.status).toBe(422);
    expect(body.error).toEqual({
      code: "VALIDATION_ERROR",
      message: "Validation failed.",
      details: [
        { field: "technicianId", message: "Technician is required." },
      ],
    });
  });

  it("rejects inactive or unknown technicians", async () => {
    const inactive = await assignTechnician({
      technicianId: "user-tech-inactive",
    });
    const unknown = await assignTechnician({ technicianId: "missing-tech" });

    expect(inactive.response.status).toBe(404);
    expect(inactive.body.error?.code).toBe("NOT_FOUND");
    expect(unknown.response.status).toBe(404);
    expect(unknown.body.error?.code).toBe("NOT_FOUND");
  });

  it("rejects non-admin assignment and invalid assignment transitions", async () => {
    const reporterResponse = await SELF.fetch(
      "https://example.com/api/requests/req-assignable/assignment",
      { method: "POST", headers: { "x-actor-role": "REPORTER" } },
    );
    const submitted = await requestJson(
      "/api/requests/req-submitted/assignment",
      {
        method: "POST",
        body: JSON.stringify({ technicianId: "user-tech-1" }),
      },
    );

    expect(reporterResponse.status).toBe(403);
    expect(submitted.response.status).toBe(409);
    expect(submitted.body.error?.code).toBe("INVALID_STATUS_TRANSITION");
  });
});
