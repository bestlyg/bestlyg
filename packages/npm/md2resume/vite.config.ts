import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import best from '@bestlyg/cli';

const BASE_URL = '/web/resume';
const CWD = best.utils.CWD;
const resolve = best.utils.getResolveFunction(__dirname);

best.dotenv.config({
    path: resolve('node_modules', '@bestlyg', 'config', '.env.local'),
});

export default defineConfig({
    root: CWD,
    base: BASE_URL,
    plugins: [react()],
    build: {},
    server: {
        port: 3000,
        strictPort: true,
        proxy: {
            // 测试时链接pre
            // [`^${BASE_URL ?? ''}/api/chats/chat-progress-callback`]: {
            //     target: 'https://askbi-pre.dipeak.com',
            //     changeOrigin: true,
            //     xfwd: true, // 保留原始请求的头部信息
            // },
            // [`^${BASE_URL ?? ''}/api/chats/chat-progress`]: {
            //     target: 'https://askbi-pre.dipeak.com',
            //     changeOrigin: true,
            //     xfwd: true, // 保留原始请求的头部信息
            // },
            [`^/(api|static)/.*`]: {
                target: 'http://localhost:10000',
                // target: 'https://www.bestlyg.com',
                changeOrigin: true,
                xfwd: true, // 保留原始请求的头部信息
            },
        },
    },
});
