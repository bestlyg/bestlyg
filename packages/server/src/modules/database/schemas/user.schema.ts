import { baseSchema } from './base.schema';
import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  name: { type: String, require: true },
  pwd: { type: String, require: true },
  account: { type: String, require: true },
  roleKey: { type: Number, require: true },
  wechatUnionId: { type: String },
  ...baseSchema,
});
export type User = typeof UserSchema;
export const UserName = 'user';
