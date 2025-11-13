#!/usr/bin/env node

const { execSync } = require('child_process');
const os = require('os');

const args = process.argv.slice(2);
const killFlag = args.includes('--kill') || args.includes('-k');
const port = args.find(arg => !arg.startsWith('-'));

if (!port || isNaN(port)) {
  console.log('❌ Usage: npx whatsport <port> [--kill|-k]');
  console.log('   Example: npx whatsport 3000');
  console.log('   Example: npx whatsport 3000 --kill');
  process.exit(1);
}

console.log(`🔍 Checking port ${port}...\n`);

try {
  const platform = os.platform();
  let command;
  
  if (platform === 'win32') {
    command = `netstat -ano | findstr :${port}`;
  } else {
    command = `lsof -i :${port} -t`;
  }

  const output = execSync(command, { encoding: 'utf8' }).trim();
  
  if (!output) {
    console.log(`✅ Port ${port} is free!`);
    process.exit(0);
  }

  let pid;
  if (platform === 'win32') {
    const lines = output.split('\n');
    const match = lines[0].match(/\s+(\d+)\s*$/);
    pid = match ? match[1] : null;
  } else {
    pid = output.split('\n')[0];
  }

  if (!pid) {
    console.log(`⚠️  Could not determine PID for port ${port}`);
    process.exit(1);
  }

  // Get process details
  let processInfo;
  try {
    if (platform === 'win32') {
      processInfo = execSync(`tasklist /FI "PID eq ${pid}" /FO CSV /NH`, { encoding: 'utf8' });
    } else {
      processInfo = execSync(`ps -p ${pid} -o command=`, { encoding: 'utf8' }).trim();
    }
  } catch (e) {
    processInfo = 'Unknown process';
  }

  console.log(`🔍 PID ${pid} → ${processInfo}`);
  
  // Try to get working directory (Unix-like systems only)
  if (platform !== 'win32') {
    try {
      const cwd = execSync(`lsof -p ${pid} | grep cwd | awk '{print $9}'`, { encoding: 'utf8' }).trim();
      if (cwd) {
        console.log(`📁 Path: ${cwd}`);
      }
    } catch (e) {
      // Ignore if we can't get the path
    }
  }

  // Extract command name
  const commandName = processInfo.split(/[\s\/]/)[0] || 'unknown';
  console.log(`🧩 Command: ${commandName}`);
  
  if (killFlag) {
    console.log(`\n💀 Killing process ${pid}...`);
    try {
      if (platform === 'win32') {
        execSync(`taskkill /PID ${pid} /F`, { encoding: 'utf8' });
      } else {
        execSync(`kill -9 ${pid}`, { encoding: 'utf8' });
      }
      console.log(`✅ Process ${pid} killed successfully!`);
      console.log(`🎉 Port ${port} is now free!`);
    } catch (killError) {
      console.log(`❌ Failed to kill process: ${killError.message}`);
      process.exit(1);
    }
  } else {
    console.log(`\n✅ Suggestion: ${platform === 'win32' ? `taskkill /PID ${pid} /F` : `kill -9 ${pid}`}`);
    console.log(`💡 Or run: npx whatsport ${port} --kill`);
  }
  
} catch (error) {
  if (error.status === 1 && !error.stdout) {
    console.log(`✅ Port ${port} is free!`);
  } else {
    console.log(`❌ Error: ${error.message}`);
  }
  process.exit(0);
}
