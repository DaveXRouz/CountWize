# Complete Project Prompt for Claude AI

## Context

You are working on a repository that contains **two distinct website projects**:

1. **CountWize Main Website** - A production crypto recovery services website (static HTML/CSS/JS)
2. **Jeton Clone Website** - A cloned Jeton payment platform being rebranded for CountWize (Nuxt.js static site)

The primary focus is **customizing the Jeton clone** to align with CountWize's crypto recovery theme by replacing all payment/finance messaging with crypto recovery messaging.

---

## Project Structure

### Section 1: CountWize Main Website
- **Location**: Root directory (`/`)
- **Files**: `index.html`, `recovery.html`, `about-us.html`, etc.
- **Technology**: Static HTML/CSS/JS (Webflow export)
- **Status**: Production site, fully functional
- **Purpose**: Reference for content/messaging inspiration

### Section 2: Jeton Clone Website (CountWize Theme)
- **Location**: `jeton-site/` directory
- **Main Files**: 
  - `jeton-site/index.html` - Minified HTML (single line, ~260 lines)
  - `jeton-site/_payload.json` - Nuxt.js payload data (JSON format)
- **Technology**: Nuxt.js static site (exported/minified)
- **Status**: Work-in-progress customization
- **Purpose**: Being rebranded from payment platform to crypto recovery services

---

## ⚠️ CRITICAL: Dual Content Storage System

**THE MOST IMPORTANT THING TO UNDERSTAND:**

The Jeton clone uses a **dual content storage system**. When you update text content, you **MUST update BOTH files**:

1. **`jeton-site/index.html`** - Contains the HTML markup (minified, hard to read)
2. **`jeton-site/_payload.json`** - Contains the Nuxt.js payload data (JSON format)

**Why?** Nuxt.js loads content from `_payload.json` at runtime via JavaScript. If you only update the HTML file, the changes won't appear in the browser because the JavaScript overwrites the HTML with content from the JSON file.

**Rule**: Every text change requires updating BOTH `index.html` AND `_payload.json`.

**Example**:
```javascript
// If you want to change "One app for all needs" to "Recover your crypto"
// You must:
// 1. Update in index.html
// 2. Update in _payload.json
// 3. Both files must have the exact same new text
```

---

## Current Customization Status

### ✅ Completed (Already Done)

1. **Hero Introduction Section** (`_hero-introduction`)
   - Heading: "Recover\ncrypto assets" ✅
   - Taglines: "Track", "Analyze", "Recover" ✅
   - Snippet alt texts: Updated ✅
   - **Files**: Both `index.html` and `_payload.json` updated

2. **Currency Exchange Section** (`_currency-exchange-calculator`)
   - Tag: "Recovery" ✅
   - Heading: "Recover lost\nassets securely." ✅
   - **Files**: Both `index.html` and `_payload.json` updated

3. **Shader Background Animation**
   - WebGL shader replaces video background ✅
   - Integrated from React Three Fiber component ✅

### ⚠️ Pending (Not Yet Done)

1. **Common Header** (`_common-header`)
   - Current: "One app for all needs" / "Single account for all your payments"
   - Needs: Crypto recovery messaging
   - **Files to update**: `index.html` and `_payload.json`

2. **Jeton Walkthrough** (`_jeton-walkthrough`)
   - Current: 5-step payment process
   - Steps: "All currencies", "One App", "Move your money across Europe", etc.
   - Stepper: "01 Account", "02 Add", "03 Method", "04 Review", "05 Done"
   - Needs: Crypto recovery process steps
   - **Files to update**: `index.html` and `_payload.json`

3. **Mobile App Hero** (`_mobile-app-hero`)
   - Current: "All your finances, in one app." / "Join 1M+ happy users today."
   - Needs: Crypto recovery messaging
   - **Files to update**: `index.html` and `_payload.json`

4. **Jeton Card Overview** (`_jeton-card-overview`)
   - Current: "Jeton Card: Your Go-To for Every Purchase" / "Contactless payments? Sure..."
   - Needs: Replace with crypto recovery services or remove
   - **Files to update**: `index.html` and `_payload.json`

5. **Client Testimonials** (`_client-testimonials`)
   - Current: 4 testimonials about Jeton payment app
   - Needs: Crypto recovery testimonials
   - **Files to update**: `index.html` and `_payload.json`

6. **Extra Bold Hero** (`_extra-bold-hero`)
   - Current: "1 million users, plus you." / "It only takes few seconds to get started."
   - Needs: Crypto recovery CTA
   - **Files to update**: `index.html` and `_payload.json`

7. **Meta Tags** (in `<head>`)
   - Current: "One app for all needs. Single account for all your payments. | Jeton"
   - Needs: Crypto recovery SEO content
   - **Files to update**: `index.html` only (meta tags not in JSON)

8. **Navigation Menu**
   - Current: "Personal", "Business", "Company" sections
   - Needs: Restructure for CountWize
   - **Files to update**: `index.html` and `_payload.json`

9. **Footer**
   - Current: Jeton company info, legal links
   - Needs: CountWize company info
   - **Files to update**: `index.html` and `_payload.json`

---

## Working with Minified HTML

The `index.html` file is **minified** (all HTML on a single line, ~260 lines total). This makes it difficult to read and edit.

### Strategies:

1. **Use `grep` to find exact strings**:
   ```bash
   grep -i "One app for all needs" jeton-site/index.html
   ```

2. **Use `search_replace` with sufficient context**:
   - Include enough surrounding text to make the string unique
   - Match exact whitespace and formatting
   - Example: Include 10-20 characters before and after

3. **Always verify with `grep` after changes**:
   ```bash
   grep -i "new text" jeton-site/index.html
   ```

### Example Replacement:

```javascript
// Find the string first
grep "One app for all needs" jeton-site/index.html

// Replace with context (enough to make it unique)
search_replace(
  file: "jeton-site/index.html",
  old_string: 'title":145},"CommonHeader",{"ctas":118,"description":127,"media":128,"title":145},[119,123],{"link":120,"store":122},{"type":42,"url":121},"https://apps.apple.com/us/app/jeton/id6499320378","app-store",{"link":124,"store":126},{"type":42,"url":125},"https://play.google.com/store/apps/details?id=com.jeton.app","google-play","Single account for all your payments.",{"asset":129,"role":144},{"height":130,"mediaType":131,"muted":98,"sources":132,"type":143,"width":135},2160,"video/mp4",[133,136,140],{"height":130,"type":131,"url":134,"width":135},"https://jetonbucket.fra1.cdn.digitaloceanspaces.com/jeton/2024-08-08T10-52-28.593Z-jeton-homepage-fhd2.mp4",3840,{"height":137,"type":131,"url":138,"width":139},1080,"https://jetonbucket.fra1.cdn.digitaloceanspaces.com/jeton/2024-08-08T10-52-41.402Z-jeton-homepage-hd2.mp4",1920,{"height":130,"type":131,"url":141,"width":142},"https://jetonbucket.fra1.cdn.digitaloceanspaces.com/jeton/2024-08-08T10-52-53.656Z-jeton-homepage-mobile2.mp4",1440,"video","Background","One app for all needs",
  new_string: 'title":145},"CommonHeader",{"ctas":118,"description":127,"media":128,"title":145},[119,123],{"link":120,"store":122},{"type":42,"url":121},"https://apps.apple.com/us/app/jeton/id6499320378","app-store",{"link":124,"store":126},{"type":42,"url":125},"https://play.google.com/store/apps/details?id=com.jeton.app","google-play","Single account for all your payments.",{"asset":129,"role":144},{"height":130,"mediaType":131,"muted":98,"sources":132,"type":143,"width":135},2160,"video/mp4",[133,136,140],{"height":130,"type":131,"url":134,"width":135},"https://jetonbucket.fra1.cdn.digitaloceanspaces.com/jeton/2024-08-08T10-52-28.593Z-jeton-homepage-fhd2.mp4",3840,{"height":137,"type":131,"url":138,"width":139},1080,"https://jetonbucket.fra1.cdn.digitaloceanspaces.com/jeton/2024-08-08T10-52-41.402Z-jeton-homepage-hd2.mp4",1920,{"height":130,"type":131,"url":141,"width":142},"https://jetonbucket.fra1.cdn.digitaloceanspaces.com/jeton/2024-08-08T10-52-53.656Z-jeton-homepage-mobile2.mp4",1440,"video","Background","Recover your lost crypto",
)
```

---

## Working with _payload.json

The `_payload.json` file is a Nuxt.js payload in JSON format. It's a single-line JSON array containing all content data.

### Key Content Fields:

- `"One app for all needs"` - Hero title
- `"Single account for all your payments."` - Hero description
- `"Track","Recover","Analyze"` - Taglines (already updated)
- `"Recover\ncrypto assets"` - Hero introduction title (already updated)
- `"Recover lost\nassets securely."` - Currency exchange title (already updated)
- `"All your finances, in one app."` - Mobile app hero title
- `"Join 1M+ happy users today."` - Mobile app hero description
- `"Jeton Card: Your Go-To for Every Purchase"` - Card section title
- `"Hear it from our clients"` - Testimonials title
- `"1 million users, plus you."` - Extra bold hero title
- `"It only takes few seconds to get started."` - Extra bold hero description
- And many more...

### Finding Content in JSON:

```bash
# Search for specific text
grep -i "One app for all needs" jeton-site/_payload.json

# The JSON is minified, so results will show the string in context
```

### Updating JSON:

Use `search_replace` with the exact string. The JSON is minified, so strings appear without extra whitespace.

**Example**:
```javascript
search_replace(
  file: "jeton-site/_payload.json",
  old_string: '"One app for all needs"',
  new_string: '"Recover your lost crypto"'
)
```

---

## Development Workflow

### Step-by-Step Process for Updating Content:

1. **Identify the section** you want to update
2. **Find the text** in both files:
   ```bash
   grep -i "text to find" jeton-site/index.html
   grep -i "text to find" jeton-site/_payload.json
   ```
3. **Update HTML file** using `search_replace` with sufficient context
4. **Update JSON file** using `search_replace` with exact string match
5. **Verify both files**:
   ```bash
   grep -i "new text" jeton-site/index.html
   grep -i "new text" jeton-site/_payload.json
   ```
6. **Test in browser**:
   - Open `jeton-site/index.html` in browser
   - Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
   - Verify changes appear

### Common Patterns:

**Pattern 1: Simple Text Replacement**
```javascript
// HTML
search_replace("jeton-site/index.html", "Old Text", "New Text")
// JSON
search_replace("jeton-site/_payload.json", '"Old Text"', '"New Text"')
```

**Pattern 2: Multi-line Text (with \n)**
```javascript
// HTML
search_replace("jeton-site/index.html", "Old\nText", "New\nText")
// JSON
search_replace("jeton-site/_payload.json", '"Old\nText"', '"New\nText"')
```

**Pattern 3: Text with Special Characters**
```javascript
// Escape special characters if needed
// JSON uses \" for quotes in strings
search_replace("jeton-site/_payload.json", '"Text with "quotes""', '"New text"')
```

---

## Testing & Verification

### After Making Changes:

1. **Verify in both files**:
   ```bash
   grep -i "new text" jeton-site/index.html
   grep -i "new text" jeton-site/_payload.json
   ```

2. **Hard refresh browser**:
   - Mac: Cmd+Shift+R
   - Windows/Linux: Ctrl+Shift+R
   - Or: Clear browser cache

3. **Check browser DevTools**:
   - Inspect element to verify HTML updated
   - Check Network tab to see `_payload.json` loading
   - Verify content matches in both source and rendered view

### Troubleshooting:

**Issue**: Changes don't appear in browser
- **Cause**: Only updated one file (HTML or JSON)
- **Solution**: Update both files, hard refresh

**Issue**: Can't find text in HTML
- **Cause**: Text might only be in JSON, or HTML is minified differently
- **Solution**: Search in both files, check for variations

**Issue**: JSON update breaks formatting
- **Cause**: Incorrect string replacement, broke JSON structure
- **Solution**: Verify JSON is still valid, check for syntax errors

---

## Content Reference

### Use CountWize Main Website for Inspiration:

- **`index.html`** - Homepage messaging
- **`recovery.html`** - Crypto recovery content
- **`about-us.html`** - Company information

### Key CountWize Messaging Themes:

- Crypto recovery services
- Lost/stolen asset recovery
- Blockchain forensics
- Secure recovery process
- Expert assistance
- Track, Analyze, Recover workflow

---

## Constraints & Rules

### ✅ DO:
- Update text content only
- Maintain all animations and functionality
- Preserve visual design elements
- Keep responsive behavior
- Update both HTML and JSON files
- Test with hard refresh after changes

### ❌ DON'T:
- Change animations or functionality
- Modify CSS (unless explicitly requested)
- Change JavaScript logic
- Remove interactive features
- Break responsive design
- Update only one file (HTML or JSON)

---

## File Locations Reference

### CountWize Main Website:
- Homepage: `/index.html`
- Recovery: `/recovery.html`
- About: `/about-us.html`
- CSS: `/css/`
- Images: `/images/`

### Jeton Clone Website:
- Main page: `/jeton-site/index.html`
- Payload: `/jeton-site/_payload.json`
- Sub-pages: `/jeton-site/about/`, `/jeton-site/jeton-card/`, etc.

---

## Quick Command Reference

```bash
# Search in HTML
grep -i "pattern" jeton-site/index.html

# Search in JSON
grep -i "pattern" jeton-site/_payload.json

# Search in both
grep -ri "pattern" jeton-site/

# Run dev server (CountWize main)
cd /Users/hamzeh/Desktop/Work/ZEFIX/CountWize
python3 -m http.server 8080

# Git operations
git status
git add .
git commit -m "Description"
git push
```

---

## When User Asks You to Update Content

1. **Ask for clarification** if the request is unclear
2. **Identify the section** to update
3. **Find the text** in both files using `grep`
4. **Update both files** using `search_replace`
5. **Verify changes** with `grep`
6. **Inform user** to hard refresh browser

---

## Example Task: Update Hero Title

**User Request**: "Change 'One app for all needs' to 'Recover your lost crypto'"

**Your Actions**:
1. Find in HTML: `grep "One app for all needs" jeton-site/index.html`
2. Find in JSON: `grep "One app for all needs" jeton-site/_payload.json`
3. Update HTML with sufficient context
4. Update JSON with exact string
5. Verify: `grep "Recover your lost crypto" jeton-site/index.html`
6. Verify: `grep "Recover your lost crypto" jeton-site/_payload.json`
7. Tell user: "Updated in both files. Please hard refresh browser (Cmd+Shift+R) to see changes."

---

## Important Reminders

1. **Always update both files** (HTML and JSON)
2. **HTML is minified** - use grep to find exact strings
3. **JSON is minified** - strings appear without extra whitespace
4. **Hard refresh required** - browser caches the payload JSON
5. **Preserve functionality** - only change text, not code
6. **Test after changes** - verify in browser with hard refresh

---

## Questions to Ask User

If unclear about customization:
- What should replace [specific text]?
- Should [section] be removed or repurposed?
- What should the [section] say?
- Do you want to keep [feature] or remove it?

---

## Documentation Files

- **`CLAUDE_PROMPT.md`** - This file (complete documentation)
- **`PROJECT_STRUCTURE.md`** - File organization details
- **`PROJECT_SUMMARY.md`** - Executive summary
- **`README.md`** - Quick overview

**Always read `CLAUDE_PROMPT.md` first when starting work on this project.**

---

## End of Prompt

You now have complete context about this project. Remember:
- Two separate websites in one repository
- Jeton clone uses dual storage (HTML + JSON)
- Always update both files
- Preserve animations and functionality
- Test with hard refresh

Good luck! 🚀
