import { ConfigModuleOptions } from '@nestjs/config';
import { resolve } from './resolve.js';
import dotenv from 'dotenv';

dotenv.config({
    path: resolve('node_modules', '@bestlyg', 'config', '.env.local'),
});

const PORT = Number(process.env.BESTLYG_SERVER_PORT);
const MAIL_HOST = process.env.BESTLYG_SERVER_MAIL_HOST;
const MAIL_USER = process.env.BESTLYG_SERVER_MAIL_USER;
const MAIL_PASS = process.env.BESTLYG_SERVER_MAIL_PASS;
const USERNAME = process.env.BESTLYG_USERNAME;
const PASSWORD = process.env.BESTLYG_PASSWORD;
const SECRET = process.env.BESTLYG_SECRET;

export type ExtractPromiseResult<T> = T extends Promise<infer R> ? R : T;

export const getConfiguration = () => ({
    server: { port: PORT },
    mail: {
        host: MAIL_HOST,
        user: MAIL_USER,
        pass: MAIL_PASS,
    },
    user: {
        username: USERNAME,
        password: PASSWORD,
    },
    jwt: {
        secret: SECRET,
    },
});
