# Project Structure Documentation

## 📁 Directory Organization

```
dkbu.github.io/
├── 📄 index.html              # Main HTML file
├── 📄 README.md               # Project README
├── 📄 LICENSE                 # License file
├── 📄 changelog.txt           # Change log
├── 📄 script.js               # Original script (kept for reference)
├── 📄 script.js.backup        # Backup of original script
│
├── 📂 src/                    # Source code modules
│   ├── 📄 main.js             # Main application entry point
│   ├── 📄 task.js             # Task model class
│   ├── 📄 ui-utils.js         # UI utility functions
│   ├── 📄 rating.js           # Rating system functionality
│   └── 📄 cors-utils.js       # CORS utility functions
│
├── 📂 assets/                 # Static assets
│   └── 📄 style.css           # Application styles
│
├── 📂 config/                 # Configuration files
│   ├── 📄 .htaccess          # Apache server configuration
│   └── 📄 nginx-cors.conf    # Nginx server configuration
│
├── 📂 docs/                   # Documentation
│   ├── 📄 CORS-README.md     # CORS configuration guide
│   └── 📄 LOCAL-DEVELOPMENT.md # Local development setup
│
├── 📂 scripts/                # Utility scripts
│   ├── 📄 start-server.bat   # Windows batch script for HTTP server
│   └── 📄 start-server.ps1   # PowerShell script for HTTP server
│
└── 📂 .git/                   # Git repository data
```

## 🎯 Directory Purposes

### `/src/` - Source Code
Contains all JavaScript modules and application logic:
- **main.js**: Application entry point, handles initialization and event binding
- **task.js**: Task model class with business logic
- **ui-utils.js**: User interface utility functions
- **rating.js**: Grid rating system functionality
- **cors-utils.js**: Cross-origin request utilities

### `/assets/` - Static Assets
Contains CSS, images, fonts, and other static resources:
- **style.css**: Main application stylesheet
- Future: images/, fonts/, icons/ subdirectories

### `/config/` - Configuration Files
Server and deployment configuration files:
- **.htaccess**: Apache web server configuration
- **nginx-cors.conf**: Nginx server configuration
- Future: webpack.config.js, babel.config.js, etc.

### `/docs/` - Documentation
Project documentation and guides:
- **CORS-README.md**: CORS setup and configuration guide
- **LOCAL-DEVELOPMENT.md**: Local development environment setup
- Future: API documentation, user guides, etc.

### `/scripts/` - Utility Scripts
Development and deployment scripts:
- **start-server.bat**: Windows command script for local HTTP server
- **start-server.ps1**: PowerShell script for local HTTP server
- Future: build scripts, deployment scripts, etc.

## 🔧 Benefits of This Structure

### 1. **Separation of Concerns**
- Source code isolated from configuration
- Assets separated from logic
- Documentation organized separately

### 2. **Scalability**
- Easy to add new modules in `/src/`
- Simple to add new asset types in `/assets/`
- Clear place for new documentation in `/docs/`

### 3. **Maintainability**
- Predictable file locations
- Logical grouping of related files
- Easy navigation for developers

### 4. **Development Workflow**
- Clear distinction between source and output
- Easy to configure build tools
- Simple deployment process

### 5. **Collaboration**
- Standard project structure
- Clear file organization
- Easy onboarding for new developers

## 🚀 Development Commands

### Local Development
```bash
# Start HTTP server (from project root)
python -m http.server 8000
# or
.\scripts\start-server.bat
# or
.\scripts\start-server.ps1
```

### File Access
- **Application**: http://localhost:8000
- **Source files**: http://localhost:8000/src/
- **Assets**: http://localhost:8000/assets/
- **Documentation**: http://localhost:8000/docs/

## 📝 File Import Guidelines

### HTML References
```html
<!-- CSS -->
<link rel="stylesheet" href="assets/style.css" />

<!-- JavaScript -->
<script type="module" src="src/main.js"></script>
```

### JavaScript Module Imports
```javascript
// Within src/ directory (relative imports)
import { Task } from './task.js';
import { updateTaskList } from './ui-utils.js';

// Cross-directory imports (if needed)
import { corsUtils } from '../utils/cors-utils.js';
```

## 🔄 Migration Notes

### What Changed
1. All JavaScript modules moved to `/src/`
2. CSS files moved to `/assets/`
3. Configuration files moved to `/config/`
4. Documentation moved to `/docs/`
5. Utility scripts moved to `/scripts/`
6. HTML file updated with new paths

### What Stayed the Same
1. Module functionality unchanged
2. Application behavior identical
3. API and interfaces preserved
4. Original files kept as backup

## 🎉 Next Steps

1. **Add Build Process**: Consider adding webpack/vite for bundling
2. **Asset Pipeline**: Add image optimization and minification
3. **Testing**: Add test directory structure
4. **CI/CD**: Add GitHub Actions workflows
5. **Documentation**: Expand API documentation

This organized structure provides a solid foundation for the continued development and maintenance of the Task Rating App!