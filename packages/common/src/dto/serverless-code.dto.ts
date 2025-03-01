import { z } from 'zod';
import { createZodModel } from '@/zod';

export class SelectServerlessCodeDto extends createZodModel(
    z.object({
        id: z.string().nanoid().optional(),
        name: z.string().optional(),
    }),
) {}
export class CreateServerlessCodeDto extends createZodModel(
    z.object({
        name: z.string(),
        code: z.string(),
        serverlessId: z.string().optional().default('best'),
    }),
) {}
export class UpdateServerlessCodeDto extends createZodModel(
    z.object({
        id: z.string().nanoid(),
        name: z.string().optional(),
        code: z.string().optional(),
        serverlessId: z.string().default('best').optional(),
    }),
) {}
export class DeleteServerlessCodeDto extends createZodModel(
    z.object({
        id: z.string().nanoid().optional(),
        name: z.string().optional(),
    }),
) {}
