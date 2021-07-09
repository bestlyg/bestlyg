import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class UserModel {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly age: number;
  @ApiProperty()
  readonly time: Date;
}
export interface User extends UserModel, Document {}
