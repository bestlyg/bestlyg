import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import {
    type CasbinRuleBatchCreateRequestDto,
    CasbinRuleBatchCreateResponseSchema,
    type CasbinRuleBatchUpdateRequestDto,
    type CasbinRuleCreateRequestDto,
    CasbinRuleImportResponseSchema,
    CasbinRuleImportUpdateResponseSchema,
    CasbinRuleListResponseSchema,
    CasbinRulePageResponseSchema,
    CasbinRuleResponseSchema,
    type CasbinRuleUpdateRequestDto,
    CasbinRuleWriteResponseSchema,
    casbinRuleResourceSchema,
    createXlsxBuffer,
    type DatabaseBatchDeleteRequestDto,
    type DatabaseIdParamsRequestDto,
    type DatabaseXlsxFileRequestDto,
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
        return CasbinRuleListResponseSchema.parse(data as any);
    }

    async findPageAndCount(pageParam: PageParam, options: FindManyOptions<CasbinRule> = {}) {
        const pageOptions = {
            ...options,
            skip: pageParam.skip,
            take: pageParam.take,
        };
        const [list, total] = await this.repository.findAndCount(pageOptions);
        return CasbinRulePageResponseSchema.parse({ list, total } as any);
    }

    async findOne(options: FindOneOptions<CasbinRule>) {
        const data = await this.repository.findOne(options);
        return data ? CasbinRuleResponseSchema.parse(data as any) : null;
    }

    async save(body: CasbinRuleCreateRequestDto | CasbinRuleBatchCreateRequestDto) {
        const data = await this.repository.save(body as any);
        return Array.isArray(body)
            ? CasbinRuleBatchCreateResponseSchema.parse(data as any)
            : CasbinRuleResponseSchema.parse(data as any);
    }

    async importUpdateXlsx(file: DatabaseXlsxFileRequestDto) {
        const data = await importUpdateXlsx(this, casbinRuleResourceSchema, file);
        return CasbinRuleImportUpdateResponseSchema.parse(data as any);
    }

    async importXlsx(file: DatabaseXlsxFileRequestDto) {
        const data = await importXlsx(this, casbinRuleResourceSchema, file);
        return CasbinRuleImportResponseSchema.parse(data as any);
    }

    async exportXlsx(options: FindManyOptions<CasbinRule> = {}) {
        const data = await this.find(options);
        return createXlsxBuffer(data, casbinRuleResourceSchema);
    }

    async update(
        id: DatabaseIdParamsRequestDto['id'] | CasbinRuleBatchUpdateRequestDto['ids'],
        data: CasbinRuleUpdateRequestDto,
    ) {
        const result = await this.repository.update(id as any, data as any);
        return CasbinRuleWriteResponseSchema.parse(result as any);
    }

    async delete(id: DatabaseIdParamsRequestDto['id'] | DatabaseBatchDeleteRequestDto['ids']) {
        const result = await this.repository.delete(id as any);
        return CasbinRuleWriteResponseSchema.parse(result as any);
    }
}
