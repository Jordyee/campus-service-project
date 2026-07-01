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
      created_at,
      updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      "req-comments",
      "CSR-20260701-0201",
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
      "2026-07-01T01:00:00.000Z",
      "2026-07-01T01:00:00.000Z",
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
      "req-private",
      "CSR-20260701-0202",
      "Private issue",
      "Private report.",
      "Gedung C",
      "LAINNYA",
      "LOW",
      "SUBMITTED",
      null,
      "Other Reporter",
      "other@example.edu",
      "2026-07-01T02:00:00.000Z",
      "2026-07-01T02:00:00.000Z",
    )
    .run();
});

async function postComment(
  requestId: string,
  payload: unknown,
  role = "ADMINISTRATOR",
) {
  const response = await SELF.fetch(
    `https://example.com/api/requests/${requestId}/comments`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-actor-role": role,
      },
      body: JSON.stringify(payload),
    },
  );
  return {
    response,
    body: (await response.json()) as {
      data?: {
        id: string;
        authorRole: string;
        commentType: string;
        body: string;
        createdAt: string;
      };
      error?: {
        code: string;
        message: string;
        details?: { field: string; message: string }[];
      };
    },
  };
}

async function getDetail(requestId: string) {
  const response = await SELF.fetch(
    `https://example.com/api/requests/${requestId}`,
    { headers: { "x-actor-role": "ADMINISTRATOR" } },
  );
  return (await response.json()) as {
    data: {
      comments: {
        authorRole: string;
        commentType: string;
        body: string;
      }[];
    };
  };
}

describe("POST /api/requests/:id/comments", () => {
  it("adds append-only comments and notes to the detail timeline", async () => {
    const note = await postComment("req-comments", {
      commentType: "NOTE",
      body: "Duplicate report clarified with reporter.",
    });
    const comment = await postComment(
      "req-comments",
      {
        commentType: "COMMENT",
        body: "Technician has been informed.",
      },
      "TECHNICIAN",
    );

    expect(note.response.status).toBe(201);
    expect(note.body.data).toMatchObject({
      authorRole: "ADMINISTRATOR",
      commentType: "NOTE",
      body: "Duplicate report clarified with reporter.",
    });
    expect(comment.response.status).toBe(201);

    const detail = await getDetail("req-comments");
    expect(
      detail.data.comments.map(({ authorRole, commentType, body }) => ({
        authorRole,
        commentType,
        body,
      })),
    ).toEqual([
      {
        authorRole: "ADMINISTRATOR",
        commentType: "NOTE",
        body: "Duplicate report clarified with reporter.",
      },
      {
        authorRole: "TECHNICIAN",
        commentType: "COMMENT",
        body: "Technician has been informed.",
      },
    ]);
  });

  it("validates required body text and comment type", async () => {
    const { response, body } = await postComment("req-comments", {
      commentType: "PRIVATE",
      body: " ",
    });

    expect(response.status).toBe(422);
    expect(body.error).toEqual({
      code: "VALIDATION_ERROR",
      message: "Validation failed.",
      details: [
        { field: "body", message: "Comment body is required." },
        { field: "commentType", message: "Comment type is invalid." },
      ],
    });
  });

  it("rejects viewers without comment permission or request access", async () => {
    const manager = await SELF.fetch(
      "https://example.com/api/requests/req-comments/comments",
      {
        method: "POST",
        headers: { "x-actor-role": "FACILITY_MANAGER" },
      },
    );
    expect(manager.status).toBe(403);

    const reporterOtherRequest = await postComment(
      "req-private",
      { commentType: "COMMENT", body: "Cannot access this." },
      "REPORTER",
    );
    expect(reporterOtherRequest.response.status).toBe(403);
    expect(reporterOtherRequest.body.error).toMatchObject({
      code: "FORBIDDEN_ACTION",
    });
  });

  it("does not expose edit or delete routes", async () => {
    const patch = await SELF.fetch(
      "https://example.com/api/requests/req-comments/comments/comment-1",
      {
        method: "PATCH",
        headers: { "x-actor-role": "ADMINISTRATOR" },
      },
    );
    const remove = await SELF.fetch(
      "https://example.com/api/requests/req-comments/comments/comment-1",
      {
        method: "DELETE",
        headers: { "x-actor-role": "ADMINISTRATOR" },
      },
    );

    expect(patch.status).toBe(404);
    expect(remove.status).toBe(404);
  });
});
