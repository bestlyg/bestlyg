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
        data: [{ date: dayjs(Date.now()).startOf('day'), weight: 68 }],
    });
}

async function createLedger() {
    await prisma.ledger.createMany({
        data: [
            {
                io: false,
                balance: 990,
                comment: '瑞幸咖啡，生椰丝绒拿铁',
                type: 'Drinks',
                date: new Date('2024-12-24'),
            },
            {
                io: false,
                balance: 1590,
                comment: '午饭，余味隆江猪脚饭',
                type: 'Food',
                date: new Date('2024-12-24'),
            },
            {
                io: false,
                balance: 100,
                comment: '电动车充电',
                type: 'Transportation',
                date: new Date('2024-12-23'),
            },
            {
                io: false,
                balance: 100,
                comment: '电动车充电',
                type: 'Transportation',
                date: new Date('2024-12-23'),
            },
            {
                io: false,
                balance: 2600,
                comment: '晚饭，兰州拉面',
                type: 'Food',
                date: new Date('2024-12-23'),
            },
            {
                io: false,
                balance: 1990,
                comment: '午饭，乡村基',
                type: 'Food',
                date: new Date('2024-12-23'),
            },
            {
                io: false,
                balance: 100,
                comment: '电动车充电',
                type: 'Transportation',
                date: new Date('2024-12-23'),
            },
            {
                io: false,
                balance: 100,
                comment: '电动车充电',
                type: 'Transportation',
                date: new Date('2024-12-22'),
            },
            {
                io: false,
                balance: 100,
                comment: '电动车充电',
                type: 'Transportation',
                date: new Date('2024-12-22'),
            },
            {
                io: false,
                balance: 3400,
                comment: 'Arcaea充值',
                type: 'Generally',
                date: new Date('2024-12-21'),
            },
            {
                io: false,
                balance: 9100,
                comment: '晚饭，溪雨观酸菜鱼',
                type: 'Food',
                date: new Date('2024-12-21'),
            },
            {
                io: false,
                balance: 990,
                comment: '瑞幸咖啡，生椰丝绒拿铁',
                type: 'Drinks',
                date: new Date('2024-12-21'),
            },
            {
                io: false,
                balance: 100,
                comment: '电动车充电',
                type: 'Transportation',
                date: new Date('2024-12-20'),
            },
            {
                io: false,
                balance: 100,
                comment: '电动车充电',
                type: 'Transportation',
                date: new Date('2024-12-20'),
            },
            {
                io: false,
                balance: 1024,
                comment: '美团企业，霸王茶姬，西溪西港店',
                type: 'Drinks',
                date: new Date('2024-12-23'),
            },
            {
                io: false,
                balance: 2500,
                comment: '午饭，美团企业，鲜目录中国寿司，浙大紫金港店',
                type: 'Food',
                date: new Date('2024-12-21'),
            },
            {
                io: false,
                balance: 4000,
                comment: '美团企业，霸王茶姬，西溪龙湖天街店',
                type: 'Drinks',
                date: new Date('2024-12-21'),
            },
            {
                io: false,
                balance: 1300,
                comment: '午饭，美团企业，乡村基，川味现炒，西溪银泰店',
                type: 'Food',
                date: new Date('2024-12-21'),
            },
            {
                io: false,
                balance: 5456,
                comment: '午饭，美团企业，梨泰院，韩国料理，炸鸡，西溪诚品店',
                type: 'Food',
                date: new Date('2024-12-19'),
            },
            {
                io: false,
                balance: 2450,
                comment: '午饭，美团企业，曾三仙米线，龙湖西溪天街店',
                type: 'Food',
                date: new Date('2024-12-18'),
            },
            {
                io: false,
                balance: 3414,
                comment: '午饭，美团企业，杨国福麻辣烫，麻辣拌，西园九路店',
                type: 'Food',
                date: new Date('2024-12-18'),
            },
        ],
    });
}

async function createLeetcode() {}

async function main() {
    console.info('Prisma connected.');
    // await createXuan();
    // await createLedger();
    const ledger = await prisma.ledger.findMany({});
    await prisma.ledger.deleteMany({});
    await prisma.ledger.createMany({
        data: ledger
            .sort((v1, v2) => v2.date.getTime() - v1.date.getTime())
            .map(v => ({
                ...v,
                date: new Date(dayjs(v.date).format('YYYY-MM-DD')),
            })),
    });
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
