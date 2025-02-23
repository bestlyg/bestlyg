import { moduleTools, defineConfig } from '@modern-js/module-tools';
import '@bestlyg/cli/globals';

const CWD = best.common.CWD;
const resolve = best.common.getResolveFunction(CWD);

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
