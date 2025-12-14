#!/bin/bash
# Start a local server for the Jeton clone
# Run this script from the jeton-site folder

echo "Starting Jeton clone server at http://localhost:9000"
echo "Press Ctrl+C to stop"
echo ""
echo "Note: Using Node.js proxy server for Rive file interception"
echo ""

# Check if port is already in use
if lsof -Pi :9000 -sTCP:LISTEN -t >/dev/null ; then
    echo "Port 9000 is already in use. Please stop the existing server first."
    exit 1
fi

# Use Node.js proxy server (supports Rive interception)
node proxy-server.js

