import { z } from 'zod';

export const ServerConfigurationSchema = z
    .object({
        mode: z.enum(['production', 'development']).default('development'),
        server: z.object({ port: z.coerce.number().readonly() }).required(),
        ssh: z
            .object({
                username: z.string().readonly(),
                ip: z.string().readonly(),
                webPath: z.string().readonly(),
                projectPath: z.string().readonly(),
            })
            .required(),
        mail: z
            .object({
                host: z.string().readonly(),
                user: z.string().readonly(),
                pass: z.string().readonly(),
            })
            .required(),
        user: z
            .object({
                username: z.string().readonly(),
                password: z.string().readonly(),
            })
            .required(),
        jwt: z
            .object({
                secret: z.string().readonly(),
            })
            .required(),
        aes: z
            .object({
                key: z.string().readonly(),
                iv: z.string().readonly(),
            })
            .required(),
    })
    .required();
export type Configuration = z.infer<typeof ServerConfigurationSchema>;

export function getServerConfiguration() {
    return {
        mode: process.env.NODE_ENV,
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
    };
}
