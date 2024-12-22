import '@bestlyg/cli/globals';
import { PrismaClient } from '@prisma/client';
// import { xuanDataList } from '@bestlyg/data';
import { getLeetCodeDataList } from '@bestlyg/leetcode';

const { _, dayjs } = best;

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

const scriptMap2 = Object.fromEntries(Object.entries(scriptMap).map(([k, v]) => [v, k]));

const prisma = new PrismaClient();
async function main() {
    console.info('Prisma connected.');
    await prisma.leetcodeProblem.deleteMany();
    const data = await getLeetCodeDataList();
    await prisma.$transaction(async () => {
        for (const dir of data) {
            for (const problem of dir.problems) {
                console.log(problem);
                const { name, url, desc, tagList, solutions, level } = problem.problemData;
                console.log(solutions);
                /** @type {Parameters<typeof prisma.leetcodeProblem.create>['0']['data']} */
                const db = {
                    name,
                    url,
                    desc,
                    tags: tagList,
                    level,
                    solutions: {
                        createMany: {
                            data: solutions.map(({ date, time, memory, script, desc, code }) => {
                                if (!script) {
                                    throw new Error(name);
                                }
                                return {
                                    date: dayjs(date).toDate(),
                                    time,
                                    memory,
                                    script: scriptMap2[script],
                                    desc,
                                    code,
                                };
                            }),
                        },
                    },
                };
                await prisma.leetcodeProblem.create({ data: db });
            }
        }
        // const data = xuanDataList.map(v => {
        //     return {
        //         date: dayjs(v.date).toDate(),
        //         weight: v.weight,
        //         danceTimes: v.danceTimes,
        //     };
        // });

        // await prisma.xuan.createMany({
        //     data,
        // });
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
