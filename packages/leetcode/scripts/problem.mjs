import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3164. 优质数对的总数 II',
    url: 'https://leetcode.cn/problems/find-the-number-of-good-pairs-ii',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `返回 优质数对 的总数。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: '2024-09-15',
            time: 1814,
            memory: 43.46,
            desc: '计数存储后，遍历所有的因子',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
