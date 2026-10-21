import path from 'path';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { compressAssets } from './scripts/compress-assets';
import dotenv from 'dotenv';
import tailwindcss from '@tailwindcss/vite';

const resolve = (...p: string[]) => path.resolve(__dirname, ...p);
const WORKSPACE_SOURCE_ALIASES = [
    {
        find: /^@bestlyg\/client-shared$/,
        replacement: resolve('../shared/client-shared/src/index.ts'),
    },
    { find: /^@bestlyg\/core-shared$/, replacement: resolve('../shared/core-shared/src/index.ts') },
    {
        find: /^@bestlyg\/server-shared$/,
        replacement: resolve('../shared/server-shared/src/index.ts'),
    },
];

dotenv.config({
    path: resolve('../shared/server-shared/.env'),
    override: true,
});

// https://vite.dev/config/

export default defineConfig({
    plugins: [
        tailwindcss(),
        react(),
        visualizer({
            emitFile: true,
            filename: 'visualizer.html',
        }),
        compressAssets(),
    ],
    resolve: {
        alias: [
            ...WORKSPACE_SOURCE_ALIASES,
            { find: '@', replacement: path.resolve(__dirname, './src') },
        ],
    },
    define: {
        __MODE__: JSON.stringify(process.env.NODE_ENV),
    },
    server: {
        port: 10001,
        strictPort: !true,
        proxy: {
            // 测试时链接pre
            [`^/(api|static)(/.*)?`]: {
                target: 'http://localhost:10000',
                // target: "https://www.bestlyg.com",
                changeOrigin: true,
                xfwd: true, // 保留原始请求的头部信息
            },
        },
    },
});
