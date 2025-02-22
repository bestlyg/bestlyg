import { PrismaService } from '@bestlyg-server/common';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class XuanService {
    private readonly logger = new Logger(XuanService.name);
    constructor(private readonly prismaService: PrismaService) {}

    async getXuanList() {
        const data = await this.prismaService.xuan.findMany();
        return data;
    }
}
