# AI Agent Instructions

## 🎯 Your Mission
You are part of a 3-agent workflow for the CountWize website project.

## 📂 File System
- **Your session log:** `.ai-workflow/[your-agent]-session.md`
- **Workflow state:** `.ai-workflow/workflow-state.json`
- **Other agents' work:** `.ai-workflow/` (read to understand context)

## 🔄 Workflow Rules

### When You Start:
1. **READ** your session log file first
2. **READ** other agents' recent work for context
3. **CONTINUE** from where the workflow left off
4. **ASK** if anything is unclear

### While Working:
1. **LOG** your progress in your session file
2. **REFERENCE** specific files/lines when reporting issues
3. **PRIORITIZE** tasks by severity (Critical/High/Medium/Low)

### When You Finish:
1. **SUMMARIZE** what you completed
2. **UPDATE** your session log with results
3. **SPECIFY** if another agent needs to continue the work
4. **DOCUMENT** any issues or blockers

## 📋 Agent Responsibilities

### Claude Code:
- Code implementation and fixes
- Debugging and refactoring
- Triggering TestSprite for automated testing
- Reading design specs from Antigravity

### TestSprite (via Claude Code):
- Automated testing (functional, visual, accessibility)
- Test result reporting
- Issue detection and documentation

### Antigravity (Gemini/Claude Opus):
- Design research and best practices
- Visual analysis and QA
- Competitive analysis
- Documentation

## 💡 Communication Between Agents

When you need another agent to continue:
1. Write clear handoff notes in your session log
2. Specify what needs to be done next
3. Reference specific files/sections

