import React, { useState } from "react";
import type { Role, RequestDetail } from "../types/api";
import { acceptTask, updateWorkStatus } from "../api/client";

interface TechnicianPanelProps {
  role: Role;
  detail: RequestDetail;
  onUpdated: () => void;
}

export default function TechnicianPanel({ role, detail, onUpdated }: TechnicianPanelProps) {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Hanya tampilkan panel jika laporan dalam status yang relevan untuk teknisi
  if (detail.status !== "ASSIGNED" && detail.status !== "IN_PROGRESS") {
    return null;
  }

  async function act(fn: () => Promise<void>) {
    setLoading(true);
    setStatusMsg(null);
    try { await fn(); } finally { setLoading(false); }
  }

  async function handleAccept() {
    await act(async () => {
      const res = await acceptTask(role, detail.id);
      if (res.ok) {
        setStatusMsg({ type: "success", text: "Tugas berhasil diterima." });
        onUpdated();
      } else {
        setStatusMsg({ type: "error", text: res.message });
      }
    });
  }

  async function handleMarkInProgress() {
    await act(async () => {
      const res = await updateWorkStatus(role, detail.id, { status: "IN_PROGRESS", note: note || undefined });
      if (res.ok) {
        setStatusMsg({ type: "success", text: "Status diperbarui menjadi In Progress." });
        onUpdated();
      } else {
        setStatusMsg({ type: "error", text: res.message });
      }
    });
  }

  async function handleMarkResolved() {
    await act(async () => {
      const res = await updateWorkStatus(role, detail.id, { status: "RESOLVED", note: note || undefined });
      if (res.ok) {
        setStatusMsg({ type: "success", text: "Pekerjaan ditandai Resolved." });
        onUpdated();
      } else {
        setStatusMsg({ type: "error", text: res.message });
      }
    });
  }

  return (
    <form id="technician-task-form" className="subpanel" onSubmit={(e) => e.preventDefault()}>
      <h4 className="subpanel-title">Tugas Teknisi</h4>

      {statusMsg && (
        <div className={statusMsg.type === "success" ? "form-status-success" : "form-status-error"} role="alert" style={{ marginBottom: "var(--space-3)" }}>
          {statusMsg.text}
        </div>
      )}

      <div className="form-field" style={{ marginBottom: "var(--space-3)" }}>
        <label className="form-label" htmlFor="technician-note">Catatan Progres (opsional)</label>
        <textarea
          id="technician-note"
          name="note"
          className="form-textarea"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
        {detail.status === "ASSIGNED" && !detail.acceptedAt && (
          <button id="accept-task-button" type="button" className="btn btn-secondary" onClick={handleAccept} disabled={loading}>
            Terima Pekerjaan
          </button>
        )}
        {detail.status === "ASSIGNED" && (
          <button id="mark-progress-button" type="button" className="btn btn-primary" onClick={handleMarkInProgress} disabled={loading}>
            Tandai In Progress
          </button>
        )}
        {detail.status === "IN_PROGRESS" && (
          <button id="mark-resolved-button" type="button" className="btn btn-primary" onClick={handleMarkResolved} disabled={loading}>
            Tandai Resolved
          </button>
        )}
      </div>
      <output id="technician-task-status" />
    </form>
  );
}
