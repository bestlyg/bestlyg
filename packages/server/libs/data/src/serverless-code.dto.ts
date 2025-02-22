import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';

export const SelectServerlessCodeSchema = extendApi(
    z
        .object({
            id: z.string().nanoid().optional().readonly(),
            name: z.string().optional().readonly(),
        })
        .readonly(),
    { title: '获取ServerlessCode对象数据' },
);

export const CreateServerlessCodeSchema = extendApi(
    z
        .object({
            name: z.string().readonly(),
            code: z.string().readonly(),
            serverlessId: z.string().optional().default('best'),
        })
        .readonly(),
    { title: '创建ServerlessCode' },
);

export const UpdateServerlessCodeSchema = extendApi(
    z
        .object({
            id: z.string().nanoid(),
            name: z.string().optional().readonly(),
            code: z.string().optional().readonly(),
            serverlessId: z.string().optional().default('best'),
        })
        .readonly(),
    { title: '更新ServerlessCode' },
);

export const DeleteServerlessCodeSchema = extendApi(
    z
        .object({
            id: z.string().nanoid().optional().readonly(),
            name: z.string().optional().readonly(),
        })
        .readonly(),
    {
        title: '删除ServerlessCode',
    },
);

export class SelectServerlessCodeDto extends createZodDto(SelectServerlessCodeSchema) {}
export class CreateServerlessCodeDto extends createZodDto(CreateServerlessCodeSchema) {}
export class UpdateServerlessCodeDto extends createZodDto(UpdateServerlessCodeSchema) {}
export class DeleteServerlessCodeDto extends createZodDto(DeleteServerlessCodeSchema) {}
