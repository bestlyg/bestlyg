import { PrismaService } from '@bestlyg-server/common';
import { Injectable, Logger } from '@nestjs/common';
import { dayjs } from '@bestlyg/cli';
import { PageParam, PageData, SelectLedgerPageDto } from '@bestlyg/common';
import { Ledger } from '@bestlyg/common/prisma-client';

@Injectable()
export class LedgerService {
    private readonly logger = new Logger(LedgerService.name);
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
}
