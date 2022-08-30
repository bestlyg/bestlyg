import { Controller } from '@nestjs/common';
import { BaseDatabaseController } from '@/base';
import { User, UserName } from '../schemas';
import { UserService } from '../services';
import { getGangUrl } from '../utils';

@Controller(getGangUrl(UserName))
export class UserController extends BaseDatabaseController<User> {
  constructor(service: UserService) {
    super(service);
  }
}
