import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// import best from '@bestlyg/cli';

// const BASE_URL = '/web/resume';
// const CWD = best.utils.CWD;
// const resolve = best.utils.getResolveFunction(__dirname);

// best.dotenv.config({
//     path: resolve('node_modules', '@bestlyg', 'config', '.env.local'),
// });
// https://vite.dev/config/

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    define: {
        [`process.env.NODE_ENV`]: JSON.stringify(process.env.NODE_ENV),
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
