import { ConfigModuleOptions } from '@nestjs/config';
import { resolve } from './resolve';
import dotenv from 'dotenv';
import z from 'zod';

dotenv.config({
    path: resolve('node_modules', '@bestlyg', 'config', '.env.local'),
});

const ConfigurationSchema = z
    .object({
        server: z.object({ port: z.coerce.number().readonly() }).readonly(),
        mail: z
            .object({
                host: z.string().readonly(),
                user: z.string().readonly(),
                pass: z.string().readonly(),
            })
            .readonly(),
        jwt: z
            .object({
                secret: z.string().readonly(),
            })
            .readonly(),
    })
    .required();

export type Configuration = z.infer<typeof ConfigurationSchema>;

export type ExtractPromiseResult<T> = T extends Promise<infer R> ? R : T;

export const getConfiguration = () => {
    const obj = {
        server: { port: process.env.BESTLYG_SERVER_PORT },
        mail: {
            host: process.env.BESTLYG_SERVER_MAIL_HOST,
            user: process.env.BESTLYG_SERVER_MAIL_USER,
            pass: process.env.BESTLYG_SERVER_MAIL_PASS,
        },
        user: {
            username: process.env.BESTLYG_USERNAME,
            password: process.env.BESTLYG_PASSWORD,
        },
        jwt: {
            secret: process.env.BESTLYG_SECRET,
        },
    };
    const config = ConfigurationSchema.parse(obj);
    return config;
};
