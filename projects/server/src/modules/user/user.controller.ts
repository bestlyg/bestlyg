import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { User } from './user.model';
import { UserService } from './user.service';
import { BaseController, FindAllDto, FindPageDto, ResponseDto, ResponseFindPageData } from '@/base';
import { ApiExtraModels, ApiOkResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto, FindUserDto } from './user.dto';
@ApiTags('User')
@Controller('user')
@ApiExtraModels(ResponseDto)
@ApiExtraModels(ResponseFindPageData)
@ApiExtraModels(FindUserDto)
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
    description: '创建',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        {
          properties: {
            data: {
              $ref: getSchemaPath(CreateUserDto),
            },
          },
        },
      ],
    },
  })
  @Post()
  async create(@Body() dto: CreateUserDto): Promise<ResponseDto<User>> {
    return this.responseClient(this.service.create(dto));
  }
  @ApiOkResponse({
    description: '全部查找',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(FindUserDto) },
            },
          },
        },
      ],
    },
  })
  @Get('list')
  async findAll(@Body() dto: FindAllDto<FindUserDto>): Promise<ResponseDto<User[]>> {
    return this.responseClient(this.service.findAll(dto));
  }
  @ApiOkResponse({
    description: '分页查找',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        {
          properties: {
            data: {
              allOf: [
                { $ref: getSchemaPath(ResponseFindPageData) },
                {
                  properties: {
                    data: {
                      type: 'array',
                      items: { $ref: getSchemaPath(FindUserDto) },
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    },
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
    description: '更新',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        {
          properties: {
            data: {
              type: 'boolean',
            },
          },
        },
      ],
    },
  })
  @Patch(':id')
  async update(
    @Param() { id }: { id: string },
    @Body() model: UpdateUserDto
  ): Promise<ResponseDto<void>> {
    return this.responseClient(
      this.service.update(id, model).then(res => {
        console.log(res);
      })
    );
  }
  @ApiOkResponse({
    description: '删除',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        {
          properties: {
            data: {
              type: 'boolean',
            },
          },
        },
      ],
    },
  })
  @Delete()
  async remove(@Body() ids: string[]): Promise<ResponseDto<number>> {
    return this.responseClient(
      this.service.remove(ids).then(({ deletedCount }) => deletedCount ?? 0)
    );
  }

  @ApiOkResponse({
    description: '清空',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        {
          properties: {
            data: {
              type: 'boolean',
            },
          },
        },
      ],
    },
  })
  @Delete('clear')
  async clear(): Promise<ResponseDto<number>> {
    return this.responseClient(this.service.clear().then(({ deletedCount }) => deletedCount ?? 0));
  }
}
