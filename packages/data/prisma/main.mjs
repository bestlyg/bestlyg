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
    const data = await prisma.xuan.createMany({
        data: [{ date: today, weight: 68 }],
    });
    return data;
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
    const data = await prisma.ledger.createMany({
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
                balance: 2991,
                comment: '晚饭，兰州牛肉拉面',
                type: 'Food',
                date: today,
            },
            {
                io: false,
                balance: 3590,
                comment: '午饭，池奈人气单餐',
                type: 'Food',
                date: today,
            },
            getLedgerTransport(),
            getLedgerTransport(),
        ],
    });
    return data;
}

async function main() {
    console.info('Prisma connected.');
    let data;
    // data = await createXuan();
    data = await createLedger();
    console.log(data);
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
