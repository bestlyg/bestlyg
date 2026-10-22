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
    type LeetcodeSolutionBatchCreateRequestDto,
    LeetcodeSolutionBatchCreateResponseSchema,
    type LeetcodeSolutionBatchUpdateRequestDto,
    type LeetcodeSolutionCreateRequestDto,
    LeetcodeSolutionImportResponseSchema,
    LeetcodeSolutionImportUpdateResponseSchema,
    LeetcodeSolutionListResponseSchema,
    LeetcodeSolutionPageResponseSchema,
    LeetcodeSolutionResponseSchema,
    leetcodeSolutionResourceSchema,
    type LeetcodeSolutionUpdateRequestDto,
    LeetcodeSolutionWriteResponseSchema,
    PageParam,
} from '@bestlyg/server-shared';
import { LeetcodeSolution } from '../../entities';

@Injectable()
export class LeetcodeSolutionService {
    constructor(
        @InjectRepository(LeetcodeSolution)
        public readonly repository: Repository<LeetcodeSolution>,
    ) {}

    async find(options: FindManyOptions<LeetcodeSolution> = {}) {
        const data = await this.repository.find(options);
        return LeetcodeSolutionListResponseSchema.parse(data as any);
    }

    async findPageAndCount(pageParam: PageParam, options: FindManyOptions<LeetcodeSolution> = {}) {
        const pageOptions = {
            ...options,
            skip: pageParam.skip,
            take: pageParam.take,
        };
        const [list, total] = await this.repository.findAndCount(pageOptions);
        return LeetcodeSolutionPageResponseSchema.parse({ list, total } as any);
    }

    async findOne(options: FindOneOptions<LeetcodeSolution>) {
        const data = await this.repository.findOne(options);
        return data ? LeetcodeSolutionResponseSchema.parse(data as any) : null;
    }

    async save(body: LeetcodeSolutionCreateRequestDto | LeetcodeSolutionBatchCreateRequestDto) {
        const data = await this.repository.save(body as any);
        return Array.isArray(body)
            ? LeetcodeSolutionBatchCreateResponseSchema.parse(data as any)
            : LeetcodeSolutionResponseSchema.parse(data as any);
    }

    async importUpdateXlsx(file: DatabaseXlsxFileRequestDto) {
        const data = await importUpdateXlsx(this, leetcodeSolutionResourceSchema, file);
        return LeetcodeSolutionImportUpdateResponseSchema.parse(data as any);
    }

    async importXlsx(file: DatabaseXlsxFileRequestDto) {
        const data = await importXlsx(this, leetcodeSolutionResourceSchema, file);
        return LeetcodeSolutionImportResponseSchema.parse(data as any);
    }

    async exportXlsx(options: FindManyOptions<LeetcodeSolution> = {}) {
        const data = await this.find(options);
        return createXlsxBuffer(data, leetcodeSolutionResourceSchema);
    }

    async update(
        id: DatabaseIdParamsRequestDto['id'] | LeetcodeSolutionBatchUpdateRequestDto['ids'],
        data: LeetcodeSolutionUpdateRequestDto,
    ) {
        const result = await this.repository.update(id as any, data as any);
        return LeetcodeSolutionWriteResponseSchema.parse(result as any);
    }

    async delete(id: DatabaseIdParamsRequestDto['id'] | DatabaseBatchDeleteRequestDto['ids']) {
        const result = await this.repository.delete(id as any);
        return LeetcodeSolutionWriteResponseSchema.parse(result as any);
    }
}
