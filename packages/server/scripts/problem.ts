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
    exist: true,
    name: '1039. 多边形三角剖分的最低得分',
    url: 'https://leetcode.cn/problems/minimum-score-triangulation-of-polygon',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `返回 多边形进行三角剖分后可以得到的最低分 。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.05.24',
            time: 51,
            memory: 18.20,
            desc: 'dfs判断每一个三角形分割后的最小值',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
