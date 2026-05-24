import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import {
    CasbinRuleBatchCreateRequestDto,
    CasbinRuleBatchCreateResponseDto,
    CasbinRuleBatchUpdateRequestDto,
    CasbinRuleCreateRequestDto,
    CasbinRuleImportResponseDto,
    CasbinRuleImportUpdateResponseDto,
    CasbinRuleListResponseDto,
    CasbinRulePageResponseDto,
    CasbinRuleResponseDto,
    CasbinRuleUpdateRequestDto,
    CasbinRuleWriteResponseDto,
    casbinRuleResourceSchema,
    createXlsxBuffer,
    DatabaseBatchDeleteRequestDto,
    DatabaseIdParamsRequestDto,
    DatabaseXlsxFileRequestDto,
    importUpdateXlsx,
    importXlsx,
    PageParam,
} from '@bestlyg/server-shared';
import { CasbinRule } from '../../entities';

@Injectable()
export class CasbinRuleService {
    constructor(
        @InjectRepository(CasbinRule)
        public readonly repository: Repository<CasbinRule>,
    ) {}

    async find(options: FindManyOptions<CasbinRule> = {}) {
        const data = await this.repository.find(options);
        return new CasbinRuleListResponseDto(data as any);
    }

    async findPageAndCount(pageParam: PageParam, options: FindManyOptions<CasbinRule> = {}) {
        const pageOptions = {
            ...options,
            skip: pageParam.skip,
            take: pageParam.take,
        };
        const [list, total] = await this.repository.findAndCount(pageOptions);
        return new CasbinRulePageResponseDto({ list, total } as any);
    }

    async findOne(options: FindOneOptions<CasbinRule>) {
        const data = await this.repository.findOne(options);
        return data ? new CasbinRuleResponseDto(data as any) : null;
    }

    async save(body: CasbinRuleCreateRequestDto | CasbinRuleBatchCreateRequestDto) {
        const data = await this.repository.save(body as any);
        return Array.isArray(body)
            ? new CasbinRuleBatchCreateResponseDto(data as any)
            : new CasbinRuleResponseDto(data as any);
    }

    async importUpdateXlsx(file: DatabaseXlsxFileRequestDto) {
        const data = await importUpdateXlsx(this, casbinRuleResourceSchema, file);
        return new CasbinRuleImportUpdateResponseDto(data as any);
    }

    async importXlsx(file: DatabaseXlsxFileRequestDto) {
        const data = await importXlsx(this, casbinRuleResourceSchema, file);
        return new CasbinRuleImportResponseDto(data as any);
    }

    async exportXlsx(options: FindManyOptions<CasbinRule> = {}) {
        const data = await this.find(options);
        return createXlsxBuffer(data, casbinRuleResourceSchema);
    }

    async update(
        id: DatabaseIdParamsRequestDto['id'] | CasbinRuleBatchUpdateRequestDto['ids'],
        data: CasbinRuleUpdateRequestDto | CasbinRuleBatchUpdateRequestDto['data'],
    ) {
        const result = await this.repository.update(id as any, data as any);
        return new CasbinRuleWriteResponseDto(result as any);
    }

    async delete(id: DatabaseIdParamsRequestDto['id'] | DatabaseBatchDeleteRequestDto['ids']) {
        const result = await this.repository.delete(id as any);
        return new CasbinRuleWriteResponseDto(result as any);
    }
}
