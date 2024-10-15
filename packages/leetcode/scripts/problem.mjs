import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '178. 分数排名',
    url: 'https://leetcode.cn/problems/rank-scores',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `编写一个解决方案来查询分数的排名。按 score 降序返回结果表。`,
    solutions: [
        {
            script: LeetCodeScript.SQL,
            // date: '2024-09-15',
            time: 805,
            // memory: 16.58,
            desc: '查找score时同时查找大于当前分数的数量',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
