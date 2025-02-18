import { Controller, Get, Logger, Query, UseGuards } from '@nestjs/common';
import { LedgerService } from './ledger.service';
import { ResponseEntity } from '@bestlyg/common';
import { AuthGuard } from '@bestlyg-server/auth';
import { ZodValidationPipe } from '@bestlyg-server/common';
import { SelectLedgerPageSchema, SelectLedgerPageDto } from './ledger.dto';

@Controller('/data/ledger')
export class LedgerController {
    private readonly logger = new Logger(LedgerController.name);
    constructor(private readonly ledgerService: LedgerService) {}

    @Get('page')
    @UseGuards(AuthGuard)
    async getLedgerPage(
        @Query(new ZodValidationPipe(SelectLedgerPageSchema)) dto: SelectLedgerPageDto,
    ) {
        const data = await this.ledgerService.getLedgerPage(dto);
        return ResponseEntity.ofSuccess(data);
    }

    @Get('list')
    @UseGuards(AuthGuard)
    async getLedgerList() {
        const data = await this.ledgerService.getLedgerList();
        return ResponseEntity.ofSuccess(data);
    }

    @Get('summary')
    @UseGuards(AuthGuard)
    async getLedgerSummary() {
        const data = await this.ledgerService.getLedgerSummary();
        return ResponseEntity.ofSuccess(data);
    }
}
