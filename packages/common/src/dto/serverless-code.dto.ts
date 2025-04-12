import { z } from 'zod';
import { createZodBaseModel } from '@/zod';

export class SelectServerlessCodeDto extends createZodBaseModel(
    z.object({
        id: z.string().nanoid().optional(),
        name: z.string().optional(),
    }),
) {}
export class CreateServerlessCodeDto extends createZodBaseModel(
    z.object({
        name: z.string(),
        code: z.string(),
        serverlessId: z.string().optional().default('best'),
    }),
) {}
export class UpdateServerlessCodeDto extends createZodBaseModel(
    z.object({
        id: z.string().nanoid(),
        name: z.string().optional(),
        code: z.string().optional(),
        serverlessId: z.string().default('best').optional(),
    }),
) {}
export class DeleteServerlessCodeDto extends createZodBaseModel(
    z.object({
        id: z.string().nanoid().optional(),
        name: z.string().optional(),
    }),
) {}
