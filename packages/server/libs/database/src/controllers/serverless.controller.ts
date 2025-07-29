import { Controller } from '@nestjs/common';
import { BaseController } from './base.controller';
import { Serverless } from '../entities';
import { ServerlessService } from '../services';

@Controller('/database/serverless')
export class ServerlessController extends BaseController<Serverless> {
    constructor(readonly service: ServerlessService) {
        super(service);
    }
}
