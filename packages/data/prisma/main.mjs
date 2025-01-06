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
        data: [{ date: today, weight: 6860 }],
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
        data: [],
    });
    return data;
}

async function main() {
    console.info('Prisma connected.');
    let data;
    // data = await createXuan();
    // data = await createLedger();
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
