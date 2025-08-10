import '@bestlyg/cli/globals';
import { PATH_CODE } from '@bestlyg/leetcode';

// /** @type {import("../dist/types").LeetCodeProblem} */
/** @type {Problem} */
export const problem = {
    exist: true,
    name: '869. 重新排序得到 2 的幂',
    url: 'https://leetcode.cn/problems/reordered-power-of-2',
    level: 'Easy',
    tagList: [],
    desc: `如果存在一个整数 x 使得 n == 2x ，则认为 n 是 2 的幂次方。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 0,
            memory: 17.42,
            desc: '计数比较',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
