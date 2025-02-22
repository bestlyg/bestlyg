import { PrismaService } from '@bestlyg-server/common';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SecretsService {
    private readonly logger = new Logger(SecretsService.name);
    constructor(private readonly prismaService: PrismaService) {}

    async getSecrets() {
        const data = await this.prismaService.secrets.findMany();
        return data;
    }
}
