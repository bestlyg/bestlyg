import { expect, test } from '@rstest/core';
import { spawnSync } from 'node:child_process';
import { cp, mkdtemp, mkdir, readFile, rm, symlink } from 'node:fs/promises';
import { createRequire } from 'node:module';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(import.meta.url);

async function runGenerator(includeProto: boolean) {
    const root = await mkdtemp(path.join(os.tmpdir(), 'xidl-playground-test-'));
    const fixture = path.join(root, 'packages/playground');
    try {
        await mkdir(fixture, { recursive: true });
        await cp(path.join(packageRoot, 'src'), path.join(fixture, 'src'), { recursive: true });
        await cp(path.join(packageRoot, 'package.json'), path.join(fixture, 'package.json'));
        await symlink(path.join(packageRoot, 'node_modules'), path.join(fixture, 'node_modules'));
        if (includeProto) {
            await cp(path.resolve(packageRoot, '../../proto'), path.join(root, 'proto'), {
                recursive: true,
            });
        }
        const result = spawnSync(
            process.execPath,
            [require.resolve('tsx/cli'), path.join(fixture, 'src/index.ts')],
            { cwd: fixture, encoding: 'utf8', timeout: 20_000 },
        );
        if (result.error) throw result.error;
        const outputs: Record<string, string> = {};
        if (includeProto && result.status === 0) {
            for (const file of [
                'client/api/example/index.ts',
                'server/api/example/index.ts',
                'core/mobius/event/index.ts',
                'py-core/mobius/event/__init__.py',
            ]) {
                outputs[file] = await readFile(path.join(fixture, 'dist', file), 'utf8');
            }
        }
        return { ...result, outputs };
    } finally {
        await rm(root, { recursive: true, force: true });
    }
}

test('generates all language targets from the bundled proto fixtures', async () => {
    const result = await runGenerator(true);
    expect(result.status, result.stderr).toBe(0);
    expect(result.outputs['client/api/example/index.ts']).toContain('export const request');
    expect(result.outputs['server/api/example/index.ts']).toContain('export interface User');
    expect(result.outputs['core/mobius/event/index.ts']).toContain('id: string;');
    expect(result.outputs['core/mobius/event/index.ts']).not.toContain('id?: string;');
    expect(result.outputs['py-core/mobius/event/__init__.py']).toContain('MobiusEventType');
}, 30_000);

test('returns a nonzero exit code when proto input cannot be loaded', async () => {
    const result = await runGenerator(false);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('ENOENT');
}, 30_000);
