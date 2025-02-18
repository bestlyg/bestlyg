import { z } from 'zod';

export const SelectServerlessCodeSchema = z
    .object({
        name: z.string().readonly(),
    })
    .readonly();

export type SelectServerlessCodeDto = z.infer<typeof SelectServerlessCodeSchema>;

export const CreateServerlessCodeSchema = z
    .object({
        name: z.string().readonly(),
        code: z.string().readonly(),
        serverlessId: z.string().optional().default('best'),
    })
    .readonly();

export type CreateServerlessCodeDto = z.infer<typeof CreateServerlessCodeSchema>;

export const UpdateServerlessCodeSchema = z
    .object({
        id: z.string(),
        name: z.string().optional().readonly(),
        code: z.string().optional().readonly(),
        serverlessId: z.string().optional().default('best'),
    })
    .readonly();

export type UpdateServerlessCodeDto = z.infer<typeof UpdateServerlessCodeSchema>;

export const DeleteServerlessCodeSchema = z
    .union([
        z
            .object({
                id: z.string().optional().readonly(),
                name: z.string().readonly(),
            })
            .readonly(),
        z
            .object({
                id: z.string().readonly(),
                name: z.string().optional().readonly(),
            })
            .readonly(),
    ])
    .readonly();

export type DeleteServerlessCodeDto = z.infer<typeof DeleteServerlessCodeSchema>;
