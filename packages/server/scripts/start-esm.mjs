#!/usr/bin/env node
import { spawn } from 'node:child_process';

// Nest CLI 12 launches an extensionless path even when Rspack emits .mjs.
// Preserve Node flags (--inspect, --env-file, source maps) and app arguments.
const args = process.argv.slice(2);
const entryIndex = args.findIndex((arg) => !arg.startsWith('-'));
if (entryIndex < 0) throw new Error('Nest did not supply a server entry path');
if (!args[entryIndex].endsWith('.mjs')) args[entryIndex] += '.mjs';
const child = spawn(process.execPath, args, { stdio: 'inherit' });
child.on('error', (error) => {
    console.error(error);
    process.exitCode = 1;
});
for (const signal of ['SIGTERM', 'SIGINT']) {
    process.on(signal, () => child.kill(signal));
}
child.on('exit', (code, signal) => {
    if (signal) {
        process.removeAllListeners(signal);
        process.kill(process.pid, signal);
    } else {
        process.exitCode = code ?? 1;
    }
});
