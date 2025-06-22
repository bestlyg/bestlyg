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
    exist: !true,
    name: '2138. 将字符串拆分为若干长度为 k 的组',
    url: 'https://leetcode.cn/problems/divide-a-string-into-groups-of-size-k',
    level: 'Easy',
    tagList: [],
    desc: `给你一个字符串 s ，以及每组的长度 k 和一个用于填充的字符 fill ，按上述步骤处理之后，返回一个字符串数组，该数组表示 s 分组后 每个组的组成情况 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 0,
            memory:17.79,
            desc: '先补齐再遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
