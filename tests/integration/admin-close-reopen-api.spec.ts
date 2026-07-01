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
    requestFixture("req-resolved", "CSR-20260701-0701", "RESOLVED"),
    requestFixture("req-closed", "CSR-20260701-0702", "CLOSED"),
    requestFixture("req-submitted", "CSR-20260701-0703", "SUBMITTED"),
  ]);
});

function requestFixture(id: string, requestNumber: string, status: string) {
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
      resolved_at,
      closed_at,
      created_at,
      updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).bind(
    id,
    requestNumber,
    `${status} report`,
    "Close and reopen fixture.",
    "Gedung G Ruang 701",
    "LAINNYA",
    "MEDIUM",
    status,
    "user-reporter-1",
    "Demo Reporter",
    "reporter@example.edu",
    "user-admin-1",
    "user-tech-1",
    "user-admin-1",
    "2026-07-01T03:00:00.000Z",
    "2026-07-01T04:00:00.000Z",
    status === "RESOLVED" || status === "CLOSED"
      ? "2026-07-01T05:00:00.000Z"
      : null,
    status === "CLOSED" ? "2026-07-01T06:00:00.000Z" : null,
    "2026-07-01T01:00:00.000Z",
    "2026-07-01T06:00:00.000Z",
  );
}

async function adminJson(path: string, payload: unknown) {
  const response = await SELF.fetch(`https://example.com${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-actor-role": "ADMINISTRATOR",
    },
    body: JSON.stringify(payload),
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

async function getDetail(id: string) {
  const response = await SELF.fetch(`https://example.com/api/requests/${id}`, {
    headers: { "x-actor-role": "ADMINISTRATOR" },
  });

  return (await response.json()) as {
    data: {
      status: string;
      statusHistory: {
        fromStatus: string | null;
        toStatus: string;
        changedByRole: string;
        reason: string | null;
      }[];
    };
  };
}

describe("admin close and reopen API", () => {
  it("closes resolved reports and appends status history", async () => {
    const response = await SELF.fetch(
      "https://example.com/api/requests/req-resolved/close",
      { method: "POST", headers: { "x-actor-role": "ADMINISTRATOR" } },
    );
    const body = (await response.json()) as {
      data?: { id: string; status: string };
    };

    expect(response.status).toBe(200);
    expect(body.data).toMatchObject({
      id: "req-resolved",
      status: "CLOSED",
    });

    const detail = await getDetail("req-resolved");
    expect(detail.data.status).toBe("CLOSED");
    expect(detail.data.statusHistory).toMatchObject([
      {
        fromStatus: "RESOLVED",
        toStatus: "CLOSED",
        changedByRole: "ADMINISTRATOR",
        reason: "Report closed.",
      },
    ]);
  });

  it("reopens closed reports to under review with required reason", async () => {
    const { response, body } = await adminJson(
      "/api/requests/req-closed/reopen",
      { reason: "Issue returned after class." },
    );

    expect(response.status).toBe(200);
    expect(body.data).toMatchObject({
      id: "req-closed",
      status: "UNDER_REVIEW",
    });

    const detail = await getDetail("req-closed");
    expect(detail.data.status).toBe("UNDER_REVIEW");
    expect(detail.data.statusHistory).toMatchObject([
      {
        fromStatus: "CLOSED",
        toStatus: "UNDER_REVIEW",
        changedByRole: "ADMINISTRATOR",
        reason: "Issue returned after class.",
      },
    ]);
  });

  it("also reopens resolved reports to under review", async () => {
    const { response, body } = await adminJson(
      "/api/requests/req-resolved/reopen",
      { reason: "Reporter says the issue remains." },
    );

    expect(response.status).toBe(200);
    expect(body.data).toMatchObject({
      id: "req-resolved",
      status: "UNDER_REVIEW",
    });
  });

  it("rejects missing reopen reason", async () => {
    const { response, body } = await adminJson(
      "/api/requests/req-closed/reopen",
      {},
    );

    expect(response.status).toBe(422);
    expect(body.error).toEqual({
      code: "VALIDATION_ERROR",
      message: "Validation failed.",
      details: [{ field: "reason", message: "Reopen reason is required." }],
    });
  });

  it("rejects forbidden actors and invalid transitions", async () => {
    const reporterClose = await SELF.fetch(
      "https://example.com/api/requests/req-resolved/close",
      { method: "POST", headers: { "x-actor-role": "REPORTER" } },
    );
    const technicianReopen = await SELF.fetch(
      "https://example.com/api/requests/req-closed/reopen",
      { method: "POST", headers: { "x-actor-role": "TECHNICIAN" } },
    );
    const submittedClose = await adminJson(
      "/api/requests/req-submitted/close",
      {},
    );
    const submittedReopen = await adminJson(
      "/api/requests/req-submitted/reopen",
      { reason: "Needs another review." },
    );

    expect(reporterClose.status).toBe(403);
    expect(technicianReopen.status).toBe(403);
    expect(submittedClose.response.status).toBe(409);
    expect(submittedClose.body.error?.code).toBe("INVALID_STATUS_TRANSITION");
    expect(submittedReopen.response.status).toBe(409);
    expect(submittedReopen.body.error?.code).toBe("INVALID_STATUS_TRANSITION");
  });
});
