import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { prismaClient } from '@bestlyg/data';
import { ResponseEntity } from '@bestlyg/common';
import { AuthGuard } from '../auth/index.js';
import { DataService } from './data.service.js';
import { CreateServerlessCodeDTO, UpdateServerlessCodeDTO } from './data.dto.js';

@UseGuards(AuthGuard)
@Controller('/api/data')
export class DataController {
    private readonly logger = new Logger(DataController.name);
    constructor(private readonly dataService: DataService) {}

    @Get('ledger')
    async getLedgers() {
        const data = await this.dataService.getLedgers();
        return ResponseEntity.ofSuccess(data);
    }

    @Get('xuan')
    async getXuanList() {
        const data = await this.dataService.getXuanList();
        return ResponseEntity.ofSuccess(data);
    }

    @Get('secrets')
    async getSecrets() {
        const data = await this.dataService.getSecrets();
        return ResponseEntity.ofSuccess(data);
    }

    @Get('leetcode')
    async getLeetcodeProblems() {
        const data = await this.dataService.getLeetcodeProblems();
        return ResponseEntity.ofSuccess(data);
    }

    @Get('serverless')
    async getServerless() {
        const data = await this.dataService.getServerless();
        return ResponseEntity.ofSuccess(data);
    }

    @Get('serverless-code')
    async getServerlessCode(@Query('name') name: string) {
        const data = await this.dataService.getServerlessCode(name);
        return ResponseEntity.ofSuccess(data);
    }

    @Post('serverless-code')
    async createServerlessCode(@Body() body: CreateServerlessCodeDTO) {
        const data = await this.dataService.createServerlessCode(body);
        return ResponseEntity.ofSuccess(data);
    }

    @Patch('serverless-code')
    async updateServerlessCode(@Body() body: UpdateServerlessCodeDTO) {
        const data = await this.dataService.updateServerlessCode(body);
        return ResponseEntity.ofSuccess(data);
    }

    @Delete('serverless-code')
    async deleteServerlessCode(@Body('id') id?: string, @Body('name') name?: string) {
        const data = await this.dataService.deleteServerlessCode({ id, name });
        return ResponseEntity.ofSuccess(data);
    }
}
