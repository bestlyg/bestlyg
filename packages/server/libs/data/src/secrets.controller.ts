import { Controller, Get, Logger, Query, UseGuards } from '@nestjs/common';
import { SecretsService } from './secrets.service';
import { ResponseEntity } from '@bestlyg/common';
import { AuthGuard } from '@bestlyg-server/auth';

@Controller('/data/secrets')
@UseGuards(AuthGuard)
export class SecretsController {
    private readonly logger = new Logger(SecretsController.name);
    constructor(private readonly secretsService: SecretsService) {}

    @Get()
    async getSecrets() {
        const data = await this.secretsService.getSecrets();
        return ResponseEntity.ofSuccess(data);
    }
}
