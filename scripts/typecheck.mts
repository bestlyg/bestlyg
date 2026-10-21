import { spawn } from 'node:child_process';
import { glob } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(import.meta.url);
const compiler = path.join(path.dirname(require.resolve('typescript/package.json')), 'bin/tsc');
const version: string = require('typescript/package.json').version;
const configs = ['tsconfig.json'];
for await (const filename of glob('packages/**/tsconfig*.json', {
    cwd: root,
    exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/public/**',
        '**/.rstack/**',
        '**/tsconfig.base.json',
    ],
})) {
    configs.push(filename);
}

const failures: string[] = [];
let next = 0;
await Promise.all(
    Array.from({ length: 3 }, async () => {
        while (next < configs.length) {
            const config = configs[next++];
            const code = await new Promise<number | null>((resolve, reject) => {
                // Always use the root TS 7 compiler, including workspaces whose build tools need TS 6.
                const child = spawn(
                    process.execPath,
                    [compiler, '--noEmit', '--pretty', 'false', '-p', config],
                    {
                        cwd: root,
                        stdio: 'inherit',
                    },
                );
                child.once('error', reject);
                child.once('close', resolve);
            });
            if (code !== 0) failures.push(config);
        }
    }),
);

console.log(
    `TypeScript ${version}: ${configs.length - failures.length}/${configs.length} configurations passed.`,
);
if (failures.length) {
    console.error(`Failed configurations:\n${failures.join('\n')}`);
    process.exitCode = 1;
}
