# CountWize Website

Professional crypto recovery services website. CountWize offers secure, efficient crypto recovery services to recover lost or stolen assets with precision, using advanced tracking and forensic analysis.

## Overview

This is a static HTML/CSS/JavaScript website deployed on Netlify. It provides information about crypto recovery services, educational resources, and contact forms for potential clients.

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with Webflow foundation
- **Hosting**: Netlify
- **Video**: Vimeo embeds
- **Analytics**: Google Analytics 4
- **Chat**: LiveChat integration
- **Fonts**: Google Fonts (Be Vietnam Pro, Poppins)

## Quick Start

### Local Development

```bash
# Clone the repository
git clone https://github.com/DaveXRouz/CountWize.git
cd CountWize

# Start a local server (Python 3)
python3 -m http.server 8000

# Or with Node.js
npx serve .

# Visit http://localhost:8000
```

### Deployment

The site deploys automatically to Netlify when changes are pushed to the `main` branch.

## Project Structure

```
CountWize-Website/
├── index.html                    # Homepage
├── about-us.html                 # About page
├── contact-us.html               # Contact page
├── recovery.html                 # Main recovery service page
├── recovery-questionnaire.html   # Recovery intake form
├── crypto-recovery.html          # Recovery info
├── crypto-recovery-guide.html    # Recovery guide
├── crypto-education.html         # Education page
├── crypto-insights.html          # Insights page
├── crypto-tax.html               # Tax info
├── faq-crypto-recovery.html      # FAQ
├── team.html                     # Team page
├── news.html                     # News page
├── privacy-policy.html           # Privacy policy
├── cookie-policy.html            # Cookie policy
├── legal-page.html               # Legal information
├── 401.html                      # Auth error page
├── 404.html                      # Not found page
│
├── blog/                         # Blog articles
│   ├── forex-scams.html
│   ├── how-do-you-check-if-a-website-is-legitimate.html
│   ├── how-does-a-crypto-recovery-phrase-work.html
│   └── how-to-avoid-losing-your-crypto-real-mistakes-real-fixes-and-smart-protection-tips.html
│
├── css/
│   ├── main.css                  # Main stylesheet
│   ├── normalize.css             # CSS reset
│   └── webflow.css               # Webflow base styles
│
├── js/
│   └── webflow.js                # Webflow interactions
│
├── images/                       # Image assets (125 files)
│
├── documents/
│   └── countwize-iso-27001-2111-1.pdf
│
├── netlify.toml                  # Netlify configuration
└── README.md                     # This file
```

## Features

- **Responsive Design**: Mobile-first approach, works on all devices
- **Video Education**: Vimeo-hosted educational videos with lesson switching
- **Contact Forms**: Multiple contact forms with validation
- **Live Chat**: LiveChat integration for real-time support
- **Security Headers**: CSP, X-Frame-Options, etc. configured via Netlify
- **SEO Optimized**: Meta tags, Open Graph, canonical URLs
- **Accessibility**: Skip links, ARIA labels, semantic HTML

## Configuration

### Netlify (`netlify.toml`)

- Security headers (CSP, X-Frame-Options, etc.)
- Cache control for static assets
- Redirects for SEO preservation
- 404 fallback

### External Services

- **Google Analytics**: `G-0NX03W5PQR`
- **Google Ads**: `AW-447543988`
- **LiveChat**: License `18977943`

## Development Guidelines

### Code Style

- HTML: 2-space indentation, semantic tags
- CSS: BEM-like naming, organized by section
- JavaScript: ES6+, descriptive comments

### Commit Conventions

```
type: Short description

- Detailed change 1
- Detailed change 2
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `chore`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## License

Copyright © 2026 CountWize. All rights reserved.

## Contact

- Website: [countwize.com](https://countwize.com)
- Email: Contact via website form
