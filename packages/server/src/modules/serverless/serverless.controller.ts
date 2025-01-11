import { All, Body, Controller, Logger, Query, Headers } from '@nestjs/common';
import { ResponseEntity } from '@bestlyg/common';
import { ServerlessService } from './serverless.service.js';
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
}
