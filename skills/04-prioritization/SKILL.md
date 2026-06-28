---
name: 04-prioritization
description: Use this skill to prioritise reviewed requirements and user stories for the Campus Service Request and Maintenance System using MoSCoW, value, risk, and readiness.
---

# Skill 04: Prioritization

## Tujuan

Gunakan skill ini setelah Skill 03 menghasilkan requirements specification yang sudah direview.

Skill ini fokus pada:

- prioritas requirement dan user story;
- MVP boundary;
- value-risk reasoning;
- readiness risk;
- konflik atau keputusan yang butuh review manusia.

Skill ini tidak membuat requirement baru, desain, issue, test, change request, atau kode.

## Kapan Digunakan

Gunakan setelah:

- `docs/requirements/03-specification.md`
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
- `docs/requirements/traceability.md`
- file review di `evidence/`, jika tersedia.

## Evidence and Readiness Rules

Prioritas tidak boleh menaikkan kualitas evidence.

| Item status | Handling |
|---|---|
| Supported | Boleh diprioritaskan. |
| Partial | Boleh diprioritaskan dengan risk note. |
| Assumption-labelled | Boleh masuk hanya jika status asumsi terlihat. |
| Deferred | Jangan jadikan approved requirement. |
| Open question | Jangan ubah menjadi story, priority, atau acceptance detail. |

## Prioritization Method

Gunakan metode sederhana:

1. MoSCoW:
   - `Must`: fitur wajib dan constraint tugas.
   - `Should`: fitur penting tetapi tidak wajib untuk MVP pertama.
   - `Could`: berguna tetapi rendah urgensi.
   - `Won't for now`: tidak wajib, deferred, atau out-of-scope.
2. Value:
   - `High`, `Medium`, atau `Low`.
3. Risk/readiness:
   - `High`, `Medium`, atau `Low`.
4. Rationale:
   - Harus mengutip requirement/user story dan evidence.

Jangan gunakan numeric scoring kecuali diminta mahasiswa.

## Langkah Kerja

1. Konfirmasi batas tugas.
   - Kerjakan prioritization saja.
   - Jangan membuat requirement baru atau implementation tasks.

2. Verifikasi prerequisite.
   - Pastikan specification tersedia dan sudah direview.
   - Gunakan `FR-*`, `NFR-*`, `BR-*`, `US-*`, dan `AC-*` yang sudah ada.

3. Buat priority inventory.
   - Extract semua FR, NFR, BR, US.
   - Pisahkan deferred topics.

4. Tentukan MVP.
   - MVP harus cukup untuk alur dasar: create report, store data, list reports, view status, basic admin/technician workflow.
   - Fitur non-wajib tidak boleh menjadi blocker MVP.

5. Assign priority.
   - Setiap item mendapat MoSCoW, value, risk/readiness, dan rationale.
   - Catat konflik atau keputusan yang perlu mahasiswa setujui.

6. Update traceability.
   - Pastikan prioritas bisa ditelusuri ke requirement dan story.

## Output

Jika skill dijalankan, buat:

- `docs/requirements/04-prioritization.md`
- update `docs/requirements/traceability.md`

## Output Structure

```markdown
# Requirements Prioritization

## 1. Sources Read
## 2. Review Status and Boundary
## 3. Prioritization Method
## 4. Requirements Readiness Map
## 5. MoSCoW Prioritization Table
## 6. MVP Scope
## 7. Value-Risk Notes
## 8. Deferred Topics and Blockers
## 9. Priority Conflicts
## 10. Student Decisions Needed
## 11. Traceability Notes
## 12. Human Review Notes
```

## Aturan

- Jangan membuat requirement baru.
- Jangan menjadikan deferred topic sebagai approved scope.
- Jangan menggunakan priority untuk menyelesaikan open question.
- Semua prioritas harus punya rationale.

## Quality Check

- Semua requirement utama punya prioritas.
- MVP jelas dan realistis.
- Fitur tidak wajib tetap tidak wajib.
- Risk/readiness terlihat.
- Traceability diperbarui.

## Kondisi Gagal

Berhenti dan tanya mahasiswa jika:

- prioritas membutuhkan policy yang belum diputuskan;
- requirement baseline belum tersedia;
- deferred topic dipaksa menjadi scope wajib;
- user meminta implementation plan pada tahap ini.

## Human Review

Mahasiswa menyetujui prioritas dan MVP sebelum lanjut ke validation/change atau design.

