import type { Role, SeededActor } from "../types/api";
import { SEEDED_ACTORS } from "../types/api";

export const DEMO_SESSION_STORAGE_KEY = "campus-service-demo-session";

interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export interface DemoSession {
  actorId: string;
  role: Role;
}

export interface DemoLoginInput {
  username: string;
  role: Role;
  password: string;
}

export function getSeededActor(role: Role): SeededActor {
  return SEEDED_ACTORS[role];
}

export function listSeededActors(): SeededActor[] {
  return Object.values(SEEDED_ACTORS);
}

export function createDemoSession(role: Role): DemoSession {
  const actor = getSeededActor(role);
  return { actorId: actor.id, role: actor.role };
}

export function authenticateDemoLogin(input: DemoLoginInput): DemoSession | null {
  const actor = getSeededActor(input.role);
  const username = input.username.trim();
  const password = input.password.trim();

  if (username !== actor.id || password !== actor.id) {
    return null;
  }

  return createDemoSession(actor.role);
}

export function resolveDemoSession(session: DemoSession | null): SeededActor | null {
  if (!session) return null;
  const actor = SEEDED_ACTORS[session.role];
  if (!actor || actor.id !== session.actorId) return null;
  return actor;
}

export function loadDemoSession(storage: StorageLike): DemoSession | null {
  const raw = storage.getItem(DEMO_SESSION_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<DemoSession>;
    if (!parsed.actorId || !parsed.role) return null;
    const session = { actorId: parsed.actorId, role: parsed.role } as DemoSession;
    return resolveDemoSession(session) ? session : null;
  } catch {
    return null;
  }
}

export function saveDemoSession(storage: StorageLike, session: DemoSession): void {
  storage.setItem(DEMO_SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearDemoSession(storage: StorageLike): void {
  storage.removeItem(DEMO_SESSION_STORAGE_KEY);
}
