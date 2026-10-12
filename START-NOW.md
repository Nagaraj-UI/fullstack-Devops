# 🚀 START YOUR APPLICATION NOW - Port Changed to 5001

## ✅ I've Fixed Everything!

**What I changed:**
- ✅ Backend now uses port **5001** (instead of 5000)
- ✅ Frontend proxy updated to point to **5001**
- ✅ Both `.env` and `vite.config.js` updated

**Why:** Port 5000 is stuck in use by another process. Port 5001 is free!

---

## 📋 Start Your Application

### Step 1: Stop Current Backend (if running)

In your backend terminal:
- Press **Ctrl + C**

### Step 2: Start Backend on Port 5001

```bash
npm run dev
```

### ✅ Expected Output:

```
✅ MongoDB Connected: localhost
📊 Database: Devops
🚀 Employee Management API Server
🔗 Server running on: http://localhost:5001   ← PORT 5001 NOW!
🔗 Also available at: http://127.0.0.1:5001
💚 Health check: http://localhost:5001/health
```

**NO MORE "EADDRINUSE" ERROR!** ✅

---

### Step 3: Test Backend in Browser

**Open your browser and go to:**
```
http://localhost:5001/health
```

**You should see:**
```json
{
  "status": "healthy",
  "timestamp": "2026-10-09T...",
  "environment": "development",
  "database": "connected",
  "uptime": 5.123
}
```

---

### Step 4: Start Frontend

**Open a NEW terminal** (keep backend running):

```bash
cd frontend
npm run dev
```

**Expected:**
- Browser opens automatically to http://localhost:3000
- Shows "👥 Employee Management System"
- Status: **🟢 Online** (green)
- Form to add employees

---

## 🧪 Test the Complete Application

### Add an Employee:
- **Name:** John Doe
- **Email:** john@test.com
- **Position:** Developer
- **Department:** Engineering
- **Salary:** 80000
- **Status:** Active

Click **"➕ Add Employee"**

**Expected:**
- ✅ Success notification appears
- ✅ Employee shows in table below
- ✅ Frontend shows "🟢 Online"

---

### Verify in MongoDB Compass:
1. Open MongoDB Compass
2. Connect to **localhost:27017**
3. Open database: **Devops**
4. Open collection: **employees**
5. You should see John Doe's document

---

## 📊 URLs Reference

**After this change:**

| Service | OLD URL (broken) | NEW URL (working) |
|---------|------------------|-------------------|
| Backend API | ~~http://localhost:5000~~ | **http://localhost:5001** ✅ |
| Health Check | ~~http://localhost:5000/health~~ | **http://localhost:5001/health** ✅ |
| Employees API | ~~http://localhost:5000/api/employees~~ | **http://localhost:5001/api/employees** ✅ |
| Frontend | http://localhost:3000 | http://localhost:3000 (no change) |

---

## ⚠️ Important Notes

### Backend Port Changed
- Backend now runs on **5001**
- Frontend automatically proxies to **5001**
- Update any documentation/bookmarks to use **5001**

### Frontend Stays the Same
- Frontend still on **3000**
- No need to change anything in browser
- Just open: http://localhost:3000

### API Calls from Frontend
Frontend calls like `/api/employees` automatically proxy to `http://localhost:5001/api/employees` (Vite handles this)

---

## ✅ Success Checklist

- [ ] Backend starts without "EADDRINUSE" error
- [ ] Backend logs show "Server running on: http://localhost:5001"
- [ ] Can access http://localhost:5001/health in browser
- [ ] Health check returns `{"status": "healthy"}`
- [ ] Frontend starts without errors
- [ ] Browser opens to http://localhost:3000
- [ ] Frontend shows "🟢 Online" status
- [ ] Can add employees via form
- [ ] Employees appear in table
- [ ] Data visible in MongoDB Compass (Devops database)

---

## 🎉 When Everything Works

You've successfully:
- ✅ Built a full-stack application
- ✅ Configured MongoDB connection
- ✅ Resolved port conflicts
- ✅ Debugged real-world issues
- ✅ Learned DevOps troubleshooting

**Phase 1 is COMPLETE!** 🚀

---

## 🆘 If Backend Still Fails

If you STILL see "EADDRINUSE" on port 5001, something is seriously wrong.

**Run this diagnostic:**

```powershell
# Check what's using common ports
Get-NetTCPConnection -LocalPort 5000,5001,5002,3000 -ErrorAction SilentlyContinue | 
  Select-Object LocalPort, State, OwningProcess | 
  Format-Table
```

**Share the output with me and I'll help further!**

---

## 🎓 DevOps Lesson: Port Management

**What you learned:**
- Port conflicts are common in development
- Always have fallback ports (5000 → 5001 → 5002)
- In production: Kubernetes assigns ports automatically
- Load balancers don't care about port numbers
- Always configure ports via environment variables (like we did!)

**This is real DevOps problem-solving!** 💪

---

## 💬 Next Steps

Once application is running:

1. **Test all CRUD operations:**
   - Create employees ✅
   - Read/view employees ✅
   - Update employees ✅
   - Delete employees ✅

2. **Verify MongoDB persistence:**
   - Add employee
   - Restart backend
   - Employee still there ✅

3. **Confirm Phase 1 Complete:**
   - Application working end-to-end
   - Ready for Phase 2: Git & GitHub

---

**Now try starting the backend with `npm run dev` and let me know if it works!** 🚀

