import { ApiProperty } from '@nestjs/swagger';

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
