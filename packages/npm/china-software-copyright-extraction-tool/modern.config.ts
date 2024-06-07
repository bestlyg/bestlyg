import { moduleTools, defineConfig } from '@modern-js/module-tools';
export default defineConfig({
    plugins: [moduleTools()],
    buildConfig: [
        {
            buildType: 'bundleless',
            shims: true,
            input: ['src/**/*.ts'],
            format: 'esm',
            autoExtension: true,
            outDir: './dist/esm',
            dts: false,
            esbuildOptions: options => {
                options.outExtension = { '.js': '.mjs' };
                return options;
            },
        },
        {
            buildType: 'bundleless',
            shims: true,
            input: ['src/**/*.ts'],
            format: 'cjs',
            autoExtension: true,
            outDir: './dist/lib',
            dts: false,
            esbuildOptions: options => {
                options.outExtension = { '.js': '.cjs' };
                return options;
            },
        },
    ],
});
