import { Controller } from '@nestjs/common';
import { BaseDatabaseController } from '@/base';
import { Account, AccountName } from '../schemas';
import { AccountService } from '../services';
import { getGangUrl } from '../utils';

@Controller(getGangUrl(AccountName))
export class AccountController extends BaseDatabaseController<Account> {
  constructor(service: AccountService) {
    super(service);
  }
}
