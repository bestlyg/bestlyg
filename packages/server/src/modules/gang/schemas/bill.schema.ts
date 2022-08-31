import { baseSchema } from '@/base';
import { Schema } from 'mongoose';

export const BillSchema = new Schema({
  name: { type: String, require: true },
  isPositive: { type: Boolean, require: true, default: true },
  money: { type: Number, require: true, default: 0 },
  userId: { type: String, require: true },
  accountId: { type: String, require: true },
  ...baseSchema,
});
export type Bill = typeof BillSchema;
export const BillName = 'account';
