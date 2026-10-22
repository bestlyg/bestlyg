import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import {
    createXlsxBuffer,
    type DatabaseBatchDeleteRequestDto,
    type DatabaseIdParamsRequestDto,
    type DatabaseXlsxFileRequestDto,
    importUpdateXlsx,
    importXlsx,
    type LedgerBatchCreateRequestDto,
    LedgerBatchCreateResponseSchema,
    type LedgerBatchUpdateRequestDto,
    type LedgerCreateRequestDto,
    LedgerImportResponseSchema,
    LedgerImportUpdateResponseSchema,
    LedgerListResponseSchema,
    LedgerPageResponseSchema,
    LedgerResponseSchema,
    ledgerResourceSchema,
    type LedgerUpdateRequestDto,
    LedgerWriteResponseSchema,
    PageParam,
} from '@bestlyg/server-shared';
import { Ledger } from '../../entities';

@Injectable()
export class LedgerService {
    constructor(
        @InjectRepository(Ledger)
        public readonly repository: Repository<Ledger>,
    ) {}

    async find(options: FindManyOptions<Ledger> = {}) {
        const data = await this.repository.find(options);
        return LedgerListResponseSchema.parse(data as any);
    }

    async findPageAndCount(pageParam: PageParam, options: FindManyOptions<Ledger> = {}) {
        const pageOptions = {
            ...options,
            skip: pageParam.skip,
            take: pageParam.take,
        };
        const [list, total] = await this.repository.findAndCount(pageOptions);
        return LedgerPageResponseSchema.parse({ list, total } as any);
    }

    async findOne(options: FindOneOptions<Ledger>) {
        const data = await this.repository.findOne(options);
        return data ? LedgerResponseSchema.parse(data as any) : null;
    }

    async save(body: LedgerCreateRequestDto | LedgerBatchCreateRequestDto) {
        const data = await this.repository.save(body as any);
        return Array.isArray(body)
            ? LedgerBatchCreateResponseSchema.parse(data as any)
            : LedgerResponseSchema.parse(data as any);
    }

    async importUpdateXlsx(file: DatabaseXlsxFileRequestDto) {
        const data = await importUpdateXlsx(this, ledgerResourceSchema, file);
        return LedgerImportUpdateResponseSchema.parse(data as any);
    }

    async importXlsx(file: DatabaseXlsxFileRequestDto) {
        const data = await importXlsx(this, ledgerResourceSchema, file);
        return LedgerImportResponseSchema.parse(data as any);
    }

    async exportXlsx(options: FindManyOptions<Ledger> = {}) {
        const data = await this.find(options);
        return createXlsxBuffer(data, ledgerResourceSchema);
    }

    async update(
        id: DatabaseIdParamsRequestDto['id'] | LedgerBatchUpdateRequestDto['ids'],
        data: LedgerUpdateRequestDto,
    ) {
        const result = await this.repository.update(id as any, data as any);
        return LedgerWriteResponseSchema.parse(result as any);
    }

    async delete(id: DatabaseIdParamsRequestDto['id'] | DatabaseBatchDeleteRequestDto['ids']) {
        const result = await this.repository.delete(id as any);
        return LedgerWriteResponseSchema.parse(result as any);
    }
}
