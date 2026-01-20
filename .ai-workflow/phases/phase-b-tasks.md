# Phase B Tasks

**Total Tasks:** 5
**Estimated Tokens:** ~85,777
**Status:** pending

---

## Task B.1: Task 2.3: Fix Empty Team Section

**Complexity:** Medium
**Files:** **

**Issues:** #004  
**Complexity:** Medium

**Files to Modify:**
- `about-us.html` — Experts section

**What to Change:**

Option A: The team content already exists (~line 264-283). Verify it's rendering.

Option B: Add link to team.html:
```html
<a href="team.html" class="btn">Meet Our Full Team →</a>
```

Option C: Remove empty section heading if no content planned.

**Acceptance Criteria:**
- [ ] Section shows team members, links to team.html, or is removed

---



---

## Task B.2: Task 2.4: Fix Wrong Video in EBooks

**Complexity:** Medium
**Files:** **

**Issues:** #021  
**Complexity:** Simple

**Files to Modify:**
- `crypto-education.html` — EBooks section

**What to Change:**
```html
<!-- Option A: Replace with correct video -->
<button onclick="playVideo('CORRECT_EBOOK_VIDEO_ID')">Play video</button>

<!-- Option B: Change CTA to match section -->
<a href="#books-section" class="btn">Browse eBooks</a>
```

**Acceptance Criteria:**
- [ ] Video button plays eBook-related content OR CTA matches section purpose

---



---

## Task B.3: Task 2.5: Fix Platform Links

**Complexity:** Medium
**Files:** **

**Issues:** #038  
**Complexity:** Simple

**Files to Modify:**
- `index.html` — Supported Platforms section (~line 387-395)

**What to Change:**

Verify links work (they appear to already have real URLs):
```html
<a href="https://www.binance.com/en/square/post/22994522805130" target="_blank">
  <img src="images/binance_logo-1.svg" alt="Binance">
</a>
```

If any platform link is dead, either update URL or remove logo.

**Acceptance Criteria:**
- [ ] Each platform logo links to actual CountWize content
- [ ] OR misleading logos removed if no actual presence

---

## Phase 3: Brand Consistency (Days 8-10)

> **WARNING:** Brand name must be "CountWize" everywhere. No variations.

---



---

## Task B.4: Task 3.1: Fix "Count Wise" → "CountWize" (Site-wide)

**Complexity:** Medium
**Files:** **

**Issues:** #003, #018, #019 + many more  
**Complexity:** Simple (bulk find/replace)

**Files to Modify:**
- `about-us.html` — Line 186
- `faq-crypto-recovery.html` — Lines 242, 248, 274, 282, 287, 300, 313, 352
- `crypto-tax.html` — Lines 361, 367, 372, 378, 383, 400, 427
- `crypto-recovery.html` — Lines 356, 361, 387, 395, 400, 413, 426, 465
- `crypto-recovery-guide.html` — Line 449+
- `team.html` — Lines 115, 182, 188, 193, 199, 204, 221, 248
- `recovery.html` — Lines 264, 628, 661, 672, 677, 685, 707, 718
- `blog.html` — Lines 249, 254, 280, 288, 293, 306, 319, 358

**What to Change:**
```bash
# Bulk replacement:
sed -i 's/Count Wise/CountWize/g' *.html
```

```html
<!-- BEFORE: -->
<h2>Core Values Guiding Count Wise</h2>
<div class="faq-question">What services does Count Wise offer?</div>

<!-- AFTER: -->
<h2>Core Values Guiding CountWize</h2>
<div class="faq-question">What services does CountWize offer?</div>
```

**Acceptance Criteria:**
- [ ] Zero instances of "Count Wise" (two words) in codebase
- [ ] `grep -r "Count Wise" *.html` returns empty

---



---

## Task B.5: Task 3.2: Fix "Count Wize" → "CountWize"

**Complexity:** Medium
**Files:** **

**Issues:** #026  
**Complexity:** Simple

**Files to Modify:**
- `blog.html` — Line 139

**What to Change:**
```html
<!-- BEFORE: -->
<h1 class="hero-heading"><span class="highlighted-word">Blog</span> Count Wize</h1>

<!-- AFTER: -->
<h1 class="hero-heading"><span class="highlighted-word">Blog</span> CountWize</h1>
```

**Acceptance Criteria:**
- [ ] Blog page header reads "Blog CountWize"

---



---

