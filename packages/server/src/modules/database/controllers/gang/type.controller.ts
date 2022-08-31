import { Controller } from '@nestjs/common';
import { BaseDatabaseController } from '@/base';
import { GangType } from '../../schemas';
import { GangTypeService } from '../../services';

@Controller('/database/gang/type')
export class GangTypeController extends BaseDatabaseController<GangType> {
  constructor(service: GangTypeService) {
    super(service);
  }
}
