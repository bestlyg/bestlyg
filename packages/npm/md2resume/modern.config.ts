import { appTools, defineConfig } from '@modern-js/app-tools';
import { tailwindcssPlugin } from '@modern-js/plugin-tailwindcss';

export default defineConfig({
    runtime: {
        router: true,
    },
    plugins: [
        appTools({
            bundler: 'webpack',
        }),
        tailwindcssPlugin(),
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
        assetPrefix: '/web/resume',
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
        assetPrefix: '/web/resume',
    },
    server: { baseUrl: '/web/resume' },
    tools: {
        tailwindcss: {
            content: ['./src/**/*.{js,jsx,ts,tsx}'],
        },
    },
    performance: {
        transformLodash: false,
    },
});
