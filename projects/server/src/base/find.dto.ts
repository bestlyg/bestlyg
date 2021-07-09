import { ApiProperty } from '@nestjs/swagger';

export enum FindFilterTag {
  COMMON,
  DATE,
  NUMBER,
  STRING,
}
export class FindFilter {
  @ApiProperty({ type: String, description: '过滤键' })
  key: string;
  @ApiProperty({ enum: FindFilterTag, description: '过滤标识' })
  tag: FindFilterTag;
  @ApiProperty({ type: Number, description: '值' })
  value: string;
  @ApiProperty({ type: Date, description: '开始时间', required: false })
  start?: Date;
  @ApiProperty({ type: Date, description: '结束时间', required: false })
  end?: Date;
  @ApiProperty({ type: Number, description: '最大值', required: false })
  max?: number;
  @ApiProperty({ type: Number, description: '最小值', required: false })
  min?: number;
  @ApiProperty({ type: Boolean, description: '模糊匹配', required: false })
  fuzzy?: boolean;
}
export class FindSort<T> {
  @ApiProperty({ type: String, description: '模型键' })
  key: keyof T;
  @ApiProperty({
    type: Number,
    description: '1升序排列,-1降序排列',
  })
  rule: 1 | -1;
}
/**
 * 查询
 */
export class FindAllDto<T> {
  @ApiProperty({
    type: FindSort,
    description: '排序',
  })
  sort?: FindSort<T>;
  @ApiProperty({
    type: [FindFilter],
    description: '过滤',
  })
  filter?: FindFilter[];
}
/**
 * 分页查询
 */
export class FindPageDto<T> {
  @ApiProperty({
    type: Number,
    description: '当前页码',
  })
  current: number;
  @ApiProperty({
    type: Number,
    description: '每页包含数据量',
  })
  size: number;
  @ApiProperty({
    type: FindAllDto,
    description: '查询模型',
  })
  model?: FindAllDto<T>;
}
