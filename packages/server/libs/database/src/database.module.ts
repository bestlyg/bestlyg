import { Module } from '@nestjs/common';
import * as modules from './modules';
import { LedgerController } from './controllers';

@Module({
    imports: Object.values(modules),
    controllers: [LedgerController],
    exports: Object.values(modules),
})
export class DatabaseModule {}
