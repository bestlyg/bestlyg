import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ledger } from '../entities';
import { LedgerService } from '../services';

@Module({
    imports: [TypeOrmModule.forFeature([Ledger])],
    providers: [LedgerService],
    exports: [LedgerService],
})
export class LedgerModule {}
