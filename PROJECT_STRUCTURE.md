# CountWize Project Structure

## Overview
This repository contains two distinct website projects:

1. **CountWize Main Website** - The original crypto recovery services website
2. **Jeton Clone Website** - A cloned and customized version of the Jeton website, rebranded for CountWize crypto recovery theme

---

## Section 1: CountWize Main Website

### Location
Root directory (`/`)

### Description
The original CountWize website built with Webflow, focusing on crypto recovery services. This is the production website for CountWize.

### Key Files
- `index.html` - Homepage
- `recovery.html` - Crypto recovery services page
- `about-us.html` - About page
- `contact-new.html` - Contact page
- `css/` - Stylesheets (normalize.css, webflow.css, countwize-test.webflow.css)
- `js/` - JavaScript files
- `images/` - Image assets
- `scripts/` - Utility scripts (compare-images.ts, etc.)

### Technology Stack
- Static HTML/CSS/JS
- Webflow export
- Python HTTP server for local development

### Running the Dev Server
```bash
python3 -m http.server 8080
```
Access at: http://localhost:8080

---

## Section 2: Jeton Clone Website (CountWize Theme)

### Location
`jeton-site/` directory

### Description
A cloned version of the Jeton payment platform website, currently being customized to align with CountWize's crypto recovery theme. This is a Nuxt.js static site that has been exported.

### Key Files
- `jeton-site/index.html` - Main homepage (minified)
- `jeton-site/_payload.json` - Nuxt.js payload data (contains all dynamic content)
- `jeton-site/about/`, `jeton-site/jeton-card/`, etc. - Sub-pages

### Technology Stack
- Nuxt.js (static export)
- Minified HTML/CSS/JS
- Content stored in `_payload.json` for dynamic rendering

### Current Customization Status

#### ✅ Completed
1. **Hero Introduction Section** (`_hero-introduction`)
   - Heading: Changed from "Unify your\nfinances" to "Recover\ncrypto assets"
   - Taglines: Changed from "Add", "Send", "Exchange" to "Track", "Analyze", "Recover"
   - Snippet alt texts updated to match crypto recovery theme

2. **Currency Exchange Section** (`_currency-exchange-calculator`)
   - Tag: Changed from "Exchange" to "Recovery"
   - Heading: Changed from "Convert fiat\ncash easily." to "Recover lost\nassets securely."

3. **Shader Background Animation**
   - Replaced video background with WebGL shader animation
   - Integrated from React Three Fiber component (`synthetic-hero.tsx`)

#### ⚠️ Pending Customization
1. **Common Header** - "One app for all needs" / "Single account for all your payments"
2. **Jeton Walkthrough** - All 5 steps with stepper navigation
3. **Mobile App Hero** - "All your finances, in one app."
4. **Jeton Card Overview** - Card promotion section
5. **Client Testimonials** - All testimonial content
6. **Extra Bold Hero** - Final CTA section
7. **Meta Tags** - SEO titles and descriptions
8. **Navigation Menu** - Menu structure
9. **Footer** - Company info and links

### Important Notes
- **Content is stored in TWO places**: Both `index.html` (minified) AND `_payload.json` (Nuxt.js data)
- **Both files must be updated** when changing text content
- The site uses Nuxt.js hydration, so content loads from `_payload.json` at runtime
- HTML is minified (single line), making direct edits challenging

---

## Development Workflow

### For CountWize Main Website
1. Edit HTML/CSS files directly
2. Test with Python HTTP server
3. Commit changes

### For Jeton Clone Website
1. **Always update BOTH files**:
   - `jeton-site/index.html` (minified HTML)
   - `jeton-site/_payload.json` (Nuxt.js payload)
2. Use `grep` to find exact strings in minified HTML
3. Use `search_replace` for precise text replacements
4. Test by refreshing browser (hard refresh: Cmd+Shift+R)

---

## File Organization

```
CountWize/
├── index.html                    # CountWize main homepage
├── recovery.html                 # CountWize recovery page
├── css/                          # CountWize stylesheets
├── js/                           # CountWize scripts
├── images/                       # CountWize images
├── scripts/                      # Utility scripts
│   └── compare-images.ts        # Visual testing
├── screenshots/                  # Visual test screenshots
├── diffs/                        # Visual diff outputs
│
└── jeton-site/                   # Jeton clone (CountWize theme)
    ├── index.html               # Main page (minified)
    ├── _payload.json            # Nuxt.js content data
    ├── about/                   # Sub-pages
    ├── jeton-card/
    ├── fees/
    └── ...                      # Other sub-pages
```

---

## Git Workflow

### Current Changes
- Modified: `jeton-site/index.html` - Text content updates
- Modified: `jeton-site/_payload.json` - Nuxt.js payload updates
- Modified: Various sub-page HTML files

### Commit Strategy
1. Stage all changes
2. Commit with descriptive message
3. Push to origin/main

---

## Key Technical Details

### Shader Integration
- WebGL shader animation replaces video background
- Implemented in vanilla JavaScript (no React dependencies)
- CSS ensures proper layering and visibility
- Persists through Nuxt.js hydration

### Content Updates
- Text replacements must be done in both HTML and JSON
- Minified HTML requires precise string matching
- Use `grep` to locate exact strings before replacing

### Testing
- Always hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)
- Check both visual appearance and source code
- Verify `_payload.json` contains updated content
