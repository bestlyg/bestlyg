import z from 'zod';

export const CreateServerlessCodeSchema = z
    .object({
        name: z.string().readonly(),
        code: z.string().readonly(),
        serverlessId: z.string().optional().default('best'),
    })
    .readonly();

export type CreateServerlessCodeDTO = z.infer<typeof CreateServerlessCodeSchema>;

export const UpdateServerlessCodeSchema = z
    .object({
        id: z.string(),
        name: z.string().optional().readonly(),
        code: z.string().optional().readonly(),
        serverlessId: z.string().optional().default('best'),
    })
    .readonly();

export type UpdateServerlessCodeDTO = z.infer<typeof UpdateServerlessCodeSchema>;
