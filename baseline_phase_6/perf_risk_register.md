# Phase 6 Performance Risk Register

**Date**: 2026-01-06
**Purpose**: Document performance-related risks and mitigations

---

## Risk: Third-Party Script Delays (R001)

**Description**: Deferring LiveChat initialization could delay chat availability

**Likelihood**: Low
**Impact**: Low (chat is non-critical feature)

**Mitigation**:
- LiveChat initializes after `load` event using `requestIdleCallback`
- Fallback to `setTimeout(100ms)` if `requestIdleCallback` unavailable
- Chat widget still appears within 3 seconds of page load
- Noscript fallback link always available

**Rollback**: Remove `asyncInit = true` and `perf-deferred-init.js`

---

## Risk: Caching Header Staleness (R002)

**Description**: Long cache durations could serve stale content

**Likelihood**: Low (after PH6-AUDIT fix)
**Impact**: Low (mitigated)

**Mitigation** (updated in PH6-AUDIT):
- HTML pages: 1 hour cache with `must-revalidate`
- CSS/JS: 1 week cache with `must-revalidate` (assets NOT content-hashed)
- Images: 1 week cache (assets NOT content-hashed)
- Documents: 30 days cache
- Removed `immutable` flag since Webflow assets lack content hashes

**Rollback**: Remove Phase 6 header rules from `netlify.toml`

---

## Risk: LCP Misclassification (R003)

**Description**: Wrong elements marked as LCP candidates

**Likelihood**: Low
**Impact**: Medium (delayed LCP)

**Mitigation**:
- Only hero-logo images marked with `fetchpriority="high"`
- Navbar logos set to `loading="eager"` (no fetchpriority)
- Best guess based on above-fold visibility analysis
- Can adjust based on Lighthouse/CWV data

**Rollback**: Restore `loading="lazy"` from git history

---

## Risk: Image Decode Thread Contention (R004)

**Description**: Many images with `decoding="async"` could cause decode spikes

**Likelihood**: Very Low
**Impact**: Very Low (browser handles this gracefully)

**Mitigation**:
- `decoding="async"` only on `loading="lazy"` images
- Browser already defers decode for lazy images
- No forced decoding on critical path

**Rollback**: Remove `decoding="async"` attributes via sed

---

## Risk: Resource Hint Overhead (R005)

**Description**: Too many preconnect/dns-prefetch hints could slow connection setup

**Likelihood**: Very Low
**Impact**: Very Low

**Mitigation**:
- Only 3 preconnect hints per page (fonts x2, existing)
- Only 1 dns-prefetch added (LiveChat CDN)
- All hints point to actually-used origins

**Rollback**: Remove dns-prefetch line via sed

---

## Risk: Defer Breaking Script Dependencies (R006)

**Description**: Adding defer could break script execution order

**Likelihood**: Very Low
**Impact**: High if occurs

**Mitigation**:
- Only added defer to scripts without dependencies:
  - `a11y-hardening.js` - self-contained, runs on DOMContentLoaded
  - `perf-deferred-init.js` - self-contained, runs on load
- Webflow scripts (`webflow.js`, jQuery) NOT deferred
- Verified no errors introduced via grep for obvious syntax issues

**Rollback**: Remove `defer` attribute from script tags

---

## Summary Table

| Risk ID | Risk | Likelihood | Impact | Status |
|---------|------|------------|--------|--------|
| R001 | LiveChat delay | Low | Low | Mitigated |
| R002 | Cache staleness | Medium | Medium | Mitigated |
| R003 | LCP misclassification | Low | Medium | Monitored |
| R004 | Decode contention | Very Low | Very Low | Accepted |
| R005 | Hint overhead | Very Low | Very Low | Accepted |
| R006 | Defer dependencies | Very Low | High | Mitigated |

All risks have documented rollback procedures in `PHASE_6_REPORT.md`.
