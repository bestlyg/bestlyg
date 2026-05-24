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
    LeetcodeProblemBatchCreateRequestDto,
    LeetcodeProblemBatchCreateResponseDto,
    LeetcodeProblemBatchUpdateRequestDto,
    LeetcodeProblemCreateRequestDto,
    LeetcodeProblemImportResponseDto,
    LeetcodeProblemImportUpdateResponseDto,
    LeetcodeProblemListResponseDto,
    LeetcodeProblemPageResponseDto,
    LeetcodeProblemResponseDto,
    leetcodeProblemResourceSchema,
    LeetcodeProblemUpdateRequestDto,
    LeetcodeProblemWriteResponseDto,
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
        return new LeetcodeProblemListResponseDto(data as any);
    }

    async findPageAndCount(pageParam: PageParam, options: FindManyOptions<LeetcodeProblem> = {}) {
        const pageOptions = {
            ...options,
            skip: pageParam.skip,
            take: pageParam.take,
        };
        const [list, total] = await this.repository.findAndCount(pageOptions);
        return new LeetcodeProblemPageResponseDto({ list, total } as any);
    }

    async findOne(options: FindOneOptions<LeetcodeProblem>) {
        const data = await this.repository.findOne(options);
        return data ? new LeetcodeProblemResponseDto(data as any) : null;
    }

    async save(body: LeetcodeProblemCreateRequestDto | LeetcodeProblemBatchCreateRequestDto) {
        const data = await this.repository.save(body as any);
        return Array.isArray(body)
            ? new LeetcodeProblemBatchCreateResponseDto(data as any)
            : new LeetcodeProblemResponseDto(data as any);
    }

    async importUpdateXlsx(file: DatabaseXlsxFileRequestDto) {
        const data = await importUpdateXlsx(this, leetcodeProblemResourceSchema, file);
        return new LeetcodeProblemImportUpdateResponseDto(data as any);
    }

    async importXlsx(file: DatabaseXlsxFileRequestDto) {
        const data = await importXlsx(this, leetcodeProblemResourceSchema, file);
        return new LeetcodeProblemImportResponseDto(data as any);
    }

    async exportXlsx(options: FindManyOptions<LeetcodeProblem> = {}) {
        const data = await this.find(options);
        return createXlsxBuffer(data, leetcodeProblemResourceSchema);
    }

    async update(
        id: DatabaseIdParamsRequestDto['id'] | LeetcodeProblemBatchUpdateRequestDto['ids'],
        data: LeetcodeProblemUpdateRequestDto | LeetcodeProblemBatchUpdateRequestDto['data'],
    ) {
        const result = await this.repository.update(id as any, data as any);
        return new LeetcodeProblemWriteResponseDto(result as any);
    }

    async delete(id: DatabaseIdParamsRequestDto['id'] | DatabaseBatchDeleteRequestDto['ids']) {
        const result = await this.repository.delete(id as any);
        return new LeetcodeProblemWriteResponseDto(result as any);
    }
}
