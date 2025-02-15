import { Injectable } from '@nestjs/common';
import {
    CreateServerlessCodeDto,
    DeleteServerlessCodeDto,
    SelectLedgerPageDto,
    SelectServerlessCodeDto,
    UpdateServerlessCodeDto,
} from './data.dto';
import dayjs from 'dayjs';
import { PrismaService } from '@bestlyg-server/common';
import { PageParam, PageData } from '@bestlyg/common';
import { Ledger } from '@bestlyg/data/prisma-client';

@Injectable()
export class DataService {
    constructor(private readonly prismaService: PrismaService) {}

    async getLedgerList(...args: Parameters<typeof this.prismaService.ledger.findMany>) {
        const data = await this.prismaService.ledger.findMany(...args);
        return data;
    }
    async getLedgerPage(dto: SelectLedgerPageDto) {
        const pageParam = PageParam.from(dto);
        const total = await this.prismaService.ledger.count({
            where: {
                date: dto.date
                    ? {
                          lte: dayjs(dto.date).endOf('day').toDate(),
                          gte: dayjs(dto.date).startOf('day').toDate(),
                      }
                    : undefined,
            },
        });
        const data = await this.prismaService.ledger.findMany({
            take: pageParam.take,
            skip: pageParam.skip,
            where: {
                date: dto.date
                    ? {
                          lte: dayjs(dto.date).endOf('day').toDate(),
                          gte: dayjs(dto.date).startOf('day').toDate(),
                      }
                    : undefined,
            },
        });
        return new PageData<Ledger>(data, total);
    }

    async getLedgerSummary() {
        const now = dayjs();
        const currentMonth = {
            lte: now.endOf('month').toDate(),
            gte: now.startOf('month').toDate(),
        };

        const breakfastWalletCost = await this.prismaService.ledger.aggregate({
            _sum: { balance: true },
            where: {
                type: 'BreakfastWallet',
                date: currentMonth,
                io: false,
            },
        });
        const breakfastWalletTotal = await this.prismaService.ledger.aggregate({
            _sum: { balance: true },
            where: {
                type: 'BreakfastWallet',
                date: currentMonth,
                io: true,
            },
        });

        const lunchWalletCost = await this.prismaService.ledger.aggregate({
            _sum: { balance: true },
            where: {
                type: 'LunchWallet',
                date: currentMonth,
                io: false,
            },
        });
        const lunchWalletTotal = await this.prismaService.ledger.aggregate({
            _sum: { balance: true },
            where: {
                type: 'LunchWallet',
                date: currentMonth,
                io: true,
            },
        });

        const dinnerWalletCost = await this.prismaService.ledger.aggregate({
            _sum: { balance: true },
            where: {
                type: 'DinnerWallet',
                date: currentMonth,
                io: false,
            },
        });
        const dinnerWalletTotal = await this.prismaService.ledger.aggregate({
            _sum: { balance: true },
            where: {
                type: 'DinnerWallet',
                date: currentMonth,
                io: true,
            },
        });

        return {
            balance: {
                breakfastWallet: {
                    total: breakfastWalletTotal._sum.balance ?? 0,
                    cost: breakfastWalletCost._sum.balance ?? 0,
                },
                lunchWallet: {
                    total: lunchWalletTotal._sum.balance ?? 0,
                    cost: lunchWalletCost._sum.balance ?? 0,
                },
                dinnerWallet: {
                    total: dinnerWalletTotal._sum.balance ?? 0,
                    cost: dinnerWalletCost._sum.balance ?? 0,
                },
            },
        };
    }

    async getXuanList() {
        const data = await this.prismaService.xuan.findMany();
        return data;
    }

    async getSecrets() {
        const data = await this.prismaService.secrets.findMany();
        return data;
    }

    async getLeetcodeProblem({ name }: { name: string }) {
        name = name.split('/').at(-1)!;
        const data = await this.prismaService.leetcodeProblem.findFirst({
            include: { solutions: {} },
            where: { name },
        });
        return data;
    }

    async getLeetcodeProblemList() {
        const data = await this.prismaService.leetcodeProblem.findMany();
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
