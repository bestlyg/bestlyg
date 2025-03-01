import { z } from 'zod';
import { createZodModel } from '@/zod';

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

export class SelectServerlessCodeDto extends createZodModel(SelectServerlessCodeSchema) {}
export class CreateServerlessCodeDto extends createZodModel(CreateServerlessCodeSchema) {}
export class UpdateServerlessCodeDto extends createZodModel(UpdateServerlessCodeSchema) {}
export class DeleteServerlessCodeDto extends createZodModel(DeleteServerlessCodeSchema) {}
