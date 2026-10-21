import assert from 'node:assert/strict';
import { execFileSync, spawn } from 'node:child_process';
import { once } from 'node:events';
import { mkdtemp, mkdir, rm, symlink, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';

export async function runDistSmoke(watchMode = false) {
    const serverRoot = fileURLToPath(new URL('../', import.meta.url));
    const require = createRequire(import.meta.url);
    const { JwtService } = require('@nestjs/jwt');
    const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'bestlyg-dist-'));
    const databaseDir = path.join(tempRoot, 'postgres');
    const pgCommand = (name) =>
        process.env.PG_BINDIR ? path.join(process.env.PG_BINDIR, name) : name;
    let databaseStarted = false;
    let child;
    let output = '';

    async function freePort() {
        const server = net.createServer();
        server.listen(0, '127.0.0.1');
        await once(server, 'listening');
        const { port } = server.address();
        await new Promise((resolve, reject) =>
            server.close((err) => (err ? reject(err) : resolve())),
        );
        return port;
    }

    function start(env, watch = false) {
        output = '';
        const args = watch
            ? [
                  path.join(
                      path.dirname(require.resolve('@nestjs/cli/package.json')),
                      'bin/nest.js',
                  ),
                  'start',
                  '--watch',
              ]
            : [path.join(serverRoot, 'dist/main.mjs')];
        child = spawn(process.execPath, args, {
            cwd: serverRoot,
            env,
            detached: process.platform !== 'win32',
            stdio: ['ignore', 'pipe', 'pipe'],
        });
        child.on('error', (err) => {
            output += err.stack;
        });
        for (const stream of [child.stdout, child.stderr]) {
            stream.on('data', (chunk) => {
                output = (output + chunk).slice(-30_000);
            });
        }
    }

    async function stop() {
        if (!child || child.exitCode !== null || child.signalCode !== null) return;
        const exited = once(child, 'exit');
        const kill = (signal) => {
            if (process.platform === 'win32') {
                execFileSync('taskkill', ['/PID', String(child.pid), '/T', '/F'], {
                    stdio: 'ignore',
                });
            } else {
                try {
                    process.kill(-child.pid, signal);
                } catch (error) {
                    if (error.code !== 'ESRCH') throw error;
                }
            }
        };
        kill('SIGTERM');
        const timeout = setTimeout(() => kill('SIGKILL'), 5_000);
        try {
            await exited;
        } finally {
            clearTimeout(timeout);
        }
    }

    try {
        const databasePort = await freePort();
        const port = await freePort();
        execFileSync(
            pgCommand('initdb'),
            ['-D', databaseDir, '-U', 'postgres', '-A', 'trust', '--no-locale'],
            { stdio: 'pipe' },
        );
        execFileSync(
            pgCommand('pg_ctl'),
            [
                '-D',
                databaseDir,
                '-l',
                path.join(tempRoot, 'postgres.log'),
                '-o',
                `-h 127.0.0.1 -p ${databasePort}`,
                '-w',
                'start',
            ],
            { stdio: 'pipe' },
        );
        databaseStarted = true;

        const config = {
            mode: 'development',
            server: {
                port,
                timeout: 60_000,
                modules: [],
                devMode: false,
                database: {
                    url: `postgresql://postgres@127.0.0.1:${databasePort}/postgres`,
                    synchronize: true,
                },
            },
            ssh: {
                username: 'smoke',
                ip: '127.0.0.1',
                webPath: path.join(tempRoot, 'web'),
                projectPath: tempRoot,
            },
            mail: { host: '127.0.0.1', user: 'smoke', pass: 'smoke' },
            jwt: { secret: 'local-dist-smoke-secret' },
            aes: { key: '0123456789abcdef', iv: '0123456789abcdef' },
            auth: { username: 'smoke', password: 'smoke' },
            leetcode: { csrf: '', session: '' },
            dev: { enabled: false, secret: '' },
            log: { level: 'info', retentionDays: 1 },
        };
        await mkdir(config.ssh.webPath);
        await writeFile(path.join(config.ssh.webPath, 'index.html'), '<h1>dist smoke static</h1>');
        await mkdir(path.join(tempRoot, 'node_modules/@bestlyg'), { recursive: true });
        await symlink(
            path.join(serverRoot, 'node_modules/@bestlyg/client'),
            path.join(tempRoot, 'node_modules/@bestlyg/client'),
            'junction',
        );
        const configPath = path.join(tempRoot, 'bestlyg.config.ts');
        const realConfigURL = pathToFileURL(path.join(serverRoot, 'config/bestlyg.config.ts'));
        // Exercise the real TS configuration and its transitive imports, while
        // keeping every setting and side effect inside this temporary fixture.
        await writeFile(path.join(tempRoot, 'package.json'), '{"type":"module"}\n');
        // Keep the existing smoke mode: production notifications require SMTP.
        await writeFile(
            configPath,
            `import config from ${JSON.stringify(realConfigURL.href)};\n` +
                `export default { ...config, mode: ${JSON.stringify(config.mode)} };\n`,
        );
        // Keep dotenv, logs, configuration and all database writes inside the fixture.
        const env = Object.fromEntries(
            Object.entries(process.env).filter(([key]) => !/^BEST(LYG)?_/.test(key)),
        );
        Object.assign(env, {
            NODE_ENV: 'production',
            BEST_CWD: tempRoot,
            BESTLYG_CONFIG_DIR: tempRoot,
            BESTLYG_CONFIG_NAME: 'bestlyg',
            BESTLYG_USERNAME: config.auth.username,
            BESTLYG_PASSWORD: config.auth.password,
            BESTLYG_SERVER_PORT: String(config.server.port),
            BESTLYG_SERVER_TIMEOUT: String(config.server.timeout),
            BESTLYG_SERVER_MODULES: config.server.modules.join(','),
            BESTLYG_SERVER_DEV_MODE: String(config.server.devMode),
            BESTLYG_DATABASE_URL: config.server.database.url,
            BESTLYG_DATABASE_SYNCHRONIZE: String(config.server.database.synchronize),
            BESTLYG_DEV_ENABLED: String(config.dev.enabled),
            BESTLYG_DEV_SECRET: config.dev.secret,
            BESTLYG_SERVER_MAIL_HOST: config.mail.host,
            BESTLYG_SERVER_MAIL_USER: config.mail.user,
            BESTLYG_SERVER_MAIL_PASS: config.mail.pass,
            BESTLYG_SECRET: config.jwt.secret,
            BESTLYG_SSH_USERNAME: config.ssh.username,
            BESTLYG_SSH_IP: config.ssh.ip,
            BESTLYG_SSH_WEB_PATH: config.ssh.webPath,
            BESTLYG_SSH_PROJECT_PATH: config.ssh.projectPath,
            BESTLYG_AES_KEY: config.aes.key,
            BESTLYG_AES_IV: config.aes.iv,
            BESTLYG_LEETCODE_CSRF: config.leetcode.csrf,
            BESTLYG_LEETCODE_SESSION: config.leetcode.session,
            BESTLYG_LOG_LEVEL: config.log.level,
            BESTLYG_LOG_RETENTION_DAYS: String(config.log.retentionDays),
        });
        start({ ...env, NODE_ENV: watchMode ? 'development' : 'production' }, watchMode);
        const baseURL = `http://127.0.0.1:${port}`;
        let ready = false;
        for (let attempt = 0; attempt < 150; attempt++) {
            if (child.exitCode !== null || child.signalCode !== null)
                throw new Error('Built server exited during bootstrap');
            try {
                const response = await fetch(`${baseURL}/api/dev/ping`, {
                    signal: AbortSignal.timeout(1_000),
                });
                const body = await response.json();
                if (
                    body.code === 0 &&
                    body.data?.pid &&
                    (watchMode || body.data.pid === child.pid)
                ) {
                    ready = true;
                    break;
                }
            } catch {
                /* The HTTP listener may not be ready yet. */
            }
            await delay(200);
        }
        assert.ok(ready, 'Built server must listen and resolve injected providers');

        const json = async (route, options) =>
            (
                await fetch(baseURL + route, { ...options, signal: AbortSignal.timeout(5_000) })
            ).json();
        assert.equal((await json('/api/database/user')).code, 401, 'Missing JWT must be rejected');
        const token = new JwtService({ secret: config.jwt.secret }).sign({ name: 'smoke' });
        const headers = {
            authorization: `Bearer ${token}`,
            'content-type': 'application/json',
            'x-trace-id': 'dist-smoke',
        };
        const user = {
            name: 'smoke',
            pwd: 'smoke',
            avatar: 'smoke',
            description: 'smoke',
            nickname: 'smoke',
        };
        const created = await json('/api/database/user', {
            method: 'POST',
            headers,
            body: JSON.stringify(user),
        });
        assert.equal(created.code, 0, 'Validated DTO must be persisted');
        assert.ok(created.data.id);
        const login = await json('/api/auth/login', {
            method: 'POST',
            headers,
            body: JSON.stringify({ username: user.name, password: user.pwd }),
        });
        assert.equal(login.code, 0);
        assert.ok(login.data.accessToken, 'Login must issue a JWT');
        const users = await json('/api/database/user', {
            headers: { ...headers, authorization: `Bearer ${login.data.accessToken}` },
        });
        assert.equal(users.code, 0);
        assert.equal(
            users.data[0].id,
            created.data.id,
            'Authenticated repository query must read the saved user',
        );
        const invalid = await json('/api/database/user', {
            method: 'POST',
            headers,
            body: JSON.stringify({ name: '' }),
        });
        assert.equal(
            invalid.code,
            400,
            'Zod validation and exception filter must handle invalid DTOs',
        );
        const sse = await fetch(`${baseURL}/api/sse`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ data: 'ok', sleepTime: 0 }),
            signal: AbortSignal.timeout(5_000),
        });
        assert.match(sse.headers.get('content-type'), /text\/event-stream/);
        assert.match(await sse.text(), /data:/);
        assert.match(await (await fetch(`${baseURL}/web/index.html`)).text(), /dist smoke static/);
        assert.equal((await fetch(`${baseURL}/`)).status, 200, 'Client assets must be served');
        await stop();

        await writeFile(configPath, 'export default {};\n');
        start(env);
        const timeout = setTimeout(() => child.kill('SIGKILL'), 15_000);
        try {
            const [code] = await once(child, 'exit');
            assert.equal(code, 1, 'Invalid configuration must exit unsuccessfully');
        } finally {
            clearTimeout(timeout);
        }
        console.log(
            `${watchMode ? 'Nest watch' : 'Built server'} passed: bootstrap, PostgreSQL, JWT, CLS, DTO validation, SSE, static assets and startup failure exit code.`,
        );
    } catch (err) {
        console.error(output);
        throw err;
    } finally {
        await stop();
        if (databaseStarted)
            execFileSync(
                pgCommand('pg_ctl'),
                ['-D', databaseDir, '-m', 'immediate', '-w', 'stop'],
                {
                    stdio: 'pipe',
                },
            );
        await rm(tempRoot, { recursive: true, force: true });
    }
}
