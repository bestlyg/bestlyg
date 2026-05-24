import { z } from 'zod';

const envBoolean = z.preprocess((value) => {
    if (typeof value === 'string') {
        const normalized = value.trim().toLowerCase();
        if (['1', 'true', 'yes', 'on'].includes(normalized)) return true;
        if (['0', 'false', 'no', 'off', ''].includes(normalized)) return false;
    }
    if (typeof value === 'number') return value !== 0;
    return value;
}, z.boolean());

const stringList = z.preprocess((value) => {
    if (typeof value === 'string') {
        return value
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean);
    }
    return value;
}, z.array(z.string()).default([]));

/** 服务端运行配置 schema，负责校验环境变量整理后的配置结构。 */
export const ConfigurationSchema = z
    .object({
        mode: z.enum(['production', 'development']).default('development'),
        server: z
            .object({
                port: z.coerce.number().readonly(),
                timeout: z.coerce
                    .number()
                    .positive()
                    .default(10 * 60 * 1000),
                modules: stringList,
                devMode: envBoolean.default(false),
                database: z.object({
                    url: z.string().readonly(),
                    synchronize: envBoolean.default(false),
                }),
            })
            .required(),
        dev: z
            .object({
                enabled: envBoolean.default(false),
                secret: z.string().default(''),
            })
            .default({}),
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
        auth: z
            .object({
                username: z.string().readonly(),
                password: z.string().readonly(),
            })
            .required(),
        leetcode: z.object({
            csrf: z.string().readonly(),
            session: z.string().readonly(),
        }),
    })
    .required();
export type Configuration = z.infer<typeof ConfigurationSchema>;

/** 从 process.env 中收集 BESTLYG 服务端配置，返回待 schema 校验的原始对象。 */
export function getConfiguration() {
    return {
        mode: process.env.NODE_ENV,
        auth: {
            username: process.env.BESTLYG_USERNAME,
            password: process.env.BESTLYG_PASSWORD,
        },
        server: {
            port: process.env.BESTLYG_SERVER_PORT,
            timeout: process.env.BESTLYG_SERVER_TIMEOUT,
            modules: process.env.BESTLYG_SERVER_MODULES,
            devMode: process.env.BESTLYG_SERVER_DEV_MODE,
            database: {
                url: process.env.BESTLYG_DATABASE_URL,
                synchronize: process.env.BESTLYG_DATABASE_SYNCHRONIZE,
            },
        },
        dev: {
            enabled: process.env.BESTLYG_DEV_ENABLED,
            secret: process.env.BESTLYG_DEV_SECRET,
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
    };
}
