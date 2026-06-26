# Automated Testing

## Tujuan
Membuat unit test dan integration test.

## Kapan Digunakan
Digunakan saat atau setelah implementasi fitur.

## Input
- `docs/testing/01-test-plan.md`
- Source code terkait

## Langkah Kerja
1. Baca test plan.
2. Buat test untuk fungsi atau API terkait.
3. Jalankan test.
4. Perbaiki test atau kode jika ada kegagalan valid.

## Output
- File test di `tests/unit` atau `tests/integration`
- Test result evidence

## Aturan
- Test harus memeriksa perilaku, bukan detail implementasi yang rapuh.
- Jangan menghapus test gagal tanpa alasan.

## Quality Check
- Test dapat dijalankan berulang.
- Ada test sukses dan test validasi gagal.
- Hasil test dicatat.

## Kondisi Gagal
Berhenti jika kode belum bisa dijalankan atau dependency hilang.

## Human Review
Mahasiswa memeriksa apakah test benar-benar membuktikan requirement.

