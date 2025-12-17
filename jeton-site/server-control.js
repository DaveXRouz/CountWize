#!/usr/bin/env node
/**
 * Server Control Script for Port 9000
 * Allows starting, stopping, and restarting the proxy server
 */

const { spawn, exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const SERVER_SCRIPT = path.join(__dirname, 'proxy-server.js');
const PID_FILE = path.join(__dirname, '.server.pid');

/**
 * Get the PID of the running server
 */
function getServerPID() {
  return new Promise((resolve) => {
    exec(`lsof -ti:9000`, (err, stdout) => {
      if (err || !stdout.trim()) {
        resolve(null);
      } else {
        const pids = stdout.trim().split('\n').filter(p => p);
        // Find the node process running proxy-server.js
        exec(`ps -p ${pids.join(',')} -o pid,command`, (err, stdout) => {
          if (err) {
            resolve(null);
            return;
          }
          const lines = stdout.split('\n');
          for (const line of lines) {
            if (line.includes('proxy-server.js')) {
              const pid = line.trim().split(/\s+/)[0];
              resolve(pid);
              return;
            }
          }
          resolve(null);
        });
      }
    });
  });
}

/**
 * Start the server
 */
function startServer() {
  return new Promise((resolve, reject) => {
    getServerPID().then(pid => {
      if (pid) {
        console.log(`⚠️  Server is already running on port 9000 (PID: ${pid})`);
        resolve(pid);
        return;
      }

      console.log('🚀 Starting proxy server on port 9000...');
      const server = spawn('node', [SERVER_SCRIPT], {
        cwd: __dirname,
        detached: true,
        stdio: 'ignore'
      });

      server.unref();
      
      // Wait a moment and check if it started
      setTimeout(() => {
        getServerPID().then(newPid => {
          if (newPid) {
            console.log(`✅ Server started successfully (PID: ${newPid})`);
            fs.writeFileSync(PID_FILE, newPid.toString());
            resolve(newPid);
          } else {
            console.error('❌ Failed to start server');
            reject(new Error('Server failed to start'));
          }
        });
      }, 1000);
    });
  });
}

/**
 * Stop the server
 */
function stopServer() {
  return new Promise((resolve) => {
    getServerPID().then(pid => {
      if (!pid) {
        console.log('ℹ️  No server running on port 9000');
        if (fs.existsSync(PID_FILE)) {
          fs.unlinkSync(PID_FILE);
        }
        resolve(false);
        return;
      }

      console.log(`🛑 Stopping server (PID: ${pid})...`);
      try {
        process.kill(pid, 'SIGTERM');
        setTimeout(() => {
          // Force kill if still running
          getServerPID().then(remainingPid => {
            if (remainingPid) {
              console.log(`⚠️  Server didn't stop, force killing...`);
              process.kill(parseInt(remainingPid), 'SIGKILL');
            }
            if (fs.existsSync(PID_FILE)) {
              fs.unlinkSync(PID_FILE);
            }
            console.log('✅ Server stopped');
            resolve(true);
          });
        }, 1000);
      } catch (err) {
        console.error('❌ Error stopping server:', err.message);
        resolve(false);
      }
    });
  });
}

/**
 * Restart the server
 */
function restartServer() {
  return stopServer().then(() => {
    return new Promise(resolve => setTimeout(resolve, 500));
  }).then(() => {
    return startServer();
  });
}

/**
 * Check server status
 */
function checkStatus() {
  return getServerPID().then(pid => {
    if (pid) {
      console.log(`✅ Server is running on port 9000 (PID: ${pid})`);
      console.log(`   URL: http://localhost:9000/`);
      return true;
    } else {
      console.log('❌ Server is not running on port 9000');
      return false;
    }
  });
}

// Main CLI
const command = process.argv[2] || 'status';

switch (command) {
  case 'start':
    startServer().catch(console.error);
    break;
  case 'stop':
    stopServer().catch(console.error);
    break;
  case 'restart':
    restartServer().catch(console.error);
    break;
  case 'status':
  default:
    checkStatus().catch(console.error);
    break;
}

module.exports = { startServer, stopServer, restartServer, checkStatus, getServerPID };
