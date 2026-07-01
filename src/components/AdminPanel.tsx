import React, { useEffect, useState } from "react";
import type { Role, RequestDetail, TechnicianChoice, ClassificationInput } from "../types/api";
import { CATEGORIES, PRIORITIES } from "../types/api";
import { reviewRequest, classifyRequest, listTechnicians, assignTechnician, closeRequest, reopenRequest } from "../api/client";

const CATEGORY_LABELS: Record<string, string> = {
  INTERNET: "Internet", AC: "AC", PERALATAN_KELAS: "Peralatan Kelas",
  KEBERSIHAN: "Kebersihan", LABORATORIUM: "Laboratorium", LAINNYA: "Lainnya",
};

interface AdminPanelProps {
  role: Role;
  detail: RequestDetail;
  onUpdated: () => void;
}

export default function AdminPanel({ role, detail, onUpdated }: AdminPanelProps) {
  const [techList, setTechList] = useState<TechnicianChoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Classification form state
  const [category, setCategory] = useState<ClassificationInput["category"]>(detail.category);
  const [priority, setPriority] = useState<ClassificationInput["priority"]>(detail.priority);
  const [note, setNote] = useState("");

  // Assignment form state
  const [technicianId, setTechnicianId] = useState("");
  const [assignReason, setAssignReason] = useState("");

  // Close/Reopen form state
  const [closeReason, setCloseReason] = useState("");

  useEffect(() => {
    // Muat daftar teknisi hanya jika admin membutuhkan assignment
    if (detail.status === "UNDER_REVIEW") {
      listTechnicians(role).then((res) => {
        if (res.ok) setTechList(res.data);
      });
    }
  }, [role, detail.status]);

  async function act(fn: () => Promise<void>) {
    setLoading(true);
    setStatusMsg(null);
    try {
      await fn();
    } finally {
      setLoading(false);
    }
  }

  async function handleReview() {
    await act(async () => {
      const res = await reviewRequest(role, detail.id, { note: note || undefined });
      if (res.ok) {
        setStatusMsg({ type: "success", text: "Laporan dipindahkan ke Under Review." });
        onUpdated();
      } else {
        setStatusMsg({ type: "error", text: res.message });
      }
    });
  }

  async function handleClassify(e: React.FormEvent) {
    e.preventDefault();
    await act(async () => {
      const res = await classifyRequest(role, detail.id, { category, priority, note: note || undefined });
      if (res.ok) {
        setStatusMsg({ type: "success", text: "Klasifikasi berhasil disimpan." });
        onUpdated();
      } else {
        setStatusMsg({ type: "error", text: res.message });
      }
    });
  }

  async function handleAssign(e: React.FormEvent) {
    e.preventDefault();
    if (!technicianId) { setStatusMsg({ type: "error", text: "Pilih teknisi terlebih dahulu." }); return; }
    await act(async () => {
      const res = await assignTechnician(role, detail.id, { technicianId, reason: assignReason || undefined });
      if (res.ok) {
        setStatusMsg({ type: "success", text: "Teknisi berhasil ditugaskan." });
        onUpdated();
      } else {
        setStatusMsg({ type: "error", text: res.message });
      }
    });
  }

  async function handleClose() {
    await act(async () => {
      const res = await closeRequest(role, detail.id, { reason: closeReason || undefined });
      if (res.ok) {
        setStatusMsg({ type: "success", text: "Laporan berhasil ditutup." });
        onUpdated();
      } else {
        setStatusMsg({ type: "error", text: res.message });
      }
    });
  }

  async function handleReopen(e: React.FormEvent) {
    e.preventDefault();
    if (!closeReason.trim()) { setStatusMsg({ type: "error", text: "Alasan reopen wajib diisi." }); return; }
    await act(async () => {
      const res = await reopenRequest(role, detail.id, { reason: closeReason });
      if (res.ok) {
        setStatusMsg({ type: "success", text: "Laporan berhasil dibuka kembali." });
        setCloseReason("");
        onUpdated();
      } else {
        setStatusMsg({ type: "error", text: res.message });
      }
    });
  }

  return (
    <div>
      {statusMsg && (
        <div className={statusMsg.type === "success" ? "form-status-success" : "form-status-error"} role="alert" style={{ marginBottom: "var(--space-4)" }}>
          {statusMsg.text}
        </div>
      )}

      {/* ─── Review ─── */}
      {detail.status === "SUBMITTED" && (
        <div id="admin-review-form" className="subpanel">
          <h4 className="subpanel-title">Review Admin</h4>
          <div className="form-field" style={{ marginBottom: "var(--space-3)" }}>
            <label className="form-label" htmlFor="admin-note">Catatan Review (opsional)</label>
            <textarea id="admin-note" name="note" className="form-textarea" value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
          <button id="admin-review-button" type="button" className="btn btn-primary" onClick={handleReview} disabled={loading}>
            Mulai Review
          </button>
        </div>
      )}

      {/* ─── Classification + Assignment ─── */}
      {detail.status === "UNDER_REVIEW" && (
        <>
          <form id="admin-review-form" className="subpanel" onSubmit={handleClassify}>
            <h4 className="subpanel-title">Klasifikasi</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)", marginBottom: "var(--space-3)" }}>
              <div className="form-field">
                <label className="form-label" htmlFor="admin-category">Kategori</label>
                <select id="admin-category" name="category" className="form-select" value={category} onChange={(e) => setCategory(e.target.value as ClassificationInput["category"])}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>)}
                </select>
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="admin-priority">Prioritas</label>
                <select id="admin-priority" name="priority" className="form-select" value={priority} onChange={(e) => setPriority(e.target.value as ClassificationInput["priority"])}>
                  {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div className="form-field" style={{ marginBottom: "var(--space-3)" }}>
              <label className="form-label" htmlFor="admin-class-note">Catatan (opsional)</label>
              <textarea id="admin-class-note" className="form-textarea" value={note} onChange={(e) => setNote(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>Simpan Klasifikasi</button>
          </form>

          <form id="assignment-form" className="subpanel" onSubmit={handleAssign}>
            <h4 className="subpanel-title">Penugasan Teknisi</h4>
            <div className="form-field" style={{ marginBottom: "var(--space-3)" }}>
              <label className="form-label" htmlFor="assignment-technician">Teknisi</label>
              <select id="assignment-technician" name="technicianId" className="form-select" value={technicianId} onChange={(e) => setTechnicianId(e.target.value)}>
                <option value="">Pilih teknisi</option>
                {techList.map((t) => <option key={t.id} value={t.id}>{t.displayName}</option>)}
              </select>
            </div>
            <div className="form-field" style={{ marginBottom: "var(--space-3)" }}>
              <label className="form-label" htmlFor="assignment-reason">Alasan Penugasan (opsional)</label>
              <textarea id="assignment-reason" name="reason" className="form-textarea" value={assignReason} onChange={(e) => setAssignReason(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>Tugaskan Teknisi</button>
          </form>
        </>
      )}

      {/* ─── Close / Reopen ─── */}
      {(detail.status === "RESOLVED" || detail.status === "CLOSED") && (
        <form id="admin-close-form" className="subpanel" onSubmit={handleReopen}>
          <h4 className="subpanel-title">Tutup / Buka Kembali</h4>
          <div className="form-field" style={{ marginBottom: "var(--space-3)" }}>
            <label className="form-label" htmlFor="admin-close-reason">Alasan Reopen</label>
            <textarea id="admin-close-reason" name="reason" className="form-textarea" value={closeReason} onChange={(e) => setCloseReason(e.target.value)} />
          </div>
          <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
            {detail.status === "RESOLVED" && (
              <button id="admin-close-button" type="button" className="btn btn-danger" onClick={handleClose} disabled={loading}>
                Tutup Laporan
              </button>
            )}
            <button id="admin-reopen-button" type="submit" className="btn btn-secondary" disabled={loading}>
              Buka Kembali
            </button>
          </div>
          <output id="admin-close-status" />
        </form>
      )}
      <output id="admin-status" />
      <output id="assignment-status" />
    </div>
  );
}
