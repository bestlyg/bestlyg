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
            plugins: [UnoCSS()],
            build: {
                sourcemap: false,
            },
            // resolve: {
            //     alias: { '@': resolve('entrypoints') },
            // },
            define: {
                'process.env': {
                    EXTENSION_PREFIX: 'BEST-WALLET',
                },
            },
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
    },
});
