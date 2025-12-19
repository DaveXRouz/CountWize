# CountWize Configuration

This document covers all configuration files, hosting settings, and deployment configuration.

---

## Netlify Configuration

**File:** `/netlify.toml`

### Build Settings

```toml
[build]
  publish = "."
```

- **Publish Directory:** Root (`.`)
- **Build Command:** None (static site)
- No build process required

### Redirect Rules

#### Clean URL Redirects (Status 200)

```toml
[[redirects]]
  from = "/crypto-recovery"
  to = "/recovery.html"
  status = 200

[[redirects]]
  from = "/recovery"
  to = "/recovery.html"
  status = 200

[[redirects]]
  from = "/about-us"
  to = "/about-us.html"
  status = 200

[[redirects]]
  from = "/contact-us"
  to = "/contact-us.html"
  status = 200

[[redirects]]
  from = "/contact"
  to = "/contact-us.html"
  status = 200

[[redirects]]
  from = "/education"
  to = "/education.html"
  status = 200

[[redirects]]
  from = "/crypto-recovery-guide"
  to = "/crypto-recovery-guide.html"
  status = 200

[[redirects]]
  from = "/faq"
  to = "/faq.html"
  status = 200

[[redirects]]
  from = "/crypto-insights"
  to = "/crypto-insights.html"
  status = 200

[[redirects]]
  from = "/news"
  to = "/news.html"
  status = 200

[[redirects]]
  from = "/recovery-questionnaire"
  to = "/recovery-questionnaire.html"
  status = 200

[[redirects]]
  from = "/blog"
  to = "/blog.html"
  status = 200

[[redirects]]
  from = "/team"
  to = "/team.html"
  status = 200

[[redirects]]
  from = "/legal"
  to = "/legal.html"
  status = 200

[[redirects]]
  from = "/privacy-policy"
  to = "/privacy-policy.html"
  status = 200

[[redirects]]
  from = "/cookie-policy"
  to = "/cookie-policy.html"
  status = 200
```

#### Canonical Redirects (Status 301)

```toml
[[redirects]]
  from = "/contact.html"
  to = "/contact-us.html"
  status = 301

[[redirects]]
  from = "/crypto-education"
  to = "/education.html"
  status = 301

[[redirects]]
  from = "/crypto-education.html"
  to = "/education.html"
  status = 301

[[redirects]]
  from = "/faq-crypto-recovery"
  to = "/faq.html"
  status = 301

[[redirects]]
  from = "/faq-crypto-recovery.html"
  to = "/faq.html"
  status = 301

[[redirects]]
  from = "/crypto-tax"
  to = "/recovery.html"
  status = 301
```

#### 404 Handler

```toml
[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
```

### Security Headers

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"
```

| Header | Value | Purpose |
|--------|-------|---------|
| X-Frame-Options | DENY | Prevent clickjacking |
| X-XSS-Protection | 1; mode=block | XSS filter |
| X-Content-Type-Options | nosniff | Prevent MIME sniffing |
| Referrer-Policy | strict-origin-when-cross-origin | Referrer privacy |
| Permissions-Policy | geolocation=(), microphone=(), camera=() | Disable APIs |

### Cache Headers

```toml
[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/css/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/js/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

- **max-age=31536000:** 1 year in seconds
- **public:** Cacheable by browser and CDN
- **immutable:** Content won't change

---

## Git Configuration

### .gitignore

```
# OS files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Editor files
.vscode/
.idea/
*.swp
*.swo
*~
.project
.settings/

# Dependencies
node_modules/
bower_components/
vendor/

# Build
dist/
build/
.cache/

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Temp files
*.tmp
*.temp

# Environment
.env
.env.local
.env.*.local

# Misc
*.bak
*.backup
```

### .gitattributes

Standard Git LFS and line ending configurations.

---

## Environment Variables

### Analytics IDs

| Variable | Value | Purpose |
|----------|-------|---------|
| GA4 ID | G-0NX03W5PQR | Google Analytics |
| Google Ads ID | AW-447543988 | Conversion tracking |
| LiveChat License | 18977943 | Customer support |

### API Endpoints

| Endpoint | Purpose |
|----------|---------|
| https://countwiseapi.space/api/ | Backend API |
| https://ipapi.co/json/ | Geolocation |
| https://restcountries.com/v2/all | Country data |
| https://telegram-vercel-seven.vercel.app/api/telegram | Form submission |

---

## Webflow Configuration

### Site Settings

- **Site ID:** 6757da2d0bddf4e7ffe6a430
- **Last Published:** Mon Nov 17 2025 21:36:46 GMT+0000

### Page IDs

Each page has a unique Webflow page ID stored in:
```html
<html data-wf-page="[page-id]" data-wf-site="6757da2d0bddf4e7ffe6a430">
```

---

## CDN Resources

### JavaScript Libraries

| Library | CDN | Version |
|---------|-----|---------|
| jQuery | Cloudflare | 3.5.1 |
| intl-tel-input | cdnjs | 17.0.12 |
| libphonenumber-js | cdnjs | 1.10.18 |
| Flatpickr | jsdelivr | Latest |
| WebFont Loader | Google APIs | 1.6.26 |

### Fonts

| Font | Source | Weights |
|------|--------|---------|
| Be Vietnam Pro | Google Fonts | 400, 500, 600, 700 |
| Poppins | Google Fonts | 300, 400, 500, 600, 700 |

---

## Cookie Consent Configuration

### EU Countries List

```javascript
const EU_COUNTRIES = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
  'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
  'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'IS', 'NO', 'LI'
];
```

### Consent Categories

| Category | Default | Purpose |
|----------|---------|---------|
| ad_storage | denied | Advertising cookies |
| analytics_storage | denied | Analytics cookies |
| functionality_storage | denied | Functionality cookies |
| personalization_storage | denied | Personalization |
| security_storage | granted | Security (always on) |

### LocalStorage Key

- **Key:** `cookie-consent`
- **Values:** `"all"`, `"none"`, `"simple-ok"`, or JSON object

---

## Performance Configuration

### Image Loading

```html
<!-- Critical images -->
<img loading="eager" ...>

<!-- Non-critical images -->
<img loading="lazy" ...>
```

### GPU Acceleration

```css
img {
  will-change: transform;
}
```

### Preconnect Hints

```html
<link href="https://fonts.googleapis.com" rel="preconnect">
<link href="https://fonts.gstatic.com" rel="preconnect" crossorigin="anonymous">
```

---

## SSL/Security

- **SSL:** Provided by Netlify (automatic)
- **HTTPS:** Enforced via Netlify
- **Headers:** Security headers configured in netlify.toml

---

## Deployment

### Netlify Deployment

1. Push to Git repository
2. Netlify auto-deploys from connected branch
3. No build step required (static files)
4. CDN distribution automatic

### Manual Deployment

1. Upload files to Netlify dashboard
2. Or use Netlify CLI: `netlify deploy --prod`

---

## Monitoring

### Google Analytics

- Dashboard: https://analytics.google.com
- Property: G-0NX03W5PQR

### Google Ads

- Dashboard: https://ads.google.com
- Conversion ID: AW-447543988

### LiveChat

- Dashboard: https://my.livechatinc.com
- License: 18977943
