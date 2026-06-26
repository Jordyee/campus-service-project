# Database dan API Design

## Tujuan
Membuat rancangan tabel database dan endpoint API.

## Kapan Digunakan
Digunakan setelah architecture design selesai.

## Input
- `docs/design/01-architecture.md`
- `docs/requirements/03-specification.md`

## Langkah Kerja
1. Baca input.
2. Tentukan entity dan field database.
3. Buat rancangan migration D1.
4. Tentukan endpoint API.
5. Tulis input, output, dan error state.

## Output
- `docs/design/02-database-api.md`

## Aturan
- Gunakan ID requirement untuk setiap endpoint penting.
- Jangan menyimpan data yang tidak diperlukan.

## Quality Check
- Tabel mendukung alur status.
- Endpoint mendukung fitur wajib.
- Validasi dan error state jelas.

## Kondisi Gagal
Berhenti jika architecture belum tersedia.

## Human Review
Mahasiswa memeriksa apakah database dan API cukup sederhana.

