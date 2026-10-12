# 🔧 Fix Connection Issue - Step by Step

## 🎯 Current Situation

✅ Test server starts successfully  
✅ Port 5000 is open and listening  
❌ HTTP requests fail with "connection closed"  
❌ Even simple test server can't respond

**Diagnosis:** This is a **Windows PowerShell + Node.js compatibility issue** or firewall/network issue.

---

## 🚀 SOLUTION: Try These Fixes in Order

### Fix 1: Use curl Instead of PowerShell (Most Likely Fix)

PowerShell's `Invoke-RestMethod` sometimes has issues with localhost connections.

**With your test server still running**, try:

#### Option A: Use curl (if installed)
```bash
curl http://localhost:5000/test
```

#### Option B: Use your browser
1. Open your browser
2. Go to: **http://localhost:5000/test**
3. You should see JSON response

#### Option C: Use Git Bash (if you have Git installed)
```bash
curl http://localhost:5000/test
```

**If any of these work** → PowerShell is the issue, not your backend!

---

### Fix 2: Node.js IPv4 vs IPv6 Issue

Node.js might be binding to IPv6 (::1) but PowerShell is trying IPv4 (127.0.0.1).

**Stop your test server** (Ctrl+C), then modify it:

**Edit: `backend/test-connection.js`**

Change the listen line from:
```javascript
app.listen(PORT, () => {
```

To:
```javascript
app.listen(PORT, '0.0.0.0', () => {
```

This forces IPv4 binding.

**Restart test server:**
```bash
node test-connection.js
```

**Test in browser:** http://localhost:5000/test

---

### Fix 3: Windows Firewall

Windows Firewall might be blocking Node.js connections.

**Check firewall:**
1. Open Windows Defender Firewall
2. Click "Allow an app or feature through Windows Defender Firewall"
3. Look for "Node.js" in the list
4. Make sure both **Private** and **Public** are checked
5. If not listed, click "Allow another app" and add Node.js

**Or temporarily disable to test:**
```powershell
# Run as Administrator
Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled False

# Test your backend

# Re-enable after testing:
Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled True
```

---

### Fix 4: Use Browser for Testing

**Simplest solution: Use your browser instead of PowerShell!**

1. **Keep test server running**
2. **Open browser**
3. **Go to:** http://localhost:5000/test
4. **You should see:**
   ```json
   {
     "message": "Backend is working!",
     "timestamp": "2026-10-09T..."
   }
   ```

**If browser works** → Use browser for testing, ignore PowerShell issues!

---

## 🎯 Let's Get Your Real Backend Working

Once you confirm the test server works (using browser or curl), let's start the real backend.

### Step 1: Stop Test Server
Press **Ctrl+C** in the terminal running test-connection.js

### Step 2: Fix Main Server for IPv4

Let's update the main server to use IPv4 explicitly:

**I'll update the file for you:**
