import { Injectable } from '@nestjs/common';
import {
    CreateServerlessCodeDto,
    DeleteServerlessCodeDto,
    SelectServerlessCodeDto,
    UpdateServerlessCodeDto,
    UpdateServerlessCodeSchema,
} from './data.dto';
import { PrismaService } from '@bestlyg-server/common';

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

    async getServerlessCode(dto: SelectServerlessCodeDto) {
        const data = await this.prismaService.serverlessCode.findFirst({ where: dto });
        return data;
    }

    async createServerlessCode(dto: CreateServerlessCodeDto) {
        const res = await this.prismaService.serverlessCode.create({ data: dto });
        return res;
    }

    async updateServerlessCode(dto: UpdateServerlessCodeDto) {
        const res = await this.prismaService.serverlessCode.update({
            where: { id: dto.id },
            data: dto,
        });
        return res;
    }

    async deleteServerlessCode(dto: DeleteServerlessCodeDto) {
        const res = await this.prismaService.serverlessCode.delete({
            where: dto as any,
        });
        return res;
    }
}
