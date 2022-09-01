import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GangBill, GangBillName } from '../../schemas';
import { BaseDatabaseService } from '../base.service';

@Injectable()
export class GangBillService extends BaseDatabaseService<GangBill> {
  constructor(@InjectModel(GangBillName) model: Model<GangBill>) {
    super(model);
  }
}
