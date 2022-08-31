import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseDatabaseService } from '@/base';
import { GangAccount, GangAccountName } from '../../schemas';

@Injectable()
export class GangAccountService extends BaseDatabaseService<GangAccount> {
  constructor(@InjectModel(GangAccountName) model: Model<GangAccount>) {
    super(model);
  }
}
