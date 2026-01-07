# CountWize Development Rules

## Critical: Deploy Directory is Source of Truth

**Netlify publishes the `site/` directory.** This is configured in `netlify.toml`.

### The Golden Rule

> **Edit ONLY files in `site/` for production changes.**
> Files in the root directory (outside `site/`) are NOT deployed.

### Directory Structure

```
CountWize/
├── site/                    ← DEPLOYED TO PRODUCTION
│   ├── *.html              ← Edit these HTML files
│   ├── css/                ← Edit these CSS files
│   ├── js/                 ← Edit these JS files
│   ├── images/             ← Edit these images
│   └── documents/          ← Edit these documents
│
├── css/                    ← NOT deployed (historical/backup)
├── js/                     ← NOT deployed (historical/backup)
├── images/                 ← NOT deployed (historical/backup)
└── netlify.toml            ← Deployment configuration
```

### Common Mistakes to Avoid

1. **Editing root CSS instead of site/css/** - Changes won't appear on production
2. **Editing root JS instead of site/js/** - Changes won't appear on production
3. **Editing root HTML instead of site/*.html** - Changes won't appear on production

### Verification Before Deploy

Run the drift check script to ensure no accidental divergence:

```bash
node scripts/check-deploy-drift.mjs
```

If the script fails, it means root and site files have diverged. Either:
- Copy the correct version to `site/` if root has newer changes
- Or ignore if `site/` is intentionally different

### Why This Structure Exists

The root-level files exist for historical reasons (Webflow export baseline). The `site/` directory contains the production-ready, polished versions with all Phase 2-8 enhancements applied.

### File Sync Status (as of 2026-01-08)

| File Type | Status |
|-----------|--------|
| HTML files | Root == Site (synced) |
| JS files | Root == Site (synced) |
| CSS files | Root == Site (synced after V2 fix) |

---

*Last updated: 2026-01-08*
