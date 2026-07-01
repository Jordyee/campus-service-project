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

const ROLE_DESCRIPTIONS: Record<Role, string> = {
  REPORTER: "Reporter dapat mengirim laporan masalah fasilitas baru, melihat laporan mereka, dan menambahkan komentar.",
  ADMINISTRATOR: "Administrator meninjau laporan, menetapkan kategori dan prioritas, menugaskan teknisi, serta menutup atau membuka kembali laporan.",
  TECHNICIAN: "Teknisi melihat tugas yang ditugaskan, menerima pekerjaan, memperbarui progres, dan menandai pekerjaan selesai.",
  FACILITY_MANAGER: "Manajer Fasilitas melihat dashboard ringkasan dan detail laporan — tidak dapat mengubah data.",
};

export default function App() {
  const [role, setRole] = useState<Role>("REPORTER");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [lastCreated, setLastCreated] = useState<{ id: string; requestNumber: string } | null>(null);

  function refresh() { setRefreshTrigger((n) => n + 1); }

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

  const isReporter = role === "REPORTER";
  const isAdmin = role === "ADMINISTRATOR";
  const isTech = role === "TECHNICIAN";
  const isManager = role === "FACILITY_MANAGER";

  return (
    <>
      {/* ─── App Header ─────────────────────────────── */}
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-logo">
            <span className="app-logo-title">Campus Service</span>
            <span className="app-logo-subtitle">Sistem Permintaan Layanan Kampus</span>
          </div>
          <RoleSelector currentRole={role} onChange={handleRoleChange} />
        </div>
      </header>

      <main className="app-main">
        {/* ─── Backend Banner ──────────────────────── */}
        <BackendBanner />

        {/* ─── Dashboard (Facility Manager) ────────── */}
        {isManager && (
          <Dashboard role={role} refreshTrigger={refreshTrigger} />
        )}

        {/* ─── Technician Task List ─────────────────── */}
        {isTech && (
          <TechnicianTaskList
            role={role}
            refreshTrigger={refreshTrigger}
            onSelectTask={(id) => setSelectedId(id)}
          />
        )}

        {/* ─── Main Workspace ──────────────────────── */}
        <div className={isManager ? "workspace workspace--full" : "workspace"}>
          {/* Left column: Form (Reporter) or Reports list */}
          <div style={{ display: "grid", gap: "var(--space-5)" }}>
            {isReporter && (
              <ReportForm role={role} onCreated={handleCreated} />
            )}
            <ReportList
              role={role}
              refreshTrigger={refreshTrigger}
              onSelectReport={(id) => setSelectedId(id)}
            />
          </div>

          {/* Right column: Role summary sidebar + Detail */}
          {!isManager && (
            <div style={{ display: "grid", gap: "var(--space-5)", alignContent: "start" }}>
              {/* Role Summary Sidebar */}
              <aside className="sidebar-card" aria-label="Informasi peran aktif">
                <div>
                  <div className="sidebar-role-badge">{SEEDED_ACTORS[role].role}</div>
                </div>
                <p className="sidebar-description">{ROLE_DESCRIPTIONS[role]}</p>
                {isReporter && lastCreated && (
                  <div className="sidebar-last-created">
                    <div className="sidebar-last-created-label">Laporan Terakhir Dikirim</div>
                    <p style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--color-accent)" }}>
                      {lastCreated.requestNumber}
                    </p>
                  </div>
                )}
                {!isReporter && (
                  <div className="sidebar-last-created">
                    <div className="sidebar-last-created-label">Catatan Peran</div>
                    <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>
                      {isAdmin && "Pilih laporan di tabel untuk melakukan tindakan admin."}
                      {isTech && "Pilih tugas di daftar tugas atau laporan di tabel untuk memperbarui progres."}
                    </p>
                  </div>
                )}
              </aside>

              {/* Report Detail */}
              <ReportDetail
                role={role}
                requestId={selectedId}
                onUpdated={refresh}
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
