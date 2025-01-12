import { ZodDto } from '@bestlyg-server/common';
import { z } from 'zod';

export const SelectServerlessCodeSchema = z
    .object({
        name: z.string().readonly(),
    })
    .readonly();

export type SelectServerlessCode = z.infer<typeof SelectServerlessCodeSchema>;

export class SelectServerlessCodeDto extends ZodDto implements SelectServerlessCode {
    static zodSchema = SelectServerlessCodeSchema;
    name!: SelectServerlessCode['name'];
}

export const CreateServerlessCodeSchema = z
    .object({
        name: z.string().readonly(),
        code: z.string().readonly(),
        serverlessId: z.string().optional().default('best'),
    })
    .readonly();

export type CreateServerlessCode = z.infer<typeof CreateServerlessCodeSchema>;

export class CreateServerlessCodeDto extends ZodDto implements CreateServerlessCode {
    static zodSchema = CreateServerlessCodeSchema;
    name!: CreateServerlessCode['name'];
    code!: CreateServerlessCode['code'];
    serverlessId!: CreateServerlessCode['serverlessId'];
}

export const UpdateServerlessCodeSchema = z
    .object({
        id: z.string(),
        name: z.string().optional().readonly(),
        code: z.string().optional().readonly(),
        serverlessId: z.string().optional().default('best'),
    })
    .readonly();

export type UpdateServerlessCode = z.infer<typeof UpdateServerlessCodeSchema>;

export class UpdateServerlessCodeDto extends ZodDto implements UpdateServerlessCode {
    static zodSchema = CreateServerlessCodeSchema;
    serverlessId!: UpdateServerlessCode['serverlessId'];
    id!: UpdateServerlessCode['id'];
}

export const DeleteServerlessCodeSchema = z
    .object({
        id: z.string().optional().readonly(),
        name: z.string().optional().readonly(),
    })
    .readonly();

export type DeleteServerlessCode = z.infer<typeof DeleteServerlessCodeSchema>;

export class DeleteServerlessCodeDto extends ZodDto implements DeleteServerlessCode {
    static zodSchema = CreateServerlessCodeSchema;
    id!: DeleteServerlessCode['id'];
    name!: DeleteServerlessCode['name'];
}
