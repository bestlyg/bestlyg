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
    name: '2528. 最大化城市的最小电量',
    url: 'https://leetcode.cn/problems/maximize-the-minimum-powered-city',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `这 k 座供电站可以建在多个城市。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.10.31',
            time: 7158,
            memory: 29.67,
            desc: '二分答案遍历最小值为power时的情况，用差分纪录当前电厂的数量',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
