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
        mainEntryName: 'index',
    },
    output: {
        enableCssModuleTSDeclaration: true,
        assetPrefix: '/resume',
        distPath: { html: '../dist' },
    },
    html: {
        disableHtmlFolder: true,
        title: '李逸港 - WEB 前端工程师',
        meta: {
            description: 'a tool for markdown to resume.',
        },
    },
    dev: {
        assetPrefix: '/resume',
    },
    server: { baseUrl: '/resume' },
});
