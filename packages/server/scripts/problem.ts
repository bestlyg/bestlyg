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
    name: '1200. 最小绝对差',
    url: 'https://leetcode.cn/problems/minimum-absolute-difference',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `请你找到所有具有最小绝对差的元素对，并且按升序的顺序返回。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            date: '2026.01.27',
            time: 63,
            memory: 30.7,
            desc: '遍历',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
