# Phase 7 SEO Rules

**Date**: 2026-01-06
**Purpose**: Deterministic rules for SEO metadata hygiene

---

## Canonical Domain

- **Canonical**: `https://countwize.com` (non-www)
- All canonical tags, OG URLs, sitemap URLs, robots.txt must use this domain
- www.countwize.com redirects to countwize.com (301)

---

## Required Meta Tags Per Page

### Title
- Present: REQUIRED
- Unique: REQUIRED (no duplicate titles across site)
- Max length: 60 characters recommended
- Format: `{Page Topic} | CountWize` or descriptive title

### Description
- Present: REQUIRED
- Unique: REQUIRED (no duplicates)
- Max length: 155 characters recommended
- Content: Factual, no hype, no guarantees

### Canonical
- Present: REQUIRED (exactly one per page)
- Format: `<link rel="canonical" href="https://countwize.com/{path}">`
- Must use non-www domain

### OpenGraph
- `og:title`: REQUIRED
- `og:description`: REQUIRED
- `og:url`: REQUIRED (non-www domain)
- `og:type`: REQUIRED (use "website")
- `og:image`: OPTIONAL (only if valid image exists)

### Twitter Card
- `twitter:card`: REQUIRED (use "summary")
- `twitter:title`: OPTIONAL (falls back to og:title)
- `twitter:description`: OPTIONAL (falls back to og:description)

---

## Content Guidelines

### Allowed Language
- "crypto recovery services"
- "case review"
- "investigation support"
- "forensic analysis"
- "asset tracing"

### Prohibited Language
- "#1" or "best" claims
- "guaranteed recovery"
- "100% success"
- Unverifiable certifications

---

## H1 Guidelines

- Each page SHOULD have exactly 1 H1
- Pages with 0 H1: Document but do not change (would be redesign)
- Pages with >1 H1: Document but do not change (would be redesign)

---

## Duplicate Pages (Redirected)

These pages are 301-redirected to canonical versions:
- contact.html → contact-us.html
- crypto-education.html → education.html
- faq-crypto-recovery.html → faq.html

For redirected pages: Keep SEO tags minimal (redirect handles SEO)

---

## Error/Utility Pages

- 401.html, 404.html: Minimal SEO (not indexed)
- detail_*.html: Template pages, minimal SEO

---

## Validation Criteria

| Check | Requirement |
|-------|-------------|
| Missing titles | 0 |
| Missing descriptions | 0 |
| Missing canonicals | 0 |
| Duplicate canonicals per page | 0 |
| www in canonicals | 0 |
| Missing og:title | 0 |
| Missing og:description | 0 |
| Missing og:url | 0 |
| Missing twitter:card | 0 |
