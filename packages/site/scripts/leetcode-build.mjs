/**
 * @typedef {import("@bestlyg/leetcode").LeetCodeProblemData} LeetCodeProblemData
 * @typedef {import("@bestlyg/leetcode").LeetCodeSolution} LeetCodeSolution
 * @typedef {import("@bestlyg/leetcode").LeetCodeReadmeDataItem} LeetCodeReadmeDataItem
 *
 */

import '@bestlyg/cli/globals';
import { prismaClient } from '@bestlyg/data';
import {
    getLeetCodeDataList,
    getLeetCodeReadme,
    PATH_DATA,
    getDirNameFromProblemName,
    dirSort,
} from '@bestlyg/leetcode';

// const dataList = await getLeetCodeDataList();
const resolve = best.utils.getResolveFunction(import.meta, 1);
const leetcodeRootPath = resolve('docs', 'leetcode');
const quote = '`';

/**
 * @param {prismaClient.LeetcodeSolution} solution
 * @param {number} idx
 */
function solutionToTemplate(solution, idx) {
    const { script, date, time, memory, code, desc } = solution;
    return `
## 题解 ${idx + 1} - ${script}

- 编辑时间：${best.dayjs(date).format('YYYY-MM-DD')}  
${time ? `- 执行用时：${time}ms  ` : ''}
${memory ? `- 内存消耗：${memory}MB  ` : ''}
- 编程语言：${script}  
- 解法介绍：{${quote}${desc}${quote}}  

${new Array(3).fill(quote).join('')}${script}
${code}
${new Array(3).fill(quote).join('')}
`
        .trim()
        .replace(/\n\n/g, '\n');
}

/**
 * @param {prismaClient.LeetcodeProblem} problem
 */
function problemToTemplate(problem) {
    const { name, url, level, tags, solutions, desc } = problem;
    return `
# ${name}

> 链接：[${name}](${url})  
> 难度：${level}  
> 标签：${tags.join('、')}  
> 简介：{${quote}${desc}${quote}}  

${solutions.map(solutionToTemplate).join('\n\n')}
`.trim();
}

async function buildCategoryJson() {
    const dirs = await fs.readdir(leetcodeRootPath);
    await Promise.all(
        dirs
            .filter(v => !v.includes('.'))
            .sort(dirSort)
            .map(async (item, idx) => {
                const filePath = resolve(leetcodeRootPath, item, '_category_.json');
                await fs.writeFile(
                    filePath,
                    JSON.stringify({
                        label: item,
                        position: idx + 1,
                    }),
                );
            }),
    );
}

async function buildDataList() {
    await Promise.all(
        dataList
            .map(data =>
                data.problems.map(async problem => {
                    const fileName = path.basename(problem.problemPath, '.json');
                    const filePath = resolve(
                        leetcodeRootPath,
                        path.relative(PATH_DATA, data.dirPath),
                        fileName + '.md',
                    );
                    await fs.ensureDir(path.dirname(filePath));
                    await fs.writeFile(filePath, problemToTemplate(problem));
                }),
            )
            .flat(),
    );
}

async function buildReadme() {
    const readme = await getLeetCodeReadme();
    /**
     * @param {string} title
     * @param {LeetCodeReadmeDataItem[]} dataItemList
     */
    function buildReadmeDataItem(title, dataItemList) {
        return `
## ${title}

${dataItemList
    .map(item =>
        `
### ${item.label}

${item.problems.map(v => `- ${v}`).join('\n')}
`.trim(),
    )
    .join('\n\n')}
`.trim();
    }
    const data = `
---
sidebar_position: 1
---

# LeetCode

## 介绍

个人 LeetCode 题解

- 总题目数: ${readme.problemCount}
- 总题解数: ${readme.solutionCount}

${buildReadmeDataItem('顺序索引', readme.index)}
${buildReadmeDataItem('标签索引', readme.tag)}
${buildReadmeDataItem('难度索引', readme.level)}
`.trim();
    const filePath = resolve(leetcodeRootPath, 'index.md');
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, data);
    await fs.writeFile(
        resolve(leetcodeRootPath, '_category_.json'),
        JSON.stringify({ label: 'LeetCode', position: 4 }),
    );
}

/**
 * @param {prismaClient.LeetcodeProblem} problem
 */
async function buildProblem(problem) {
    console.log(problem.name);
    const dirName = getDirNameFromProblemName(problem.name);
    const filePath = resolve(leetcodeRootPath, dirName, problem.name + '.md');
    await fs.ensureDir(path.dirname(filePath));
    const problemContent = problemToTemplate(problem);
    await fs.writeFile(filePath, problemContent);
}

async function main() {
    // await Promise.all([buildDataList(), buildReadme(), buildCategoryJson()]);
    const prisma = new prismaClient.PrismaClient();
    const problems = await prisma.leetcodeProblem.findMany({ include: { solutions: {} } });
    await Promise.all(problems.map(buildProblem));
    await buildCategoryJson();
}

await main();
