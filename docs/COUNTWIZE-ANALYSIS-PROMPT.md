================================================================================
🔬 COUNTWIZE PROJECT DEEP ANALYSIS PROTOCOL
================================================================================

📋 COMPREHENSIVE PROJECT AUDIT REQUEST - CRYPTOCURRENCY RECOVERY WEBSITE

INSTRUCTIONS FOR AI ASSISTANT (RESEARCH MODE):
You are about to receive a ZIP file containing the complete CountWize website
codebase. This is a cryptocurrency recovery services website built with Webflow
and hosted on Netlify. Your mission is to perform an EXHAUSTIVE analysis of
every single file, folder, line of code, comment, and configuration.

PROJECT CONTEXT:
├── Company: CountWize LTD (UK Company No: 16198508)
├── Purpose: Help people recover lost/stolen cryptocurrency
├── Type: Static marketing website (NOT a dashboard/app)
├── Builder: Webflow (exported as static HTML/CSS/JS)
├── Hosting: Netlify
├── Domain: https://www.countwize.com
└── Status: Production website

By the end of this analysis, you should know this project so deeply that if
someone asks where any specific button, form field, animation, or style is
located — you can answer instantly and accurately.

================================================================================
🎯 SECTION 1: YOUR MISSION
================================================================================

PRIMARY OBJECTIVE:
Perform a complete, exhaustive audit of the CountWize website and build a
comprehensive mental map of EVERYTHING in it.

BY THE END OF THIS ANALYSIS, YOU MUST BE ABLE TO:
├── Locate any HTML element, CSS class, or JavaScript function instantly
├── Identify all 33 HTML pages and their content
├── Map all 407 images and where they're used
├── Understand all 5 forms and their validation logic
├── Know all CSS animations and hover effects
├── Trace all JavaScript functionality and API calls
├── Identify the complete color palette and design system
├── Map all navigation paths and URL redirects
├── Find all SEO elements and meta tags
├── Detect any broken links, missing images, or dead code
├── Understand the Netlify configuration and caching
└── Provide a complete "state of the project" report

PROJECT-SPECIFIC KNOWLEDGE REQUIRED:
├── All form fields and their validation rules
├── Phone input validation (intl-tel-input library)
├── Cookie consent system and GDPR compliance
├── 20-step recovery questionnaire flow
├── API endpoints (countwiseapi.space, ipapi.co, Telegram)
├── Vimeo video embeds and lightbox functionality
├── Google Analytics and LiveChat integration
├── Webflow interaction triggers (data-w-id attributes)
└── Responsive breakpoints and mobile adaptations

================================================================================
🔍 SECTION 2: ANALYSIS METHODOLOGY
================================================================================

Follow this systematic approach tailored for static Webflow websites:

PHASE 1: PROJECT STRUCTURE MAPPING
──────────────────────────────────
□ Map the complete folder structure
   ├── / (root) - 33 HTML pages
   ├── /css/ - 5 stylesheet files
   ├── /js/ - webflow.js runtime
   ├── /images/ - 407 image assets
   ├── /documents/ - PDF files
   └── Configuration files (netlify.toml, sitemap.xml, robots.txt)
□ Identify the Webflow site ID and page IDs
□ Verify all HTML files and their purposes
□ Check the Netlify configuration for redirects and headers
□ Map the sitemap.xml structure

PHASE 2: HTML PAGE ANALYSIS
───────────────────────────
For EACH of the 33 HTML pages, document:
□ Page purpose and content
□ Meta tags (title, description, OG tags)
□ Canonical URL
□ Unique elements or functionality
□ Forms present (if any)
□ JavaScript embedded (inline scripts)
□ Data attributes for Webflow animations
□ Internal and external links

EXPECTED PAGES:
├── index.html (Homepage)
├── recovery.html (Crypto Recovery)
├── about-us.html (About)
├── contact-us.html / contact.html (Contact)
├── recovery-questionnaire.html (20-step form)
├── education.html / crypto-education.html
├── crypto-recovery-guide.html
├── crypto-insights.html / news.html
├── crypto-tax.html
├── blog.html
├── faq.html / faq-crypto-recovery.html
├── team.html
├── legal.html / privacy-policy.html / cookie-policy.html
├── 404.html / 401.html (Error pages)
├── Article pages (forex-scams.html, etc.)
└── Template pages (detail_*.html)

PHASE 3: CSS DEEP DIVE
──────────────────────
Analyze all 5 CSS files (~20,000 lines):
□ /css/normalize.css - CSS reset
□ /css/webflow.css - Webflow framework
□ /css/countwize-test.webflow.css - Main Webflow styles (16,000+ lines)
□ /css/responsive-fixes.css - Custom responsive overrides
□ /css/countwize-animations.css - Custom animations

For each CSS file, extract:
□ Color palette (all hex, RGB, RGBA values)
□ Typography (font families, sizes, weights)
□ CSS custom properties (variables)
□ All @keyframes animations
□ All transitions and hover effects
□ Glassmorphism/backdrop-filter usage
□ Responsive breakpoints (@media queries)
□ Z-index values
□ Unused or duplicate styles

EXPECTED COLOR PALETTE:
├── Primary Green: #34D399, #4ADE80
├── Brand Green: #a3dcad, #6b9071, #aec3b0
├── Dark Backgrounds: #050505, #090910, #0d2f27
├── Text Colors: #fcfcfc, #b4b8c2, #61616b
└── Error Red: #ff4d4f, #e62231

PHASE 4: JAVASCRIPT ANALYSIS
────────────────────────────
Analyze ALL JavaScript (inline and external):
□ /js/webflow.js - Main Webflow runtime (450KB minified)
□ Inline scripts in each HTML file

For JavaScript, document:
□ All external library dependencies
   ├── jQuery 3.5.1
   ├── intl-tel-input v17.0.12
   ├── libphonenumber-js v1.10.18
   ├── Flatpickr (date picker)
   ├── WebFont Loader
   └── LiveChat widget
□ Form validation logic
□ Phone input validation system
□ Cookie consent implementation
□ API calls and endpoints
□ Event listeners and handlers
□ Animation triggers
□ Mobile menu scroll lock
□ News pagination system
□ Multi-step form navigation
□ File upload handling

EXPECTED API ENDPOINTS:
├── https://countwiseapi.space/api/countries/
├── https://countwiseapi.space/api/countries/{id}/cities/
├── https://countwiseapi.space/api/news/
├── https://countwiseapi.space/api/web-news/
├── https://ipapi.co/json/ (Geolocation)
├── https://restcountries.com/v2/all
└── https://telegram-vercel-seven.vercel.app/api/telegram (Form submission)

PHASE 5: FORM DEEP ANALYSIS
───────────────────────────
Analyze ALL 5 forms in detail:
□ Homepage Hero Form (index.html)
   ├── Fields: First Name, Last Name, Email, Phone, Investment, Problem
   └── Submission: Telegram API
□ Contact Form (contact-us.html)
   ├── Fields: Name, Email, Phone, Subject, Amount, Specialist, Country, City, Message
   ├── Dynamic dropdowns (countries/cities from API)
   └── Phone validation with intl-tel-input
□ Recovery Questionnaire (recovery-questionnaire.html)
   ├── 20 steps with progress bar
   ├── Radio buttons, text inputs, file upload
   ├── Conditional "Other" fields
   ├── Case ID generation
   ├── Date/time picker for scheduling
   └── Comprehensive validation
□ Service Inquiry Form (detail_service.html)
   └── Simple: Name, Phone, Email
□ Password Form (401.html)
   └── Webflow password protection

For EACH form field, document:
├── Field name and ID
├── Input type
├── Placeholder text
├── Required status
├── Max length
├── Validation rules
└── Error messages

PHASE 6: IMAGE AND ASSET AUDIT
──────────────────────────────
Catalog all 407 images in /images/:
□ Logo files (Group_3.svg, Clip-path-group.svg, etc.)
□ Favicon files (multiple sizes)
□ Social media icons (Instagram, LinkedIn, Facebook, etc.)
□ Cryptocurrency icons (Ethereum, 3D crypto icons)
□ Exchange logos (Binance, Bitget, Bybit, etc.)
□ UI/functional icons (plus.svg, check-check.svg, etc.)
□ Service/feature icons (Value-Icon-*.svg)
□ Background images (SVG and PNG with responsive variants)
□ Article/blog images (numbered series)
□ Team photos (hash-named WebP files)
□ Animation images (animation-image-*.webp)
□ Certificate/trust badges
□ OG meta images

Check for:
□ Missing images (referenced but not present)
□ Unused images (present but never referenced)
□ Broken image paths
□ Missing alt text
□ Responsive variants (p-500, p-800, p-1080, etc.)

PHASE 7: NAVIGATION AND LINKS AUDIT
───────────────────────────────────
Map the complete navigation structure:
□ Primary navigation (7 items + dropdown)
□ Footer navigation
□ Social media links (Instagram, LinkedIn, Facebook)
□ CTA buttons and their destinations
□ Internal page links
□ External links (press, certificates, APIs)
□ Anchor links (#main-content, etc.)

Check for:
□ Broken internal links
□ Broken external links
□ Incorrect URL paths
□ Missing rel="noopener" on external links
□ Proper current page indication (.w--current class)

PHASE 8: SEO AND META ANALYSIS
──────────────────────────────
For EACH page, verify:
□ Title tag (unique and descriptive)
□ Meta description
□ Canonical URL
□ Open Graph tags (og:title, og:description, og:image)
□ Twitter Card tags
□ Google site verification
□ Structured data (JSON-LD for FAQPage, BreadcrumbList)

Check:
□ sitemap.xml completeness
□ robots.txt configuration
□ 301 redirects in netlify.toml
□ Clean URL implementation

PHASE 9: ACCESSIBILITY AUDIT
────────────────────────────
Check all accessibility features:
□ Skip to main content links
□ ARIA labels on form inputs (600+ expected)
□ Alt text on images
□ Semantic HTML structure
□ Focus states (outline styles)
□ Keyboard navigation
□ Reduced motion support (@media prefers-reduced-motion)
□ Color contrast ratios
□ Screen reader support (.sr-only class)

PHASE 10: PERFORMANCE AND CONFIGURATION
───────────────────────────────────────
Analyze Netlify configuration (netlify.toml):
□ All redirect rules (25+ expected)
□ Security headers (X-Frame-Options, CSP, etc.)
□ Cache headers for assets
□ 404 error handling

Check for:
□ Unused dependencies
□ Large unoptimized images
□ Render-blocking resources
□ Missing preconnect hints
□ GPU acceleration (will-change properties)

================================================================================
📊 SECTION 3: REQUIRED OUTPUT FORMAT
================================================================================

After completing your analysis, provide your findings in this EXACT structure:

┌─────────────────────────────────────────────────────────────────────────────┐
│ PART 1: EXECUTIVE SUMMARY                                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ • Project Health Score: [1-10]                                              │
│ • Overall Assessment: [One paragraph summary]                               │
│ • Critical Issues Count: [Number]                                           │
│ • Major Issues Count: [Number]                                              │
│ • Minor Issues Count: [Number]                                              │
│ • Cleanup Opportunities: [Number]                                           │
│ • Technical Debt Level: [Low / Medium / High / Critical]                    │
│ • Mobile Responsiveness: [Excellent / Good / Fair / Poor]                   │
│ • Accessibility Score: [A / B / C / D / F]                                  │
│ • SEO Score: [A / B / C / D / F]                                            │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ PART 2: PROJECT IDENTITY                                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ • Project Name: CountWize - Cryptocurrency Recovery Services                │
│ • Project Type: Static Marketing Website                                    │
│ • Company: CountWize LTD (UK: 16198508)                                     │
│ • Website: https://www.countwize.com                                        │
│ • Tech Stack:                                                               │
│   ├── Builder: Webflow                                                      │
│   ├── Hosting: Netlify                                                      │
│   ├── Analytics: Google Analytics (G-0NX03W5PQR)                            │
│   ├── Ads: Google Ads (AW-447543988)                                        │
│   ├── Chat: LiveChat (18977943)                                             │
│   ├── Forms: Telegram API                                                   │
│   └── Video: Vimeo                                                          │
│ • Total HTML Pages: [Count - expect 33]                                     │
│ • Total CSS Files: [Count - expect 5]                                       │
│ • Total CSS Lines: [Count - expect ~20,000]                                 │
│ • Total Images: [Count - expect 407]                                        │
│ • Total JavaScript: [Size of webflow.js + inline]                           │
│ • Webflow Site ID: 6757da2d0bddf4e7ffe6a430                                 │
│ • Last Published: [Check HTML comments]                                     │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ PART 3: COMPLETE FILE STRUCTURE MAP                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ CountWize/                                                                  │
│ ├── index.html              [✓/⚠/✗] [Homepage - hero form, services]       │
│ ├── recovery.html           [✓/⚠/✗] [Crypto recovery services]             │
│ ├── about-us.html           [✓/⚠/✗] [Company information]                  │
│ ├── contact-us.html         [✓/⚠/✗] [Contact form with validation]         │
│ ├── contact.html            [✓/⚠/✗] [Redirects to contact-us.html]         │
│ ├── recovery-questionnaire.html [✓/⚠/✗] [20-step intake form]              │
│ ├── education.html          [✓/⚠/✗] [Education hub]                        │
│ ├── crypto-education.html   [✓/⚠/✗] [Detailed education]                   │
│ ├── crypto-recovery-guide.html [✓/⚠/✗] [Step-by-step guide]                │
│ ├── crypto-insights.html    [✓/⚠/✗] [News and insights]                    │
│ ├── crypto-tax.html         [✓/⚠/✗] [Tax consulting]                       │
│ ├── blog.html               [✓/⚠/✗] [Blog listing]                         │
│ ├── news.html               [✓/⚠/✗] [News articles]                        │
│ ├── faq.html                [✓/⚠/✗] [FAQ page]                             │
│ ├── faq-crypto-recovery.html [✓/⚠/✗] [Recovery FAQ]                        │
│ ├── team.html               [✓/⚠/✗] [Team members]                         │
│ ├── legal.html              [✓/⚠/✗] [Legal information]                    │
│ ├── privacy-policy.html     [✓/⚠/✗] [Privacy policy]                       │
│ ├── cookie-policy.html      [✓/⚠/✗] [Cookie policy]                        │
│ ├── 404.html                [✓/⚠/✗] [Not found error]                      │
│ ├── 401.html                [✓/⚠/✗] [Password protected]                   │
│ ├── forex-scams.html        [✓/⚠/✗] [Article]                              │
│ ├── article-4.html          [✓/⚠/✗] [Article]                              │
│ ├── article-5.html          [✓/⚠/✗] [Article]                              │
│ ├── how-do-you-check-if-a-website-is-legitimate.html [✓/⚠/✗]               │
│ ├── how-does-a-crypto-recovery-phrase-work.html [✓/⚠/✗]                    │
│ ├── how-to-avoid-losing-your-crypto-...html [✓/⚠/✗]                        │
│ ├── detail_post.html        [✓/⚠/✗] [Blog post template]                   │
│ ├── detail_service.html     [✓/⚠/✗] [Service template]                     │
│ ├── detail_member.html      [✓/⚠/✗] [Team member template]                 │
│ ├── detail_project.html     [✓/⚠/✗] [Project template]                     │
│ ├── detail_blogcategory.html [✓/⚠/✗] [Blog category template]              │
│ ├── detail_education-videos.html [✓/⚠/✗] [Video template]                  │
│ │                                                                           │
│ ├── css/                                                                    │
│ │   ├── normalize.css       [~355 lines] [CSS reset]                        │
│ │   ├── webflow.css         [~1,790 lines] [Webflow framework]              │
│ │   ├── countwize-test.webflow.css [~16,161 lines] [Main styles]            │
│ │   ├── responsive-fixes.css [~1,238 lines] [Custom responsive]             │
│ │   └── countwize-animations.css [~358 lines] [Animations]                  │
│ │                                                                           │
│ ├── js/                                                                     │
│ │   └── webflow.js          [~450 KB] [Webflow runtime]                     │
│ │                                                                           │
│ ├── images/                 [407 files - 55 MB total]                       │
│ │   ├── [Logo files]        Group_3.svg, Clip-path-group.svg, etc.          │
│ │   ├── [Favicon files]     favicon.png, favicon-16x16.png, etc.            │
│ │   ├── [Social icons]      Instagram-Icon.svg, etc.                        │
│ │   ├── [Crypto icons]      ethereum.svg, 3D-Crypto-Icon-*.webp             │
│ │   ├── [Exchange logos]    Binance_logo-1.svg, bitget.png, etc.            │
│ │   ├── [UI icons]          plus.svg, check-check.svg, etc.                 │
│ │   ├── [Backgrounds]       About-Bg.svg, Cta-bg.png, etc.                  │
│ │   ├── [Article images]    Numbered series with -p-* variants              │
│ │   ├── [Team photos]       Hash-named WebP files                           │
│ │   └── [Animation images]  animation-image-1/2/3.webp                      │
│ │                                                                           │
│ ├── documents/                                                              │
│ │   └── COUNTWIZE-ISO-27001-2111-1.pdf [ISO certification]                  │
│ │                                                                           │
│ ├── docs/                   [Documentation folder]                          │
│ │   ├── README.md           [Documentation index]                           │
│ │   ├── AI-INSTRUCTIONS.md  [AI agent guide]                                │
│ │   └── 00-09 *.md          [Detailed documentation]                        │
│ │                                                                           │
│ ├── netlify.toml            [Netlify configuration]                         │
│ ├── sitemap.xml             [SEO sitemap - 15 URLs]                         │
│ ├── robots.txt              [Search engine directives]                      │
│ ├── .gitignore              [Git ignore rules]                              │
│ └── README.md               [Project readme]                                │
│                                                                             │
│ LEGEND:                                                                     │
│ [✓] = Working correctly                                                     │
│ [⚠] = Has issues                                                            │
│ [✗] = Broken/Not working                                                    │
│ [?] = Unclear purpose                                                       │
│ [🗑] = Can be deleted                                                        │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ PART 4: COLOR PALETTE VERIFICATION                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ CSS VARIABLES FOUND:                                                        │
│ ├── --cw-primary: [Value] [Expected: #34D399]                               │
│ ├── --cw-accent: [Value] [Expected: #4ADE80]                                │
│ ├── --cw-dark: [Value] [Expected: #0D1117]                                  │
│ ├── --cw-glass: [Value] [Expected: rgba(255,255,255,0.05)]                  │
│ ├── --neutral--black-900: [Value] [Expected: #090910]                       │
│ ├── --neutral--white-0: [Value] [Expected: #fcfcfc]                         │
│ ├── --brand--brand-color-third: [Value] [Expected: #6b9071]                 │
│ └── [Continue for all variables...]                                         │
│                                                                             │
│ HARDCODED COLORS FOUND:                                                     │
│ • [Color value] in [file:line] - Should use: [variable]                     │
│ • [Continue...]                                                             │
│                                                                             │
│ COLOR INCONSISTENCIES:                                                      │
│ • [Description of any color conflicts]                                      │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ PART 5: FORMS COMPLETE ANALYSIS                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ FORM 1: HOMEPAGE HERO FORM (index.html)                                     │
│ ├── Form ID: email-form                                                     │
│ ├── Form Name: email-form                                                   │
│ ├── Submission: Telegram API                                                │
│ ├── Fields:                                                                 │
│ │   ├── First-Name [text] [required] [max:256] [✓/⚠/✗]                      │
│ │   ├── Last-Name [text] [required] [max:256] [✓/⚠/✗]                       │
│ │   ├── Email [email] [required] [max:256] [✓/⚠/✗]                          │
│ │   ├── Phone [tel] [required] [max:256] [✓/⚠/✗]                            │
│ │   ├── Investment [text] [required] [max:256] [✓/⚠/✗]                      │
│ │   ├── Your-Problem [text] [required] [max:256] [✓/⚠/✗]                    │
│ │   └── dialCode [hidden] [✓/⚠/✗]                                           │
│ ├── Validation: [Phone validation status]                                   │
│ ├── Submit Button: [Status]                                                 │
│ ├── Success Message: [Status]                                               │
│ └── Error Handling: [Status]                                                │
│                                                                             │
│ FORM 2: CONTACT FORM (contact-us.html)                                      │
│ [Same detailed format...]                                                   │
│                                                                             │
│ FORM 3: RECOVERY QUESTIONNAIRE (recovery-questionnaire.html)                │
│ ├── Total Steps: 20                                                         │
│ ├── Progress Bar: [Working/Broken]                                          │
│ ├── Step 1: What Happened? [Radio - 5 options + Other]                      │
│ ├── Step 2: Amount Lost? [Radio - 5 options + Custom]                       │
│ ├── Step 3: Which Crypto? [Radio - 5 options + Other]                       │
│ ├── [Continue for all 20 steps...]                                          │
│ ├── Case ID Generation: [Working/Broken]                                    │
│ ├── File Upload: [Max 3 files] [Working/Broken]                             │
│ ├── Date Picker: [Flatpickr] [Working/Broken]                               │
│ └── Submission: [Status]                                                    │
│                                                                             │
│ [Continue for forms 4 and 5...]                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ PART 6: JAVASCRIPT FUNCTIONALITY STATUS                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ PHONE VALIDATION (intl-tel-input):                                          │
│ ├── Library Version: [Found version]                                        │
│ ├── Initialization: [Working/Broken]                                        │
│ ├── Country Detection: [Working/Broken]                                     │
│ ├── Validation Errors: [Working/Broken]                                     │
│ └── Dial Code Extraction: [Working/Broken]                                  │
│                                                                             │
│ COOKIE CONSENT:                                                             │
│ ├── EU Detection: [Working/Broken]                                          │
│ ├── Advanced Banner (EU): [Working/Broken]                                  │
│ ├── Simple Banner (Non-EU): [Working/Broken]                                │
│ ├── Google Consent Mode: [Working/Broken]                                   │
│ └── LocalStorage Persistence: [Working/Broken]                              │
│                                                                             │
│ MOBILE MENU:                                                                │
│ ├── Toggle Animation: [Working/Broken]                                      │
│ ├── Scroll Lock: [Working/Broken]                                           │
│ └── Close on Navigation: [Working/Broken]                                   │
│                                                                             │
│ NEWS PAGINATION:                                                            │
│ ├── API Calls: [Working/Broken]                                             │
│ ├── Previous/Next Buttons: [Working/Broken]                                 │
│ └── Content Loading: [Working/Broken]                                       │
│                                                                             │
│ MULTI-STEP FORM:                                                            │
│ ├── Step Transitions: [Working/Broken]                                      │
│ ├── Progress Bar Updates: [Working/Broken]                                  │
│ ├── Auto-Advance on Selection: [Working/Broken]                             │
│ ├── Skip Button Logic: [Working/Broken]                                     │
│ └── Conditional Fields ("Other"): [Working/Broken]                          │
│                                                                             │
│ WEBFLOW INTERACTIONS (data-w-id):                                           │
│ ├── Scroll Reveal Animations: [Working/Broken]                              │
│ ├── Navbar Dropdown: [Working/Broken]                                       │
│ ├── FAQ Accordions: [Working/Broken]                                        │
│ ├── Video Lightbox: [Working/Broken]                                        │
│ └── Slider Controls: [Working/Broken]                                       │
│                                                                             │
│ API CONNECTIONS:                                                            │
│ ├── countwiseapi.space/api/countries/: [Working/Broken]                     │
│ ├── countwiseapi.space/api/news/: [Working/Broken]                          │
│ ├── ipapi.co/json/: [Working/Broken]                                        │
│ └── Telegram submission: [Working/Broken]                                   │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ PART 7: ANIMATION INVENTORY                                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ @KEYFRAMES ANIMATIONS:                                                      │
│ ├── wave (index.html) - Opacity pulse [Working/Broken]                      │
│ ├── gradientShift (index.html) - Background gradient [Working/Broken]       │
│ ├── glow (index.html) - Box shadow pulse [Working/Broken]                   │
│ ├── cw-pulse (animations.css) - Glow effect [Working/Broken]                │
│ ├── cw-float (animations.css) - Vertical float [Working/Broken]             │
│ ├── cw-breathe (animations.css) - Drop shadow [Working/Broken]              │
│ ├── cw-reveal-up (animations.css) - Scroll reveal [Working/Broken]          │
│ ├── cw-shimmer (animations.css) - Loading skeleton [Working/Broken]         │
│ ├── cw-accent-line (animations.css) - Line animation [Working/Broken]       │
│ └── spin (webflow.css) - Loading spinner [Working/Broken]                   │
│                                                                             │
│ TRANSITIONS:                                                                │
│ ├── Button hovers: [Working/Broken]                                         │
│ ├── Card hovers: [Working/Broken]                                           │
│ ├── Menu link underlines: [Working/Broken]                                  │
│ ├── Form focus states: [Working/Broken]                                     │
│ └── Page section reveals: [Working/Broken]                                  │
│                                                                             │
│ GLASSMORPHISM:                                                              │
│ ├── backdrop-filter support: [Yes/No]                                       │
│ ├── Cards using glass effect: [List]                                        │
│ └── Fallback for unsupported browsers: [Yes/No]                             │
│                                                                             │
│ REDUCED MOTION:                                                             │
│ └── @media (prefers-reduced-motion): [Implemented/Missing]                  │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ PART 8: NAVIGATION AND LINKS AUDIT                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ PRIMARY NAVIGATION:                                                         │
│ ├── Home → index.html [Working/Broken]                                      │
│ ├── About → about-us.html [Working/Broken]                                  │
│ ├── Crypto Recovery → recovery.html [Working/Broken]                        │
│ ├── Crypto Recovery Guide → crypto-recovery-guide.html [Working/Broken]     │
│ ├── Resources (Dropdown):                                                   │
│ │   ├── Blog → blog.html [Working/Broken]                                   │
│ │   ├── FAQ → faq.html [Working/Broken]                                     │
│ │   └── News → news.html [Working/Broken]                                   │
│ ├── Education → education.html [Working/Broken]                             │
│ └── Contact Us (CTA) → contact-us.html [Working/Broken]                     │
│                                                                             │
│ FOOTER LINKS:                                                               │
│ [List all footer links with status]                                         │
│                                                                             │
│ SOCIAL LINKS:                                                               │
│ ├── Instagram: https://www.instagram.com/countwize_ [Working/Broken]        │
│ ├── LinkedIn: https://www.linkedin.com/company/countwize [Working/Broken]   │
│ └── Facebook: [URL] [Working/Broken]                                        │
│                                                                             │
│ BROKEN LINKS FOUND:                                                         │
│ • [Link text] in [file:line] → [Broken URL]                                 │
│ • [Continue...]                                                             │
│                                                                             │
│ NETLIFY REDIRECTS (from netlify.toml):                                      │
│ [List all redirects and their status]                                       │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ PART 9: SEO AUDIT                                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ PAGE-BY-PAGE SEO STATUS:                                                    │
│                                                                             │
│ index.html:                                                                 │
│ ├── Title: [Found title] [Optimal/Too Long/Missing]                         │
│ ├── Description: [Found] [Optimal/Too Long/Missing]                         │
│ ├── Canonical: [URL] [Correct/Wrong/Missing]                                │
│ ├── OG Tags: [Complete/Incomplete/Missing]                                  │
│ ├── Twitter Cards: [Complete/Incomplete/Missing]                            │
│ └── Structured Data: [Type] [Valid/Invalid/Missing]                         │
│                                                                             │
│ [Repeat for all 33 pages...]                                                │
│                                                                             │
│ SITEMAP.XML:                                                                │
│ ├── Total URLs: [Count]                                                     │
│ ├── Missing Pages: [List any pages not in sitemap]                          │
│ └── Invalid URLs: [List any broken URLs in sitemap]                         │
│                                                                             │
│ ROBOTS.TXT:                                                                 │
│ ├── Allow All: [Yes/No]                                                     │
│ ├── Sitemap Reference: [Present/Missing]                                    │
│ └── Issues: [Any problems]                                                  │
│                                                                             │
│ GOOGLE VERIFICATION:                                                        │
│ └── Meta Tag: [Present on all pages/Missing from some]                      │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ PART 10: ACCESSIBILITY AUDIT                                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ SKIP LINKS:                                                                 │
│ ├── Present on all pages: [Yes/No]                                          │
│ ├── Target (#main-content) exists: [Yes/No]                                 │
│ └── Focus styling: [Working/Broken]                                         │
│                                                                             │
│ ARIA LABELS:                                                                │
│ ├── Form inputs with aria-label: [Count]                                    │
│ ├── Form inputs missing aria-label: [Count] [List]                          │
│ ├── Navigation landmarks: [Present/Missing]                                 │
│ └── Breadcrumb aria-label: [Present/Missing]                                │
│                                                                             │
│ IMAGE ALT TEXT:                                                             │
│ ├── Images with alt: [Count]                                                │
│ ├── Images with empty alt (decorative): [Count]                             │
│ ├── Images missing alt: [Count] [List]                                      │
│ └── Images with unhelpful alt: [Count] [List]                               │
│                                                                             │
│ KEYBOARD NAVIGATION:                                                        │
│ ├── Tab order logical: [Yes/No]                                             │
│ ├── Focus visible on all elements: [Yes/No]                                 │
│ └── Focus trap issues: [None/List]                                          │
│                                                                             │
│ SCREEN READER:                                                              │
│ ├── .sr-only class used: [Yes/No]                                           │
│ ├── Form labels associated: [Yes/No]                                        │
│ └── Semantic HTML: [Good/Fair/Poor]                                         │
│                                                                             │
│ REDUCED MOTION:                                                             │
│ └── @media (prefers-reduced-motion): [Implemented/Missing]                  │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ PART 11: CRITICAL ISSUES                                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ Issues that will cause crashes, security problems, or major failures        │
│                                                                             │
│ ISSUE #1:                                                                   │
│ ├── Severity: CRITICAL                                                      │
│ ├── Location: [Exact file path and line numbers]                            │
│ ├── Problem: [What is wrong]                                                │
│ ├── Impact: [What happens because of this]                                  │
│ ├── Root Cause: [Why this happened]                                         │
│ └── Recommended Fix: [Specific fix with code if needed]                     │
│                                                                             │
│ [Continue for all critical issues...]                                       │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ PART 12: MAJOR ISSUES                                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ Issues that cause bugs, poor UX, or significant problems                    │
│                                                                             │
│ [Same format as Critical Issues]                                            │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ PART 13: MINOR ISSUES                                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│ Issues that are annoying but not breaking anything                          │
│                                                                             │
│ [Same format as Critical Issues]                                            │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ PART 14: DEAD CODE & CLEANUP                                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ UNUSED FILES THAT CAN BE DELETED:                                           │
│ • [file path] - Reason: [why it's not needed]                               │
│ • [Continue...]                                                             │
│                                                                             │
│ UNUSED IMAGES:                                                              │
│ • [image path] - Not referenced in any HTML/CSS file                        │
│ • [Continue...]                                                             │
│                                                                             │
│ DEAD CSS CLASSES:                                                           │
│ • [class name] in [file:line] - Not used in HTML                            │
│ • [Continue...]                                                             │
│                                                                             │
│ COMMENTED-OUT CODE:                                                         │
│ • [file:line-range] - [Brief description]                                   │
│ • [Continue...]                                                             │
│                                                                             │
│ CONSOLE.LOG STATEMENTS:                                                     │
│ • [file:line] - "[Log message]"                                             │
│ • [Continue...]                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ PART 15: SECURITY CONCERNS                                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ EXPOSED SECRETS/KEYS:                                                       │
│ • [Any API keys, credentials visible in code]                               │
│                                                                             │
│ SECURITY HEADERS (from netlify.toml):                                       │
│ ├── X-Frame-Options: [Present/Missing] [Value]                              │
│ ├── X-XSS-Protection: [Present/Missing] [Value]                             │
│ ├── X-Content-Type-Options: [Present/Missing] [Value]                       │
│ ├── Referrer-Policy: [Present/Missing] [Value]                              │
│ └── Permissions-Policy: [Present/Missing] [Value]                           │
│                                                                             │
│ FORM SECURITY:                                                              │
│ ├── Input sanitization: [Present/Missing]                                   │
│ ├── CSRF protection: [Present/Missing/N/A for static site]                  │
│ └── Rate limiting: [Present/Missing/Handled by API]                         │
│                                                                             │
│ EXTERNAL LINKS:                                                             │
│ └── rel="noopener noreferrer": [Present on all/Missing from some]           │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ PART 16: IMAGE AUDIT                                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ IMAGE STATISTICS:                                                           │
│ ├── Total images: [Count]                                                   │
│ ├── SVG files: [Count]                                                      │
│ ├── PNG files: [Count]                                                      │
│ ├── WebP files: [Count]                                                     │
│ ├── JPG files: [Count]                                                      │
│ └── Total size: [Size]                                                      │
│                                                                             │
│ MISSING IMAGES (referenced but not found):                                  │
│ • [image path] referenced in [file:line]                                    │
│ • [Continue...]                                                             │
│                                                                             │
│ UNUSED IMAGES (present but never referenced):                               │
│ • [image path] - [Size]                                                     │
│ • [Continue...]                                                             │
│                                                                             │
│ IMAGES MISSING RESPONSIVE VARIANTS:                                         │
│ • [image path] - Has base but missing: [p-500, p-800, etc.]                 │
│ • [Continue...]                                                             │
│                                                                             │
│ LARGE IMAGES THAT COULD BE OPTIMIZED:                                       │
│ • [image path] - [Size] - Recommendation: [Compress/Convert to WebP]        │
│ • [Continue...]                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ PART 17: QUICK REFERENCE INDEX                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│ So you can ask me "where is X?" and I can answer instantly                  │
│                                                                             │
│ PAGES INDEX:                                                                │
│ • Homepage → /index.html                                                    │
│ • Crypto Recovery → /recovery.html                                          │
│ • Contact → /contact-us.html                                                │
│ • Recovery Form → /recovery-questionnaire.html                              │
│ • Education → /education.html                                               │
│ • Blog → /blog.html                                                         │
│ • FAQ → /faq.html                                                           │
│ • Team → /team.html                                                         │
│ • [Continue for all 33 pages...]                                            │
│                                                                             │
│ FORMS INDEX:                                                                │
│ • Hero Form → index.html (lines ~)                                          │
│ • Contact Form → contact-us.html (lines ~)                                  │
│ • Recovery Questionnaire → recovery-questionnaire.html                      │
│ • Service Form → detail_service.html                                        │
│ • Password Form → 401.html                                                  │
│                                                                             │
│ STYLES INDEX:                                                               │
│ • Main styles → /css/countwize-test.webflow.css                             │
│ • Animations → /css/countwize-animations.css                                │
│ • Responsive fixes → /css/responsive-fixes.css                              │
│ • Webflow base → /css/webflow.css                                           │
│ • CSS reset → /css/normalize.css                                            │
│                                                                             │
│ KEY CSS CLASSES:                                                            │
│ • Primary button → .button                                                  │
│ • CTA button → .cta-button                                                  │
│ • Navigation → .navbar-2, .navbar-link                                      │
│ • Form input → .input-new                                                   │
│ • Card → ._media-card, .service-card                                        │
│ • Skip link → .skip-link                                                    │
│ • Screen reader only → .sr-only                                             │
│ • [Continue for key classes...]                                             │
│                                                                             │
│ JAVASCRIPT INDEX:                                                           │
│ • Phone validation → inline in contact-us.html, index.html                  │
│ • Cookie consent → inline footer scripts                                    │
│ • Form submission → inline scripts                                          │
│ • Webflow runtime → /js/webflow.js                                          │
│                                                                             │
│ CONFIGURATION INDEX:                                                        │
│ • Netlify config → /netlify.toml                                            │
│ • Sitemap → /sitemap.xml                                                    │
│ • Robots → /robots.txt                                                      │
│ • Git ignore → /.gitignore                                                  │
│                                                                             │
│ API ENDPOINTS INDEX:                                                        │
│ • Countries list → https://countwiseapi.space/api/countries/                │
│ • Cities list → https://countwiseapi.space/api/countries/{id}/cities/       │
│ • News feed → https://countwiseapi.space/api/news/                          │
│ • Geolocation → https://ipapi.co/json/                                      │
│ • Form submission → https://telegram-vercel-seven.vercel.app/api/telegram   │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ PART 18: RECOMMENDED ACTION PLAN                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│ Prioritized steps to fix and improve this project                           │
│                                                                             │
│ IMMEDIATE (Critical Issues):                                                │
│ 1. [Action item with specific files/changes needed]                         │
│ 2. [Continue...]                                                            │
│                                                                             │
│ SHORT-TERM (Major Issues):                                                  │
│ 1. [Action item with specific files/changes needed]                         │
│ 2. [Continue...]                                                            │
│                                                                             │
│ MEDIUM-TERM (Minor Issues & Optimization):                                  │
│ 1. [Action item with specific files/changes needed]                         │
│ 2. [Continue...]                                                            │
│                                                                             │
│ LONG-TERM (Cleanup & Enhancement):                                          │
│ 1. [Action item with specific files/changes needed]                         │
│ 2. [Continue...]                                                            │
└─────────────────────────────────────────────────────────────────────────────┘

================================================================================
⚙️ SECTION 4: ANALYSIS RULES
================================================================================

RULE 1 - KNOW THE CONTEXT:
This is a Webflow-exported static website. There is no build process.
The main styles are in countwize-test.webflow.css (auto-generated by Webflow).
Custom modifications should go in responsive-fixes.css or countwize-animations.css.

RULE 2 - BE EXHAUSTIVE:
Do not skip any file. Check all 33 HTML pages. Analyze all 407 images.
Review all ~20,000 lines of CSS. Examine all inline JavaScript.

RULE 3 - BE SPECIFIC:
Never say "there are some issues in the code." Always say exactly WHERE and WHAT.
Include file paths and line numbers when possible.

RULE 4 - UNDERSTAND THE FORMS:
The recovery-questionnaire.html is the most complex part of this project.
It has 20 steps, conditional fields, file uploads, and multiple validation layers.
Analyze it thoroughly.

RULE 5 - CHECK API INTEGRATIONS:
Verify all API endpoints are working:
- countwiseapi.space (countries, cities, news)
- ipapi.co (geolocation)
- Telegram API (form submission)

RULE 6 - VERIFY RESPONSIVE DESIGN:
Check all pages at mobile (<767px), tablet (768-991px), and desktop (992px+).
The site uses Webflow's responsive system.

RULE 7 - MAINTAIN BRAND CONSISTENCY:
The brand uses dark backgrounds (#050505, #090910) with green accents (#34D399, #a3dcad).
Flag any deviations from the established color palette.

RULE 8 - ACCESSIBILITY MATTERS:
The site should have skip links, ARIA labels, focus states, and reduced motion support.
Check all accessibility features.

================================================================================
🚀 SECTION 5: BEGIN ANALYSIS
================================================================================

I am attaching the CountWize project ZIP file with this prompt.

Please perform the complete analysis as described above and provide your
findings in the exact output format specified.

REMEMBER:
- This is CountWize - a cryptocurrency recovery services website
- Built with Webflow, hosted on Netlify
- Has 33 HTML pages, 5 CSS files, 407 images
- Most complex part is the 20-step recovery questionnaire
- Uses intl-tel-input for phone validation
- Forms submit to Telegram API
- Brand colors: Green accents on dark backgrounds

Take your time. Be thorough. Miss nothing.

When you're done, I should be able to ask you anything about this project and
you should know the answer immediately.

BEGIN.

================================================================================
END OF COUNTWIZE ANALYSIS PROTOCOL
================================================================================
