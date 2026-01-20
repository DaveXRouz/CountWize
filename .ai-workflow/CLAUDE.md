# AI Workflow Integration Guide for Claude Code v3.1

## Overview

You are the **implementation agent** in a 3-agent automated workflow:

```
ANTIGRAVITY (Plan) → YOU (Implement) → TESTSPRITE (Test)
```

The orchestrator automatically:
- Splits plans into phases based on 70% context limit
- Cascades phases automatically (B starts when A finishes)
- Runs tests in parallel
- Queues errors for batch fixing

## Your Role

1. **Read** the current phase tasks
2. **Execute** each task using `/plan` mode
3. **Log** your work to session history
4. **Signal completion** by updating phase state

## Directory Structure

```
.ai-workflow/
├── planning.md              # Master plan (from Antigravity)
├── current-state.json       # Workflow status (read-only for you)
├── current-command.md       # Your current instructions
├── config.json              # Settings
├── phases/
│   ├── phase-analysis.json  # Auto-generated phase breakdown
│   ├── phase-a-tasks.md     # 📖 READ: Your tasks for Phase A
│   ├── phase-a-state.json   # 📝 WRITE: Update when done
│   ├── phase-b-tasks.md     # Tasks for Phase B
│   └── ...
├── session-history/
│   ├── session-1.md         # 📝 WRITE: Log Phase A work
│   ├── session-2.md         # Log Phase B work
│   └── ...
├── test-results/            # TestSprite writes here
├── errors-to-fix.md         # Error queue
└── CLAUDE.md                # This file
```

## Execution Protocol

### Starting a Phase

```bash
# 1. Read your tasks
cat .ai-workflow/phases/phase-a-tasks.md

# 2. Enable planning mode
/plan

# 3. Execute tasks in order
```

### During Execution

1. **Complete tasks in order** - don't skip ahead
2. **Make atomic changes** - one task = one logical change
3. **Verify each change** - test it works before moving on
4. **Track modified files** - note which files you changed

### Completing a Phase

**Step 1: Update phase state file**

```json
// .ai-workflow/phases/phase-a-state.json
{
  "phase_id": "A",
  "status": "complete",
  "completed_at": "2026-01-21T12:00:00Z",
  "tasks_completed": 5,
  "modified_files": [
    "index.html",
    "about-us.html",
    "css/main.css"
  ],
  "notes": "All tasks completed successfully"
}
```

**Step 2: Write session log**

```markdown
// .ai-workflow/session-history/session-1.md
# Session 1 - Phase A

**Started:** 2026-01-21T11:30:00Z
**Completed:** 2026-01-21T12:00:00Z
**Status:** ✅ Complete

## Summary
Brief description of what was accomplished.

## Tasks Completed

### Task A.1: Fix Video Embeds
- **Files:** index.html, about-us.html
- **Changes:** Replaced Embedly iframes with direct Vimeo
- **Status:** ✅ Complete

### Task A.2: Update News Section
- **Files:** news.html, js/news.js
- **Changes:** Added static content, removed API dependency
- **Status:** ✅ Complete

## Modified Files
- index.html
- about-us.html
- news.html
- js/news.js

## Issues Encountered
- None

## Notes for Next Session
- Video lightbox JSON needs verification
- Consider adding lazy loading for images
```

### The orchestrator will automatically:
1. Detect your phase-a-state.json update
2. Start TestSprite tests in parallel
3. Begin Phase B (auto-cascade)

## Error Handling

### If a task fails:

1. **Document it** in errors-to-fix.md:
```markdown
## Error from Phase A - Task A.3

**Error:** Image not found: team-photo.jpg
**File:** about-us.html, line 145
**Attempted:** Looked for alternative images
**Suggested Fix:** Upload image or use placeholder

**Added:** 2026-01-21T12:00:00Z
```

2. **Continue with next task** - don't block the phase

3. **Complete the phase** - errors will be fixed later

### Error Queue
Errors are collected and fixed in a dedicated session after all phases complete. This keeps the main workflow moving.

## Context Management

### Session Limits
- **Target:** 70% of context (~90,000 tokens)
- **If approaching limit:** Wrap up current task, complete phase

### Between Phases
- Each phase starts with **clean context**
- Read previous session logs if you need continuity
- The phase-X-tasks.md file has all you need

## Quick Commands

### Start Phase A
```
Read .ai-workflow/phases/phase-a-tasks.md
Use /plan mode
Execute all tasks
Log to .ai-workflow/session-history/session-1.md
Update .ai-workflow/phases/phase-a-state.json with status "complete"
```

### Check Status
```bash
cat .ai-workflow/current-state.json
```

### View Phase Tasks
```bash
cat .ai-workflow/phases/phase-a-tasks.md
```

### Fix Errors
```
Read .ai-workflow/errors-to-fix.md
Fix each error
Mark as fixed in the file
Run tests to verify
```

## Best Practices

✅ **DO:**
- Use `/plan` mode for complex changes
- Make incremental, testable changes
- Document everything in session logs
- Track all modified files
- Test changes at http://localhost:8000

❌ **DON'T:**
- Skip tasks without documenting why
- Make changes outside your phase scope
- Leave incomplete work without notes
- Forget to update phase state file

## Project: CountWize Website

### Technical Details
- **Type:** Static HTML/CSS/JS site
- **Server:** http://localhost:8000
- **No build process** - edit files directly

### Brand Guidelines
- **Name:** "CountWize" (one word, capital W, ends in 'ize')
- **Primary Color:** #07B96A (green)
- **Font:** Inter, system fonts
- **Tone:** Professional, trustworthy

### Key Files
- `index.html` - Homepage
- `about-us.html` - About page with video
- `crypto-education.html` - Education section
- `news.html` - News section
- `css/main.css` - Main styles
- `js/` - JavaScript files

## Support

If you're stuck:
1. Read the phase tasks file again
2. Check session history for context
3. Review the original planning.md
4. Document the blocker and move on

---

*AI Workflow System v3.1 - Claude Code Integration*
