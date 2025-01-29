import path from 'path';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression'

// import best from '@bestlyg/cli';

// const BASE_URL = '/web/resume';
// const CWD = best.utils.CWD;
// const resolve = best.utils.getResolveFunction(__dirname);

// best.dotenv.config({
//     path: resolve('node_modules', '@bestlyg', 'config', '.env.local'),
// });
// https://vite.dev/config/

const VITE_VISUALIZER = process.env.VITE_VISUALIZER === 'true'

export default defineConfig({
    plugins: [
        react(),
        VITE_VISUALIZER &&
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
