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
});

async function getDashboard(role = "FACILITY_MANAGER") {
  const response = await SELF.fetch(
    "https://example.com/api/dashboard/summary",
    { headers: { "x-actor-role": role } },
  );

  return {
    response,
    body: (await response.json()) as {
      data?: {
        countsByStatus: Record<string, number>;
        countsByCategory: Record<string, number>;
        countsByPriority: Record<string, number>;
        recentReports: {
          id: string;
          requestNumber: string;
          title: string;
          status: string;
          priority: string;
          createdAt: string;
        }[];
      };
      error?: { code: string; message: string };
    },
  };
}

function requestFixture(
  id: string,
  requestNumber: string,
  title: string,
  status: string,
  category: string,
  priority: string,
  createdAt: string,
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
      created_at,
      updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).bind(
    id,
    requestNumber,
    title,
    "Dashboard fixture.",
    "Gedung H",
    category,
    priority,
    status,
    "user-reporter-1",
    "Demo Reporter",
    "reporter@example.edu",
    createdAt,
    createdAt,
  );
}

describe("facility manager dashboard summary API", () => {
  it("returns zero counts and empty recent reports when no reports exist", async () => {
    const { response, body } = await getDashboard();

    expect(response.status).toBe(200);
    expect(body.data).toEqual({
      countsByStatus: {
        SUBMITTED: 0,
        UNDER_REVIEW: 0,
        ASSIGNED: 0,
        IN_PROGRESS: 0,
        RESOLVED: 0,
        CLOSED: 0,
      },
      countsByCategory: {
        INTERNET: 0,
        AC: 0,
        PERALATAN_KELAS: 0,
        KEBERSIHAN: 0,
        LABORATORIUM: 0,
        LAINNYA: 0,
      },
      countsByPriority: { LOW: 0, MEDIUM: 0, HIGH: 0 },
      recentReports: [],
    });
  });

  it("returns counts by status, category, priority, and recent reports", async () => {
    await env.DB.batch([
      requestFixture(
        "req-old",
        "CSR-20260701-0801",
        "Old submitted report",
        "SUBMITTED",
        "INTERNET",
        "LOW",
        "2026-07-01T01:00:00.000Z",
      ),
      requestFixture(
        "req-review",
        "CSR-20260701-0802",
        "Review report",
        "UNDER_REVIEW",
        "LAINNYA",
        "HIGH",
        "2026-07-01T02:00:00.000Z",
      ),
      requestFixture(
        "req-resolved",
        "CSR-20260701-0803",
        "Resolved report",
        "RESOLVED",
        "AC",
        "MEDIUM",
        "2026-07-01T03:00:00.000Z",
      ),
      requestFixture(
        "req-closed",
        "CSR-20260701-0804",
        "Closed report",
        "CLOSED",
        "AC",
        "HIGH",
        "2026-07-01T04:00:00.000Z",
      ),
    ]);

    const { response, body } = await getDashboard();

    expect(response.status).toBe(200);
    expect(body.data?.countsByStatus).toMatchObject({
      SUBMITTED: 1,
      UNDER_REVIEW: 1,
      ASSIGNED: 0,
      IN_PROGRESS: 0,
      RESOLVED: 1,
      CLOSED: 1,
    });
    expect(body.data?.countsByCategory).toMatchObject({
      INTERNET: 1,
      AC: 2,
      PERALATAN_KELAS: 0,
      KEBERSIHAN: 0,
      LABORATORIUM: 0,
      LAINNYA: 1,
    });
    expect(body.data?.countsByPriority).toEqual({
      LOW: 1,
      MEDIUM: 1,
      HIGH: 2,
    });
    expect(body.data?.recentReports.slice(0, 2)).toEqual([
      {
        id: "req-closed",
        requestNumber: "CSR-20260701-0804",
        title: "Closed report",
        status: "CLOSED",
        priority: "HIGH",
        createdAt: "2026-07-01T04:00:00.000Z",
      },
      {
        id: "req-resolved",
        requestNumber: "CSR-20260701-0803",
        title: "Resolved report",
        status: "RESOLVED",
        priority: "MEDIUM",
        createdAt: "2026-07-01T03:00:00.000Z",
      },
    ]);
  });

  it("rejects non-manager dashboard access", async () => {
    const { response, body } = await getDashboard("ADMINISTRATOR");

    expect(response.status).toBe(403);
    expect(body.error).toEqual({
      code: "FORBIDDEN_ACTION",
      message: "Only a Facility Manager can view the dashboard.",
    });
  });
});
