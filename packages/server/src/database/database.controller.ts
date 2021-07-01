import { BaseDataBaseService } from './database.service';
import { Body, Get, Post, Delete, Patch, Param } from '@nestjs/common';
import { Document } from 'mongoose';
import { RequestFind, RequestPage, ResponseInfo } from '@bestlyg/shared';
import { BaseController } from '@/base';
export class DataBaseController<T extends Document, Schema> extends BaseController {
  constructor(protected readonly service: BaseDataBaseService<T, Schema>) {
    super();
  }
  @Post()
  async create(@Body() dto: Schema): Promise<ResponseInfo<T>> {
    return this.responseClient(this.service.create(dto));
  }
  @Get()
  async findAll(@Body() dto: RequestFind<T> = {}): Promise<ResponseInfo<T[]>> {
    return this.responseClient(this.service.findAll(dto));
  }
  @Get('page')
  async findPage(@Body() dto: RequestPage<T>): Promise<
    ResponseInfo<{
      data: T[];
      total: number;
    }>
  > {
    return this.responseClient(this.service.findPage(dto));
  }
  @Patch(':id')
  async update(
    @Param() { id }: { id: string },
    @Body() model: Partial<Schema>
  ): Promise<ResponseInfo<void>> {
    return this.responseClient(this.service.update(id, model).then(() => {}));
  }
  @Delete()
  async remove(@Body() ids: string[]): Promise<ResponseInfo<number>> {
    return this.responseClient(
      this.service.remove(ids).then(({ deletedCount }) => deletedCount ?? 0)
    );
  }
  @Delete('clear')
  async clear(): Promise<ResponseInfo<number>> {
    return this.responseClient(this.service.clear().then(({ deletedCount }) => deletedCount ?? 0));
  }
}
