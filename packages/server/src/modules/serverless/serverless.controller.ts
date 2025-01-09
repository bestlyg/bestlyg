import { All, Body, Controller, Logger, Post, Query, UseGuards } from '@nestjs/common';
import { ResponseEntity } from '@bestlyg/common';
import { ServerlessService } from './serverless.service.js';
import { AuthGuard } from '../auth/index.js';

@Controller('/api/serverless')
export class ServerlessController {
    private readonly logger = new Logger(ServerlessController.name);
    constructor(private readonly serverlessService: ServerlessService) {}

    // @UseGuards(AuthGuard)
    @All('call')
    async call(@Query('name') name: string) {
        this.logger.log(`name = ${name}`);
        const data = await this.serverlessService.call(name);
        console.log("data",data)
        return ResponseEntity.ofSuccess(data);
    }
}
