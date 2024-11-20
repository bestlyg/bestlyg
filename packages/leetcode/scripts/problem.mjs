import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3244. 新增道路查询后的最短距离 II',
    url: 'https://leetcode.cn/problems/shortest-distance-after-road-addition-queries-ii',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `返返回一个数组 answer，对于范围 [0, queries.length - 1] 中的每个 i，answer[i] 是处理完前 i + 1 个查询后，从城市 0 到城市 n - 1 的最短路径的长度。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-11-01',
            time: 79,
            memory: 44.22,
            desc: '贪心，考虑到不会交叉的路径，尽可能选择新连接的路径即可',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
