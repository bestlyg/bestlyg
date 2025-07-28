import { Controller, UseGuards } from '@nestjs/common';
import dayjs from 'dayjs';
import { Between } from 'typeorm';
import { SelectLedgerPageDto } from '@bestlyg/common';
// import { AuthGuard } from '@bestlyg-server/auth';
import { BaseController, BaseOptions } from './base.controller';
import { Ledger } from '../entities';
import { LedgerService } from '../services';

@Controller('/database/ledger')
// @UseGuards(AuthGuard)
export class LedgerController extends BaseController<Ledger> {
    constructor(readonly service: LedgerService) {
        super(service);
    }

    protected async _findPageAndCount(opts: BaseOptions) {
        const dto = new SelectLedgerPageDto(opts.query);
        return super._findPageAndCount(opts, {
            where: {
                date: dto.date
                    ? Between(
                          dayjs(dto.date).startOf('day').toDate(),
                          dayjs(dto.date).endOf('day').toDate(),
                      )
                    : undefined,
            },
        });
    }
}
