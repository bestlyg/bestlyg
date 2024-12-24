import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: true,
    name: '1705. 吃苹果的最大数目',
    url: 'https://leetcode.cn/problems/maximum-number-of-eaten-apples',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `给你两个长度为 n 的整数数组 days 和 apples ，返回你可以吃掉的苹果的最大数目。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: '2024-11-01',
            time: 981,
            memory: 22.36,
            
            desc: '有序数组遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
