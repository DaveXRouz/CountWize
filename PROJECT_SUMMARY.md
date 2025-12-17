# CountWize Project - Executive Summary

## Project Structure

This repository contains **two separate website projects**:

### 1. CountWize Main Website (Section 1)
- **Location**: Root directory
- **Type**: Static HTML/CSS/JS (Webflow export)
- **Status**: Production website, fully functional
- **Purpose**: Original CountWize crypto recovery services website

### 2. Jeton Clone Website (Section 2) 
- **Location**: `jeton-site/` directory
- **Type**: Nuxt.js static site (minified export)
- **Status**: Work-in-progress customization
- **Purpose**: Cloned Jeton payment platform being rebranded for CountWize crypto recovery theme

---

## Current Work Status

### ✅ Completed Customizations (Jeton Clone)

1. **Hero Introduction Section**
   - Heading: "Recover\ncrypto assets" (was "Unify your\nfinances")
   - Taglines: "Track", "Analyze", "Recover" (was "Add", "Send", "Exchange")
   - Snippet alt texts updated

2. **Currency Exchange Section**
   - Tag: "Recovery" (was "Exchange")
   - Heading: "Recover lost\nassets securely." (was "Convert fiat\ncash easily.")

3. **Shader Background**
   - Replaced video with WebGL shader animation
   - Integrated from React Three Fiber component

### ⚠️ Remaining Customizations (Jeton Clone)

1. Common Header - "One app for all needs" messaging
2. Jeton Walkthrough - 5-step process content
3. Mobile App Hero - "All your finances" section
4. Jeton Card Overview - Card promotion section
5. Client Testimonials - All 4 testimonials
6. Extra Bold Hero - Final CTA section
7. Meta Tags - SEO titles/descriptions
8. Navigation Menu - Menu structure
9. Footer - Company info and links

---

## Critical Technical Information

### Dual Content Storage System

**⚠️ CRITICAL**: The Jeton clone uses a **dual storage system**. Content must be updated in **BOTH locations**:

1. **`jeton-site/index.html`** - Minified HTML (single line, hard to read)
2. **`jeton-site/_payload.json`** - Nuxt.js payload (JSON format, runtime data)

**Why both?** Nuxt.js loads content from `_payload.json` at runtime. If you only update HTML, changes won't appear in the browser.

**Rule**: Always update both files when changing text content.

### Working with Minified HTML

The HTML is minified (all on one line), making it difficult to edit directly. Use:
- `grep` to find exact strings
- `search_replace` with sufficient context
- Always verify changes with `grep` after editing

### Testing Changes

- **Hard refresh required**: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- **Clear browser cache** if changes don't appear
- **Check both files** are updated before testing

---

## Documentation Files

1. **`CLAUDE_PROMPT.md`** - Complete documentation for Claude AI
   - Full project explanation
   - Technical details
   - Development workflow
   - Customization status
   - **Use this file when asking Claude to work on the project**

2. **`PROJECT_STRUCTURE.md`** - Project organization
   - File structure
   - Section descriptions
   - Key files and locations

3. **`README.md`** - Updated overview
   - Quick reference
   - Links to detailed docs

---

## Development Commands

### Run CountWize Main Website
```bash
cd /Users/hamzeh/Desktop/Work/ZEFIX/CountWize
python3 -m http.server 8080
```

### Search for Content
```bash
# In HTML
grep -i "pattern" jeton-site/index.html

# In JSON
grep -i "pattern" jeton-site/_payload.json
```

### Git Operations
```bash
git status          # Check changes
git add .           # Stage all
git commit -m "..."  # Commit
git push            # Push to remote
```

---

## Next Steps

1. Complete remaining customizations (see "Remaining Customizations" above)
2. Update meta tags for SEO
3. Restructure navigation menu
4. Update footer content
5. Final testing and verification
6. Deploy to production

---

## Quick Reference

- **Main Website**: Root directory, static HTML
- **Clone Website**: `jeton-site/` directory, Nuxt.js
- **Content Updates**: Update both `index.html` AND `_payload.json`
- **Testing**: Hard refresh browser after changes
- **Documentation**: See `CLAUDE_PROMPT.md` for complete details

---

## For Claude AI

When working on this project, **always read `CLAUDE_PROMPT.md` first**. It contains:
- Complete project structure
- Technical implementation details
- Customization status
- Development workflow
- Common issues and solutions

**Key Rule**: When updating text in the Jeton clone, update BOTH `index.html` and `_payload.json`.
