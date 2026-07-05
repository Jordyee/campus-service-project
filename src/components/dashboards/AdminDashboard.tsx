import React, { useEffect, useState } from "react";
import type { Role, RequestListItem, RequestStatus } from "../../types/api";
import { REQUEST_STATUSES } from "../../types/api";
import { listRequests } from "../../api/client";
import { StatusBadge, formatDate } from "../Badges";

const STATUS_LABELS: Record<RequestStatus, string> = {
  SUBMITTED: "Submitted",
  UNDER_REVIEW: "Under Review",
  ASSIGNED: "Assigned",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
};

interface AdminDashboardProps {
  role: Role;
  refreshTrigger: number;
  onSelectReport: (id: string) => void;
}

export default function AdminDashboard({ role, refreshTrigger, onSelectReport }: AdminDashboardProps) {
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

  const countsByStatus = REQUEST_STATUSES.reduce((acc, status) => {
    acc[status] = reports.filter((report) => report.status === status).length;
    return acc;
  }, {} as Record<RequestStatus, number>);

  const actionCount = countsByStatus.SUBMITTED + countsByStatus.UNDER_REVIEW;
  const reviewQueue = reports
    .filter((report) => report.status === "SUBMITTED" || report.status === "UNDER_REVIEW")
    .slice(0, 5);

  return (
    <div className="dashboard-panel">
      <div className="overview-banner overview-banner--dark">
        <div>
          <h2>Review Queue</h2>
          <p>Proses laporan baru, simpan klasifikasi, dan tugaskan teknisi sesuai prioritas.</p>
        </div>
        <div className="overview-metric">
          <strong>{loading ? "-" : actionCount}</strong>
          <span>Need action</span>
        </div>
      </div>

      <div className="dashboard-status-grid">
        {REQUEST_STATUSES.map((status) => (
          <button
            key={status}
            className="status-summary-card"
            disabled={countsByStatus[status] === 0}
            onClick={() => {
              const report = reports.find((item) => item.status === status);
              if (report) onSelectReport(report.id);
            }}
          >
            <span>{STATUS_LABELS[status]}</span>
            <strong>{loading ? "-" : countsByStatus[status]}</strong>
          </button>
        ))}
      </div>

      {reviewQueue.length > 0 && (
        <section className="card compact-card" aria-labelledby="admin-queue-title">
          <h3 id="admin-queue-title" className="section-kicker">Needs Review</h3>
          <div className="report-card-list">
            {reviewQueue.map((report) => (
              <button key={report.id} className="report-mini-card" onClick={() => onSelectReport(report.id)}>
                <span className="table-row-number">{report.requestNumber}</span>
                <strong>{report.title}</strong>
                <small>{formatDate(report.createdAt)}</small>
                <StatusBadge status={report.status} />
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
