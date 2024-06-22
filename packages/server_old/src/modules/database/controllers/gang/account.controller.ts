import { Controller } from '@nestjs/common';
import { BaseDatabaseController } from '../base.controller';
import { GangAccount } from '../../schemas';
import { GangAccountService } from '../../services';

@Controller('/database/gang/account')
export class GangAccountController extends BaseDatabaseController<GangAccount> {
  constructor(service: GangAccountService) {
    super(service);
  }
}
