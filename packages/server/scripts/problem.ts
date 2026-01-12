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
    name: '1266. 访问所有点的最小时间',
    url: 'https://leetcode.cn/problems/minimum-time-visiting-all-points',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `平面上有 n 个点，点的位置用整数坐标表示 points[i] = [xi, yi] 。请你计算访问所有这些点需要的 最小时间（以秒为单位）。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.11.21',
            time: 3,
            memory: 19.07,
            desc: '遍历每两个点，先按对角线走，再平移',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
