import React, { useEffect, useState } from "react";
import type { Role, TechnicianTaskItem } from "../types/api";
import { listTechnicianTasks } from "../api/client";
import { StatusBadge, PriorityBadge, formatDate } from "./Badges";

interface TechnicianTaskListProps {
  role: Role;
  refreshTrigger: number;
  onSelectTask: (id: string) => void;
}

export default function TechnicianTaskList({ role, refreshTrigger, onSelectTask }: TechnicianTaskListProps) {
  const [tasks, setTasks] = useState<TechnicianTaskItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      const res = await listTechnicianTasks(role);
      setLoading(false);
      if (res.ok) setTasks(res.data);
      else setError(res.message);
    }
    load();
  }, [role, refreshTrigger]);

  return (
    <section id="technician-tasks-section" className="card" aria-labelledby="tasks-title">
      <h2 id="tasks-title" className="card-title">Tugas Saya</h2>

      {loading && <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>Memuat tugas...</p>}
      {error && <p className="form-status-error" role="alert">{error}</p>}

      {!loading && !error && tasks.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">✅</div>
          <p id="tasks-empty" className="empty-state-text">Tidak ada tugas yang diberikan saat ini.</p>
        </div>
      )}

      {!loading && tasks.length > 0 && (
        <div className="table-wrap">
          <table id="tasks-table" className="table">
            <thead>
              <tr>
                <th>Nomor</th>
                <th>Judul</th>
                <th>Lokasi</th>
                <th>Prioritas</th>
                <th>Status</th>
                <th>Diterima</th>
                <th>Diperbarui</th>
              </tr>
            </thead>
            <tbody id="tasks-body">
              {tasks.map((t) => (
                <tr key={t.id} onClick={() => onSelectTask(t.id)} role="button" tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && onSelectTask(t.id)}>
                  <td className="table-row-number">{t.requestNumber}</td>
                  <td style={{ fontWeight: 600 }}>{t.title}</td>
                  <td>{t.location}</td>
                  <td><PriorityBadge priority={t.priority} /></td>
                  <td><StatusBadge status={t.status} /></td>
                  <td>{t.accepted ? (t.acceptedAt ? formatDate(t.acceptedAt) : "Ya") : <span style={{ color: "var(--color-text-muted)" }}>Belum</span>}</td>
                  <td>{formatDate(t.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <output id="tasks-status" />
    </section>
  );
}
