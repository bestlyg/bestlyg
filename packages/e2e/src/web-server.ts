import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { setTimeout as delay } from 'node:timers/promises';
import { getProjectConfig, loadConfig } from './config';
import { PACKAGE_ROOT } from './paths';

export default async function setup() {
    const root = await loadConfig();
    const project = getProjectConfig(root, process.env.BESTLYG_E2E_PROJECT ?? 'bestlyg');
    const config = project.webServer ?? root.webServer;
    if (!config) return;
    const isReady = async () => {
        try {
            return (await fetch(config.url, { signal: AbortSignal.timeout(1_000) })).ok;
        } catch {
            return false;
        }
    };
    if (await isReady()) {
        if (config.reuseExistingServer) return;
        throw new Error(`E2E web server already listening at ${config.url}`);
    }
    let output = '';
    const child = spawn(config.command, {
        shell: true,
        cwd: PACKAGE_ROOT,
        env: process.env,
        detached: process.platform !== 'win32',
        stdio: ['ignore', 'pipe', 'pipe'],
    });
    for (const stream of [child.stdout, child.stderr])
        stream.on('data', (chunk) => {
            output = (output + chunk).slice(-5_000);
        });
    const stop = async () => {
        if (child.exitCode !== null || child.signalCode !== null) return;
        const exited = once(child, 'exit');
        if (process.platform === 'win32') child.kill();
        else process.kill(-child.pid!, 'SIGTERM');
        const timeout = setTimeout(() => {
            if (process.platform === 'win32') child.kill('SIGKILL');
            else {
                try {
                    process.kill(-child.pid!, 'SIGKILL');
                } catch {}
            }
        }, 5_000);
        try {
            await exited;
        } finally {
            clearTimeout(timeout);
        }
    };
    try {
        const deadline = Date.now() + (config.timeout ?? 120_000);
        while (!(await isReady())) {
            if (child.exitCode !== null || child.signalCode !== null || Date.now() > deadline)
                throw new Error(`E2E web server failed: ${output}`);
            await delay(200);
        }
    } catch (error) {
        await stop();
        throw error;
    }
    return stop;
}
