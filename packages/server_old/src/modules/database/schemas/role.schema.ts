import { Schema } from 'mongoose';
import { baseSchema } from './base.schema';

export const RoleSchema = new Schema({
  name: { type: String, require: true },
  key: { type: Number, require: true, unique: true },
  ...baseSchema,
});
export type Role = typeof RoleSchema;
export const RoleName = 'role';
