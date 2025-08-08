import '@bestlyg/cli/globals';
import { PATH_CODE } from '@bestlyg/leetcode';

// /** @type {import("../dist/types").LeetCodeProblem} */
/** @type {Problem} */
export const problem = {
    exist: !true,
    name: '3363. 最多可收集的水果数目',
    url: 'https://leetcode.cn/problems/find-the-maximum-number-of-fruits-collected',
    level: 'Easy',
    tagList: [],
    desc: `请你返回三个小朋友总共 最多 可以收集多少个水果。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 2531,
            memory: 396.37,
            desc: '中间的人只能走一条线，下面的人只能走下半区，上面的人只能走上半区，进行DFS',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
