import { moduleTools, defineConfig } from '@modern-js/module-tools';

import best from '@bestlyg/cli';

const CWD = best.utils.CWD;
const resolve = best.utils.getResolveFunction(__dirname);

export default defineConfig({
    plugins: [moduleTools()],
    buildConfig: [
        {
            dts: false,
            sourceMap: true,
            buildType: 'bundleless',
            shims: true,
            input: ['src/**/*.ts'],
            format: 'esm',
            autoExtension: true,
            outDir: './dist/esm',
            esbuildOptions: options => {
                options.outExtension = { '.js': '.mjs' };
                return options;
            },
        },
        {
            dts: false,
            sourceMap: true,
            buildType: 'bundleless',
            shims: true,
            input: ['src/**/*.ts'],
            format: 'cjs',
            autoExtension: true,
            outDir: './dist/lib',
            esbuildOptions: options => {
                options.outExtension = { '.js': '.cjs' };
                return options;
            },
        },
        {
            buildType: 'bundleless',
            dts: {
                only: true,
            },
            outDir: resolve(CWD, 'dist', 'types'),
        },
    ],
});
