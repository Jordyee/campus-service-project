---
name: 02-elicitation
description: Use this skill to plan stakeholder elicitation for the Campus Service Request and Maintenance System. It creates traceable question guides, evidence capture rules, and decision logs without writing final requirements.
---

# Skill 02: Elicitation

## Tujuan

Gunakan skill ini setelah Skill 01 menghasilkan baseline inception yang sudah direview.

Skill ini fokus pada:

- tujuan elicitation;
- pertanyaan untuk stakeholder;
- klasifikasi jawaban;
- evidence capture;
- open question dan keputusan mahasiswa sebelum specification.

Skill ini tidak menghasilkan requirement final, user story, prioritas, validasi, change request, desain, atau kode.

## Kapan Digunakan

Gunakan setelah `docs/requirements/01-inception-stakeholder.md` tersedia dan sudah direview.

## Input

Baca file berikut:

- `AI_Assisted_Campus_Service_Project.md`
- `README.md`
- `CASE.md`
- `docs/requirements/01-inception-stakeholder.md`

Jika tersedia, baca juga:

- `docs/requirements/notes-stakeholder.md`
- `docs/requirements/interview-answers.md`
- `docs/requirements/assumptions.md`
- file review di `evidence/`

## Source ID

Gunakan label berikut:

- `SRC-01`: instruksi tugas utama.
- `SRC-02`: case summary.
- `ASM-*`: asumsi.
- `OQ-*`: open question dari Skill 01.
- `ELQ-*`: pertanyaan elicitation.
- `INT-*`: jawaban interview atau simulasi yang disetujui.

## Evidence Rules

| Category | Meaning |
|---|---|
| Confirmed case fact | Fakta tertulis di sumber case. |
| Approved answer | Jawaban stakeholder nyata atau simulasi yang disetujui mahasiswa. |
| Partial answer | Jawaban hanya menjelaskan sebagian kebijakan atau workflow. |
| Unanswered item | Belum ada jawaban valid. |
| Assumption | Masih asumsi, bukan fakta. |
| Student decision needed | Harus diputuskan mahasiswa sebelum specification. |

Jangan mengubah unanswered item, partial answer, atau assumption menjadi requirement.

## Langkah Kerja

1. Konfirmasi batas tugas.
   - Kerjakan hanya elicitation.
   - Jangan membuat FR, NFR, business rule, user story, prioritas, atau desain.

2. Verifikasi baseline Skill 01.
   - Pastikan `docs/requirements/01-inception-stakeholder.md` ada.
   - Gunakan stakeholder, risk, dan open question dari baseline itu.

3. Buat elicitation coverage map.
   - Map setiap stakeholder ke topik yang perlu diklarifikasi.
   - Stakeholder utama: Pelapor, Administrator, Teknisi, Manajer Fasilitas.
   - Topik wajib: laporan, review, prioritas, assignment, status, komentar, riwayat status, close/reopen, dashboard.

4. Buat question guide.
   - Gunakan pertanyaan terbuka terlebih dahulu.
   - Beri ID `ELQ-*` untuk setiap pertanyaan.
   - Hindari pertanyaan yang diam-diam memilih kebijakan.

5. Siapkan evidence capture.
   - Jawaban harus menyimpan ID, stakeholder, pertanyaan terkait, status, tanggal, reviewer, dan isi jawaban.
   - Bedakan jawaban nyata, simulasi edukatif, dan asumsi.

6. Identifikasi keputusan sebelum specification.
   - Escalate keputusan tentang auth, role, status tambahan, prioritas, data dashboard, audit history, dan NFR terukur.

## Output

Jika skill dijalankan, buat:

- `docs/requirements/02-elicitation.md`

Simpan bukti penggunaan AI atau review di:

- `evidence/`

## Output Structure

```markdown
# Elicitation

## 1. Sources Read
## 2. Review Status and Boundary
## 3. Elicitation Objectives
## 4. Stakeholder Coverage Map
## 5. Question Guide by Stakeholder
## 6. Evidence Capture Template
## 7. Existing Answer Classification
## 8. Open Questions and Decision Log
## 9. Risks for Specification
## 10. Readiness Criteria for Skill 03
## 11. Human Review Notes
```

## Aturan

- Setiap pertanyaan harus punya `ELQ-*`.
- Setiap open question harus mempertahankan `OQ-*`.
- Jangan membuat jawaban palsu tanpa label simulasi atau asumsi.
- Jangan menulis final requirement.

## Quality Check

- Semua aktor utama punya pertanyaan.
- Pertanyaan mencakup workflow dan data.
- Ada template capture jawaban.
- Ada daftar keputusan yang harus ditinjau manusia.

## Kondisi Gagal

Berhenti dan tanya mahasiswa jika:

- baseline Skill 01 belum ada;
- pengguna meminta AI mengarang jawaban stakeholder tanpa label;
- keputusan policy harus dibuat sebelum lanjut;
- pengguna meminta final requirement pada tahap ini.

## Human Review

Mahasiswa memeriksa apakah pertanyaan sudah relevan dan apakah jawaban simulasi boleh dipakai sebagai evidence.

