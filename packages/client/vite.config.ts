import path from 'path';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import { getResolveFunction } from '@bestlyg/common/server';
import dotenv from 'dotenv';
import tailwindcss from '@tailwindcss/vite';

const resolve = getResolveFunction(__dirname);

dotenv.config({ path: resolve('node_modules', '@bestlyg', 'common', '.env'), override: true });

// https://vite.dev/config/

export default defineConfig({
    plugins: [
        tailwindcss(),
        react(),
        visualizer({
            emitFile: true,
            filename: 'visualizer.html',
        }),
        // br压缩算法，比gzip优秀
        viteCompression({ algorithm: 'brotliCompress' }),
        // gzip压缩算法，作为br不支持时的兜底
        viteCompression({}),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
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
