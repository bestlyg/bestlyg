import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountName } from '../schemas';
import { GangDatabaseName } from '../utils';
import { BaseDatabaseService } from '@/base';

@Injectable()
export class AccountService extends BaseDatabaseService<Account> {
  constructor(
    @InjectModel(AccountName, GangDatabaseName)
    model: Model<Account>,
  ) {
    super(model);
  }
}
