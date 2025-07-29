import { Controller } from '@nestjs/common';
import { BaseController } from './base.controller';
import { Xuan } from '../entities';
import { XuanService } from '../services';

@Controller('/database/xuan')
export class XuanController extends BaseController<Xuan> {
    constructor(readonly service: XuanService) {
        super(service);
    }
}
