import { BaseSchema } from '@/base';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

@Schema()
export class Cat extends BaseSchema {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
