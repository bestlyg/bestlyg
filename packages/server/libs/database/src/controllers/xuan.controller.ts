import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@bestlyg-server/auth';
import { BaseController } from './base.controller';
import { Xuan } from '../entities';
import { XuanService } from '../services';

@Controller('/database/xuan')
@UseGuards(AuthGuard)
export class XuanController extends BaseController<Xuan> {
    constructor(readonly service: XuanService) {
        super(service);
    }
}
