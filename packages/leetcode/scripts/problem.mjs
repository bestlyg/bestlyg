import '@bestlyg/cli/globals';
import { PATH_CODE } from '@bestlyg/leetcode';

// /** @type {import("../dist/types").LeetCodeProblem} */
/** @type {Problem} */
export const problem = {
    exist: true,
    name: '904. 水果成篮',
    url: 'https://leetcode.cn/problems/fruit-into-baskets',
    level: 'Easy',
    tagList: [],
    desc: `给你一个整数数组 fruits ，返回你可以收集的水果的 最大 数目。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 346,
            memory: 23.5,
            desc: '双指针，枚举右端点，移动左端点',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
