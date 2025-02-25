//* eslint-disable @typescript-eslint/no-unused-vars */
import { resolve, dayjs, getDate, nDaysAgo, today, yesterday } from './utils.mjs';

async function createXuan() {
    const data = await prisma.xuan.createMany({
        data: [{ date: today, weight: 7020 }],
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
            getLedgerTransport({ date: today }),
            getLedgerTransport({ date: today }),
            {
                io: false,
                balance: 207,
                comment: '10株青菜',
                type: 'LunchWallet',
                date: today,
            },
            {
                io: false,
                balance: 9100,
                comment: '晚饭，溪雨观酸菜鱼',
                type: 'Food',
                date: today,
            },
        ],
    });
    return data;
}

async function main() {
    console.info('Prisma connected.');
    let data;
    data = await createXuan();
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
