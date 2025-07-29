import { Controller } from '@nestjs/common';
import { BaseController } from './base.controller';
import { Secrets } from '../entities';
import { SecretsService } from '../services';

@Controller('/database/secrets')
export class SecretsController extends BaseController<Secrets> {
    constructor(readonly service: SecretsService) {
        super(service);
    }
}
