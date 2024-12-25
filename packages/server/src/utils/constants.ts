import best from '@bestlyg/cli';
import { resolve } from './resolve.js';

best.dotenv.config({
    path: resolve('node_modules', '@bestlyg', 'config', '.env.local'),
});

export const PORT = Number(process.env.BESTLYG_SERVER_PORT);
export const MAIL_HOST = process.env.BESTLYG_SERVER_MAIL_HOST;
export const MAIL_USER = process.env.BESTLYG_SERVER_MAIL_USER;
export const MAIL_PASS = process.env.BESTLYG_SERVER_MAIL_PASS;
export const USERNAME = process.env.BESTLYG_USERNAME;
export const PASSWORD = process.env.BESTLYG_PASSWORD;
export const SECRET = process.env.BESTLYG_SECRET;
