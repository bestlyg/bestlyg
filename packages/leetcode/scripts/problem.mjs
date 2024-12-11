import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '2717. 半有序排列',
    url: 'https://leetcode.cn/problems/semi-ordered-permutation',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `返回使 nums 变成 半有序排列 所需的最小操作次数。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-11-01',
            time: 0,
            memory: 16.88,
            desc: '遍历找到最大最小值后直接交换',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
