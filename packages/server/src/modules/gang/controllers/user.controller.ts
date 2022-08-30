import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BaseController } from '@/base';
import { UserName } from '../schemas';
import { UserService } from '../services';
import { getGangUrl } from '../utils';
import { CreateUserDto, UpdateUserDto } from '../dto';

@Controller(getGangUrl(UserName))
export class UserController extends BaseController {
  constructor(private readonly service: UserService) {
    super();
  }
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.result(this.service.create(dto));
  }
  @Patch()
  async update(@Body() dto: UpdateUserDto) {
    return this.result(this.service.update(dto));
  }
  @Get()
  async findAll() {
    return this.result(this.service.findAll());
  }
  @Delete()
  async removeAll() {
    return this.result(this.service.removeAll());
  }
  @Delete('/logic/:id')
  async removeLogic(@Param('id') id: string) {
    return this.result(this.service.removeLogic(id));
  }
}
