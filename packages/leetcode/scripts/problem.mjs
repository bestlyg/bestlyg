/**
 * @typedef {import("./types").LeetCodeProblem} LeetCodeProblem
 */

import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, codePath } from './utils.mjs';

/** @type {LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '1232. 找到 Alice 和 Bob 可以相遇的建筑',
    url: 'https://leetcode.cn/problems/find-building-where-alice-and-bob-can-meet',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `请你能返回一个数组 ans ，其中 ans[i] 是第 i 个查询中，Alice 和 Bob 可以相遇的 最左边的建筑 。如果对于查询 i ，Alice 和 Bob 不能相遇，令 ans[i] 为 -1 。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 324,
            memory: 39.23,
            desc: '离线处理queries，过滤能立即得出答案的，剩余的一定是h[i] > h[j]，此时从左往右遍历h，维护当前下标之前的所有需求最小堆',
            code: await fs.readFile(codePath, 'utf8'),
        },
    ],
};
