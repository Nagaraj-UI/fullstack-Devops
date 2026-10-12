# 🔄 Restart Frontend to Fix Connection

## ✅ I've Updated All Port References

**Changed:**
1. ✅ `backend/.env` → PORT=5001
2. ✅ `frontend/vite.config.js` → proxy target: 5001
3. ✅ `frontend/src/services/api.js` → API_BASE_URL: 5001

**All files now point to port 5001!**

---

## 🚀 Restart Frontend (DO THIS NOW)

### Step 1: Stop Frontend

In the terminal where frontend is running:
- Press **Ctrl + C**

### Step 2: Clear Cache and Restart

```bash
npm run dev
```

### Step 3: Check Browser

**Expected:**
- Browser opens to http://localhost:3000
- Status shows **🟢 Online** (green, top right)
- No "🔴 Offline" status

---

## 🧪 Verify Connection

### Method 1: Check Status Indicator

Look at the top-right of the page:
- ✅ **🟢 Online** = Connected to backend ✅
- ❌ **🔴 Offline** = Not connected ❌

### Method 2: Open Browser Console

1. Press **F12** to open DevTools
2. Go to **Console** tab
3. Look for API requests:

**Good (working):**
```
🌐 API Request: GET /api/employees
✅ API Response: /api/employees {success: true, count: 0, data: []}
```

**Bad (not working):**
```
❌ API Error: Network Error
or
❌ Failed to fetch
```

### Method 3: Check Network Tab

1. In DevTools, go to **Network** tab
2. Refresh the page (Ctrl+R)
3. Look for `/api/employees` request

**Check the URL:**
- ✅ Should be: `http://localhost:5001/api/employees`
- ❌ If shows: `http://localhost:5000/api/employees` → Need to restart frontend again

---

## 🎯 Test Adding an Employee

Once status shows **🟢 Online**:

1. **Fill in the form:**
   - Name: John Doe
   - Email: john@test.com
   - Position: Developer
   - Department: Engineering
   - Salary: 80000

2. **Click "➕ Add Employee"**

**Expected:**
- ✅ Green success notification appears
- ✅ John Doe appears in the table below
- ✅ No errors in console

---

## 🔍 Still Showing Port 5000?

If frontend is STILL trying to connect to port 5000:

### Hard Refresh the Browser

**Windows/Linux:**
- Press **Ctrl + Shift + R**

**Mac:**
- Press **Cmd + Shift + R**

This clears the browser cache.

---

## ✅ Success Indicators

You'll know it's working when:

1. **Status indicator:** 🟢 Online (green)
2. **Console shows:** Successful API calls to port 5001
3. **Can add employees:** Form submission works
4. **Network tab:** Shows requests to `localhost:5001`
5. **Backend terminal:** Shows incoming requests:
   ```
   2026-10-09T... - GET /api/employees
   2026-10-09T... - POST /api/employees
   ```

---

## 📊 Current Configuration Summary

| Component | Port | Status |
|-----------|------|--------|
| Backend API | 5001 | ✅ Running |
| Frontend | 3000 | ⏳ Needs restart |
| MongoDB | 27017 | ✅ Running |

**After frontend restart:**

| Component | Port | Status |
|-----------|------|--------|
| Backend API | 5001 | ✅ Running |
| Frontend | 3000 | ✅ Running |
| MongoDB | 27017 | ✅ Running |

---

## 🐛 Troubleshooting

### Frontend Still Shows 🔴 Offline

**Checklist:**
1. ✅ Backend running on 5001? (`npm run dev` in backend terminal)
2. ✅ Frontend restarted? (Ctrl+C and `npm run dev`)
3. ✅ Browser refreshed? (Ctrl+Shift+R)
4. ✅ No errors in backend terminal?
5. ✅ Backend accessible? (open http://localhost:5001/health in browser)

### Console Shows CORS Error

**Example error:**
```
Access to XMLHttpRequest at 'http://localhost:5001/api/employees' 
from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Fix:** Restart backend (backend/.env already has CORS_ORIGIN=http://localhost:3000)

### Console Shows 404 Not Found

**Check:**
- Is backend URL correct in Network tab?
- Should be `localhost:5001` not `localhost:5000`
- If wrong, restart frontend again

---

## 💬 What to Share if Still Not Working

1. **Frontend status:** 🟢 Online or 🔴 Offline?
2. **Browser console errors:** (F12 → Console tab)
3. **Network tab URL:** What URL is it trying to connect to?
4. **Backend terminal:** Any incoming requests logged?

---

## 🎉 Once Working

You should be able to:
- ✅ See 🟢 Online status
- ✅ Add employees via form
- ✅ View employees in table
- ✅ Edit employees (✏️ button)
- ✅ Delete employees (🗑️ button)
- ✅ See data in MongoDB Compass (Devops database)

**Phase 1 Complete!** 🚀

---

**Now restart your frontend and let me know what you see!**

