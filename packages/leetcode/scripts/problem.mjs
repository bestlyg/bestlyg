import '@bestlyg/cli/globals';
import { PATH_CODE } from '@bestlyg/leetcode';

// /** @type {import("../dist/types").LeetCodeProblem} */
/** @type {Problem} */
export const problem = {
    exist: !true,
    name: '2787. 将一个数字表示成幂的和的方案数',
    url: 'https://leetcode.cn/problems/ways-to-express-an-integer-as-sum-of-powers',
    level: 'Easy',
    tagList: [],
    desc: `给你两个 正 整数 n 和 x 。请你返回将 n 表示成一些 互不相同 正整数的 x 次幂之和的方案数。换句话说，你需要返回互不相同整数 [n1, n2, ..., nk] 的集合数目，满足 n = n1x + n2x + ... + nkx 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 2072,
            memory: 664.86,
            desc: 'dfs',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
