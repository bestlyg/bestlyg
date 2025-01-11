import { Injectable } from '@nestjs/common';
import { prismaClient } from '@bestlyg/data';
import { PrismaService } from './prisma.service.js';

@Injectable()
export class DataService {
    constructor(private readonly prismaService: PrismaService) {}
    async getLedgers() {
        const data = await this.prismaService.ledger.findMany();
        return data;
    }

    async getXuanList() {
        const data = await this.prismaService.xuan.findMany();
        return data;
    }

    async getSecrets() {
        const data = await this.prismaService.secrets.findMany();
        return data;
    }

    async getLeetcodeProblems() {
        const data = await this.prismaService.leetcodeProblem.findMany({
            include: { solutions: {} },
        });
        return data;
    }

    async getServerless() {
        const data = await this.prismaService.serverless.findMany({
            include: { codes: {} },
        });
        return data;
    }
}
