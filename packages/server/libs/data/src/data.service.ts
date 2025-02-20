import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { PrismaService } from '@bestlyg-server/common';
import { PageParam, PageData } from '@bestlyg/common';
import { Ledger } from '@bestlyg/common/prisma-client';

@Injectable()
export class DataService {
    constructor(private readonly prismaService: PrismaService) {}

    async getXuanList() {
        const data = await this.prismaService.xuan.findMany();
        return data;
    }

    async getSecrets() {
        const data = await this.prismaService.secrets.findMany();
        return data;
    }
}
