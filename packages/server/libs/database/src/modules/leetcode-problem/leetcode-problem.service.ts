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
    type LeetcodeProblemBatchCreateRequestDto,
    LeetcodeProblemBatchCreateResponseSchema,
    type LeetcodeProblemBatchUpdateRequestDto,
    type LeetcodeProblemCreateRequestDto,
    LeetcodeProblemImportResponseSchema,
    LeetcodeProblemImportUpdateResponseSchema,
    LeetcodeProblemListResponseSchema,
    LeetcodeProblemPageResponseSchema,
    LeetcodeProblemResponseSchema,
    leetcodeProblemResourceSchema,
    type LeetcodeProblemUpdateRequestDto,
    LeetcodeProblemWriteResponseSchema,
    PageParam,
} from '@bestlyg/server-shared';
import { LeetcodeProblem } from '../../entities';

@Injectable()
export class LeetcodeProblemService {
    constructor(
        @InjectRepository(LeetcodeProblem)
        public readonly repository: Repository<LeetcodeProblem>,
    ) {}

    async find(options: FindManyOptions<LeetcodeProblem> = {}) {
        const data = await this.repository.find(options);
        return LeetcodeProblemListResponseSchema.parse(data as any);
    }

    async findPageAndCount(pageParam: PageParam, options: FindManyOptions<LeetcodeProblem> = {}) {
        const pageOptions = {
            ...options,
            skip: pageParam.skip,
            take: pageParam.take,
        };
        const [list, total] = await this.repository.findAndCount(pageOptions);
        return LeetcodeProblemPageResponseSchema.parse({ list, total } as any);
    }

    async findOne(options: FindOneOptions<LeetcodeProblem>) {
        const data = await this.repository.findOne(options);
        return data ? LeetcodeProblemResponseSchema.parse(data as any) : null;
    }

    async save(body: LeetcodeProblemCreateRequestDto | LeetcodeProblemBatchCreateRequestDto) {
        const data = await this.repository.save(body as any);
        return Array.isArray(body)
            ? LeetcodeProblemBatchCreateResponseSchema.parse(data as any)
            : LeetcodeProblemResponseSchema.parse(data as any);
    }

    async importUpdateXlsx(file: DatabaseXlsxFileRequestDto) {
        const data = await importUpdateXlsx(this, leetcodeProblemResourceSchema, file);
        return LeetcodeProblemImportUpdateResponseSchema.parse(data as any);
    }

    async importXlsx(file: DatabaseXlsxFileRequestDto) {
        const data = await importXlsx(this, leetcodeProblemResourceSchema, file);
        return LeetcodeProblemImportResponseSchema.parse(data as any);
    }

    async exportXlsx(options: FindManyOptions<LeetcodeProblem> = {}) {
        const data = await this.find(options);
        return createXlsxBuffer(data, leetcodeProblemResourceSchema);
    }

    async update(
        id: DatabaseIdParamsRequestDto['id'] | LeetcodeProblemBatchUpdateRequestDto['ids'],
        data: LeetcodeProblemUpdateRequestDto,
    ) {
        const result = await this.repository.update(id as any, data as any);
        return LeetcodeProblemWriteResponseSchema.parse(result as any);
    }

    async delete(id: DatabaseIdParamsRequestDto['id'] | DatabaseBatchDeleteRequestDto['ids']) {
        const result = await this.repository.delete(id as any);
        return LeetcodeProblemWriteResponseSchema.parse(result as any);
    }
}
