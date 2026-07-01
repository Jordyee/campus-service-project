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

  await env.DB.prepare(
    `INSERT INTO app_users (id, role, display_name, contact)
     VALUES ('user-tech-2', 'TECHNICIAN', 'Second Technician', 'tech2@example.edu')`,
  ).run();

  await env.DB.batch([
    assignedRequest("req-task-1", "CSR-20260701-0501", "Lab network down", "user-tech-1", null),
    assignedRequest(
      "req-task-accepted",
      "CSR-20260701-0502",
      "Projector calibration",
      "user-tech-1",
      "2026-07-01T04:00:00.000Z",
    ),
    assignedRequest("req-task-other", "CSR-20260701-0503", "AC filter", "user-tech-2", null),
  ]);
});

function assignedRequest(
  id: string,
  requestNumber: string,
  title: string,
  technicianId: string,
  acceptedAt: string | null,
) {
  return env.DB.prepare(
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
      assigned_technician_id,
      assigned_by_user_id,
      assigned_at,
      accepted_at,
      created_at,
      updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, 'ASSIGNED', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).bind(
    id,
    requestNumber,
    title,
    `${title} description.`,
    "Gedung E Ruang 501",
    "INTERNET",
    "HIGH",
    "user-reporter-1",
    "Demo Reporter",
    "reporter@example.edu",
    "user-admin-1",
    technicianId,
    "user-admin-1",
    "2026-07-01T03:00:00.000Z",
    acceptedAt,
    "2026-07-01T01:00:00.000Z",
    acceptedAt ?? "2026-07-01T03:00:00.000Z",
  );
}

async function fetchJson(path: string, init: RequestInit = {}, actorId = "user-tech-1") {
  const response = await SELF.fetch(`https://example.com${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      "x-actor-role": "TECHNICIAN",
      "x-actor-id": actorId,
      ...init.headers,
    },
  });

  return {
    response,
    body: (await response.json()) as {
      data?: unknown;
      error?: { code: string; message: string };
    },
  };
}

describe("technician tasks and acceptance API", () => {
  it("lists only tasks assigned to the current technician", async () => {
    const { response, body } = await fetchJson("/api/technician/tasks");

    expect(response.status).toBe(200);
    expect(body.data).toMatchObject([
      {
        id: "req-task-accepted",
        requestNumber: "CSR-20260701-0502",
        title: "Projector calibration",
        priority: "HIGH",
        status: "ASSIGNED",
        accepted: true,
      },
      {
        id: "req-task-1",
        requestNumber: "CSR-20260701-0501",
        title: "Lab network down",
        location: "Gedung E Ruang 501",
        accepted: false,
      },
    ]);
  });

  it("lets the assigned technician open task detail", async () => {
    const { response, body } = await fetchJson("/api/requests/req-task-1");

    expect(response.status).toBe(200);
    expect(body.data).toMatchObject({
      id: "req-task-1",
      status: "ASSIGNED",
      acceptedAt: null,
      assignedTechnician: {
        id: "user-tech-1",
        displayName: "Demo Technician",
      },
    });
  });

  it("records acceptance without changing the lifecycle status", async () => {
    const { response, body } = await fetchJson("/api/requests/req-task-1/accept", {
      method: "POST",
    });

    expect(response.status).toBe(200);
    expect(body.data).toMatchObject({
      id: "req-task-1",
      status: "ASSIGNED",
    });
    expect((body.data as { acceptedAt: string }).acceptedAt).toMatch(
      /^\d{4}-\d{2}-\d{2}T/,
    );

    const detail = await fetchJson("/api/requests/req-task-1");
    expect(detail.body.data).toMatchObject({
      status: "ASSIGNED",
    });
    expect((detail.body.data as { acceptedAt: string }).acceptedAt).toMatch(
      /^\d{4}-\d{2}-\d{2}T/,
    );
  });

  it("rejects acceptance by a different technician", async () => {
    const { response, body } = await fetchJson(
      "/api/requests/req-task-1/accept",
      { method: "POST" },
      "user-tech-2",
    );

    expect(response.status).toBe(409);
    expect(body.error).toEqual({
      code: "ASSIGNMENT_CONFLICT",
      message: "Only the assigned Technician can accept this task.",
    });
  });

  it("rejects non-technician acceptance", async () => {
    const response = await SELF.fetch(
      "https://example.com/api/requests/req-task-1/accept",
      { method: "POST", headers: { "x-actor-role": "REPORTER" } },
    );

    expect(response.status).toBe(403);
  });
});
