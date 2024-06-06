import { moduleTools, defineConfig } from '@modern-js/module-tools';

export default defineConfig({
    plugins: [moduleTools()],
    buildConfig: [
        {
            sourceMap: true,
            buildType: 'bundleless',
            shims: true,
            input: ['src/**/*.ts'],
            target: 'esnext',
            format: 'esm',
            autoExtension: true,
            outDir: './dist/esm',
            // esbuildOptions: options => {
            //     options.outExtension = { '.js': '.js' };
            //     return options;
            // },
        },
        {
            sourceMap: true,
            buildType: 'bundleless',
            shims: true,
            input: ['src/**/*.ts'],
            target: 'esnext',
            format: 'cjs',
            autoExtension: true,
            outDir: './dist/lib',
            // esbuildOptions: options => {
            //     options.outExtension = { '.js': '.cjs' };
            //     return options;
            // },
        },
        {
            buildType: 'bundleless',
            dts: {
                only: true,
            },
            outDir: './dist/types',
        },
    ],
});
