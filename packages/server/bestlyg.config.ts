import { defineConfig } from './external';
import { ConfigurationSchema } from '@bestlyg/common/server';

const config = ConfigurationSchema.parse({
    mode: process.env.NODE_ENV,
    auth: {
        username: process.env.BESTLYG_USERNAME,
        password: process.env.BESTLYG_PASSWORD,
    },
    server: {
        port: process.env.BESTLYG_SERVER_PORT,
        database: {
            url: process.env.BESTLYG_DATABASE_URL,
        },
    },
    mail: {
        host: process.env.BESTLYG_SERVER_MAIL_HOST,
        user: process.env.BESTLYG_SERVER_MAIL_USER,
        pass: process.env.BESTLYG_SERVER_MAIL_PASS,
    },
    jwt: {
        secret: process.env.BESTLYG_SECRET,
    },
    ssh: {
        username: process.env.BESTLYG_SSH_USERNAME,
        ip: process.env.BESTLYG_SSH_IP,
        webPath: process.env.BESTLYG_SSH_WEB_PATH,
        projectPath: process.env.BESTLYG_SSH_PROJECT_PATH,
    },
    aes: {
        key: process.env.BESTLYG_AES_KEY,
        iv: process.env.BESTLYG_AES_IV,
    },
    leetcode: {
        csrf: process.env.BESTLYG_LEETCODE_CSRF,
        session: process.env.BESTLYG_LEETCODE_SESSION,
    },
});

export default defineConfig({
    ...config,
});
