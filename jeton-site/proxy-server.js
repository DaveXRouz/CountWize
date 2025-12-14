/**
 * Proxy Server with Rive URL Rewriting
 * Serves the site and intercepts Rive file requests
 */

const http = require('http');
const https = require('https');
const fs = require('fs-extra');
const path = require('path');
const { URL } = require('url');

const PORT = 9000;
const BASE_DIR = __dirname;
const RIVE_DIR = path.join(BASE_DIR, 'rive');

// Rive file mappings
const RIVE_FILES = {
  '8d69d40e5b4bce75fcc798d223029db8a1ccdeab.riv': '8d69d40e5b4bce75fcc798d223029db8a1ccdeab.riv',
  '01ab41d2c3f10a4db55f02c855b37106ae2d2568.riv': '01ab41d2c3f10a4db55f02c855b37106ae2d2568.riv',
  '6442a9110636ba0da2e6c0c731d92457d7e928cc.riv': '6442a9110636ba0da2e6c0c731d92457d7e928cc.riv',
  '23a3c11ba226d4bb7e916918723d814288b77265.riv': '23a3c11ba226d4bb7e916918723d814288b77265.riv',
  '95cea0426464659130966516e85464603be1e091.riv': '95cea0426464659130966516e85464603be1e091.riv'
};

/**
 * Get MIME type from file extension
 */
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.riv': 'application/octet-stream',
    '.mp4': 'video/mp4',
    '.webp': 'image/webp'
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

/**
 * Serve a file
 */
function serveFile(filePath, res) {
  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('File not found');
    return;
  }
  
  const stats = fs.statSync(filePath);
  if (stats.isDirectory()) {
    // Try index.html
    const indexPath = path.join(filePath, 'index.html');
    if (fs.existsSync(indexPath)) {
      serveFile(indexPath, res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Directory listing not supported');
    }
    return;
  }
  
  const mimeType = getMimeType(filePath);
  const content = fs.readFileSync(filePath);
  
  res.writeHead(200, {
    'Content-Type': mimeType,
    'Content-Length': content.length,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(content);
}

/**
 * Handle request
 */
function handleRequest(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }
  
  const url = new URL(req.url, `http://${req.headers.host}`);
  let filePath = url.pathname;
  
  // Remove leading slash
  if (filePath.startsWith('/')) {
    filePath = filePath.substring(1);
  }
  
  // Handle root
  if (!filePath || filePath === '') {
    filePath = 'index.html';
  }
  
  // Check if this is a Rive file request (from CDN)
  const fileName = path.basename(filePath);
  if (RIVE_FILES[fileName] && filePath.includes('cdn.sanity.io')) {
    // Rewrite to local Rive file
    const localRivePath = path.join(RIVE_DIR, fileName);
    console.log(`[RIVE] Rewriting ${filePath} -> ${localRivePath}`);
    serveFile(localRivePath, res);
    return;
  }
  
  // Check if direct Rive file request
  if (filePath.startsWith('rive/') || filePath.includes('.riv')) {
    const localRivePath = path.join(BASE_DIR, filePath);
    if (fs.existsSync(localRivePath)) {
      serveFile(localRivePath, res);
      return;
    }
  }
  
  // Normal file serving
  const fullPath = path.join(BASE_DIR, filePath);
  
  // Security check - prevent directory traversal
  if (!fullPath.startsWith(BASE_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }
  
  serveFile(fullPath, res);
}

/**
 * Start server
 */
function startServer() {
  const server = http.createServer(handleRequest);
  
  server.listen(PORT, () => {
    console.log(`\n🚀 Proxy server running on http://localhost:${PORT}`);
    console.log('   Rive file interception enabled');
    console.log('   Press Ctrl+C to stop\n');
  });
  
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Please stop the existing server first.`);
    } else {
      console.error('Server error:', err);
    }
    process.exit(1);
  });
}

if (require.main === module) {
  startServer();
}

module.exports = { startServer, handleRequest };
