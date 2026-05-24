import { Controller, Get, UseGuards } from '@nestjs/common';
import { ResponseEntity } from '@bestlyg/server-shared';
import { DevGuard } from './dev.guard';
import { DevService } from './dev.service';

@Controller('dev')
@UseGuards(DevGuard)
export class DevController {
    constructor(private readonly devService: DevService) {}

    @Get('ping')
    ping() {
        return ResponseEntity.ofSuccess(this.devService.ping());
    }

    @Get('config')
    config() {
        return ResponseEntity.ofSuccess(this.devService.getSafeConfig());
    }
}
