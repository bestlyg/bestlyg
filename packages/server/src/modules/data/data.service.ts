import { Injectable } from '@nestjs/common';
import { prismaClient } from '@bestlyg/data';
import { PrismaService } from './prisma.service.js';
import {
    CreateServerlessCodeDTO,
    CreateServerlessCodeSchema,
    UpdateServerlessCodeDTO,
    UpdateServerlessCodeSchema,
} from './data.dto.js';

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

    async getServerlessCode(name: string) {
        const data = await this.prismaService.serverlessCode.findFirst({ where: { name } });
        return data;
    }

    async createServerlessCode(data: CreateServerlessCodeDTO) {
        data = await CreateServerlessCodeSchema.parseAsync(data);
        const res = await this.prismaService.serverlessCode.create({ data });
        return res;
    }

    async updateServerlessCode(data: UpdateServerlessCodeDTO) {
        data = await UpdateServerlessCodeSchema.parseAsync(data);
        const res = await this.prismaService.serverlessCode.update({
            where: { id: data.id },
            data,
        });
        return res;
    }

    async deleteServerlessCode({ id, name }: { id?: string; name?: string }) {
        const res = await this.prismaService.serverlessCode.delete({
            where: { id, name },
        });
        return res;
    }
}
