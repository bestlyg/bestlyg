import '@bestlyg/cli/globals';
import { PrismaClient } from '@prisma/client';
// import { xuanDataList } from '@bestlyg/data';
import { getLeetCodeDataList } from '@bestlyg/leetcode';

const { _, dayjs } = best;

const resolve = best.utils.getResolveFunction(import.meta, 1);

// 68
// 68.1

const scriptMap = {
    JS: 'javascript',
    TS: 'typescript',
    PY: 'python',
    CS: 'c#',
    C: 'c',
    CPP: 'cpp',
    JAVA: 'java',
    GO: 'go',
    RUST: 'rust',
    SQL: 'sql',
};

const prisma = new PrismaClient();

async function createXuan() {
    await prisma.xuan.createMany({
        data: [{ date: dayjs(Date.now()).startOf('day'), weight: 687 }],
    });
}

async function createLedger() {
    await prisma.ledger.createMany({});
}

async function createLeetcode() {}

async function main() {
    console.info('Prisma connected.');
    await createXuan();
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
