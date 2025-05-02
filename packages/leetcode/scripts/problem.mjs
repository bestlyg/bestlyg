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
    name: '838. 推多米诺',
    url: 'https://leetcode.cn/problems/push-dominoes',
    level: 'Easy',
    tagList: [],
    desc: `返回表示最终状态的字符串。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 187,
            memory: 21.69,
            desc: 'bfs',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
