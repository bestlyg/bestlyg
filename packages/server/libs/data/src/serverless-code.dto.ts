import { z } from 'zod';
import { createZodDto } from '@bestlyg-server/common';

export const SelectServerlessCodeSchema = 
    z
        .object({
            id: z.string().nanoid().optional().readonly(),
            name: z.string().optional().readonly(),
        })
        .readonly()

export const CreateServerlessCodeSchema =
    z
        .object({
            name: z.string().readonly(),
            code: z.string().readonly(),
            serverlessId: z.string().optional().default('best'),
        })
        .readonly()

export const UpdateServerlessCodeSchema = 
    z
        .object({
            id: z.string().nanoid(),
            name: z.string().optional().readonly(),
            code: z.string().optional().readonly(),
            serverlessId: z.string().default('best').optional(),
        })
        .readonly()
export const DeleteServerlessCodeSchema = 
    z
        .object({
            id: z.string().nanoid().optional().readonly(),
            name: z.string().optional().readonly(),
        })
        .readonly()

export class SelectServerlessCodeDto extends createZodDto(SelectServerlessCodeSchema) {}
export class CreateServerlessCodeDto extends createZodDto(CreateServerlessCodeSchema) {}
export class UpdateServerlessCodeDto extends createZodDto(UpdateServerlessCodeSchema) {}
export class DeleteServerlessCodeDto extends createZodDto(DeleteServerlessCodeSchema) {}
