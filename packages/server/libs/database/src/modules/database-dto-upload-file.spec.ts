import { describe, test, it, expect, rs } from '@rstest/core';

import { BadRequestException } from '@nestjs/common';
import { PageParam } from '@bestlyg/server-shared';
import ExcelJS from 'exceljs';
import { z } from 'zod';
import { CasbinRuleBatchCreateRequestSchema } from '@bestlyg/server-shared';
import { DatabaseResourceSchema } from '@bestlyg/server-shared';
import {
    LeetcodeProblemUpdateRequestSchema,
    LedgerPageRequestSchema,
    LedgerUpdateRequestSchema,
} from '@bestlyg/server-shared';
import {
    createXlsxBuffer,
    importUpdateXlsx,
    importXlsx,
    validateXlsxFile,
} from '@bestlyg/server-shared';
import { BaseEntity } from '../entities/base.entity';
import '../upload-file-exception';

type TestEntity = BaseEntity & {
    name: string;
    count?: number;
};

const UUID_1 = '11111111-1111-4111-8111-111111111111';
const UUID_2 = '22222222-2222-4222-8222-222222222222';
const XLSX_MIME = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

const createSchema = z
    .object({
        name: z.string().min(1),
        count: z.coerce.number().optional(),
    })
    .strict();
const updateSchema = createSchema.partial();

const config = {
    resourceName: 'test',
    createSchema,
    updateSchema,
    xlsxColumns: [
        { key: 'id', readonly: true },
        { key: 'createdTime', readonly: true },
        { key: 'updatedTime', readonly: true },
        { key: 'name' },
        { key: 'count' },
    ],
} satisfies DatabaseResourceSchema<TestEntity, any, any>;

function createService() {
    return {
        save: rs.fn(async (input) =>
            Array.isArray(input)
                ? input.map((item, index) => ({ id: index === 0 ? UUID_1 : UUID_2, ...item }))
                : { id: UUID_1, ...input },
        ),
        update: rs.fn(async (id, data) => ({ affected: 1, id, data })),
        findOne: rs.fn(async () => ({ id: UUID_1, name: 'row' })),
        find: rs.fn(async () => [{ id: UUID_1, name: 'row', count: 2 }]),
    };
}

async function createXlsx(headers: string[], rows: unknown[][]) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('test');
    worksheet.addRow(headers);
    for (const row of rows) worksheet.addRow(row);
    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
}

async function createFile(headers: string[], rows: unknown[][]) {
    const buffer = await createXlsx(headers, rows);
    return {
        originalname: 'data.xlsx',
        mimetype: XLSX_MIME,
        size: buffer.length,
        buffer,
    };
}

describe('database dto and upload file helpers', () => {
    it('rejects missing or invalid XLSX files without relying on a global DTO pipe', () => {
        expect(() => validateXlsxFile(undefined)).toThrow(BadRequestException);
        expect(() =>
            validateXlsxFile({
                originalname: 'data.txt',
                mimetype: 'text/plain',
                size: 1,
                buffer: Buffer.from('x'),
            }),
        ).toThrow(BadRequestException);
    });

    it('parses object and array DTO schemas', () => {
        const query = LedgerPageRequestSchema.parse({
            current: '2',
            pageSize: '5',
            date: '2026-05-24',
        } as any);
        const rows = CasbinRuleBatchCreateRequestSchema.parse([
            {
                ptype: 'p',
                p0: 'a',
                p1: 'b',
                p2: 'c',
                p3: 'd',
                p4: 'e',
                p5: 'f',
            },
        ] as any) as any;

        expect(Object.getPrototypeOf(query)).toBe(Object.prototype);
        expect(query.current).toBe(2);
        expect(query.pageSize).toBe(5);
        expect(query.date).toBe('2026-05-24');
        expect(Array.isArray(rows)).toBe(true);
        expect(rows).toHaveLength(1);
    });

    it('rejects empty update dto input before controller logic runs', () => {
        expect(() => LedgerUpdateRequestSchema.parse({})).toThrow(z.ZodError);
        expect(() => LeetcodeProblemUpdateRequestSchema.parse({})).toThrow(z.ZodError);
    });

    it('uses page dto defaults to create page params', () => {
        const query = LedgerPageRequestSchema.parse({});
        const pageParam = new PageParam(query.current, query.pageSize);

        expect(pageParam).toEqual(new PageParam(1, 10));
    });

    it('imports XLSX create rows and rejects readonly headers', async () => {
        const service = createService();
        const file = await createFile(['name', 'count'], [['a', 3]]);

        const result = await importXlsx(service as any, config, file);

        expect(result).toMatchObject({
            count: 1,
            data: [{ id: UUID_1, name: 'a', count: 3 }],
        });
        expect(service.save).toHaveBeenCalledWith([{ name: 'a', count: 3 }]);

        const readonlyFile = await createFile(['id', 'name'], [[UUID_1, 'a']]);
        await expect(importXlsx(service as any, config, readonlyFile)).rejects.toBeInstanceOf(
            BadRequestException,
        );
    });

    it('imports XLSX update rows by id and ignores empty cells', async () => {
        const service = createService();
        const file = await createFile(['id', 'name', 'count'], [[UUID_1, 'next', '']]);

        const result = await importUpdateXlsx(service as any, config, file);

        expect(result).toEqual({ count: 1, ids: [UUID_1] });
        expect(service.update).toHaveBeenCalledWith(UUID_1, { name: 'next' });
    });

    it('rejects XLSX update rows without update data', async () => {
        const service = createService();
        const file = await createFile(['id', 'name'], [[UUID_1, '']]);

        await expect(importUpdateXlsx(service as any, config, file)).rejects.toBeInstanceOf(
            BadRequestException,
        );
    });

    it('exports XLSX rows with configured headers', async () => {
        const buffer = await createXlsxBuffer(
            [{ id: UUID_1, name: 'row', count: 2 } as TestEntity],
            config,
        );
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer as any);
        const worksheet = workbook.worksheets[0];

        expect(worksheet.getRow(1).values).toEqual([
            ,
            'id',
            'createdTime',
            'updatedTime',
            'name',
            'count',
        ]);
    });
});
