import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import {
    createXlsxBuffer,
    DatabaseBatchDeleteRequestDto,
    DatabaseIdParamsRequestDto,
    DatabaseXlsxFileRequestDto,
    importUpdateXlsx,
    importXlsx,
    LedgerBatchCreateRequestDto,
    LedgerBatchCreateResponseDto,
    LedgerBatchUpdateRequestDto,
    LedgerCreateRequestDto,
    LedgerImportResponseDto,
    LedgerImportUpdateResponseDto,
    LedgerListResponseDto,
    LedgerPageResponseDto,
    LedgerResponseDto,
    ledgerResourceSchema,
    LedgerUpdateRequestDto,
    LedgerWriteResponseDto,
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
        return new LedgerListResponseDto(data as any);
    }

    async findPageAndCount(pageParam: PageParam, options: FindManyOptions<Ledger> = {}) {
        const pageOptions = {
            ...options,
            skip: pageParam.skip,
            take: pageParam.take,
        };
        const [list, total] = await this.repository.findAndCount(pageOptions);
        return new LedgerPageResponseDto({ list, total } as any);
    }

    async findOne(options: FindOneOptions<Ledger>) {
        const data = await this.repository.findOne(options);
        return data ? new LedgerResponseDto(data as any) : null;
    }

    async save(body: LedgerCreateRequestDto | LedgerBatchCreateRequestDto) {
        const data = await this.repository.save(body as any);
        return Array.isArray(body)
            ? new LedgerBatchCreateResponseDto(data as any)
            : new LedgerResponseDto(data as any);
    }

    async importUpdateXlsx(file: DatabaseXlsxFileRequestDto) {
        const data = await importUpdateXlsx(this, ledgerResourceSchema, file);
        return new LedgerImportUpdateResponseDto(data as any);
    }

    async importXlsx(file: DatabaseXlsxFileRequestDto) {
        const data = await importXlsx(this, ledgerResourceSchema, file);
        return new LedgerImportResponseDto(data as any);
    }

    async exportXlsx(options: FindManyOptions<Ledger> = {}) {
        const data = await this.find(options);
        return createXlsxBuffer(data, ledgerResourceSchema);
    }

    async update(
        id: DatabaseIdParamsRequestDto['id'] | LedgerBatchUpdateRequestDto['ids'],
        data: LedgerUpdateRequestDto | LedgerBatchUpdateRequestDto['data'],
    ) {
        const result = await this.repository.update(id as any, data as any);
        return new LedgerWriteResponseDto(result as any);
    }

    async delete(id: DatabaseIdParamsRequestDto['id'] | DatabaseBatchDeleteRequestDto['ids']) {
        const result = await this.repository.delete(id as any);
        return new LedgerWriteResponseDto(result as any);
    }
}
