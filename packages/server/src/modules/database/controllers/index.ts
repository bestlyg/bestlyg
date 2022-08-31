import { UserController } from './user.controller';
import {
  GangAccountController,
  GangBillController,
  GangTypeController,
} from './gang';

export const controllerRegister = [
  UserController,
  GangAccountController,
  GangBillController,
  GangTypeController,
];

export * from './user.controller';
export * from './gang';
