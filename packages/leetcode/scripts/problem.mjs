import '@bestlyg/cli/globals';
import { PATH_CODE } from '@bestlyg/leetcode';

// /** @type {import("../dist/types").LeetCodeProblem} */
/** @type {Problem} */
export const problem = {
    exist: !true,
    name: '2438. 二的幂数组中查询范围内的乘积',
    url: 'https://leetcode.cn/problems/range-product-queries-of-powers',
    level: 'Easy',
    tagList: [],
    desc: `请你返回一个数组 answers ，长度与 queries 的长度相同，其中 answers[i]是第 i 个查询的答案。由于查询的结果可能非常大，请你将每个 answers[i] 都对 109 + 7 取余 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 47,
            memory: 47.24,
            desc: '对n的每一个1位进行记录',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
