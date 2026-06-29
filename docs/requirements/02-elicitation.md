# Elicitation

## 1. Sources Read

| ID | Source | Notes |
|---|---|---|
| SRC-01 | `AI_Assisted_Campus_Service_Project.md` | Main assignment, case description, required workflow, required and non-required features, deliverables, AI evidence rules, and Cloudflare/D1 constraints. |
| SRC-02 | `CASE.md` | Compact case summary, actors, core workflow, and required feature areas. |
| SRC-03 | `README.md` | Repository purpose, planned stack, repository structure, and current project status. |
| SRC-04 | `AGENTS.md` | Project rules, source-of-truth order, branch model, stage boundaries, ask-first decisions, and evidence rules. |
| SRC-05 | `skills/jordy-workflows/github-workflow-jordy.md` | Branch, worktree, PR, merge, handoff, and quality-check workflow. |
| SRC-06 | `skills/02-elicitation/SKILL.md` | Elicitation process, output structure, evidence categories, and scope limits for this stage. |
| SRC-07 | `docs/requirements/01-inception-stakeholder.md` | Baseline stakeholder discovery, assumptions, preliminary scope, risks, and open questions from Skill 01. |
| SRC-08 | `evidence/requirements-inception-ai-evidence.md` | Evidence status for Skill 01; human review is still recorded as pending. |

## 2. Review Status and Boundary

This document is limited to elicitation planning. It prepares stakeholder questions, answer classification, evidence capture, open questions, and decision tracking for the Campus Service Request and Maintenance System.

This document does not create:

- functional requirements;
- non-functional requirements;
- business rules;
- user stories;
- acceptance criteria;
- priorities;
- validation results;
- design artifacts;
- GitHub issues;
- tests;
- code.

### Baseline Status

| Item | Status | Notes |
|---|---|---|
| Skill 01 artifact exists | Confirmed | `docs/requirements/01-inception-stakeholder.md` exists in the current branch and in base branch `development`. |
| Skill 01 human review | Pending / needs student confirmation | SRC-08 still records human review as pending. The student's current instruction authorizes preparing Skill 02, but it does not automatically approve all assumptions from Skill 01. |
| Branch boundary | Confirmed | Work is on `requirements/elicitation`, not `main` or `development`. |
| Elicitation answer boundary | Confirmed | No stakeholder answers are invented. Future answers must be recorded as real interview answers, approved simulation, assumptions, or student decisions. |

## 3. Elicitation Objectives

| ID | Objective | Related Source / Item | Output Expected From Elicitation |
|---|---|---|---|
| ELO-01 | Clarify how each confirmed actor experiences the request lifecycle. | SRC-01, SRC-02, SRC-07 | Answer records linked to `ELQ-*` and stakeholder role. |
| ELO-02 | Clarify report data, review handling, priority handling, assignment, status updates, comments, history, close/reopen, and dashboard topics. | SRC-01, SRC-02, SRC-06 | Coverage map and question guide. |
| ELO-03 | Separate confirmed case facts from assumptions, unanswered items, partial answers, and student decisions. | SRC-04, SRC-06, SRC-07 | Existing answer classification and decision log. |
| ELO-04 | Preserve `OQ-*` items from Skill 01 so they can be resolved or explicitly deferred before Skill 03. | SRC-06, SRC-07 | Open question and decision log table. |
| ELO-05 | Define a repeatable capture format for future interview answers or approved educational simulations. | SRC-01, SRC-04, SRC-06 | Evidence capture template using `INT-*` IDs. |

## 4. Stakeholder Coverage Map

| Stakeholder | Stakeholder Status | Topics to Clarify | Related OQ | Question IDs |
|---|---|---|---|---|
| Reporter / Pelapor | Confirmed system actor | Report creation, report fields, report list/detail expectations, search/filter use, status visibility, comments, result confirmation, duplicate report handling, reopen expectations. | OQ-01, OQ-05, OQ-06, OQ-08 | ELQ-001 to ELQ-010 |
| Administrator | Confirmed system actor | Review process, category handling, priority handling, assignment process, administrator authority, close/reopen authority, duplicate handling, status history expectations. | OQ-02, OQ-05, OQ-06, OQ-07, OQ-09 | ELQ-011 to ELQ-023 |
| Technician / Teknisi | Confirmed system actor | Task queue, accepting assignments, progress updates, clarification needs, comments/notes, status changes, resolved state, handoff or rejection edge cases. | OQ-03, OQ-06, OQ-07 | ELQ-024 to ELQ-034 |
| Facility Manager / Manajer Fasilitas | Confirmed system actor | Dashboard purpose, summary period, useful metrics, filters, drill-down expectations, decision-making use, export/report expectations if any. | OQ-04 | ELQ-035 to ELQ-043 |
| Course Instructor / Reviewer | Assumed external stakeholder | Evidence completeness, acceptable simulation use, human review expectations, traceability expectations, grading artifact boundaries. | OQ-10, ASM-02 | ELQ-044 to ELQ-048 |
| Student Developer / Maintainer | Assumed project stakeholder | Implementation constraints, authentication decision boundary, role policy decision boundary, deployment constraints, traceability maintenance. | ASM-03, OQ-10 | ELQ-049 to ELQ-053 |

## 5. Question Guide by Stakeholder

### Reporter / Pelapor

| ID | Question | Why Ask | Related OQ / Topic |
|---|---|---|---|
| ELQ-001 | Ceritakan bagaimana pelapor biasanya mengetahui dan melaporkan masalah fasilitas kampus dari awal sampai menunggu hasilnya. | Opens the workflow discussion without forcing a policy. | Report lifecycle |
| ELQ-002 | Informasi apa yang menurut pelapor paling penting ditulis ketika membuat laporan masalah fasilitas? | Clarifies report field expectations without defining final fields. | OQ-08 |
| ELQ-003 | Bagaimana pelapor membedakan masalah yang mendesak dengan masalah biasa saat melaporkan? | Helps understand priority signals before administrator policy is defined. | OQ-09 |
| ELQ-004 | Setelah laporan dikirim, informasi status apa yang perlu terlihat agar pelapor merasa prosesnya jelas? | Clarifies status visibility and communication needs. | Status visibility |
| ELQ-005 | Kapan pelapor perlu menambahkan komentar setelah laporan dibuat? | Clarifies comment use cases. | Comments |
| ELQ-006 | Bagaimana pelapor sebaiknya mengonfirmasi bahwa pekerjaan teknisi sudah sesuai atau belum sesuai? | Clarifies result confirmation without choosing close/reopen rules. | OQ-06 |
| ELQ-007 | Jika ada dua orang melaporkan masalah yang sama, bagaimana pelapor berharap laporan itu ditangani? | Explores duplicate report expectation. | OQ-05 |
| ELQ-008 | Apa perbedaan kebutuhan antara pelapor mahasiswa dan pelapor dosen, jika ada? | Tests ASM-01. | OQ-01, ASM-01 |
| ELQ-009 | Saat mencari laporan lama, informasi apa yang biasanya digunakan pelapor untuk menemukan laporan tersebut? | Clarifies search/filter inputs from reporter perspective. | Search/filter |
| ELQ-010 | Hal apa yang tidak perlu dilihat pelapor karena hanya relevan untuk admin, teknisi, atau manajer? | Clarifies role visibility boundary. | Role policy |

### Administrator

| ID | Question | Why Ask | Related OQ / Topic |
|---|---|---|---|
| ELQ-011 | Ceritakan langkah administrator sejak laporan baru masuk sampai laporan siap diberikan ke teknisi. | Opens review workflow. | Review |
| ELQ-012 | Informasi apa yang perlu diperiksa administrator sebelum laporan dianggap layak diproses? | Clarifies review criteria without making rules yet. | Review |
| ELQ-013 | Bagaimana administrator menentukan kategori laporan? | Clarifies category handling. | OQ-09 |
| ELQ-014 | Faktor apa yang dipertimbangkan administrator saat menentukan prioritas? | Clarifies priority logic without finalizing levels. | OQ-09 |
| ELQ-015 | Bagaimana administrator memilih teknisi untuk sebuah laporan? | Clarifies assignment basis. | Assignment |
| ELQ-016 | Apakah ada kondisi ketika laporan perlu dikembalikan ke pelapor untuk informasi tambahan? Jelaskan contoh kondisinya. | Explores workflow edge case without adding a new status yet. | OQ-07 |
| ELQ-017 | Dalam kondisi apa laporan dianggap duplikat, dan apa tindakan yang biasa diharapkan? | Clarifies duplicate handling. | OQ-05 |
| ELQ-018 | Siapa saja yang boleh menutup laporan, dan informasi apa yang perlu diperiksa sebelum ditutup? | Clarifies close authority. | OQ-02, OQ-06 |
| ELQ-019 | Dalam kondisi apa laporan yang sudah resolved atau closed perlu dibuka kembali? | Clarifies reopen scenarios. | OQ-06 |
| ELQ-020 | Informasi apa yang harus tercatat dalam riwayat status agar proses dapat diaudit atau ditinjau ulang? | Clarifies history content. | Status history |
| ELQ-021 | Apa saja tindakan administrator yang tidak boleh dilakukan oleh teknisi atau pelapor? | Clarifies permission boundary. | OQ-02 |
| ELQ-022 | Apakah ada lebih dari satu jenis administrator atau level wewenang? Jika ada, jelaskan perbedaannya. | Tests administrator role complexity. | OQ-02 |
| ELQ-023 | Bagaimana administrator menggunakan daftar laporan, pencarian, dan filter untuk mengatur pekerjaan harian? | Clarifies list/search/filter operations. | Search/filter |

### Technician / Teknisi

| ID | Question | Why Ask | Related OQ / Topic |
|---|---|---|---|
| ELQ-024 | Ceritakan bagaimana teknisi menerima, memahami, mengerjakan, dan menyelesaikan tugas perbaikan. | Opens technician workflow. | Assignment, status |
| ELQ-025 | Informasi apa yang harus terlihat pada daftar tugas teknisi agar teknisi dapat memulai pekerjaan? | Clarifies task list data. | Assignment |
| ELQ-026 | Apa arti "menerima tugas" bagi teknisi dalam proses kerja kampus? | Clarifies accepted assignment behavior. | OQ-03 |
| ELQ-027 | Kapan teknisi perlu mengubah status pekerjaan menjadi in progress? | Clarifies status transition meaning. | Status |
| ELQ-028 | Informasi progres apa yang perlu ditulis teknisi selama pekerjaan berlangsung? | Clarifies progress note needs. | Comments/notes |
| ELQ-029 | Jika teknisi membutuhkan informasi tambahan dari pelapor atau admin, bagaimana proses yang diharapkan? | Clarifies clarification route. | OQ-03 |
| ELQ-030 | Dalam kondisi apa teknisi tidak dapat mengerjakan tugas yang diberikan? | Explores reject/return edge cases. | OQ-03 |
| ELQ-031 | Apa bukti atau catatan yang cukup bagi teknisi untuk menandai pekerjaan sebagai resolved? | Clarifies resolution information. | Status |
| ELQ-032 | Apakah teknisi perlu melihat riwayat status dan komentar sebelumnya? Jelaskan kapan itu berguna. | Clarifies history visibility. | Status history |
| ELQ-033 | Apa saja informasi yang tidak perlu atau tidak boleh diubah oleh teknisi? | Clarifies permission boundary. | Role policy |
| ELQ-034 | Bagaimana teknisi membedakan catatan internal dengan komentar yang boleh dilihat pelapor? | Clarifies note visibility. | Comments/notes |

### Facility Manager / Manajer Fasilitas

| ID | Question | Why Ask | Related OQ / Topic |
|---|---|---|---|
| ELQ-035 | Ceritakan keputusan apa yang ingin dibantu oleh dashboard fasilitas. | Opens dashboard purpose. | OQ-04 |
| ELQ-036 | Ringkasan apa yang paling berguna untuk melihat kondisi layanan fasilitas secara cepat? | Clarifies dashboard summary needs. | OQ-04 |
| ELQ-037 | Periode waktu apa yang biasanya perlu dilihat dalam laporan ringkas? | Clarifies reporting period. | OQ-04 |
| ELQ-038 | Bagaimana manajer membandingkan beban kerja antar kategori, lokasi, status, atau teknisi? | Clarifies dashboard dimensions without final metrics. | Dashboard filters |
| ELQ-039 | Masalah seperti apa yang perlu terlihat sebagai perhatian khusus di dashboard? | Clarifies risk/exception visibility. | Dashboard |
| ELQ-040 | Apakah manajer perlu membuka detail laporan dari dashboard, atau cukup melihat ringkasan? | Clarifies drill-down expectation. | Dashboard/detail |
| ELQ-041 | Siapa yang boleh melihat dashboard dan laporan ringkas? | Clarifies access boundary. | Role policy |
| ELQ-042 | Apakah ringkasan perlu disimpan sebagai bukti laporan periodik, atau cukup tampil di aplikasi? | Clarifies reporting evidence need without choosing export scope. | OQ-04 |
| ELQ-043 | Informasi apa yang terlalu detail untuk dashboard sederhana tahap ini? | Controls dashboard scope. | ASM-04 |

### Course Instructor / Reviewer

| ID | Question | Why Ask | Related OQ / Topic |
|---|---|---|---|
| ELQ-044 | Bukti apa yang harus terlihat agar proses elicitation dianggap dapat direview? | Clarifies grading evidence expectation. | OQ-10 |
| ELQ-045 | Apakah jawaban stakeholder boleh berupa simulasi edukatif jika diberi label jelas dan disetujui mahasiswa? | Clarifies approved simulation boundary. | INT-* |
| ELQ-046 | Bagaimana human review sebaiknya dicatat untuk setiap dokumen requirements? | Clarifies review evidence format. | OQ-10 |
| ELQ-047 | Kesalahan AI seperti apa yang perlu dicatat dalam evidence tahap requirements? | Clarifies AI evidence detail. | Evidence |
| ELQ-048 | Apakah ada format khusus yang harus dipakai untuk traceability ketika requirements mulai ditulis di Skill 03? | Prepares Skill 03 without writing requirements now. | Traceability |

### Student Developer / Maintainer

| ID | Question | Why Ask | Related OQ / Topic |
|---|---|---|---|
| ELQ-049 | Keputusan autentikasi apa yang boleh ditunda, dan keputusan apa yang harus dibuat sebelum specification? | Clarifies ask-first authentication boundary. | Student decision needed |
| ELQ-050 | Bagaimana role pengguna akan direpresentasikan selama project kelas jika login penuh belum diputuskan? | Clarifies role policy without implementing it. | Role policy |
| ELQ-051 | Batasan apa dari Cloudflare Workers dan D1 yang perlu dipertimbangkan saat requirements nanti ditulis? | Keeps requirements practical for planned stack. | SRC-03 |
| ELQ-052 | Dokumen evidence apa yang perlu diperbarui setiap kali AI membuat draft baru? | Clarifies evidence workflow. | OQ-10 |
| ELQ-053 | Keputusan scope apa yang harus selalu ditanyakan dulu sebelum dimasukkan ke specification? | Prevents hidden scope expansion. | Optional features |

## 6. Evidence Capture Template

Use this template for each real interview answer, approved educational simulation, or student decision captured after this document.

```markdown
### INT-XXX: Short Answer Title

| Field | Value |
|---|---|
| Answer ID | INT-XXX |
| Date | YYYY-MM-DD |
| Stakeholder | Reporter / Administrator / Technician / Facility Manager / Instructor / Student Developer |
| Answer Type | Real interview / Approved simulation / Student decision / Assumption update |
| Related Question IDs | ELQ-XXX, ELQ-XXX |
| Related Open Questions | OQ-XX, OQ-XX |
| Evidence Status | Approved answer / Partial answer / Unanswered item / Assumption / Student decision needed |
| Captured By | Name |
| Reviewed By | Name |
| Review Status | Pending / Approved / Needs revision / Rejected |

#### Answer Content

Write the answer in the stakeholder's words when possible.

#### AI Handling Notes

State whether AI drafted, summarized, translated, or classified the answer.

#### Human Review Notes

State what the student accepted, corrected, or rejected.

#### Impact for Skill 03

State which topics may be used later for specification. Do not write final requirements here.
```

### Evidence Classification Rules

| Category | How to Use |
|---|---|
| Confirmed case fact | Use only for facts directly written in SRC-01 or SRC-02. |
| Approved answer | Use only after a real answer or approved simulation is reviewed by the student. |
| Partial answer | Use when an answer resolves only part of an `OQ-*` or `ELQ-*` topic. |
| Unanswered item | Use when no valid answer exists yet. |
| Assumption | Use for plausible but unapproved interpretation. Keep `ASM-*` visible. |
| Student decision needed | Use when the student must choose policy, scope, auth, role, measurable target, or evidence format before Skill 03. |

## 7. Existing Answer Classification

### Confirmed Case Facts

| ID | Item | Classification | Source |
|---|---|---|---|
| FACT-01 | The system is a Campus Service Request and Maintenance System for campus facility problems. | Confirmed case fact | SRC-01, SRC-02 |
| FACT-02 | Confirmed actors are Reporter/Pelapor, Administrator, Technician/Teknisi, and Facility Manager/Manajer Fasilitas. | Confirmed case fact | SRC-01, SRC-02, SRC-07 |
| FACT-03 | Baseline workflow is `Submitted -> Under Review -> Assigned -> In Progress -> Resolved -> Closed`. | Confirmed case fact | SRC-01, SRC-02, SRC-07 |
| FACT-04 | Required topic areas include report creation, report list/detail, search/filter, review, priority, technician assignment, status update, comments/notes, status history, close/reopen, and simple dashboard. | Confirmed case fact | SRC-01, SRC-02, SRC-07 |
| FACT-05 | Upload photo, email notification, Google login, room QR code, AI categorization, spare-part inventory, and vendor management are not required unless explicitly approved. | Confirmed case fact | SRC-01, SRC-04, SRC-07 |

### Assumptions from Skill 01

| ID | Assumption | Classification | Current Handling |
|---|---|---|---|
| ASM-01 | Students and lecturers can be grouped under Reporter/Pelapor for early stakeholder discovery. | Assumption | Test through ELQ-008 before specification. |
| ASM-02 | Course instructor or reviewer is an external project stakeholder for evidence and grading. | Assumption | Clarify through ELQ-044 to ELQ-048 if needed. |
| ASM-03 | Student Developer / Maintainer is a project stakeholder for repository, deployment, and evidence work. | Assumption | Clarify through ELQ-049 to ELQ-053 if needed. |
| ASM-04 | Dashboard supports summary visibility, not advanced analytics at this stage. | Assumption | Test through ELQ-035 to ELQ-043 before specification. |

### Current Interview Answers

| ID | Status | Notes |
|---|---|---|
| INT-001 | Not captured | No real interview answer or approved simulation has been recorded yet for Skill 02. |

## 8. Open Questions and Decision Log

| OQ ID | Open Question from Skill 01 | Related ELQ | Current Classification | Decision Needed Before Skill 03 |
|---|---|---|---|---|
| OQ-01 | Are students and lecturers treated identically as Reporter/Pelapor, or do they need different data fields or permissions? | ELQ-008, ELQ-010, ELQ-050 | Student decision needed | Decide whether Reporter is one role or split by user type for specification. |
| OQ-02 | What exact actions can an Administrator perform, and are there multiple administrator levels? | ELQ-011, ELQ-018, ELQ-021, ELQ-022 | Student decision needed | Decide administrator authority and whether multiple admin levels exist. |
| OQ-03 | Can a Technician reject, return, or request clarification on an assigned task? | ELQ-026, ELQ-029, ELQ-030 | Student decision needed | Decide whether technician exception handling exists in scope. |
| OQ-04 | What summary information should the Facility Manager dashboard show? | ELQ-035 to ELQ-043 | Student decision needed | Decide dashboard purpose, summary dimensions, and simple scope boundary. |
| OQ-05 | Are duplicate reports allowed, merged, or rejected? | ELQ-007, ELQ-017 | Student decision needed | Decide duplicate handling policy or defer with explicit note. |
| OQ-06 | Who can reopen a closed or resolved report, and under what condition? | ELQ-006, ELQ-018, ELQ-019 | Student decision needed | Decide reopen authority and acceptable reopen conditions. |
| OQ-07 | Are additional statuses beyond the confirmed lifecycle needed? | ELQ-016, ELQ-027, ELQ-030, ELQ-031 | Student decision needed | Decide whether baseline statuses are enough or whether justified additions are needed later. |
| OQ-08 | What report fields are required at creation time? | ELQ-002, ELQ-003, ELQ-009 | Student decision needed | Decide report data fields after elicitation answers are reviewed. |
| OQ-09 | What categories and priority levels should be available? | ELQ-003, ELQ-013, ELQ-014 | Student decision needed | Decide category and priority options or source for those options. |
| OQ-10 | What human review evidence is expected for each requirements artifact? | ELQ-044, ELQ-046, ELQ-047, ELQ-048, ELQ-052 | Student decision needed | Decide review evidence format before specification artifacts are finalized. |

### Additional Student Decision Items

| ID | Topic | Why It Needs Student Decision | Related ELQ |
|---|---|---|---|
| SDN-01 | Authentication approach | AGENTS.md says to ask first before choosing authentication. | ELQ-049, ELQ-050 |
| SDN-02 | Role policy | Role visibility and permission details affect later requirements and tests. | ELQ-010, ELQ-021, ELQ-033, ELQ-041, ELQ-050 |
| SDN-03 | Optional feature boundary | Optional features must not enter scope silently. | ELQ-053 |
| SDN-04 | Measurable quality targets | NFR targets must not be invented during elicitation. | ELQ-051 |
| SDN-05 | Approved simulation use | Simulated stakeholder answers need explicit label and student approval. | ELQ-045 |

## 9. Risks for Specification

| ID | Risk | Impact on Skill 03 | Mitigation in Elicitation |
|---|---|---|---|
| RISK-EL-01 | Skill 01 human review is still recorded as pending. | Specification could inherit unapproved assumptions. | Keep `ASM-*` and pending review status visible; require student confirmation before turning answers into requirements. |
| RISK-EL-02 | Role and permission boundaries are not yet decided. | Specification could give actors too much or too little authority. | Ask ELQ-010, ELQ-021, ELQ-033, ELQ-041, and ELQ-050. |
| RISK-EL-03 | Workflow edge cases are unclear. | Specification could miss duplicate, reopen, clarification, or rejected assignment paths. | Ask ELQ-007, ELQ-016, ELQ-017, ELQ-019, ELQ-029, and ELQ-030. |
| RISK-EL-04 | Dashboard scope could grow beyond "simple dashboard." | Specification could become too broad for the assignment and stack. | Ask ELQ-035 to ELQ-043 and preserve ASM-04 until reviewed. |
| RISK-EL-05 | AI may summarize answers too strongly. | Partial answers or assumptions may appear as final requirements. | Classify every answer using the evidence categories and require human review. |
| RISK-EL-06 | Authentication and role policy may be chosen implicitly. | Later design and implementation could add hidden scope. | Track SDN-01 and SDN-02 as student decisions. |
| RISK-EL-07 | Optional features may be requested casually during elicitation. | Specification could include non-required features without approval. | Label optional topics separately and require explicit scope approval. |

## 10. Readiness Criteria for Skill 03

Skill 03: Specification should not begin until these readiness checks are satisfied or explicitly deferred by the student.

| ID | Criterion | Status |
|---|---|---|
| RC-01 | Student reviews this elicitation guide and confirms the question set is usable. | Pending |
| RC-02 | Skill 01 assumptions `ASM-01` to `ASM-04` are approved, revised, or rejected. | Pending |
| RC-03 | Each `OQ-*` item is answered, partially answered, or explicitly deferred with a reason. | Pending |
| RC-04 | Any `INT-*` answer used for specification is labeled as real interview, approved simulation, student decision, or assumption update. | Pending |
| RC-05 | Authentication and role-policy decisions are either made or explicitly deferred with a specification-safe boundary. | Pending |
| RC-06 | Dashboard scope is constrained enough to support a simple dashboard. | Pending |
| RC-07 | Optional features remain out of scope unless the student explicitly approves adding one. | Pending |
| RC-08 | Human review evidence format for requirements artifacts is agreed or a temporary format is approved. | Pending |

## 11. Human Review Notes

### Review Needed

The student should review:

- whether all confirmed stakeholder roles have enough questions;
- whether any question accidentally assumes a policy decision;
- whether `ASM-*` items from Skill 01 should remain, change, or be removed;
- whether each `OQ-*` item is covered by one or more `ELQ-*` questions;
- whether the evidence capture template is acceptable for real or simulated interview answers;
- whether any optional feature has accidentally entered the required scope;
- whether the project may proceed to collecting answers before Skill 03.

### Current Review Status

| Item | Status | Notes |
|---|---|---|
| AI draft for Skill 02 | Ready for student review | This document is a draft elicitation artifact. |
| Human review by student | Pending | Required before answers are treated as approved. |
| Stakeholder answers | Not captured | No `INT-*` answer has been approved yet. |
| Scope change | None | No optional feature is added to project scope. |
| Readiness for Skill 03 | Not ready | Open questions and student decisions remain pending. |
