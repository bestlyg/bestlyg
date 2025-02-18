import { Controller, Get, Logger } from '@nestjs/common';
import { ServerlessService } from './serverless.service';
import { ResponseEntity } from '@bestlyg/common';

@Controller('/data/serverless')
export class ServerlessController {
    private readonly logger = new Logger(ServerlessController.name);
    constructor(private readonly serverlessService: ServerlessService) {}

    @Get()
    async getServerless() {
        const data = await this.serverlessService.getServerless();
        return ResponseEntity.ofSuccess(data);
    }
}
