# CountWize Navigation and Site Structure

This document details the complete navigation system, URL structure, and how pages interconnect.

---

## Primary Navigation

The main navigation appears on all pages in the header:

### Desktop Menu

| Item | URL | Type |
|------|-----|------|
| Logo | `/index.html` | Image link |
| Home | `/index.html` | Link |
| About | `/about-us.html` | Link |
| Crypto Recovery | `/recovery.html` | Link |
| Crypto Recovery Guide | `/crypto-recovery-guide.html` | Link |
| Resources | - | Dropdown |
| ├─ Blog | `/blog.html` | Dropdown item |
| ├─ FAQ | `/faq.html` | Dropdown item |
| └─ News | `/news.html` | Dropdown item |
| Education | `/education.html` | Link |
| Contact Us | `/contact-us.html` | Button (CTA) |

### Social Links (Header)

| Platform | URL |
|----------|-----|
| Instagram | https://www.instagram.com/countwize_ |
| LinkedIn | https://www.linkedin.com/company/countwize |
| Facebook | https://www.facebook.com/profile.php?id=61572760483669 |

### Mobile Menu

- Hamburger icon triggers slide-out menu
- Same links as desktop
- Scroll lock when open
- Class: `.navbar-menu-button`

---

## Footer Navigation

### Quick Links

| Link | URL |
|------|-----|
| Home | `/index.html` |
| About | `/about-us.html` |
| Crypto Recovery | `/recovery.html` |
| Education | `/education.html` |
| FAQ | `/faq.html` |
| Blog | `/blog.html` |
| News | `/news.html` |

### Contact Information

| Type | Value |
|------|-------|
| UK Phone | +44 7893 949686 (`tel:+447893949686`) |
| Canada Phone | +1 782 800 0180 (`tel:+17828000180`) |
| Sweden Phone | +46 72 400 19 75 (`tel:+46724001975`) |
| Email | support@countwize.com (`mailto:support@countwize.com`) |

### Certificates/Trust Links

| Certificate | URL |
|-------------|-----|
| ISO Certificate | https://drive.google.com/file/d/1aVXXHeyoGYqyWGz-wSCcFWxsSCurltzn/view |
| UK Trademark | https://trademarks.ipo.gov.uk/ipo-tmcase/page/Results/1/UK00004151560 |

### Legal Links

| Link | URL |
|------|-----|
| Privacy Policy | `/privacy-policy.html` |
| Company Info | https://find-and-update.company-information.service.gov.uk/company/16198508 |

### Social Links (Footer)

Same as header social links.

---

## URL Structure

### Clean URLs (via Netlify Redirects)

The site uses clean URLs without `.html` extensions:

| Clean URL | Actual File |
|-----------|-------------|
| `/` | `/index.html` |
| `/recovery` | `/recovery.html` |
| `/crypto-recovery` | `/recovery.html` |
| `/about-us` | `/about-us.html` |
| `/contact-us` | `/contact-us.html` |
| `/contact` | `/contact-us.html` |
| `/education` | `/education.html` |
| `/crypto-recovery-guide` | `/crypto-recovery-guide.html` |
| `/faq` | `/faq.html` |
| `/crypto-insights` | `/crypto-insights.html` |
| `/news` | `/news.html` |
| `/recovery-questionnaire` | `/recovery-questionnaire.html` |
| `/blog` | `/blog.html` |
| `/team` | `/team.html` |
| `/legal` | `/legal.html` |
| `/privacy-policy` | `/privacy-policy.html` |
| `/cookie-policy` | `/cookie-policy.html` |

### Canonical Redirects (301)

These redirects consolidate duplicate content:

| From | To | Status |
|------|-----|--------|
| `/contact.html` | `/contact-us.html` | 301 |
| `/crypto-education` | `/education.html` | 301 |
| `/crypto-education.html` | `/education.html` | 301 |
| `/faq-crypto-recovery` | `/faq.html` | 301 |
| `/faq-crypto-recovery.html` | `/faq.html` | 301 |
| `/crypto-tax` | `/recovery.html` | 301 |

---

## Site Hierarchy

```
CountWize.com
│
├── HOME (index.html) ─────────────────────────────┐
│   └── Primary entry point                        │
│                                                  │
├── SERVICES ──────────────────────────────────────┤
│   ├── Crypto Recovery (recovery.html)            │
│   │   └── CTA → Recovery Questionnaire           │
│   ├── Recovery Guide (crypto-recovery-guide.html)│
│   └── Crypto Tax (crypto-tax.html) → redirects   │
│                                                  │
├── ABOUT ─────────────────────────────────────────┤
│   ├── About Us (about-us.html)                   │
│   └── Team (team.html)                           │
│       └── Member Details (detail_member.html)    │
│                                                  │
├── EDUCATION ─────────────────────────────────────┤
│   ├── Education Hub (education.html)             │
│   ├── Crypto Education (crypto-education.html)   │
│   ├── Video Details (detail_education-videos.html)│
│   └── Articles:                                  │
│       ├── forex-scams.html                       │
│       ├── how-do-you-check-if...html             │
│       ├── how-does-a-crypto-recovery...html      │
│       └── how-to-avoid-losing...html             │
│                                                  │
├── RESOURCES ─────────────────────────────────────┤
│   ├── Blog (blog.html)                           │
│   │   ├── Post Details (detail_post.html)        │
│   │   ├── Categories (detail_blogcategory.html)  │
│   │   ├── article-4.html                         │
│   │   └── article-5.html                         │
│   ├── FAQ (faq.html)                             │
│   │   └── FAQ Recovery (faq-crypto-recovery.html)│
│   └── News (news.html)                           │
│       └── Crypto Insights (crypto-insights.html) │
│                                                  │
├── CONTACT ───────────────────────────────────────┤
│   ├── Contact Us (contact-us.html)               │
│   └── Recovery Questionnaire                     │
│       (recovery-questionnaire.html)              │
│                                                  │
├── LEGAL ─────────────────────────────────────────┤
│   ├── Legal Info (legal.html)                    │
│   ├── Privacy Policy (privacy-policy.html)       │
│   └── Cookie Policy (cookie-policy.html)         │
│                                                  │
├── TEMPLATES ─────────────────────────────────────┤
│   ├── detail_post.html                           │
│   ├── detail_service.html                        │
│   ├── detail_member.html                         │
│   ├── detail_project.html                        │
│   ├── detail_blogcategory.html                   │
│   └── detail_education-videos.html               │
│                                                  │
└── ERROR PAGES ───────────────────────────────────┘
    ├── 404.html (Not Found)
    └── 401.html (Password Protected)
```

---

## Key User Flows

### 1. Lead Capture Flow

```
Homepage → Hero Form → Telegram Submission → Success Message
    OR
Homepage → "Start" Button → Recovery Questionnaire → 20 Steps → Success
```

### 2. Contact Flow

```
Any Page → Navbar "Contact Us" → Contact Form → Telegram Submission
    OR
Footer → Phone/Email → Direct Contact
```

### 3. Education Flow

```
Homepage → "Lessons For You" → Video Modal
    OR
Navigation → Education → Video Carousel → Lightbox Playback
    OR
Blog → Article → Related Content
```

### 4. Service Discovery Flow

```
Homepage → Services Section → "Discover More" → recovery.html
    OR
Navigation → Crypto Recovery → Service Details → Questionnaire
```

---

## Breadcrumbs

Breadcrumbs are implemented on detail pages with Schema.org markup:

### HTML Structure

```html
<nav aria-label="Breadcrumb" class="breadcrumb-nav">
  <ol itemscope itemtype="https://schema.org/BreadcrumbList">
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a itemprop="item" href="index.html">
        <span itemprop="name">Home</span>
      </a>
      <meta itemprop="position" content="1">
    </li>
    <li>/</li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a itemprop="item" href="blog.html">
        <span itemprop="name">Blog</span>
      </a>
      <meta itemprop="position" content="2">
    </li>
    <li>/</li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <span itemprop="name" class="breadcrumb-current">Post Title</span>
      <meta itemprop="position" content="3">
    </li>
  </ol>
</nav>
```

### Pages with Breadcrumbs

- `detail_post.html` (Home → Blog → Post)
- `detail_member.html` (Home → Team → Member)
- `detail_service.html` (Home → Services → Service)
- `detail_project.html` (Home → Projects → Project)
- `detail_blogcategory.html` (Home → Blog → Category)
- `detail_education-videos.html` (Home → Education → Video)

---

## Anchor Links

### Skip Link (All Pages)

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

Target:
```html
<section id="main-content" class="section">
```

### Form Anchors

| ID | Purpose |
|-----|---------|
| `#start-recovery-button` | Hero CTA button |
| `#start-recovery-finish` | Secondary recovery button |
| `#home-form` | Homepage form wrapper |
| `#email-form` | Generic form ID |
| `#contact-form` | Contact page form |

---

## External Links

### Press/Media

| Source | URL |
|--------|-----|
| Binance | https://www.binance.com/en/square/post/22994522805130 |
| Medium | https://medium.com/@pr-News/countwize-unveils-cutting-edge-solution... |
| CoinPress | https://coinpress.media/countwize-unveils-cutting-edge-solution... |
| Digital Journal | https://www.digitaljournal.com/pr/news/... |
| Barchart | https://www.barchart.com/story/news/... |

### Educational Resources (Google Drive)

Multiple eBook download links hosted on Google Drive.

### Third-Party Services

| Service | Purpose |
|---------|---------|
| LiveChat | Customer support widget |
| Vimeo | Video hosting |
| YouTube | Video content |
| Google Fonts | Typography |
| ipapi.co | Geolocation |
| countwiseapi.space | Backend API |

---

## Current Page Indication

Active page is indicated using Webflow's current state:

```html
<a aria-current="page" class="navbar-link w-nav-link w--current" href="index.html">
  Home
</a>
```

CSS styling:
```css
.w--current {
  color: var(--brand--brand-color-third);
}
```

---

## 404 Error Handling

### Netlify Configuration

```toml
[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
```

### 404 Page Content

- Full navigation bar (users can navigate away)
- Error message
- "Go Home" button → `/index.html`
- Full footer

---

## Sitemap Priority

From `sitemap.xml`:

| Priority | Pages |
|----------|-------|
| 1.0 | Homepage |
| 0.9 | Recovery |
| 0.8 | About, Contact, Recovery Guide, Questionnaire |
| 0.7 | Education, Blog, News, Crypto Insights |
| 0.6 | FAQ, Team |
| 0.3 | Privacy, Cookie, Legal |
