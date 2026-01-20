# Phase C Tasks

**Total Tasks:** 5
**Estimated Tokens:** ~85,754
**Status:** pending

---

## Task C.1: Task 3.3: Remove Dashes from Content (Site-wide)

**Complexity:** Medium
**Files:** **

**Issues:** #001, #007, #008, #010, #012, #013, #015, #017, #028, #029, #035  
**Complexity:** Medium (requires judgment)

**Files to Modify:**
- `about-us.html` — Hero headline (line 139)
- `index.html` — Hero headline (line 245)
- `crypto-recovery.html` — Multiple sections
- `crypto-recovery-guide.html` — Multiple sections
- `blog/` — Blog posts

**What to Change:**

| Pattern | Replacement |
|---------|-------------|
| `Services—Handled` | `Services. Handled.` |
| `-Your Assets` | `Your Assets` |
| `Crypto Recovery - Lost` | `Crypto Recovery: Lost` |
| `happens - don't` | `happens, don't` |
| `consultation-just` | `consultation. Just` |

```html
<!-- BEFORE (#035): -->
<h1>Crypto Recovery <br>Services—Handled</h1>

<!-- AFTER: -->
<h1>Crypto Recovery <br>Services. Handled.</h1>
```

```html
<!-- BEFORE (#001): -->
<h1>Your Trusted Tool Recovery Services<br>-Your Assets, Our Expertise</h1>

<!-- AFTER: -->
<h1>Your Trusted Tool Recovery Services<br>Your Assets, Our Expertise</h1>
```

> **Note:** "two-factor" and "step-by-step" are acceptable compound words.

**Acceptance Criteria:**
- [ ] No em-dashes (—) in headlines
- [ ] No spaced hyphens ( - ) used as punctuation

---



---

## Task C.2: Task 3.4: Regenerate Book Cover Images

**Complexity:** Medium
**Files:** **

**Issues:** #024  
**Complexity:** Complex (requires design work)

**Files to Modify:**
- Book cover image files in `images/`

**What to Change:**

This is a design task, not code:
1. Identify all book cover image files
2. Re-export with corrected "CountWize" spelling (not "CountWise")
3. Replace files in `images/` folder

**Acceptance Criteria:**
- [ ] All book cover images show "CountWize" (with 'z')

---

## Phase 4: Layout Polish (Days 11-14)

---



---

## Task C.3: Task 4.1: Fix Core Values Layout

**Complexity:** Medium
**Files:** **

**Issues:** #003 (layout aspect)  
**Complexity:** Simple

**Files to Modify:**
- `css/main.css` — Core values section styles
- Or inline in `about-us.html`

**What to Change:**
```css
/* Find .core-values-heading-wrapper and change: */
.core-values-heading-wrapper {
  display: flex;
  flex-direction: column; /* Changed from row */
  align-items: center;
  text-align: center;
}
```

**Acceptance Criteria:**
- [ ] Section heading appears above description text (not beside)

---



---

## Task C.4: Task 4.2: Fix Footer Layout

**Complexity:** Medium
**Files:** **

**Issues:** #006  
**Complexity:** Medium

**Files to Modify:**
- `css/main.css` — Footer styles

**What to Change:**
```css
.footer-contact-groups-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.footer-social-wrapper {
  /* Associate with contact section, not floating */
  margin-top: 1rem;
}
```

**Acceptance Criteria:**
- [ ] Phone, email, social grouped together
- [ ] Location clearly separated
- [ ] Social icons not floating disconnected

---



---

## Task C.5: Task 4.3: Fix Blog Grid Centering

**Complexity:** Medium
**Files:** **

**Issues:** #027  
**Complexity:** Simple

**Files to Modify:**
- `css/main.css` or `blog.html`

**What to Change:**
```css
.blog-articles-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}

.blog-article-card {
  flex: 0 0 calc(50% - 1rem);
  max-width: 500px;
}
```

**Acceptance Criteria:**
- [ ] Odd-numbered last article is centered

---



---

