import { Code } from '@/models';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
  @ApiProperty({
    type: Boolean,
    description: '成功标识',
  })
  success: boolean;
  @ApiProperty({
    enum: Code,
    description: '请求标识',
  })
  code: Code;
  @ApiProperty({
    description: '请求返回数据',
  })
  data: T | null;
  @ApiProperty({
    type: String,
    description: '请求信息',
  })
  msg: string;
}
export const createResponseDto = (C: any) => {
  Reflect.setPrototypeOf(C, ResponseDto);
  return C;
};
