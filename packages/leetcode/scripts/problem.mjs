import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3192. 使二进制数组全部等于 1 的最少操作次数 II',
    url: 'https://leetcode.cn/problems/minimum-operations-to-make-binary-array-elements-equal-to-one-ii',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `请你返回将 nums 中所有元素变为 1 的 最少 操作次数。`,
    solutions: [
        {
            script: LeetCodeScript.SQL,
            // date: '2024-09-15',
            time: 62,
            memory: 20.55,
            desc: '从前往后依次翻转0',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
