# Phase A Tasks

**Total Tasks:** 5
**Estimated Tokens:** ~86,333
**Status:** pending

---

## Task A.1: Task 1.1: Fix Embedded Content Failures

**Complexity:** Medium
**Files:** **

**Issues:** #005, #039  
**Complexity:** Complex

**Files to Modify:**
- `about-us.html` — Line ~295
- `index.html` — Line ~337 (lightbox JSON)
- `netlify.toml` — CSP headers (if needed)

**What to Change:**

Replace Embedly wrapper iframes with direct Vimeo embeds:

```html
<!-- BEFORE (broken): -->
<iframe class="embedly-embed" src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fplayer.vimeo.com..." ...></iframe>

<!-- AFTER (fixed): -->
<iframe 
  src="https://player.vimeo.com/video/1061354345?title=0&byline=0&portrait=0&dnt=1&badge=0&controls=1&color=07B96A" 
  style="border: none; background-color: #000;"
  allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
  allowfullscreen
  title="CountWize"
></iframe>
```

**Acceptance Criteria:**
- [ ] Embedded content loads without error on About page
- [ ] Embedded content loads without error on Home page
- [ ] No "content blocked" message visible to users

---



---

## Task A.2: Task 1.2: Fix Video Player Integration

**Complexity:** Medium
**Files:** **

**Issues:** #022, #037, #040  
**Complexity:** Complex

**Files to Modify:**
- `index.html` — Hero video button (~line 327), Lessons section
- `crypto-education.html` — Lessons For You section

**What to Change:**

**Fix #037 (Hero video button redirects to registration):**
```html
<!-- BEFORE (deceptive): -->
<a href="/recovery-questionnaire.html" class="watch-video-btn">Watch video</a>

<!-- AFTER option A - actual video link: -->
<a href="https://vimeo.com/1061354345" class="watch-video-btn" target="_blank">Watch video</a>

<!-- AFTER option B - remove if no video exists: -->
<!-- Delete the entire watch-video element -->
```

**Fix #022, #040 (Video cards non-functional):**
Verify lesson cards have proper click handlers - they already have `data-video-url` attributes, ensure JavaScript is switching the player iframe src.

**Acceptance Criteria:**
- [ ] "Watch video" hero button plays a video (not registration redirect)
- [ ] OR hero "Watch video" button is removed if no video exists
- [ ] Lesson cards on Home and Education pages play videos when clicked

---



---

## Task A.3: Task 1.3: Fix News Feed Integration

**Complexity:** Medium
**Files:** **

**Issues:** #030, #031, #032, #033, #034, #041  
**Complexity:** Complex

**Files to Modify:**
- `index.html` — Social News section (~line 1160+)
- `news.html` — All news sections

**What to Change:**

Replace placeholder cards with curated static content:

```html
<!-- BEFORE (placeholder): -->
<div id="source-name1" class="source-name-new">Binance Twitter</div>
<div id="time-since1" class="time-since-new">3h ago</div>
<div id="title-link1" class="title-link-new">Text Link</div>
<a id="buttonLink1" href="#">...</a>

<!-- AFTER (real content): -->
<div id="source-name1" class="source-name-new">CoinDesk</div>
<div id="time-since1" class="time-since-new">Jan 15, 2026</div>
<div id="title-link1" class="title-link-new">Bitcoin Hits New All-Time High Amid ETF Inflows</div>
<a id="buttonLink1" href="https://coindesk.com/article-url" target="_blank" rel="noopener">...</a>
```

**For duplicate articles (#033):** Ensure each Trending card has unique content.

**Acceptance Criteria:**
- [ ] No "Cannot load link" errors visible
- [ ] No identical placeholder cards ("Binance Twitter", "3h ago")
- [ ] All news links work and open external articles
- [ ] No duplicate articles in Trending section

---

## Phase 2: Content Integrity (Days 4-7)

> **IMPORTANT:** Fix broken images and misplaced content affecting visual quality.

---



---

## Task A.4: Task 2.1: Fix Missing/Broken Images

**Complexity:** Medium
**Files:** **

**Issues:** #002, #009, #011, #014, #023  
**Complexity:** Medium

**Files to Modify:**
- `about-us.html` — Mission & Vision icons (~line 168, 173)
- `crypto-recovery-guide.html` — Multiple broken images
- `crypto-education.html` — Book covers
- `images/` — May need new assets

**What to Change:**

**#002 (Mission & Vision use same icon):**
```html
<!-- BEFORE: -->
<img src="images/vector_2.svg" loading="lazy" alt="icon"> <!-- Used for both -->

<!-- AFTER: -->
<!-- Mission: Use target/compass icon -->
<img src="images/mission-icon.svg" loading="lazy" alt="Our Mission">
<!-- Vision: Use telescope/eye icon -->
<img src="images/vision-icon.svg" loading="lazy" alt="Our Vision">
```

**#009 (5 recovery reason cards missing icons):**
Create/upload icons for:
1. Loss of recovery phrase → key icon
2. Phishing → hook icon
3. Erroneous translation → wrong arrow icon
4. Malicious software → bug icon
5. Unreliable network → broken wifi icon

**#011, #014:** Search for `alt="bitcoin"` and `alt="crypto-recovery"` and fix image paths.

**Acceptance Criteria:**
- [ ] Mission and Vision show distinct, contextual icons
- [ ] All 5 recovery reason cards show relevant icons
- [ ] All section images display properly

---



---

## Task A.5: Task 2.2: Remove Misplaced Images from Text

**Complexity:** Medium
**Files:** **

**Issues:** #016, #020  
**Complexity:** Simple

**Files to Modify:**
- `crypto-recovery-guide.html` — Real Case Example section
- `crypto-education.html` — EBooks description

**What to Change:**

**#016:**
```html
<!-- BEFORE: -->
<p>If your crypto is compromised<img src="..." alt="using an unreliable network">lost...</p>

<!-- AFTER: -->
<p>If your crypto is compromised or access is lost, contact us immediately.</p>
```

**#020:**
```html
<!-- BEFORE: -->
<p>...to s<img alt="lesson cover">ahead in the world...</p>

<!-- AFTER: -->
<p>...to stay ahead in the world of crypto, blockchain, and finance.</p>
```

**Acceptance Criteria:**
- [ ] No alt text visible within paragraph content
- [ ] Text reads smoothly without embedded images

---



---

