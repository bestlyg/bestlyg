import { Controller } from '@nestjs/common';
import { BaseController } from './base.controller';
import { CasbinRule } from '../entities';
import { CasbinRuleService } from '../services';

@Controller('/database/casbin-rule')
export class CasbinRuleController extends BaseController<CasbinRule> {
    constructor(readonly service: CasbinRuleService) {
        super(service);
    }
}
