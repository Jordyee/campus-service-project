import React, { useState } from "react";
import type { Role } from "../types/api";
import { authenticateDemoLogin, listSeededActors } from "../session/demoSession";
import type { DemoSession } from "../session/demoSession";

const ROLE_LABELS: Record<Role, string> = {
  REPORTER: "Reporter",
  ADMINISTRATOR: "Admin",
  TECHNICIAN: "Technician",
  FACILITY_MANAGER: "Manager",
};

function RoleIcon({ role }: { role: Role }) {
  if (role === "ADMINISTRATOR") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l7 3v5c0 4.6-2.9 8.2-7 10-4.1-1.8-7-5.4-7-10V6l7-3z" />
        <path d="M9 12l2 2 4-5" />
      </svg>
    );
  }

  if (role === "TECHNICIAN") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.7 6.3a4 4 0 0 0-5 5L4 17v3h3l5.7-5.7a4 4 0 0 0 5-5l-3 3-3-3 3-3z" />
      </svg>
    );
  }

  if (role === "FACILITY_MANAGER") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 19V5" />
        <path d="M8 17v-5" />
        <path d="M12 17V8" />
        <path d="M16 17v-7" />
        <path d="M20 17V6" />
        <path d="M4 19h17" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </svg>
  );
}

function PasswordVisibilityIcon({ visible }: { visible: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" />
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
      {!visible && <path d="M4 4l16 16" />}
    </svg>
  );
}

const ROLE_GUIDES: Array<{ role: Role; title: string; description: string }> = [
  {
    role: "REPORTER",
    title: "Reporter",
    description: "Create reports, track status, and add comments to your requests.",
  },
  {
    role: "ADMINISTRATOR",
    title: "Administrator",
    description: "Review reports, set priority, assign technicians, and manage the lifecycle.",
  },
  {
    role: "TECHNICIAN",
    title: "Technician",
    description: "View assigned tasks, accept work, update progress, and mark as resolved.",
  },
  {
    role: "FACILITY_MANAGER",
    title: "Facility Manager",
    description: "View dashboard summaries and high-level reports of campus activity.",
  },
];

const WORKFLOW_STEPS = [
  {
    number: "01",
    title: "Submitted",
    description: "Reporter sends a new service request.",
  },
  {
    number: "02",
    title: "Under Review",
    description: "Admin reviews and sets category or priority.",
  },
  {
    number: "03",
    title: "Assigned",
    description: "Administrator assigns a technician.",
  },
  {
    number: "04",
    title: "In Progress",
    description: "Technician works on the request.",
  },
  {
    number: "05",
    title: "Resolved",
    description: "Technician marks the work completed.",
  },
  {
    number: "06",
    title: "Closed",
    description: "Admin closes the request after review.",
  },
];

interface LoginPageProps {
  onLogin: (session: DemoSession) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const actors = listSeededActors();
  const [role, setRole] = useState<Role>("REPORTER");
  const selectedActor = actors.find((actor) => actor.role === role) ?? actors[0];
  const [username, setUsername] = useState(selectedActor.id);
  const [password, setPassword] = useState(selectedActor.id);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function selectRole(nextRole: Role) {
    const nextActor = actors.find((actor) => actor.role === nextRole) ?? actors[0];
    setRole(nextActor.role);
    setUsername(nextActor.id);
    setPassword(nextActor.id);
    setError(null);
  }

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
    <main className="login-shell">
      <section className="login-panel" aria-labelledby="login-title">
        <div className="login-brand">
          <div className="login-brand-mark" aria-hidden="true">B</div>
          <span>CampusOps</span>
        </div>

        <div className="login-intro">
          <h1 id="login-title">Welcome to Campus Service</h1>
          <p>Report, track, and manage campus facility service requests.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-field">
            <span>Email or Campus ID</span>
            <input
              type="text"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
                setError(null);
              }}
              placeholder="e.g. user-reporter-1"
              autoComplete="username"
            />
          </label>

          <label className="login-field">
            <span>Password</span>
            <span className="login-password-control">
              <input
                type={isPasswordVisible ? "text" : "password"}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError(null);
                }}
                placeholder="Enter password"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-visibility-button"
                onClick={() => setIsPasswordVisible((visible) => !visible)}
                aria-label={isPasswordVisible ? "Hide password" : "Show password"}
              >
                <PasswordVisibilityIcon visible={isPasswordVisible} />
              </button>
            </span>
          </label>

          {error && (
            <div className="form-status-error" role="alert">
              {error}
            </div>
          )}

          <button type="submit" className="login-submit">
            Sign In
          </button>
        </form>

        <div className="login-role-area" aria-label="System access role">
          <div className="login-divider" />
          <p className="login-role-title">System Access Role</p>
          <div className="login-role-grid">
            {ROLE_GUIDES.map((item) => (
              <button
                key={item.role}
                type="button"
                className={`login-role-button${role === item.role ? " login-role-button--active" : ""}`}
                onClick={() => selectRole(item.role)}
                aria-pressed={role === item.role}
              >
                <span className="login-role-icon" aria-hidden="true"><RoleIcon role={item.role} /></span>
                <span>{ROLE_LABELS[item.role]}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="login-footer">&copy; 2026 Dave Jordy Gerungan. All rights reserved.</p>
      </section>

      <section className="login-guide-panel" aria-labelledby="guide-title">
        <div className="login-guide-content">
          <div className="guide-hero">
            <h2 id="guide-title">How Campus Service Works</h2>
            <p>
              Campus Service helps campus users report facility issues, lets administrators review
              and assign requests, allows technicians to update work progress, and gives facility
              managers a simple overview of service activity.
            </p>
          </div>

          <section className="guide-section" aria-labelledby="workflow-title">
            <div className="guide-section-title">
              <span aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M4 6h7" />
                  <path d="M4 12h12" />
                  <path d="M4 18h16" />
                  <path d="M15 5l4 4-4 4" />
                </svg>
              </span>
              <h3 id="workflow-title">System Workflow</h3>
            </div>
            <div className="workflow-step-grid">
              {WORKFLOW_STEPS.map((step, index) => (
                <article
                  key={step.number}
                  className="workflow-step-card"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <span className={`workflow-step-number${index === 0 ? " workflow-step-number--active" : ""}`}>
                    {step.number}
                  </span>
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="guide-section" aria-labelledby="how-to-use-title">
            <div className="guide-section-title">
              <span aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M12 3v18" />
                  <path d="M5 8h14" />
                  <path d="M7 16h10" />
                  <path d="M9 21h6" />
                </svg>
              </span>
              <h3 id="how-to-use-title">How To Use It</h3>
            </div>
            <div className="role-guide-grid">
              {ROLE_GUIDES.map((item) => (
                <article key={item.role} className="role-guide-card">
                  <div className="role-guide-heading">
                    <span className="role-guide-icon" aria-hidden="true"><RoleIcon role={item.role} /></span>
                    <h4>{item.title}</h4>
                  </div>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
