import { appTools, defineConfig } from '@modern-js/app-tools';

export default defineConfig({
    runtime: {
        router: true,
    },
    plugins: [
        appTools({
            bundler: 'webpack',
        }),
    ],
    source: {
        preEntry: ['normalize.css', './src/styles/global.less'],
        alias: {
            '@': './src',
        },
    },
    output: {
        enableCssModuleTSDeclaration: true,
    },
});
