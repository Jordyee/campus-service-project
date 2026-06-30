---
name: 09-issue-planning
description: Use this skill to turn approved requirements and design documents into small, traceable GitHub Issues for the Campus Service Request and Maintenance System, without creating implementation code, tests, migrations, or deployment changes.
---

# Skill 09: Issue Planning

## Tujuan

Gunakan skill ini untuk mengubah requirements dan design yang sudah approved menjadi GitHub Issues yang kecil, berurutan, dan traceable. Setiap issue harus cukup jelas untuk dikerjakan satu per satu pada tahap implementation atau testing berikutnya.

Skill ini menjembatani tahap design menuju implementation. Skill ini tidak membuat source code, automated tests, migrations, backend/API implementation, React/TypeScript implementation, atau deployment.

## Kapan Digunakan

Gunakan setelah UI Design selesai dan sudah direview/approved:

- `docs/requirements/03-specification.md`
- `docs/requirements/04-prioritization.md`
- `docs/requirements/05-validation-change.md`
- `docs/requirements/traceability.md`
- `docs/design/01-architecture.md`
- `docs/design/02-database-api.md`
- `docs/design/03-ui.md`

## Input Wajib

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
- `docs/design/03-ui.md`
- evidence design yang relevan di `evidence/`

Jalankan pengecekan GitHub/repo yang relevan:

```powershell
git status --short --branch
git branch --list
git remote -v
gh auth status
gh issue list --state open
```

## Branch dan Workflow

Ikuti workflow project:

- mulai dari `development`;
- jangan bekerja langsung di `main`;
- gunakan branch `planning/issues`;
- jika merapikan skill ini dulu, gunakan branch `planning/issues-skill`;
- jika memakai worktree, gunakan folder `Final_SWE__planning-issues`;
- buat GitHub Issues langsung di repository ketika tahap issue planning dijalankan;
- jangan merge ke `development` sebelum human review;
- jangan deploy.

## Langkah Kerja

1. Konfirmasi batas tugas.
   - Kerjakan issue planning saja.
   - Jangan membuat implementation code, automated tests, migration file, backend/API implementation, React/TypeScript implementation, atau deployment.

2. Verifikasi baseline.
   - Pastikan requirements specification, prioritization, validation/change, traceability, architecture design, database/API design, UI design, dan evidence terkait tersedia.
   - Gunakan dokumen yang sudah approved sebagai authority.
   - Pastikan current branch bukan `main`.

3. Inventarisasi coverage wajib.
   - Petakan FR, NFR, BR, user stories, acceptance criteria, change requests, architecture IDs, database/API IDs, dan UI IDs.
   - Tandai requirement atau design item yang belum punya rencana issue.

4. Susun issue kecil dan berurutan.
   - Pecah pekerjaan menjadi issue yang bisa diselesaikan satu per satu.
   - Urutkan dari foundation sampai dashboard.
   - Hindari issue yang terlalu besar atau hanya horizontal layer tanpa hasil yang bisa diverifikasi.

5. Tentukan dependency antar issue.
   - Issue foundation boleh menjadi blocker.
   - Issue workflow lanjutan harus mereferensikan issue yang perlu selesai lebih dulu.
   - Gunakan urutan dependency agar issue bisa dikerjakan oleh agent atau mahasiswa tanpa kebingungan.

6. Tulis body issue.
   - Sertakan tujuan, scope, requirement/design references, acceptance checks, testing notes, dependencies, dan out-of-scope notes.
   - Setiap issue harus traceable ke FR/US/AC/design ID yang relevan.

7. Buat GitHub Issues.
   - Gunakan GitHub CLI atau GitHub tool yang tersedia.
   - Buat minimal 10 issues.
   - Catat issue number dan URL yang berhasil dibuat.
   - Jangan membuat duplicate issue jika issue serupa sudah ada; gunakan issue yang ada dan catat alasannya.

8. Update traceability.
   - Tambahkan issue IDs ke `docs/requirements/traceability.md`.
   - Biarkan code dan test tetap `Pending` jika belum ada tahap implementation/testing.

9. Buat ringkasan planning jika diperlukan.
   - Gunakan `docs/planning/issue-plan.md` atau `docs/requirements/issue-planning.md`.
   - Isinya cukup urutan issue, dependency, dan mapping utama; jangan membuat dokumen berlebihan.

10. Buat evidence.
    - Catat prompt/invocation, sources used, issue planning output, created issue IDs, AI handling notes, human review status, dan final output.

## Output

Jika skill dijalankan, buat atau update:

- minimal 10 GitHub Issues di repository GitHub project
- update `docs/requirements/traceability.md`
- `evidence/planning-issues-ai-evidence.md`
- optional `docs/planning/issue-plan.md` atau `docs/requirements/issue-planning.md`

## Output Structure

GitHub Issue body:

```markdown
## What to build

## Requirement and Design References

## Acceptance Checks

- [ ] ...

## Testing Notes

## Dependencies

## Out of Scope
```

Optional issue planning document:

```markdown
# Issue Planning

## 1. Sources Read
## 2. Review Status and Boundary
## 3. Issue Planning Goals
## 4. Issue Sequence
## 5. Dependency Notes
## 6. Requirement-to-Issue Mapping
## 7. Design-to-Issue Mapping
## 8. Traceability Update Notes
## 9. Risks and Open Questions
## 10. Human Review Notes
```

Evidence document:

```markdown
# Planning Issues AI Evidence

## 1. Prompt / Invocation
## 2. Sources Used
## 3. AI Draft Output
## 4. Human Review Status
## 5. AI Handling Notes
## 6. Final Output
```

## Aturan Scope

- Buat minimal 10 GitHub Issues.
- Issue harus traceable ke requirement ID, user story/acceptance criteria ID, dan design ID yang relevan.
- Issue harus cukup kecil untuk dikerjakan satu per satu.
- Setiap issue harus punya acceptance checks atau testing notes.
- Urutkan issue secara logis dari foundation sampai dashboard.
- Cakup report creation, report list/search/filter, report detail, comments/notes append-only, status history, admin review/category/priority, technician assignment, technician progress/resolved flow, close/reopen flow, dashboard facility manager, simple role boundary, dan planning test/traceability jika perlu.
- Reopen harus kembali ke `Under Review` sesuai CR-001.
- Comments/notes harus append-only sesuai CR-002.
- Role boundary harus tetap simple educational role boundary sesuai CR-003.
- Jangan menambahkan optional features sebagai issue wajib.
- Jangan menambahkan upload foto, email notification, Google login, room QR code, AI categorization, spare-part inventory, atau vendor management.
- Jangan membuat source code, tests, migration, backend/API implementation, React/TypeScript implementation, Cloudflare configuration changes, atau deployment.
- Jangan menutup, merge, atau mengubah branch utama tanpa persetujuan mahasiswa.

## Quality Check

- Jumlah GitHub Issues minimal 10.
- Issue dibuat langsung di GitHub, bukan hanya draft manual.
- Setiap issue punya title, scope, requirement/design references, acceptance checks/testing notes, dependency, dan out-of-scope note.
- Urutan issue mendukung pengerjaan bertahap dari foundation sampai dashboard.
- Tidak ada issue yang diam-diam menambahkan optional feature.
- Traceability terisi dengan issue IDs yang benar.
- Evidence mencatat sumber, output AI, final output, dan status human review.
- Dokumen planning tambahan singkat dan tidak menggandakan seluruh requirement/design.
- Tidak ada source code, tests, migrations, atau deployment yang dibuat.

## Kondisi Gagal

Berhenti dan tanya mahasiswa jika:

- UI design belum tersedia atau belum approved;
- branch aktif adalah `main`;
- GitHub CLI/tool tidak authenticated dan issue tidak bisa dibuat;
- GitHub Issues yang sudah ada konflik atau berpotensi duplicate dengan rencana baru;
- requirements atau design saling bertentangan dan mempengaruhi issue scope;
- issue planning membutuhkan keputusan scope baru, role policy baru, auth policy baru, measurable NFR target baru, atau optional feature;
- user meminta implementation, tests, migration, backend/API implementation, React/TypeScript implementation, atau deployment sebelum issue planning direview.

## Human Review Checklist

Mahasiswa memeriksa:

- apakah semua fitur wajib punya issue;
- apakah issue terlalu besar, terlalu kecil, atau dependency-nya keliru;
- apakah mapping FR/US/AC/design ID sudah benar;
- apakah acceptance checks dan testing notes cukup jelas untuk tahap berikutnya;
- apakah CR-001, CR-002, dan CR-003 tercermin;
- apakah optional features tetap out of scope;
- apakah traceability dan evidence sudah cukup untuk penilaian;
- apakah issue list siap menjadi input tahap implementation dan testing.
