# CountWize Baseline Manifest
## Phase 1 - Stability & Safety Baseline
## Date: 2026-01-06

---

## Baseline Timestamp
| Property | Value |
|----------|-------|
| UTC Timestamp | 2026-01-06T00:00:00Z |
| Local Analysis Date | 2026-01-06 |
| Last Published (from HTML) | Mon Nov 17 2025 21:36:46 GMT+0000 |

---

## Domain Behavior
| Property | Value |
|----------|-------|
| Primary Domain | countwize.com |
| Canonical Domain | www.countwize.com |
| Sitemap References | www.countwize.com |
| Robots.txt Sitemap | www.countwize.com |
| Redirect Behavior | NEEDS LIVE VERIFICATION |

### Domain Consistency Issues
- Sitemap.xml uses `www.countwize.com` URLs
- robots.txt references `www.countwize.com/sitemap.xml`
- Canonical tags use `www.countwize.com`
- Live site accessible at both `countwize.com` and `www.countwize.com` (verify redirect)

---

## Analysis Environment
| Property | Value |
|----------|-------|
| Platform | Linux 4.4.0 |
| Analysis Type | Static code analysis + limited live fetch |
| Browser Testing | NOT PERFORMED (CLI environment) |

### Viewports Specified (For Live Testing)
| Device | Width x Height |
|--------|----------------|
| Mobile (iPhone 12/13) | 390 x 844 |
| Mobile (Android) | 360 x 800 |
| Tablet | 768 x 1024 |
| Desktop | 1440 x 900 |

### Browser Requirements (For Live Testing)
| Browser | Version |
|---------|---------|
| Chrome | Latest stable |
| Safari | Latest / iOS Safari |
| Firefox | Optional |

---

## File Structure

### HTML Pages (33 files)
```
index.html (109,893 bytes) - Homepage
recovery.html (52,238 bytes) - Crypto Recovery main page
contact-us.html (48,183 bytes) - Contact form page
contact.html (47,344 bytes) - Duplicate contact page?
recovery-questionnaire.html (111,608 bytes) - 20-step questionnaire
news.html (47,850 bytes) - News aggregation page
blog.html (48,342 bytes) - Blog listing
about-us.html (40,213 bytes) - About page
team.html (29,049 bytes) - Team page
faq.html (34,890 bytes) - FAQ page
faq-crypto-recovery.html (34,906 bytes) - Crypto recovery FAQ
education.html (75,604 bytes) - Education hub
crypto-education.html (75,611 bytes) - Crypto education
crypto-insights.html (47,861 bytes) - Crypto insights
crypto-recovery-guide.html (69,914 bytes) - Recovery guide
crypto-tax.html (41,764 bytes) - Crypto tax information
forex-scams.html (28,183 bytes) - Forex scams article
privacy-policy.html (27,633 bytes) - Privacy policy
cookie-policy.html (26,124 bytes) - Cookie policy
legal.html (29,446 bytes) - Legal terms
401.html (18,954 bytes) - Password protected page
404.html (17,673 bytes) - Not found page
detail_service.html (22,424 bytes) - Service detail template
detail_post.html (24,312 bytes) - Blog post template
detail_blogcategory.html (24,018 bytes) - Blog category template
detail_member.html (21,653 bytes) - Team member template
detail_project.html (21,651 bytes) - Project template
detail_education-videos.html (20,638 bytes) - Education video template
article-4.html (27,675 bytes) - Article page
article-5.html (30,047 bytes) - Article page
how-do-you-check-if-a-website-is-legitimate.html (27,604 bytes) - Article
how-does-a-crypto-recovery-phrase-work.html (28,405 bytes) - Article
how-to-avoid-losing-your-crypto-real-mistakes-real-fixes-and-smart-protection-tips.html (28,971 bytes) - Article
```

### CSS Files (5 files)
| File | Size | SHA256 |
|------|------|--------|
| normalize.css | 7,772 bytes | 0d336a97efd52a4ef44ef3270e71eac24ba405d4450016f9d3e943256e9e58c8 |
| webflow.css | 38,513 bytes | b2dfaf5cd1b774b3358e45375f126b55571cc71e713f6f9da535ca9d8286c580 |
| countwize-test.webflow.css | 294,067 bytes | 070365d9f85860af618e6b74e0eb71a662772fde45a9d1974f283abaa0479699 |
| responsive-fixes.css | 36,122 bytes | b49bc34651a7bf0d47aae21202987f0207ceb3cead8617379b74af715060aad1 |
| countwize-animations.css | 7,183 bytes | 23ecfaeed0f6019339b1494ca654e239e15ec6812b35b9a8d7da7f70d2e3f1ab |

### JS Files (1 file)
| File | Size | SHA256 |
|------|------|--------|
| webflow.js | 450,216 bytes | da9e19bd5e22791cc7052fb57745af11ca088958948b41d08eab3b3f73f254a6 |

---

## External Dependencies

### CDN Resources
| Resource | Version | Purpose |
|----------|---------|---------|
| Google Fonts (WebFont.js) | 1.6.26 | Be Vietnam Pro, Poppins |
| intl-tel-input | 17.0.12 | Phone number validation |
| flatpickr | latest | Date/time picker |

### Third-Party Services
| Service | Purpose | Pages |
|---------|---------|-------|
| Google Analytics | Analytics | All pages (G-0NX03W5PQR) |
| Google Ads | Conversion tracking | All pages (AW-447543988) |
| LiveChat | Customer chat widget | All pages |
| ipapi.co | IP geolocation | Pages with phone input |

### API Endpoints
| Endpoint | Purpose |
|----------|---------|
| https://telegram-vercel-seven.vercel.app/api/telegram | Form submissions |
| https://countwiseapi.space/api/countries/ | Country data |
| https://countwiseapi.space/api/countries/{id}/cities/ | City data |
| https://countwiseapi.space/api/news/ | News feed |
| https://countwiseapi.space/api/web-news/ | Web news |
| https://countwiseapi.space/api/big-news/ | Featured news |
| https://restcountries.com/v2/all | Country/timezone data |
| https://ipapi.co/json/ | IP geolocation |

---

## Netlify Configuration

### netlify.toml Present
- File exists: Yes (2,855 bytes)
- Deploy identifier: Unknown (requires Netlify dashboard access)

---

## Rollback Strategy

### Method 1: Git Revert
The codebase is under Git version control. To rollback:
```bash
git log --oneline  # Find commit hash
git revert <commit-hash>  # Create revert commit
git push origin <branch>  # Deploy via Netlify
```

### Method 2: Netlify Deploy Rollback
1. Access Netlify dashboard
2. Navigate to Deploys
3. Find previous working deploy
4. Click "Publish deploy"

### Baseline Files for Comparison
All CSS/JS hashes documented above. Compare after any changes:
```bash
sha256sum css/*.css js/*.js
```

---

## Limitations of This Baseline

### NOT Captured (Requires Browser)
- [ ] Visual screenshots at specified viewports
- [ ] Console log captures
- [ ] Network HAR files
- [ ] Lighthouse performance reports
- [ ] Axe accessibility reports
- [ ] Form submission tests
- [ ] Mobile menu behavior
- [ ] LiveChat widget interaction
- [ ] Cookie consent banner behavior

### Marked: CODE-ANALYSIS-ONLY
This baseline is derived from static code analysis. Full baseline requires browser-based testing to capture:
1. Runtime JavaScript behavior
2. Actual API responses
3. Visual rendering at breakpoints
4. Performance metrics
5. Accessibility scores

---

## Phase 1 Completion Status

| Artifact | Status |
|----------|--------|
| Folder structure created | COMPLETE |
| File hashes captured | COMPLETE |
| SEO inventory | COMPLETE |
| Sitemap/robots snapshot | COMPLETE |
| Forms matrix documented | COMPLETE |
| Questionnaire analysis | COMPLETE |
| Integrations identified | COMPLETE |
| Risk register | COMPLETE |
| Screenshots | REQUIRES BROWSER |
| Console logs | REQUIRES BROWSER |
| Network HAR | REQUIRES BROWSER |
| Lighthouse reports | REQUIRES BROWSER |
| Axe reports | REQUIRES BROWSER |
