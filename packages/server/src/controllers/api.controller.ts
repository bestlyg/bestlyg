import { Controller, Get, UseGuards } from '@nestjs/common';
import { BaseController } from './base.controller.js';
import { dayjs } from '@bestlyg/cli';
import { prismaClient } from '@bestlyg/data';
import { prisma } from '../utils/index.js';
import { AuthGuard } from '../guards/auth.guard.js';

@Controller('/api')
export class ApiController extends BaseController {
    @Get('/health')
    async health() {
        return this.of(async () => `health-check: ${dayjs().format('YYYY-MM-DD hh:mm:ss')}`);
    }

    @UseGuards(AuthGuard)
    @Get('/data/ledger')
    async ledger() {
        return this.of(async () => {
            const data: prismaClient.Ledger[] = await prisma.ledger.findMany();
            return data;
        });
    }

    @UseGuards(AuthGuard)
    @Get('/data/xuan')
    async xuan() {
        return this.of(async () => {
            const data: prismaClient.Xuan[] = await prisma.xuan.findMany();
            return data;
        });
    }

    @UseGuards(AuthGuard)
    @Get('/data/secrets')
    async secrets() {
        return this.of(async () => {
            const data: prismaClient.Secrets[] = await prisma.secrets.findMany();
            return data;
        });
    }

    @UseGuards(AuthGuard)
    @Get('/data/leetcode')
    async leetcode() {
        return this.of(async () => {
            const data: prismaClient.LeetcodeProblem[] = await prisma.leetcodeProblem.findMany({
                include: { solutions: {} },
            });
            return data;
        });
    }
}
