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
      assigned_technician_id,
      assigned_at,
      created_at,
      updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      "req-detail",
      "CSR-20260701-0101",
      "Projector issue",
      "Projector does not turn on.",
      "Gedung A Ruang 301",
      "PERALATAN_KELAS",
      "HIGH",
      "ASSIGNED",
      "user-reporter-1",
      "Demo Reporter",
      "reporter@example.edu",
      "user-tech-1",
      "2026-07-01T03:00:00.000Z",
      "2026-07-01T01:00:00.000Z",
      "2026-07-01T03:00:00.000Z",
    )
    .run();

  await env.DB.prepare(
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
  )
    .bind(
      "req-other",
      "CSR-20260701-0102",
      "AC issue",
      "AC is leaking.",
      "Gedung B Ruang 202",
      "AC",
      "MEDIUM",
      "SUBMITTED",
      null,
      "Other Reporter",
      "other@example.edu",
      "2026-07-01T04:00:00.000Z",
      "2026-07-01T04:00:00.000Z",
    )
    .run();

  await env.DB.batch([
    env.DB.prepare(
      `INSERT INTO request_status_history (
        id,
        service_request_id,
        from_status,
        to_status,
        changed_by_user_id,
        changed_by_role,
        reason,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    ).bind(
      "hist-submitted",
      "req-detail",
      null,
      "SUBMITTED",
      "user-reporter-1",
      "REPORTER",
      "Request submitted.",
      "2026-07-01T01:00:00.000Z",
    ),
    env.DB.prepare(
      `INSERT INTO request_status_history (
        id,
        service_request_id,
        from_status,
        to_status,
        changed_by_user_id,
        changed_by_role,
        reason,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    ).bind(
      "hist-review",
      "req-detail",
      "SUBMITTED",
      "UNDER_REVIEW",
      "user-admin-1",
      "ADMINISTRATOR",
      "Review started.",
      "2026-07-01T02:00:00.000Z",
    ),
    env.DB.prepare(
      `INSERT INTO request_status_history (
        id,
        service_request_id,
        from_status,
        to_status,
        changed_by_user_id,
        changed_by_role,
        reason,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    ).bind(
      "hist-assigned",
      "req-detail",
      "UNDER_REVIEW",
      "ASSIGNED",
      "user-admin-1",
      "ADMINISTRATOR",
      "Assigned to technician.",
      "2026-07-01T03:00:00.000Z",
    ),
    env.DB.prepare(
      `INSERT INTO request_comments (
        id,
        service_request_id,
        author_user_id,
        author_role,
        comment_type,
        body,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    ).bind(
      "comment-note",
      "req-detail",
      "user-admin-1",
      "ADMINISTRATOR",
      "NOTE",
      "Priority raised for morning class.",
      "2026-07-01T02:30:00.000Z",
    ),
  ]);
});

async function getDetail(id: string, role = "ADMINISTRATOR") {
  const response = await SELF.fetch(`https://example.com/api/requests/${id}`, {
    headers: { "x-actor-role": role },
  });
  return {
    response,
    body: (await response.json()) as {
      data?: {
        requestNumber: string;
        title: string;
        description: string;
        reporterContact: string;
        assignedTechnician: { id: string; displayName: string } | null;
        lifecycle: string[];
        comments: { body: string; commentType: string }[];
        statusHistory: {
          fromStatus: string | null;
          toStatus: string;
          changedByRole: string;
          reason: string | null;
          createdAt: string;
        }[];
      };
      error?: { code: string; message: string };
    },
  };
}

describe("GET /api/requests/:id", () => {
  it("returns report detail, comments, lifecycle, and ordered status history", async () => {
    const { response, body } = await getDetail("req-detail");

    expect(response.status).toBe(200);
    expect(body.data).toMatchObject({
      requestNumber: "CSR-20260701-0101",
      title: "Projector issue",
      description: "Projector does not turn on.",
      reporterContact: "reporter@example.edu",
      assignedTechnician: {
        id: "user-tech-1",
        displayName: "Demo Technician",
      },
      lifecycle: [
        "SUBMITTED",
        "UNDER_REVIEW",
        "ASSIGNED",
        "IN_PROGRESS",
        "RESOLVED",
        "CLOSED",
      ],
      comments: [
        {
          body: "Priority raised for morning class.",
          commentType: "NOTE",
        },
      ],
    });
    expect(body.data?.statusHistory).toEqual([
      {
        fromStatus: null,
        toStatus: "SUBMITTED",
        changedByRole: "REPORTER",
        reason: "Request submitted.",
        createdAt: "2026-07-01T01:00:00.000Z",
      },
      {
        fromStatus: "SUBMITTED",
        toStatus: "UNDER_REVIEW",
        changedByRole: "ADMINISTRATOR",
        reason: "Review started.",
        createdAt: "2026-07-01T02:00:00.000Z",
      },
      {
        fromStatus: "UNDER_REVIEW",
        toStatus: "ASSIGNED",
        changedByRole: "ADMINISTRATOR",
        reason: "Assigned to technician.",
        createdAt: "2026-07-01T03:00:00.000Z",
      },
    ]);
  });

  it("enforces role-sensitive detail access", async () => {
    expect((await getDetail("req-detail", "REPORTER")).response.status).toBe(
      200,
    );
    expect((await getDetail("req-detail", "TECHNICIAN")).response.status).toBe(
      200,
    );
    expect(
      (await getDetail("req-other", "REPORTER")).body.error,
    ).toMatchObject({
      code: "FORBIDDEN_ACTION",
      message: "You cannot view this report.",
    });
  });

  it("handles missing reports clearly", async () => {
    const { response, body } = await getDetail("missing-report");

    expect(response.status).toBe(404);
    expect(body.error).toEqual({
      code: "NOT_FOUND",
      message: "Report not found.",
    });
  });
});
