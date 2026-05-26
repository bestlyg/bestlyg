import {
    DatabaseIdParamsRequestDto,
    DatabaseXlsxFileRequestDto,
    DatabaseXlsxImportResponseDto,
    DatabaseXlsxUpdateResponseDto,
    maxXlsxSize,
    xlsxMime,
} from '@bestlyg/core-shared';
import type {
    DatabaseResourceSchema,
    DatabaseXlsxExportResponse,
    DatabaseXlsxFileRequest,
    DatabaseXlsxImportResponse,
    DatabaseXlsxUpdateResponse,
    XlsxColumn,
} from '@bestlyg/core-shared';
import ExcelJS from 'exceljs';
import { z } from 'zod';

export const MAX_XLSX_SIZE = maxXlsxSize;
export const XLSX_MIME = xlsxMime;

type XlsxMode = 'create' | 'update';
type UploadFileBadRequestFactory = (message: string) => Error;

let uploadFileBadRequestFactory: UploadFileBadRequestFactory = (message) => {
    const error = new Error(message);
    error.name = 'BadRequestException';
    return error;
};

export interface XlsxImportService<Entity extends object> {
    save(input: any): Promise<Entity | Entity[]>;
}

export interface XlsxUpdateService {
    update(id: string, data: any): Promise<unknown>;
}

export interface XlsxExportService<Entity extends object, Options = unknown> {
    find(options: Options): Promise<Entity[]>;
}

export interface XlsxResponseLike {
    setHeader(name: string, value: string): unknown;
    status(code: number): { send(body: Buffer): unknown };
}

export function setUploadFileBadRequestFactory(factory: UploadFileBadRequestFactory) {
    uploadFileBadRequestFactory = factory;
}

export function validateXlsxFile(file: DatabaseXlsxFileRequest | undefined) {
    if (!file) throw createBadRequestException('请上传 XLSX 文件');
    try {
        return new DatabaseXlsxFileRequestDto(file);
    } catch (error) {
        throw createBadRequestException((error as any)?.message ?? '文件校验失败');
    }
}

export async function importXlsx<Entity extends object>(
    service: XlsxImportService<Entity>,
    config: DatabaseResourceSchema<Entity, any, any>,
    file: DatabaseXlsxFileRequest,
): Promise<DatabaseXlsxImportResponse<Entity>> {
    validateXlsxFile(file);
    const rows = await readXlsxRows(file, config, 'create');
    const data = validateWithSchema(
        rows.map((row) => row.data),
        z.array(config.createSchema).min(1),
        'XLSX 数据行',
    );
    const saved = (await service.save(data as any)) as Entity[];
    return new DatabaseXlsxImportResponseDto({
        count: saved.length,
        data: saved,
    }).modelDump() as DatabaseXlsxImportResponse<Entity>;
}

export async function importUpdateXlsx<Entity extends object>(
    service: XlsxUpdateService,
    config: DatabaseResourceSchema<Entity, any, any>,
    file: DatabaseXlsxFileRequest,
): Promise<DatabaseXlsxUpdateResponse> {
    validateXlsxFile(file);
    const rows = await readXlsxRows(file, config, 'update');
    const parsedRows = rows.map((row) => {
        const id = validateWithSchema(
            { id: row.data.id },
            DatabaseIdParamsRequestDto.getSchema(),
            `XLSX 第 ${row.rowNumber} 行 id`,
        ).id;
        const { id: _, ...data } = row.data;
        const updateData = validateWithSchema(
            data,
            config.updateSchema,
            `XLSX 第 ${row.rowNumber} 行`,
        );
        if (!Object.keys(updateData).length) {
            throw createBadRequestException(`XLSX 第 ${row.rowNumber} 行没有可更新的数据`);
        }
        return { id, data: updateData };
    });

    for (const row of parsedRows) {
        await service.update(row.id, row.data as any);
    }

    return new DatabaseXlsxUpdateResponseDto({
        count: parsedRows.length,
        ids: parsedRows.map((row) => row.id),
    }).modelDump();
}

export async function createXlsxBuffer<Entity extends object>(
    data: Entity[],
    config: DatabaseResourceSchema<Entity, any, any>,
): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(config.resourceName);
    const columns = config.xlsxColumns.filter((column) => column.exportable !== false);

    worksheet.columns = columns.map((column) => ({
        header: column.header ?? column.key,
        key: column.key,
        width: column.width ?? Math.max((column.header ?? column.key).length + 4, 12),
    }));

    for (const entity of data) {
        const row: Record<string, unknown> = {};
        for (const column of columns) {
            const value = (entity as any)[column.key];
            row[column.key] = column.format ? column.format(value, entity) : formatCellValue(value);
        }
        worksheet.addRow(row);
    }

    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
}

export async function exportXlsx<Entity extends object, Options>(
    service: XlsxExportService<Entity, Options>,
    config: DatabaseResourceSchema<Entity, any, any>,
    options: Options,
): Promise<Buffer> {
    const data = await service.find(options);
    return createXlsxBuffer(data, config);
}

export function sendXlsxResponse(
    res: XlsxResponseLike,
    output: DatabaseXlsxExportResponse,
    buffer: Buffer,
) {
    res.setHeader('Content-Type', output.contentType);
    res.setHeader(
        'Content-Disposition',
        `attachment; filename="${encodeURIComponent(output.filename)}"`,
    );
    res.status(200).send(buffer);
}

async function readXlsxRows<Entity extends object>(
    file: DatabaseXlsxFileRequest,
    config: DatabaseResourceSchema<Entity, any, any>,
    mode: XlsxMode,
) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file.buffer as any);
    const worksheet = workbook.worksheets[0];
    if (!worksheet) throw createBadRequestException('XLSX 文件至少需要包含一个工作表');

    const columns = getColumnMap(config.xlsxColumns, mode);
    const headerRow = worksheet.getRow(1);
    const headers: Array<{ key: string; columnIndex: number; column: XlsxColumn<Entity> }> = [];
    const seen = new Set<string>();

    headerRow.eachCell((cell, columnIndex) => {
        const header = normalizeCellValue(cell.value)?.toString().trim() ?? '';
        if (!header) return;
        const column = columns.get(header);
        if (!column) throw createBadRequestException(`未识别的 XLSX 表头：${header}`);
        if (seen.has(column.key)) throw createBadRequestException(`XLSX 表头重复：${header}`);
        seen.add(column.key);
        headers.push({ key: column.key, columnIndex, column });
    });

    if (!headers.length) throw createBadRequestException('XLSX 文件必须包含表头行');

    const rows: Array<{ rowNumber: number; data: Record<string, unknown> }> = [];
    for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
        const row = worksheet.getRow(rowNumber);
        const data: Record<string, unknown> = {};

        for (const header of headers) {
            const value = normalizeCellValue(row.getCell(header.columnIndex).value);
            if (isEmptyCell(value)) continue;
            data[header.key] = header.column.parse ? header.column.parse(value) : value;
        }

        if (!Object.keys(data).length) continue;
        if (mode === 'update' && !data.id) {
            throw createBadRequestException(`XLSX 第 ${rowNumber} 行缺少 id`);
        }
        rows.push({ rowNumber, data });
    }

    if (!rows.length) throw createBadRequestException('XLSX 文件没有数据行');
    return rows;
}

function getColumnMap<Entity extends object>(xlsxColumns: XlsxColumn<Entity>[], mode: XlsxMode) {
    const allowed = new Map<string, XlsxColumn<Entity>>();

    for (const column of xlsxColumns) {
        const header = column.header ?? column.key;
        const readonly = column.readonly || ['createdTime', 'updatedTime'].includes(column.key);
        if (column.importable === false) continue;
        if (mode === 'create' && (readonly || column.key === 'id')) continue;
        if (mode === 'update' && column.key !== 'id' && readonly) continue;
        allowed.set(header, column);
    }

    return allowed;
}

function normalizeCellValue(value: ExcelJS.CellValue): unknown {
    if (value == null) return undefined;
    if (value instanceof Date) return value;
    if (typeof value !== 'object') return value;
    if ('text' in value) return value.text;
    if ('richText' in value) return value.richText.map((item) => item.text).join('');
    if ('result' in value) return value.result;
    return value;
}

function formatCellValue(value: unknown) {
    if (value instanceof Date) return value;
    if (Array.isArray(value) || (value && typeof value === 'object')) {
        return JSON.stringify(value);
    }
    return value;
}

function isEmptyCell(value: unknown) {
    return value === undefined || value === null || value === '';
}

function validateWithSchema<T>(value: unknown, schema: z.ZodType<T>, label: string): T {
    const result = schema.safeParse(value);
    if (result.success) return result.data;
    throw createBadRequestException(`${label} 校验失败\n${z.prettifyError(result.error)}`);
}

function createBadRequestException(message: string) {
    return uploadFileBadRequestFactory(message);
}
