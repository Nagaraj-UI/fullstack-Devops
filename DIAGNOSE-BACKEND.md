# 🔍 Backend Diagnosis Guide

## Current Status

✅ **Port 5000:** Open and listening  
✅ **Port 27017 (MongoDB):** Open and listening  
❌ **HTTP Requests:** Failing with "connection closed"

**Diagnosis:** Backend is starting but crashing or not responding to HTTP requests.

---

## 🚨 MOST LIKELY ISSUE: Backend Crashed After Startup

### What's Happening:
1. Backend starts → Opens port 5000
2. Tries to connect to MongoDB
3. **Something goes wrong** → Backend crashes
4. Port 5000 still appears open briefly
5. HTTP requests fail because backend isn't actually running

---

## 🔧 Immediate Action Required

### Step 1: Look at Your Backend Terminal

**Go to the terminal where you ran `npm run dev`**

**What do you see?**

#### Option A: Backend is running (good)
```
✅ MongoDB Connected: localhost
📊 Database: Devops
🔗 Server running on: http://localhost:5000
```
→ If you see this, backend is working! Skip to Step 3.

#### Option B: Backend crashed (problem)
```
❌ MongoDB Connection Error
Or process exited
Or command prompt returned (not running anymore)
```
→ This is the issue! Continue to Step 2.

#### Option C: Backend stuck/frozen
```
Waiting for MongoDB connection...
(and nothing happens)
```
→ MongoDB connection issue. Continue to Step 2.

---

### Step 2: Diagnose Why Backend is Crashing

#### Test A: MongoDB Connection

**Open MongoDB Compass and try to connect to `localhost:27017`**

**Can you connect?**

✅ **YES** → MongoDB is working. Issue is in backend code.  
❌ **NO** → MongoDB is not running properly.

**If MongoDB Compass can't connect:**

```powershell
# Check MongoDB service status
Get-Service | Where-Object {$_.Name -like "*mongo*"}

# Try to start MongoDB service
Start-Service -Name MongoDB

# Or if MongoDB installed differently:
net start MongoDB
```

#### Test B: Run Test Server

**This will help identify if it's a MongoDB issue or code issue.**

1. **Stop the main backend** (Ctrl+C if running)

2. **Run the test server:**
   ```bash
   cd backend
   node test-connection.js
   ```

3. **In another terminal, test it:**
   ```powershell
   Invoke-RestMethod -Uri "http://localhost:5000/test"
   ```

**Results:**

✅ **Test server works** → Issue is with MongoDB connection in main server  
❌ **Test server also fails** → Issue is with Node.js, Express, or system

---

### Step 3: Test Real Backend Health

**If backend is running, test it:**

```powershell
# Test 1: Root endpoint
Invoke-RestMethod -Uri "http://localhost:5000/"

# Test 2: Health check
Invoke-RestMethod -Uri "http://localhost:5000/health"

# Test 3: Employees endpoint
Invoke-RestMethod -Uri "http://localhost:5000/api/employees"
```

**Any of these should work if backend is running.**

---

## 🎯 Quick Fix Scenarios

### Scenario 1: "Backend terminal shows it crashed"

**You'll see something like:**
```
❌ MongoDB Connection Error: connect ECONNREFUSED localhost:27017
💡 Make sure MongoDB is running on localhost:27017
```

**Fix:**
1. Start MongoDB service
2. Restart backend: `npm run dev`

---

### Scenario 2: "Backend terminal shows it's running, but requests fail"

**Backend logs show:**
```
✅ MongoDB Connected
🔗 Server running on: http://localhost:5000
```

**But PowerShell test fails.**

**Fix - Port conflict:**
```powershell
# Kill all node processes
taskkill /F /IM node.exe

# Restart backend
cd backend
npm run dev

# Test again
Invoke-RestMethod -Uri "http://localhost:5000/health"
```

---

### Scenario 3: "MongoDB connection timeout"

**Backend hangs at:**
```
Attempting to connect to MongoDB...
(waits forever)
```

**Fix - MongoDB not accepting connections:**
1. Close MongoDB Compass
2. Restart MongoDB service:
   ```powershell
   Restart-Service -Name MongoDB
   ```
3. Wait 10 seconds
4. Start backend: `npm run dev`

---

## 📋 Complete Diagnostic Commands

Run these commands and share the results:

### Command 1: Check MongoDB
```powershell
Test-NetConnection -ComputerName localhost -Port 27017
```
Expected: `TcpTestSucceeded : True`

### Command 2: Check Backend Port
```powershell
Test-NetConnection -ComputerName localhost -Port 5000
```
Expected: `TcpTestSucceeded : True`

### Command 3: Check MongoDB Service
```powershell
Get-Service | Where-Object {$_.Name -like "*mongo*"}
```
Expected: Status = `Running`

### Command 4: Check Node Processes
```powershell
Get-Process -Name node -ErrorAction SilentlyContinue
```
Should show node.exe processes if backend is running

### Command 5: Test Backend
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/health"
```
Expected: JSON response with status "healthy"

---

## 🆘 Emergency Restart Procedure

If nothing else works, do a complete restart:

### 1. Stop Everything
```powershell
# Kill all node processes
taskkill /F /IM node.exe

# Close MongoDB Compass if open

# Restart MongoDB service
Restart-Service -Name MongoDB
```

### 2. Wait 10 seconds

### 3. Start Backend
```bash
cd backend
npm run dev
```

### 4. Wait for Success Messages
Look for:
```
✅ MongoDB Connected: localhost
📊 Database: Devops
🔗 Server running on: http://localhost:5000
```

### 5. Test Health
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/health"
```

### 6. Start Frontend
```bash
cd frontend
npm run dev
```

---

## 📸 What I Need to See

To help you further, please copy and paste:

### 1. Backend Terminal Output
```
# Copy everything from when you ran npm run dev
# Include any error messages
```

### 2. MongoDB Compass Status
```
# Can you connect? Yes/No
# What do you see?
```

### 3. PowerShell Test Results
```powershell
# Run this and copy the output:
Invoke-RestMethod -Uri "http://localhost:5000/health"
```

### 4. Service Status
```powershell
# Run this and copy the output:
Get-Service | Where-Object {$_.Name -like "*mongo*"}
```

---

## 💡 Understanding the Problem

### Why Port is Open But Requests Fail:

```
Timeline:
1. Backend starts → Port 5000 binds
2. Backend tries to connect to MongoDB
3. Connection fails → Backend crashes
4. Port 5000 may remain "half-open"
5. HTTP requests get connection, but no response
6. "Connection closed" error
```

### In Production (What We'll Learn):
- **Kubernetes health checks** detect this immediately
- **Readiness probe** prevents traffic to unhealthy pods
- **Liveness probe** restarts crashed containers
- **Monitoring alerts** notify you instantly

---

## 🎯 Next Steps

**Please do this:**

1. **Go to your backend terminal**
2. **Copy the full output** (all text since you ran `npm run dev`)
3. **Share it with me** - I need to see the exact errors
4. **Test MongoDB Compass** - Can you connect to localhost:27017?
5. **Run the PowerShell commands above** and share results

With this information, I can give you the exact fix!

---

## 🔍 Common Error Messages and Solutions

| Error Message | Cause | Solution |
|--------------|-------|----------|
| `ECONNREFUSED` | MongoDB not running | Start MongoDB service |
| `EADDRINUSE` | Port 5000 in use | Kill node process, restart |
| `MongoServerError` | MongoDB auth/config | Check connection string |
| `Cannot find module` | Missing dependencies | `npm install` |
| `Timeout` | MongoDB not responding | Restart MongoDB |

