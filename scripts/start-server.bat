@echo off
cd /d "%~dp0.."
echo Starting local HTTP server for Task Rating App...
echo.
echo Project structure:
echo - Source code: src/
echo - Assets: assets/
echo - Documentation: docs/
echo.
echo Open your browser and go to: http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.
python -m http.server 8000
pause