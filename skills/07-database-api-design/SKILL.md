---
name: 07-database-api-design
description: Use this skill to create the database and API design for the Campus Service Request and Maintenance System after architecture design is approved, without creating UI design, GitHub issues, tests, implementation code, migrations to run, or deployment.
---

# Skill 07: Database dan API Design

## Tujuan

Gunakan skill ini untuk membuat desain database dan API tingkat desain untuk Campus Service Request and Maintenance System. Output harus menjelaskan entity, field, relationship, draft migration D1, draft endpoint API, request/response example, validation/error state, dan mapping requirement-to-database/API.

Skill ini memakai architecture design yang sudah approved sebagai batas teknis. Skill ini tidak membuat UI design, GitHub issues, tests, source code implementasi, migration file yang dijalankan, atau deployment.

## Kapan Digunakan

Gunakan setelah Architecture Design selesai dan sudah direview/approved:

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
- `docs/design/01-architecture.md`
- `docs/requirements/03-specification.md`
- `docs/requirements/04-prioritization.md`
- `docs/requirements/05-validation-change.md`
- `docs/requirements/traceability.md`
- evidence architecture yang relevan di `evidence/`

## Branch dan Workflow

Ikuti workflow project:

- mulai dari `development`;
- jangan bekerja langsung di `main`;
- gunakan branch `design/database-api`;
- jika memakai worktree, gunakan folder `Final_SWE__design-database-api`;
- jangan merge ke `development` sebelum human review;
- jangan deploy.

## Langkah Kerja

1. Konfirmasi batas tugas.
   - Kerjakan database dan API design saja.
   - Jangan membuat UI design, GitHub issues, tests, source code implementasi, migration executable, atau deployment.

2. Verifikasi baseline.
   - Pastikan architecture design, requirements specification, prioritization, validation/change, traceability, dan evidence architecture tersedia.
   - Gunakan dokumen yang sudah approved sebagai authority.

3. Identifikasi data needs.
   - Ambil kebutuhan data dari FR, NFR, BR, user stories, workflow status, dan architecture decisions.
   - Tandai data yang tidak diperlukan agar tidak ikut disimpan.

4. Tentukan entity, field, dan relationship.
   - Jelaskan primary key, foreign key, required/optional field, enum/value set, timestamp, dan ownership field.
   - Sertakan alasan requirement untuk entity penting.

5. Buat draft migration D1 tingkat desain.
   - Tulis SQL sebagai draft di dokumen design, bukan sebagai file migration siap dijalankan.
   - Sertakan table, index penting, dan constraint sederhana yang cocok untuk SQLite/D1.

6. Tentukan draft endpoint API.
   - Gunakan route, method, actor, requirement basis, request body/query, response, validation, dan error state.
   - Endpoint harus mendukung required workflow: `Submitted -> Under Review -> Assigned -> In Progress -> Resolved -> Closed`.

7. Jelaskan validation dan error state.
   - Gunakan error yang konsisten untuk bad request, not found, invalid transition, forbidden actor/action, conflict, dan internal failure.
   - Jangan menentukan authentication policy baru jika belum approved; gunakan simple educational role boundary sesuai architecture.

8. Buat mapping requirement-to-database/API.
   - Mapping harus memakai requirement ID dan design ID seperti `DB-*` dan `API-*`.
   - Pastikan setiap fitur wajib punya dukungan data/API.

9. Update traceability jika relevan.
   - Tambahkan database/API design IDs untuk requirement yang sudah punya mapping.
   - Biarkan issue, code, dan test tetap `Pending` jika belum dibuat.

10. Buat evidence.
    - Catat prompt/invocation, sources used, AI output, AI handling notes, human review status, dan final output.

## Output

Jika skill dijalankan, buat:

- `docs/design/02-database-api.md`
- update `docs/requirements/traceability.md` jika relevan
- `evidence/design-database-api-ai-evidence.md`

## Output Structure

```markdown
# Database and API Design

## 1. Sources Read
## 2. Review Status and Boundary
## 3. Database Design Goals
## 4. Entity Overview
## 5. Table Design
## 6. Relationship and Constraint Notes
## 7. D1 Migration Draft
## 8. API Design Goals
## 9. Endpoint Catalog
## 10. Request and Response Examples
## 11. Validation and Error States
## 12. Requirement-to-Database/API Mapping
## 13. Traceability Update Notes
## 14. Risks, Constraints, and Open Design Questions
## 15. Human Review Notes
```

## Aturan

- Pilih model data paling sederhana yang memenuhi requirements approved.
- Gunakan Cloudflare D1/SQLite sebagai baseline database.
- Gunakan Cloudflare Worker sebagai API boundary.
- Gunakan ID requirement untuk setiap table dan endpoint penting.
- Gunakan design ID yang jelas, misalnya `DB-01`, `API-01`, dan `VAL-01`.
- Jangan menyimpan data yang tidak diperlukan oleh requirement.
- Jangan menambahkan optional features sebagai requirement atau design wajib.
- Jangan membuat UI design, wireframe, screen list final, atau navigation design.
- Jangan membuat GitHub issues, tests, source code implementasi, migration file executable, atau Cloudflare deployment.
- Jangan menjalankan migration lokal atau remote.
- Jika ada keputusan yang memerlukan policy baru, catat sebagai open design question atau student decision needed.

## Quality Check

- Tabel mendukung alur status penuh.
- Tabel mendukung komentar/catatan dan status history.
- Relationship cukup jelas untuk reporter, administrator, technician, dan facility manager.
- Draft migration sesuai batasan D1/SQLite dan tetap sederhana.
- Endpoint mendukung fitur wajib tanpa menambah fitur optional.
- Validasi dan error state jelas.
- Setiap endpoint penting memiliki requirement basis.
- Requirement-to-database/API mapping lengkap untuk fitur wajib.
- Traceability design IDs ditambahkan hanya untuk database/API design.
- Tidak ada UI/issues/tests/code/deployment yang dibuat.

## Kondisi Gagal

Berhenti dan tanya mahasiswa jika:

- architecture design belum tersedia atau belum approved;
- branch aktif adalah `main`;
- ada perubahan tak dikenal yang konflik dengan tahap design;
- database/API design membutuhkan layanan berbayar atau optional feature;
- diperlukan keputusan authentication, role policy, retention policy, notification behavior, retention data, atau measurable NFR target yang belum approved;
- user meminta lanjut ke UI design, issues, tests, code, migration execution, atau deployment sebelum database/API design review selesai.

## Human Review

Mahasiswa memeriksa:

- apakah database cukup sederhana untuk project kelas;
- apakah table dan relationship memenuhi requirements approved;
- apakah endpoint mendukung workflow utama;
- apakah validation/error state realistis;
- apakah scope tidak melebar ke optional features;
- apakah dokumen siap menjadi input untuk Skill 08 UI Design dan tahap implementation berikutnya.
