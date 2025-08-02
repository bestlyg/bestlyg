import '@bestlyg/cli/globals';
import { PATH_CODE } from '@bestlyg/leetcode';

// /** @type {import("../dist/types").LeetCodeProblem} */
/** @type {Problem} */
export const problem = {
    exist: true,
    name: '2561. 重排水果',
    url: 'https://leetcode.cn/problems/rearranging-fruits',
    level: 'Easy',
    tagList: [],
    desc: `返回使两个果篮相等的最小交换成本，如果无法使两个果篮相等，则返回 -1 。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 236,
            memory: 53.92,
            desc: '枚举',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
