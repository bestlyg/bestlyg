import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3243. 新增道路查询后的最短距离 I',
    url: 'https://leetcode.cn/problems/shortest-distance-after-road-addition-queries-i',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `返回一个数组 answer，对于范围 [0, queries.length - 1] 中的每个 i，answer[i] 是处理完前 i + 1 个查询后，从城市 0 到城市 n - 1 的最短路径的长度。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-11-01',
            time: 421,
            memory: 16.93,
            desc: 'bfs',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
