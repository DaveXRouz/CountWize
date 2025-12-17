# CountWize Project - Complete Documentation for Claude

## Project Overview

This repository contains **two distinct website projects** that need to be understood separately:

1. **CountWize Main Website** - The original crypto recovery services website (production site)
2. **Jeton Clone Website** - A cloned Jeton payment platform website being rebranded for CountWize crypto recovery theme

---

## Section 1: CountWize Main Website

### Purpose
The production website for CountWize, a crypto recovery services company. This website provides information about crypto recovery services, guides, and resources.

### Technology
- **Type**: Static HTML/CSS/JS website (exported from Webflow)
- **Location**: Root directory (`/`)
- **No build process**: Direct HTML/CSS/JS files
- **Dev Server**: Python HTTP server on port 8080

### Key Files
```
index.html              # Homepage
recovery.html          # Crypto recovery services page
about-us.html          # About page
contact-new.html       # Contact page
css/                   # Stylesheets
js/                    # JavaScript files
images/                # Image assets
scripts/               # Utility scripts
```

### Running Locally
```bash
cd /Users/hamzeh/Desktop/Work/ZEFIX/CountWize
python3 -m http.server 8080
```
Visit: http://localhost:8080

### Current State
- Fully functional production website
- No active customization needed
- Used as reference for content/messaging

---

## Section 2: Jeton Clone Website (CountWize Theme)

### Purpose
A cloned version of the Jeton payment platform website that is being customized to align with CountWize's crypto recovery theme. This is a work-in-progress rebranding project.

### Technology
- **Type**: Nuxt.js static site (exported/minified)
- **Location**: `jeton-site/` directory
- **Content Storage**: Dual storage system (see Critical Note below)
- **HTML Format**: Minified (single-line, hard to read)

### Critical Technical Detail: Dual Content Storage

**⚠️ IMPORTANT**: Content is stored in **TWO locations** and **BOTH must be updated**:

1. **`jeton-site/index.html`** - Minified HTML (single line, ~260 lines total)
   - Contains the actual HTML markup
   - Text is embedded directly in the HTML

2. **`jeton-site/_payload.json`** - Nuxt.js payload data (JSON format)
   - Contains all dynamic content that Nuxt.js loads at runtime
   - This is what the JavaScript actually uses to render content
   - If you only update HTML, changes won't appear (browser loads from JSON)

**Rule**: When updating text content, **ALWAYS update both files**.

### Current Customization Status

#### ✅ Completed Changes

1. **Hero Introduction Section** (`_hero-introduction`)
   - **Heading**: "Unify your\nfinances" → "Recover\ncrypto assets"
   - **Taglines**: "Add", "Send", "Exchange" → "Track", "Analyze", "Recover"
   - **Snippet Images**: Alt texts updated to "Track snippet", "Analyze snippet", "Investigate snippet", "Recover snippet"
   - **Files Updated**: `index.html` and `_payload.json`

2. **Currency Exchange Section** (`_currency-exchange-calculator`)
   - **Tag**: "Exchange" → "Recovery"
   - **Heading**: "Convert fiat\ncash easily." → "Recover lost\nassets securely."
   - **Files Updated**: `index.html` and `_payload.json`

3. **Shader Background Animation**
   - Replaced video background with WebGL shader animation
   - Integrated from React Three Fiber component (`synthetic-hero.tsx`)
   - Implemented in vanilla JavaScript
   - CSS ensures proper layering and visibility

#### ⚠️ Pending Customization (Not Yet Done)

1. **Common Header Section** (`_common-header`)
   - Current: "One app for all needs" / "Single account for all your payments"
   - Needs: Crypto recovery messaging
   - Location: Top hero section

2. **Jeton Walkthrough Section** (`_jeton-walkthrough`)
   - Current: 5-step process about payments/money transfers
   - Steps: "All currencies", "One App", "Move your money across Europe", etc.
   - Stepper: "01 Account", "02 Add", "03 Method", "04 Review", "05 Done"
   - Needs: Crypto recovery process steps
   - Location: Main interactive walkthrough section

3. **Mobile App Hero Section** (`_mobile-app-hero`)
   - Current: "All your finances, in one app." / "Join 1M+ happy users today."
   - Needs: Crypto recovery messaging
   - Location: After walkthrough section

4. **Jeton Card Overview Section** (`_jeton-card-overview`)
   - Current: "Jeton Card: Your Go-To for Every Purchase" / "Contactless payments? Sure..."
   - Needs: Replace with crypto recovery services or remove
   - Location: Card promotion section

5. **Currency Exchange Calculator** (`_currency-exchange-calculator`)
   - Current: Disclaimer about conversion rates
   - Needs: Update disclaimer for crypto recovery context
   - Location: Currency converter section

6. **Client Testimonials Section** (`_client-testimonials`)
   - Current: 4 testimonials about Jeton payment app
   - Needs: Replace with crypto recovery testimonials
   - Location: Testimonials section

7. **Extra Bold Hero Section** (`_extra-bold-hero`)
   - Current: "1 million users, plus you." / "It only takes few seconds to get started."
   - Needs: Crypto recovery CTA messaging
   - Location: Final CTA section

8. **Meta Tags & SEO**
   - Current: "One app for all needs. Single account for all your payments. | Jeton"
   - Needs: Crypto recovery SEO content
   - Location: `<head>` section of `index.html`

9. **Navigation Menu**
   - Current: "Personal", "Business", "Company" sections
   - Needs: Restructure for CountWize navigation
   - Location: Main navigation menu

10. **Footer**
    - Current: Jeton company info, legal links, social links
    - Needs: CountWize company info and links
    - Location: Footer section

### File Structure
```
jeton-site/
├── index.html              # Main homepage (minified, ~260 lines, single line)
├── _payload.json           # Nuxt.js payload (contains all content data)
├── about/                  # Sub-pages
│   └── index.html
├── jeton-card/
│   └── index.html
├── fees/
│   └── index.html
└── ...                     # Other sub-pages
```

### Working with Minified HTML

The `index.html` file is minified (all on one line), making it difficult to read. Use these strategies:

1. **Use `grep`** to find exact strings:
   ```bash
   grep -i "pattern" jeton-site/index.html
   ```

2. **Use `search_replace`** tool for precise replacements:
   - Include enough context to make the string unique
   - Match exact whitespace and formatting

3. **Always verify** with `grep` after making changes

### Working with _payload.json

The `_payload.json` file is a Nuxt.js payload in JSON format. It contains:
- All text content
- Component configurations
- Page metadata
- Menu structures

**Key fields to update**:
- `"One app for all needs"` → Hero title
- `"Single account for all your payments."` → Hero description
- `"Track","Recover","Analyze"` → Taglines (already updated)
- `"Recover\ncrypto assets"` → Hero introduction title (already updated)
- `"Recover lost\nassets securely."` → Currency exchange title (already updated)
- And many more...

### Testing Changes

1. **Hard refresh browser**: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows/Linux)
2. **Clear browser cache** if changes don't appear
3. **Check both files** are updated
4. **Verify in browser DevTools** that content matches

### Common Issues

1. **Changes not appearing**: 
   - Likely only updated HTML, not `_payload.json`
   - Browser cached old `_payload.json`
   - Solution: Update both files, hard refresh

2. **Can't find text in HTML**:
   - Text might be in `_payload.json` only
   - HTML might be minified differently
   - Solution: Search in both files

3. **Nuxt.js hydration overwrites changes**:
   - This is expected behavior
   - Content loads from `_payload.json` at runtime
   - Solution: Always update `_payload.json`

---

## Development Workflow

### Making Content Changes

1. **Identify the section** to update
2. **Find the text** in both `index.html` and `_payload.json`
3. **Update both files** with the same change
4. **Verify** with `grep` that changes are present
5. **Test** in browser with hard refresh

### Example: Updating Hero Title

```bash
# 1. Find in HTML
grep "One app for all needs" jeton-site/index.html

# 2. Find in JSON
grep "One app for all needs" jeton-site/_payload.json

# 3. Update HTML (using search_replace tool)
# Replace: "One app for all needs"
# With: "Recover your lost crypto"

# 4. Update JSON (using search_replace tool)
# Replace: "One app for all needs"
# With: "Recover your lost crypto"

# 5. Verify
grep "Recover your lost crypto" jeton-site/index.html
grep "Recover your lost crypto" jeton-site/_payload.json
```

---

## Project Goals

### Primary Goal
Transform the Jeton payment platform clone into a CountWize crypto recovery services website by:
- Replacing all payment/finance messaging with crypto recovery messaging
- Maintaining the original design and animations
- Updating all text content to align with CountWize brand

### Constraints
- **Do NOT change animations or functionality** - Only update text content
- **Preserve all visual design elements**
- **Maintain responsive behavior**
- **Keep all interactive features working**

---

## Reference Materials

### CountWize Main Website
- Use `index.html` and `recovery.html` for:
  - Crypto recovery messaging inspiration
  - Service descriptions
  - Value propositions
  - Tone and style

### CountWize Recovery Page
- Use `recovery.html` for:
  - Detailed crypto recovery content
  - Service explanations
  - Process descriptions

---

## Git Status

### Current Changes
- Modified: `jeton-site/index.html` - Text content updates
- Modified: `jeton-site/_payload.json` - Nuxt.js payload updates
- Modified: Various sub-page HTML files
- Modified: `AUDIT_FINDINGS.md` - Documentation

### Untracked Files
- `jeton-site/fix-paths.js` - Utility script
- `jeton-site/server-control.js` - Utility script

---

## Key Commands

### Search for Content
```bash
# Search in HTML
grep -i "pattern" jeton-site/index.html

# Search in JSON
grep -i "pattern" jeton-site/_payload.json

# Search in both
grep -r "pattern" jeton-site/
```

### Run Dev Server (CountWize Main)
```bash
cd /Users/hamzeh/Desktop/Work/ZEFIX/CountWize
python3 -m http.server 8080
```

### Git Operations
```bash
# Check status
git status

# Stage all changes
git add .

# Commit
git commit -m "Description of changes"

# Push
git push origin main
```

---

## Important Notes for Claude

1. **Always update both files** (`index.html` AND `_payload.json`) when changing text
2. **HTML is minified** - use `grep` to find exact strings before replacing
3. **Browser caching** - users must hard refresh to see changes
4. **Nuxt.js hydration** - content loads from `_payload.json` at runtime
5. **Preserve animations** - only change text, not functionality
6. **Test after changes** - verify in browser with hard refresh

---

## Next Steps

1. Complete remaining customization items (list in "Pending Customization" section)
2. Update meta tags for SEO
3. Update navigation menu structure
4. Update footer with CountWize information
5. Final testing and verification
6. Deploy to production

---

## Questions to Ask User

If unclear about customization:
- What should the walkthrough steps be? (Currently about payments)
- What should testimonials say? (Currently about Jeton app)
- Should the Jeton Card section be removed or repurposed?
- What should the final CTA section say?
- What navigation structure should replace the current menu?

---

## Contact & Support

For questions about this project:
- Check `PROJECT_STRUCTURE.md` for file organization
- Check `AUDIT_FINDINGS.md` for known issues
- Review git history for change log
