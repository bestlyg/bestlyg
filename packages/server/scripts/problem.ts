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
    exist:! true,
    name: '1727. 重新排列后的最大子矩阵',
    url:'https://leetcode.cn/problems/largest-submatrix-with-rearrangements',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `请你返回最优方案下将 matrix 重新排列后，全是 1 的最大子矩阵面积。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2026.03.05',
            time: 123,
            memory: 33.29,
            desc: '遍历每行，记录从当前值往上的最大连续的1',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
