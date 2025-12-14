/**
 * Fix Rive File References
 * Intercepts and rewrites CDN URLs to local paths for Rive animations
 */

const fs = require('fs-extra');
const path = require('path');

const BASE_DIR = __dirname;
const RIVE_DIR = path.join(BASE_DIR, 'rive');

/**
 * Create a runtime script that intercepts fetch requests for Rive files
 */
function createRiveInterceptor() {
  const interceptorScript = `
// Rive URL Interceptor - Rewrites CDN URLs to local paths
// Must run BEFORE any other scripts
(function() {
  'use strict';
  
  const riveFiles = {
    '8d69d40e5b4bce75fcc798d223029db8a1ccdeab.riv': 'rive/8d69d40e5b4bce75fcc798d223029db8a1ccdeab.riv',
    '01ab41d2c3f10a4db55f02c855b37106ae2d2568.riv': 'rive/01ab41d2c3f10a4db55f02c855b37106ae2d2568.riv',
    '6442a9110636ba0da2e6c0c731d92457d7e928cc.riv': 'rive/6442a9110636ba0da2e6c0c731d92457d7e928cc.riv',
    '23a3c11ba226d4bb7e916918723d814288b77265.riv': 'rive/23a3c11ba226d4bb7e916918723d814288b77265.riv',
    '95cea0426464659130966516e85464603be1e091.riv': 'rive/95cea0426464659130966516e85464603be1e091.riv'
  };
  
  // Intercept fetch requests - MUST be set before any scripts load
  if (window.fetch) {
    const originalFetch = window.fetch;
    window.fetch = function(url, options) {
      if (typeof url === 'string' && url.includes('cdn.sanity.io') && url.includes('.riv')) {
        const fileName = url.split('/').pop();
        if (riveFiles[fileName]) {
          console.log('[RIVE INTERCEPTOR] Rewriting:', url, '->', riveFiles[fileName]);
          url = riveFiles[fileName];
        }
      }
      return originalFetch.call(this, url, options);
    };
  } else {
    // Fetch not available yet, set up when it becomes available
    Object.defineProperty(window, 'fetch', {
      configurable: true,
      enumerable: true,
      get: function() {
        return function(url, options) {
          if (typeof url === 'string' && url.includes('cdn.sanity.io') && url.includes('.riv')) {
            const fileName = url.split('/').pop();
            if (riveFiles[fileName]) {
              console.log('[RIVE INTERCEPTOR] Rewriting:', url, '->', riveFiles[fileName]);
              url = riveFiles[fileName];
            }
          }
          // Use native fetch
          return fetch(url, options);
        };
      },
      set: function(value) {
        // Wrap the setter
        const originalFetch = value;
        window._originalFetch = originalFetch;
        Object.defineProperty(window, 'fetch', {
          value: function(url, options) {
            if (typeof url === 'string' && url.includes('cdn.sanity.io') && url.includes('.riv')) {
              const fileName = url.split('/').pop();
              if (riveFiles[fileName]) {
                console.log('[RIVE INTERCEPTOR] Rewriting:', url, '->', riveFiles[fileName]);
                url = riveFiles[fileName];
              }
            }
            return originalFetch.call(this, url, options);
          },
          configurable: true,
          writable: true
        });
      }
    });
  }
  
  // Intercept XMLHttpRequest
  const originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, ...args) {
    if (typeof url === 'string' && url.includes('cdn.sanity.io') && url.includes('.riv')) {
      const fileName = url.split('/').pop();
      if (riveFiles[fileName]) {
        console.log('[RIVE INTERCEPTOR] Rewriting (XHR):', url, '->', riveFiles[fileName]);
        url = riveFiles[fileName];
      }
    }
    return originalOpen.call(this, method, url, ...args);
  };
  
  // Also intercept Request constructor
  if (window.Request) {
    const OriginalRequest = window.Request;
    window.Request = function(input, init) {
      if (typeof input === 'string' && input.includes('cdn.sanity.io') && input.includes('.riv')) {
        const fileName = input.split('/').pop();
        if (riveFiles[fileName]) {
          console.log('[RIVE INTERCEPTOR] Rewriting (Request):', input, '->', riveFiles[fileName]);
          input = riveFiles[fileName];
        }
      }
      return new OriginalRequest(input, init);
    };
    // Copy static properties
    Object.setPrototypeOf(window.Request, OriginalRequest);
    Object.getOwnPropertyNames(OriginalRequest).forEach(name => {
      if (name !== 'prototype' && name !== 'length' && name !== 'name') {
        try {
          window.Request[name] = OriginalRequest[name];
        } catch (e) {}
      }
    });
  }
  
  console.log('[RIVE INTERCEPTOR] Loaded and active');
})();
`;
  
  return interceptorScript;
}

/**
 * Add interceptor script to HTML
 */
function addInterceptorToHTML() {
  const htmlPath = path.join(BASE_DIR, 'index.html');
  
  if (!fs.existsSync(htmlPath)) {
    console.error('index.html not found');
    return false;
  }
  
  let html = fs.readFileSync(htmlPath, 'utf8');
  
  // Remove old interceptor if it exists
  if (html.includes('Rive URL Interceptor')) {
    console.log('Removing old interceptor...');
    // Remove the old script block
    html = html.replace(/<script>[\s\S]*?Rive URL Interceptor[\s\S]*?<\/script>/gi, '');
  }
  
  // Create interceptor script
  const interceptorScript = createRiveInterceptor();
  const scriptTag = `<script>${interceptorScript}</script>`;
  
  // Insert very early in head, right after <head> tag
  if (html.includes('<head>')) {
    // Find the first script or meta tag after head
    const headMatch = html.match(/<head[^>]*>/);
    if (headMatch) {
      const headEnd = headMatch.index + headMatch[0].length;
      html = html.slice(0, headEnd) + '\n' + scriptTag + '\n' + html.slice(headEnd);
    } else {
      // Fallback: before closing head
      html = html.replace('</head>', `${scriptTag}\n</head>`);
    }
  } else {
    // Fallback: add at the beginning
    html = scriptTag + '\n' + html;
  }
  
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('✓ Added Rive interceptor to index.html');
  return true;
}

/**
 * Search and replace in JavaScript files (if possible)
 */
function fixJSFiles() {
  const jsDir = path.join(BASE_DIR, '_nuxt');
  
  if (!fs.existsSync(jsDir)) {
    console.log('_nuxt directory not found');
    return;
  }
  
  const riveMappings = {
    'https://cdn.sanity.io/files/q3ih7d1b/production/8d69d40e5b4bce75fcc798d223029db8a1ccdeab.riv': 'rive/8d69d40e5b4bce75fcc798d223029db8a1ccdeab.riv',
    'https://cdn.sanity.io/files/q3ih7d1b/production/01ab41d2c3f10a4db55f02c855b37106ae2d2568.riv': 'rive/01ab41d2c3f10a4db55f02c855b37106ae2d2568.riv',
    'https://cdn.sanity.io/files/q3ih7d1b/production/6442a9110636ba0da2e6c0c731d92457d7e928cc.riv': 'rive/6442a9110636ba0da2e6c0c731d92457d7e928cc.riv',
    'https://cdn.sanity.io/files/q3ih7d1b/production/23a3c11ba226d4bb7e916918723d814288b77265.riv': 'rive/23a3c11ba226d4bb7e916918723d814288b77265.riv',
    'https://cdn.sanity.io/files/q3ih7d1b/production/95cea0426464659130966516e85464603be1e091.riv': 'rive/95cea0426464659130966516e85464603be1e091.riv'
  };
  
  function processJSFiles(dir) {
    const files = fs.readdirSync(dir);
    let modifiedCount = 0;
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        modifiedCount += processJSFiles(filePath);
      } else if (file.endsWith('.js')) {
        try {
          let content = fs.readFileSync(filePath, 'utf8');
          let modified = false;
          
          for (const [cdnUrl, localPath] of Object.entries(riveMappings)) {
            if (content.includes(cdnUrl)) {
              content = content.replace(new RegExp(cdnUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), localPath);
              modified = true;
            }
          }
          
          if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            modifiedCount++;
            console.log(`✓ Updated: ${path.relative(BASE_DIR, filePath)}`);
          }
        } catch (e) {
          // Skip files that can't be read/written
        }
      }
    }
    
    return modifiedCount;
  }
  
  const modified = processJSFiles(jsDir);
  console.log(`Modified ${modified} JavaScript files`);
}

/**
 * Main function
 */
function main() {
  console.log('Fixing Rive file references...\n');
  
  // Add interceptor to HTML (runtime solution)
  console.log('Adding runtime interceptor to HTML...');
  addInterceptorToHTML();
  
  // Try to fix JS files directly
  console.log('\nAttempting to fix JavaScript files...');
  fixJSFiles();
  
  console.log('\n✓ Rive reference fixes complete');
  console.log('\nNote: The runtime interceptor will handle CDN URLs at page load.');
  console.log('If JavaScript files were too minified, the interceptor will catch them.');
}

if (require.main === module) {
  main();
}

module.exports = { createRiveInterceptor, addInterceptorToHTML, fixJSFiles };
