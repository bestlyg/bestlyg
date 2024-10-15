import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3200. 三角形的最大高度',
    url: 'https://leetcode.cn/problems/maximum-height-of-a-triangle',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `给你两个整数 red 和 blue，分别表示红色球和蓝色球的数量。你需要使用这些球来组成一个三角形，满足第 1 行有 1 个球，第 2 行有 2 个球，第 3 行有 3 个球，依此类推。每一行的球必须是 相同 颜色，且相邻行的颜色必须 不同。返回可以实现的三角形的 最大 高度。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: '2024-09-15',
            time: 30,
            memory: 16.58,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
