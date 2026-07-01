import React, { useEffect, useState } from "react";
import type { Role, DashboardSummary, RequestStatus, Category, Priority } from "../types/api";
import { REQUEST_STATUSES, CATEGORIES, PRIORITIES } from "../types/api";
import { getDashboardSummary } from "../api/client";
import { StatusBadge, PriorityBadge, formatDate } from "./Badges";

const STATUS_LABELS: Record<RequestStatus, string> = {
  SUBMITTED: "Submitted", UNDER_REVIEW: "Under Review", ASSIGNED: "Assigned",
  IN_PROGRESS: "In Progress", RESOLVED: "Resolved", CLOSED: "Closed",
};

const CATEGORY_LABELS: Record<Category, string> = {
  INTERNET: "Internet", AC: "AC", PERALATAN_KELAS: "Peralatan Kelas",
  KEBERSIHAN: "Kebersihan", LABORATORIUM: "Laboratorium", LAINNYA: "Lainnya",
};

interface DashboardProps {
  role: Role;
  refreshTrigger: number;
}

export default function Dashboard({ role, refreshTrigger }: DashboardProps) {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      const res = await getDashboardSummary(role);
      setLoading(false);
      if (res.ok) setSummary(res.data);
      else setError(res.message);
    }
    load();
  }, [role, refreshTrigger]);

  return (
    <section id="manager-dashboard-section" className="card" aria-labelledby="dashboard-title">
      <h2 id="dashboard-title" className="card-title">Dashboard</h2>
      <output id="dashboard-status" />

      {loading && <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>Memuat dashboard...</p>}
      {error && <p className="form-status-error" role="alert">{error}</p>}

      {!loading && summary && (
        <>
          <div className="dashboard-grid">
            {/* Status Counts */}
            <div className="dashboard-stat-card">
              <h3 id="dashboard-status-title">Per Status</h3>
              <dl id="dashboard-status-counts" className="count-list">
                {REQUEST_STATUSES.map((s) => (
                  <React.Fragment key={s}>
                    <dt>{STATUS_LABELS[s]}</dt>
                    <dd>{summary.countsByStatus[s] ?? 0}</dd>
                  </React.Fragment>
                ))}
              </dl>
            </div>

            {/* Category Counts */}
            <div className="dashboard-stat-card">
              <h3 id="dashboard-category-title">Per Kategori</h3>
              <dl id="dashboard-category-counts" className="count-list">
                {CATEGORIES.map((c) => (
                  <React.Fragment key={c}>
                    <dt>{CATEGORY_LABELS[c]}</dt>
                    <dd>{summary.countsByCategory[c] ?? 0}</dd>
                  </React.Fragment>
                ))}
              </dl>
            </div>

            {/* Priority Counts */}
            <div className="dashboard-stat-card">
              <h3 id="dashboard-priority-title">Per Prioritas</h3>
              <dl id="dashboard-priority-counts" className="count-list">
                {PRIORITIES.map((p) => (
                  <React.Fragment key={p}>
                    <dt>{p}</dt>
                    <dd>{summary.countsByPriority[p] ?? 0}</dd>
                  </React.Fragment>
                ))}
              </dl>
            </div>
          </div>

          <h3 style={{ marginBottom: "var(--space-3)" }}>Laporan Terbaru</h3>
          {summary.recentReports.length === 0 ? (
            <p id="dashboard-empty" className="empty-state-text" style={{ color: "var(--color-text-muted)" }}>
              Belum ada laporan.
            </p>
          ) : (
            <div className="table-wrap">
              <table id="dashboard-recent-table" className="table">
                <thead>
                  <tr>
                    <th>Nomor</th>
                    <th>Judul</th>
                    <th>Status</th>
                    <th>Prioritas</th>
                    <th>Dibuat</th>
                  </tr>
                </thead>
                <tbody id="dashboard-recent-body">
                  {summary.recentReports.map((r) => (
                    <tr key={r.id}>
                      <td className="table-row-number">{r.requestNumber}</td>
                      <td style={{ fontWeight: 600 }}>{r.title}</td>
                      <td><StatusBadge status={r.status} /></td>
                      <td><PriorityBadge priority={r.priority} /></td>
                      <td>{formatDate(r.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </section>
  );
}
