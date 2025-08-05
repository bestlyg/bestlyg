import '@bestlyg/cli/globals';
import { PATH_CODE } from '@bestlyg/leetcode';

// /** @type {import("../dist/types").LeetCodeProblem} */
/** @type {Problem} */
export const problem = {
    exist: !true,
    name: '3477. 水果成篮 II',
    url: 'https://leetcode.cn/problems/fruits-into-baskets-ii',
    level: 'Easy',
    tagList: [],
    desc: `返回所有可能分配完成后，剩余未放置的水果种类的数量。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 40,
            memory: 17.8,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
