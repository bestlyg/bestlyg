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
    name: '3606. 优惠券校验器',
    url: 'https://leetcode.cn/problems/coupon-code-validator',
    level: LeetcodeLevelType.Easy,
    tags: [],
    desc: `返回所有 有效优惠券的标识符 组成的数组。`,
    solutions: [
        {
            script: LeetcodeScriptType.python,
            // date: '2025.11.21',
            time: 11,
            memory: 17.84,
            desc: '遍历',
            code: fs.readFileSync(path.resolve(__dirname, 'code'), 'utf8'),
        },
    ],
};
