---
name: 05-validation-change
description: Use this skill to validate reviewed requirements, user stories, acceptance criteria, and priorities for the Campus Service Request and Maintenance System, then document change requests without silently approving new scope.
---

# Skill 05: Validation dan Change

## Tujuan

Gunakan skill ini setelah Skill 03 dan Skill 04 memiliki baseline yang sudah direview.

Skill ini fokus pada:

- validasi requirement, user story, acceptance criteria, dan prioritas;
- pengecekan traceability, ambiguity, consistency, readiness, dan testability;
- use-case view tingkat tinggi bila diperlukan;
- proposed change request dan impact analysis;
- keputusan mahasiswa yang masih dibutuhkan.

Skill ini tidak menambah requirement baru, menyetujui deferred topic, membuat desain final, issue, test, atau kode.

## Kapan Digunakan

Gunakan setelah:

- `docs/requirements/03-specification.md`
- `docs/requirements/04-prioritization.md`
- `docs/requirements/traceability.md`

tersedia dan sudah direview.

## Input

Baca file berikut:

- `AI_Assisted_Campus_Service_Project.md`
- `README.md`
- `CASE.md`
- `docs/requirements/01-inception-stakeholder.md`
- `docs/requirements/02-elicitation.md`
- `docs/requirements/03-specification.md`
- `docs/requirements/04-prioritization.md`
- `docs/requirements/traceability.md`
- file review di `evidence/`, jika tersedia.

## Validation Scope Rules

| Source item | Handling |
|---|---|
| `FR-*` | Validasi evidence, clarity, testability, priority, dan traceability. |
| `NFR-*` | Validasi sebagai quality concern; target angka harus punya evidence. |
| `BR-*` | Validasi konsistensi dengan workflow dan status. |
| `US-*` | Validasi mapping ke FR dan AC. |
| `AC-*` | Validasi apakah dapat diuji. |
| `DR-*` | Treat as deferred; jangan validasi sebagai requirement aktif. |
| `OQ-*` | Treat as gap; jangan dijawab oleh AI. |
| `ASM-*` | Tetap assumption-labelled. |

## Validation Method

Gunakan validation matrix:

| Field | Content |
|---|---|
| Validation ID | `VAL-*` |
| Reviewed item | `FR-*`, `NFR-*`, `BR-*`, `US-*`, `AC-*`, atau priority item |
| Check type | `Traceability`, `Consistency`, `Ambiguity`, `Readiness`, `Testability`, `Priority-risk alignment` |
| Result | `Pass`, `Partial`, `Blocked`, `Risk`, atau `Not testable yet` |
| Evidence basis | Source IDs dan requirement/story IDs |
| Finding | Temuan validasi |
| Required action | `No action`, `Clarify`, `Defer`, `Student approval needed`, atau `Change request candidate` |

Gunakan `Pass` hanya jika item cukup jelas dan dapat diuji pada level detail saat ini.

## Change Request Rules

Change request mencatat usulan perubahan, bukan otomatis menyetujui perubahan.

Gunakan ID `CR-*`. Setiap change request harus memuat:

- summary;
- source of request;
- baseline affected;
- proposed change type;
- evidence status;
- impact analysis;
- recommendation;
- approval status.

Approved change harus memperbarui baseline requirement terlebih dahulu sebelum masuk design atau implementation.

## Langkah Kerja

1. Konfirmasi batas tugas.
   - Kerjakan validation dan change management saja.
   - Jangan membuat issue, test plan, desain, atau kode.

2. Verifikasi baseline.
   - Pastikan specification, prioritization, dan traceability tersedia.
   - Gunakan reviewed baseline sebagai authority.

3. Build validation inventory.
   - Extract FR, NFR, BR, US, AC, priority, deferred topics, assumptions, dan open questions.

4. Validasi traceability dan consistency.
   - Pastikan setiap US map ke FR.
   - Pastikan setiap AC bisa diuji.
   - Pastikan priority tidak bertentangan dengan readiness.

5. Validasi testability.
   - Mark item yang belum bisa diuji karena policy atau detail belum jelas.
   - Jangan menulis test detail yang bergantung pada open question.

6. Draft change request.
   - Minimal satu `CR-*` jika ada usulan perubahan scope atau clarification penting.
   - Catat impact ke requirement, story, priority, design, dan test.

## Output

Jika skill dijalankan, buat:

- `docs/requirements/05-validation-change.md`
- update `docs/requirements/traceability.md` jika perlu

## Output Structure

```markdown
# Validation dan Change

## 1. Sources Read
## 2. Review Status and Boundary
## 3. Validation Method
## 4. Validation Inventory
## 5. Validation Matrix
## 6. Readiness and Testability Risks
## 7. Traceability and Consistency Findings
## 8. Change Request Candidates
## 9. Impact Analysis
## 10. Student Decisions Needed
## 11. Human Review Notes
```

## Aturan

- Jangan membuat requirement baru saat validasi.
- Jangan menjawab open question.
- Jangan treat deferred topic sebagai scope aktif.
- Change request harus proposed sampai disetujui.

## Quality Check

- Semua requirement penting divalidasi.
- Traceability gap terlihat.
- Ambiguity dan risk dicatat.
- Minimal satu change request dapat dibuat jika relevan.
- Tidak ada desain atau kode.

## Kondisi Gagal

Berhenti dan tanya mahasiswa jika:

- baseline specification atau prioritization belum ada;
- validasi membutuhkan policy baru;
- change request akan mengubah scope tanpa approval;
- user meminta lanjut ke design sebelum validation selesai.

## Human Review

Mahasiswa memeriksa hasil validasi dan memutuskan apakah change request diterima, direvisi, ditolak, atau ditunda.

