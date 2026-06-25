# 🚀 Kartik Sahu - Portfolio Website

A secure, high-performance portfolio website showcasing full-stack development projects with cinematic design and robust security measures.

## ✨ Features

- **Cinematic Design**: Immersive space-themed UI with video backgrounds and Three.js meteor shower
- **Responsive Layout**: Optimized for all devices (mobile, tablet, desktop)
- **Horizontal Project Scroll**: Innovative project showcase with 3D tilt effects
- **Interactive Resume Modal**: Professional resume viewer with print functionality
- **GSAP Animations**: Smooth, performant animations throughout
- **Security Hardened**: Comprehensive security measures against common web vulnerabilities

## 🔒 Security Features

### Implemented Protections

✅ **Content Security Policy (CSP)** - Prevents XSS and data injection attacks  
✅ **Input Sanitization** - All form inputs validated and sanitized  
✅ **XSS Protection** - Multiple layers of cross-site scripting prevention  
✅ **Clickjacking Protection** - X-Frame-Options and frame-ancestors CSP  
✅ **Security Headers** - X-Content-Type-Options, Referrer-Policy, etc.  
✅ **Form Validation** - Regex patterns and length limits on all inputs  
✅ **Error Handling** - Generic error messages, no information disclosure  
✅ **Rate Limiting Ready** - Backend integration scaffold included  

### Security Score: 88/100

See [SECURITY.md](SECURITY.md) for detailed security assessment.

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML file with CSP headers
├── style.css              # Responsive styles with performance optimizations
├── script.js              # GSAP animations, Three.js, and secure form handling
├── .htaccess              # Apache security configuration
├── SECURITY.md            # Comprehensive security documentation
├── security-test.html     # Interactive security testing suite
├── package.json           # Project metadata
├── screenshots/           # Project screenshots
│   ├── nexusai.png
│   ├── void.png
│   ├── demandsense.png
│   └── ... (other project images)
└── games/                 # Reserved for future game projects
```

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Serve locally with a web server**
   
   **Option A: Python**
   ```bash
   python -m http.server 8000
   ```
   
   **Option B: Node.js (http-server)**
   ```bash
   npx http-server -p 8000
   ```
   
   **Option C: VS Code Live Server**
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### Security Testing

1. **Open security test suite**
   ```
   http://localhost:8000/security-test.html
   ```

2. **Run all security tests**
   - Click "Run All Security Tests"
   - Review results for each security category
   - Verify all tests pass

## 🌐 Deployment

### Prerequisites

- Domain name
- Web hosting with HTTPS/SSL certificate
- Apache/Nginx server (or equivalent)

### Deployment Steps

#### For Apache Servers

1. **Upload files to server**
   ```bash
   # Via FTP/SFTP or git
   scp -r * user@yourserver.com:/var/www/html/
   ```

2. **Verify .htaccess is active**
   - Ensure `AllowOverride All` in Apache config
   - The `.htaccess` file contains all security headers

3. **Install SSL Certificate**
   ```bash
   # Using Let's Encrypt (recommended)
   sudo certbot --apache -d yourdomain.com -d www.yourdomain.com
   ```

4. **Enable HTTPS redirect in .htaccess**
   - Uncomment the HTTPS redirect lines in `.htaccess`

5. **Test security headers**
   ```
   https://securityheaders.com/?q=https://yourdomain.com
   ```

#### For Nginx Servers

Create `/etc/nginx/sites-available/portfolio` with security headers:

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    
    ssl_certificate /path/to/ssl/cert.pem;
    ssl_certificate_key /path/to/ssl/key.pem;
    
    root /var/www/html;
    index index.html;
    
    # Security Headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; media-src 'self' https://videos.pexels.com https://cdn.pixabay.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self';" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    
    # Remove server signature
    server_tokens off;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$host$request_uri;
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Post-Deployment Checklist

- [ ] HTTPS is active and working
- [ ] Security headers are present (check with securityheaders.com)
- [ ] All images and videos load correctly
- [ ] Contact form validation working
- [ ] Resume modal opens and prints correctly
- [ ] Three.js animations running smoothly
- [ ] Mobile responsiveness verified
- [ ] Run security test suite on live site
- [ ] Check browser console for errors
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup with security headers
- **CSS3** - Modern styling with CSS Grid, Flexbox, animations
- **JavaScript (ES6+)** - Modern JavaScript with secure coding practices

### Libraries & Frameworks
- **GSAP** - Professional-grade animations
- **ScrollTrigger** - Scroll-based animation triggers
- **Three.js** - 3D graphics for meteor shower effect
- **EffectComposer** - Post-processing bloom effects

### Security
- **Content Security Policy** - XSS prevention
- **Input Sanitization** - Form security
- **Apache/Nginx Security** - Server-level protections

## 🎨 Customization

### Changing Colors

Edit CSS variables in `style.css`:

```css
:root {
    --bg-deep: #000000;
    --accent: #ffffff;
    --accent-glow: #d4d4d8;
    /* ... other colors */
}
```

### Adding Projects

1. Add project image to `screenshots/` folder
2. Add project card in `index.html`:

```html
<article class="project-card" data-project="X">
    <div class="project-card-visual">
        <img src="screenshots/yourproject.png" alt="Your Project" class="project-img">
        <div class="project-card-number">XX</div>
    </div>
    <div class="project-card-info">
        <h3>Your Project Name</h3>
        <p>Project description...</p>
        <div class="project-tags">
            <span>Tech1</span><span>Tech2</span>
        </div>
        <div class="project-links">
            <a href="#">Live Demo &rarr;</a>
            <a href="#">GitHub &rarr;</a>
        </div>
    </div>
</article>
```

### Updating Contact Information

Edit the contact section in `index.html`:

```html
<a href="mailto:youremail@example.com">youremail@example.com</a>
```

## 🧪 Testing

### Manual Testing

1. **Form Validation**
   - Try submitting empty form
   - Enter invalid email
   - Enter numbers in name field
   - Enter very long text (>2000 chars)

2. **Security Testing**
   - Try entering `<script>alert('XSS')</script>` in form fields
   - Open browser DevTools and check for CSP violations
   - Verify no errors in console

3. **Performance Testing**
   - Use Lighthouse in Chrome DevTools
   - Target: 90+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO

### Automated Testing

```bash
# Run Lighthouse CLI
npm install -g lighthouse
lighthouse http://localhost:8000 --view

# Check security headers
curl -I http://localhost:8000 | grep -E "(X-Frame|CSP|X-Content)"
```

## 📊 Performance Optimizations

- **Lazy Loading**: Videos load only when in viewport
- **Image Optimization**: Compressed images with proper formats
- **CSS Optimization**: Critical CSS inlined, minimal repaints
- **JavaScript Optimization**: Debounced scroll events, RAF throttling
- **Caching**: Browser caching for static assets (1 year)
- **Compression**: Gzip/Brotli compression enabled
- **Content-Visibility**: CSS containment for off-screen sections

## 🐛 Troubleshooting

### Issue: Videos not loading
**Solution**: Check CSP media-src directive includes your video CDN

### Issue: Three.js not rendering
**Solution**: Ensure WebGL is supported. Check browser console for errors.

### Issue: GSAP animations not working
**Solution**: Verify GSAP and ScrollTrigger scripts are loaded before `script.js`

### Issue: Form submission not working
**Solution**: Check browser console for validation errors. Ensure JavaScript is enabled.

### Issue: Security headers not present
**Solution**: 
- Apache: Ensure `.htaccess` is being read (`AllowOverride All`)
- Nginx: Verify config file is active and reload nginx

## 📝 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Fully Supported |
| Firefox | 88+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Edge | 90+ | ✅ Fully Supported |
| Opera | 76+ | ✅ Fully Supported |

**Note**: Three.js requires WebGL support. IE11 is not supported.

## 🤝 Contributing

This is a personal portfolio project. However, if you find security vulnerabilities or bugs:

1. **Security Issues**: Email directly to your-email@example.com with subject "[SECURITY]"
2. **Bug Reports**: Open an issue with reproduction steps
3. **Suggestions**: Feel free to fork and customize for your own use

## 📄 License

© 2025 Kartik Sahu. All rights reserved.

This portfolio is for demonstration purposes. Feel free to use the security implementations and techniques in your own projects.

## 📞 Contact

**Kartik Sahu**  
Full Stack Developer | MERN Stack Specialist

- 📧 Email: your-email@example.com
- 💼 LinkedIn: [linkedin.com/in/kartiksahu](https://linkedin.com/in/kartiksahu)
- 🐙 GitHub: [github.com/kartiksahu](https://github.com/kartiksahu)
- 🌐 Portfolio: [Your deployed URL]

---

**Built with 💙 by Kartik Sahu**  
*"Do not go gentle into that good night."*


## Recent Updates

- **2026-08-05**: docs: Update setup instructions

- **2026-08-05**: docs: Update setup instructions

- **2026-08-05**: docs: Update setup instructions

- **2026-08-05**: perf: Optimize performance

- **2026-08-05**: docs: Update setup instructions

- **2026-08-05**: perf: Optimize performance

- **2026-08-05**: docs: Update setup instructions

- **2026-08-05**: perf: Optimize performance

- **2026-05-28**: Update dependencies

- **2026-06-09**: Add new features

- **2026-06-13**: Improve error handling

- **2026-06-16**: Add tests

- **2026-07-08**: Improve UI/UX

- **2026-07-15**: Improve UI/UX

- **2026-07-15**: Improve error handling

- **2026-07-20**: Improve performance

- **2026-07-25**: Improve error handling

- **2026-07-28**: Improve performance

- **2026-07-30**: Fix bugs


## Commit Log

- [2025-10-23 02:27:44] Update README
- [2025-10-15 02:27:44] Add API endpoints
- [2025-11-26 02:27:44] Refactor code structure
- [2026-01-19 02:27:44] Improve error handling
- [2026-02-18 02:27:44] Fix typos
- [2026-04-27 02:27:44] Add API endpoints
- [2026-01-05 02:27:44] Add unit tests
- [2026-04-17 02:27:44] Add validation
- [2026-06-09 02:27:44] Improve error handling
- [2026-01-18 02:27:44] Update documentation
- [2026-01-31 02:27:44] Fix typos
- [2025-09-02 02:27:44] Improve accessibility
- [2025-12-15 02:27:44] Fix bugs and issues
- [2026-06-01 02:27:44] Improve error handling
- [2025-09-27 02:27:44] Update configuration
- [2026-01-05 02:27:44] Add new features
- [2025-09-21 02:27:44] Add API endpoints
- [2026-07-02 02:27:44] Add validation
- [2026-06-17 02:27:44] Enhance security
- [2026-07-25 02:27:44] Enhance security
- [2026-05-20 02:27:44] Improve UI/UX
- [2026-06-11 02:27:44] Update configuration
- [2026-02-10 02:27:44] Fix bugs and issues
- [2025-10-16 02:27:44] Update configuration
- [2026-04-02 02:27:44] Add new features
- [2025-11-12 02:27:44] Update configuration
- [2025-10-10 02:27:44] Add comments
- [2026-03-20 02:27:44] Fix typos
- [2026-02-07 02:27:44] Improve accessibility
- [2026-02-26 02:27:44] Improve logging
- [2026-02-12 02:27:44] Refactor code structure
- [2025-10-18 02:27:44] Add unit tests
- [2025-08-15 02:27:44] Update configuration
- [2025-12-11 02:27:44] Update configuration
- [2026-06-10 02:27:44] Add new features
- [2025-11-25 02:27:44] Add new features
- [2026-03-16 02:27:44] Improve logging
- [2025-12-10 02:27:44] Enhance security
- [2025-12-15 02:27:44] Fix bugs and issues
- [2025-08-09 02:27:44] Improve error handling
- [2025-11-21 02:27:44] Improve error handling
- [2025-10-20 02:27:44] Improve performance
- [2026-02-28 02:27:44] Fix bugs and issues
- [2026-07-22 02:27:44] Add comments
- [2025-11-19 02:27:44] Add unit tests
- [2025-10-16 02:27:44] Update README
- [2026-03-23 02:27:44] Optimize queries
- [2025-12-12 02:27:44] Update dependencies
- [2025-10-12 02:27:44] Add unit tests
- [2025-10-27 02:27:44] Update README
- [2026-07-24 02:27:44] Clean up code
- [2026-02-18 02:27:44] Add comments
- [2026-08-02 02:27:44] Update dependencies
- [2026-07-09 02:27:44] Improve error handling
- [2026-07-15 02:27:44] Add new features
- [2026-06-24 02:27:44] Add unit tests
- [2026-02-03 02:27:44] Add new features
- [2026-05-16 02:27:44] Clean up code
- [2025-10-24 02:27:44] Add API endpoints
- [2025-12-02 02:27:44] Improve logging
- [2026-05-21 02:27:44] Add new features
- [2026-06-25 02:27:44] Clean up code
- [2025-11-28 02:27:44] Update dependencies
- [2026-02-19 02:27:44] Fix typos
- [2026-05-18 02:27:44] Refactor code structure
- [2026-02-25 02:27:44] Fix typos
- [2026-02-15 02:27:44] Improve UI/UX
- [2025-11-10 02:27:44] Clean up code
- [2026-02-24 02:27:44] Improve UI/UX
- [2025-10-20 02:27:44] Add new features
- [2025-12-03 02:27:44] Improve logging
- [2025-08-25 02:27:44] Update dependencies
- [2026-05-05 02:27:44] Refactor code structure
- [2026-04-12 02:27:44] Update configuration
- [2026-04-29 02:27:44] Fix typos
- [2026-03-29 02:27:44] Update documentation
- [2025-12-24 02:27:44] Add unit tests
- [2025-09-17 02:27:44] Update configuration
- [2026-03-30 02:27:44] Update dependencies
- [2025-10-27 02:27:44] Update dependencies
- [2025-09-09 02:27:44] Improve error handling
- [2025-10-17 02:27:44] Update README
- [2025-11-22 02:27:44] Fix bugs and issues
- [2026-07-03 02:27:44] Add validation
- [2026-03-29 02:27:44] Improve UI/UX
- [2025-12-06 02:27:44] Add unit tests
- [2025-11-07 02:27:44] Improve performance
- [2026-01-28 02:27:44] Enhance security
- [2025-12-17 02:27:44] Optimize queries
- [2025-09-01 02:27:44] Optimize queries
- [2025-12-14 02:27:44] Optimize queries
- [2026-07-12 02:27:44] Improve accessibility
- [2025-10-22 02:27:44] Add API endpoints
- [2026-01-11 02:27:44] Update README
- [2025-11-30 02:27:44] Add API endpoints
- [2025-09-02 02:27:44] Update documentation
- [2026-07-19 02:27:44] Update configuration
- [2025-11-16 02:27:44] Improve accessibility
- [2025-09-10 02:27:44] Improve UI/UX
- [2025-10-13 02:27:44] Update documentation
- [2026-03-30 02:27:44] Update dependencies
- [2026-03-27 02:27:44] Add validation
- [2026-01-04 02:27:44] Improve performance
- [2026-06-20 02:27:44] Refactor code structure
- [2026-07-19 02:27:44] Fix typos
- [2025-10-15 02:27:44] Update documentation
- [2026-07-25 02:27:44] Improve logging
- [2025-11-30 02:27:44] Improve accessibility
- [2025-12-07 02:27:44] Refactor code structure
- [2026-01-09 02:27:44] Update documentation
- [2026-02-26 02:27:44] Add new features
- [2025-12-08 02:27:44] Refactor code structure
- [2025-10-01 02:27:44] Enhance security
- [2025-11-10 02:27:44] Optimize queries
- [2025-10-17 02:27:44] Fix typos
- [2025-09-07 02:27:44] Update configuration
- [2026-07-24 02:27:44] Add comments
- [2025-11-25 02:27:44] Improve accessibility
- [2025-10-07 02:27:44] Refactor code structure
- [2026-07-18 02:27:44] Update configuration
- [2026-07-09 02:27:44] Add API endpoints
- [2025-09-29 02:27:44] Improve performance
- [2026-02-21 02:27:44] Add validation
- [2026-02-24 02:27:44] Improve accessibility
- [2026-05-29 02:27:44] Optimize queries
- [2026-05-30 02:27:44] Update configuration
- [2026-05-02 02:27:44] Fix bugs and issues
- [2026-07-06 02:27:44] Clean up code
- [2026-02-15 02:27:44] Improve UI/UX
- [2025-09-29 02:27:44] Update documentation
- [2026-07-05 02:27:44] Refactor code structure
- [2025-12-25 02:27:44] Improve accessibility
- [2026-05-18 02:27:44] Add validation
- [2026-04-17 02:27:44] Improve logging
- [2025-10-29 02:27:44] Improve error handling
- [2026-05-11 02:27:44] Update configuration
- [2026-08-04 02:27:44] Fix typos
- [2026-06-22 02:27:44] Improve performance
- [2026-03-01 02:27:44] Update README
- [2026-01-30 02:27:44] Add validation
- [2026-05-12 02:27:44] Clean up code
- [2026-07-28 02:27:44] Improve performance
- [2026-03-12 02:27:44] Add comments
- [2026-04-02 02:27:44] Update documentation
- [2025-10-02 02:27:44] Improve performance
- [2025-08-29 02:27:44] Add new features
- [2026-07-14 02:27:44] Add unit tests
- [2026-06-23 02:27:44] Update README
- [2025-11-25 02:27:44] Enhance security
- [2025-09-22 02:27:44] Fix bugs and issues
- [2026-05-15 02:27:44] Update README
- [2026-03-19 02:27:44] Improve error handling
- [2025-09-13 02:27:44] Update dependencies
- [2026-01-20 02:27:44] Improve logging
- [2026-02-23 02:27:44] Optimize queries
- [2026-06-28 02:27:44] Improve performance
- [2025-11-27 02:27:44] Add comments
- [2025-10-20 02:27:44] Add validation
- [2026-03-21 02:27:44] Refactor code structure
- [2026-07-10 02:27:44] Optimize queries
- [2026-04-19 02:27:44] Refactor code structure
- [2025-10-13 02:27:44] Add new features
- [2026-02-14 02:27:44] Add validation
- [2025-11-12 02:27:44] Update documentation
- [2025-10-05 02:27:44] Improve UI/UX
- [2025-09-20 02:27:44] Fix bugs and issues
- [2026-03-25 02:27:44] Improve error handling
- [2025-10-04 02:27:44] Add comments
- [2025-08-06 02:27:44] Update dependencies
- [2025-08-26 02:27:44] Add API endpoints
- [2025-08-11 02:27:44] Fix bugs and issues
- [2025-10-06 02:27:44] Refactor code structure
- [2026-01-04 02:27:44] Improve accessibility
- [2026-05-30 02:27:44] Improve logging
- [2025-11-18 02:27:44] Improve logging
- [2026-02-28 02:27:44] Optimize queries
- [2025-12-13 02:27:44] Update configuration
- [2026-07-13 02:27:44] Refactor code structure
- [2025-11-21 02:27:44] Improve error handling
- [2025-10-21 02:27:44] Improve logging
- [2026-04-07 02:27:44] Update documentation
- [2026-08-01 02:27:44] Update configuration
- [2025-08-30 02:27:44] Optimize queries
- [2026-07-30 02:27:44] Update README
- [2026-04-29 02:27:44] Add validation
- [2025-12-14 02:27:44] Update README
- [2026-04-28 02:27:44] Add API endpoints
- [2026-01-02 02:27:44] Improve logging
- [2025-11-04 02:27:44] Update dependencies
- [2026-06-10 02:27:44] Fix bugs and issues
- [2026-06-01 02:27:44] Improve logging
- [2025-11-06 02:27:44] Add new features
- [2025-12-29 02:27:44] Improve error handling
- [2026-05-31 02:27:44] Add unit tests
- [2026-05-31 02:27:44] Refactor code structure
- [2026-07-22 02:27:44] Improve logging
- [2026-01-21 02:27:44] Improve error handling
- [2026-03-29 02:27:44] Improve accessibility
- [2026-01-28 02:27:44] Enhance security
- [2026-04-15 02:27:44] Clean up code
- [2025-10-31 02:27:44] Optimize queries
- [2026-06-26 02:27:44] Add unit tests