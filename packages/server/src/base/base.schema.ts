import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class BaseSchema extends Document {
  @Prop()
  create_time: number;
  @Prop()
  update_time: number;
  @Prop()
  deleted: boolean;
}
