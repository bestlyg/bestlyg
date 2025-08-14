import '@bestlyg/cli/globals';
import { PATH_CODE } from '@bestlyg/leetcode';

// /** @type {import("../dist/types").LeetCodeProblem} */
/** @type {Problem} */
export const problem = {
    exist: true,
    name: '1780. 判断一个数字是否可以表示成三的幂的和',
    url: 'https://leetcode.cn/problems/check-if-number-is-a-sum-of-powers-of-three',
    level: 'Easy',
    tagList: [],
    desc: `给你一个整数 n ，如果你可以将 n 表示成若干个不同的三的幂之和，请你返回 true ，否则请返回 false 。对于一个整数 y ，如果存在整数 x 满足 y == 3x ，我们称这个整数 y 是三的幂。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 744,
            memory: 231.39,
            desc: 'dfs',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
