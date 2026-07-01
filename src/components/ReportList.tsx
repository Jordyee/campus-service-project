import React, { useEffect, useState } from "react";
import type { Role, RequestListItem, ListRequestFilters } from "../types/api";
import { CATEGORIES, PRIORITIES, REQUEST_STATUSES } from "../types/api";
import { listRequests } from "../api/client";
import { StatusBadge, PriorityBadge, formatDate } from "./Badges";

const CATEGORY_LABELS: Record<string, string> = {
  INTERNET: "Internet", AC: "AC", PERALATAN_KELAS: "Peralatan Kelas",
  KEBERSIHAN: "Kebersihan", LABORATORIUM: "Laboratorium", LAINNYA: "Lainnya",
};

const STATUS_LABELS: Record<string, string> = {
  SUBMITTED: "Submitted", UNDER_REVIEW: "Under Review", ASSIGNED: "Assigned",
  IN_PROGRESS: "In Progress", RESOLVED: "Resolved", CLOSED: "Closed",
};

interface ReportListProps {
  role: Role;
  refreshTrigger: number;
  onSelectReport: (id: string) => void;
}

export default function ReportList({ role, refreshTrigger, onSelectReport }: ReportListProps) {
  const [reports, setReports] = useState<RequestListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ListRequestFilters>({});
  const [draft, setDraft] = useState<ListRequestFilters>({});

  async function load(f: ListRequestFilters) {
    setLoading(true);
    setError(null);
    const res = await listRequests(role, f);
    setLoading(false);
    if (res.ok) {
      setReports(res.data);
    } else {
      setError(res.message);
    }
  }

  useEffect(() => {
    load(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, refreshTrigger, filters]);

  function handleApply(e: React.FormEvent) {
    e.preventDefault();
    setFilters(draft);
  }

  function handleClear() {
    setDraft({});
    setFilters({});
  }

  return (
    <section className="card" aria-labelledby="reports-title">
      <h2 id="reports-title" className="card-title">Laporan</h2>

      <form id="report-filters" className="filters-form" onSubmit={handleApply} aria-label="Filter laporan">
        <div className="form-field">
          <label className="form-label" htmlFor="filter-keyword">Kata Kunci</label>
          <input
            id="filter-keyword"
            name="keyword"
            className="form-input"
            value={draft.keyword ?? ""}
            onChange={(e) => setDraft((p) => ({ ...p, keyword: e.target.value || undefined }))}
            autoComplete="off"
          />
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="filter-status">Status</label>
          <select
            id="filter-status"
            name="status"
            className="form-select"
            value={draft.status ?? ""}
            onChange={(e) => setDraft((p) => ({ ...p, status: (e.target.value as ListRequestFilters["status"]) || undefined }))}
          >
            <option value="">Semua</option>
            {REQUEST_STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
          </select>
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="filter-category">Kategori</label>
          <select
            id="filter-category"
            name="category"
            className="form-select"
            value={draft.category ?? ""}
            onChange={(e) => setDraft((p) => ({ ...p, category: (e.target.value as ListRequestFilters["category"]) || undefined }))}
          >
            <option value="">Semua</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>)}
          </select>
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="filter-priority">Prioritas</label>
          <select
            id="filter-priority"
            name="priority"
            className="form-select"
            value={draft.priority ?? ""}
            onChange={(e) => setDraft((p) => ({ ...p, priority: (e.target.value as ListRequestFilters["priority"]) || undefined }))}
          >
            <option value="">Semua</option>
            {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="filter-location">Lokasi</label>
          <input
            id="filter-location"
            name="location"
            className="form-input"
            value={draft.location ?? ""}
            onChange={(e) => setDraft((p) => ({ ...p, location: e.target.value || undefined }))}
            autoComplete="off"
          />
        </div>
        <button type="submit" className="btn btn-primary btn-sm" style={{ alignSelf: "flex-end" }}>Terapkan</button>
        <button id="clear-filters" type="button" className="btn btn-secondary btn-sm" style={{ alignSelf: "flex-end" }} onClick={handleClear}>Hapus</button>
      </form>

      {loading && <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>Memuat laporan...</p>}
      {error && <p className="form-status-error" role="alert">{error}</p>}

      {!loading && !error && reports.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <p className="empty-state-text">Tidak ada laporan ditemukan.</p>
        </div>
      )}

      {!loading && reports.length > 0 && (
        <div className="table-wrap">
          <table id="reports-table" className="table">
            <thead>
              <tr>
                <th>Nomor</th>
                <th>Judul</th>
                <th>Lokasi</th>
                <th>Kategori</th>
                <th>Prioritas</th>
                <th>Status</th>
                <th>Teknisi</th>
                <th>Dibuat</th>
              </tr>
            </thead>
            <tbody id="reports-body">
              {reports.map((r) => (
                <tr key={r.id} onClick={() => onSelectReport(r.id)} role="button" tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && onSelectReport(r.id)}>
                  <td className="table-row-number">{r.requestNumber}</td>
                  <td style={{ fontWeight: 600, color: "var(--color-primary)" }}>{r.title}</td>
                  <td>{r.location}</td>
                  <td>{CATEGORY_LABELS[r.category] ?? r.category}</td>
                  <td><PriorityBadge priority={r.priority} /></td>
                  <td><StatusBadge status={r.status} /></td>
                  <td>{r.assignedTechnicianName ?? <span style={{ color: "var(--color-text-muted)" }}>—</span>}</td>
                  <td>{formatDate(r.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p id="reports-empty" className="empty-state-text" aria-live="polite" />
    </section>
  );
}
