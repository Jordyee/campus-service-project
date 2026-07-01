import React, { useEffect, useState, useCallback } from "react";
import type { Role, RequestDetail } from "../types/api";
import { getRequestDetail } from "../api/client";
import { StatusBadge, PriorityBadge, formatDate } from "./Badges";
import AdminPanel from "./AdminPanel";
import TechnicianPanel from "./TechnicianPanel";
import CommentForm, { CommentTimeline, HistoryTimeline } from "./CommentForm";

const CATEGORY_LABELS: Record<string, string> = {
  INTERNET: "Internet", AC: "AC", PERALATAN_KELAS: "Peralatan Kelas",
  KEBERSIHAN: "Kebersihan", LABORATORIUM: "Laboratorium", LAINNYA: "Lainnya",
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
        <h2 id="detail-title" className="card-title">Detail Laporan</h2>
        <div className="detail-placeholder">
          <p id="detail-status">Pilih laporan untuk melihat detail.</p>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="card detail" aria-labelledby="detail-title">
        <h2 id="detail-title" className="card-title">Detail Laporan</h2>
        <p id="detail-status" style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>Memuat detail...</p>
      </section>
    );
  }

  if (error || !detail) {
    return (
      <section className="card detail" aria-labelledby="detail-title">
        <h2 id="detail-title" className="card-title">Detail Laporan</h2>
        <p className="form-status-error" role="alert">{error ?? "Laporan tidak ditemukan."}</p>
      </section>
    );
  }

  return (
    <section className="card detail" aria-labelledby="detail-title">
      <h2 id="detail-title" className="card-title">Detail Laporan</h2>
      <article id="detail-card">
        <h3 id="detail-heading" style={{ marginBottom: "var(--space-4)", fontSize: "var(--text-lg)" }}>
          [{detail.requestNumber}] {detail.title}
        </h3>

        {/* ─── Lifecycle Steps ───────────────── */}
        <ol id="detail-lifecycle" className="lifecycle" style={{ marginBottom: "var(--space-5)" }}>
          {ALL_STATUSES.map((s, i) => {
            const idx = ALL_STATUSES.indexOf(detail.status as typeof ALL_STATUSES[number]);
            const stepIdx = i;
            const isActive = s === detail.status;
            const isPast = stepIdx < idx;
            return (
              <React.Fragment key={s}>
                <li className={`lifecycle-step${isActive ? " lifecycle-step--active" : ""}${isPast ? " lifecycle-step--past" : ""}`}>
                  {s.replace(/_/g, " ")}
                </li>
                {i < ALL_STATUSES.length - 1 && <span className="lifecycle-arrow" aria-hidden="true">›</span>}
              </React.Fragment>
            );
          })}
        </ol>

        {/* ─── Detail Fields ────────────────── */}
        <dl className="detail-grid">
          <div className="detail-field">
            <dt>Status</dt>
            <dd id="detail-status-value"><StatusBadge status={detail.status} /></dd>
          </div>
          <div className="detail-field">
            <dt>Prioritas</dt>
            <dd id="detail-priority"><PriorityBadge priority={detail.priority} /></dd>
          </div>
          <div className="detail-field">
            <dt>Kategori</dt>
            <dd id="detail-category">{CATEGORY_LABELS[detail.category] ?? detail.category}</dd>
          </div>
          <div className="detail-field">
            <dt>Lokasi</dt>
            <dd id="detail-location">{detail.location}</dd>
          </div>
          <div className="detail-field">
            <dt>Pelapor</dt>
            <dd id="detail-reporter">{detail.reporterName} ({detail.reporterContact})</dd>
          </div>
          <div className="detail-field">
            <dt>Teknisi Ditugaskan</dt>
            <dd id="detail-technician">{detail.assignedTechnician?.displayName ?? "—"}</dd>
          </div>
          <div className="detail-field">
            <dt>Diterima</dt>
            <dd id="detail-accepted">{detail.acceptedAt ? formatDate(detail.acceptedAt) : "—"}</dd>
          </div>
          <div className="detail-field">
            <dt>Dibuat</dt>
            <dd id="detail-created">{formatDate(detail.createdAt)}</dd>
          </div>
          <div className="detail-field">
            <dt>Diperbarui</dt>
            <dd id="detail-updated">{formatDate(detail.updatedAt)}</dd>
          </div>
        </dl>

        <h3 style={{ marginBottom: "var(--space-3)" }}>Deskripsi</h3>
        <p id="detail-description" style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-5)" }}>
          {detail.description}
        </p>

        {/* ─── Admin Panel ──────────────────── */}
        {canAdminActions && (
          <AdminPanel
            role={role}
            detail={detail}
            onUpdated={() => { load(); onUpdated(); }}
          />
        )}

        {/* ─── Technician Panel ─────────────── */}
        {canTechnicianActions && (
          <TechnicianPanel
            role={role}
            detail={detail}
            onUpdated={() => { load(); onUpdated(); }}
          />
        )}

        {/* ─── Comments ─────────────────────── */}
        <h3 style={{ margin: "var(--space-5) 0 var(--space-3)" }}>Komentar / Catatan</h3>
        {canComment && (
          <div className="subpanel" style={{ marginBottom: "var(--space-4)" }}>
            <CommentForm role={role} requestId={detail.id} onCommentAdded={load} />
          </div>
        )}
        <CommentTimeline comments={detail.comments} />

        {/* ─── Status History ───────────────── */}
        <h3 style={{ margin: "var(--space-5) 0 var(--space-3)" }}>Riwayat Status</h3>
        <HistoryTimeline history={detail.statusHistory} />
      </article>
    </section>
  );
}
