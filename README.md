# Employee Management Application - DevOps Project

A full-stack employee management application built to demonstrate end-to-end DevOps practices including CI/CD, containerization, Kubernetes deployment, monitoring, and security.

## 🏗️ Architecture

```
Frontend (React + Vite) :3000
         ↓
Backend (Node.js + Express) :5000
         ↓
MongoDB :27017
```

## 🚀 Technology Stack

### Frontend
- React 18
- Vite (build tool)
- Axios (HTTP client)
- Modern CSS

### Backend
- Node.js
- Express.js
- Mongoose (MongoDB ODM)
- CORS enabled

### Database
- MongoDB (local instance)

## 📋 Features

- **Employee CRUD Operations**
  - Create new employees
  - View all employees
  - Update employee details
  - Delete employees

- **API Endpoints**
  - `GET /health` - Health check
  - `GET /api/employees` - Get all employees
  - `GET /api/employees/:id` - Get single employee
  - `POST /api/employees` - Create employee
  - `PUT /api/employees/:id` - Update employee
  - `DELETE /api/employees/:id` - Delete employee

## 🛠️ Local Development Setup

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB running on localhost:27017
- MongoDB Compass (optional, for database visualization)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd employee-management-app
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   npm run dev
   ```
   Backend will run on http://localhost:5000

3. **Setup Frontend** (in new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend will run on http://localhost:3000

4. **Verify MongoDB is running**
   - Check MongoDB Compass connection to localhost:27017
   - Database `employee_db` will be created automatically

### Testing the Application

1. Open http://localhost:3000 in your browser
2. Add a new employee using the form
3. View the employee list
4. Update or delete employees as needed

## 🧪 API Testing

Test the backend health endpoint:
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2026-10-09T...",
  "database": "connected"
}
```

## 📁 Project Structure

```
employee-management-app/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── services/     # API integration
│   │   ├── App.jsx       # Main app component
│   │   └── main.jsx      # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── backend/               # Node.js backend API
│   ├── src/
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # Express routes
│   │   ├── config/       # Configuration files
│   │   └── server.js     # Server entry point
│   └── package.json
│
└── README.md             # This file
```

## 🔄 Development Phases

- [x] **Phase 1:** Project Foundation (Current)
- [ ] **Phase 2:** Git and GitHub Workflow
- [ ] **Phase 3:** Docker Fundamentals
- [ ] **Phase 4:** Docker Registry and Amazon ECR
- [ ] **Phase 5:** AWS Fundamentals
- [ ] **Phase 6:** Terraform and Infrastructure as Code
- [ ] **Phase 7:** Jenkins and CI/CD
- [ ] **Phase 8:** GitHub Webhooks
- [ ] **Phase 9:** Kubernetes Fundamentals
- [ ] **Phase 10:** AWS EKS Deployment
- [ ] **Phase 11:** Continuous Deployment
- [ ] **Phase 12:** Monitoring and Observability
- [ ] **Phase 13:** DevSecOps and Secrets
- [ ] **Phase 14:** Reliability and Troubleshooting

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/employee_db
NODE_ENV=development
```

## 🐛 Troubleshooting

### Backend won't start
- Ensure MongoDB is running on localhost:27017
- Check if port 5000 is not in use
- Verify .env file exists and has correct values

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check browser console for CORS errors
- Verify API_URL in frontend configuration

### Database connection issues
- Open MongoDB Compass and verify connection
- Check MongoDB service is running
- Verify connection string in backend/.env

## 📚 Learning Objectives

This project demonstrates:
1. Full-stack JavaScript development
2. RESTful API design
3. MongoDB database integration
4. Environment-based configuration
5. Preparation for DevOps tooling (Docker, Kubernetes, CI/CD)

---

**Current Phase:** Phase 1 - Project Foundation  
**Status:** In Development  
**Next:** Git workflow and version control
