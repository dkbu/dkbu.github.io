# PowerShell script to start local HTTP server
Set-Location (Split-Path $PSScriptRoot -Parent)

Write-Host "Starting local HTTP server for Task Rating App..." -ForegroundColor Green
Write-Host ""
Write-Host "Project structure:" -ForegroundColor Cyan
Write-Host "- Source code: src/" -ForegroundColor Yellow
Write-Host "- Assets: assets/" -ForegroundColor Yellow
Write-Host "- Documentation: docs/" -ForegroundColor Yellow
Write-Host ""
Write-Host "Open your browser and go to: http://localhost:8000" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Cyan
Write-Host ""

try {
    python -m http.server 8000
} catch {
    Write-Host "Error: Python not found. Please install Python or use an alternative method." -ForegroundColor Red
    Write-Host "Alternative: Install Node.js and run 'npx serve .' or 'npx http-server'" -ForegroundColor Yellow
}

Read-Host "Press Enter to exit"