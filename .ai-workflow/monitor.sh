#!/bin/bash
# ============================================================================
# AI Workflow Monitor
# Displays live workflow status in terminal
# ============================================================================

PROJECT_DIR="$1"
WORKFLOW_DIR="$PROJECT_DIR/.ai-workflow"
MONITOR_FILE="$WORKFLOW_DIR/monitor-output.txt"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

# Clear screen and show header
clear
echo -e "${CYAN}"
echo "╔══════════════════════════════════════════════════════════════════════════════╗"
echo "║                     🖥️  AI WORKFLOW MONITOR                                  ║"
echo "║                     Watching: $(basename "$PROJECT_DIR")                     "
echo "╚══════════════════════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""
echo "Waiting for orchestrator to start..."
echo ""

# Wait for monitor file to exist
while [ ! -f "$MONITOR_FILE" ]; do
    sleep 1
done

# Main display loop
while true; do
    clear
    
    # Show current time
    echo -e "${WHITE}Last Update: $(date '+%Y-%m-%d %H:%M:%S')${NC}"
    echo ""
    
    # Show monitor output
    if [ -f "$MONITOR_FILE" ]; then
        cat "$MONITOR_FILE"
    else
        echo "Waiting for orchestrator..."
    fi
    
    echo ""
    echo -e "${YELLOW}─────────────────────────────────────────────────────────────────────────────────${NC}"
    echo ""
    
    # Show recent test results if they exist
    TEST_RESULTS="$WORKFLOW_DIR/test-results.md"
    if [ -f "$TEST_RESULTS" ]; then
        echo -e "${PURPLE}📋 RECENT TEST RESULTS:${NC}"
        echo ""
        tail -n 20 "$TEST_RESULTS" 2>/dev/null
    fi
    
    echo ""
    echo -e "${CYAN}─────────────────────────────────────────────────────────────────────────────────${NC}"
    echo -e "${WHITE}Press Ctrl+C to exit monitor${NC}"
    
    sleep 2
done
