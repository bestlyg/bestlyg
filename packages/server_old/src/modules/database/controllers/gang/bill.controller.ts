import { Controller } from '@nestjs/common';
import { BaseDatabaseController } from '../base.controller';
import { GangBill } from '../../schemas';
import { GangBillService } from '../../services';

@Controller('/database/gang/bill')
export class GangBillController extends BaseDatabaseController<GangBill> {
  constructor(service: GangBillService) {
    super(service);
  }
}
