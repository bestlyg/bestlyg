import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '177. 第N高的薪水',
    url: 'https://leetcode.cn/problems/nth-highest-salary',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `查询 Employee 表中第 n 高的工资。如果没有第 n 个最高工资，查询结果应该为 null 。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: '2024-09-15',
            time: 1052,
            // memory: 16.58,
            desc: '通过子查询查到当前超过当前薪水人数的总数',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
