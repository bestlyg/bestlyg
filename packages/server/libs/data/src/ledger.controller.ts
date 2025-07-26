import { Controller, Get, Logger, Query, UseGuards, UsePipes } from '@nestjs/common';
import { LedgerService } from './ledger.service';
import { ResponseEntity, SelectLedgerPageDto } from '@bestlyg/common';
import { AuthGuard } from '@bestlyg-server/auth';
import { ApiQuery } from '@nestjs/swagger';

@Controller('/data/ledger')
@UseGuards(AuthGuard)
export class LedgerController {
    private readonly logger = new Logger(LedgerController.name);
    constructor(private readonly ledgerService: LedgerService) {}

    @Get('page')
    @ApiQuery({ name: 'query', type: SelectLedgerPageDto })
    async getLedgerPage(@Query() dto: SelectLedgerPageDto) {
        const data = await this.ledgerService.getLedgerPage(dto);
        return ResponseEntity.ofSuccess(data);
    }

    @Get('list')
    async getLedgerList() {
        const data = await this.ledgerService.getLedgerList();
        return ResponseEntity.ofSuccess(data);
    }

    @Get('summary')
    async getLedgerSummary() {
        const data = await this.ledgerService.getLedgerSummary();
        return ResponseEntity.ofSuccess(data);
    }
}
