/**
 * @typedef {import("../dist/types").LeetCodeProblem} LeetCodeProblem
 */

import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '2374. 边积分最高的节点',
    url: 'https://leetcode.cn/problems/node-with-highest-edge-score',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `返回 边积分 最高的节点。如果多个节点的 边积分 相同，返回编号 最小 的那个。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: '2024-09-15',
            time: 196,
            memory: 27.92,
            desc: '遍历' ,
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
