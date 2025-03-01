import { PrismaService } from '@bestlyg-server/common';
import { Injectable, Logger } from '@nestjs/common';
import { dayjs } from '@bestlyg/cli';
import { PageParam, PageData, SelectLedgerPageDto } from '@bestlyg/common';
import { Ledger, LedgerType } from '@bestlyg/common/prisma-client';

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
        const typeList: LedgerType[] = [
            'BreakfastWallet',
            'LunchWallet',
            'DinnerWallet',
            'FamilyWallet',
            'TravelWallet',
        ];

        type SummaryRecord = {
            balance: Record<
                | 'BreakfastWallet'
                | 'LunchWallet'
                | 'DinnerWallet'
                | 'FamilyWallet'
                | 'TravelWallet',
                { total: number; cost: number }
            >;
        };

        const res: {
            currentMonth: SummaryRecord;
            all: SummaryRecord;
        } = {
            currentMonth: {
                balance: {
                    BreakfastWallet: { total: 0, cost: 0 },
                    LunchWallet: { total: 0, cost: 0 },
                    DinnerWallet: { total: 0, cost: 0 },
                    FamilyWallet: { total: 0, cost: 0 },
                    TravelWallet: { total: 0, cost: 0 },
                },
            },
            all: {
                balance: {
                    BreakfastWallet: { total: 0, cost: 0 },
                    LunchWallet: { total: 0, cost: 0 },
                    DinnerWallet: { total: 0, cost: 0 },
                    FamilyWallet: { total: 0, cost: 0 },
                    TravelWallet: { total: 0, cost: 0 },
                },
            },
        };

        for (const ty of typeList) {
            const currentMonthCost = await this.prismaService.ledger.aggregate({
                _sum: { balance: true },
                where: {
                    type: ty,
                    date: currentMonth,
                    io: false,
                },
            });
            const currentMonthTotal = await this.prismaService.ledger.aggregate({
                _sum: { balance: true },
                where: {
                    type: ty,
                    date: currentMonth,
                    io: true,
                },
            });
            res.currentMonth.balance[ty].total = currentMonthTotal._sum.balance;
            res.currentMonth.balance[ty].cost = currentMonthCost._sum.balance;

            const allCost = await this.prismaService.ledger.aggregate({
                _sum: { balance: true },
                where: {
                    type: ty,
                    io: false,
                },
            });
            const allTotal = await this.prismaService.ledger.aggregate({
                _sum: { balance: true },
                where: {
                    type: ty,
                    io: true,
                },
            });
            res.all.balance[ty].total = allTotal._sum.balance;
            res.all.balance[ty].cost = allCost._sum.balance;
        }

        return res;
    }
}
