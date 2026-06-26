# Code Review

## Tujuan
Memeriksa kode dan test sebelum merge.

## Kapan Digunakan
Digunakan pada setiap Pull Request.

## Input
- Pull Request
- Requirement terkait
- Test terkait

## Langkah Kerja
1. Baca perubahan kode.
2. Cek kesesuaian dengan requirement.
3. Cek bug, risiko keamanan, dan test yang kurang.
4. Tulis temuan dan keputusan review.

## Output
- `evidence/human-review-*.md`
- Komentar review pada PR

## Aturan
- Temuan harus spesifik.
- Jangan menyetujui PR jika acceptance criteria belum terpenuhi.

## Quality Check
- Ada keputusan review.
- Risiko utama ditulis.
- Test sudah dijalankan atau alasan tidak menjalankan ditulis.

## Kondisi Gagal
Berhenti jika tidak ada diff atau issue terkait.

## Human Review
Mahasiswa atau reviewer memutuskan approve, revisi, atau tolak.

