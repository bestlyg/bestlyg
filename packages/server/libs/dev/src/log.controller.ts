import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { ResponseEntity } from '@bestlyg/server-shared';
import { DevGuard } from './dev.guard';
import { LogService } from './log.service';

@Controller('dev/log')
@UseGuards(DevGuard)
export class LogController {
    constructor(private readonly logService: LogService) {}

    @Get('overview')
    async overview() {
        return ResponseEntity.ofSuccess(await this.logService.overview());
    }

    @Get()
    async getLog(
        @Query('name') name: string,
        @Query('grep') grep: string | string[] | undefined,
        @Query('tailLine') tailLine: string | undefined,
        @Res() res: Response,
    ) {
        const lines = await this.logService.getLog({ name, grep, tailLine });
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.send(lines.join('\n'));
    }
}
