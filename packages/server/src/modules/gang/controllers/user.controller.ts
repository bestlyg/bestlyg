import { Body, Controller, Get, Post } from '@nestjs/common';
import { BaseController } from '@/base';
import { UserName } from '../schemas';
import { UserService } from '../services';
import { getGangUrl } from '../utils';
import { CreateUserDto } from '../dto';

@Controller(getGangUrl(UserName))
export class UserController extends BaseController {
  constructor(private readonly service: UserService) {
    super();
  }
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.result(this.service.create(dto));
  }
  @Get()
  async findAll() {
    return this.result(this.service.findAll());
  }
}
