import React, { useEffect, useState } from "react";
import type { Role, RequestListItem, RequestStatus } from "../../types/api";
import { listRequests } from "../../api/client";
import { StatusBadge, PriorityBadge } from "../Badges";

const TECH_STATUSES: RequestStatus[] = ["ASSIGNED", "IN_PROGRESS", "RESOLVED"];

const STATUS_LABELS: Record<RequestStatus, string> = {
  SUBMITTED: "Submitted",
  UNDER_REVIEW: "Under Review",
  ASSIGNED: "Assigned",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
};

interface TechnicianDashboardProps {
  role: Role;
  refreshTrigger: number;
  onSelectReport: (id: string) => void;
}

export default function TechnicianDashboard({ role, refreshTrigger, onSelectReport }: TechnicianDashboardProps) {
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

  const countsByStatus = TECH_STATUSES.reduce((acc, status) => {
    acc[status] = reports.filter((report) => report.status === status).length;
    return acc;
  }, {} as Record<RequestStatus, number>);

  const activeTasks = reports
    .filter((report) => report.status === "ASSIGNED" || report.status === "IN_PROGRESS")
    .slice(0, 5);

  return (
    <div className="dashboard-panel">
      <div className="overview-banner overview-banner--teal">
        <div>
          <h2>My Tasks</h2>
          <p>Terima tugas yang diberikan, tulis catatan progres, dan tandai pekerjaan resolved.</p>
        </div>
        <div className="overview-metric">
          <strong>{loading ? "-" : activeTasks.length}</strong>
          <span>Active tasks</span>
        </div>
      </div>

      <div className="dashboard-status-grid dashboard-status-grid--compact">
        {TECH_STATUSES.map((status) => (
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

      {activeTasks.length > 0 && (
        <section className="card compact-card" aria-labelledby="technician-active-title">
          <h3 id="technician-active-title" className="section-kicker">Active Work</h3>
          <div className="report-card-list">
            {activeTasks.map((report) => (
              <button key={report.id} className="report-mini-card" onClick={() => onSelectReport(report.id)}>
                <span className="table-row-number">{report.requestNumber}</span>
                <strong>{report.title}</strong>
                <small>{report.location}</small>
                <span className="mini-card-badges">
                  <PriorityBadge priority={report.priority} />
                  <StatusBadge status={report.status} />
                </span>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
