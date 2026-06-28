---
name: 03-specification
description: Use this skill to turn reviewed inception and elicitation evidence into traceable functional requirements, non-functional requirements, business rules, user stories, and acceptance criteria for the Campus Service Request and Maintenance System.
---

# Skill 03: Specification

## Tujuan

Gunakan skill ini untuk membuat specification setelah Skill 01 dan Skill 02 memiliki baseline yang sudah direview.

Skill ini menghasilkan:

- functional requirements `FR-*`;
- non-functional requirements `NFR-*`;
- business rules `BR-*`;
- user stories `US-*`;
- acceptance criteria `AC-*`;
- deferred requirement topics `DR-*`;
- traceability awal.

## Kapan Digunakan

Gunakan setelah:

- `docs/requirements/01-inception-stakeholder.md`
- `docs/requirements/02-elicitation.md`

tersedia dan sudah direview.

## Input

Baca file berikut:

- `AI_Assisted_Campus_Service_Project.md`
- `README.md`
- `CASE.md`
- `docs/requirements/01-inception-stakeholder.md`
- `docs/requirements/02-elicitation.md`
- file review di `evidence/`, jika tersedia.

## Source ID

Gunakan label berikut:

- `SRC-*`: sumber case.
- `ASM-*`: asumsi.
- `OQ-*`: open question.
- `ELQ-*`: pertanyaan elicitation.
- `INT-*`: jawaban interview atau simulasi yang disetujui.
- `FR-*`: functional requirement.
- `NFR-*`: non-functional requirement.
- `BR-*`: business rule.
- `US-*`: user story.
- `AC-*`: acceptance criteria.
- `DR-*`: deferred topic.

## Evidence Rules

| Category | Requirement use |
|---|---|
| Confirmed case fact | Boleh mendukung requirement. |
| Approved answer | Boleh mendukung detail requirement. |
| Partial answer | Hanya boleh mendukung topik umum; detail tetap open. |
| Assumption | Harus diberi label asumsi. |
| Open question | Tidak boleh menjadi requirement. |
| Deferred item | Dicatat sebagai `DR-*`, bukan requirement final. |

Jangan mengubah unanswered question, assumption, atau default yang terlihat nyaman menjadi requirement.

## Langkah Kerja

1. Konfirmasi batas tugas.
   - Kerjakan specification saja.
   - Jangan membuat desain arsitektur, database, API, issue, test, atau kode.

2. Verifikasi prerequisite.
   - Pastikan Skill 01 dan Skill 02 tersedia.
   - Gunakan baseline yang sudah direview, bukan raw output yang belum dicek.

3. Buat readiness map.
   - Daftar capability yang case-confirmed.
   - Daftar area partial, assumption-labelled, open, dan deferred.

4. Tulis functional requirements.
   - Minimal 12 `FR-*`.
   - Harus mencakup fitur wajib: create report, list, search/filter, detail, review, priority, assign technician, status update, comment/note, status history, close/reopen, dashboard.

5. Tulis non-functional requirements.
   - Minimal 6 `NFR-*`.
   - Fokus pada usability, security, reliability, data integrity, performance, maintainability, dan deployability.
   - Jangan membuat target angka tanpa evidence atau persetujuan mahasiswa.

6. Tulis business rules.
   - Minimal 5 `BR-*`.
   - Contoh area: status transition, role capability, priority handling, close/reopen rule, history logging.

7. Tulis user stories dan acceptance criteria.
   - Minimal 10 `US-*`.
   - Setiap user story punya minimal 2 acceptance criteria.
   - User story harus trace ke `FR-*`.

8. Catat deferred topics.
   - Upload foto, email notification, Google login, QR code, AI category, inventory, vendor management masuk deferred atau out-of-scope kecuali mahasiswa memutuskan sebaliknya.

## Output

Jika skill dijalankan, buat:

- `docs/requirements/03-specification.md`
- update awal `docs/requirements/traceability.md`

## Output Structure

```markdown
# Requirements Specification

## 1. Sources Read
## 2. Review Status and Boundary
## 3. Specification Readiness Map
## 4. Functional Requirements
## 5. Non-Functional Requirements
## 6. Business Rules
## 7. User Stories
## 8. Acceptance Criteria
## 9. Deferred Requirement Topics
## 10. Open Questions Blocking Detail
## 11. Traceability Matrix
## 12. Human Review Notes
```

## Aturan

- Gunakan ID stabil.
- Requirement harus testable.
- Jangan menambah fitur di luar scope wajib tanpa alasan.
- Jangan memasukkan design atau implementation detail terlalu dini.

## Quality Check

- Minimal 12 FR, 6 NFR, 5 BR, 10 US terpenuhi.
- Setiap US punya minimal 2 AC.
- Setiap FR punya evidence.
- Open question tidak berubah menjadi requirement.
- Deferred topics terlihat jelas.

## Kondisi Gagal

Berhenti dan tanya mahasiswa jika:

- Skill 01 atau Skill 02 belum tersedia;
- requirement membutuhkan policy yang belum diputuskan;
- pengguna meminta detail yang bergantung pada asumsi tanpa review;
- sumber saling bertentangan.

## Human Review

Mahasiswa memeriksa apakah requirement sesuai scope, realistis, testable, dan cukup untuk lanjut ke prioritization.

