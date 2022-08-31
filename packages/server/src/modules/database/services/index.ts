import { UserService } from './user.service';
import { GangBillService, GangAccountService, GangTypeService } from './gang';

export const serviceRegister = [
  UserService,
  GangBillService,
  GangAccountService,
  GangTypeService,
];

export * from './gang';
export * from './user.service';
