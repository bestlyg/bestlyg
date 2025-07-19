/**
 * @typedef {import("@bestlyg/common/prisma-client").Prisma.LeetcodeProblemGetPayload<{include: { solutions: true };}>} Problem
 */
import '@bestlyg/cli/globals';
import { PATH_CODE } from '@bestlyg/leetcode';
// import { prismaClient } from '@bestlyg/common';

// /** @type {import("../dist/types").LeetCodeProblem} */
// /** @type {prismaClient.LeetcodeProblem & {solutions:prismaClient.LeetcodeSolution[]}} */
/** @type {Problem} */
export const problem = {
    exist: true,
    name: '1233. 删除子文件夹',
    url: 'https://leetcode.cn/problems/remove-sub-folders-from-the-filesystem',
    level: 'Easy',
    tagList: [],
    desc: `你是一位系统管理员，手里有一份文件夹列表 folder，你的任务是要删除该列表中的所有 子文件夹，并以 任意顺序 返回剩下的文件夹。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 209,
            memory: 41.85,
            desc: '字典树',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
