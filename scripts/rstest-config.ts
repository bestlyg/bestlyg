import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type RstestConfig } from '@rstest/core';

export function packageTestConfig(name: string, url: string, overrides: RstestConfig = {}) {
    const root = path.dirname(fileURLToPath(url));
    const tsconfigPath = path.join(root, 'tsconfig.json');
    return defineConfig({
        name,
        root,
        testEnvironment: 'node',
        pool: { type: 'forks', maxWorkers: 4 },
        testTimeout: 10_000,
        source: {
            ...(fs.existsSync(tsconfigPath) ? { tsconfigPath } : {}),
            decorators: { version: 'legacy' },
        },
        tools: { swc: { jsc: { transform: { legacyDecorator: true, decoratorMetadata: true } } } },
        ...overrides,
    });
}
