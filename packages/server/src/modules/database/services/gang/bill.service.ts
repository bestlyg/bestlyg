import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseDatabaseService } from '@/base';
import { GangBill, GangBillName } from '../../schemas';

@Injectable()
export class GangBillService extends BaseDatabaseService<GangBill> {
  constructor(@InjectModel(GangBillName) model: Model<GangBill>) {
    super(model);
  }
}
