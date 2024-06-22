import { baseSchema } from '../base.schema';
import { Schema } from 'mongoose';

export const GangBillSchema = new Schema({
  money: { type: Number, require: true, default: 0 },
  date: { type: Date, require: true },
  desc: { type: String, require: true },
  remark: { type: String, require: false },
  userId: { type: String, require: true },
  accountId: { type: String, require: true },
  typeId: { type: String, require: true },
  ...baseSchema,
});
export type GangBill = typeof GangBillSchema;
export const GangBillName = 'gang-bill';
