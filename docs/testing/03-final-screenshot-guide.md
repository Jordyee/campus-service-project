# Final Screenshot Guide

## Purpose

This guide explains how to capture final visual evidence for the Campus Service Request and Maintenance System after the final deployment sync.

Screenshots are manual evidence. They should show the implemented public app and should not replace automated tests, acceptance results, or deployment checks.

## Target URL

Use the public Cloudflare Worker URL:

<https://campus-service-project.gerungan-dj.workers.dev>

## Recommended Screenshot Folder

Save final screenshots under:

```text
evidence/Screenshoots/final/
```

Use clear file names so the screenshots can be referenced from a report:

```text
01-login-page.png
02-reporter-create-report.png
03-reporter-detail-comment.png
04-admin-review-assign.png
05-technician-progress-resolved.png
06-admin-close-reopen.png
07-manager-dashboard.png
08-health-check.png
```

## Demo Login Accounts

The demo login uses seeded actor IDs as both username and password.

| Role | Username | Password |
|---|---|---|
| Reporter | `user-reporter-1` | `user-reporter-1` |
| Administrator | `user-admin-1` | `user-admin-1` |
| Technician | `user-tech-1` | `user-tech-1` |
| Facility Manager | `user-manager-1` | `user-manager-1` |

This is a demo-only actor context, not production authentication.

## Before Capturing

1. Open Chrome or Edge.
2. Open an incognito/private window so old local storage does not affect the demo.
3. Go to <https://campus-service-project.gerungan-dj.workers.dev>.
4. Set browser zoom to 100%.
5. Use a desktop-sized window if possible.
6. Do not enter real personal data. Use demo data only.

## Screenshot Steps

### 1. Login Page

1. Open the public URL.
2. Confirm the login screen shows email/campus ID, password, and role buttons.
3. Capture `01-login-page.png`.

### 2. Reporter Creates A Request

1. Select `Reporter`.
2. Enter username `user-reporter-1`.
3. Enter password `user-reporter-1`.
4. Click `Sign In`.
5. In `Create Report`, enter demo data:
   - Issue Title: `Demo AC tidak dingin`
   - Location: `Gedung A - Ruang 203`
   - Category: `AC`
   - Reporter Name: `Rina Reporter`
   - Reporter Contact: `reporter@example.edu`
   - Detailed Description: `AC ruangan tidak dingin saat kelas berlangsung.`
6. Capture the filled form before submit as `02-reporter-create-report.png`.
7. Click `Submit Report`.
8. Confirm the report appears in `My Service Requests`.

### 3. Reporter Detail And Comment

1. Open the newly created report from the list.
2. Confirm status is `Submitted`.
3. Add a comment such as `Mohon dicek sebelum jadwal kelas berikutnya.`
4. Confirm the comment appears in the detail timeline.
5. Capture `03-reporter-detail-comment.png`.
6. Click `Sign Out`.

### 4. Administrator Review And Assignment

1. Log in as Administrator:
   - Username: `user-admin-1`
   - Password: `user-admin-1`
2. Open the submitted report.
3. Use the admin panel to start review.
4. Set category/priority if needed.
5. Assign the seeded technician.
6. Confirm status becomes `Assigned`.
7. Capture `04-admin-review-assign.png`.
8. Click `Sign Out`.

### 5. Technician Progress And Resolution

1. Log in as Technician:
   - Username: `user-tech-1`
   - Password: `user-tech-1`
2. Open the assigned task.
3. Accept the task.
4. Mark it `In Progress`.
5. Add a short progress note.
6. Mark it `Resolved`.
7. Confirm status history shows the technician progress.
8. Capture `05-technician-progress-resolved.png`.
9. Click `Sign Out`.

### 6. Administrator Close And Reopen

1. Log in again as Administrator.
2. Open the resolved report.
3. Close the report.
4. Capture the closed state if visible.
5. Reopen it with a reason such as `Reporter requested follow-up check.`
6. Confirm status returns to `Under Review` and history records the reason.
7. Capture `06-admin-close-reopen.png`.
8. Click `Sign Out`.

### 7. Facility Manager Dashboard

1. Log in as Facility Manager:
   - Username: `user-manager-1`
   - Password: `user-manager-1`
2. Open the dashboard.
3. Confirm counts by status, category, priority, and recent reports are visible.
4. Capture `07-manager-dashboard.png`.
5. Click `Sign Out`.

### 8. Health Check

1. Open this URL in a browser tab:

```text
https://campus-service-project.gerungan-dj.workers.dev/api/health
```

2. Confirm it returns JSON with status `ok`.
3. Capture `08-health-check.png`.

## After Capturing

1. Check every image is readable.
2. Confirm no browser password manager popups, personal accounts, or unrelated tabs are visible.
3. Confirm screenshots use demo data only.
4. Add or reference the screenshot file names in the final report if required by the course.

## Notes

- If the remote demo database already contains old reports, that is acceptable as long as the screenshots clearly show the new demo request created during this final run.
- If a screenshot must show an empty dashboard/list, use the documented deployment smoke result instead of deleting remote data.
- Do not run `npm audit fix` while collecting screenshot evidence.
