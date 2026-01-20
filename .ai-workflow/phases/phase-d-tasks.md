# Phase D Tasks

**Total Tasks:** 2
**Estimated Tokens:** ~32,446
**Status:** pending

---

## Task D.1: Task 4.4: Fix Hero CTA Button Position

**Complexity:** Medium
**Files:** **

**Issues:** #036  
**Complexity:** Simple

**Files to Modify:**
- `css/main.css` — Hero section styles

**What to Change:**
```css
.hero-content-wrapper {
  display: flex;
  flex-direction: column; /* Stack vertically */
  align-items: flex-start;
  gap: 1.5rem;
}
```

**Acceptance Criteria:**
- [ ] Hero layout: Headline → Subtext → CTA (stacked vertically)

---



---

## Task D.2: Task 4.5: Improve Book Cover Designs

**Complexity:** Medium

**Issues:** #025  
**Complexity:** Complex (design work)

**What to Change:**

Design task - create unique covers for each book:
- Legal Framework: Gavel, scales
- Wallet Recovery: Key, lock
- Blockchain Forensics: Magnifying glass
- Beware of Scams: Warning signs
- Case Studies: Success icons

**Acceptance Criteria:**
- [ ] Each book has visually distinct cover

---

## Verification Commands

```bash
# Check for remaining brand name issues:
grep -r "Count Wise" *.html
grep -r "Count Wize" *.html

# Check for obvious dash punctuation:
grep -r " - " *.html | head -20
grep -r "—" *.html | head -20

# Start local server for testing:
cd "/Users/hamzeh/Desktop/GitHub/CountWize  - Website"
python3 -m http.server 8000
# Visit http://localhost:8000
```

---

## Manual Testing Checklist

| Page | What to Check |
|------|---------------|
| `/` (Home) | Hero CTA below headline; Video button works; Lessons play; News functional |
| `/about-us.html` | Embed works; Icons distinct; Team visible; Core Values vertical |
| `/crypto-recovery-guide.html` | All images display; No misplaced images in text |
| `/crypto-education.html` | Book covers display; EBooks text clean |
| `/news.html` | All sections load; No placeholders; Links work |
| `/blog.html` | Brand name correct; Grid centers odd items |
| **All pages** | "CountWize" consistent; No dashes in copy |

---

*Generated from 41-issue QA report — January 2026*



---

