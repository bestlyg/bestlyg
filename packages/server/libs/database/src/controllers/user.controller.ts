import { Controller } from '@nestjs/common';
import { BaseController } from './base.controller';
import { User } from '../entities';
import { UserService } from '../services';

@Controller('/database/user')
export class UserController extends BaseController<User> {
    constructor(readonly service: UserService) {
        super(service);
    }
}
