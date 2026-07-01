import {
  applyD1Migrations,
  env,
  type D1Migration,
} from "cloudflare:test";
import { beforeEach, describe, expect, it } from "vitest";
import { transitionRequestStatus } from "../../worker/status-history";

declare module "cloudflare:test" {
  interface ProvidedEnv {
    DB: D1Database;
    TEST_MIGRATIONS: D1Migration[];
  }
}

beforeEach(async () => {
  await applyD1Migrations(env.DB, env.TEST_MIGRATIONS);
});

describe("foundation D1 schema", () => {
  it("creates only the approved core application tables", async () => {
    const { results } = await env.DB.prepare(
      `SELECT name FROM sqlite_master
       WHERE type = 'table'
         AND name NOT LIKE 'sqlite_%'
         AND name NOT LIKE '_cf_%'
         AND name != 'd1_migrations'
       ORDER BY name`,
    ).all<{ name: string }>();

    expect(results.map((row) => row.name)).toEqual([
      "app_users",
      "request_comments",
      "request_status_history",
      "service_requests",
    ]);
  });

  it("seeds one active demo actor for each approved role", async () => {
    const { results } = await env.DB.prepare(
      `SELECT role, COUNT(*) AS count
       FROM app_users
       WHERE is_active = 1
       GROUP BY role
       ORDER BY role`,
    ).all<{ role: string; count: number }>();

    expect(results).toEqual([
      { role: "ADMINISTRATOR", count: 1 },
      { role: "FACILITY_MANAGER", count: 1 },
      { role: "REPORTER", count: 1 },
      { role: "TECHNICIAN", count: 1 },
    ]);
  });

  it("enforces enum constraints in the schema", async () => {
    await expect(
      env.DB.prepare(
        `INSERT INTO app_users (id, role, display_name)
         VALUES ('bad-role', 'GOOGLE_USER', 'Bad Role')`,
      ).run(),
    ).rejects.toThrow();
  });

  it("updates request status and writes status history through one helper", async () => {
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
        "req-1",
        "CSR-TEST-0001",
        "Projector issue",
        "Projector does not turn on.",
        "Gedung A Ruang 301",
        "PERALATAN_KELAS",
        "MEDIUM",
        "SUBMITTED",
        "user-reporter-1",
        "Demo Reporter",
        "reporter@example.edu",
        "2026-07-01T00:00:00.000Z",
        "2026-07-01T00:00:00.000Z",
      )
      .run();

    await transitionRequestStatus({
      db: env.DB,
      requestId: "req-1",
      fromStatus: "SUBMITTED",
      toStatus: "UNDER_REVIEW",
      actor: { id: "user-admin-1", role: "ADMINISTRATOR" },
      reason: "Review started.",
      now: "2026-07-01T01:00:00.000Z",
    });

    const request = await env.DB.prepare(
      `SELECT status, reviewed_at, updated_at FROM service_requests WHERE id = ?`,
    )
      .bind("req-1")
      .first<{ status: string; reviewed_at: string; updated_at: string }>();
    const history = await env.DB.prepare(
      `SELECT from_status, to_status, changed_by_user_id, changed_by_role, reason
       FROM request_status_history
       WHERE service_request_id = ?`,
    )
      .bind("req-1")
      .first<{
        from_status: string;
        to_status: string;
        changed_by_user_id: string;
        changed_by_role: string;
        reason: string;
      }>();

    expect(request).toEqual({
      status: "UNDER_REVIEW",
      reviewed_at: "2026-07-01T01:00:00.000Z",
      updated_at: "2026-07-01T01:00:00.000Z",
    });
    expect(history).toEqual({
      from_status: "SUBMITTED",
      to_status: "UNDER_REVIEW",
      changed_by_user_id: "user-admin-1",
      changed_by_role: "ADMINISTRATOR",
      reason: "Review started.",
    });
  });

  it("does not write history when no request row is updated", async () => {
    await expect(
      transitionRequestStatus({
        db: env.DB,
        requestId: "missing-request",
        fromStatus: "SUBMITTED",
        toStatus: "UNDER_REVIEW",
        actor: { id: "user-admin-1", role: "ADMINISTRATOR" },
        now: "2026-07-01T01:00:00.000Z",
      }),
    ).rejects.toThrow("Status transition did not update request");

    const row = await env.DB.prepare(
      `SELECT COUNT(*) AS count FROM request_status_history`,
    ).first<{ count: number }>();

    expect(row).toEqual({ count: 0 });
  });
});
