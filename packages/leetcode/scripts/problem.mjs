import '@bestlyg/cli/globals';
import { PATH_CODE } from '@bestlyg/leetcode';

// /** @type {import("../dist/types").LeetCodeProblem} */
/** @type {Problem} */
export const problem = {
    exist: true,
    name: '342. 4的幂',
    url: 'https://leetcode.cn/problems/power-of-four',
    level: 'Easy',
    tagList: [],
    desc: `给定一个整数，写一个函数来判断它是否是 4 的幂次方。如果是，返回 true ；否则，返回 false 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 0,
            memory: 17.36,
            desc: '判断他是大于0的且开根号后是个整数的且二进制只有一个1的数',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
