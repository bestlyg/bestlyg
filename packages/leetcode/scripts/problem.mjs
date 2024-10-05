import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '2187. 完成旅途的最少时间',
    url: 'https://leetcode.cn/problems/minimum-time-to-complete-trips',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `给你一个整数 totalTrips ，表示所有公交车 总共 需要完成的旅途数目。请你返回完成 至少 totalTrips 趟旅途需要花费的 最少 时间。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: '2024-09-15',
            time: 2504,
            memory: 28.99,
            desc: '二分答案',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
