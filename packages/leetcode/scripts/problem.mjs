import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '175. 组合两个表',
    url: 'https://leetcode.cn/problems/combine-two-tables',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `编写解决方案，报告 Person 表中每个人的姓、名、城市和州。如果 personId 的地址不在 Address 表中，则报告为 null 。`,
    solutions: [
        {
            script: LeetCodeScript.MYSQL,
            // date: '2024-09-15',
            time: 547,
            // memory: 21.09,
            desc: 'left join',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
