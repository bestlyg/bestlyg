import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Headers,
} from '@nestjs/common';
import isPromise from 'is-promise';
import { Schema } from 'mongoose';
import { CreateDto, ListDto, UpdateDto } from './base.dto';
import { BaseDatabaseService } from './base.service';

export class Return<T> {
  constructor(
    public code: number,
    public data: T = null,
    public msg?: string,
  ) {}
}

export class BaseController {
  async result<T>(data?: T | Promise<T>): Promise<Return<T>> {
    const promise = isPromise(data) ? data : Promise.resolve(data);
    return promise.then(
      (data) => new Return(0, data),
      (err) => new Return(1, null, err),
    );
  }
}
export class BaseDatabaseController<
  T extends Schema<any>,
> extends BaseController {
  constructor(protected readonly service: BaseDatabaseService<T>) {
    super();
  }
  @Get('/list')
  async listLogic(@Query() dto: ListDto) {
    return this.result(this.service.listLogic(dto));
  }
  @Get(':id')
  async findLogicById(@Param('id') id: string) {
    return this.result(this.service.findLogic(id));
  }
  @Post()
  async create(@Body() dto: CreateDto) {
    return this.result(this.service.create(dto));
  }
  @Patch(':id')
  async update(@Body() dto: UpdateDto) {
    return this.result(this.service.update(dto));
  }
  @Delete(':id')
  async removeLogic(@Param('id') id: string) {
    return this.result(this.service.removeLogic(id));
  }
  @Get('/admin/list')
  async list(@Query() dto: ListDto) {
    return this.result(this.service.list(dto));
  }
  @Delete('/admin')
  async clear() {
    return this.result(this.service.remove({}));
  }
  @Delete('/admin/:id')
  async remove(@Param('id') _id: string) {
    return this.result(this.service.remove({ _id }));
  }
}
