import React, { useEffect, useState, useCallback } from "react";
import type { Role, RequestDetail } from "../types/api";
import { getRequestDetail } from "../api/client";
import { StatusBadge, PriorityBadge, formatDate } from "./Badges";
import AdminPanel from "./AdminPanel";
import TechnicianPanel from "./TechnicianPanel";
import CommentForm, { CommentTimeline, HistoryTimeline } from "./CommentForm";

const CATEGORY_LABELS: Record<string, string> = {
  INTERNET: "Internet",
  AC: "AC",
  PERALATAN_KELAS: "Peralatan Kelas",
  KEBERSIHAN: "Kebersihan",
  LABORATORIUM: "Laboratorium",
  LAINNYA: "Lainnya",
};

const ALL_STATUSES = ["SUBMITTED", "UNDER_REVIEW", "ASSIGNED", "IN_PROGRESS", "RESOLVED", "CLOSED"] as const;

interface ReportDetailProps {
  role: Role;
  requestId: string | null;
  onUpdated: () => void;
}

export default function ReportDetail({ role, requestId, onUpdated }: ReportDetailProps) {
  const [detail, setDetail] = useState<RequestDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canComment = role === "REPORTER" || role === "ADMINISTRATOR" || role === "TECHNICIAN";
  const canAdminActions = role === "ADMINISTRATOR";
  const canTechnicianActions = role === "TECHNICIAN";

  const load = useCallback(async () => {
    if (!requestId) return;
    setLoading(true);
    setError(null);
    const res = await getRequestDetail(role, requestId);
    setLoading(false);
    if (res.ok) {
      setDetail(res.data);
    } else {
      setError(res.message);
      setDetail(null);
    }
  }, [requestId, role]);

  useEffect(() => { load(); }, [load]);

  if (!requestId) {
    return (
      <section className="card detail" aria-labelledby="detail-title">
        <h2 id="detail-title" className="card-title">Request Detail</h2>
        <div className="detail-placeholder">
          <p id="detail-status">Pilih laporan untuk melihat detail.</p>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="card detail" aria-labelledby="detail-title">
        <h2 id="detail-title" className="card-title">Request Detail</h2>
        <p id="detail-status" className="muted-text">Memuat detail...</p>
      </section>
    );
  }

  if (error || !detail) {
    return (
      <section className="card detail" aria-labelledby="detail-title">
        <h2 id="detail-title" className="card-title">Request Detail</h2>
        <p className="form-status-error" role="alert">{error ?? "Laporan tidak ditemukan."}</p>
      </section>
    );
  }

  const currentStatusIndex = ALL_STATUSES.indexOf(detail.status as typeof ALL_STATUSES[number]);

  return (
    <section className="card detail" aria-labelledby="detail-title">
      <article id="detail-card">
        <div className="detail-header">
          <div>
            <div className="detail-meta-row">
              <span className="table-row-number">{detail.requestNumber}</span>
              <StatusBadge status={detail.status} />
              <PriorityBadge priority={detail.priority} />
            </div>
            <h2 id="detail-title" className="detail-title">{detail.title}</h2>
          </div>
        </div>

        <ol id="detail-lifecycle" className="lifecycle">
          {ALL_STATUSES.map((status, index) => {
            const isActive = status === detail.status;
            const isPast = index < currentStatusIndex;
            return (
              <React.Fragment key={status}>
                <li className={`lifecycle-step${isActive ? " lifecycle-step--active" : ""}${isPast ? " lifecycle-step--past" : ""}`}>
                  {status.replace(/_/g, " ")}
                </li>
                {index < ALL_STATUSES.length - 1 && <span className="lifecycle-arrow" aria-hidden="true">&gt;</span>}
              </React.Fragment>
            );
          })}
        </ol>

        <section className="detail-section" aria-labelledby="description-title">
          <h3 id="description-title" className="section-kicker">Report Description</h3>
          <p id="detail-description">{detail.description}</p>
        </section>

        <dl className="detail-grid">
          <div className="detail-field">
            <dt>Status</dt>
            <dd id="detail-status-value"><StatusBadge status={detail.status} /></dd>
          </div>
          <div className="detail-field">
            <dt>Priority</dt>
            <dd id="detail-priority"><PriorityBadge priority={detail.priority} /></dd>
          </div>
          <div className="detail-field">
            <dt>Category</dt>
            <dd id="detail-category">{CATEGORY_LABELS[detail.category] ?? detail.category}</dd>
          </div>
          <div className="detail-field">
            <dt>Location</dt>
            <dd id="detail-location">{detail.location}</dd>
          </div>
          <div className="detail-field">
            <dt>Reporter</dt>
            <dd id="detail-reporter">{detail.reporterName} ({detail.reporterContact})</dd>
          </div>
          <div className="detail-field">
            <dt>Assigned Technician</dt>
            <dd id="detail-technician">{detail.assignedTechnician?.displayName ?? "-"}</dd>
          </div>
          <div className="detail-field">
            <dt>Accepted</dt>
            <dd id="detail-accepted">{detail.acceptedAt ? formatDate(detail.acceptedAt) : "-"}</dd>
          </div>
          <div className="detail-field">
            <dt>Created</dt>
            <dd id="detail-created">{formatDate(detail.createdAt)}</dd>
          </div>
          <div className="detail-field">
            <dt>Updated</dt>
            <dd id="detail-updated">{formatDate(detail.updatedAt)}</dd>
          </div>
        </dl>

        {canAdminActions && (
          <AdminPanel
            role={role}
            detail={detail}
            onUpdated={() => { load(); onUpdated(); }}
          />
        )}

        {canTechnicianActions && (
          <TechnicianPanel
            role={role}
            detail={detail}
            onUpdated={() => { load(); onUpdated(); }}
          />
        )}

        <section className="detail-section" aria-labelledby="comment-title">
          <h3 id="comment-title" className="section-kicker">Comments and Notes</h3>
          {canComment && (
            <div className="subpanel comment-composer">
              <CommentForm role={role} requestId={detail.id} onCommentAdded={load} />
            </div>
          )}
          <CommentTimeline comments={detail.comments} />
        </section>

        <section className="detail-section" aria-labelledby="history-title">
          <h3 id="history-title" className="section-kicker">Status History</h3>
          <HistoryTimeline history={detail.statusHistory} />
        </section>
      </article>
    </section>
  );
}
