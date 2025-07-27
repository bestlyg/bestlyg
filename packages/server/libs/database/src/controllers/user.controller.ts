import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@bestlyg-server/auth';
import { BaseController } from './base.controller';
import { User } from '../entities';
import { UserService } from '../services';

@Controller('/database/user')
@UseGuards(AuthGuard)
export class UserController extends BaseController<User> {
    constructor(readonly service: UserService) {
        super(service);
    }
}
