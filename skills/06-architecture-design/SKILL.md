---
name: 06-architecture-design
description: Use this skill to create the high-level architecture design for the Campus Service Request and Maintenance System after requirements validation/change is approved, without creating database/API detail, UI wireframes, issues, tests, code, or deployment.
---

# Skill 06: Architecture Design

## Tujuan

Gunakan skill ini untuk membuat desain arsitektur tingkat tinggi yang menjelaskan bagian utama sistem, tanggung jawab setiap bagian, alur data utama, batas integrasi, risiko teknis, dan keputusan arsitektur awal.

Skill ini menjembatani requirements yang sudah divalidasi menuju tahap design berikutnya. Skill ini tidak membuat desain database detail, desain endpoint API detail, UI flow/wireframe, GitHub issues, test, code, atau deployment.

## Kapan Digunakan

Gunakan setelah Requirements tahap 05 selesai dan sudah direview/approved:

- `docs/requirements/01-inception-stakeholder.md`
- `docs/requirements/02-elicitation.md`
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
- evidence requirements yang relevan di `evidence/`

## Branch dan Workflow

Ikuti workflow project:

- mulai dari `development`;
- jangan bekerja langsung di `main`;
- gunakan branch `design/architecture`;
- jika memakai worktree, gunakan folder `Final_SWE__design-architecture`;
- jangan merge ke `development` sebelum human review;
- jangan deploy.

## Langkah Kerja

1. Konfirmasi batas tugas.
   - Kerjakan architecture design saja.
   - Jangan membuat database/API design detail, UI design, GitHub issues, tests, code, atau deployment.

2. Verifikasi baseline.
   - Pastikan requirements specification, prioritization, validation/change, traceability, dan evidence sudah tersedia.
   - Gunakan requirements yang sudah approved sebagai authority.

3. Identifikasi architecture drivers.
   - Aktor, workflow, FR/NFR/BR utama, constraints Cloudflare Workers/D1, deferred topics, dan approved change requests.

4. Tentukan komponen tingkat tinggi.
   - Frontend React/TypeScript.
   - Cloudflare Worker sebagai backend/API boundary.
   - Cloudflare D1 sebagai persistence layer.
   - Simple educational role boundary.
   - Evidence/traceability sebagai project-support concern.

5. Jelaskan tanggung jawab komponen.
   - Gunakan bahasa sederhana dan traceable ke requirement.
   - Jangan menentukan tabel database atau endpoint API detail; cukup sebut kebutuhan data/API pada level arsitektur.

6. Jelaskan data flow tingkat tinggi.
   - Create report.
   - Review/category/priority/assignment.
   - Technician progress and resolution.
   - Comments/notes and status history.
   - Close/reopen.
   - Dashboard summary.

7. Buat architecture decisions.
   - Gunakan ID `ADR-*` atau `ARCH-DEC-*`.
   - Setiap keputusan harus punya rationale, requirement basis, tradeoff, dan consequence.

8. Catat risiko, batasan, dan open design questions.
   - Jangan menjawab detail yang seharusnya menjadi database/API design atau UI design.
   - Tandai deferred optional features tetap out of scope.

9. Update traceability jika relevan.
   - Tambahkan design IDs untuk requirement yang sudah punya mapping arsitektur.
   - Biarkan issue, code, dan test tetap `Pending`.

10. Buat evidence.
   - Catat prompt/invocation, sources used, AI output, AI handling notes, human review status, dan final output.

## Output

Jika skill dijalankan, buat:

- `docs/design/01-architecture.md`
- update `docs/requirements/traceability.md` jika relevan
- `evidence/design-architecture-ai-evidence.md`

## Output Structure

```markdown
# Architecture Design

## 1. Sources Read
## 2. Review Status and Boundary
## 3. Architecture Goals and Drivers
## 4. System Context
## 5. High-Level Architecture
## 6. Component Responsibilities
## 7. Data Flow Overview
## 8. Architecture Decisions
## 9. Requirement-to-Architecture Mapping
## 10. Risks, Constraints, and Open Design Questions
## 11. Traceability Update Notes
## 12. Human Review Notes
```

## Aturan

- Pilih arsitektur paling sederhana yang memenuhi requirements approved.
- Gunakan React with TypeScript, Cloudflare Worker, dan Cloudflare D1 sesuai baseline project.
- Gunakan simple educational role boundary; jangan menambahkan Google login.
- Jangan menambahkan optional features sebagai requirement atau design wajib.
- Jangan membuat desain database detail seperti tabel, kolom, indeks, migration, atau ERD final.
- Jangan membuat desain endpoint API detail seperti route final, request body final, atau response schema final.
- Jangan membuat UI design, wireframe, screen list final, atau navigation design.
- Jangan membuat GitHub issues, tests, source code, deployment config, atau Cloudflare deployment.
- Jika ada keputusan yang memerlukan policy baru, catat sebagai open design question atau student decision needed.

## Quality Check

- Architecture bisa dijelaskan secara lisan dari report creation sampai dashboard.
- Setiap komponen utama punya tanggung jawab yang jelas.
- Setiap keputusan arsitektur punya basis requirement atau constraint.
- Deferred topics tetap deferred.
- Approved change requests dari validation/change tercermin.
- Traceability design IDs ditambahkan hanya pada level arsitektur.
- Tidak ada database/API/UI/test/code/deployment detail yang dibuat.

## Kondisi Gagal

Berhenti dan tanya mahasiswa jika:

- requirements validation/change belum approved;
- branch aktif adalah `main`;
- ada perubahan tak dikenal yang konflik dengan tahap design;
- arsitektur membutuhkan layanan berbayar atau optional feature;
- diperlukan keputusan authentication, role policy, retention policy, notification behavior, atau measurable NFR target yang belum approved;
- user meminta lanjut ke database/API design, UI design, issues, tests, code, atau deployment sebelum architecture review selesai.

## Human Review

Mahasiswa memeriksa:

- apakah arsitektur cukup sederhana untuk project kelas;
- apakah arsitektur memenuhi requirements approved;
- apakah scope tidak melebar ke optional features;
- apakah risiko dan open questions sudah jujur;
- apakah dokumen siap menjadi input untuk Skill 07 Database/API Design.
