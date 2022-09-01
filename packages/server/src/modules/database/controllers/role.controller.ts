import { Controller } from '@nestjs/common';
import { BaseDatabaseController } from './base.controller';
import { Role } from '../schemas';
import { RoleService } from '../services';

@Controller('/database/role')
export class RoleController extends BaseDatabaseController<Role> {
  constructor(service: RoleService) {
    super(service);
  }
}
