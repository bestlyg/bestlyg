import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3138. 同位字符串连接的最小长度',
    url: 'https://leetcode.cn/problems/minimum-length-of-anagram-concatenation',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `请你返回字符串 t 的 最小 可能长度。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-11-01',
            time: 1586,
            memory: 18.31,
            desc: '遍历',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
