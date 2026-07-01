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

  for (const request of [
    ["req-review", "SUBMITTED"],
    ["req-reviewed", "UNDER_REVIEW"],
  ]) {
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
        request[0],
        `CSR-20260701-${request[0] === "req-review" ? "0301" : "0302"}`,
        "Projector issue",
        "Projector does not turn on.",
        "Gedung A Ruang 301",
        "PERALATAN_KELAS",
        "MEDIUM",
        request[1],
        "user-reporter-1",
        "Demo Reporter",
        "reporter@example.edu",
        "2026-07-01T01:00:00.000Z",
        "2026-07-01T01:00:00.000Z",
      )
      .run();
  }
});

async function send(
  path: string,
  method: string,
  payload: unknown,
  role = "ADMINISTRATOR",
) {
  const response = await SELF.fetch(`https://example.com${path}`, {
    method,
    headers: {
      "content-type": "application/json",
      "x-actor-role": role,
    },
    body: JSON.stringify(payload),
  });
  return {
    response,
    body: (await response.json()) as {
      data?: Record<string, unknown>;
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
      category: string;
      priority: string;
      comments: { commentType: string; body: string }[];
      statusHistory: {
        fromStatus: string | null;
        toStatus: string;
        changedByRole: string;
        reason: string | null;
      }[];
    };
  };
}

describe("admin review and classification", () => {
  it("moves submitted reports under review and records history plus note", async () => {
    const { response, body } = await send(
      "/api/requests/req-review/review",
      "POST",
      { note: "Clarified duplicate report context." },
    );

    expect(response.status).toBe(200);
    expect(body.data).toMatchObject({
      id: "req-review",
      status: "UNDER_REVIEW",
    });

    const detail = await getDetail("req-review");
    expect(detail.data.status).toBe("UNDER_REVIEW");
    expect(detail.data.statusHistory).toMatchObject([
      {
        fromStatus: "SUBMITTED",
        toStatus: "UNDER_REVIEW",
        changedByRole: "ADMINISTRATOR",
        reason: "Clarified duplicate report context.",
      },
    ]);
    expect(detail.data.comments).toMatchObject([
      {
        commentType: "NOTE",
        body: "Clarified duplicate report context.",
      },
    ]);
  });

  it("saves approved category and priority values with optional note", async () => {
    const { response, body } = await send(
      "/api/requests/req-reviewed/classification",
      "PATCH",
      {
        category: "AC",
        priority: "HIGH",
        note: "Priority raised because room is used today.",
      },
    );

    expect(response.status).toBe(200);
    expect(body.data).toMatchObject({
      id: "req-reviewed",
      category: "AC",
      priority: "HIGH",
    });

    const detail = await getDetail("req-reviewed");
    expect(detail.data.category).toBe("AC");
    expect(detail.data.priority).toBe("HIGH");
    expect(detail.data.comments).toMatchObject([
      {
        commentType: "NOTE",
        body: "Priority raised because room is used today.",
      },
    ]);
  });

  it("rejects invalid category and priority values", async () => {
    const { response, body } = await send(
      "/api/requests/req-reviewed/classification",
      "PATCH",
      { category: "PHOTO_UPLOAD", priority: "URGENT" },
    );

    expect(response.status).toBe(422);
    expect(body.error).toEqual({
      code: "VALIDATION_ERROR",
      message: "Validation failed.",
      details: [
        { field: "category", message: "Category is invalid." },
        { field: "priority", message: "Priority is invalid." },
      ],
    });
  });

  it("rejects non-admin actions and invalid review transitions", async () => {
    const reporterReview = await SELF.fetch(
      "https://example.com/api/requests/req-review/review",
      { method: "POST", headers: { "x-actor-role": "REPORTER" } },
    );
    const technicianClassification = await SELF.fetch(
      "https://example.com/api/requests/req-reviewed/classification",
      { method: "PATCH", headers: { "x-actor-role": "TECHNICIAN" } },
    );

    expect(reporterReview.status).toBe(403);
    expect(technicianClassification.status).toBe(403);

    const alreadyReviewed = await send(
      "/api/requests/req-reviewed/review",
      "POST",
      {},
    );
    expect(alreadyReviewed.response.status).toBe(409);
    expect(alreadyReviewed.body.error?.code).toBe("INVALID_STATUS_TRANSITION");
  });
});
