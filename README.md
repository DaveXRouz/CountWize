<p align="center">
  <img src="site/images/Footer-Logo.svg" alt="CountWize" width="200">
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
├── site/                    # Production (Netlify deploy directory)
│   ├── *.html              # 33 pages
│   ├── css/                # Stylesheets
│   │   ├── normalize.css
│   │   ├── webflow.css
│   │   ├── countwize-test.webflow.css
│   │   ├── design-tokens.css
│   │   ├── responsive-fixes.css
│   │   └── countwize-animations.css
│   ├── js/                 # Scripts
│   │   ├── webflow.js
│   │   ├── a11y-hardening.js
│   │   ├── form-hardening.js
│   │   └── perf-deferred-init.js
│   ├── images/             # Assets (409 files)
│   ├── documents/          # PDFs
│   ├── robots.txt
│   └── sitemap.xml
│
├── scripts/                 # Development tools
│   └── check-deploy-drift.mjs
│
├── netlify.toml            # Deployment config
├── README.md               # This file
└── DEVELOPMENT_RULES.md    # Dev guidelines
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

## Development

**Important:** See [`DEVELOPMENT_RULES.md`](DEVELOPMENT_RULES.md) for deployment workflow.

**Key Points:**
- Netlify publishes from `site/` directory
- All edits should be made in `site/` for production
- Run `node scripts/check-deploy-drift.mjs` to verify file sync

### Local Development

```bash
# Python
cd site && python -m http.server 8080

# Node.js
cd site && npx serve

# Open http://localhost:8080
```

---

## Deployment

### Netlify

```toml
[build]
  publish = "site"
```

1. Connect repository to Netlify
2. Automatic deployment from `main` branch
3. Custom domain: `countwize.com`

---

## Security

- **HTTPS Enforced** — All traffic encrypted
- **Security Headers** — X-Frame-Options, X-XSS-Protection, CSP
- **Form Validation** — Client-side validation with sanitization
- **Canonical URLs** — SEO-optimized non-www domain

---

## Contact

| | |
|---|---|
| **Website** | [countwize.com](https://countwize.com) |
| **Email** | support@countwize.com |
| **UK** | +44 7533 598854 |
| **Canada** | +1 782 800 0180 |
| **Sweden** | +46 72 400 19 75 |

---

<p align="center">
  <strong>CountWize LTD</strong><br>
  © 2025 All Rights Reserved
</p>
