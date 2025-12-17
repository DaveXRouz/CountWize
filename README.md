# CountWize Project

This repository contains **two distinct website projects**:

1. **CountWize Main Website** - The original crypto recovery services website (production site)
2. **Jeton Clone Website** - A cloned Jeton payment platform website being rebranded for CountWize crypto recovery theme

## Overview

### Section 1: CountWize Main Website
The production website for CountWize crypto recovery services. Built with Webflow and exported as static HTML/CSS/JS files.

### Section 2: Jeton Clone Website (CountWize Theme)
A cloned version of the Jeton payment platform website, currently being customized to align with CountWize's crypto recovery theme. This is a Nuxt.js static site that has been exported.

**⚠️ Important**: See `CLAUDE_PROMPT.md` for complete documentation on the project structure, customization status, and development workflow.

## Structure

```
├── index.html              # Homepage
├── about.html              # About page
├── recovery.html           # Crypto Recovery page
├── education.html          # Education page
├── blog.html               # Blog listing page
├── contact.html            # Contact page
├── faq.html                # FAQ page
├── news.html               # News page
├── team.html               # Team page
├── legal.html              # Legal page
├── crypto-tax.html         # Crypto Tax page
├── recovery-questionnaire.html  # Recovery questionnaire
├── 401.html                # 401 error page
├── 404.html                # 404 error page
├── css/                    # Stylesheets
│   ├── normalize.css
│   ├── webflow.css
│   └── countwize-test-1e93ff3fdfe8504b2c177987.webflow.css
├── js/                     # JavaScript files
│   └── webflow.js
├── images/                 # Image assets (246 files)
└── documents/              # PDF documents
    └── COUNTWIZE-ISO-27001-2111-1.pdf
```

## Features

- **Crypto Recovery Services**: Information about crypto recovery and asset recovery services
- **Educational Content**: Guides and resources about cryptocurrency
- **Blog & News**: Latest updates and articles
- **Contact Forms**: Multiple contact forms with international phone input
- **Responsive Design**: Mobile-friendly layout
- **SEO Optimized**: Meta tags and structured data

## Pages

### Main Pages
- **Home** (`index.html`) - Landing page with hero section, services overview, and contact form
- **About** (`about.html`) - Company information and mission
- **Crypto Recovery** (`recovery.html`) - Detailed recovery services information
- **Education** (`education.html`) - Educational resources and videos
- **Blog** (`blog.html`) - Blog post listings
- **Contact** (`contact.html`) - Contact form and information
- **FAQ** (`faq.html`) - Frequently asked questions
- **News** (`news.html`) - News articles and updates
- **Team** (`team.html`) - Team members
- **Legal** (`legal.html`) - Legal information

### Detail Pages
- `detail_post.html` - Blog post detail
- `detail_service.html` - Service detail
- `detail_project.html` - Project detail
- `detail_member.html` - Team member detail
- `detail_blogcategory.html` - Blog category detail
- `detail_education-videos.html` - Education video detail

### Article Pages
- `article-4.html`
- `article-5.html`
- `forex-scams.html`
- `how-do-you-check-if-a-website-is-legitimate.html`
- `how-does-a-crypto-recovery-phrase-work.html`

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom styles and Webflow framework
- **JavaScript** - Interactive features and form handling
- **Webflow** - Original design platform
- **jQuery** - DOM manipulation (via Webflow)
- **International Phone Input** - Phone number validation

## External Dependencies

- Google Fonts (Be Vietnam Pro)
- Google Analytics
- Ahrefs Analytics
- Vimeo (for video embeds)
- International Phone Input library
- Webflow JS framework

## Setup

1. Clone this repository
2. Open `index.html` in a web browser
3. For local development, use a local server (e.g., `python -m http.server` or `npx serve`)

## Deployment

This is a static website that can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

## Notes

- The site uses Webflow's exported code structure
- Some dynamic content (news, blog posts) may require API endpoints
- Forms are configured to work with Webflow's form handling (may need backend configuration)
- All images and assets are included in the repository

## License

© 2025 CountWize | All rights reserved

## Contact

- Website: https://www.countwize.com
- Email: support@countwize.com
- UK: +44 7533 598854
- CA: +1 782 800 0180
- SE: +46 72 400 19 75

