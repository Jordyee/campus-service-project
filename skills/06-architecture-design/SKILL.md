# Architecture Design

## Tujuan
Menentukan bagian utama aplikasi dan hubungan antar bagian.

## Kapan Digunakan
Digunakan setelah requirement divalidasi.

## Input
- `docs/requirements/03-specification.md`
- `docs/requirements/04-prioritization.md`
- `docs/requirements/05-validation-change.md`

## Langkah Kerja
1. Baca input.
2. Tentukan frontend, backend, database, auth sederhana, dan deployment.
3. Jelaskan data flow.
4. Tentukan risiko teknis.

## Output
- `docs/design/01-architecture.md`

## Aturan
- Pilih arsitektur paling sederhana yang memenuhi requirement.
- Gunakan Cloudflare Workers dan D1 sesuai instruksi tugas.

## Quality Check
- Semua bagian sistem punya alasan.
- Data flow dapat dijelaskan secara lisan.
- Risiko dan batasan ditulis.

## Kondisi Gagal
Berhenti jika requirement belum disetujui.

## Human Review
Mahasiswa memeriksa apakah desain bisa dikerjakan dengan skill dan waktu yang tersedia.

