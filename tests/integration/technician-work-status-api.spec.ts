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
    requestFixture(
      "req-progress",
      "CSR-20260701-0601",
      "ASSIGNED",
      "user-tech-1",
      "2026-07-01T04:00:00.000Z",
    ),
    requestFixture(
      "req-resolve",
      "CSR-20260701-0602",
      "IN_PROGRESS",
      "user-tech-1",
      "2026-07-01T04:00:00.000Z",
    ),
    requestFixture(
      "req-not-accepted",
      "CSR-20260701-0603",
      "ASSIGNED",
      "user-tech-1",
      null,
    ),
    requestFixture(
      "req-other-tech",
      "CSR-20260701-0604",
      "ASSIGNED",
      "user-tech-2",
      "2026-07-01T04:00:00.000Z",
    ),
  ]);
});

function requestFixture(
  id: string,
  requestNumber: string,
  status: string,
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
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).bind(
    id,
    requestNumber,
    `${status} task`,
    "Technician work status fixture.",
    "Gedung F Ruang 601",
    "LAINNYA",
    "MEDIUM",
    status,
    "user-reporter-1",
    "Demo Reporter",
    "reporter@example.edu",
    "user-admin-1",
    technicianId,
    "user-admin-1",
    "2026-07-01T03:00:00.000Z",
    acceptedAt,
    "2026-07-01T01:00:00.000Z",
    "2026-07-01T04:00:00.000Z",
  );
}

async function technicianJson(
  path: string,
  payload: unknown,
  actorId = "user-tech-1",
) {
  const response = await SELF.fetch(`https://example.com${path}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      "x-actor-role": "TECHNICIAN",
      "x-actor-id": actorId,
    },
    body: JSON.stringify(payload),
  });

  return {
    response,
    body: (await response.json()) as {
      data?: unknown;
      error?: { code: string; message: string };
    },
  };
}

async function getDetail(id: string) {
  const response = await SELF.fetch(`https://example.com/api/requests/${id}`, {
    headers: { "x-actor-role": "TECHNICIAN" },
  });

  return (await response.json()) as {
    data: {
      status: string;
      comments: { commentType: string; body: string }[];
      statusHistory: {
        fromStatus: string | null;
        toStatus: string;
        reason: string | null;
      }[];
    };
  };
}

describe("technician work status API", () => {
  it("moves accepted assigned work to in progress with history and note", async () => {
    const { response, body } = await technicianJson(
      "/api/requests/req-progress/work-status",
      { status: "IN_PROGRESS", note: "Started checking cables." },
    );

    expect(response.status).toBe(200);
    expect(body.data).toMatchObject({
      id: "req-progress",
      status: "IN_PROGRESS",
    });

    const detail = await getDetail("req-progress");
    expect(detail.data.status).toBe("IN_PROGRESS");
    expect(detail.data.statusHistory).toMatchObject([
      {
        fromStatus: "ASSIGNED",
        toStatus: "IN_PROGRESS",
        reason: "Started checking cables.",
      },
    ]);
    expect(detail.data.comments).toMatchObject([
      { commentType: "NOTE", body: "Started checking cables." },
    ]);
  });

  it("moves in-progress work to resolved with history and note", async () => {
    const { response, body } = await technicianJson(
      "/api/requests/req-resolve/work-status",
      { status: "RESOLVED", note: "Cable replaced and tested." },
    );

    expect(response.status).toBe(200);
    expect(body.data).toMatchObject({
      id: "req-resolve",
      status: "RESOLVED",
    });

    const detail = await getDetail("req-resolve");
    expect(detail.data.status).toBe("RESOLVED");
    expect(detail.data.statusHistory).toMatchObject([
      {
        fromStatus: "IN_PROGRESS",
        toStatus: "RESOLVED",
        reason: "Cable replaced and tested.",
      },
    ]);
  });

  it("rejects invalid progress transitions", async () => {
    const directResolved = await technicianJson(
      "/api/requests/req-progress/work-status",
      { status: "RESOLVED" },
    );
    const notAccepted = await technicianJson(
      "/api/requests/req-not-accepted/work-status",
      { status: "IN_PROGRESS" },
    );

    expect(directResolved.response.status).toBe(409);
    expect(directResolved.body.error?.code).toBe("INVALID_STATUS_TRANSITION");
    expect(notAccepted.response.status).toBe(409);
    expect(notAccepted.body.error?.code).toBe("INVALID_STATUS_TRANSITION");
  });

  it("rejects another technician with assignment conflict", async () => {
    const { response, body } = await technicianJson(
      "/api/requests/req-progress/work-status",
      { status: "IN_PROGRESS" },
      "user-tech-2",
    );

    expect(response.status).toBe(409);
    expect(body.error).toEqual({
      code: "ASSIGNMENT_CONFLICT",
      message: "Only the assigned Technician can update this task.",
    });
  });

  it("rejects non-technician work status updates", async () => {
    const response = await SELF.fetch(
      "https://example.com/api/requests/req-progress/work-status",
      { method: "PATCH", headers: { "x-actor-role": "REPORTER" } },
    );

    expect(response.status).toBe(403);
  });
});
