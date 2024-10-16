import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '184. 部门工资最高的员工',
    url: 'https://leetcode.cn/problems/department-highest-salary',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `查找出每个部门中薪资最高的员工。`,
    solutions: [
        {
            script: LeetCodeScript.SQL,
            // date: '2024-09-15',
            time: 1327,
            // memory: 16.45,
            desc: '利用子查询查找比当前薪水大的同部门的人为0的人',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
