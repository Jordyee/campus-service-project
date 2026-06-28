---
name: 01-inception-stakeholder
description: Use this skill for project inception and stakeholder discovery for the Campus Service Request and Maintenance System. It creates an evidence-backed starting view of the problem, actors, objectives, scope, constraints, risks, and open questions without writing final requirements.
---

# Skill 01: Inception dan Stakeholder

## Tujuan

Gunakan skill ini untuk membuat pandangan awal requirements engineering:

- konteks masalah fasilitas kampus;
- stakeholder dan kepentingannya;
- tujuan awal aplikasi;
- scope awal dan batasan scope;
- constraint tugas;
- risiko dan pertanyaan terbuka.

Skill ini tidak menghasilkan requirement final, user story, prioritas, desain, atau rencana implementasi.

## Kapan Digunakan

Gunakan pada awal project, sebelum elicitation dan specification.

## Input

Baca file berikut sebelum menghasilkan output:

- `AI_Assisted_Campus_Service_Project.md`
- `README.md`
- `CASE.md`

Jika nanti tersedia, baca juga:

- `docs/requirements/notes-stakeholder.md`
- `docs/requirements/interview-answers.md`
- `docs/requirements/assumptions.md`

## Source ID

Gunakan label sumber berikut:

- `SRC-01`: instruksi tugas utama dari `AI_Assisted_Campus_Service_Project.md`.
- `SRC-02`: case summary dari `CASE.md`.
- `SRC-03`: informasi project dari `README.md`.
- `ASM-*`: asumsi yang belum dikonfirmasi.
- `OQ-*`: open question.

## Evidence Rules

Pisahkan setiap pernyataan menjadi kategori berikut:

| Category | Meaning | Allowed wording |
|---|---|---|
| Confirmed case fact | Tertulis di dokumen tugas atau `CASE.md`. | "The case confirms..." |
| Assumption | Masuk akal tetapi belum dinyatakan eksplisit. | "Assumption ASM-xx states..." |
| Open question | Informasi belum tersedia. | "This remains open..." |
| Derived need | Interpretasi hati-hati dari fakta yang dikonfirmasi. | "This suggests a need for..." |

Jangan mengubah asumsi atau open question menjadi fakta.

## Langkah Kerja

1. Konfirmasi batas tugas.
   - Kerjakan hanya inception dan stakeholder discovery.
   - Jangan membuat FR, NFR, business rule, user story, prioritas, desain, issue, test, atau kode.

2. Buat evidence inventory.
   - Catat aktor yang dikonfirmasi: Pelapor, Administrator, Teknisi, Manajer Fasilitas.
   - Catat fitur wajib dari dokumen tugas.
   - Catat constraint tugas: GitHub, Cloudflare Workers, D1, testing, traceability, AI evidence.

3. Identifikasi stakeholder.
   - Untuk setiap stakeholder, tulis interest, kebutuhan awal, evidence source, dan uncertainty.
   - Jika menambah stakeholder seperti dosen/reviewer atau operator sistem, beri label asumsi.

4. Rumuskan problem dan objective awal.
   - Jelaskan masalah tanpa memilih detail desain yang belum perlu.
   - Objective harus berasal dari fakta case atau asumsi yang jelas.

5. Tentukan scope awal.
   - Pisahkan fitur wajib, fitur tidak wajib, dan deferred topics.
   - Jangan memasukkan upload foto, email notification, Google login, QR code, AI category, inventory, atau vendor management sebagai scope wajib.

6. Catat constraint, risiko, dan open question.
   - Ubah area yang belum jelas menjadi `OQ-*`, bukan keputusan.
   - Tandai keputusan yang perlu review manusia.

## Output

Jika skill dijalankan, buat draft pertama di:

- `docs/requirements/01-inception-stakeholder.md`

Simpan catatan penggunaan AI atau review manusia di:

- `evidence/`

## Output Structure

```markdown
# Inception dan Stakeholder

## 1. Sources Read
## 2. Evidence Summary
## 3. Problem Statement
## 4. Initial Objectives
## 5. Stakeholder Discovery
## 6. Preliminary Scope
## 7. Out of Scope / Deferred
## 8. Constraints
## 9. Quality Concerns
## 10. Risks
## 11. Open Questions
## 12. Human Review Notes
```

## Aturan

- Jangan membuat fakta baru.
- Jangan melampaui scope case.
- Semua asumsi harus diberi ID `ASM-*`.
- Semua pertanyaan terbuka harus diberi ID `OQ-*`.
- Jangan lanjut ke tahap elicitation atau specification di output skill ini.

## Quality Check

- Semua aktor wajib tercakup.
- Fitur wajib dan fitur tidak wajib dipisahkan.
- Constraint Cloudflare Workers + D1 tercatat.
- Tidak ada requirement final atau user story.
- Open question dan asumsi terlihat jelas.

## Kondisi Gagal

Berhenti dan tanya mahasiswa jika:

- input utama tidak tersedia;
- keputusan scope harus dibuat sebelum bisa lanjut;
- ada konflik antar sumber;
- output yang diminta membutuhkan asumsi sebagai fakta.

## Human Review

Mahasiswa memeriksa apakah problem, stakeholder, scope, asumsi, dan open question sudah sesuai case sebelum lanjut ke Skill 02.

