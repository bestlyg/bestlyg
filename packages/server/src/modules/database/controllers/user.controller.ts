import { Controller } from '@nestjs/common';
import { BaseDatabaseController } from '@/base';
import { User } from '../schemas';
import { UserService } from '../services';

@Controller('/database/user')
export class UserController extends BaseDatabaseController<User> {
  constructor(service: UserService) {
    super(service);
  }
}
