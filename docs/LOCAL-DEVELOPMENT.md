# Local Development Setup Guide

## The Problem
When opening HTML files directly in the browser (file:// protocol), ES6 modules are blocked due to CORS restrictions. This is a security feature of modern browsers.

## Solutions

### 1. Python HTTP Server (Recommended - Already Running)
Your server is currently running at: **http://localhost:8000**

To start it manually in the future:
```bash
python -m http.server 8000
```

Or use the provided scripts:
- **Windows**: Double-click `start-server.bat`
- **PowerShell**: Run `.\start-server.ps1`

### 2. VS Code Live Server Extension
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Your app will open automatically in the browser

### 3. Node.js Alternatives (if you have Node.js)
```bash
# Option A: Using npx (no installation needed)
npx serve .
npx http-server

# Option B: Install globally first
npm install -g http-server
http-server

# Option C: Using live-server with auto-reload
npm install -g live-server
live-server
```

### 4. Other Simple HTTP Servers

#### PHP (if installed):
```bash
php -S localhost:8000
```

#### Ruby (if installed):
```bash
ruby -run -e httpd . -p 8000
```

### 5. Browser Extensions
Some browser extensions can disable CORS for local development, but this is not recommended for security reasons.

## Recommended Workflow

1. **Development**: Use local HTTP server (Python/Node.js/VS Code Live Server)
2. **Production**: Deploy to GitHub Pages (your current setup)

## Why This Happens

- **file:// protocol**: No CORS support, modules blocked
- **http:// protocol**: Full CORS support, modules work perfectly
- **https:// protocol**: Full CORS support, modules work perfectly

## Current Status
✅ HTTP server is running on port 8000
✅ CORS configuration is properly set up
✅ Your app should work perfectly at http://localhost:8000

## Quick Start
1. Open browser
2. Go to: http://localhost:8000
3. Your Task Rating App should load without any CORS errors!