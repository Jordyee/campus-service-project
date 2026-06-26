# Test Planning

## Tujuan
Membuat rencana pengujian.

## Kapan Digunakan
Digunakan sebelum automated dan acceptance testing lengkap.

## Input
- `docs/requirements/03-specification.md`
- `docs/requirements/traceability.md`

## Langkah Kerja
1. Baca requirement dan traceability.
2. Tentukan unit test, integration test, dan acceptance test.
3. Prioritaskan test untuk fitur wajib.
4. Tentukan data uji.

## Output
- `docs/testing/01-test-plan.md`

## Aturan
- Test harus mengacu ke ID requirement atau user story.
- Jangan hanya menguji happy path.

## Quality Check
- Ada rencana minimal 20 automated tests.
- Ada edge case dan error case.
- Acceptance test mencakup alur utama.

## Kondisi Gagal
Berhenti jika requirement belum memiliki acceptance criteria.

## Human Review
Mahasiswa memastikan test plan realistis dan bisa dijalankan.

