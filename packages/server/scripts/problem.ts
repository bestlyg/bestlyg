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
    name: '2483. 商店的最少代价',
    url: 'https://leetcode.cn/problems/minimum-penalty-for-a-shop',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `请你返回在确保代价 最小 的前提下，商店的 最早 关门时间。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.11.21',
            time: 131,
            memory: 17.52,
            desc: '逐个遍历，统计左右两边的YN的数量',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
