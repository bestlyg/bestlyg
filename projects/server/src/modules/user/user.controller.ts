import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { User } from './user.model';
import { UserService } from './user.service';
import { BaseController, FindAllDto, FindPageDto, ResponseBooleanDto, ResponseDto } from '@/base';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateUserDto,
  UpdateUserDto,
  FindUserDto,
  ResponseCreateUserDto,
  ResponseFindUserDto,
  ResponseFindPageUserDto,
} from './user.dto';
@ApiTags('User')
@Controller('user')
export class UserController extends BaseController {
  constructor(private readonly service: UserService) {
    super();
    this.service.clear();
    new Array(21).fill(0).map(async (_, i) => {
      await this.service
        .create({
          name: 'herry' + (i + 1),
          age: i + 1,
          time: new Date(`2021/7/${i + 1}`),
        })
        .catch(e => {
          console.log(e);
        });
    });
  }
  @ApiOkResponse({
    type: ResponseCreateUserDto,
    description: '创建模型',
  })
  @Post()
  async create(@Body() dto: CreateUserDto): Promise<ResponseDto<User>> {
    return this.responseClient(this.service.create(dto));
  }
  @ApiOkResponse({
    type: ResponseFindUserDto,
    description: '查找模型',
  })
  @Get()
  async findAll(@Body() dto: FindAllDto<FindUserDto>): Promise<ResponseDto<User[]>> {
    return this.responseClient(this.service.findAll(dto));
  }
  @ApiOkResponse({
    type: ResponseFindPageUserDto,
    description: '分页查找模型',
  })
  @Get('page')
  async findPage(@Body() dto: FindPageDto<FindUserDto>): Promise<
    ResponseDto<{
      data: User[];
      total: number;
    }>
  > {
    return this.responseClient(this.service.findPage(dto));
  }
  @ApiOkResponse({
    type: ResponseBooleanDto,
    description: '更新模型',
  })
  @Patch(':id')
  async update(
    @Param() { id }: { id: string },
    @Body() model: UpdateUserDto
  ): Promise<ResponseDto<void>> {
    return this.responseClient(this.service.update(id, model).then(() => {}));
  }
  @ApiOkResponse({
    type: ResponseBooleanDto,
    description: '删除数据',
  })
  @Delete()
  async remove(@Body() ids: string[]): Promise<ResponseDto<number>> {
    return this.responseClient(
      this.service.remove(ids).then(({ deletedCount }) => deletedCount ?? 0)
    );
  }
  @ApiOkResponse({
    type: ResponseBooleanDto,
    description: '清空表',
  })
  @Delete('clear')
  async clear(): Promise<ResponseDto<number>> {
    return this.responseClient(this.service.clear().then(({ deletedCount }) => deletedCount ?? 0));
  }
}
