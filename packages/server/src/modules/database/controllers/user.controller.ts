import { Controller } from '@nestjs/common';
import { User } from '../schemas';
import { UserService } from '../services';
import { BaseDatabaseController } from './base.controller';

@Controller('/database/user')
export class UserController extends BaseDatabaseController<User> {
  constructor(service: UserService) {
    super(service);
  }
}
