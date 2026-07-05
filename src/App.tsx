import React, { useEffect, useMemo, useState } from "react";
import type { Role } from "./types/api";
import { SEEDED_ACTORS } from "./types/api";
import BackendBanner from "./components/BackendBanner";
import LoginPage from "./components/LoginPage";
import ReportForm from "./components/ReportForm";
import ReportList from "./components/ReportList";
import ReportDetail from "./components/ReportDetail";
import TechnicianTaskList from "./components/TechnicianTaskList";
import Dashboard from "./components/Dashboard";
import ReporterDashboard from "./components/dashboards/ReporterDashboard";
import AdminDashboard from "./components/dashboards/AdminDashboard";
import TechnicianDashboard from "./components/dashboards/TechnicianDashboard";
import {
  clearDemoSession,
  loadDemoSession,
  resolveDemoSession,
  saveDemoSession,
} from "./session/demoSession";
import type { DemoSession } from "./session/demoSession";

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

const ROLE_NAV: Record<Role, Array<{ label: string; marker: string; targetId: string }>> = {
  REPORTER: [
    { label: "Create Report", marker: "+", targetId: "create-report-section" },
    { label: "My Reports", marker: "#", targetId: "reports-section" },
  ],
  ADMINISTRATOR: [
    { label: "Review Queue", marker: "!", targetId: "admin-review-section" },
    { label: "All Reports", marker: "#", targetId: "reports-section" },
  ],
  TECHNICIAN: [
    { label: "My Tasks", marker: "*", targetId: "technician-tasks-section" },
    { label: "Task Detail", marker: ">", targetId: "request-detail-section" },
  ],
  FACILITY_MANAGER: [
    { label: "Dashboard", marker: "=", targetId: "manager-dashboard-section" },
    { label: "Recent Reports", marker: "#", targetId: "reports-section" },
  ],
};

export default function App() {
  const [session, setSession] = useState<DemoSession | null>(() => loadDemoSession(window.localStorage));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [lastCreated, setLastCreated] = useState<{ id: string; requestNumber: string } | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [topbarSearch, setTopbarSearch] = useState("");
  const actor = resolveDemoSession(session);

  function refresh() {
    setRefreshTrigger((n) => n + 1);
  }

  function handleLogin(nextSession: DemoSession) {
    saveDemoSession(window.localStorage, nextSession);
    setSession(nextSession);
    setSelectedId(null);
    setLastCreated(null);
    setTopbarSearch("");
    refresh();
  }

  function handleLogout() {
    clearDemoSession(window.localStorage);
    setSession(null);
    setSelectedId(null);
    setLastCreated(null);
    setTopbarSearch("");
  }

  function handleCreated(id: string, requestNumber: string) {
    setLastCreated({ id, requestNumber });
    setSelectedId(id);
    refresh();
  }

  if (!actor) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const role = actor.role;
  const isReporter = role === "REPORTER";
  const isAdmin = role === "ADMINISTRATOR";
  const isTech = role === "TECHNICIAN";
  const isManager = role === "FACILITY_MANAGER";
  const navItems = useMemo(() => ROLE_NAV[role], [role]);

  useEffect(() => {
    setActiveSection(navItems[0]?.targetId ?? null);
  }, [navItems]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const sections = navItems
      .map((item) => document.getElementById(item.targetId))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-96px 0px -55% 0px", threshold: [0.15, 0.35, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navItems, refreshTrigger, selectedId]);

  function handleNavClick(event: React.MouseEvent<HTMLAnchorElement>, targetId: string) {
    event.preventDefault();
    setActiveSection(targetId);
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
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
          {navItems.map((item) => (
            <a
              key={item.label}
              className={`side-nav-item${activeSection === item.targetId ? " side-nav-item--active" : ""}`}
              href={`#${item.targetId}`}
              onClick={(event) => handleNavClick(event, item.targetId)}
            >
              <span className="side-nav-icon" aria-hidden="true">{item.marker}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="side-footer">
          <div className="sidebar-role-badge">{ROLE_BADGES[SEEDED_ACTORS[role].role]}</div>
          <p className="sidebar-description">{ROLE_DESCRIPTIONS[role]}</p>
          <div className="sidebar-last-created">
            <div className="sidebar-last-created-label">Logged in as</div>
            <p className="sidebar-highlight">{actor.displayName}</p>
          </div>
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
          <label className="topbar-search" htmlFor="topbar-report-search">
            <span className="topbar-search-icon" aria-hidden="true">/</span>
            <input
              id="topbar-report-search"
              type="search"
              value={topbarSearch}
              onChange={(event) => setTopbarSearch(event.target.value)}
              placeholder="Search visible reports"
              aria-label="Search visible reports"
              autoComplete="off"
            />
          </label>
          <div className="topbar-actions">
            <div className="session-summary" aria-label="Pengguna aktif">
              <span className="session-summary-label">Logged in as</span>
              <strong>{actor.displayName}</strong>
            </div>
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleLogout}>
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

          <div id={isAdmin ? "admin-review-section" : undefined} className="role-dashboard scroll-anchor">
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
                topbarKeyword={topbarSearch}
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
