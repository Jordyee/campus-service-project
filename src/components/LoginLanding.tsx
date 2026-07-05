import React, { useState } from "react";
import type { Role } from "../types/api";

const ROLE_LABELS: Record<Role, string> = {
  REPORTER: "Reporter",
  ADMINISTRATOR: "Admin",
  TECHNICIAN: "Technician",
  FACILITY_MANAGER: "Manager",
};

const ROLE_ICONS: Record<Role, string> = {
  REPORTER: "U",
  ADMINISTRATOR: "S",
  TECHNICIAN: "T",
  FACILITY_MANAGER: "B",
};

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

interface LoginLandingProps {
  selectedRole: Role;
  onSelectRole: (role: Role) => void;
  onEnter: (role: Role) => void;
}

export default function LoginLanding({ selectedRole, onSelectRole, onEnter }: LoginLandingProps) {
  const [email, setEmail] = useState("j.doe@university.edu");
  const [password, setPassword] = useState("campusops");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onEnter(selectedRole);
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
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="e.g. j.doe@university.edu"
              autoComplete="username"
            />
          </label>

          <label className="login-field">
            <span className="login-label-row">
              <span>Password</span>
              <button type="button" className="login-link-button">
                Forgot password?
              </button>
            </span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              autoComplete="current-password"
            />
          </label>

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
                className={`login-role-button${selectedRole === item.role ? " login-role-button--active" : ""}`}
                onClick={() => onSelectRole(item.role)}
                aria-pressed={selectedRole === item.role}
              >
                <span className="login-role-icon" aria-hidden="true">{ROLE_ICONS[item.role]}</span>
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
              <span aria-hidden="true">F</span>
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
              <span aria-hidden="true">G</span>
              <h3 id="how-to-use-title">How To Use It</h3>
            </div>
            <div className="role-guide-grid">
              {ROLE_GUIDES.map((item) => (
                <article key={item.role} className="role-guide-card">
                  <div className="role-guide-heading">
                    <span className="role-guide-icon" aria-hidden="true">{ROLE_ICONS[item.role]}</span>
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
