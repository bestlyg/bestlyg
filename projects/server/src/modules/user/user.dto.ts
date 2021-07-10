import { ResponseDto, ResponseFindPageData } from '@/base';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class BaseUserDto {
  /**
   * 名称
   * @example 'bestlyg'
   */
  @ApiProperty({ required: true })
  readonly name: string;
  /**
   * 年龄
   * @example 12
   */
  @ApiProperty({ required: true })
  readonly age: number;
  /**
   * 出生时间
   * @example "2021-07-09T06:21:14.362Z"
   */
  @ApiProperty({ required: true })
  readonly time: Date;
}
export class CreateUserDto extends BaseUserDto {}
export class ResponseCreateUserDto extends ResponseDto<CreateUserDto> {
  @ApiProperty({ type: CreateUserDto })
  data: CreateUserDto;
}
export class UpdateUserDto extends PartialType(BaseUserDto) {}
export class FindUserDto extends BaseUserDto {
  /**
   * 名称
   * @example 'bestlyg'
   */
  @ApiProperty({ description: '唯一标识符' })
  readonly _id: string;
}
export class ResponseFindUserDto extends ResponseDto<FindUserDto[]> {
  @ApiProperty({ type: [FindUserDto] })
  data: FindUserDto[];
}
export class ResponseFindPageUserData extends ResponseFindPageData<FindUserDto> {
  @ApiProperty({ type: [FindUserDto] })
  data: FindUserDto[];
}
export class ResponseFindPageUserDto extends ResponseDto<ResponseFindPageUserData> {
  @ApiProperty({ type: [ResponseFindPageUserData] })
  data: ResponseFindPageUserData;
}
