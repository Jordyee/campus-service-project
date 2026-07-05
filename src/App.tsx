import React, { useState } from "react";
import type { Role } from "./types/api";
import { SEEDED_ACTORS } from "./types/api";
import BackendBanner from "./components/BackendBanner";
import RoleSelector from "./components/RoleSelector";
import ReportForm from "./components/ReportForm";
import ReportList from "./components/ReportList";
import ReportDetail from "./components/ReportDetail";
import TechnicianTaskList from "./components/TechnicianTaskList";
import Dashboard from "./components/Dashboard";
import ReporterDashboard from "./components/dashboards/ReporterDashboard";
import AdminDashboard from "./components/dashboards/AdminDashboard";
import TechnicianDashboard from "./components/dashboards/TechnicianDashboard";
import LoginLanding from "./components/LoginLanding";

const ROLE_DESCRIPTIONS: Record<Role, string> = {
  REPORTER: "Reporter dapat mengirim laporan masalah fasilitas baru, melihat laporan mereka, dan menambahkan komentar.",
  ADMINISTRATOR: "Administrator meninjau laporan, menetapkan kategori dan prioritas, menugaskan teknisi, serta menutup atau membuka kembali laporan.",
  TECHNICIAN: "Teknisi melihat tugas yang ditugaskan, menerima pekerjaan, memperbarui progres, dan menandai pekerjaan selesai.",
  FACILITY_MANAGER: "Manajer Fasilitas melihat dashboard ringkasan dan detail laporan; tidak dapat mengubah data.",
};

const ROLE_TITLES: Record<Role, string> = {
  REPORTER: "Reporter Portal",
  ADMINISTRATOR: "Administrator Workspace",
  TECHNICIAN: "Technician Workspace",
  FACILITY_MANAGER: "Facility Manager Dashboard",
};

const ROLE_SUBTITLES: Record<Role, string> = {
  REPORTER: "Buat laporan dan pantau status permintaan layanan kampus.",
  ADMINISTRATOR: "Review laporan, tetapkan prioritas, dan tugaskan teknisi.",
  TECHNICIAN: "Terima pekerjaan, update progres, dan tandai pekerjaan selesai.",
  FACILITY_MANAGER: "Pantau ringkasan status, kategori, prioritas, dan laporan terbaru.",
};

const ROLE_BADGES: Record<Role, string> = {
  REPORTER: "Reporter",
  ADMINISTRATOR: "Administrator",
  TECHNICIAN: "Technician",
  FACILITY_MANAGER: "Facility Manager",
};

const ROLE_NAV: Record<Role, Array<{ label: string; marker: string }>> = {
  REPORTER: [
    { label: "Create Report", marker: "+" },
    { label: "My Reports", marker: "L" },
  ],
  ADMINISTRATOR: [
    { label: "Review Queue", marker: "R" },
    { label: "All Reports", marker: "A" },
  ],
  TECHNICIAN: [
    { label: "My Tasks", marker: "T" },
    { label: "Task Detail", marker: "D" },
  ],
  FACILITY_MANAGER: [
    { label: "Dashboard", marker: "D" },
    { label: "Recent Reports", marker: "R" },
  ],
};

export default function App() {
  const [role, setRole] = useState<Role>("REPORTER");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [lastCreated, setLastCreated] = useState<{ id: string; requestNumber: string } | null>(null);

  function refresh() {
    setRefreshTrigger((n) => n + 1);
  }

  function handleCreated(id: string, requestNumber: string) {
    setLastCreated({ id, requestNumber });
    setSelectedId(id);
    refresh();
  }

  function handleRoleChange(newRole: Role) {
    setRole(newRole);
    setSelectedId(null);
    setLastCreated(null);
    refresh();
  }

  function handleEnter(nextRole: Role) {
    handleRoleChange(nextRole);
    setIsAuthenticated(true);
  }

  function handleSignOut() {
    setSelectedId(null);
    setLastCreated(null);
    setIsAuthenticated(false);
  }

  const isReporter = role === "REPORTER";
  const isAdmin = role === "ADMINISTRATOR";
  const isTech = role === "TECHNICIAN";
  const isManager = role === "FACILITY_MANAGER";

  if (!isAuthenticated) {
    return (
      <LoginLanding
        selectedRole={role}
        onSelectRole={setRole}
        onEnter={handleEnter}
      />
    );
  }

  return (
    <div className="app-shell">
      <aside className="app-sidebar" aria-label="Navigasi aplikasi">
        <div className="brand-block">
          <div className="brand-mark" aria-hidden="true">CS</div>
          <div>
            <div className="brand-title">Campus Service</div>
            <div className="brand-subtitle">{ROLE_TITLES[role]}</div>
          </div>
        </div>

        <nav className="side-nav" aria-label="Navigasi peran aktif">
          {ROLE_NAV[role].map((item, index) => (
            <a key={item.label} className={`side-nav-item${index === 0 ? " side-nav-item--active" : ""}`} href="#workspace">
              <span className="side-nav-icon" aria-hidden="true">{item.marker}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="side-footer">
          <div className="sidebar-role-badge">{ROLE_BADGES[SEEDED_ACTORS[role].role]}</div>
          <p className="sidebar-description">{ROLE_DESCRIPTIONS[role]}</p>
          {isReporter && lastCreated && (
            <div className="sidebar-last-created">
              <div className="sidebar-last-created-label">Laporan terakhir</div>
              <p className="sidebar-highlight">{lastCreated.requestNumber}</p>
            </div>
          )}
        </div>
      </aside>

      <div className="app-content">
        <header className="app-topbar">
          <div className="topbar-search" aria-hidden="true">
            <span className="topbar-search-icon">/</span>
            <span>Search reports...</span>
          </div>
          <div className="topbar-actions">
            <RoleSelector currentRole={role} onChange={handleRoleChange} />
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </header>

        <main id="workspace" className="app-main">
          <BackendBanner />

          <section className="page-heading" aria-labelledby="page-title">
            <div>
              <p className="breadcrumb">Campus Service / {ROLE_TITLES[role]}</p>
              <h1 id="page-title">{ROLE_TITLES[role]}</h1>
              <p>{ROLE_SUBTITLES[role]}</p>
            </div>
          </section>

          <div className="role-dashboard">
            {isManager && <Dashboard role={role} refreshTrigger={refreshTrigger} />}
            {isAdmin && <AdminDashboard role={role} refreshTrigger={refreshTrigger} onSelectReport={setSelectedId} />}
            {isTech && <TechnicianDashboard role={role} refreshTrigger={refreshTrigger} onSelectReport={setSelectedId} />}
            {isReporter && (
              <ReporterDashboard
                role={role}
                refreshTrigger={refreshTrigger}
                lastCreated={lastCreated}
                onSelectReport={setSelectedId}
              />
            )}
          </div>

          {isTech && (
            <TechnicianTaskList
              role={role}
              refreshTrigger={refreshTrigger}
              onSelectTask={(id) => setSelectedId(id)}
            />
          )}

          <div className={isManager ? "workspace workspace--full" : "workspace"}>
            <div className="workspace-stack">
              {isReporter && <ReportForm role={role} onCreated={handleCreated} />}
              <ReportList
                role={role}
                refreshTrigger={refreshTrigger}
                onSelectReport={(id) => setSelectedId(id)}
              />
            </div>

            {!isManager && (
              <div className="workspace-stack workspace-stack--sticky">
                <ReportDetail
                  role={role}
                  requestId={selectedId}
                  onUpdated={refresh}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
