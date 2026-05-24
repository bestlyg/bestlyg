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
    LeetcodeSolutionBatchCreateRequestDto,
    LeetcodeSolutionBatchCreateResponseDto,
    LeetcodeSolutionBatchUpdateRequestDto,
    LeetcodeSolutionCreateRequestDto,
    LeetcodeSolutionImportResponseDto,
    LeetcodeSolutionImportUpdateResponseDto,
    LeetcodeSolutionListResponseDto,
    LeetcodeSolutionPageResponseDto,
    LeetcodeSolutionResponseDto,
    leetcodeSolutionResourceSchema,
    LeetcodeSolutionUpdateRequestDto,
    LeetcodeSolutionWriteResponseDto,
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
        return new LeetcodeSolutionListResponseDto(data as any);
    }

    async findPageAndCount(pageParam: PageParam, options: FindManyOptions<LeetcodeSolution> = {}) {
        const pageOptions = {
            ...options,
            skip: pageParam.skip,
            take: pageParam.take,
        };
        const [list, total] = await this.repository.findAndCount(pageOptions);
        return new LeetcodeSolutionPageResponseDto({ list, total } as any);
    }

    async findOne(options: FindOneOptions<LeetcodeSolution>) {
        const data = await this.repository.findOne(options);
        return data ? new LeetcodeSolutionResponseDto(data as any) : null;
    }

    async save(body: LeetcodeSolutionCreateRequestDto | LeetcodeSolutionBatchCreateRequestDto) {
        const data = await this.repository.save(body as any);
        return Array.isArray(body)
            ? new LeetcodeSolutionBatchCreateResponseDto(data as any)
            : new LeetcodeSolutionResponseDto(data as any);
    }

    async importUpdateXlsx(file: DatabaseXlsxFileRequestDto) {
        const data = await importUpdateXlsx(this, leetcodeSolutionResourceSchema, file);
        return new LeetcodeSolutionImportUpdateResponseDto(data as any);
    }

    async importXlsx(file: DatabaseXlsxFileRequestDto) {
        const data = await importXlsx(this, leetcodeSolutionResourceSchema, file);
        return new LeetcodeSolutionImportResponseDto(data as any);
    }

    async exportXlsx(options: FindManyOptions<LeetcodeSolution> = {}) {
        const data = await this.find(options);
        return createXlsxBuffer(data, leetcodeSolutionResourceSchema);
    }

    async update(
        id: DatabaseIdParamsRequestDto['id'] | LeetcodeSolutionBatchUpdateRequestDto['ids'],
        data: LeetcodeSolutionUpdateRequestDto | LeetcodeSolutionBatchUpdateRequestDto['data'],
    ) {
        const result = await this.repository.update(id as any, data as any);
        return new LeetcodeSolutionWriteResponseDto(result as any);
    }

    async delete(id: DatabaseIdParamsRequestDto['id'] | DatabaseBatchDeleteRequestDto['ids']) {
        const result = await this.repository.delete(id as any);
        return new LeetcodeSolutionWriteResponseDto(result as any);
    }
}
