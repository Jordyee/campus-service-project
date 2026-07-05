import React, { useState } from "react";
import type { Role, CreateRequestInput } from "../types/api";
import { CATEGORIES } from "../types/api";
import { createRequest } from "../api/client";

interface ReportFormProps {
  role: Role;
  onCreated: (id: string, requestNumber: string) => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  INTERNET: "Internet",
  AC: "AC",
  PERALATAN_KELAS: "Peralatan Kelas",
  KEBERSIHAN: "Kebersihan",
  LABORATORIUM: "Laboratorium",
  LAINNYA: "Lainnya",
};

type FieldErrors = Partial<Record<keyof CreateRequestInput, string>>;

export default function ReportForm({ role, onCreated }: ReportFormProps) {
  const [form, setForm] = useState<CreateRequestInput>({
    title: "",
    description: "",
    location: "",
    category: "INTERNET",
    reporterName: "",
    reporterContact: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  function set(field: keyof CreateRequestInput, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setStatus(null);
  }

  function validate(): boolean {
    const errs: FieldErrors = {};
    if (!form.title.trim()) errs.title = "Judul wajib diisi.";
    if (!form.location.trim()) errs.location = "Lokasi wajib diisi.";
    if (!form.category) errs.category = "Kategori wajib dipilih.";
    if (!form.reporterName.trim()) errs.reporterName = "Nama pelapor wajib diisi.";
    if (!form.reporterContact.trim()) errs.reporterContact = "Kontak pelapor wajib diisi.";
    if (!form.description.trim()) errs.description = "Deskripsi wajib diisi.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setStatus(null);

    const result = await createRequest(role, form);
    setLoading(false);

    if (result.ok) {
      setStatus({ type: "success", message: `Laporan ${result.data.requestNumber} berhasil dikirim!` });
      onCreated(result.data.id, result.data.requestNumber);
      setForm({ title: "", description: "", location: "", category: "INTERNET", reporterName: "", reporterContact: "" });
    } else {
      setStatus({ type: "error", message: result.message });
    }
  }

  return (
    <section id="create-report-section" className="card scroll-anchor" aria-labelledby="report-form-title">
      <div className="section-heading-row">
        <div>
          <h2 id="report-form-title" className="card-title">Create Report</h2>
          <p>Submit a campus service issue for administrator review.</p>
        </div>
      </div>
      <form id="request-form" className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label className="form-label" htmlFor="report-title">Issue Title</label>
          <input
            id="report-title"
            name="title"
            className="form-input"
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            autoComplete="off"
            placeholder="Briefly describe the problem"
            aria-describedby="err-title"
          />
          <span id="err-title" className="form-error">{errors.title ?? ""}</span>
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="report-location">Location</label>
          <input
            id="report-location"
            name="location"
            className="form-input"
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
            autoComplete="off"
            placeholder="Building, room, or campus area"
            aria-describedby="err-location"
          />
          <span id="err-location" className="form-error">{errors.location ?? ""}</span>
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="report-category">Category</label>
          <select
            id="report-category"
            name="category"
            className="form-select"
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            aria-describedby="err-category"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{CATEGORY_LABELS[cat]}</option>
            ))}
          </select>
          <span id="err-category" className="form-error">{errors.category ?? ""}</span>
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="report-reporter-name">Reporter Name</label>
          <input
            id="report-reporter-name"
            name="reporterName"
            className="form-input"
            value={form.reporterName}
            onChange={(e) => set("reporterName", e.target.value)}
            autoComplete="name"
            aria-describedby="err-reporterName"
          />
          <span id="err-reporterName" className="form-error">{errors.reporterName ?? ""}</span>
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="report-reporter-contact">Reporter Contact</label>
          <input
            id="report-reporter-contact"
            name="reporterContact"
            className="form-input"
            value={form.reporterContact}
            onChange={(e) => set("reporterContact", e.target.value)}
            autoComplete="email"
            aria-describedby="err-reporterContact"
          />
          <span id="err-reporterContact" className="form-error">{errors.reporterContact ?? ""}</span>
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="report-description">Detailed Description</label>
          <textarea
            id="report-description"
            name="description"
            className="form-textarea"
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Provide clear context, impact, and exact location details."
            aria-describedby="err-description"
          />
          <span id="err-description" className="form-error">{errors.description ?? ""}</span>
        </div>

        <button id="submit-report-btn" type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Submit Report"}
        </button>

        {status && (
          <div className={status.type === "success" ? "form-status-success" : "form-status-error"} role="alert">
            {status.message}
          </div>
        )}
      </form>
    </section>
  );
}
