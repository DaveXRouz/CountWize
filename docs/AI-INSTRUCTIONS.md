# CountWize AI Agent Instructions

## About This Document

This document provides instructions for AI agents (ChatGPT, Claude, or other AI systems) working with the CountWize website project. Use this as your primary reference when answering questions or making changes to the codebase.

---

## Project Summary

**CountWize** is a cryptocurrency recovery services website. Key facts:

- **Type:** Static marketing website (NOT a dashboard/app)
- **Purpose:** Help people recover lost/stolen cryptocurrency
- **Built with:** Webflow (exported as static HTML/CSS/JS)
- **Hosted on:** Netlify
- **Company:** CountWize LTD (UK registered: 16198508)

---

## Quick Reference

### Technology Stack

| Component | Technology |
|-----------|------------|
| Frontend | HTML5, CSS3, JavaScript |
| Builder | Webflow |
| Hosting | Netlify |
| Analytics | Google Analytics (G-0NX03W5PQR) |
| Chat | LiveChat (18977943) |
| Forms | Telegram API backend |
| Video | Vimeo embeds |

### Key Directories

```
/CountWize/
├── *.html          # 33 HTML pages
├── css/            # 5 CSS files (19,902 lines)
├── js/             # webflow.js (450 KB)
├── images/         # 407 image assets
├── documents/      # PDF documents
├── docs/           # This documentation
├── netlify.toml    # Hosting config
└── sitemap.xml     # SEO sitemap
```

### Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Green | `#34D399` | CTAs, accents |
| Accent Green | `#4ADE80` | Secondary accents |
| Brand Green | `#a3dcad` | Links, highlights |
| Dark Background | `#050505` | Main backgrounds |
| Text | `#fcfcfc` | Primary text |

### Fonts

- **Primary:** Be Vietnam Pro (400, 500, 600, 700)
- **Secondary:** Poppins (300, 400, 500, 600, 700)

---

## Important Files

### Main Pages

| File | Purpose | URL |
|------|---------|-----|
| `index.html` | Homepage | `/` |
| `recovery.html` | Crypto Recovery | `/recovery` |
| `contact-us.html` | Contact page | `/contact-us` |
| `recovery-questionnaire.html` | 20-step intake form | `/recovery-questionnaire` |
| `education.html` | Education hub | `/education` |
| `blog.html` | Blog listing | `/blog` |
| `faq.html` | FAQ page | `/faq` |

### CSS Files (in order of importance)

1. `css/countwize-test.webflow.css` - Main styles (16,161 lines)
2. `css/responsive-fixes.css` - Custom responsive fixes (1,238 lines)
3. `css/countwize-animations.css` - Animations (358 lines)
4. `css/webflow.css` - Webflow framework (1,790 lines)
5. `css/normalize.css` - CSS reset (355 lines)

### Configuration

- `netlify.toml` - Redirects, headers, caching
- `sitemap.xml` - SEO sitemap
- `robots.txt` - Search engine directives

---

## Common Tasks

### Finding an Element

1. **By class name:** Search CSS files for the class
2. **By content:** Search HTML files for the text
3. **By ID:** Look for `id="..."` in HTML

### Modifying Styles

1. Prefer editing `css/responsive-fixes.css` for new styles
2. Use `css/countwize-animations.css` for animations
3. Avoid editing `countwize-test.webflow.css` (Webflow-generated)

### Adding/Editing Content

1. Edit the relevant HTML file directly
2. Maintain existing class structure
3. Follow the design system (colors, typography)

### Form Modifications

Forms submit to: `https://telegram-vercel-seven.vercel.app/api/telegram`

Key forms:
- Homepage hero form (`index.html`)
- Contact form (`contact-us.html`)
- Recovery questionnaire (`recovery-questionnaire.html`)

---

## Do's and Don'ts

### DO:

- ✅ Use existing CSS classes when possible
- ✅ Maintain responsive breakpoints (mobile: <767px, tablet: 768-991px, desktop: 992px+)
- ✅ Keep the green color scheme consistent
- ✅ Test on mobile and desktop
- ✅ Use semantic HTML
- ✅ Maintain accessibility features (ARIA labels, focus states)

### DON'T:

- ❌ Remove accessibility features
- ❌ Change the Telegram API endpoint without reason
- ❌ Delete or rename existing CSS classes (may break Webflow)
- ❌ Add new JavaScript frameworks (keep it vanilla)
- ❌ Remove Google Analytics tracking
- ❌ Change company contact information without verification

---

## Page-Specific Notes

### Homepage (index.html)

- Contains hero form with phone validation
- Video embeds from Vimeo
- News sections load from API (`countwiseapi.space`)
- Particle animation on "Start" button

### Recovery Questionnaire (recovery-questionnaire.html)

- 20-step multi-step form
- Progress bar tracks completion
- File upload (max 3 files)
- Phone validation with intl-tel-input
- Conditional scheduling step
- Case ID generated on load (5-digit random)

### Contact Page (contact-us.html)

- Dynamic country/city dropdowns (API-loaded)
- Phone validation
- Submits to Telegram API

---

## API Endpoints

| Endpoint | Purpose |
|----------|---------|
| `https://countwiseapi.space/api/countries/` | Country list |
| `https://countwiseapi.space/api/countries/{id}/cities/` | Cities by country |
| `https://countwiseapi.space/api/news/` | News feed |
| `https://ipapi.co/json/` | IP geolocation |
| `https://telegram-vercel-seven.vercel.app/api/telegram` | Form submission |

---

## Troubleshooting

### "Form not submitting"

1. Check browser console for errors
2. Verify phone validation passes
3. Check Telegram API is accessible
4. Verify required fields are filled

### "Styles not applying"

1. Check CSS specificity
2. Look for `!important` overrides
3. Verify class name matches exactly
4. Check media query breakpoints

### "Animation not working"

1. Check `data-w-id` attribute exists
2. Verify element has initial `opacity: 0`
3. Check reduced motion preference isn't blocking

### "Images not loading"

1. Verify file exists in `/images/`
2. Check path is relative
3. Verify correct file extension

---

## Documentation Files

For detailed information, see these documents in `/docs/`:

| File | Contents |
|------|----------|
| `00-PROJECT-OVERVIEW.md` | Project summary and structure |
| `01-DESIGN-SYSTEM.md` | Colors, typography, components |
| `02-PAGES-AND-CONTENT.md` | All pages and their content |
| `03-FORMS-AND-INPUTS.md` | Form details and validation |
| `04-JAVASCRIPT-AND-FUNCTIONALITY.md` | JS functionality |
| `05-ANIMATIONS-AND-EFFECTS.md` | CSS animations |
| `06-NAVIGATION-AND-STRUCTURE.md` | Site navigation |
| `07-IMAGES-AND-ASSETS.md` | Image inventory |
| `08-SEO-AND-META.md` | SEO configuration |
| `09-CONFIGURATION.md` | Netlify and hosting |

---

## Response Guidelines

When answering questions about this project:

1. **Be specific:** Reference exact file paths and line numbers when possible
2. **Use the design system:** Recommend colors, fonts from the established palette
3. **Maintain consistency:** Follow existing patterns in the codebase
4. **Consider mobile:** All changes should work on mobile devices
5. **Preserve accessibility:** Maintain ARIA labels and focus states
6. **Test recommendations:** Suggest testing approaches for changes

---

## Contact Information

If you need to reference company details:

- **Company:** CountWize LTD
- **Registration:** England and Wales No. 16198508
- **Email:** support@countwize.com
- **UK Phone:** +44 7893 949686
- **Canada Phone:** +1 782 800 0180
- **Sweden Phone:** +46 72 400 19 75
- **Address:** UNIT 13 FREELAND PARK WAREHAM ROAD, LYTCHETT MATRAVERS POOLE ENGLAND BH16 6FA

---

## Version Information

- **Documentation Version:** 1.0
- **Last Updated:** 2025
- **Webflow Last Published:** Mon Nov 17 2025 21:36:46 GMT+0000
