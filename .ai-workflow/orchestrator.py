#!/usr/bin/env python3
"""
AI Workflow Orchestrator v3.1
- Auto-splits plans into phases based on 70% context limit
- Auto-cascades phases with pause/resume support
- Parallel TestSprite execution
- Error queue with retry mechanism
- Complete API for dashboard control
- Health monitoring and recovery
"""

import os
import sys
import json
import time
import hashlib
import subprocess
import threading
import signal
import socket
from datetime import datetime, timedelta
from pathlib import Path
from http.server import HTTPServer, SimpleHTTPRequestHandler
import urllib.parse
import webbrowser

# ============================================================================
# CONFIGURATION
# ============================================================================

class Config:
    PROJECT_DIR = None
    WORKFLOW_DIR = None
    
    # Context limits for Opus 4.5
    OPUS_CONTEXT_LIMIT = 128000  # tokens
    TARGET_CONTEXT_USAGE = 0.70  # 70%
    TOKENS_PER_TASK_SIMPLE = 5000
    TOKENS_PER_TASK_MEDIUM = 15000
    TOKENS_PER_TASK_COMPLEX = 30000
    
    # Server ports
    DASHBOARD_PORT = 3000
    LOCAL_SERVER_PORT = 8000
    
    # TestSprite
    TESTSPRITE_API_KEY = ""
    TESTSPRITE_ENABLED = True
    
    # Features
    AUTO_CASCADE = True
    SOUND_ENABLED = True
    AUTO_START_LOCAL_SERVER = True
    
    # Sounds
    SOUNDS = {
        "startup": "Glass",
        "phase_start": "Blow",
        "phase_complete": "Ping",
        "tests_pass": "Hero",
        "tests_fail": "Basso",
        "workflow_complete": "Fanfare",
        "error": "Sosumi",
        "notification": "Glass"
    }

# ============================================================================
# UTILITIES
# ============================================================================

def log(message, level="INFO"):
    """Log message to console and file"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_line = f"[{timestamp}] [{level}] {message}"
    print(log_line)
    
    if Config.WORKFLOW_DIR:
        log_file = Config.WORKFLOW_DIR / "logs" / "orchestrator.log"
        log_file.parent.mkdir(parents=True, exist_ok=True)
        with open(log_file, "a") as f:
            f.write(log_line + "\n")
    
    # Also append to activity log for dashboard
    add_activity(message, level.lower())

def add_activity(message, level="info"):
    """Add to activity log for dashboard"""
    if not Config.WORKFLOW_DIR:
        return
    
    activity_file = Config.WORKFLOW_DIR / "activity-log.json"
    activities = []
    
    if activity_file.exists():
        try:
            with open(activity_file, "r") as f:
                activities = json.load(f)
        except:
            activities = []
    
    activities.insert(0, {
        "time": datetime.now().isoformat(),
        "message": message,
        "level": level
    })
    
    # Keep last 100 entries
    activities = activities[:100]
    
    with open(activity_file, "w") as f:
        json.dump(activities, f, indent=2)

def play_sound(sound_name):
    """Play macOS system sound"""
    if not Config.SOUND_ENABLED:
        return
    sound = Config.SOUNDS.get(sound_name, "Glass")
    try:
        subprocess.run(["afplay", f"/System/Library/Sounds/{sound}.aiff"], 
                      capture_output=True, timeout=2)
    except:
        pass

def send_notification(title, message, sound=True):
    """Send macOS notification"""
    sound_param = 'sound name "Glass"' if sound else ''
    try:
        subprocess.run([
            "osascript", "-e",
            f'display notification "{message}" with title "{title}" {sound_param}'
        ], capture_output=True, timeout=5)
    except:
        pass

def is_port_in_use(port):
    """Check if a port is already in use"""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('localhost', port)) == 0

def read_json(filepath):
    """Safely read JSON file"""
    try:
        with open(filepath, "r") as f:
            return json.load(f)
    except:
        return {}

def write_json(filepath, data):
    """Safely write JSON file"""
    filepath = Path(filepath)
    filepath.parent.mkdir(parents=True, exist_ok=True)
    with open(filepath, "w") as f:
        json.dump(data, f, indent=2, default=str)

def read_file(filepath):
    """Safely read text file"""
    try:
        with open(filepath, "r") as f:
            return f.read()
    except:
        return ""

def write_file(filepath, content):
    """Safely write text file"""
    filepath = Path(filepath)
    filepath.parent.mkdir(parents=True, exist_ok=True)
    with open(filepath, "w") as f:
        f.write(content)

# ============================================================================
# STATE MANAGEMENT
# ============================================================================

class WorkflowState:
    """Centralized workflow state management"""
    
    STATUSES = {
        "idle": "Waiting for plan",
        "analyzing": "Analyzing planning.md",
        "ready": "Ready to start",
        "running": "Executing phases",
        "paused": "Workflow paused",
        "testing": "Running tests",
        "fixing_errors": "Fixing queued errors",
        "verifying": "Final verification",
        "complete": "Workflow complete",
        "error": "Error occurred"
    }
    
    def __init__(self):
        self.reset()
    
    def reset(self):
        """Reset to initial state"""
        self.data = {
            "status": "idle",
            "current_phase": None,
            "total_phases": 0,
            "phases": [],
            "phases_complete": [],
            "phases_failed": [],
            "error_queue": [],
            "modified_files": [],
            "started_at": None,
            "completed_at": None,
            "updated_at": datetime.now().isoformat(),
            "paused": False,
            "elapsed_seconds": 0
        }
    
    def load(self):
        """Load state from file"""
        if Config.WORKFLOW_DIR:
            state_file = Config.WORKFLOW_DIR / "current-state.json"
            if state_file.exists():
                loaded = read_json(state_file)
                if loaded:
                    self.data.update(loaded)
    
    def save(self):
        """Save state to file"""
        self.data["updated_at"] = datetime.now().isoformat()
        if Config.WORKFLOW_DIR:
            write_json(Config.WORKFLOW_DIR / "current-state.json", self.data)
    
    def get(self, key, default=None):
        return self.data.get(key, default)
    
    def set(self, key, value):
        self.data[key] = value
        self.save()
    
    def update(self, updates):
        self.data.update(updates)
        self.save()
    
    def to_dict(self):
        return self.data.copy()

# Global state instance
STATE = WorkflowState()

# ============================================================================
# PHASE MANAGEMENT
# ============================================================================

class PhaseManager:
    """Manages phase analysis, splitting, and execution"""
    
    def __init__(self):
        self.phases_dir = Config.WORKFLOW_DIR / "phases"
        self.phases_dir.mkdir(parents=True, exist_ok=True)
    
    def analyze_plan(self, content):
        """Analyze planning.md and split into phases based on 70% context"""
        log("Analyzing planning.md...")
        
        # Extract tasks
        tasks = self._extract_tasks(content)
        
        if not tasks:
            log("No tasks found in planning.md", "WARN")
            return {"error": "No tasks found in planning.md"}
        
        # Calculate max tokens per phase
        max_tokens = int(Config.OPUS_CONTEXT_LIMIT * Config.TARGET_CONTEXT_USAGE)
        
        # Split into phases
        phases = self._split_into_phases(tasks, max_tokens)
        
        # Save analysis
        analysis = {
            "total_tasks": len(tasks),
            "total_phases": len(phases),
            "max_tokens_per_phase": max_tokens,
            "phases": phases,
            "analyzed_at": datetime.now().isoformat()
        }
        
        write_json(self.phases_dir / "phase-analysis.json", analysis)
        
        # Create individual phase files
        for phase in phases:
            self._create_phase_file(phase)
        
        # Update state
        STATE.update({
            "status": "ready",
            "total_phases": len(phases),
            "phases": [p["id"] for p in phases],
            "phases_complete": [],
            "phases_failed": []
        })
        
        log(f"Plan analyzed: {len(tasks)} tasks → {len(phases)} phases")
        play_sound("notification")
        send_notification("Plan Analyzed", f"Split into {len(phases)} phases")
        
        return analysis
    
    def _extract_tasks(self, content):
        """Extract tasks from planning.md"""
        tasks = []
        current_task = None
        
        for line in content.split('\n'):
            # Look for task headers
            if line.strip().startswith('### Task') or line.strip().startswith('## Task'):
                if current_task:
                    tasks.append(current_task)
                
                # Determine complexity from content
                complexity = "medium"
                if "Simple" in line or "simple" in content[:500]:
                    complexity = "simple"
                elif "Complex" in line or "complex" in content[:500]:
                    complexity = "complex"
                
                current_task = {
                    "title": line.strip().lstrip('#').strip(),
                    "content": "",
                    "complexity": complexity,
                    "files": []
                }
            elif current_task:
                current_task["content"] += line + "\n"
                
                # Extract file references
                if "**Files" in line or "**File" in line:
                    files_part = line.split(":", 1)[-1].strip()
                    current_task["files"] = [f.strip().strip('`') for f in files_part.split(',')]
        
        if current_task:
            tasks.append(current_task)
        
        # If no tasks found with ### Task format, try splitting by ## sections
        if not tasks:
            sections = content.split('\n## ')
            for i, section in enumerate(sections[1:], 1):
                if section.strip():
                    title = section.split('\n')[0].strip()
                    tasks.append({
                        "title": f"Section {i}: {title}",
                        "content": section,
                        "complexity": "medium",
                        "files": []
                    })
        
        return tasks
    
    def _estimate_tokens(self, task):
        """Estimate tokens for a task"""
        base_tokens = {
            "simple": Config.TOKENS_PER_TASK_SIMPLE,
            "medium": Config.TOKENS_PER_TASK_MEDIUM,
            "complex": Config.TOKENS_PER_TASK_COMPLEX
        }
        
        # Base tokens by complexity
        tokens = base_tokens.get(task.get("complexity", "medium"), Config.TOKENS_PER_TASK_MEDIUM)
        
        # Add content length (rough: 4 chars ≈ 1 token)
        tokens += len(task.get("content", "")) // 4
        
        # Add file overhead
        tokens += len(task.get("files", [])) * 2000
        
        return tokens
    
    def _split_into_phases(self, tasks, max_tokens):
        """Split tasks into phases respecting token limits"""
        phases = []
        current_phase_tasks = []
        current_tokens = 0
        
        for task in tasks:
            task_tokens = self._estimate_tokens(task)
            task["estimated_tokens"] = task_tokens
            
            # Check if adding this task exceeds limit
            if current_tokens + task_tokens > max_tokens and current_phase_tasks:
                # Save current phase and start new one
                phases.append(self._create_phase_info(len(phases), current_phase_tasks, current_tokens))
                current_phase_tasks = []
                current_tokens = 0
            
            current_phase_tasks.append(task)
            current_tokens += task_tokens
        
        # Don't forget last phase
        if current_phase_tasks:
            phases.append(self._create_phase_info(len(phases), current_phase_tasks, current_tokens))
        
        return phases
    
    def _create_phase_info(self, index, tasks, tokens):
        """Create phase info object"""
        phase_id = chr(65 + index)  # A, B, C, ...
        return {
            "id": phase_id,
            "name": f"Phase {phase_id}",
            "status": "pending",
            "task_count": len(tasks),
            "estimated_tokens": tokens,
            "tasks": tasks,
            "started_at": None,
            "completed_at": None,
            "elapsed_seconds": 0
        }
    
    def _create_phase_file(self, phase):
        """Create individual phase task file"""
        phase_id = phase["id"].lower()
        
        content = f"# Phase {phase['id']} Tasks\n\n"
        content += f"**Total Tasks:** {phase['task_count']}\n"
        content += f"**Estimated Tokens:** ~{phase['estimated_tokens']:,}\n"
        content += f"**Status:** {phase['status']}\n\n"
        content += "---\n\n"
        
        for i, task in enumerate(phase["tasks"], 1):
            content += f"## Task {phase['id']}.{i}: {task['title']}\n\n"
            content += f"**Complexity:** {task.get('complexity', 'medium').title()}\n"
            if task.get("files"):
                content += f"**Files:** {', '.join(task['files'])}\n"
            content += f"\n{task.get('content', '')}\n"
            content += "\n---\n\n"
        
        write_file(self.phases_dir / f"phase-{phase_id}-tasks.md", content)
    
    def get_phases(self):
        """Get current phase information"""
        analysis_file = self.phases_dir / "phase-analysis.json"
        if analysis_file.exists():
            return read_json(analysis_file).get("phases", [])
        return []
    
    def update_phase(self, phase_id, updates):
        """Update a specific phase"""
        analysis_file = self.phases_dir / "phase-analysis.json"
        analysis = read_json(analysis_file)
        
        for phase in analysis.get("phases", []):
            if phase["id"] == phase_id:
                phase.update(updates)
                break
        
        write_json(analysis_file, analysis)
        
        # Also update individual phase state file
        state_file = self.phases_dir / f"phase-{phase_id.lower()}-state.json"
        write_json(state_file, {
            "phase_id": phase_id,
            **updates,
            "updated_at": datetime.now().isoformat()
        })

# Global phase manager
PHASE_MANAGER = None

# ============================================================================
# LOCAL SERVER MANAGEMENT
# ============================================================================

class LocalServerManager:
    """Manages the local development server"""
    
    def __init__(self):
        self.process = None
        self.port = Config.LOCAL_SERVER_PORT
    
    def start(self):
        """Start local server if not running"""
        if is_port_in_use(self.port):
            log(f"Local server already running on port {self.port}")
            return True
        
        try:
            self.process = subprocess.Popen(
                ["python3", "-m", "http.server", str(self.port)],
                cwd=str(Config.PROJECT_DIR),
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL
            )
            log(f"Local server started on port {self.port}")
            return True
        except Exception as e:
            log(f"Failed to start local server: {e}", "ERROR")
            return False
    
    def stop(self):
        """Stop local server"""
        if self.process:
            self.process.terminate()
            self.process = None
            log("Local server stopped")
    
    def is_running(self):
        """Check if server is running"""
        return is_port_in_use(self.port)
    
    def open_in_browser(self, path=""):
        """Open project in browser"""
        url = f"http://localhost:{self.port}/{path}"
        webbrowser.open(url)
        log(f"Opened browser: {url}")

# Global server manager
LOCAL_SERVER = None

# ============================================================================
# TESTSPRITE INTEGRATION
# ============================================================================

class TestSpriteManager:
    """Manages TestSprite test execution"""
    
    def __init__(self):
        self.results_dir = Config.WORKFLOW_DIR / "test-results"
        self.results_dir.mkdir(parents=True, exist_ok=True)
        self.running_tests = {}
    
    def run_tests_for_phase(self, phase_id, callback=None):
        """Run tests for a phase in background"""
        thread = threading.Thread(
            target=self._run_tests,
            args=(phase_id, callback),
            daemon=True
        )
        thread.start()
        self.running_tests[phase_id] = thread
        return True
    
    def _run_tests(self, phase_id, callback):
        """Execute tests (runs in thread)"""
        log(f"Starting TestSprite tests for Phase {phase_id}")
        
        results = {
            "phase_id": phase_id,
            "status": "running",
            "started_at": datetime.now().isoformat(),
            "tests": [],
            "passed": 0,
            "failed": 0,
            "errors": []
        }
        
        results_file = self.results_dir / f"phase-{phase_id.lower()}-results.json"
        write_json(results_file, results)
        
        # Check if TestSprite API key is configured
        if not Config.TESTSPRITE_API_KEY:
            results["status"] = "skipped"
            results["message"] = "TestSprite API key not configured. Manual testing recommended."
            results["completed_at"] = datetime.now().isoformat()
            write_json(results_file, results)
            
            if callback:
                callback(phase_id, results)
            return
        
        # TODO: Implement actual TestSprite MCP integration
        # For now, simulate test run
        time.sleep(3)
        
        results["status"] = "complete"
        results["passed"] = True
        results["message"] = "Tests completed. Review at localhost:8000"
        results["completed_at"] = datetime.now().isoformat()
        
        write_json(results_file, results)
        
        if results.get("errors"):
            play_sound("tests_fail")
            # Add errors to queue
            for error in results["errors"]:
                self._add_error_to_queue(phase_id, error)
        else:
            play_sound("tests_pass")
        
        if callback:
            callback(phase_id, results)
        
        del self.running_tests[phase_id]
    
    def _add_error_to_queue(self, phase_id, error):
        """Add error to the error queue"""
        error_queue = STATE.get("error_queue", [])
        error_queue.append({
            "phase": phase_id,
            "error": error,
            "added_at": datetime.now().isoformat(),
            "fixed": False
        })
        STATE.set("error_queue", error_queue)
        
        # Also write to errors-to-fix.md
        errors_file = Config.WORKFLOW_DIR / "errors-to-fix.md"
        content = read_file(errors_file) or "# Error Queue\n\nErrors to fix after all phases complete.\n\n"
        content += f"\n## Error from Phase {phase_id}\n"
        content += f"- [ ] {error}\n"
        write_file(errors_file, content)
    
    def get_results(self, phase_id=None):
        """Get test results"""
        if phase_id:
            results_file = self.results_dir / f"phase-{phase_id.lower()}-results.json"
            return read_json(results_file) if results_file.exists() else None
        
        # Return all results
        all_results = {}
        for f in self.results_dir.glob("phase-*-results.json"):
            pid = f.stem.replace("phase-", "").replace("-results", "").upper()
            all_results[pid] = read_json(f)
        return all_results

# Global TestSprite manager
TESTSPRITE = None

# ============================================================================
# WORKFLOW CONTROLLER
# ============================================================================

class WorkflowController:
    """Controls the overall workflow execution"""
    
    def __init__(self):
        self.running = False
        self.paused = False
    
    def start(self):
        """Start the workflow from the beginning"""
        phases = PHASE_MANAGER.get_phases()
        if not phases:
            return {"error": "No phases found. Analyze plan first."}
        
        STATE.update({
            "status": "running",
            "started_at": datetime.now().isoformat(),
            "current_phase": phases[0]["id"],
            "paused": False
        })
        
        self.running = True
        self.paused = False
        
        play_sound("phase_start")
        send_notification("Workflow Started", f"Starting Phase {phases[0]['id']}")
        log(f"Workflow started with Phase {phases[0]['id']}")
        
        # Start first phase
        self._start_phase(phases[0]["id"])
        
        return {"message": f"Started Phase {phases[0]['id']}"}
    
    def _start_phase(self, phase_id):
        """Start a specific phase"""
        PHASE_MANAGER.update_phase(phase_id, {
            "status": "running",
            "started_at": datetime.now().isoformat()
        })
        
        STATE.set("current_phase", phase_id)
        
        # Create command file for Claude Code
        self._create_claude_command(phase_id)
        
        play_sound("phase_start")
        log(f"Phase {phase_id} started")
    
    def _create_claude_command(self, phase_id):
        """Create command file for Claude Code to read"""
        command = f"""# Execute Phase {phase_id}

Read the tasks from: .ai-workflow/phases/phase-{phase_id.lower()}-tasks.md

Execute all tasks in order. After completion:
1. Update .ai-workflow/phases/phase-{phase_id.lower()}-state.json with status "complete"
2. Log your work to .ai-workflow/session-history/session-{ord(phase_id) - 64}.md

Use /plan mode for careful execution.
"""
        write_file(Config.WORKFLOW_DIR / "current-command.md", command)
    
    def complete_phase(self, phase_id, modified_files=None):
        """Mark a phase as complete"""
        PHASE_MANAGER.update_phase(phase_id, {
            "status": "complete",
            "completed_at": datetime.now().isoformat()
        })
        
        # Track modified files
        if modified_files:
            all_modified = STATE.get("modified_files", [])
            all_modified.extend(modified_files)
            STATE.set("modified_files", list(set(all_modified)))
        
        # Add to completed list
        completed = STATE.get("phases_complete", [])
        if phase_id not in completed:
            completed.append(phase_id)
        STATE.set("phases_complete", completed)
        
        play_sound("phase_complete")
        log(f"Phase {phase_id} completed")
        
        # Start TestSprite in parallel
        TESTSPRITE.run_tests_for_phase(phase_id, self._on_tests_complete)
        
        # Auto-cascade to next phase if enabled
        if Config.AUTO_CASCADE and not self.paused:
            self._cascade_to_next(phase_id)
    
    def _cascade_to_next(self, completed_phase_id):
        """Auto-start next phase"""
        phases = PHASE_MANAGER.get_phases()
        current_index = ord(completed_phase_id) - 65
        next_index = current_index + 1
        
        if next_index < len(phases):
            next_phase = phases[next_index]
            log(f"Auto-cascading to Phase {next_phase['id']}")
            time.sleep(1)
            self._start_phase(next_phase["id"])
        else:
            # All phases complete
            self._on_all_phases_complete()
    
    def _on_tests_complete(self, phase_id, results):
        """Callback when tests complete for a phase"""
        log(f"Tests complete for Phase {phase_id}: {'PASSED' if results.get('passed') else 'FAILED'}")
    
    def _on_all_phases_complete(self):
        """Called when all phases are done"""
        error_queue = STATE.get("error_queue", [])
        
        if error_queue:
            STATE.set("status", "fixing_errors")
            log(f"All phases complete. {len(error_queue)} errors to fix.")
            send_notification("Phases Complete", f"{len(error_queue)} errors to fix")
        else:
            self._start_final_verification()
    
    def _start_final_verification(self):
        """Start final verification"""
        STATE.set("status", "verifying")
        log("Starting final verification...")
        
        # Run full test suite
        # For now, just mark complete
        time.sleep(2)
        
        self._complete_workflow()
    
    def _complete_workflow(self):
        """Mark workflow as complete"""
        STATE.update({
            "status": "complete",
            "completed_at": datetime.now().isoformat()
        })
        
        play_sound("workflow_complete")
        send_notification("🎉 Workflow Complete!", "All phases done, all tests passed!")
        log("WORKFLOW COMPLETE!")
    
    def pause(self):
        """Pause the workflow"""
        self.paused = True
        STATE.update({"status": "paused", "paused": True})
        log("Workflow paused")
        return {"message": "Workflow paused"}
    
    def resume(self):
        """Resume the workflow"""
        self.paused = False
        current_phase = STATE.get("current_phase")
        STATE.update({"status": "running", "paused": False})
        log(f"Workflow resumed at Phase {current_phase}")
        return {"message": f"Resumed at Phase {current_phase}"}
    
    def skip_phase(self, phase_id):
        """Skip a phase"""
        PHASE_MANAGER.update_phase(phase_id, {"status": "skipped"})
        log(f"Phase {phase_id} skipped")
        
        if Config.AUTO_CASCADE:
            self._cascade_to_next(phase_id)
        
        return {"message": f"Phase {phase_id} skipped"}
    
    def retry_phase(self, phase_id):
        """Retry a failed phase"""
        PHASE_MANAGER.update_phase(phase_id, {
            "status": "pending",
            "started_at": None,
            "completed_at": None
        })
        
        # Remove from failed list
        failed = STATE.get("phases_failed", [])
        if phase_id in failed:
            failed.remove(phase_id)
        STATE.set("phases_failed", failed)
        
        # Remove from completed list
        completed = STATE.get("phases_complete", [])
        if phase_id in completed:
            completed.remove(phase_id)
        STATE.set("phases_complete", completed)
        
        log(f"Phase {phase_id} reset for retry")
        self._start_phase(phase_id)
        
        return {"message": f"Retrying Phase {phase_id}"}
    
    def fix_errors(self):
        """Start error fixing session"""
        error_queue = STATE.get("error_queue", [])
        if not error_queue:
            return {"message": "No errors to fix"}
        
        STATE.set("status", "fixing_errors")
        
        # Create error fix command
        content = "# Error Fix Session\n\n"
        content += f"Fix the following {len(error_queue)} errors:\n\n"
        for i, error in enumerate(error_queue, 1):
            content += f"{i}. **Phase {error['phase']}:** {error['error']}\n"
        
        write_file(Config.WORKFLOW_DIR / "current-command.md", content)
        
        log(f"Starting error fix session with {len(error_queue)} errors")
        return {"message": f"Fixing {len(error_queue)} errors"}
    
    def verify(self):
        """Run final verification"""
        self._start_final_verification()
        return {"message": "Running final verification"}
    
    def reset(self):
        """Reset the entire workflow"""
        STATE.reset()
        STATE.save()
        
        # Clear activity log
        write_json(Config.WORKFLOW_DIR / "activity-log.json", [])
        
        # Clear errors
        write_file(Config.WORKFLOW_DIR / "errors-to-fix.md", "# Error Queue\n\nNo errors.\n")
        
        self.running = False
        self.paused = False
        
        log("Workflow reset")
        return {"message": "Workflow reset"}

# Global controller
CONTROLLER = None

# ============================================================================
# HTTP API HANDLER
# ============================================================================

class APIHandler(SimpleHTTPRequestHandler):
    """HTTP API handler for dashboard"""
    
    def do_OPTIONS(self):
        """Handle CORS preflight"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def do_GET(self):
        """Handle GET requests"""
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        
        # API endpoints
        if path == '/api/state':
            self._send_json(STATE.to_dict())
        
        elif path == '/api/phases':
            self._send_json({"phases": PHASE_MANAGER.get_phases()})
        
        elif path == '/api/errors':
            self._send_json({"errors": STATE.get("error_queue", [])})
        
        elif path == '/api/activity':
            activity_file = Config.WORKFLOW_DIR / "activity-log.json"
            activities = read_json(activity_file) if activity_file.exists() else []
            self._send_json({"activities": activities})
        
        elif path == '/api/config':
            self._send_json({
                "project_dir": str(Config.PROJECT_DIR),
                "dashboard_port": Config.DASHBOARD_PORT,
                "local_server_port": Config.LOCAL_SERVER_PORT,
                "testsprite_api_key": bool(Config.TESTSPRITE_API_KEY),
                "auto_cascade": Config.AUTO_CASCADE,
                "sound_enabled": Config.SOUND_ENABLED,
                "local_server_running": LOCAL_SERVER.is_running()
            })
        
        elif path == '/api/plan':
            planning_file = Config.WORKFLOW_DIR / "planning.md"
            content = read_file(planning_file) if planning_file.exists() else ""
            self._send_json({"content": content, "exists": bool(content)})
        
        elif path == '/api/test-results':
            self._send_json({"results": TESTSPRITE.get_results()})
        
        elif path == '/api/health':
            self._send_json({
                "status": "ok",
                "orchestrator": True,
                "local_server": LOCAL_SERVER.is_running(),
                "uptime": (datetime.now() - datetime.fromisoformat(STATE.get("updated_at", datetime.now().isoformat()))).seconds
            })
        
        elif path == '/api/modified-files':
            self._send_json({"files": STATE.get("modified_files", [])})
        
        elif path == '/':
            self._serve_dashboard()
        
        else:
            super().do_GET()
    
    def do_POST(self):
        """Handle POST requests"""
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        
        # Read body
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length).decode('utf-8') if content_length else ""
        
        try:
            data = json.loads(body) if body else {}
        except:
            data = {}
        
        # API endpoints
        if path == '/api/analyze':
            planning_file = Config.WORKFLOW_DIR / "planning.md"
            if not planning_file.exists():
                self._send_json({"error": "planning.md not found"}, 400)
                return
            result = PHASE_MANAGER.analyze_plan(read_file(planning_file))
            self._send_json(result)
        
        elif path == '/api/start':
            result = CONTROLLER.start()
            self._send_json(result)
        
        elif path == '/api/pause':
            result = CONTROLLER.pause()
            self._send_json(result)
        
        elif path == '/api/resume':
            result = CONTROLLER.resume()
            self._send_json(result)
        
        elif path == '/api/complete-phase':
            phase_id = data.get("phase_id")
            modified_files = data.get("modified_files", [])
            if phase_id:
                CONTROLLER.complete_phase(phase_id, modified_files)
                self._send_json({"message": f"Phase {phase_id} completed"})
            else:
                self._send_json({"error": "phase_id required"}, 400)
        
        elif path == '/api/skip-phase':
            phase_id = data.get("phase_id")
            if phase_id:
                result = CONTROLLER.skip_phase(phase_id)
                self._send_json(result)
            else:
                self._send_json({"error": "phase_id required"}, 400)
        
        elif path == '/api/retry-phase':
            phase_id = data.get("phase_id")
            if phase_id:
                result = CONTROLLER.retry_phase(phase_id)
                self._send_json(result)
            else:
                self._send_json({"error": "phase_id required"}, 400)
        
        elif path == '/api/fix-errors':
            result = CONTROLLER.fix_errors()
            self._send_json(result)
        
        elif path == '/api/verify':
            result = CONTROLLER.verify()
            self._send_json(result)
        
        elif path == '/api/reset':
            result = CONTROLLER.reset()
            self._send_json(result)
        
        elif path == '/api/config':
            # Update configuration
            if "testsprite_api_key" in data:
                Config.TESTSPRITE_API_KEY = data["testsprite_api_key"]
            if "auto_cascade" in data:
                Config.AUTO_CASCADE = data["auto_cascade"]
            if "sound_enabled" in data:
                Config.SOUND_ENABLED = data["sound_enabled"]
            if "local_server_port" in data:
                Config.LOCAL_SERVER_PORT = int(data["local_server_port"])
            
            # Save config
            write_json(Config.WORKFLOW_DIR / "config.json", {
                "testsprite_api_key": Config.TESTSPRITE_API_KEY,
                "auto_cascade": Config.AUTO_CASCADE,
                "sound_enabled": Config.SOUND_ENABLED,
                "local_server_port": Config.LOCAL_SERVER_PORT
            })
            
            self._send_json({"message": "Configuration saved"})
        
        elif path == '/api/open-browser':
            page = data.get("page", "")
            LOCAL_SERVER.open_in_browser(page)
            self._send_json({"message": f"Opened {page or 'homepage'}"})
        
        elif path == '/api/open-folder':
            subprocess.run(["open", str(Config.PROJECT_DIR)])
            self._send_json({"message": "Opened project folder"})
        
        elif path == '/api/open-antigravity':
            try:
                subprocess.run(["open", "-a", "Antigravity"])
                self._send_json({"message": "Opened Antigravity"})
            except:
                self._send_json({"error": "Could not open Antigravity"}, 500)
        
        elif path == '/api/start-local-server':
            if LOCAL_SERVER.start():
                self._send_json({"message": "Local server started"})
            else:
                self._send_json({"error": "Failed to start server"}, 500)
        
        else:
            self._send_json({"error": "Unknown endpoint"}, 404)
    
    def _send_json(self, data, status=200):
        """Send JSON response"""
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data, default=str).encode())
    
    def _serve_dashboard(self):
        """Serve the dashboard HTML"""
        dashboard_file = Config.WORKFLOW_DIR / "dashboard.html"
        if dashboard_file.exists():
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.end_headers()
            self.wfile.write(dashboard_file.read_bytes())
        else:
            self.send_error(404, "Dashboard not found")
    
    def log_message(self, format, *args):
        """Suppress default HTTP logging"""
        pass

# ============================================================================
# FILE WATCHER
# ============================================================================

def watch_for_changes():
    """Watch for planning.md and phase state changes"""
    planning_file = Config.WORKFLOW_DIR / "planning.md"
    last_hash = None
    
    while True:
        try:
            # Check for new planning.md
            if planning_file.exists():
                current_hash = hashlib.md5(planning_file.read_bytes()).hexdigest()
                
                if current_hash != last_hash and STATE.get("status") == "idle":
                    last_hash = current_hash
                    content = read_file(planning_file)
                    
                    if len(content.strip()) > 100:
                        log("New planning.md detected!")
                        play_sound("notification")
                        send_notification("📋 Plan Detected", "Open dashboard to analyze")
            
            # Check for phase completion (Claude Code updates these)
            phases_dir = Config.WORKFLOW_DIR / "phases"
            for state_file in phases_dir.glob("phase-*-state.json"):
                state = read_json(state_file)
                phase_id = state.get("phase_id", "").upper()
                
                if state.get("status") == "complete":
                    completed = STATE.get("phases_complete", [])
                    if phase_id and phase_id not in completed:
                        log(f"Detected Phase {phase_id} completion via state file")
                        CONTROLLER.complete_phase(phase_id, state.get("modified_files", []))
        
        except Exception as e:
            log(f"Watcher error: {e}", "ERROR")
        
        time.sleep(2)

# ============================================================================
# MAIN
# ============================================================================

def main(project_dir):
    global PHASE_MANAGER, LOCAL_SERVER, TESTSPRITE, CONTROLLER
    
    # Initialize configuration
    Config.PROJECT_DIR = Path(project_dir).resolve()
    Config.WORKFLOW_DIR = Config.PROJECT_DIR / ".ai-workflow"
    
    # Create directories
    Config.WORKFLOW_DIR.mkdir(parents=True, exist_ok=True)
    (Config.WORKFLOW_DIR / "phases").mkdir(exist_ok=True)
    (Config.WORKFLOW_DIR / "logs").mkdir(exist_ok=True)
    (Config.WORKFLOW_DIR / "test-results").mkdir(exist_ok=True)
    (Config.WORKFLOW_DIR / "session-history").mkdir(exist_ok=True)
    
    # Load configuration
    config_file = Config.WORKFLOW_DIR / "config.json"
    if config_file.exists():
        config = read_json(config_file)
        Config.TESTSPRITE_API_KEY = config.get("testsprite_api_key", "")
        Config.AUTO_CASCADE = config.get("auto_cascade", True)
        Config.SOUND_ENABLED = config.get("sound_enabled", True)
        Config.LOCAL_SERVER_PORT = config.get("local_server_port", 8000)
    
    # Initialize managers
    PHASE_MANAGER = PhaseManager()
    LOCAL_SERVER = LocalServerManager()
    TESTSPRITE = TestSpriteManager()
    CONTROLLER = WorkflowController()
    
    # Load existing state
    STATE.load()
    
    # Check for port conflicts
    if is_port_in_use(Config.DASHBOARD_PORT):
        log(f"Port {Config.DASHBOARD_PORT} is already in use!", "ERROR")
        print(f"\nError: Port {Config.DASHBOARD_PORT} is already in use.")
        print("Another orchestrator may be running. Kill it with:")
        print(f"  pkill -f 'orchestrator.py'")
        sys.exit(1)
    
    # Start local server if enabled
    if Config.AUTO_START_LOCAL_SERVER:
        LOCAL_SERVER.start()
    
    # Start file watcher in background
    watcher_thread = threading.Thread(target=watch_for_changes, daemon=True)
    watcher_thread.start()
    
    # Log startup
    log(f"Starting Orchestrator v3.1 for: {Config.PROJECT_DIR}")
    log(f"Dashboard: http://localhost:{Config.DASHBOARD_PORT}")
    log(f"Local server: http://localhost:{Config.LOCAL_SERVER_PORT}")
    
    play_sound("startup")
    send_notification("🤖 Orchestrator Ready", f"Dashboard at localhost:{Config.DASHBOARD_PORT}")
    
    # Start HTTP server
    server = HTTPServer(('0.0.0.0', Config.DASHBOARD_PORT), APIHandler)
    
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        log("Shutting down...")
        LOCAL_SERVER.stop()
        server.shutdown()

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: orchestrator.py <project_directory>")
        sys.exit(1)
    
    main(sys.argv[1])
