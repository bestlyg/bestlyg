import { UserController } from './user.controller';
import { RoleController } from './role.controller';
import {
  GangAccountController,
  GangBillController,
  GangTypeController,
} from './gang';

export const controllerRegister = [
  RoleController,
  UserController,
  GangAccountController,
  GangBillController,
  GangTypeController,
];

export * from './base.controller';
export * from './user.controller';
export * from './role.controller';
export * from './gang';
