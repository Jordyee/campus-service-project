# Validation dan Change

## Tujuan
Memeriksa requirement dan menganalisis perubahan.

## Kapan Digunakan
Digunakan setelah prioritas dibuat dan saat ada perubahan scope.

## Input
- `docs/requirements/03-specification.md`
- `docs/requirements/04-prioritization.md`

## Langkah Kerja
1. Baca input.
2. Cek requirement yang ambigu, tidak bisa diuji, atau bertentangan.
3. Buat satu contoh change request.
4. Jelaskan dampak perubahan pada requirement, desain, test, dan jadwal.

## Output
- `docs/requirements/05-validation-change.md`

## Aturan
- Jangan menghapus requirement tanpa alasan.
- Setiap perubahan harus punya dampak yang jelas.

## Quality Check
- Ada hasil validasi requirement.
- Ada minimal satu change request.
- Dampak perubahan dapat ditelusuri.

## Kondisi Gagal
Berhenti jika requirement belum memiliki ID.

## Human Review
Mahasiswa menyetujui requirement final dan change request.

