# Changelog

All notable changes to the CountWize website are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.0.1] - 2026-01-11

### Fixed

- Improved Netlify build command with verbose logging for deployment debugging
- Enhanced build process to explicitly copy each directory for better reliability

---

## [1.0.0] - 2026-01-11

### Changed

- Complete project restructure following Master Ultra Plan
- Renamed CSS file from `countwize-test.webflow.css` to `main.css`
- Consolidated duplicate Google Analytics scripts
- Fixed video player with clean embed structure
- Improved JavaScript with proper error handling
- Enhanced CSS with professional header and organization

### Removed

- 23 dead/duplicate HTML files (42 -> 19 files)
- 245 unused images (370 -> 125 images)
- Webflow data attributes (`data-wf-page`, `data-wf-site`)
- Russian/Ukrainian comments and text
- Duplicate inline styles (moved to main.css)
- Old/backup files (`*-old.html`, `old-*.html`)
- CMS template files (`detail_*.html`)
- Root-level blog duplicates (kept `blog/` versions)

### Added

- Comprehensive `netlify.toml` configuration
- Security headers (CSP, X-Frame-Options, etc.)
- Cache control for static assets
- SEO-preserving redirects
- Skip link for accessibility
- Professional README documentation
- CHANGELOG file

### Fixed

- Navigation links pointing to deleted old files
- Video player nested wrapper issues
- Broken menuButton selector in JavaScript
- Inline styles overriding CSS

### Security

- Content Security Policy configured for all external resources
- X-Frame-Options set to SAMEORIGIN
- X-Content-Type-Options set to nosniff
- Referrer-Policy configured
- Permissions-Policy restricting unused features

## [0.1.0] - 2025-11-17

### Added

- Initial website launch
- Homepage with hero section
- Contact forms
- Educational video section
- Blog articles
- Team page
- FAQ section
