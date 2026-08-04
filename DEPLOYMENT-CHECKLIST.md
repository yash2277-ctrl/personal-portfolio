# 🚀 Deployment Security Checklist

Use this checklist before deploying to production to ensure all security measures are in place.

## Pre-Deployment Security Review

### ✅ Code Security
- [x] All user inputs are validated and sanitized
- [x] Form fields have maxlength attributes
- [x] Regex patterns enforce input constraints
- [x] No sensitive data (API keys, passwords) in code
- [x] Error messages don't expose system information
- [x] XSS protection implemented
- [x] CSRF protection scaffolded (activate when backend added)

### ✅ Configuration Files
- [x] `.htaccess` file present with security headers (Apache)
- [x] Nginx config ready (if using Nginx)
- [x] CSP policy configured in HTML meta tags
- [x] Security headers defined
- [ ] HTTPS redirect enabled (uncomment in .htaccess after SSL setup)
- [ ] HSTS header enabled (uncomment after HTTPS working)

### ✅ Content Security
- [x] All external resources whitelisted in CSP
- [x] Images optimized and compressed
- [x] Videos hosted on CDN (not consuming server bandwidth)
- [x] No inline scripts that violate CSP (except GSAP with 'unsafe-inline')
- [x] Subresource Integrity (SRI) for CDN scripts (recommended)

## Deployment Steps

### Step 1: Server Preparation
- [ ] Server OS updated and patched
- [ ] Web server software installed (Apache/Nginx)
- [ ] Firewall configured (ports 80, 443 open)
- [ ] SSH key authentication enabled
- [ ] Root login disabled
- [ ] Fail2ban or similar intrusion detection installed

### Step 2: SSL/TLS Certificate
- [ ] Domain registered and DNS configured
- [ ] SSL certificate obtained (Let's Encrypt or commercial)
- [ ] Certificate installed on server
- [ ] Test HTTPS access works
- [ ] Verify certificate grade at ssllabs.com
- [ ] Enable HTTPS redirect in .htaccess or nginx config

### Step 3: File Upload
- [ ] Upload all files to server
- [ ] Set correct file permissions (644 for files, 755 for directories)
- [ ] Verify .htaccess is being read (Apache)
- [ ] Test site loads correctly

### Step 4: Security Headers Verification
- [ ] Visit https://securityheaders.com/?q=yourdomain.com
- [ ] Verify A+ rating or identify missing headers
- [ ] Check specific headers:
  - [ ] Content-Security-Policy present
  - [ ] X-Frame-Options: DENY
  - [ ] X-Content-Type-Options: nosniff
  - [ ] Referrer-Policy present
  - [ ] Strict-Transport-Security present (after HTTPS)

### Step 5: Security Testing
- [ ] Open security-test.html on live site
- [ ] Run all security tests
- [ ] Verify all tests pass
- [ ] Test XSS payloads in contact form:
  ```
  <script>alert('XSS')</script>
  <img src=x onerror=alert('XSS')>
  '"><script>alert('XSS')</script>
  ```
- [ ] Verify all payloads are sanitized

### Step 6: Functional Testing
- [ ] Test all navigation links
- [ ] Submit contact form with valid data
- [ ] Test resume modal opens and prints
- [ ] Verify all images load
- [ ] Check Three.js animations work
- [ ] Test on multiple devices (mobile, tablet, desktop)
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)

### Step 7: Performance Testing
- [ ] Run Lighthouse audit (target 90+ in all categories)
- [ ] Check page load time (<3 seconds)
- [ ] Verify videos load lazily
- [ ] Test on slow 3G connection
- [ ] Check Core Web Vitals

### Step 8: SEO & Accessibility
- [ ] Verify meta tags present (title, description)
- [ ] Check Open Graph tags for social sharing
- [ ] Test with screen reader (basic test)
- [ ] Verify alt text on all images
- [ ] Check color contrast ratios
- [ ] Ensure keyboard navigation works

### Step 9: Monitoring Setup
- [ ] Set up error logging
- [ ] Configure server monitoring
- [ ] Enable access logs
- [ ] Set up alerts for suspicious activity
- [ ] Configure backup schedule

### Step 10: Post-Deployment
- [ ] Test from external network
- [ ] Share with trusted users for feedback
- [ ] Monitor error logs for first 24 hours
- [ ] Set calendar reminder for security review (3 months)

## Security Testing Tools

### Recommended Online Tools
1. **Security Headers**: https://securityheaders.com/
2. **SSL Labs**: https://www.ssllabs.com/ssltest/
3. **Mozilla Observatory**: https://observatory.mozilla.org/
4. **Hardenize**: https://www.hardenize.com/
5. **ImmuniWeb**: https://www.immuniweb.com/ssl/

### Command Line Testing
```bash
# Test security headers
curl -I https://yourdomain.com

# Test SSL configuration
openssl s_client -connect yourdomain.com:443

# Test HTTP to HTTPS redirect
curl -I http://yourdomain.com

# Check CSP header
curl -s -I https://yourdomain.com | grep -i "content-security-policy"
```

### Browser Testing
1. Open DevTools → Network → Reload page
2. Click on main document request
3. Check Response Headers tab
4. Verify all security headers present

## Common Issues & Solutions

### Issue: .htaccess not working
**Cause**: AllowOverride not enabled  
**Solution**: Add to Apache config:
```apache
<Directory /var/www/html>
    AllowOverride All
</Directory>
```
Then: `sudo systemctl restart apache2`

### Issue: CSP blocking resources
**Cause**: Resource not whitelisted in CSP  
**Solution**: Update CSP in both:
1. HTML meta tag in index.html
2. .htaccess or nginx config
Add the domain to appropriate directive (script-src, style-src, etc.)

### Issue: Mixed content warnings
**Cause**: Loading HTTP resources on HTTPS page  
**Solution**: Update all resource URLs to HTTPS or relative URLs

### Issue: Form submission not working in production
**Cause**: Missing backend endpoint  
**Solution**: The form is currently client-side only. To enable:
1. Create backend API endpoint
2. Uncomment fetch code in script.js
3. Add CSRF token generation
4. Configure CORS if API is on different domain

## Emergency Rollback Plan

If critical issues are discovered after deployment:

1. **Immediate Actions**
   ```bash
   # Take site offline temporarily
   mv index.html index.html.backup
   echo "Maintenance in progress" > index.html
   ```

2. **Restore Previous Version**
   ```bash
   # If using git
   git checkout previous-stable-commit
   
   # Or restore from backup
   cp -r /backup/portfolio/* /var/www/html/
   ```

3. **Investigate Issue**
   - Check error logs: `tail -f /var/log/apache2/error.log`
   - Review security scan results
   - Test locally to reproduce issue

4. **Fix and Redeploy**
   - Apply fixes to local version
   - Test thoroughly locally
   - Run all security tests
   - Deploy updated version

## Maintenance Schedule

### Daily
- [ ] Check error logs for anomalies
- [ ] Monitor server resources (CPU, memory, bandwidth)

### Weekly
- [ ] Review access logs for suspicious activity
- [ ] Check SSL certificate expiry date

### Monthly
- [ ] Run full security scan
- [ ] Update dependencies if any
- [ ] Review and rotate logs

### Quarterly
- [ ] Full security audit
- [ ] Review and update security policies
- [ ] Test backup restoration
- [ ] Update documentation

### Annually
- [ ] Comprehensive penetration testing
- [ ] Review and update privacy policy
- [ ] SSL certificate renewal (if not auto-renewed)

## Success Criteria

Your deployment is successful when:

✅ Site loads over HTTPS with valid certificate  
✅ Security headers grade: A+ on securityheaders.com  
✅ SSL/TLS grade: A+ on ssllabs.com  
✅ Lighthouse score: 90+ in all categories  
✅ All security tests pass  
✅ No console errors  
✅ Forms work correctly with validation  
✅ Mobile responsive and tested  
✅ Cross-browser compatible  
✅ Page load time under 3 seconds  

## Sign-Off

**Deployed By**: _______________________  
**Date**: _______________________  
**Environment**: [ ] Staging [ ] Production  
**All checks completed**: [ ] Yes [ ] No  
**Issues found**: [ ] None [ ] See notes below  

**Notes**:
_________________________________________________
_________________________________________________
_________________________________________________

---

**Next Security Review Date**: _______________________

**Contact for Issues**: your-email@example.com
