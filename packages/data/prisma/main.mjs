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
        data: [{ date: today, weight: 6765 }],
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
                balance: 5990,
                comment: '电影，误杀3',
                type: 'Movie',
                date: today,
            },
            {
                io: false,
                balance: 13574,
                comment: '电费',
                type: 'Rent',
                date: today,
            },
            {
                io: false,
                balance: 9300,
                comment: '美团企业，晚饭，溪雨观酸菜鱼，西田城店',
                type: 'Food',
                date: today,
            },
            {
                io: false,
                balance: 2650,
                comment: '美团企业，春熙谢茶，杭州金地广场店',
                type: 'Drinks',
                date: today,
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
