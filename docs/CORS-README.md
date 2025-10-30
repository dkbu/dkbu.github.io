# CORS Configuration Guide

This project now includes comprehensive CORS (Cross-Origin Resource Sharing) configuration to enable secure cross-origin requests.

## Files Added

### 1. **HTML Meta Headers** (in `index.html`)
- Basic CORS headers for client-side configuration
- Content Security Policy (CSP) for enhanced security
- Additional security headers (X-Frame-Options, X-XSS-Protection, etc.)

### 2. **Server Configuration Files**

#### `.htaccess` (Apache Server)
- Complete CORS configuration for Apache web servers
- Includes security headers and performance optimizations
- Handles preflight OPTIONS requests automatically

#### `nginx-cors.conf` (Nginx Server)
- CORS configuration directives for Nginx servers
- Security headers and caching rules
- Gzip compression settings

### 3. **JavaScript CORS Utilities** (`cors-utils.js`)
- `corsFetch()` - Enhanced fetch function with CORS support
- `corsGetJSON()` - Simplified GET requests for JSON data
- `corsPostJSON()` - POST requests with JSON payload
- `isCORSSupported()` - Browser CORS support detection
- `createCORSProxyURL()` - CORS proxy URL generator for non-CORS APIs

## Usage Examples

### Making CORS Requests in Your App

```javascript
// Import the CORS utilities
import { corsGetJSON, corsPostJSON } from './cors-utils.js';

// Fetch data from external API
const data = await corsGetJSON('https://api.example.com/data');

// Post data to external API
const response = await corsPostJSON('https://api.example.com/submit', {
  name: 'Task Name',
  completed: false
});
```

### Using in Your Main Application

If you need to add external API calls to your task app, you can import the CORS utilities in `main.js`:

```javascript
import { corsGetJSON, corsPostJSON } from './cors-utils.js';

// Example: Save tasks to external service
async function saveTasksToCloud(tasks) {
  try {
    const response = await corsPostJSON('https://your-api.com/tasks', {
      tasks: tasks,
      timestamp: new Date().toISOString()
    });
    console.log('Tasks saved successfully:', response);
  } catch (error) {
    console.error('Failed to save tasks:', error);
  }
}
```

## Configuration Details

### Allowed Origins
- Currently set to `*` (all origins) for development
- **For production**: Replace `*` with specific domain(s)

### Allowed Methods
- GET, POST, PUT, DELETE, OPTIONS

### Allowed Headers
- Content-Type, Authorization, X-Requested-With, Accept, Origin

### Security Features
- Content Security Policy (CSP)
- XSS Protection
- Frame Options (prevents clickjacking)
- Content Type Options (prevents MIME sniffing)

## Deployment Notes

### GitHub Pages
The HTML meta headers are sufficient for GitHub Pages deployment.

### Apache Server
Upload the `.htaccess` file to your web root directory.

### Nginx Server
Include the `nginx-cors.conf` directives in your server block configuration.

### Custom Server
Implement the CORS headers programmatically in your server code.

## Security Considerations

1. **Production Environment**: Replace `Access-Control-Allow-Origin: *` with specific domains
2. **Credentials**: Set `credentials: 'include'` only if needed for authenticated requests
3. **Headers**: Only allow necessary headers in production
4. **CSP**: Adjust Content Security Policy based on your specific requirements

## Testing CORS

You can test CORS functionality using browser developer tools:

1. Open Network tab in DevTools
2. Make a request to external API
3. Check for CORS headers in response
4. Verify no CORS errors in console

## Common CORS Issues and Solutions

1. **"CORS policy" error**: Ensure server includes proper CORS headers
2. **Preflight failures**: Check OPTIONS method handling
3. **Credential issues**: Verify `credentials` setting matches server configuration
4. **Mixed content**: Use HTTPS for all external requests when site is HTTPS

This configuration provides a solid foundation for handling cross-origin requests securely and efficiently.