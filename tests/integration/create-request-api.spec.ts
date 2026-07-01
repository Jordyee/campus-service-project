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

const validBody = {
  title: "Projector issue",
  description: "Projector does not turn on.",
  location: "Gedung A Ruang 301",
  category: "PERALATAN_KELAS",
  reporterName: "Demo Reporter",
  reporterContact: "reporter@example.edu",
};

beforeEach(async () => {
  await applyD1Migrations(env.DB, env.TEST_MIGRATIONS);
});

describe("POST /api/requests", () => {
  it("creates a submitted service request with status history", async () => {
    const response = await SELF.fetch("https://example.com/api/requests", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-actor-role": "REPORTER",
      },
      body: JSON.stringify(validBody),
    });
    const body = (await response.json()) as {
      data: { id: string; requestNumber: string; status: string };
    };

    expect(response.status).toBe(201);
    expect(body.data.status).toBe("SUBMITTED");
    expect(body.data.requestNumber).toMatch(/^CSR-\d{8}-0001$/);

    const request = await env.DB.prepare(
      `SELECT request_number, title, description, location, category, priority,
              status, reporter_user_id, reporter_name, reporter_contact
       FROM service_requests
       WHERE id = ?`,
    )
      .bind(body.data.id)
      .first<{
        request_number: string;
        title: string;
        description: string;
        location: string;
        category: string;
        priority: string;
        status: string;
        reporter_user_id: string;
        reporter_name: string;
        reporter_contact: string;
      }>();
    const history = await env.DB.prepare(
      `SELECT from_status, to_status, changed_by_user_id, changed_by_role, reason
       FROM request_status_history
       WHERE service_request_id = ?`,
    )
      .bind(body.data.id)
      .first<{
        from_status: string | null;
        to_status: string;
        changed_by_user_id: string;
        changed_by_role: string;
        reason: string;
      }>();

    expect(request).toMatchObject({
      request_number: body.data.requestNumber,
      title: validBody.title,
      description: validBody.description,
      location: validBody.location,
      category: validBody.category,
      priority: "MEDIUM",
      status: "SUBMITTED",
      reporter_user_id: "user-reporter-1",
      reporter_name: validBody.reporterName,
      reporter_contact: validBody.reporterContact,
    });
    expect(history).toEqual({
      from_status: null,
      to_status: "SUBMITTED",
      changed_by_user_id: "user-reporter-1",
      changed_by_role: "REPORTER",
      reason: "Request submitted.",
    });
  });

  it("returns validation errors without creating a request", async () => {
    const response = await SELF.fetch("https://example.com/api/requests", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-actor-role": "REPORTER",
      },
      body: JSON.stringify({ ...validBody, title: "", category: "UPLOAD" }),
    });
    const body = (await response.json()) as {
      error: { code: string; details: { field: string; message: string }[] };
    };
    const count = await env.DB.prepare(
      `SELECT COUNT(*) AS count FROM service_requests`,
    ).first<{ count: number }>();

    expect(response.status).toBe(422);
    expect(body.error.code).toBe("VALIDATION_ERROR");
    expect(body.error.details).toEqual([
      { field: "title", message: "Title is required." },
      { field: "category", message: "Category is invalid." },
    ]);
    expect(count).toEqual({ count: 0 });
  });

  it("rejects non-reporter creation attempts", async () => {
    const response = await SELF.fetch("https://example.com/api/requests", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-actor-role": "TECHNICIAN",
      },
      body: JSON.stringify(validBody),
    });

    expect(response.status).toBe(403);
  });
});
