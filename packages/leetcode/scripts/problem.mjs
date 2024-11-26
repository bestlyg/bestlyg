import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3206. 交替组 I',
    url: 'https://leetcode.cn/problems/alternating-groups-i',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `请你返回 交替 组的数目。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-11-01',
            time: 0,
            memory:17.32,
            desc: 'bfs',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
