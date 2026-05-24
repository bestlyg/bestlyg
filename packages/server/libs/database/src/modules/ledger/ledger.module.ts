import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LedgerController } from './ledger.controller';
import { Ledger } from '../../entities';
import { LedgerService } from './ledger.service';

@Module({
    imports: [TypeOrmModule.forFeature([Ledger])],
    controllers: [LedgerController],
    providers: [LedgerService],
    exports: [TypeOrmModule, LedgerService],
})
export class LedgerModule {}
