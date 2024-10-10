import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3162. 优质数对的总数 I',
    url: 'https://leetcode.cn/problems/find-the-number-of-good-pairs-i',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `返回 优质数对 的总数。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: '2024-09-15',
            time: 45,
            memory: 16.57,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
