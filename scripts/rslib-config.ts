import { readFileSync } from 'node:fs';
import { chmod, copyFile, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type RsbuildPlugin } from '@rslib/core';

type LibraryOptions = {
    entry?: Record<string, string>;
};

/** Emit ESM JavaScript and native TypeScript declarations for workspace libraries. */
export function createLibraryConfig({ entry = { index: './src/index.ts' } }: LibraryOptions = {}) {
    const declarationPaths = Object.keys(entry).map((name) => path.resolve('dist', name));
    const { bin } = JSON.parse(readFileSync('package.json', 'utf8')) as {
        bin?: string | Record<string, string>;
    };
    const binaryPaths = (typeof bin === 'string' ? [bin] : Object.values(bin ?? {}))
        .filter((filename) => filename.startsWith('./dist/'))
        .map((filename) => path.resolve(filename));
    const declarationAliases: RsbuildPlugin = {
        name: 'library-outputs',
        setup(api) {
            api.onAfterBuild({
                order: 'post',
                async handler({ stats }) {
                    if (stats?.hasErrors()) return;
                    await Promise.all(
                        declarationPaths.flatMap((filename) => [
                            copyFile(`${filename}.d.ts`, `${filename}.d.mts`),
                        ]),
                    );
                    await Promise.all(
                        binaryPaths.map(async (filename) => {
                            const source = await readFile(filename, 'utf8');
                            if (!source.startsWith('#!')) {
                                await writeFile(filename, `#!/usr/bin/env node\n${source}`);
                            }
                            await chmod(filename, 0o755);
                        }),
                    );
                },
            });
        },
    };

    return defineConfig({
        source: { entry, tsconfigPath: './tsconfig.build.json' },
        lib: [
            {
                format: 'esm',
                dts: {
                    tsgo: true,
                    typescriptPath: fileURLToPath(import.meta.resolve('typescript')),
                },
                output: { filename: { js: '[name].mjs' } },
            },
        ],
        // Node 24 is the repository runtime; keep modern syntax and native module APIs.
        syntax: 'es2022',
        output: {
            target: 'node',
            autoExternal: {
                dependencies: true,
                optionalDependencies: true,
                peerDependencies: true,
                devDependencies: true,
            },
            distPath: { root: 'dist' },
            cleanDistPath: true,
        },
        plugins: [declarationAliases],
    });
}
