# Playwright MCP Setup for Cursor

This guide explains how to set up the Playwright MCP integration for AI-driven visual testing workflow.

## What This Enables

- **Browser automation** directly from Cursor's AI agent
- **Visual diff comparisons** between target designs and your current implementation
- **Iterative design implementation** loop where AI refines UI based on visual feedback

## Setup Steps

### 1. Add Playwright MCP to Cursor (Global)

1. Open Cursor Settings (`Cmd + ,`)
2. Go to **Features** → **MCP**
3. Click **"Add new global MCP server"**
4. Paste this configuration:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp"]
    }
  }
}
```

5. Click **Refresh** and verify the Playwright server shows as **green**

### 2. Verify Installation

In Cursor's AI chat, try:
```
Use Playwright to navigate to http://localhost:8080 and take a snapshot
```

If configured correctly, Cursor will launch a browser and capture the page.

## Available Commands

### Start Dev Server
```bash
npm run dev
```
Opens http://localhost:8080

### Compare Screenshots
```bash
npm run compare
```
Compares the two most recent screenshots in `screenshots/` folder.

### Compare Specific Images
```bash
npx tsx scripts/compare-images.ts screenshots/target.png screenshots/current.png
```

## Visual Testing Workflow

### 1. Capture Target Design
Ask Cursor:
```
Use Playwright to:
1. Resize browser to 1024x768
2. Navigate to https://example.com (your target design)
3. Take a screenshot and save to screenshots/target-homepage.png
```

### 2. Capture Current State
```
Use Playwright to:
1. Resize browser to 1024x768
2. Navigate to http://localhost:8080
3. Take a screenshot and save to screenshots/current-homepage.png
```

### 3. Generate Diff
```bash
npm run compare
```

### 4. Implement Changes
Ask Cursor to analyze the diff and implement changes:
```
Look at the diff image in diffs/ folder and implement the necessary CSS/HTML changes to match the target design.
```

### 5. Iterate
Repeat steps 2-4 until the designs match.

## Cursor Rules

The following rules are set up in `.cursor/rules/`:

- **visual-testing.mdc** - Screenshot specs, diff workflow, best practices
- **project-setup.mdc** - Project structure, dev server, dependencies
- **playwright-workflow.mdc** - Available MCP tools and usage patterns

## Directory Structure

```
├── screenshots/          # Store target and current screenshots here
├── diffs/               # Visual diff outputs (auto-generated)
├── scripts/
│   └── compare-images.ts # Pixelmatch comparison script
└── .cursor/
    └── rules/           # Cursor AI context rules
```

## Tips

- **Always use 1024x768** for consistent comparisons
- **Use PNG format only** (not JPEG)
- Name screenshots clearly: `target-*.png`, `current-*.png`
- Diff images show differences in **red/magenta**
- Start with major structural differences, then fine-tune

## Troubleshooting

### Playwright MCP not showing green
1. Make sure `@playwright/mcp` is installed globally: `npm install -g @playwright/mcp`
2. Click Refresh in Cursor MCP settings
3. Restart Cursor

### Browser doesn't launch
Run: `npx playwright install chromium`

### Comparison script fails
Make sure you have at least 2 PNG files in `screenshots/` folder.

## References

- [Playwright MCP GitHub](https://github.com/microsoft/playwright-mcp)
- [egghead.io Tutorial](https://egghead.io/ai-driven-design-workflow-playwright-mcp-screenshots-visual-diffs-and-cursor-rules~aulxx)
