import { Controller, Get, Logger, Query, UseGuards } from '@nestjs/common';
import { ResponseEntity } from '@bestlyg/common';
import { AuthGuard } from '@bestlyg-server/auth';
import { DataService } from './data.service';

@Controller('/data')
export class DataController {
    private readonly logger = new Logger(DataController.name);
    constructor(private readonly dataService: DataService) {}

    @Get('xuan')
    @UseGuards(AuthGuard)
    async getXuanList() {
        const data = await this.dataService.getXuanList();
        return ResponseEntity.ofSuccess(data);
    }

    @Get('secrets')
    @UseGuards(AuthGuard)
    async getSecrets() {
        const data = await this.dataService.getSecrets();
        return ResponseEntity.ofSuccess(data);
    }
}
