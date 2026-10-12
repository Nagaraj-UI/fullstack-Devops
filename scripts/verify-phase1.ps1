# Phase 1 Verification Script
# Verifies that all Phase 1 components are working correctly

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Phase 1 Verification Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$errors = @()
$warnings = @()

# Check Node.js
Write-Host "Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js installed: $nodeVersion" -ForegroundColor Green
} catch {
    $errors += "❌ Node.js not found. Please install Node.js"
    Write-Host "❌ Node.js not found" -ForegroundColor Red
}

# Check npm
Write-Host "Checking npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✅ npm installed: $npmVersion" -ForegroundColor Green
} catch {
    $errors += "❌ npm not found. Please install npm"
    Write-Host "❌ npm not found" -ForegroundColor Red
}

# Check Git
Write-Host "Checking Git..." -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "✅ Git installed: $gitVersion" -ForegroundColor Green
} catch {
    $warnings += "⚠️  Git not found (needed for Phase 2)"
    Write-Host "⚠️  Git not found" -ForegroundColor Yellow
}

# Check project structure
Write-Host "Checking project structure..." -ForegroundColor Yellow
$requiredDirs = @("backend", "frontend", "backend\src", "frontend\src")
$allDirsExist = $true

foreach ($dir in $requiredDirs) {
    if (Test-Path $dir) {
        Write-Host "✅ Directory exists: $dir" -ForegroundColor Green
    } else {
        $errors += "❌ Missing directory: $dir"
        Write-Host "❌ Missing directory: $dir" -ForegroundColor Red
        $allDirsExist = $false
    }
}

# Check backend dependencies
Write-Host "Checking backend dependencies..." -ForegroundColor Yellow
if (Test-Path "backend\node_modules") {
    Write-Host "✅ Backend dependencies installed" -ForegroundColor Green
} else {
    $errors += "❌ Backend dependencies not installed. Run: cd backend && npm install"
    Write-Host "❌ Backend dependencies not installed" -ForegroundColor Red
}

# Check frontend dependencies
Write-Host "Checking frontend dependencies..." -ForegroundColor Yellow
if (Test-Path "frontend\node_modules") {
    Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green
} else {
    $errors += "❌ Frontend dependencies not installed. Run: cd frontend && npm install"
    Write-Host "❌ Frontend dependencies not installed" -ForegroundColor Red
}

# Check backend .env file
Write-Host "Checking backend configuration..." -ForegroundColor Yellow
if (Test-Path "backend\.env") {
    Write-Host "✅ Backend .env file exists" -ForegroundColor Green
} else {
    $errors += "❌ Backend .env file missing. Run: cd backend && copy .env.example .env"
    Write-Host "❌ Backend .env file missing" -ForegroundColor Red
}

# Check MongoDB (try to connect via health check if backend is running)
Write-Host "Checking MongoDB connection..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/health" -Method Get -TimeoutSec 2 -ErrorAction Stop
    if ($response.database -eq "connected") {
        Write-Host "✅ Backend running and connected to MongoDB" -ForegroundColor Green
    } else {
        $warnings += "⚠️  Backend running but MongoDB not connected"
        Write-Host "⚠️  Backend running but MongoDB not connected" -ForegroundColor Yellow
    }
} catch {
    $warnings += "⚠️  Backend not running. Start with: cd backend && npm run dev"
    Write-Host "⚠️  Backend not running (this is OK if you haven't started it yet)" -ForegroundColor Yellow
}

# Check frontend
Write-Host "Checking Frontend..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 2 -ErrorAction Stop
    Write-Host "✅ Frontend is running" -ForegroundColor Green
} catch {
    $warnings += "⚠️  Frontend not running. Start with: cd frontend && npm run dev"
    Write-Host "⚠️  Frontend not running (this is OK if you haven't started it yet)" -ForegroundColor Yellow
}

# Summary
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Verification Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

if ($errors.Count -eq 0) {
    Write-Host "✅ No critical errors found!" -ForegroundColor Green
} else {
    Write-Host "❌ Critical Errors Found:" -ForegroundColor Red
    foreach ($error in $errors) {
        Write-Host "   $error" -ForegroundColor Red
    }
}

if ($warnings.Count -gt 0) {
    Write-Host ""
    Write-Host "⚠️  Warnings:" -ForegroundColor Yellow
    foreach ($warning in $warnings) {
        Write-Host "   $warning" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Next Steps" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

if ($errors.Count -eq 0) {
    Write-Host ""
    Write-Host "To start the application:" -ForegroundColor White
    Write-Host ""
    Write-Host "1. Start Backend (Terminal 1):" -ForegroundColor Cyan
    Write-Host "   cd backend" -ForegroundColor White
    Write-Host "   npm run dev" -ForegroundColor White
    Write-Host ""
    Write-Host "2. Start Frontend (Terminal 2):" -ForegroundColor Cyan
    Write-Host "   cd frontend" -ForegroundColor White
    Write-Host "   npm run dev" -ForegroundColor White
    Write-Host ""
    Write-Host "3. Open browser to http://localhost:3000" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "✅ Phase 1 setup is complete!" -ForegroundColor Green
    Write-Host "Ready to proceed to Phase 2: Git and GitHub Workflow" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "Please fix the errors above before proceeding." -ForegroundColor Red
}

Write-Host ""
