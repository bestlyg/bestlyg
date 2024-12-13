import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3264. K 次乘运算后的最终数组 I',
    url: 'https://leetcode.cn/problems/maximum-spending-after-buying-items',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `请你返回执行完 k 次乘运算之后，最终的 nums 数组。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-11-01',
            time: 3,
            memory: 16.95,
            desc: '堆每次取出最小值',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
