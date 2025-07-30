import '@bestlyg/cli/globals';
import { PATH_CODE } from '@bestlyg/leetcode';

// /** @type {import("../dist/types").LeetCodeProblem} */
/** @type {Problem} */
export const problem = {
    exist: !true,
    name: '2419. 按位与最大的最长子数组',
    url: 'https://leetcode.cn/problems/longest-subarray-with-maximum-bitwise-and',
    level: 'Easy',
    tagList: [],
    desc: `返回满足要求的 最长 子数组的长度。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 31,
            memory: 30.20,
            desc: '贪心，直接找最大值的最多连续次数',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
