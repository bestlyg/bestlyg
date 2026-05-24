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
    XuanBatchCreateRequestDto,
    XuanBatchCreateResponseDto,
    XuanBatchUpdateRequestDto,
    XuanCreateRequestDto,
    XuanImportResponseDto,
    XuanImportUpdateResponseDto,
    XuanListResponseDto,
    XuanPageResponseDto,
    XuanResponseDto,
    XuanUpdateRequestDto,
    XuanWriteResponseDto,
    xuanResourceSchema,
} from '@bestlyg/server-shared';
import { Xuan } from '../../entities';

@Injectable()
export class XuanService {
    constructor(
        @InjectRepository(Xuan)
        public readonly repository: Repository<Xuan>,
    ) {}

    async find(options: FindManyOptions<Xuan> = {}) {
        const data = await this.repository.find(options);
        return new XuanListResponseDto(data as any);
    }

    async findPageAndCount(pageParam: PageParam, options: FindManyOptions<Xuan> = {}) {
        const pageOptions = {
            ...options,
            skip: pageParam.skip,
            take: pageParam.take,
        };
        const [list, total] = await this.repository.findAndCount(pageOptions);
        return new XuanPageResponseDto({ list, total } as any);
    }

    async findOne(options: FindOneOptions<Xuan>) {
        const data = await this.repository.findOne(options);
        return data ? new XuanResponseDto(data as any) : null;
    }

    async save(body: XuanCreateRequestDto | XuanBatchCreateRequestDto) {
        const data = await this.repository.save(body as any);
        return Array.isArray(body)
            ? new XuanBatchCreateResponseDto(data as any)
            : new XuanResponseDto(data as any);
    }

    async importUpdateXlsx(file: DatabaseXlsxFileRequestDto) {
        const data = await importUpdateXlsx(this, xuanResourceSchema, file);
        return new XuanImportUpdateResponseDto(data as any);
    }

    async importXlsx(file: DatabaseXlsxFileRequestDto) {
        const data = await importXlsx(this, xuanResourceSchema, file);
        return new XuanImportResponseDto(data as any);
    }

    async exportXlsx(options: FindManyOptions<Xuan> = {}) {
        const data = await this.find(options);
        return createXlsxBuffer(data, xuanResourceSchema);
    }

    async update(
        id: DatabaseIdParamsRequestDto['id'] | XuanBatchUpdateRequestDto['ids'],
        data: XuanUpdateRequestDto | XuanBatchUpdateRequestDto['data'],
    ) {
        const result = await this.repository.update(id as any, data as any);
        return new XuanWriteResponseDto(result as any);
    }

    async delete(id: DatabaseIdParamsRequestDto['id'] | DatabaseBatchDeleteRequestDto['ids']) {
        const result = await this.repository.delete(id as any);
        return new XuanWriteResponseDto(result as any);
    }
}
