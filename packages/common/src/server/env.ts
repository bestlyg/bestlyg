import { z } from 'zod';

export const ConfigurationSchema = z
    .object({
        mode: z.enum(['production', 'development']).default('development'),
        server: z
            .object({
                port: z.coerce.number().readonly(),
                database: z.object({ url: z.string().readonly() }),
            })
            .required(),
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
export type Configuration = z.infer<typeof ConfigurationSchema>;

export function getConfiguration() {
    return {
        mode: process.env.NODE_ENV,
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
    };
}
