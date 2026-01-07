#!/usr/bin/env node

/**
 * check-deploy-drift.mjs
 *
 * Compares key files between root and site/ deploy directory.
 * Exits with code 1 if any mismatches are found.
 *
 * Usage: node scripts/check-deploy-drift.mjs
 */

import { createHash } from 'crypto';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Files to check for drift (root path -> site path)
const FILES_TO_CHECK = [
  // CSS files
  { root: 'css/design-tokens.css', site: 'site/css/design-tokens.css' },
  { root: 'css/responsive-fixes.css', site: 'site/css/responsive-fixes.css' },
  { root: 'css/countwize-animations.css', site: 'site/css/countwize-animations.css' },

  // JS files
  { root: 'js/form-hardening.js', site: 'site/js/form-hardening.js' },
  { root: 'js/a11y-hardening.js', site: 'site/js/a11y-hardening.js' },
  { root: 'js/perf-deferred-init.js', site: 'site/js/perf-deferred-init.js' },
];

function sha256(filePath) {
  const fullPath = resolve(ROOT, filePath);
  if (!existsSync(fullPath)) {
    return null;
  }
  const content = readFileSync(fullPath);
  return createHash('sha256').update(content).digest('hex');
}

function checkDrift() {
  console.log('🔍 Checking deploy directory drift...\n');

  let hasErrors = false;
  const results = [];

  for (const { root, site } of FILES_TO_CHECK) {
    const rootHash = sha256(root);
    const siteHash = sha256(site);

    if (rootHash === null && siteHash === null) {
      results.push({ file: root, status: 'MISSING', message: 'Both files missing' });
      continue;
    }

    if (rootHash === null) {
      results.push({ file: root, status: 'WARN', message: 'Root file missing (site-only)' });
      continue;
    }

    if (siteHash === null) {
      results.push({ file: root, status: 'ERROR', message: 'Deploy file missing!' });
      hasErrors = true;
      continue;
    }

    if (rootHash === siteHash) {
      results.push({ file: root, status: 'OK', message: 'Synced', hash: rootHash.slice(0, 12) });
    } else {
      results.push({
        file: root,
        status: 'DRIFT',
        message: 'Files differ!',
        rootHash: rootHash.slice(0, 12),
        siteHash: siteHash.slice(0, 12)
      });
      hasErrors = true;
    }
  }

  // Print results
  console.log('File'.padEnd(40) + 'Status'.padEnd(10) + 'Details');
  console.log('─'.repeat(70));

  for (const r of results) {
    const statusIcon = {
      'OK': '✅',
      'DRIFT': '❌',
      'ERROR': '❌',
      'WARN': '⚠️',
      'MISSING': '⚪'
    }[r.status];

    let details = r.message;
    if (r.hash) details += ` (${r.hash}…)`;
    if (r.rootHash) details += ` root:${r.rootHash}… site:${r.siteHash}…`;

    console.log(`${r.file.padEnd(40)}${statusIcon} ${r.status.padEnd(7)} ${details}`);
  }

  console.log('─'.repeat(70));

  if (hasErrors) {
    console.log('\n❌ DRIFT DETECTED — deploy directory is out of sync!');
    console.log('   Run: cp css/*.css site/css/ && cp js/*.js site/js/');
    process.exit(1);
  } else {
    console.log('\n✅ All files in sync. Deploy directory matches source.');
    process.exit(0);
  }
}

checkDrift();
