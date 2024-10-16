import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '185. 部门工资前三高的所有员工',
    url: 'https://leetcode.cn/problems/department-top-three-salaries',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `编写解决方案，找出每个部门中 收入高的员工 。`,
    solutions: [
        {
            script: LeetCodeScript.SQL,
            // date: '2024-09-15',
            time: 1431,
            // memory: 16.45,
            desc: '利用子查询查找比当前薪水大的人数，如果小于3那就说明当前人是前三',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
