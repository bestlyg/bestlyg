import { baseSchema } from '../base.schema';
import { Schema } from 'mongoose';

export const GangTypeSchema = new Schema({
  name: { type: String, require: true },
  image: { type: Boolean, require: true, default: true },
  ...baseSchema,
});
export type GangType = typeof GangTypeSchema;
export const GangTypeName = 'gang-type';
