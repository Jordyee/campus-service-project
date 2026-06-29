# GitHub Workflow Jordy

## Tujuan

Gunakan workflow ini setiap kali agent baru, chat baru, atau AI tool baru masuk ke project. Tujuannya menjaga cara kerja GitHub tetap konsisten: `main` hanya untuk hasil final, `development` untuk integrasi aktif, dan topic branch untuk setiap tahap kerja.

## Kapan Digunakan

Gunakan sebelum:

- mulai pekerjaan baru;
- membuat branch;
- membuat worktree;
- membuka pull request;
- merge ke branch lain;
- melanjutkan pekerjaan dari chat atau agent lain.

## Input

Baca file berikut:

- `AGENTS.md`
- `README.md`
- `CASE.md`
- `AI_Assisted_Campus_Service_Project.md`
- dokumen tahap terkait di `docs/`
- skill tahap terkait di `skills/`

Jalankan pengecekan:

```powershell
git status --short --branch
git branch --list
git remote -v
```

## Branch Model

`main`:

- hanya untuk hasil final;
- tidak boleh dipakai untuk eksperimen;
- tidak boleh disentuh tanpa persetujuan mahasiswa.

`development`:

- branch integrasi utama selama pengerjaan;
- semua topic branch dibuat dari sini;
- hasil tahap yang sudah direview dapat digabung ke sini.

Topic branch:

- `requirements/inception`
- `requirements/elicitation`
- `requirements/specification`
- `requirements/prioritization`
- `requirements/validation-change`
- `design/architecture`
- `design/database-api`
- `design/ui`
- `planning/issues`
- `implementation/<issue-id-or-feature>`
- `testing/<test-area>`
- `deployment/cloudflare`

Catatan penting: jangan membuat branch `development/requirements` jika branch `development` sudah ada. Git akan menganggapnya konflik path ref.

## Worktree Model

Gunakan worktree hanya jika pekerjaan berjalan paralel atau agent berbeda perlu area kerja terpisah.

Contoh nama folder worktree:

- `Final_SWE__requirements-inception`
- `Final_SWE__design-architecture`
- `Final_SWE__implementation-fr-01`

Sebelum membuat worktree:

```powershell
git status --short --branch
git worktree list
```

Contoh pembuatan topic branch dan worktree:

```powershell
git checkout development
git pull
git checkout -b requirements/inception
```

Atau untuk worktree terpisah:

```powershell
git worktree add ..\Final_SWE__requirements-inception -b requirements/inception development
```

Jangan menghapus branch atau worktree tanpa persetujuan mahasiswa.

## Stage Workflow

1. Requirements:
   - `requirements/inception`
   - `requirements/elicitation`
   - `requirements/specification`
   - `requirements/prioritization`
   - `requirements/validation-change`

2. Design:
   - `design/architecture`
   - `design/database-api`
   - `design/ui`

3. Planning:
   - `planning/issues`

4. Implementation:
   - `implementation/<issue-id-or-feature>`

5. Testing:
   - `testing/unit`
   - `testing/integration`
   - `testing/acceptance`

6. Deployment:
   - `deployment/cloudflare`

## Pull Request Rules

Setiap PR harus menjelaskan:

- issue atau requirement terkait;
- file yang diubah;
- test atau check yang dijalankan;
- AI skill yang digunakan;
- kesalahan AI yang ditemukan;
- perbaikan manusia;
- status human review.

Gunakan `.github/pull_request_template.md`.

## Merge Rules

Topic branch boleh merge ke `development` jika:

- output tahap selesai;
- human review selesai;
- traceability diperbarui jika relevan;
- test atau check relevan sudah dijalankan;
- tidak ada perubahan scope diam-diam.

`development` boleh merge ke `main` hanya jika:

- milestone final sudah disetujui mahasiswa;
- test utama lulus;
- dokumentasi dan evidence lengkap;
- deployment evidence siap jika milestone mencakup deployment.

## Agent Handoff Rules

Saat berpindah chat atau agent:

1. Baca `AGENTS.md`.
2. Cek branch aktif.
3. Cek status kerja.
4. Baca dokumen tahap terkait saja, bukan seluruh repo.
5. Lanjut dari skill tahap aktif.
6. Jangan mengulang analisis besar jika `AGENTS.md` dan dokumen tahap sudah cukup.

## Quality Check

Sebelum selesai:

- branch aktif sesuai tahap;
- `main` tidak berubah;
- perubahan sudah jelas scope-nya;
- file dokumentasi tahap terkait diperbarui;
- evidence tercatat jika ada output AI;
- status Git bersih atau sisa perubahan dijelaskan.

## Kondisi Gagal

Berhenti dan tanya mahasiswa jika:

- branch aktif adalah `main` dan pekerjaan bukan finalisasi;
- ada perubahan tak dikenal yang konflik dengan tugas;
- merge ke `main` diminta tanpa review final;
- worktree perlu dihapus;
- scope branch tidak jelas;
- perubahan lintas tahap terlalu besar untuk satu branch.

