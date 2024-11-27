import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3208. 交替组 II',
    url: 'https://leetcode.cn/problems/alternating-groups-ii',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `请你返回 交替 组的数目。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-11-01',
            time: 183,
            memory: 20.6,
            desc: '记录以r为最后一个元素的滑动窗口',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
