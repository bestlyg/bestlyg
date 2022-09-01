import { baseSchema } from '@/base';
import { Schema } from 'mongoose';

export const RoleSchema = new Schema({
  name: { type: String, require: true },
  ...baseSchema,
});
export type Role = typeof RoleSchema;
export const RoleName = 'role';
