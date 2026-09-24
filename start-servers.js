/**
 * Unified Process Manager for Padārtha Ontology MERN Stack
 * Authors: Aman Yadav (Roll No: 68), Tanish Gupta (Roll No: 17)
 * Starts both Backend (Port 5000) and Frontend (Port 3000)
 */

const { spawn } = require('child_process');
const path = require('path');

const backendDir = path.join(__dirname, 'backend');
const frontendDir = path.join(__dirname, 'frontend');

console.log('================================================================');
console.log('  STARTING PADĀRTHA ONTOLOGY (NYĀYA) MERN APPLICATION');
console.log('  Department of Computer Science • Rizvi College');
console.log('================================================================\n');

// 1. Start Backend Server
const backend = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['start'], {
  cwd: backendDir,
  stdio: 'inherit',
  shell: true
});

// 2. Start Frontend Server
const frontend = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'dev'], {
  cwd: frontendDir,
  stdio: 'inherit',
  shell: true
});

backend.on('error', (err) => console.error('[Backend Error]:', err));
frontend.on('error', (err) => console.error('[Frontend Error]:', err));

process.on('SIGINT', () => {
  backend.kill();
  frontend.kill();
  process.exit();
});
