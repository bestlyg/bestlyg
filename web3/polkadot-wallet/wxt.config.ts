import { defineConfig } from 'wxt';
import path from 'path';
import UnoCSS from 'unocss/vite';

const resolve = (...p: string[]) => path.resolve(__dirname, ...p);

// See https://wxt.dev/api/config.html
export default defineConfig({
    modules: ['@wxt-dev/module-react'],
    outDir: 'dist',
    alias: { '@': resolve('entrypoints') },
    async vite(env) {
        return Promise.resolve({
            build: {
                sourcemap: false,
            },
            // resolve: {
            //     alias: { '@': resolve('entrypoints') },
            // },
            define: {
                'process.env': {
                    EXTENSION_PREFIX: 'POLKADOT-WALLET',
                },
            },
            plugins: [
                UnoCSS(),
                {
                    name: 'replace-path-auto-plugin', // 插件名称
                    enforce: 'pre',
                    transform(code, id) {
                        if (id.endsWith('.js') || id.endsWith('.ts')) {
                            const pathAutoRegex = `path: (import.meta && import.meta.url) ? new URL(import.meta.url).pathname.substring(0, new URL(import.meta.url).pathname.lastIndexOf('/') + 1) : 'auto'`;
                            const replacement = `path: 'auto'`;
                            const transformedCode = code.replaceAll(pathAutoRegex, replacement);
                            return {
                                code: transformedCode,
                                map: null, // 如果不需要 source map 可以设置为 null
                            };
                        }
                        return null;
                    },
                },
            ],
        });
    },
    manifest: {
        content_scripts: [
            {
                matches: ['<all_urls>'],
                js: ['content-scripts/content.js'],
                run_at: 'document_start',
            },
        ],
        web_accessible_resources: [
            {
                resources: ['injected.js'],
                matches: ['*://*/*'],
            },
        ],
    },
    runner: {
        startUrls: ['https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/explorer'],
        openDevtools: true,
        openConsole: true,
    },
});
