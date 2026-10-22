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
    type XuanBatchCreateRequestDto,
    XuanBatchCreateResponseSchema,
    type XuanBatchUpdateRequestDto,
    type XuanCreateRequestDto,
    XuanImportResponseSchema,
    XuanImportUpdateResponseSchema,
    XuanListResponseSchema,
    XuanPageResponseSchema,
    XuanResponseSchema,
    type XuanUpdateRequestDto,
    XuanWriteResponseSchema,
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
        return XuanListResponseSchema.parse(data as any);
    }

    async findPageAndCount(pageParam: PageParam, options: FindManyOptions<Xuan> = {}) {
        const pageOptions = {
            ...options,
            skip: pageParam.skip,
            take: pageParam.take,
        };
        const [list, total] = await this.repository.findAndCount(pageOptions);
        return XuanPageResponseSchema.parse({ list, total } as any);
    }

    async findOne(options: FindOneOptions<Xuan>) {
        const data = await this.repository.findOne(options);
        return data ? XuanResponseSchema.parse(data as any) : null;
    }

    async save(body: XuanCreateRequestDto | XuanBatchCreateRequestDto) {
        const data = await this.repository.save(body as any);
        return Array.isArray(body)
            ? XuanBatchCreateResponseSchema.parse(data as any)
            : XuanResponseSchema.parse(data as any);
    }

    async importUpdateXlsx(file: DatabaseXlsxFileRequestDto) {
        const data = await importUpdateXlsx(this, xuanResourceSchema, file);
        return XuanImportUpdateResponseSchema.parse(data as any);
    }

    async importXlsx(file: DatabaseXlsxFileRequestDto) {
        const data = await importXlsx(this, xuanResourceSchema, file);
        return XuanImportResponseSchema.parse(data as any);
    }

    async exportXlsx(options: FindManyOptions<Xuan> = {}) {
        const data = await this.find(options);
        return createXlsxBuffer(data, xuanResourceSchema);
    }

    async update(
        id: DatabaseIdParamsRequestDto['id'] | XuanBatchUpdateRequestDto['ids'],
        data: XuanUpdateRequestDto,
    ) {
        const result = await this.repository.update(id as any, data as any);
        return XuanWriteResponseSchema.parse(result as any);
    }

    async delete(id: DatabaseIdParamsRequestDto['id'] | DatabaseBatchDeleteRequestDto['ids']) {
        const result = await this.repository.delete(id as any);
        return XuanWriteResponseSchema.parse(result as any);
    }
}
