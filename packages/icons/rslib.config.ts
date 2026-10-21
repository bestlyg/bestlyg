import { defineConfig } from '@rslib/core';
import { fileURLToPath } from 'node:url';

export default defineConfig({
    source: { entry: { index: ['./src/**/*.tsx'] }, tsconfigPath: './tsconfig.build.json' },
    lib: [
        {
            format: 'esm',
            bundle: false,
            dts: { tsgo: true, typescriptPath: fileURLToPath(import.meta.resolve('typescript')) },
            output: { filename: { js: '[name].mjs' } },
        },
    ],
    output: { target: 'web', cleanDistPath: true },
});
