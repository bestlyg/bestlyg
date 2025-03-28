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
    name: '2716. 最小化字符串长度',
    url: 'https://leetcode.cn/problems/minimize-string-length',
    level: 'Easy',
    tagList: [],
    desc: `返回一个表示 最小化 字符串的长度的整数。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.03.24',
            time: 20,
            memory: 17.39,
            desc: '理论上处理N次之后，只会留下所有的不同的字符，只需要计算不同字符的数量即可',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
