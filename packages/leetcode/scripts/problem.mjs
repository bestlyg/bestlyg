import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3216. 交换后字典序最小的字符串',
    url: 'https://leetcode.cn/problems/lexicographically-smallest-string-after-a-swap',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `给你一个仅由数字组成的字符串 s，在最多交换一次 相邻 且具有相同 奇偶性 的数字后，返回可以得到的字典序最小的字符串。如果两个数字都是奇数或都是偶数，则它们具有相同的奇偶性。例如，5 和 9、2 和 4 奇偶性相同，而 6 和 9 奇偶性不同。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-09-15',
            time: 3,
            memory: 16.28,
            desc: '遍历，找到一个可以交换的字符位置',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
