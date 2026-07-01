---
name: 08-ui-design
description: Use this skill to create the UI design for the Campus Service Request and Maintenance System after database/API design is approved, without creating GitHub issues, tests, React/TypeScript implementation, backend/API implementation, migrations, or deployment.
---

# Skill 08: UI Design

## Tujuan

Gunakan skill ini untuk membuat desain UI tingkat desain untuk Campus Service Request and Maintenance System. Output harus menjelaskan screen list, navigation flow, role-based views, form fields, table/list behavior, empty/error/loading states, UI action permissions, wireframe tekstual sederhana, dan mapping requirement-to-UI.

Skill ini memakai requirements, architecture design, dan database/API design yang sudah approved sebagai batas desain. Skill ini tidak membuat GitHub issues, tests, source code React/TypeScript, backend/API implementation, migration, atau deployment.

## Kapan Digunakan

Gunakan setelah Database dan API Design selesai dan sudah direview/approved:

- `docs/design/02-database-api.md`
- `docs/design/01-architecture.md`
- `docs/requirements/03-specification.md`
- `docs/requirements/04-prioritization.md`
- `docs/requirements/05-validation-change.md`
- `docs/requirements/traceability.md`

## Input

Baca file berikut:

- `AGENTS.md`
- `skills/jordy-workflows/github-workflow-jordy.md`
- `AI_Assisted_Campus_Service_Project.md`
- `README.md`
- `CASE.md`
- `docs/requirements/03-specification.md`
- `docs/requirements/04-prioritization.md`
- `docs/requirements/05-validation-change.md`
- `docs/requirements/traceability.md`
- `docs/design/01-architecture.md`
- `docs/design/02-database-api.md`
- evidence architecture dan database/API yang relevan di `evidence/`

## Branch dan Workflow

Ikuti workflow project:

- mulai dari `development`;
- jangan bekerja langsung di `main`;
- gunakan branch `design/ui`;
- jika memakai worktree, gunakan folder `Final_SWE__design-ui`;
- jangan merge ke `development` sebelum human review;
- jangan deploy.

## Langkah Kerja

1. Konfirmasi batas tugas.
   - Kerjakan UI design saja.
   - Jangan membuat GitHub issues, tests, source code React/TypeScript, backend/API implementation, migration, atau deployment.

2. Verifikasi baseline.
   - Pastikan requirements specification, prioritization, validation/change, traceability, architecture design, database/API design, dan evidence terkait tersedia.
   - Gunakan dokumen yang sudah approved sebagai authority.

3. Identifikasi aktor dan tujuan layar.
   - Reporter membuat laporan, melihat list/detail, melihat status/history, dan menambah komentar.
   - Administrator review laporan, set category/priority, assign technician, close/reopen, dan menambah notes.
   - Technician melihat assigned tasks, accept work, update status, dan mark resolved.
   - Facility Manager melihat dashboard sederhana.

4. Tentukan information architecture dan navigation flow.
   - Jelaskan entry point, menu per role, hubungan list-detail-form, dan alur kembali.
   - Gunakan simple educational role boundary sesuai requirements dan architecture.

5. Buat screen catalog.
   - Setiap screen punya ID `UI-*`, aktor, tujuan, requirement basis, data/API reference, state utama, dan aksi yang tersedia.

6. Rancang form, table, dan detail behavior.
   - Jelaskan field, validasi, filter/search, sorting sederhana jika diperlukan, status display, status history, comments/notes, dan action confirmation.

7. Rancang UI states.
   - Sertakan loading, empty, error, forbidden, invalid transition, validation failure, success feedback, dan not found state yang relevan.

8. Rancang action permissions per role.
   - Jelaskan actor mana yang boleh melihat atau menjalankan aksi UI tertentu.
   - Pastikan lifecycle `Submitted -> Under Review -> Assigned -> In Progress -> Resolved -> Closed` terlihat di UI.
   - Pastikan reopen kembali ke `Under Review` sesuai CR-001.
   - Pastikan comments/notes append-only sesuai CR-002.
   - Pastikan role boundary tetap simple educational role boundary sesuai CR-003.

9. Buat wireframe tekstual sederhana.
   - Gunakan teks, layout block, dan label elemen.
   - Jangan membuat desain visual final atau kode UI.

10. Buat mapping requirement-to-UI.
    - Mapping harus memakai requirement ID dan UI design ID.
    - Pastikan setiap fitur wajib punya dukungan layar, komponen, atau aksi UI.

11. Update traceability jika relevan.
    - Tambahkan UI design IDs untuk requirement yang sudah punya mapping.
    - Biarkan issue, code, dan test tetap `Pending` jika belum dibuat.

12. Buat evidence.
    - Catat prompt/invocation, sources used, AI output, AI handling notes, human review status, dan final output.

## Output

Jika skill dijalankan, buat:

- `docs/design/03-ui.md`
- update `docs/requirements/traceability.md` jika relevan
- `evidence/design-ui-ai-evidence.md`

## Output Structure

```markdown
# UI Design

## 1. Sources Read
## 2. Review Status and Boundary
## 3. UI Design Goals
## 4. Actors and Role-Based Entry Points
## 5. Navigation Flow
## 6. Screen Catalog
## 7. Forms and Validation
## 8. Tables, Lists, Search, and Filters
## 9. Detail Views, Status History, and Comments/Notes
## 10. UI Action Permissions
## 11. Loading, Empty, Error, and Success States
## 12. Textual Wireframes
## 13. Requirement-to-UI Mapping
## 14. Traceability Update Notes
## 15. Risks, Constraints, and Open Design Questions
## 16. Human Review Notes
```

## Aturan

- Pilih UI paling sederhana yang memenuhi requirements approved.
- Gunakan React with TypeScript sebagai baseline frontend, tetapi jangan membuat source code implementasi.
- Gunakan database/API design sebagai referensi data dan endpoint, tetapi jangan mengubah desain database/API kecuali mencatat open question.
- Gunakan ID requirement untuk setiap screen dan aksi penting.
- Gunakan design ID yang jelas, misalnya `UI-01`, `UI-ACT-01`, dan `UI-STATE-01`.
- Desain harus mendukung workflow `Submitted -> Under Review -> Assigned -> In Progress -> Resolved -> Closed`.
- Reopen harus kembali ke `Under Review` sesuai CR-001.
- Comments/notes harus append-only sesuai CR-002.
- Role boundary harus tetap simple educational role boundary sesuai CR-003.
- Jangan menambahkan optional features sebagai requirement atau design wajib.
- Jangan membuat GitHub issues, tests, source code React/TypeScript, backend/API implementation, migration, atau Cloudflare deployment.
- Jangan menambahkan upload foto, email notification, Google login, room QR code, AI categorization, spare-part inventory, atau vendor management.
- Jika ada keputusan UI yang membutuhkan policy baru, catat sebagai open design question atau student decision needed.

## Quality Check

- Setiap aktor punya entry point dan alur UI yang jelas.
- Setiap fitur wajib dapat ditemukan di screen, form, table/list, detail view, atau aksi UI.
- Form fields dan validation sesuai requirements dan database/API design.
- Table/list mendukung search dan filter yang diwajibkan.
- Detail view menampilkan status, status history, comments/notes, dan aksi role-based yang relevan.
- UI action permissions konsisten dengan actor, workflow status, CR-001, CR-002, dan CR-003.
- Empty, loading, error, forbidden, validation, success, dan not found state dijelaskan untuk layar penting.
- Requirement-to-UI mapping lengkap untuk fitur wajib.
- Traceability design IDs ditambahkan hanya untuk UI design.
- Tidak ada issues/tests/code/backend/migration/deployment yang dibuat.

## Kondisi Gagal

Berhenti dan tanya mahasiswa jika:

- database/API design belum tersedia atau belum approved;
- branch aktif adalah `main`;
- ada perubahan tak dikenal yang konflik dengan tahap design;
- UI design membutuhkan layanan berbayar atau optional feature;
- diperlukan keputusan authentication, role policy, notification behavior, measurable NFR target, atau desain visual final yang belum approved;
- user meminta lanjut ke issues, tests, code, migration, backend/API implementation, atau deployment sebelum UI design review selesai.

## Human Review

Mahasiswa memeriksa:

- apakah UI flow dapat dijelaskan dari report creation sampai closed/reopen;
- apakah setiap aktor hanya melihat aksi yang sesuai role;
- apakah screen list dan wireframe cukup sederhana untuk project kelas;
- apakah form, list, detail, status history, dan comments/notes memenuhi requirements approved;
- apakah scope tidak melebar ke optional features;
- apakah dokumen siap menjadi input untuk issue planning dan implementation berikutnya.
