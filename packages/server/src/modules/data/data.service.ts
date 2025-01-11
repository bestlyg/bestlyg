import { Injectable } from '@nestjs/common';
import { prismaClient } from '@bestlyg/data';
import { PrismaService } from './prisma.service.js';

@Injectable()
export class DataService {
    constructor(private readonly prismaService: PrismaService) {}
    async getLedgers() {
        const data: prismaClient.Ledger[] = await this.prismaService.ledger.findMany();
        return data;
    }

    async getXuanList() {
        const data: prismaClient.Xuan[] = await this.prismaService.xuan.findMany();
        return data;
    }

    async getSecrets() {
        const data: prismaClient.Secrets[] = await this.prismaService.secrets.findMany();
        return data;
    }

    async getLeetcodeProblems() {
        const data: (prismaClient.LeetcodeProblem & {
            solutions?: prismaClient.LeetcodeSolution[];
        })[] = await this.prismaService.leetcodeProblem.findMany({
            include: { solutions: {} },
        });
        return data;
    }

    async getServerless() {
        const data: (prismaClient.Serverless & {
            codes?: prismaClient.ServerlessCode[];
        })[] = await this.prismaService.serverless.findMany({
            include: { codes: {} },
        });
        return data;
    }
}
