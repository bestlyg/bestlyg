/* eslint-disable @typescript-eslint/no-unused-vars */
import '@bestlyg/cli/globals';
import { PrismaClient } from '@prisma/client';
// import { xuanDataList } from '@bestlyg/data';
// import { getLeetCodeDataList } from '@bestlyg/leetcode';

const resolve = best.utils.getResolveFunction(import.meta, 1);
best.dotenv.config({
    path: resolve('node_modules', '@bestlyg', 'config', '.env.local'),
});

const { _, dayjs } = best;

const nDaysAgo = n => new Date(dayjs().subtract(n, 'day').format('YYYY-MM-DD'));
const today = nDaysAgo(0);
const yesterday = nDaysAgo(1);

const prisma = new PrismaClient();

async function createXuan() {
    await prisma.xuan.createMany({
        data: [{ date: today, weight: 6725 }],
    });
}

async function createLedger() {
    const getLedgerRuixin = ({
        balance = 990,
        comment = '瑞幸咖啡，生椰丝绒拿铁',
        date = dayjs().format('YYYY-MM-DD'),
    } = {}) => ({
        io: false,
        balance,
        comment,
        type: 'Drinks',
        date: new Date(date),
    });
    const getLedgerTransport = ({ balance = 100, date = dayjs().format('YYYY-MM-DD') } = {}) => ({
        io: false,
        balance,
        comment: '电动车充电',
        type: 'Transportation',
        date: new Date(date),
    });
    await prisma.ledger.createMany({
        data: [
            // getLedgerTransport({ date: yesterday }),
            // getLedgerTransport({ date: yesterday }),
            // {
            //     io: false,
            //     balance: 12691,
            //     comment: '晚饭，贵州烙锅',
            //     type: 'Food',
            //     date: yesterday,
            // },
            {
                io: false,
                balance: 2869,
                comment: '晚饭，沙县小吃',
                type: 'Food',
                date: today,
            },
            {
                io: false,
                balance: 2869,
                comment: '5160',
                type: 'Generally',
                date: today,
            },
            // getLedgerTransport({ date: new Date('2024-12-26') }),
            // getLedgerTransport({ date: new Date('2024-12-26') }),
            // {
            //     io: false,
            //     balance: 264,
            //     comment: '闲林埠老街，庙山南路停车场',
            //     type: 'Transportation',
            //     date: yesterday,
            // },
            // getLedgerRuixin({ date: yesterday, comment: '小黄油拿铁' }),
            // getLedgerRuixin({ date: yesterday, comment: '厚乳拿铁' }),
            // getLedgerRuixin({ date: yesterday, comment: '丝绒拿铁' }),
        ],
    });
}

async function createLeetcode() {}

async function main() {
    console.info('Prisma connected.');
    // await createXuan(/);
    await createLedger();
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
