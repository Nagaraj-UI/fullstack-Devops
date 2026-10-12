# 🚀 Quick Start Guide

## ⚡ TL;DR - Start the Application

### 1️⃣ Start Backend
```bash
cd backend
npm run dev
```
✅ Wait for: "✅ MongoDB Connected" + "📊 Database: Devops"

### 2️⃣ Start Frontend (New Terminal)
```bash
cd frontend
npm run dev
```
✅ Browser opens to: http://localhost:3000

### 3️⃣ Verify
- Status shows: **🟢 Online**
- Add an employee using the form
- See it in the table
- Check MongoDB Compass: **Devops → employees**

---

## 🔧 Quick Commands

### Test Health
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/health"
```

### Get All Employees
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/employees"
```

### Add Employee via API
```powershell
$body = @{
    name = "Test User"
    email = "test@example.com"
    position = "Developer"
    department = "Engineering"
    salary = 60000
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/employees" `
    -Method Post `
    -Body $body `
    -ContentType "application/json"
```

### Stop Servers
Press **Ctrl + C** in each terminal

### Verify Setup
```powershell
.\scripts\verify-phase1.ps1
```

---

## 📍 Important URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000 |
| Health Check | http://localhost:5000/health |
| Employees API | http://localhost:5000/api/employees |
| MongoDB | localhost:27017 |
| Database | Devops |
| Collection | employees |

---

## 🎯 Quick Test

1. **Add Employee**
   - Name: John Doe
   - Email: john@test.com
   - Position: Developer
   - Department: Engineering
   - Salary: 80000

2. **Verify in Table** - Shows immediately

3. **Verify in MongoDB Compass**
   - Database: Devops
   - Collection: employees
   - Document count: 1

4. **Edit Employee** - Click ✏️, change salary, save

5. **Delete Employee** - Click 🗑️, confirm

---

## ❌ Common Errors

| Error | Solution |
|-------|----------|
| Database shows "employee_db" | 1. Stop backend<br>2. Check `backend/.env` has `Devops`<br>3. Restart backend |
| Frontend shows 🔴 Offline | 1. Check backend is running<br>2. Test health endpoint |
| Port 5000 in use | Kill process or change port in `.env` |
| MongoDB connection failed | Verify MongoDB running in Compass |

---

## 📁 Configuration Files

### backend/.env
```bash
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/Devops
CORS_ORIGIN=http://localhost:3000
```

---

## ✅ Verification Checklist

Quick checks:

- [ ] Backend shows "Database: Devops" (not "employee_db")
- [ ] Frontend shows "🟢 Online"
- [ ] Can add employee via form
- [ ] Employee appears in table
- [ ] Data visible in MongoDB Compass
- [ ] Can edit and delete employees
- [ ] No errors in browser console (F12)

---

## 📚 Full Documentation

- **PHASE1-VERIFICATION-GUIDE.md** - Complete step-by-step verification
- **SETUP.md** - Detailed setup instructions
- **docs/PHASE1-CONCEPTS.md** - Concepts and learning material
- **README.md** - Project overview

---

## 🆘 Need Help?

1. Check **PHASE1-VERIFICATION-GUIDE.md** for detailed troubleshooting
2. Review backend terminal logs for errors
3. Check browser console (F12) for frontend errors
4. Verify MongoDB connection in Compass

---

**Status:** Phase 1 Complete ✅  
**Next:** Phase 2 - Git and GitHub Workflow

