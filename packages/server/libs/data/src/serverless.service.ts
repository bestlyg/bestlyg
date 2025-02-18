import { PrismaService } from '@bestlyg-server/common';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ServerlessService {
    private readonly logger = new Logger(ServerlessService.name);
    constructor(private readonly prismaService: PrismaService) {}

    async getServerless() {
        const data = await this.prismaService.serverless.findMany({
            include: { codes: {} },
        });
        return data;
    }
}
