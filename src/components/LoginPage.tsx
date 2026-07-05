import React, { useState } from "react";
import type { Role } from "../types/api";
import { authenticateDemoLogin, listSeededActors } from "../session/demoSession";
import type { DemoSession } from "../session/demoSession";

const ROLE_LABELS: Record<Role, string> = {
  REPORTER: "Reporter",
  ADMINISTRATOR: "Administrator",
  TECHNICIAN: "Technician",
  FACILITY_MANAGER: "Facility Manager",
};

const ROLE_HINTS: Record<Role, string> = {
  REPORTER: "Create reports, view status, and add comments.",
  ADMINISTRATOR: "Review reports, set priority, assign technicians, close or reopen work.",
  TECHNICIAN: "View assigned tasks, accept work, and update progress.",
  FACILITY_MANAGER: "View summary dashboard and recent reports.",
};

interface LoginPageProps {
  onLogin: (session: DemoSession) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const actors = listSeededActors();
  const [role, setRole] = useState<Role>("REPORTER");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const selectedActor = actors.find((actor) => actor.role === role) ?? actors[0];

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const session = authenticateDemoLogin({ username, role, password });

    if (!session) {
      setError("Username, role, atau password tidak cocok dengan seeded user demo.");
      return;
    }

    setError(null);
    onLogin(session);
  }

  return (
    <main className="login-page">
      <section className="login-panel" aria-labelledby="login-title">
        <div className="login-brand">
          <span className="app-logo-title">Campus Service</span>
          <span className="app-logo-subtitle">Sistem Permintaan Layanan Kampus</span>
        </div>

        <div className="login-copy">
          <h1 id="login-title">Demo Login</h1>
          <p>Masukkan username, role, dan password dari seeded user demo.</p>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-label" htmlFor="demo-username">
              Username
            </label>
            <input
              id="demo-username"
              className="form-input"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
                setError(null);
              }}
              autoComplete="username"
            />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="demo-role">
              Role
            </label>
            <select
              id="demo-role"
              className="form-select"
              value={role}
              onChange={(event) => {
                setRole(event.target.value as Role);
                setError(null);
              }}
            >
              {actors.map((actor) => (
                <option key={actor.id} value={actor.role}>
                  {ROLE_LABELS[actor.role]}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="demo-password">
              Password
            </label>
            <input
              id="demo-password"
              className="form-input"
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError(null);
              }}
              autoComplete="current-password"
            />
          </div>

          <div className="login-selected-user" aria-live="polite">
            <div>
              <span className="login-selected-label">Demo username/password</span>
              <strong>{selectedActor.id}</strong>
            </div>
            <div>
              <span className="login-selected-label">Seeded user</span>
              <strong>{selectedActor.displayName}</strong>
            </div>
            <p>{ROLE_HINTS[selectedActor.role]}</p>
          </div>

          {error && (
            <div className="form-status-error" role="alert">
              {error}
            </div>
          )}

          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>
      </section>
    </main>
  );
}
