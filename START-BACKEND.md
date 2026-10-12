# 🚀 Start Backend - Simple Guide

## ✅ I've Fixed the Server Configuration

**What I changed:** Made the backend bind to all network interfaces (0.0.0.0) which fixes Windows IPv4/IPv6 compatibility issues.

---

## 📋 Steps to Start Backend

### 1. Stop Test Server (if running)
In the terminal running `test-connection.js`:
- Press **Ctrl + C**

### 2. Start Real Backend
```bash
cd backend
npm run dev
```

⚠️ **Note:** Type `npm` not `nom` 😊

### 3. Wait for Success Messages

**You should see:**
```
✅ MongoDB Connected: localhost
📊 Database: Devops
🚀 Employee Management API Server
🔗 Server running on: http://localhost:5000
🔗 Also available at: http://127.0.0.1:5000
💚 Health check: http://localhost:5000/health
```

---

## 🧪 Test the Backend

### Method 1: Use Your Browser (Easiest!)

1. **Open your browser**
2. **Go to:** http://localhost:5000/health
3. **You should see:**
   ```json
   {
     "status": "healthy",
     "timestamp": "2026-10-09T...",
     "environment": "development",
     "database": "connected",
     "uptime": 5.123
   }
   ```

### Method 2: Use PowerShell

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/health"
```

### Method 3: Use curl (if you have it)

```bash
curl http://localhost:5000/health
```

---

## 🎯 If Backend Starts Successfully

Once you see the success messages and can access http://localhost:5000/health in your browser:

### Start the Frontend

**Open a NEW terminal** (keep backend running):

```bash
cd frontend
npm run dev
```

**Browser should automatically open to:** http://localhost:3000

---

## ❌ If Backend Still Fails

### Check 1: Is MongoDB Running?

**Open MongoDB Compass** → Connect to `localhost:27017`

✅ **Can connect** → MongoDB is working  
❌ **Can't connect** → Need to start MongoDB

**Start MongoDB:**
```powershell
# Check MongoDB service
Get-Service | Where-Object {$_.Name -like "*mongo*"}

# Start it
Start-Service -Name MongoDB
```

### Check 2: Backend Error Messages

**Look at your backend terminal** after running `npm run dev`.

**Copy any red error messages** and share them.

Common errors:
- `ECONNREFUSED` → MongoDB not running
- `EADDRINUSE` → Port 5000 already in use
- `Cannot find module` → Run `npm install` again

---

## 🔄 Emergency Reset

If nothing works, do a complete reset:

### 1. Kill Everything
```powershell
# Kill all node processes
taskkill /F /IM node.exe

# Restart MongoDB
Restart-Service -Name MongoDB
```

### 2. Wait 10 seconds

### 3. Start Backend
```bash
cd backend
npm run dev
```

### 4. Test in Browser
http://localhost:5000/health

---

## ✅ Success Checklist

Once backend is working:

- [ ] Backend terminal shows "MongoDB Connected"
- [ ] Backend terminal shows "Server running on"
- [ ] Browser can load: http://localhost:5000/health
- [ ] Health check shows: `"database": "connected"`
- [ ] No red errors in terminal

**Once all checked** → Ready to start frontend!

---

## 🚀 Full Application Startup

### Terminal 1: Backend
```bash
cd backend
npm run dev
```
Wait for "MongoDB Connected" and "Server running"

### Terminal 2: Frontend
```bash
cd frontend  
npm run dev
```
Browser opens automatically to http://localhost:3000

### Verify
- Frontend shows "🟢 Online" status
- Can add/view/edit/delete employees
- Data persists in MongoDB Compass (Devops database)

---

## 💬 What to Share if It Still Doesn't Work

1. **Backend terminal output** (all text from `npm run dev`)
2. **Can you access** http://localhost:5000/health **in your browser?** (Yes/No)
3. **MongoDB Compass** - Can it connect to localhost:27017? (Yes/No)
4. **Any error messages** you see

---

## 🎓 What We Learned (DevOps Context)

**Issue:** IPv4/IPv6 binding conflict on Windows

**Solution:** Bind to `0.0.0.0` (all interfaces)

**In Production:**
- Docker/Kubernetes handle this automatically
- Load balancers use IP-agnostic routing
- Health checks work regardless of IPv4/IPv6
- This is why we test locally before deploying!

**You just learned real-world debugging!** 🎉

