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
  COMMENT: "Comment",
  NOTE: "Note",
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
    <form id="comment-form" className="form comment-form" onSubmit={handleSubmit} aria-label="Tambah komentar atau catatan">
      <div className="form-field">
        <label className="form-label" htmlFor="comment-type">Type</label>
        <select
          id="comment-type"
          name="commentType"
          className="form-select"
          value={commentType}
          onChange={(e) => setCommentType(e.target.value as AddCommentInput["commentType"])}
        >
          {COMMENT_TYPES.map((type) => (
            <option key={type} value={type}>{COMMENT_TYPE_LABELS[type]}</option>
          ))}
        </select>
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="comment-body">Comment / Note</label>
        <textarea
          id="comment-body"
          name="body"
          className="form-textarea"
          value={body}
          onChange={(e) => { setBody(e.target.value); setBodyError(""); }}
          placeholder="Add a short update or note..."
          aria-describedby="err-comment-body"
        />
        <span id="err-comment-body" className="form-error">{bodyError}</span>
      </div>
      <button type="submit" className="btn btn-secondary" disabled={loading}>
        {loading ? "Sending..." : "Add Comment"}
      </button>
      {status && (
        <div className={status.type === "success" ? "form-status-success" : "form-status-error"} role="alert">
          {status.message}
        </div>
      )}
    </form>
  );
}

interface CommentTimelineProps {
  comments: RequestDetail["comments"];
}

export function CommentTimeline({ comments }: CommentTimelineProps) {
  if (comments.length === 0) {
    return <p className="muted-text">Belum ada komentar.</p>;
  }
  return (
    <ol id="detail-comments" className="timeline">
      {comments.map((comment) => (
        <li key={comment.id} className="timeline-item">
          <span className="timeline-dot" aria-hidden="true" />
          <div className="timeline-body">
            <span className="timeline-title">[{comment.commentType}] {comment.authorRole}</span>
            <p>{comment.body}</p>
            <div className="timeline-meta">{formatDate(comment.createdAt)}</div>
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
    return <p className="muted-text">Belum ada riwayat status.</p>;
  }
  return (
    <ol id="detail-history" className="timeline">
      {history.map((entry, index) => (
        <li key={index} className="timeline-item">
          <span className="timeline-dot" aria-hidden="true" />
          <div className="timeline-body">
            <span className="timeline-title">
              {entry.fromStatus ? `${entry.fromStatus} -> ${entry.toStatus}` : entry.toStatus}
            </span>
            {entry.reason && <p>{entry.reason}</p>}
            <div className="timeline-meta">{entry.changedByRole} | {formatDate(entry.createdAt)}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}
