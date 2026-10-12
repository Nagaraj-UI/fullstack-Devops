# Phase 1: Local Development Setup Guide

## Prerequisites Verification

✅ **Confirmed on your system:**
- Node.js v24.11.0
- npm v11.6.1
- Git v2.44.0.windows.1
- Docker v29.5.2
- MongoDB Compass (with localhost:27017 connection)

## Step-by-Step Setup Instructions

### 1. Verify MongoDB is Running

Open MongoDB Compass and ensure you have an active connection to `localhost:27017`.

**Test Connection:**
```bash
# MongoDB should be running on default port 27017
# You can verify in MongoDB Compass or test with:
# mongodb://localhost:27017
```

### 2. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
copy .env.example .env

# Start the backend server
npm run dev
```

**Expected Output:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Employee Management API Server
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌍 Environment: development
🔗 Server running on: http://localhost:5000
💚 Health check: http://localhost:5000/health
📡 API endpoint: http://localhost:5000/api/employees
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ MongoDB Connected: localhost
📊 Database: employee_db
```

**Test Backend:**
Open a new terminal and test the health endpoint:
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2026-10-09T...",
  "environment": "development",
  "database": "connected",
  "uptime": 5.123
}
```

### 3. Setup Frontend (New Terminal)

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

**Expected Output:**
```
VITE v5.0.0  ready in 500 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
➜  press h + enter to show help
```

The browser should automatically open to `http://localhost:3000`.

### 4. Verify the Application

1. **Frontend loads successfully** - You should see the "Employee Management System" header
2. **Health status shows green** - "🟢 Online" in the top right
3. **Add a test employee:**
   - Name: John Doe
   - Email: john.doe@company.com
   - Position: Senior Developer
   - Department: Engineering
   - Salary: 80000
   - Status: Active

4. **Verify in MongoDB Compass:**
   - Connect to `localhost:27017`
   - Database: `employee_db`
   - Collection: `employees`
   - You should see your employee document

### 5. Test All CRUD Operations

**CREATE:** ✅ Add an employee using the form  
**READ:** ✅ View the employee list  
**UPDATE:** ✅ Click edit (✏️) button, modify details, save  
**DELETE:** ✅ Click delete (🗑️) button, confirm deletion

## Architecture Flow

```
Browser (http://localhost:3000)
    ↓
React Frontend (Vite Dev Server)
    ↓ HTTP Requests
Backend API (http://localhost:5000)
    ↓ Mongoose
MongoDB (localhost:27017)
    ↓
Database: employee_db
```

## Troubleshooting

### Backend won't start

**Problem:** `MongoDB Connection Error`  
**Solution:** 
- Ensure MongoDB is running
- Check MongoDB Compass connection to localhost:27017
- Verify no firewall blocking port 27017

**Problem:** `Port 5000 is already in use`  
**Solution:**
- Change PORT in `backend/.env` to 5001
- Update frontend proxy in `frontend/vite.config.js`

### Frontend won't start

**Problem:** `Port 3000 is already in use`  
**Solution:**
- Change port in `frontend/vite.config.js`
- Or kill the process using port 3000

**Problem:** `Network Error` or `API connection failed`  
**Solution:**
- Ensure backend is running on port 5000
- Check browser console for CORS errors
- Verify backend health: `curl http://localhost:5000/health`

### Database Connection Issues

**Problem:** `MongoServerError: Connection refused`  
**Solution:**
- Start MongoDB service
- Verify connection string in `backend/.env`
- Check MongoDB Compass can connect

### No employees showing after adding

**Problem:** Empty list after form submission  
**Solution:**
- Check browser console for errors
- Verify backend logs for database errors
- Check MongoDB Compass to see if data was saved

## Important Files

### Backend Environment (.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/employee_db
CORS_ORIGIN=http://localhost:3000
```

### Frontend Configuration
- API proxy configured in `vite.config.js`
- Connects to backend automatically

## Development Workflow

1. **Start Backend:** `cd backend && npm run dev`
2. **Start Frontend:** `cd frontend && npm run dev`
3. **Make changes** to code - both will auto-reload
4. **View logs** in respective terminals
5. **Check MongoDB** using Compass for data verification

## What We've Accomplished (Phase 1)

✅ Full-stack JavaScript application  
✅ React frontend with modern UI  
✅ Node.js/Express backend with RESTful API  
✅ MongoDB integration with Mongoose  
✅ CRUD operations working  
✅ Form validation  
✅ Error handling  
✅ Health check endpoint  
✅ Environment-based configuration  
✅ Local development environment  

## Next Phase Preview

**Phase 2: Git and GitHub Workflow**
- Initialize Git repository
- Create .gitignore
- Commit structure
- Branching strategy
- Push to GitHub
- README documentation

---

**Current Status:** ✅ Phase 1 Complete  
**Ready for:** Phase 2 - Git and GitHub Workflow
