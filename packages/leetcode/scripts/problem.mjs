import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: true,
    name: '134. 加油站',
    url: 'https://leetcode.cn/problems/minimum-time-to-complete-trips',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `给你一个整数 totalTrips ，表示所有公交车 总共 需要完成的旅途数目。请你返回完成 至少 totalTrips 趟旅途需要花费的 最少 时间。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: '2024-09-15',
            time: 95,
            memory: 22.05,
            desc: '对于每一个下标进行尝试，如果尝试失败则从下一个失败点进行尝试',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
