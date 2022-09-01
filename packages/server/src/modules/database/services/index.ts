import { UserService } from './user.service';
import { RoleService } from './role.service';
import { GangBillService, GangAccountService, GangTypeService } from './gang';

export const serviceRegister = [
  UserService,
  RoleService,
  GangBillService,
  GangAccountService,
  GangTypeService,
];

export * from './gang';
export * from './user.service';
export * from './role.service';
