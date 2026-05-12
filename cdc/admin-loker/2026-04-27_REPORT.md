# Workflow Report: CDC Admin Loker

**Scenario:** admin-loker  
**Date:** 2026-04-27  
**Role:** Admin  
**URL Base:** http://127.0.0.1:8000

## Steps & Screenshots

### 1. Loker List
![Loker List](screenshots/01_loker-list.png)
Admin views all job postings at `/cdc/admin/loker`. Status badges distinguish Aktif/Menunggu/Ditolak.

### 2. Loker Menunggu Detail
![Loker Menunggu](screenshots/02_loker-menunggu-detail.png)
Admin reviews a pending loker and can approve or reject.

## Result
✅ Admin can moderate loker submissions. Permission `cdc.loker.manage` is enforced.
