/**
 * @typedef {import("../dist/types").LeetCodeProblem} LeetCodeProblem
 */

import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {LeetCodeProblem} */
export const problem = {
    exist: true,
    name: '2552. 统计上升四元组',
    url: 'https://leetcode.cn/problems/count-increasing-quadruplets',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `给你一个长度为 n 下标从 0 开始的整数数组 nums ，它包含 1 到 n 的所有数字，请你返回上升四元组的数目。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 2666,
            memory: 16.88,
            desc: '定义三元组为i<j<k&&v[i]<v[k]<v[j]，遍历时同时记录前面的三元组数量，以及当前节点当k位置时的数量',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
