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

const prisma = new PrismaClient();

async function createXuan() {
    await prisma.xuan.createMany({
        data: [{ date: dayjs(Date.now()).startOf('day'), weight: 6780 }],
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
            {
                io: false,
                balance: 12,
                comment: '欢牛蛋糕屋',
                type: 'Food',
                date: new Date('2024-12-18'),
            },
            {
                io: false,
                balance: 1361,
                comment: '午饭，乡村基，川味现炒',
                type: 'Food',
                date: new Date('2024-12-26'),
            },
            {
                io: false,
                balance: 1462,
                comment: '午饭，乡村基，川味现炒',
                type: 'Food',
                date: new Date('2024-12-25'),
            },
            getLedgerRuixin(),
            getLedgerTransport({ date: new Date('2024-12-26') }),
            getLedgerTransport({ date: new Date('2024-12-26') }),
            {
                io: false,
                balance: 1140000,
                comment: '勾庄佳苑3个月房租',
                type: 'Transportation',
                date: new Date('2024-12-26'),
            },
            getLedgerTransport({ date: new Date('2024-12-24') }),
            getLedgerTransport({ date: new Date('2024-12-24') }),
            {
                io: false,
                balance: 2483,
                comment: '晚饭，沙县小吃',
                type: 'Food',
                date: new Date('2024-12-24'),
            },
        ],
    });
}

async function createLeetcode() {}

async function main() {
    console.info('Prisma connected.');
    // await createXuan();
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
