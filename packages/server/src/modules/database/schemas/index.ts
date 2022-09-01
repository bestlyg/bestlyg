import { MongooseModule } from '@nestjs/mongoose';
import { Schema } from 'mongoose';
import { UserName, UserSchema } from './user.schema';
import { RoleName, RoleSchema } from './role.schema';
import {
  GangBillName,
  GangBillSchema,
  GangAccountName,
  GangAccountSchema,
  GangTypeName,
  GangTypeSchema,
} from './gang';
export const schemaRegieter = [
  [UserName, UserSchema],
  [GangBillName, GangBillSchema],
  [GangAccountName, GangAccountSchema],
  [GangTypeName, GangTypeSchema],
  [RoleName, RoleSchema],
].map(([name, schema]: [string, Schema]) =>
  MongooseModule.forFeature([{ name, schema }]),
);

export * from './base.schema';
export * from './role.schema';
export * from './user.schema';
export * from './gang';
