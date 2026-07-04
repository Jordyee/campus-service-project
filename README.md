# Campus Service Request and Maintenance System

Final project for Software Engineering.

This repository contains the requirements, design, implementation, tests, deployment notes, and AI evidence for a campus facility service request system.

## Project Scope

Users can report campus facility problems, administrators can review and assign reports, technicians can update progress, and facility managers can view a simple dashboard.

## Required Deliverables

- Requirements documents
- Architecture, database, API, and UI design
- GitHub issues and pull requests
- Source code
- Automated tests
- Cloudflare deployment
- Traceability matrix
- AI usage evidence and human review notes

## Stack

- Frontend: React with TypeScript
- Backend: Cloudflare Worker
- Database: Cloudflare D1
- Tests: Vitest
- Deployment: Cloudflare Workers

## Deployment

Public Cloudflare URL: <https://campus-service-project.gerungan-dj.workers.dev>

## Repository Structure

```text
skills/              AI skill files
docs/                Requirements, design, testing, and deployment documentation
src/                 Frontend source code
worker/              Backend/API source code
database/            D1 migrations and database notes
tests/               Unit, integration, and acceptance tests
evidence/            AI prompts, AI outputs, human reviews, and final corrections
.github/             GitHub Actions and repository automation
```

## Current Status

Core workflow implementation, automated tests, acceptance documentation, traceability, and Cloudflare deployment are complete for final demonstration readiness.

Known limitations and remaining final packaging tasks are documented in:

- `docs/testing/02-acceptance-test-results.md`
- `docs/testing/test-execution-report-2026-07-02.md`
- `docs/deployment/01-deployment-notes.md`
