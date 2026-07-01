import React, { useState } from "react";
import type { Role, RequestDetail, AddCommentInput } from "../types/api";
import { COMMENT_TYPES } from "../types/api";
import { addComment } from "../api/client";
import { formatDate } from "./Badges";

interface CommentFormProps {
  role: Role;
  requestId: string;
  onCommentAdded: () => void;
}

const COMMENT_TYPE_LABELS: Record<string, string> = {
  COMMENT: "Komentar",
  NOTE: "Catatan",
};

export default function CommentForm({ role, requestId, onCommentAdded }: CommentFormProps) {
  const [body, setBody] = useState("");
  const [commentType, setCommentType] = useState<AddCommentInput["commentType"]>("COMMENT");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [bodyError, setBodyError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) {
      setBodyError("Isi komentar/catatan wajib diisi.");
      return;
    }
    setBodyError("");
    setLoading(true);
    setStatus(null);

    const res = await addComment(role, requestId, { body: body.trim(), commentType });
    setLoading(false);

    if (res.ok) {
      setStatus({ type: "success", message: "Komentar berhasil ditambahkan." });
      setBody("");
      onCommentAdded();
    } else {
      setStatus({ type: "error", message: res.message });
    }
  }

  return (
    <form id="comment-form" className="form" onSubmit={handleSubmit} aria-label="Tambah komentar atau catatan">
      <div className="form-field">
        <label className="form-label" htmlFor="comment-type">Jenis</label>
        <select
          id="comment-type"
          name="commentType"
          className="form-select"
          value={commentType}
          onChange={(e) => setCommentType(e.target.value as AddCommentInput["commentType"])}
        >
          {COMMENT_TYPES.map((t) => (
            <option key={t} value={t}>{COMMENT_TYPE_LABELS[t]}</option>
          ))}
        </select>
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="comment-body">Komentar / Catatan</label>
        <textarea
          id="comment-body"
          name="body"
          className="form-textarea"
          value={body}
          onChange={(e) => { setBody(e.target.value); setBodyError(""); }}
          aria-describedby="err-comment-body"
        />
        <span id="err-comment-body" className="form-error">{bodyError}</span>
      </div>
      <button type="submit" className="btn btn-secondary" disabled={loading}>
        {loading ? "Mengirim..." : "Tambah Komentar"}
      </button>
      {status && (
        <div className={status.type === "success" ? "form-status-success" : "form-status-error"} role="alert">
          {status.message}
        </div>
      )}
    </form>
  );
}

// ─── Timeline rendering for comments + history ─────────────────────────────────

interface CommentTimelineProps {
  comments: RequestDetail["comments"];
}

export function CommentTimeline({ comments }: CommentTimelineProps) {
  if (comments.length === 0) {
    return <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>Belum ada komentar.</p>;
  }
  return (
    <ol id="detail-comments" className="timeline">
      {comments.map((c) => (
        <li key={c.id} className="timeline-item">
          <span className="timeline-dot" aria-hidden="true" />
          <div className="timeline-body">
            <span style={{ fontWeight: 600 }}>[{c.commentType}] {c.authorRole}:</span> {c.body}
            <div className="timeline-meta">{formatDate(c.createdAt)}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}

interface HistoryTimelineProps {
  history: RequestDetail["statusHistory"];
}

export function HistoryTimeline({ history }: HistoryTimelineProps) {
  if (history.length === 0) {
    return <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>Belum ada riwayat status.</p>;
  }
  return (
    <ol id="detail-history" className="timeline">
      {history.map((h, i) => (
        <li key={i} className="timeline-item">
          <span className="timeline-dot" aria-hidden="true" />
          <div className="timeline-body">
            <span style={{ fontWeight: 600 }}>
              {h.fromStatus ? `${h.fromStatus} → ${h.toStatus}` : h.toStatus}
            </span>
            {h.reason && <span style={{ color: "var(--color-text-secondary)" }}> — {h.reason}</span>}
            <div className="timeline-meta">{h.changedByRole} · {formatDate(h.createdAt)}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}
