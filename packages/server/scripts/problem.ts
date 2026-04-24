import '@bestlyg/cli/globals';
import fs from 'fs-extra';
import {
    Ledger,
    LeetcodeProblem,
    Xuan,
    LeetcodeSolution,
    LeetcodeLevelType,
    LeetcodeScriptType,
} from '../external';
import path from 'path';
// import { PATH_CODE } from '@bestlyg/leetcode';

// /** @type {import("../dist/types").LeetCodeProblem} */
// /** @type {Problem} */
export const problem: LeetcodeProblem & { exist: boolean } = {
    exist: !true,
    name: '2833. 距离原点最远的点',
    url:'https://leetcode.cn/problems/furthest-point-from-origin',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `移动 n 次之后，请你找出可以到达的距离原点 最远 的点，并返回 从原点到这一点的距离 。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2026.03.19',
            time: 3,
            memory: 18.96,
            desc: '记录所有相同的下标的数组，遍历下标的时候记录左右的sum数量',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
