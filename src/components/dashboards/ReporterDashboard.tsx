import React, { useEffect, useState } from "react";
import type { Role, RequestListItem, RequestStatus } from "../../types/api";
import { REQUEST_STATUSES } from "../../types/api";
import { listRequests } from "../../api/client";
import { StatusBadge, formatDate } from "../Badges";

// Status yang relevan untuk ditampilkan ke Reporter sebagai "perlu perhatian"
const STATUS_ORDER: RequestStatus[] = [
  "SUBMITTED",
  "UNDER_REVIEW",
  "ASSIGNED",
  "IN_PROGRESS",
  "RESOLVED",
  "CLOSED",
];

const STATUS_LABELS: Record<RequestStatus, string> = {
  SUBMITTED: "Submitted",
  UNDER_REVIEW: "Under Review",
  ASSIGNED: "Assigned",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
};

// Warna ikon per status
const STATUS_ICON: Record<RequestStatus, string> = {
  SUBMITTED: "📤",
  UNDER_REVIEW: "🔍",
  ASSIGNED: "👷",
  IN_PROGRESS: "⚙️",
  RESOLVED: "✅",
  CLOSED: "📁",
};

interface ReporterDashboardProps {
  role: Role;
  refreshTrigger: number;
  lastCreated: { id: string; requestNumber: string } | null;
  onSelectReport: (id: string) => void;
}

export default function ReporterDashboard({
  role,
  refreshTrigger,
  lastCreated,
  onSelectReport,
}: ReporterDashboardProps) {
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

  // Hitung per-status dari data yang sudah ada (client-side, tidak ada endpoint baru)
  const countsByStatus = REQUEST_STATUSES.reduce(
    (acc, s) => {
      acc[s] = reports.filter((r) => r.status === s).length;
      return acc;
    },
    {} as Record<RequestStatus, number>
  );

  const totalActive = reports.filter(
    (r) => r.status !== "CLOSED"
  ).length;

  // 3 laporan terbaru
  const recentReports = reports.slice(0, 3);

  return (
    <div style={{ display: "grid", gap: "var(--space-5)" }}>
      {/* ─── Greeting + Summary ──────────────────── */}
      <div
        className="dashboard-header-grid"
        style={{
          background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)",
          borderRadius: "var(--radius-xl)",
          padding: "var(--space-6)",
          color: "#fff",
        }}
      >
        <div>
          <h2 style={{ color: "#fff", fontFamily: "var(--font-heading)", fontSize: "var(--text-xl)", marginBottom: "var(--space-2)" }}>
            Selamat datang, Reporter
          </h2>
          <p style={{ opacity: 0.85, fontSize: "var(--text-sm)", lineHeight: 1.6 }}>
            Pantau semua laporan yang telah Anda kirimkan. Klik baris laporan untuk melihat detail dan menambahkan komentar.
          </p>
          {lastCreated && (
            <div
              style={{
                marginTop: "var(--space-3)",
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--space-2)",
                background: "rgba(255,255,255,0.15)",
                borderRadius: "var(--radius-full)",
                padding: "var(--space-1) var(--space-3)",
                fontSize: "var(--text-xs)",
                fontWeight: 700,
              }}
            >
              ✅ Terakhir dikirim: {lastCreated.requestNumber}
            </div>
          )}
        </div>
        <div
          style={{
            textAlign: "center",
            background: "rgba(255,255,255,0.12)",
            borderRadius: "var(--radius-xl)",
            padding: "var(--space-4) var(--space-5)",
          }}
        >
          <div style={{ fontSize: "2.5rem", fontWeight: 800, lineHeight: 1 }}>
            {loading ? "—" : totalActive}
          </div>
          <div style={{ fontSize: "var(--text-xs)", opacity: 0.8, marginTop: "4px", fontWeight: 600 }}>
            Laporan Aktif
          </div>
        </div>
      </div>

      {/* ─── Status Grid ─────────────────────────── */}
      <div className="dashboard-status-grid">
        {STATUS_ORDER.map((s) => (
          <button
            key={s}
            onClick={() => {
              // Filter laporan berdasarkan status yang diklik
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

      {/* ─── Laporan Terbaru ─────────────────────── */}
      {!loading && recentReports.length > 0 && (
        <div className="card" style={{ padding: "var(--space-4)" }}>
          <h3
            style={{
              fontSize: "var(--text-sm)",
              fontWeight: 700,
              color: "var(--color-text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: "var(--space-4)",
            }}
          >
            Laporan Terbaru
          </h3>
          <div style={{ display: "grid", gap: "var(--space-2)" }}>
            {recentReports.map((r) => (
              <button
                key={r.id}
                className="dashboard-report-item"
                onClick={() => onSelectReport(r.id)}
                style={{
                  background: "var(--color-background)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  padding: "var(--space-3) var(--space-4)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all var(--transition-fast)",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--color-accent-light)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-accent)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--color-background)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-border)";
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "var(--text-xs)",
                      fontWeight: 700,
                      color: "var(--color-accent)",
                      marginBottom: "2px",
                    }}
                  >
                    {r.requestNumber}
                  </div>
                  <div
                    style={{
                      fontSize: "var(--text-sm)",
                      fontWeight: 600,
                      color: "var(--color-primary)",
                    }}
                  >
                    {r.title}
                  </div>
                  <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
                    {formatDate(r.createdAt)}
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
