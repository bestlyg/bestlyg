import {
    All,
    Body,
    Controller,
    Logger,
    Post,
    Query,
    UseGuards,
    Headers,
    Get,
    Patch,
    Delete,
} from '@nestjs/common';
import { ResponseEntity } from '@bestlyg/common';
import { ServerlessService } from './serverless.service.js';
import { AuthGuard } from '../auth/index.js';
import { prismaClient } from '@bestlyg/data';
import { PrismaService } from '../data/index.js';

@Controller('/api/serverless')
export class ServerlessController {
    private readonly logger = new Logger(ServerlessController.name);
    constructor(
        private readonly serverlessService: ServerlessService,
        private readonly prismaService: PrismaService,
    ) {}

    // @UseGuards(AuthGuard)
    @All('call')
    async call(
        @Query('name') name: string,
        @Query() query: Record<string, any>,
        @Body() body: any,
        @Headers() headers: Record<string, any>,
    ) {
        this.logger.log(`name = ${name}`);
        const data = await this.serverlessService.call({ name, query, body, headers });
        return ResponseEntity.ofSuccess(data);
    }

    @Get('code')
    async getCode(@Query('name') name: string) {
        const data = await this.prismaService.serverlessCode.findFirst({ where: { name } });
        return ResponseEntity.ofSuccess(data);
    }

    @Post('code')
    async createCode(@Body() body: prismaClient.ServerlessCode) {
        const data = await this.prismaService.serverlessCode.create({
            data: {
                name: body.name,
                code: body.code,
                serverlessId: 'best',
            },
        });
        return ResponseEntity.ofSuccess(data);
    }

    @Patch('code')
    async updateCode(@Body() body: prismaClient.ServerlessCode) {
        const data = await this.prismaService.serverlessCode.update({
            data: {
                code: body.code,
            },
            where: {
                name: body.name,
            },
        });
        return ResponseEntity.ofSuccess(data);
    }

    @Delete('code')
    async deleteCode(@Body('name') name: string) {
        const data = await this.prismaService.serverlessCode.delete({
            where: {
                name,
            },
        });
        return ResponseEntity.ofSuccess(data);
    }
}
