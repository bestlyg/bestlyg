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
    html: {
        title: '李逸港 - WEB 前端工程师',
        meta: {
            description: 'a tool for markdown to resume.',
        },
    },
});
