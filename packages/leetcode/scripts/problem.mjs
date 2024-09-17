/**
 * @typedef {import("../dist/types").LeetCodeProblem} LeetCodeProblem
 */

import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {LeetCodeProblem} */
export const problem = {
    exist: true,
    name: '815. 公交路线',
    url: 'https://leetcode.cn/problems/points-that-intersect-with-cars',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `给你一个下标从 0 开始的二维整数数组 nums 表示汽车停放在数轴上的坐标。对于任意下标 i，nums[i] = [starti, endi] ，其中 starti 是第 i 辆车的起点，endi 是第 i 辆车的终点。返回数轴上被车 任意部分 覆盖的整数点的数目。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: '2024-09-15',
            time: 193,
            memory: 51.18,
            desc: '利用set存储数据，bfs时对遍历过的值进行O1的删除',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
