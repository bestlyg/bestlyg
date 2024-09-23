import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: true,
    name: '1014. 最佳观光组合',
    url: 'https://leetcode.cn/problems/node-with-highest-edge-score',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `返回 边积分 最高的节点。如果多个节点的 边积分 相同，返回编号 最小 的那个。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: '2024-09-15',
            time: 119,
            memory: 21.2,
            desc: '遍历时记录前面的最大值',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
