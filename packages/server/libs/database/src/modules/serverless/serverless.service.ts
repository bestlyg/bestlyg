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
    PageParam,
    ServerlessBatchCreateRequestDto,
    ServerlessBatchCreateResponseDto,
    ServerlessBatchUpdateRequestDto,
    ServerlessCreateRequestDto,
    ServerlessImportResponseDto,
    ServerlessImportUpdateResponseDto,
    ServerlessListResponseDto,
    ServerlessPageResponseDto,
    ServerlessResponseDto,
    ServerlessUpdateRequestDto,
    ServerlessWriteResponseDto,
    serverlessResourceSchema,
} from '@bestlyg/server-shared';
import { Serverless } from '../../entities';

@Injectable()
export class ServerlessService {
    constructor(
        @InjectRepository(Serverless)
        public readonly repository: Repository<Serverless>,
    ) {}

    async find(options: FindManyOptions<Serverless> = {}) {
        const data = await this.repository.find(options);
        return new ServerlessListResponseDto(data as any);
    }

    async findPageAndCount(pageParam: PageParam, options: FindManyOptions<Serverless> = {}) {
        const pageOptions = {
            ...options,
            skip: pageParam.skip,
            take: pageParam.take,
        };
        const [list, total] = await this.repository.findAndCount(pageOptions);
        return new ServerlessPageResponseDto({ list, total } as any);
    }

    async findOne(options: FindOneOptions<Serverless>) {
        const data = await this.repository.findOne(options);
        return data ? new ServerlessResponseDto(data as any) : null;
    }

    async save(body: ServerlessCreateRequestDto | ServerlessBatchCreateRequestDto) {
        const data = await this.repository.save(body as any);
        return Array.isArray(body)
            ? new ServerlessBatchCreateResponseDto(data as any)
            : new ServerlessResponseDto(data as any);
    }

    async importUpdateXlsx(file: DatabaseXlsxFileRequestDto) {
        const data = await importUpdateXlsx(this, serverlessResourceSchema, file);
        return new ServerlessImportUpdateResponseDto(data as any);
    }

    async importXlsx(file: DatabaseXlsxFileRequestDto) {
        const data = await importXlsx(this, serverlessResourceSchema, file);
        return new ServerlessImportResponseDto(data as any);
    }

    async exportXlsx(options: FindManyOptions<Serverless> = {}) {
        const data = await this.find(options);
        return createXlsxBuffer(data, serverlessResourceSchema);
    }

    async update(
        id: DatabaseIdParamsRequestDto['id'] | ServerlessBatchUpdateRequestDto['ids'],
        data: ServerlessUpdateRequestDto | ServerlessBatchUpdateRequestDto['data'],
    ) {
        const result = await this.repository.update(id as any, data as any);
        return new ServerlessWriteResponseDto(result as any);
    }

    async delete(id: DatabaseIdParamsRequestDto['id'] | DatabaseBatchDeleteRequestDto['ids']) {
        const result = await this.repository.delete(id as any);
        return new ServerlessWriteResponseDto(result as any);
    }
}
