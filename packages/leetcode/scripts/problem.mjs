import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '262. 行程和用户',
    url: 'https://leetcode.cn/problems/trips-and-users',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `编写解决方案找出 "2013-10-01" 至 "2013-10-03" 期间非禁止用户（乘客和司机都必须未被禁止）的取消率。非禁止用户即 banned 为 No 的用户，禁止用户即 banned 为 Yes 的用户。其中取消率 Cancellation Rate 需要四舍五入保留 两位小数 。`,
    solutions: [
        {
            script: LeetCodeScript.SQL,
            // date: '2024-09-15',
            time: 767,
            // memory: 16.45,
            desc: '先用子查询查找到每个时间段的符合条件的取消次数，再在外部查询中相加求结果',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
