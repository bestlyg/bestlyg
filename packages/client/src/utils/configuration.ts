import { z } from 'zod';

export const ConfigurationSchema = z
    .object({
        mode: z.enum(['production', 'development']).default('development'),
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
        mode: import.meta.env.MODE,
        aes: {
            key: import.meta.env.VITE_BESTLYG_AES_KEY,
            iv: import.meta.env.VITE_BESTLYG_AES_IV,
        },
    };
}

export const configuration = ConfigurationSchema.parse(getConfiguration());
