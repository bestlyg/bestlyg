import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3248. 矩阵中的蛇',
    url: 'https://leetcode.cn/problems/snake-in-matrix',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `返回执行 commands 后蛇所停留的最终单元格的位置。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-11-01',
            time: 7,
            memory: 16.38,
            desc: '模拟',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
