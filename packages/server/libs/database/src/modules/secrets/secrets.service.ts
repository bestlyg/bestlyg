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
    SecretsBatchCreateRequestDto,
    SecretsBatchCreateResponseDto,
    SecretsBatchUpdateRequestDto,
    SecretsCreateRequestDto,
    SecretsImportResponseDto,
    SecretsImportUpdateResponseDto,
    SecretsListResponseDto,
    SecretsPageResponseDto,
    SecretsResponseDto,
    SecretsUpdateRequestDto,
    SecretsWriteResponseDto,
    secretsResourceSchema,
} from '@bestlyg/server-shared';
import { Secrets } from '../../entities';

@Injectable()
export class SecretsService {
    constructor(
        @InjectRepository(Secrets)
        public readonly repository: Repository<Secrets>,
    ) {}

    async find(options: FindManyOptions<Secrets> = {}) {
        const data = await this.repository.find(options);
        return new SecretsListResponseDto(data as any);
    }

    async findPageAndCount(pageParam: PageParam, options: FindManyOptions<Secrets> = {}) {
        const pageOptions = {
            ...options,
            skip: pageParam.skip,
            take: pageParam.take,
        };
        const [list, total] = await this.repository.findAndCount(pageOptions);
        return new SecretsPageResponseDto({ list, total } as any);
    }

    async findOne(options: FindOneOptions<Secrets>) {
        const data = await this.repository.findOne(options);
        return data ? new SecretsResponseDto(data as any) : null;
    }

    async save(body: SecretsCreateRequestDto | SecretsBatchCreateRequestDto) {
        const data = await this.repository.save(body as any);
        return Array.isArray(body)
            ? new SecretsBatchCreateResponseDto(data as any)
            : new SecretsResponseDto(data as any);
    }

    async importUpdateXlsx(file: DatabaseXlsxFileRequestDto) {
        const data = await importUpdateXlsx(this, secretsResourceSchema, file);
        return new SecretsImportUpdateResponseDto(data as any);
    }

    async importXlsx(file: DatabaseXlsxFileRequestDto) {
        const data = await importXlsx(this, secretsResourceSchema, file);
        return new SecretsImportResponseDto(data as any);
    }

    async exportXlsx(options: FindManyOptions<Secrets> = {}) {
        const data = await this.find(options);
        return createXlsxBuffer(data, secretsResourceSchema);
    }

    async update(
        id: DatabaseIdParamsRequestDto['id'] | SecretsBatchUpdateRequestDto['ids'],
        data: SecretsUpdateRequestDto | SecretsBatchUpdateRequestDto['data'],
    ) {
        const result = await this.repository.update(id as any, data as any);
        return new SecretsWriteResponseDto(result as any);
    }

    async delete(id: DatabaseIdParamsRequestDto['id'] | DatabaseBatchDeleteRequestDto['ids']) {
        const result = await this.repository.delete(id as any);
        return new SecretsWriteResponseDto(result as any);
    }
}
