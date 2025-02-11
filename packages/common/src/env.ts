import { z } from 'zod';

export const ConfigurationSchema = z
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
    })
    .required();
export type Configuration = z.infer<typeof ConfigurationSchema>;

export function getConfiguration(env: Record<string, any>) {
    return {
        mode: env.NODE_ENV,
        server: { port: env.BESTLYG_SERVER_PORT },
        mail: {
            host: env.BESTLYG_SERVER_MAIL_HOST,
            user: env.BESTLYG_SERVER_MAIL_USER,
            pass: env.BESTLYG_SERVER_MAIL_PASS,
        },
        user: {
            username: env.BESTLYG_USERNAME,
            password: env.BESTLYG_PASSWORD,
        },
        jwt: {
            secret: env.BESTLYG_SECRET,
        },
        ssh: {
            username: env.BESTLYG_SSH_USERNAME,
            ip: env.BESTLYG_SSH_IP,
            webPath: env.BESTLYG_SSH_WEB_PATH,
            projectPath: env.BESTLYG_SSH_PROJECT_PATH,
        },
    };
}

export const getServerConfiguration = () => getConfiguration(process.env);
