import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3185. 构成整天的下标对数目 II',
    url: 'https://leetcode.cn/problems/count-pairs-that-form-a-complete-day-ii',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `给你一个整数数组 hours，表示以 小时 为单位的时间，返回一个整数，表示满足 i < j 且 hours[i] + hours[j] 构成 整天 的下标对 i, j 的数目。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-09-15',
            time: 75,
            memory: 60.75,
            desc: '取模后遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
