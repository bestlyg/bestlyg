import { BaseController } from '@/base';
import { Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Schema } from 'mongoose';
import { ListDto, CreateDto, UpdateDto } from '../dto';
import { BaseDatabaseService } from '../services';

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
