import { baseSchema } from '@/base';
import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  name: { type: String, require: true },
  pwd: { type: String, require: true },
  account: { type: String, require: true },
  roleId: { type: String, require: true },
  ...baseSchema,
});
export type User = typeof UserSchema;
export const UserName = 'user';
