<p align="center">
  <img src="images/Footer-Logo.svg" alt="CountWize" width="200">
</p>

<h1 align="center">CountWize</h1>

<p align="center">
  <strong>Professional Cryptocurrency Recovery Services</strong>
</p>

<p align="center">
  <a href="https://countwize.com">Website</a> •
  <a href="#features">Features</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#contact">Contact</a>
</p>

---

## About

CountWize provides professional cryptocurrency recovery services, helping individuals and businesses recover lost or stolen digital assets through advanced blockchain forensics and legal expertise.

**ISO 27001 Certified** — We maintain the highest standards of information security.

---

## Features

- **Crypto Asset Recovery** — Expert recovery of lost, stolen, or inaccessible cryptocurrency
- **Blockchain Forensics** — Advanced tracing and analysis of blockchain transactions
- **Legal Support** — Coordination with law enforcement and legal proceedings
- **Educational Resources** — Comprehensive guides on crypto security and scam prevention
- **Multi-step Questionnaire** — Streamlined client intake process

---

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | HTML5, CSS3, JavaScript |
| **Framework** | Webflow |
| **Hosting** | Netlify |
| **Fonts** | Be Vietnam Pro, Poppins |
| **Analytics** | Google Analytics |

---

## Project Structure

```
CountWize/
├── site/                   # Production build (Netlify deploy directory)
│   ├── *.html             # 33 optimized pages
│   ├── css/               # Stylesheets
│   ├── js/                # Scripts
│   ├── images/            # Optimized assets
│   └── documents/         # PDF documents
│
├── css/                    # Source stylesheets
│   ├── normalize.css      # CSS reset
│   ├── webflow.css        # Webflow base
│   ├── countwize-test.webflow.css  # Main styles
│   ├── responsive-fixes.css        # Mobile/tablet fixes
│   └── countwize-animations.css    # Animations
│
├── js/                     # Source scripts
│   ├── webflow.js         # Webflow runtime
│   ├── a11y-hardening.js  # Accessibility enhancements
│   ├── form-hardening.js  # Form validation
│   └── perf-deferred-init.js  # Performance optimization
│
├── images/                 # Source image assets
├── documents/              # Source documents
├── netlify.toml           # Netlify configuration
├── robots.txt             # Search engine directives
└── sitemap.xml            # XML sitemap
```

---

## Pages

### Main
- Homepage
- About Us
- Recovery Services
- Recovery Questionnaire
- Education Center
- Blog & News
- FAQ
- Team
- Contact

### Resources
- Crypto Recovery Guide
- Crypto Tax Information
- Forex Scams Guide
- Security Best Practices

### Legal
- Privacy Policy
- Cookie Policy
- Legal Information

---

## Development Rules

**Important:** See [`DEVELOPMENT_RULES.md`](DEVELOPMENT_RULES.md) for critical information about the deploy directory structure.

**TL;DR:** Netlify publishes `site/` — edit files in `site/` for production changes.

---

## Deployment

### Netlify (Recommended)

The site is configured for Netlify deployment:

```toml
[build]
  publish = "site"
```

1. Connect repository to Netlify
2. Deploy — Netlify automatically publishes from `/site`
3. Custom domain: `countwize.com`

### Local Development

```bash
# Python
cd site && python -m http.server 8080

# Node.js
cd site && npx serve

# Then open http://localhost:8080
```

---

## Security Features

- **HTTPS Enforced** — All traffic encrypted
- **Security Headers** — X-Frame-Options, X-XSS-Protection, CSP
- **Form Validation** — Client-side validation with sanitization
- **Canonical URLs** — SEO-optimized non-www domain

---

## Contact

<table>
  <tr>
    <td><strong>Website</strong></td>
    <td><a href="https://countwize.com">countwize.com</a></td>
  </tr>
  <tr>
    <td><strong>Email</strong></td>
    <td>support@countwize.com</td>
  </tr>
  <tr>
    <td><strong>UK</strong></td>
    <td>+44 7533 598854</td>
  </tr>
  <tr>
    <td><strong>Canada</strong></td>
    <td>+1 782 800 0180</td>
  </tr>
  <tr>
    <td><strong>Sweden</strong></td>
    <td>+46 72 400 19 75</td>
  </tr>
</table>

---

<p align="center">
  <strong>CountWize LTD</strong><br>
  © 2025 All Rights Reserved
</p>
