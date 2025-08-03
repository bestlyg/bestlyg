import '@bestlyg/cli/globals';
import { PATH_CODE } from '@bestlyg/leetcode';

// /** @type {import("../dist/types").LeetCodeProblem} */
/** @type {Problem} */
export const problem = {
    exist: true,
    name: '2106. 摘水果',
    url: 'https://leetcode.cn/problems/rearranging-fruits',
    level: 'Easy',
    tagList: [],
    desc: `返回你可以摘到水果的 最大总数 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 197,
            memory: 51.39,
            desc: '尝试左边走N个，剩余部署走右边，右边走N个，剩余步数走左边',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
