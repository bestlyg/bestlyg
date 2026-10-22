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
    PageParam,
    type ServerlessBatchCreateRequestDto,
    ServerlessBatchCreateResponseSchema,
    type ServerlessBatchUpdateRequestDto,
    type ServerlessCreateRequestDto,
    ServerlessImportResponseSchema,
    ServerlessImportUpdateResponseSchema,
    ServerlessListResponseSchema,
    ServerlessPageResponseSchema,
    ServerlessResponseSchema,
    type ServerlessUpdateRequestDto,
    ServerlessWriteResponseSchema,
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
        return ServerlessListResponseSchema.parse(data as any);
    }

    async findPageAndCount(pageParam: PageParam, options: FindManyOptions<Serverless> = {}) {
        const pageOptions = {
            ...options,
            skip: pageParam.skip,
            take: pageParam.take,
        };
        const [list, total] = await this.repository.findAndCount(pageOptions);
        return ServerlessPageResponseSchema.parse({ list, total } as any);
    }

    async findOne(options: FindOneOptions<Serverless>) {
        const data = await this.repository.findOne(options);
        return data ? ServerlessResponseSchema.parse(data as any) : null;
    }

    async save(body: ServerlessCreateRequestDto | ServerlessBatchCreateRequestDto) {
        const data = await this.repository.save(body as any);
        return Array.isArray(body)
            ? ServerlessBatchCreateResponseSchema.parse(data as any)
            : ServerlessResponseSchema.parse(data as any);
    }

    async importUpdateXlsx(file: DatabaseXlsxFileRequestDto) {
        const data = await importUpdateXlsx(this, serverlessResourceSchema, file);
        return ServerlessImportUpdateResponseSchema.parse(data as any);
    }

    async importXlsx(file: DatabaseXlsxFileRequestDto) {
        const data = await importXlsx(this, serverlessResourceSchema, file);
        return ServerlessImportResponseSchema.parse(data as any);
    }

    async exportXlsx(options: FindManyOptions<Serverless> = {}) {
        const data = await this.find(options);
        return createXlsxBuffer(data, serverlessResourceSchema);
    }

    async update(
        id: DatabaseIdParamsRequestDto['id'] | ServerlessBatchUpdateRequestDto['ids'],
        data: ServerlessUpdateRequestDto,
    ) {
        const result = await this.repository.update(id as any, data as any);
        return ServerlessWriteResponseSchema.parse(result as any);
    }

    async delete(id: DatabaseIdParamsRequestDto['id'] | DatabaseBatchDeleteRequestDto['ids']) {
        const result = await this.repository.delete(id as any);
        return ServerlessWriteResponseSchema.parse(result as any);
    }
}
