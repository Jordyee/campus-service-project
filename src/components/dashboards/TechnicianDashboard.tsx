import React, { useEffect, useState } from "react";
import type { Role, RequestListItem, RequestStatus } from "../../types/api";
import { REQUEST_STATUSES } from "../../types/api";
import { listRequests } from "../../api/client";
import { StatusBadge, PriorityBadge, formatDate } from "../Badges";

const STATUS_ORDER: RequestStatus[] = [
  "ASSIGNED",
  "IN_PROGRESS",
  "RESOLVED",
];

const STATUS_LABELS: Record<RequestStatus, string> = {
  SUBMITTED: "Submitted",
  UNDER_REVIEW: "Under Review",
  ASSIGNED: "Perlu Diterima",
  IN_PROGRESS: "Sedang Dikerjakan",
  RESOLVED: "Selesai",
  CLOSED: "Ditutup",
};

const STATUS_ICON: Record<RequestStatus, string> = {
  SUBMITTED: "📤",
  UNDER_REVIEW: "🔍",
  ASSIGNED: "📥",
  IN_PROGRESS: "⚙️",
  RESOLVED: "✅",
  CLOSED: "📁",
};

interface TechnicianDashboardProps {
  role: Role;
  refreshTrigger: number;
  onSelectReport: (id: string) => void;
}

export default function TechnicianDashboard({
  role,
  refreshTrigger,
  onSelectReport,
}: TechnicianDashboardProps) {
  const [reports, setReports] = useState<RequestListItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await listRequests(role, {});
      setLoading(false);
      if (res.ok) setReports(res.data);
    }
    load();
  }, [role, refreshTrigger]);

  const countsByStatus = REQUEST_STATUSES.reduce(
    (acc, s) => {
      acc[s] = reports.filter((r) => r.status === s).length;
      return acc;
    },
    {} as Record<RequestStatus, number>
  );

  const pendingCount = countsByStatus["ASSIGNED"];
  const inProgressCount = countsByStatus["IN_PROGRESS"];

  const needsAttention = reports
    .filter((r) => r.status === "ASSIGNED" || r.status === "IN_PROGRESS")
    .slice(0, 5);

  return (
    <div style={{ display: "grid", gap: "var(--space-5)" }}>
      {/* ─── Greeting + Summary ──────────────────── */}
      <div
        className="dashboard-header-grid--tech"
        style={{
          background: "linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)", // Teal for technician
          borderRadius: "var(--radius-xl)",
          padding: "var(--space-6)",
          color: "#fff",
        }}
      >
        <div>
          <h2 style={{ color: "#fff", fontFamily: "var(--font-heading)", fontSize: "var(--text-xl)", marginBottom: "var(--space-2)" }}>
            Ruang Kerja Teknisi
          </h2>
          <p style={{ opacity: 0.9, fontSize: "var(--text-sm)", lineHeight: 1.6 }}>
            Terima penugasan baru dan perbarui progres pekerjaan Anda di sini.
          </p>
        </div>
        
        <div
          style={{
            textAlign: "center",
            background: pendingCount > 0 ? "rgba(220, 38, 38, 0.9)" : "rgba(255,255,255,0.12)",
            borderRadius: "var(--radius-xl)",
            padding: "var(--space-3) var(--space-4)",
            boxShadow: pendingCount > 0 ? "0 4px 12px rgba(220, 38, 38, 0.3)" : "none",
          }}
        >
          <div style={{ fontSize: "2rem", fontWeight: 800, lineHeight: 1 }}>
            {loading ? "—" : pendingCount}
          </div>
          <div style={{ fontSize: "var(--text-xs)", opacity: 0.9, marginTop: "4px", fontWeight: 600 }}>
            Tugas Baru
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            background: inProgressCount > 0 ? "rgba(234, 179, 8, 0.9)" : "rgba(255,255,255,0.12)",
            borderRadius: "var(--radius-xl)",
            padding: "var(--space-3) var(--space-4)",
            boxShadow: inProgressCount > 0 ? "0 4px 12px rgba(234, 179, 8, 0.2)" : "none",
          }}
        >
          <div style={{ fontSize: "2rem", fontWeight: 800, lineHeight: 1 }}>
            {loading ? "—" : inProgressCount}
          </div>
          <div style={{ fontSize: "var(--text-xs)", opacity: 0.9, marginTop: "4px", fontWeight: 600 }}>
            Sedang Dikerjakan
          </div>
        </div>
      </div>

      {/* ─── Status Grid ─────────────────────────── */}
      <div className="dashboard-status-grid">
        {STATUS_ORDER.map((s) => (
          <button
            key={s}
            onClick={() => {
              const found = reports.find((r) => r.status === s);
              if (found) onSelectReport(found.id);
            }}
            disabled={countsByStatus[s] === 0}
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--space-3) var(--space-4)",
              cursor: countsByStatus[s] > 0 ? "pointer" : "default",
              textAlign: "left",
              transition: "all var(--transition-fast)",
              opacity: countsByStatus[s] === 0 ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (countsByStatus[s] > 0)
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-accent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-border)";
            }}
          >
            <div style={{ fontSize: "1.2rem", marginBottom: "var(--space-1)" }}>{STATUS_ICON[s]}</div>
            <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--color-primary)" }}>
              {loading ? "—" : countsByStatus[s]}
            </div>
            <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", fontWeight: 600 }}>
              {STATUS_LABELS[s]}
            </div>
          </button>
        ))}
      </div>

      {/* ─── Daftar Tugas ─────────────────────── */}
      {!loading && needsAttention.length > 0 && (
        <div className="card" style={{ padding: "var(--space-4)" }}>
          <h3
            style={{
              fontSize: "var(--text-sm)",
              fontWeight: 700,
              color: "var(--color-text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: "var(--space-4)",
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2)",
            }}
          >
            📋 Tugas Aktif
          </h3>
          <div style={{ display: "grid", gap: "var(--space-2)" }}>
            {needsAttention.map((r) => (
              <button
                key={r.id}
                className="dashboard-report-item"
                onClick={() => onSelectReport(r.id)}
                style={{
                  background: "var(--color-background)",
                  border: "1px solid var(--color-border)",
                  borderLeft: `4px solid ${r.status === "ASSIGNED" ? "var(--color-danger)" : "var(--color-warning)"}`,
                  borderRadius: "var(--radius-md)",
                  padding: "var(--space-3) var(--space-4)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all var(--transition-fast)",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--color-accent-light)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--color-background)";
                }}
              >
                <div>
                  <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", marginBottom: "4px" }}>
                    <span
                      style={{
                        fontSize: "var(--text-xs)",
                        fontWeight: 700,
                        color: "var(--color-accent)",
                      }}
                    >
                      {r.requestNumber}
                    </span>
                    <PriorityBadge priority={r.priority} />
                  </div>
                  
                  <div
                    style={{
                      fontSize: "var(--text-sm)",
                      fontWeight: 600,
                      color: "var(--color-primary)",
                      marginBottom: "2px"
                    }}
                  >
                    {r.title}
                  </div>
                  <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
                    {r.location}
                  </div>
                </div>
                <StatusBadge status={r.status} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
