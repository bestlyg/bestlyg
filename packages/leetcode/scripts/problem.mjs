import '@bestlyg/cli/globals';
import { PATH_CODE } from '@bestlyg/leetcode';

// /** @type {import("../dist/types").LeetCodeProblem} */
/** @type {Problem} */
export const problem = {
    exist: !true,
    name: '2683. 相邻值的按位异或',
    url: 'https://leetcode.cn/problems/neighboring-bitwise-xor',
    level: 'Easy',
    tagList: [],
    desc: `给你一个数组 derived ，请判断是否存在一个能够派生得到 derived 的 有效原始二进制数组 original 。如果存在满足要求的原始二进制数组，返回 true ；否则，返回 false 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 149,
            memory: 22,
            desc: '尝试开头为0和开头为1的数组',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
