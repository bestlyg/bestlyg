import { Controller, Logger, UseGuards } from '@nestjs/common';
import dayjs from 'dayjs';
import { Between } from 'typeorm';
import { PageParam, SelectLedgerPageDto } from '@bestlyg/common';
import { AuthGuard } from '@bestlyg-server/auth';
import { BaseController, BaseOptions } from './base.controller';
import { Ledger } from '../entities';
import { LedgerService } from '../services';

@Controller('/database/ledger')
@UseGuards(AuthGuard)
export class LedgerController extends BaseController<Ledger> {
    private readonly logger = new Logger(LedgerController.name);
    constructor(readonly ledgerService: LedgerService) {
        super(ledgerService);
    }

    protected async _findPageAndCount(opts: BaseOptions) {
        const dto = new SelectLedgerPageDto(opts.query);
        const data = await this.ledgerService.findPageAndCount(PageParam.from(dto), {
            where: {
                date: dto.date
                    ? Between(
                          dayjs(dto.date).startOf('day').toDate(),
                          dayjs(dto.date).endOf('day').toDate(),
                      )
                    : undefined,
            },
        });
        return data;
    }
}
