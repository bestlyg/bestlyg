import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GangAccount, GangAccountName } from '../../schemas';
import { BaseDatabaseService } from '../base.service';

@Injectable()
export class GangAccountService extends BaseDatabaseService<GangAccount> {
  constructor(@InjectModel(GangAccountName) model: Model<GangAccount>) {
    super(model);
  }
}
