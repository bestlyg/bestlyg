import { Module } from '@nestjs/common';
import { DevController } from './dev.controller';
import { DevGuard } from './dev.guard';
import { DevService } from './dev.service';
import { LogController } from './log.controller';
import { LogService } from './log.service';

@Module({
    controllers: [DevController, LogController],
    providers: [DevGuard, DevService, LogService],
    exports: [DevGuard, DevService, LogService],
})
export class DevModule {}
