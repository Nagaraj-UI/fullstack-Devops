# 🔧 Alternative Solution: Change Backend Port

## Problem
Port 5000 is stuck in use by another process that won't die.

## Solution
Use a different port (like 5001) instead!

---

## ✅ Option 1: Run the Kill Script as Administrator

1. **Close ALL PowerShell windows**
2. **Right-click PowerShell** → **Run as Administrator**
3. **Navigate to project:**
   ```powershell
   cd C:\Users\admin\OrderNow
   ```
4. **Run the kill script:**
   ```powershell
   .\kill-port-5000.ps1
   ```
5. **Start backend:**
   ```bash
   cd backend
   npm run dev
   ```

---

## ✅ Option 2: Change to Port 5001 (Easier!)

If you can't run as Administrator, just use a different port:

### Step 1: Update Backend Port

I'll update your `.env` file to use port 5001:
