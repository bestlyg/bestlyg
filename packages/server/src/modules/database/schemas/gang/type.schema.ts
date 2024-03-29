import { baseSchema } from '../base.schema';
import { Schema } from 'mongoose';

export const GangTypeSchema = new Schema({
  name: { type: String, require: true, unique: true },
  image: { type: String, require: false },
  userId: { type: String, require: true },
  ...baseSchema,
});
export type GangType = typeof GangTypeSchema;
export const GangTypeName = 'gang-type';
