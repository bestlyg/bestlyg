import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { prismaClient } from '@bestlyg/data';
import { ResponseEntity } from '@bestlyg/common';
import { AuthGuard } from '../auth/index.js';
import { DataService } from './data.service.js';

@Controller('/api/data')
export class DataController {
    private readonly logger = new Logger(DataController.name);
    constructor(private readonly dataService: DataService) {}

    @UseGuards(AuthGuard)
    @Get('ledger')
    async getLedgers() {
        const data = await this.dataService.getLedgers();
        return ResponseEntity.ofSuccess(data);
    }

    @UseGuards(AuthGuard)
    @Get('xuan')
    async getXuanList() {
        const data = await this.dataService.getXuanList();
        return ResponseEntity.ofSuccess(data);
    }

    @UseGuards(AuthGuard)
    @Get('secrets')
    async getSecrets() {
        const data = await this.dataService.getSecrets();
        return ResponseEntity.ofSuccess(data);
    }

    @UseGuards(AuthGuard)
    @Get('/data/leetcode')
    async getLeetcodeProblems() {
        const data = await this.dataService.getLeetcodeProblems();
        return ResponseEntity.ofSuccess(data);
    }

    @UseGuards(AuthGuard)
    @Get('serverless')
    async getServerless() {
        const data = await this.dataService.getServerless();
        return ResponseEntity.ofSuccess(data);
    }
}
