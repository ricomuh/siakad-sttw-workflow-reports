# Workflow Report: CDC Perusahaan Portal

**Scenario:** perusahaan-portal  
**Date:** 2026-04-27  
**Role:** Perusahaan (hrd@techcorp.id)  
**URL Base:** http://127.0.0.1:8000

## Steps & Screenshots

### 1. My Loker List
![Loker List](screenshots/01_loker-list.png)
Perusahaan views their own job postings at `/cdc/portal/perusahaan/loker`.

### 2. Create Loker
![Create Loker](screenshots/02_loker-create.png)
Perusahaan creates a new job posting at `/cdc/portal/perusahaan/loker/create`.

### 3. Loker Detail
![Loker Detail](screenshots/03_loker-detail.png)
Perusahaan views full detail of one loker at `/cdc/portal/perusahaan/loker/{id}`.

### 4. Applicant List
![Lamaran List](screenshots/04_lamaran-list.png)
Perusahaan reviews applicants for a loker at `/cdc/portal/perusahaan/loker/{id}/lamaran`.

## Result
✅ Perusahaan portal fully functional: post loker, manage, view applicants. Auth guard + perusahaan middleware enforced.
