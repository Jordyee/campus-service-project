# Deployment

## Tujuan
Mempublikasikan aplikasi dan memeriksa hasilnya.

## Kapan Digunakan
Digunakan setelah build dan test utama lulus.

## Input
- Source code
- `wrangler.jsonc`
- Database migration
- `docs/testing/02-acceptance-test-results.md`

## Langkah Kerja
1. Jalankan build lokal.
2. Jalankan migration D1 remote jika diperlukan.
3. Deploy ke Cloudflare.
4. Buka URL publik.
5. Uji health check dan alur utama.
6. Catat hasil deployment.

## Output
- `docs/deployment/01-deployment-notes.md`
- URL Cloudflare
- Release note

## Aturan
- Jangan deploy jika test utama gagal tanpa catatan.
- Jangan commit secret atau token.

## Quality Check
- URL publik dapat dibuka.
- API health check berhasil.
- Data tersimpan setelah refresh.
- README diperbarui dengan URL deployment.

## Kondisi Gagal
Berhenti jika build gagal atau Cloudflare credential belum tersedia.

## Human Review
Mahasiswa memeriksa URL deployment dan melengkapi format pengumpulan.

