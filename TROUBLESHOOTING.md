# 🔧 Troubleshooting Guide - Backend Connection Issues

## 🚨 Current Issue

**Symptom:** Backend port 5000 is open, but HTTP requests fail with connection closed error.

**Likely Causes:**
1. Backend is crashing after startup
2. MongoDB connection failing
3. Backend code has an error
4. Node.js/npm module issue

---

## 🔍 Step-by-Step Troubleshooting

### Step 1: Check Backend Terminal

**Look at the terminal where you ran `npm run dev`**

#### ✅ Good Signs (Backend Working):
```
✅ MongoDB Connected: localhost
📊 Database: Devops
🔗 Server running on: http://localhost:5000
```

#### ❌ Bad Signs (Backend Crashing):
```
❌ MongoDB Connection Error
Error: connect ECONNREFUSED
UnhandledPromiseRejectionWarning
process.exit(1)
```

**What to check:**
- Is the backend terminal still running?
- Are there any red error messages?
- Did it exit/crash?

---

### Step 2: Is MongoDB Running?

The most common cause is MongoDB not running.

#### Check MongoDB Status:

**Option 1: MongoDB Compass**
- Open MongoDB Compass
- Try to connect to `localhost:27017`
- If it fails → MongoDB is not running

**Option 2: Command Line**
```powershell
# Try to connect to MongoDB
Test-NetConnection -ComputerName localhost -Port 27017
```

**Expected Result:**
```
TcpTestSucceeded : True
```

If `False` → **MongoDB is not running!**

#### ✅ How to Start MongoDB:

**Windows:**
1. **Check if MongoDB service exists:**
   ```powershell
   Get-Service -Name MongoDB*
   ```

2. **Start MongoDB service:**
   ```powershell
   Start-Service -Name MongoDB
   # Or
   net start MongoDB
   ```

3. **If MongoDB installed but no service:**
   - Find MongoDB installation directory (usually `C:\Program Files\MongoDB\Server\<version>\bin`)
   - Run: `mongod --dbpath "C:\data\db"`

4. **If MongoDB not installed:**
   - Download from: https://www.mongodb.com/try/download/community
   - Install and start the service

**Verify MongoDB is Running:**
- Open MongoDB Compass
- Connect to `localhost:27017`
- Should show connected

---

### Step 3: Restart Backend with Detailed Logs

1. **Stop the backend** (if running):
   - Press `Ctrl + C` in backend terminal

2. **Clear any old processes on port 5000:**
   ```powershell
   # Find process using port 5000
   netstat -ano | findstr :5000
   
   # Kill the process (replace <PID> with the number from above)
   taskkill /PID <PID> /F
   ```

3. **Start backend again:**
   ```bash
   cd backend
   npm run dev
   ```

4. **Watch the startup logs carefully:**
   - Look for any errors
   - Wait for "MongoDB Connected" message
   - Should see "Server running on: http://localhost:5000"

---

### Step 4: Test Backend Manually

Once backend is running with no errors, test it:

**Test 1: Health Check**
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/health"
```

**Expected Response:**
```json
{
  "status": "healthy",
  "timestamp": "...",
  "environment": "development",
  "database": "connected",
  "uptime": 5.123
}
```

**Test 2: Root Endpoint**
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/"
```

**Expected Response:**
```json
{
  "message": "Employee Management API",
  "version": "1.0.0",
  "endpoints": {...}
}
```

---

## 🐛 Common Issues and Solutions

### Issue 1: MongoDB Connection Refused

**Error in Backend Logs:**
```
❌ MongoDB Connection Error: connect ECONNREFUSED localhost:27017
💡 Make sure MongoDB is running on localhost:27017
```

**Solution:**
1. Start MongoDB service (see Step 2 above)
2. Verify in MongoDB Compass
3. Restart backend

---

### Issue 2: Port 5000 Already in Use

**Error in Backend Logs:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
```powershell
# Find what's using port 5000
netstat -ano | findstr :5000

# Output will show something like:
# TCP    0.0.0.0:5000    0.0.0.0:0    LISTENING    12345

# Kill that process (replace 12345 with actual PID)
taskkill /PID 12345 /F

# Or change the port in backend/.env:
PORT=5001
```

If changing port, also update frontend proxy in `frontend/vite.config.js`:
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5001',  // Changed from 5000
    ...
  }
}
```

---

### Issue 3: Node Modules Corrupted

**Symptoms:**
- Backend crashes immediately
- Module not found errors
- Strange behavior

**Solution:**
```bash
cd backend
rm -rf node_modules
rm package-lock.json
npm install
npm run dev
```

---

### Issue 4: MongoDB URI Wrong

**Error in Backend Logs:**
```
MongoServerError: Invalid connection string
```

**Solution:**
Check `backend/.env`:
```bash
# Should be:
MONGODB_URI=mongodb://localhost:27017/Devops

# NOT:
MONGODB_URI=localhost:27017/Devops  # Missing "mongodb://"
```

---

## 📋 Diagnostic Checklist

Run through this checklist:

### Backend Checks:
- [ ] Backend terminal is running (not crashed/exited)
- [ ] No red error messages in terminal
- [ ] See "MongoDB Connected" message
- [ ] See "Server running on: http://localhost:5000"
- [ ] Port 5000 is listening: `Test-NetConnection -ComputerName localhost -Port 5000` → True

### MongoDB Checks:
- [ ] MongoDB Compass can connect to localhost:27017
- [ ] Port 27017 is open: `Test-NetConnection -ComputerName localhost -Port 27017` → True
- [ ] MongoDB service is running (Windows Services)

### API Checks:
- [ ] Health check responds: `Invoke-RestMethod -Uri "http://localhost:5000/health"`
- [ ] Root endpoint responds: `Invoke-RestMethod -Uri "http://localhost:5000/"`
- [ ] No CORS errors in browser console

### Configuration Checks:
- [ ] `backend/.env` exists
- [ ] `MONGODB_URI=mongodb://localhost:27017/Devops`
- [ ] `PORT=5000`
- [ ] `CORS_ORIGIN=http://localhost:3000`

---

## 🎯 Most Likely Solutions

Based on your symptoms, try these in order:

### 1. **Start MongoDB** (Most Common Issue)
```powershell
# Check if MongoDB service exists
Get-Service -Name MongoDB*

# Start it
Start-Service -Name MongoDB

# Verify in Compass
```

### 2. **Restart Backend**
```bash
# Ctrl+C to stop
cd backend
npm run dev
```

### 3. **Check Backend Logs**
- Look for the exact error message
- Share it if you need help

---

## 📸 Screenshot Request

To help diagnose, please take screenshots of:

1. **Backend Terminal** - Full startup output with any errors
2. **MongoDB Compass** - Connection status
3. **Browser Console** (F12) - Any error messages
4. **Browser Network Tab** - Failed requests

---

## 🆘 Emergency Backend Test

If backend keeps failing, try this minimal test:

**Create test file: `backend/test-server.js`**
```javascript
const express = require('express');
const app = express();

app.get('/test', (req, res) => {
  res.json({ message: 'Server works!' });
});

app.listen(5000, () => {
  console.log('Test server on port 5000');
});
```

**Run it:**
```bash
node backend/test-server.js
```

**Test:**
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/test"
```

If this works → Issue is in your main server.js  
If this fails → Node.js or system issue

---

## 💬 Next Steps

Please run through the diagnostic checklist and share:

1. **Backend terminal output** - Copy the full startup logs
2. **Any error messages** you see
3. **MongoDB Compass status** - Can it connect?
4. **Results of this command:**
   ```powershell
   Test-NetConnection -ComputerName localhost -Port 27017
   ```

With this information, I can help you fix the exact issue!

---

## 🎓 Why This Happens (Learning)

**DevOps Lesson:** This is a classic three-tier architecture dependency issue:

```
Frontend (3000) → Backend (5000) → MongoDB (27017)
```

If MongoDB (27017) is down:
- Backend can start (port 5000 opens)
- But crashes when trying to connect to MongoDB
- Frontend gets "connection closed" error

**In Production:**
- Kubernetes health checks would detect this
- Unhealthy pods wouldn't receive traffic
- Monitoring would alert you immediately
- Auto-healing would restart the pod

**This is why we built health checks in Phase 1!**

