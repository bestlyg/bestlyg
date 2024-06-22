import { baseSchema } from './base.schema';
import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  account: { type: String, require: false },
  pwd: { type: String, require: false },
  name: { type: String, require: false },
  avatar: { type: String, require: false },
  gender: { type: Number, require: false },
  roleKey: { type: Number, require: true },
  wechatOpenId: { type: String, require: false },
  ...baseSchema,
});
export type User = typeof UserSchema;
export const UserName = 'user';
