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

interface SeedRequest {
  id: string;
  requestNumber: string;
  title: string;
  description: string;
  location: string;
  category: string;
  priority: string;
  status: string;
  reporterUserId?: string | null;
  assignedTechnicianId?: string | null;
  createdAt: string;
}

const seedRequests: SeedRequest[] = [
  {
    id: "req-projector",
    requestNumber: "CSR-20260701-0001",
    title: "Projector issue",
    description: "Projector does not turn on.",
    location: "Gedung A Ruang 301",
    category: "PERALATAN_KELAS",
    priority: "HIGH",
    status: "SUBMITTED",
    reporterUserId: "user-reporter-1",
    createdAt: "2026-07-01T01:00:00.000Z",
  },
  {
    id: "req-ac",
    requestNumber: "CSR-20260701-0002",
    title: "AC leak",
    description: "Water near AC unit.",
    location: "Gedung B Ruang 202",
    category: "AC",
    priority: "LOW",
    status: "UNDER_REVIEW",
    reporterUserId: "user-reporter-1",
    createdAt: "2026-07-01T02:00:00.000Z",
  },
  {
    id: "req-internet",
    requestNumber: "CSR-20260701-0003",
    title: "Internet down",
    description: "Lab connection is unavailable.",
    location: "Lab Komputer 1",
    category: "INTERNET",
    priority: "HIGH",
    status: "ASSIGNED",
    reporterUserId: null,
    assignedTechnicianId: "user-tech-1",
    createdAt: "2026-07-01T03:00:00.000Z",
  },
];

beforeEach(async () => {
  await applyD1Migrations(env.DB, env.TEST_MIGRATIONS);

  for (const request of seedRequests) {
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
        request.id,
        request.requestNumber,
        request.title,
        request.description,
        request.location,
        request.category,
        request.priority,
        request.status,
        request.reporterUserId ?? null,
        "Demo Reporter",
        "reporter@example.edu",
        request.assignedTechnicianId ?? null,
        request.createdAt,
        request.createdAt,
      )
      .run();
  }
});

async function listReports(query = "", role = "ADMINISTRATOR") {
  const response = await SELF.fetch(`https://example.com/api/requests${query}`, {
    headers: { "x-actor-role": role },
  });
  const body = (await response.json()) as {
    data?: { title: string; assignedTechnicianName: string | null }[];
    error?: { code: string; details?: { field: string; message: string }[] };
  };

  return { response, body };
}

function titles(body: { data?: { title: string }[] }) {
  return body.data?.map((request) => request.title) ?? [];
}

describe("GET /api/requests", () => {
  it("scopes report lists by actor role", async () => {
    expect(titles((await listReports("", "ADMINISTRATOR")).body)).toEqual([
      "Internet down",
      "AC leak",
      "Projector issue",
    ]);
    expect(titles((await listReports("", "FACILITY_MANAGER")).body)).toEqual([
      "Internet down",
      "AC leak",
      "Projector issue",
    ]);
    expect(titles((await listReports("", "REPORTER")).body)).toEqual([
      "AC leak",
      "Projector issue",
    ]);

    const technician = await listReports("", "TECHNICIAN");
    expect(titles(technician.body)).toEqual(["Internet down"]);
    expect(technician.body.data?.[0].assignedTechnicianName).toBe(
      "Demo Technician",
    );
  });

  it("filters by status, category, priority, location, keyword, and combined query", async () => {
    expect(titles((await listReports("?status=SUBMITTED")).body)).toEqual([
      "Projector issue",
    ]);
    expect(titles((await listReports("?category=AC")).body)).toEqual([
      "AC leak",
    ]);
    expect(titles((await listReports("?priority=HIGH")).body)).toEqual([
      "Internet down",
      "Projector issue",
    ]);
    expect(titles((await listReports("?location=Lab")).body)).toEqual([
      "Internet down",
    ]);
    expect(titles((await listReports("?keyword=projector")).body)).toEqual([
      "Projector issue",
    ]);
    expect(
      titles(
        (
          await listReports(
            "?status=ASSIGNED&category=INTERNET&priority=HIGH&location=Lab&keyword=connection",
          )
        ).body,
      ),
    ).toEqual(["Internet down"]);
  });

  it("returns an empty list when filters match no reports", async () => {
    const { response, body } = await listReports("?keyword=not-found");

    expect(response.status).toBe(200);
    expect(body.data).toEqual([]);
  });

  it("rejects invalid enum filters", async () => {
    const { response, body } = await listReports(
      "?status=OPEN&category=PHOTO_UPLOAD&priority=URGENT",
    );

    expect(response.status).toBe(400);
    expect(body.error).toEqual({
      code: "BAD_REQUEST",
      message: "Invalid report filters.",
      details: [
        { field: "status", message: "Status is invalid." },
        { field: "category", message: "Category is invalid." },
        { field: "priority", message: "Priority is invalid." },
      ],
    });
  });
});
