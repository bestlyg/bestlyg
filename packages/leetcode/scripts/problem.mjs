import '@bestlyg/cli/globals';
import { PATH_CODE } from '@bestlyg/leetcode';

// /** @type {import("../dist/types").LeetCodeProblem} */
/** @type {Problem} */
export const problem = {
    exist: !true,
    name: '2348. 全 0 子数组的数目',
    url: 'https://leetcode.cn/problems/number-of-zero-filled-subarrays',
    level: 'Easy',
    tagList: [],
    desc: `给你一个整数数组 nums ，返回全部为 0 的 子数组 数目。子数组 是一个数组中一段连续非空元素组成的序列。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 60,
            memory: 27.88,
            desc: '遍历所有的0',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
