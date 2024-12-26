import { Controller, Get, UseGuards } from '@nestjs/common';
import { dayjs } from '@bestlyg/cli';
import { prismaClient } from '@bestlyg/data';
import { ResponseEntity } from '@bestlyg/common';
import { prisma } from '../utils/index.js';
import { AuthGuard } from '../guards/auth.guard.js';

@Controller('/api')
export class ApiController {
    @Get('/health')
    async health() {
        return ResponseEntity.ofSuccess(`health-check: ${dayjs().format('YYYY-MM-DD hh:mm:ss')}`);
    }

    @UseGuards(AuthGuard)
    @Get('/data/ledger')
    async ledger() {
        const data: prismaClient.Ledger[] = await prisma.ledger.findMany();
        return ResponseEntity.ofSuccess(data);
    }

    @UseGuards(AuthGuard)
    @Get('/data/xuan')
    async xuan() {
        const data: prismaClient.Xuan[] = await prisma.xuan.findMany();
        return ResponseEntity.ofSuccess(data);
    }

    @UseGuards(AuthGuard)
    @Get('/data/secrets')
    async secrets() {
        const data: prismaClient.Secrets[] = await prisma.secrets.findMany();
        return ResponseEntity.ofSuccess(data);
    }

    @UseGuards(AuthGuard)
    @Get('/data/leetcode')
    async leetcode() {
        const data: prismaClient.LeetcodeProblem[] = await prisma.leetcodeProblem.findMany({
            include: { solutions: {} },
        });
        return ResponseEntity.ofSuccess(data);
    }
}
