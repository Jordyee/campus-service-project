import { describe, expect, it } from "vitest";
import {
  DEMO_SESSION_STORAGE_KEY,
  authenticateDemoLogin,
  clearDemoSession,
  createDemoSession,
  listSeededActors,
  loadDemoSession,
  resolveDemoSession,
  saveDemoSession,
} from "../../src/session/demoSession";

class MemoryStorage {
  private readonly values = new Map<string, string>();

  getItem(key: string): string | null {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.values.set(key, value);
  }

  removeItem(key: string): void {
    this.values.delete(key);
  }
}

describe("demo login session", () => {
  it("creates sessions from the approved seeded users", () => {
    expect(listSeededActors().map((actor) => actor.id)).toEqual([
      "user-reporter-1",
      "user-admin-1",
      "user-tech-1",
      "user-manager-1",
    ]);

    expect(createDemoSession("ADMINISTRATOR")).toEqual({
      actorId: "user-admin-1",
      role: "ADMINISTRATOR",
    });
  });

  it("authenticates demo login fields against the selected seeded actor", () => {
    expect(
      authenticateDemoLogin({
        username: "user-admin-1",
        role: "ADMINISTRATOR",
        password: "user-admin-1",
      }),
    ).toEqual({
      actorId: "user-admin-1",
      role: "ADMINISTRATOR",
    });

    expect(
      authenticateDemoLogin({
        username: "user-admin-1",
        role: "REPORTER",
        password: "user-admin-1",
      }),
    ).toBeNull();

    expect(
      authenticateDemoLogin({
        username: "user-admin-1",
        role: "ADMINISTRATOR",
        password: "wrong-password",
      }),
    ).toBeNull();
  });

  it("persists and resolves a frontend demo session", () => {
    const storage = new MemoryStorage();
    const session = createDemoSession("TECHNICIAN");

    saveDemoSession(storage, session);

    expect(storage.getItem(DEMO_SESSION_STORAGE_KEY)).toContain("user-tech-1");
    expect(loadDemoSession(storage)).toEqual(session);
    expect(resolveDemoSession(session)).toMatchObject({
      id: "user-tech-1",
      role: "TECHNICIAN",
      displayName: "Tono Technician",
    });
  });

  it("rejects stale or tampered stored sessions and can log out", () => {
    const storage = new MemoryStorage();
    storage.setItem(
      DEMO_SESSION_STORAGE_KEY,
      JSON.stringify({ actorId: "user-tech-1", role: "ADMINISTRATOR" }),
    );

    expect(loadDemoSession(storage)).toBeNull();

    saveDemoSession(storage, createDemoSession("REPORTER"));
    clearDemoSession(storage);

    expect(loadDemoSession(storage)).toBeNull();
  });
});
