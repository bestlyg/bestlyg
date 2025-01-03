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

/**
 * @param {string} s
 * @param {(v:import('dayjs').Dayjs)=>import('dayjs').Dayjs} customDayjs
 */
const getDate = (s, customDayjs = v => v) => new Date(customDayjs(dayjs(s)).format('YYYY-MM-DD'));
const nDaysAgo = n => getDate(undefined, v => v.subtract(n, 'day'));
const today = nDaysAgo(0);
const yesterday = nDaysAgo(1);

const prisma = new PrismaClient();

async function createXuan() {
    const data = await prisma.xuan.createMany({
        data: [{ date: today, weight: 6810 }],
    });
    return data;
}

async function createLedger() {
    const getLedgerRuixin = ({
        balance = 990,
        comment = '瑞幸咖啡，生椰丝绒拿铁',
        date = today,
    } = {}) => ({
        io: false,
        balance,
        comment,
        type: 'Drinks',
        date,
    });
    const getLedgerTransport = ({ balance = 100, date = today } = {}) => ({
        io: false,
        balance,
        comment: '电动车充电',
        type: 'Transportation',
        date,
    });
    const data = await prisma.ledger.createMany({
        data: [
            {
                io: false,
                balance: 2677,
                comment: '晚饭，沙县小吃',
                type: 'Food',
                date: today,
            },
            {
                io: false,
                balance: 100000,
                comment: '瑄',
                type: 'RedEnvelope',
                date: today,
            },
            getLedgerRuixin(),
            {
                io: false,
                balance: 1300,
                comment: '美团企业，奈雪的茶，杭州西溪银泰店',
                type: 'Drinks',
                date: today,
            },
            {
                io: false,
                balance: 2589,
                comment: '美团企业，宝岛便当，浙港国际店',
                type: 'Drinks',
                date: today,
            },
            {
                io: true,
                balance: 338342,
                comment: '出差报销',
                type: 'Generally',
                date: getDate('2025-01-02'),
            },
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
