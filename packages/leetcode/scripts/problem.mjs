import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: true,
    name: '52. N 皇后 II',
    url: 'https://leetcode.cn/problems/find-if-digit-game-can-be-won',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `如果 Alice 能赢得这场游戏，返回 true；否则，返回 false。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-11-01',
            time: 2329,
            memory: 17.29,
            desc: 'dfs',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
