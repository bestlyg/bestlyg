import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3171. 找到按位或最接近 K 的子数组',
    url: 'https://leetcode.cn/problems/find-subarray-with-bitwise-or-closest-to-k',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `返回 优质数对 的总数。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: '2024-09-15',
            time: 2499,
            memory: 30.93,
            desc: '二进制存储，枚举右侧',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
