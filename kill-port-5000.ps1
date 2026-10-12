# Kill Process Using Port 5000
# Run this script to free up port 5000

Write-Host "Finding processes using port 5000..." -ForegroundColor Yellow

# Get all processes using port 5000
$processes = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique

if ($processes) {
    Write-Host "Found processes: $($processes -join ', ')" -ForegroundColor Cyan
    
    foreach ($pid in $processes) {
        try {
            $process = Get-Process -Id $pid -ErrorAction SilentlyContinue
            if ($process) {
                Write-Host "Killing process: $($process.ProcessName) (PID: $pid)" -ForegroundColor Yellow
                Stop-Process -Id $pid -Force -ErrorAction Stop
                Write-Host "✅ Successfully killed PID $pid" -ForegroundColor Green
            }
        }
        catch {
            Write-Host "❌ Could not kill PID $pid - May need Administrator rights" -ForegroundColor Red
            Write-Host "   Run PowerShell as Administrator and try again" -ForegroundColor Yellow
        }
    }
    
    # Wait a moment
    Start-Sleep -Seconds 2
    
    # Verify port is free
    $stillUsed = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue
    if ($stillUsed) {
        Write-Host ""
        Write-Host "⚠️  Port 5000 is STILL in use!" -ForegroundColor Red
        Write-Host "You need to run PowerShell as Administrator:" -ForegroundColor Yellow
        Write-Host "1. Close this PowerShell" -ForegroundColor White
        Write-Host "2. Right-click PowerShell → Run as Administrator" -ForegroundColor White
        Write-Host "3. Run: .\kill-port-5000.ps1" -ForegroundColor White
    }
    else {
        Write-Host ""
        Write-Host "✅ Port 5000 is now FREE!" -ForegroundColor Green
        Write-Host "You can now start the backend with: npm run dev" -ForegroundColor Cyan
    }
}
else {
    Write-Host "✅ Port 5000 is already free!" -ForegroundColor Green
    Write-Host "You can start the backend with: npm run dev" -ForegroundColor Cyan
}

Write-Host ""
