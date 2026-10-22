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
    type UserBatchCreateRequestDto,
    UserBatchCreateResponseSchema,
    type UserBatchUpdateRequestDto,
    type UserCreateRequestDto,
    UserImportResponseSchema,
    UserImportUpdateResponseSchema,
    UserListResponseSchema,
    UserPageResponseSchema,
    UserResponseSchema,
    type UserUpdateRequestDto,
    UserWriteResponseSchema,
    userResourceSchema,
} from '@bestlyg/server-shared';
import { User } from '../../entities';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        public readonly repository: Repository<User>,
    ) {}

    async find(options: FindManyOptions<User> = {}) {
        const data = await this.repository.find(options);
        return UserListResponseSchema.parse(data as any);
    }

    async findPageAndCount(pageParam: PageParam, options: FindManyOptions<User> = {}) {
        const pageOptions = {
            ...options,
            skip: pageParam.skip,
            take: pageParam.take,
        };
        const [list, total] = await this.repository.findAndCount(pageOptions);
        return UserPageResponseSchema.parse({ list, total } as any);
    }

    async findOne(options: FindOneOptions<User>) {
        const data = await this.repository.findOne(options);
        return data ? UserResponseSchema.parse(data as any) : null;
    }

    async save(body: UserCreateRequestDto | UserBatchCreateRequestDto) {
        const data = await this.repository.save(body as any);
        return Array.isArray(body)
            ? UserBatchCreateResponseSchema.parse(data as any)
            : UserResponseSchema.parse(data as any);
    }

    async importUpdateXlsx(file: DatabaseXlsxFileRequestDto) {
        const data = await importUpdateXlsx(this, userResourceSchema, file);
        return UserImportUpdateResponseSchema.parse(data as any);
    }

    async importXlsx(file: DatabaseXlsxFileRequestDto) {
        const data = await importXlsx(this, userResourceSchema, file);
        return UserImportResponseSchema.parse(data as any);
    }

    async exportXlsx(options: FindManyOptions<User> = {}) {
        const data = await this.find(options);
        return createXlsxBuffer(data, userResourceSchema);
    }

    async update(
        id: DatabaseIdParamsRequestDto['id'] | UserBatchUpdateRequestDto['ids'],
        data: UserUpdateRequestDto,
    ) {
        const result = await this.repository.update(id as any, data as any);
        return UserWriteResponseSchema.parse(result as any);
    }

    async delete(id: DatabaseIdParamsRequestDto['id'] | DatabaseBatchDeleteRequestDto['ids']) {
        const result = await this.repository.delete(id as any);
        return UserWriteResponseSchema.parse(result as any);
    }
}
