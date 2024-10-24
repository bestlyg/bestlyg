import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3175. 找到连续赢 K 场比赛的第一位玩家',
    url: 'https://leetcode.cn/problems/find-the-first-player-to-win-k-games-in-a-row',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `这个比赛的赢家是 第一位连续 赢下 k 场比赛的玩家。请你返回这个比赛的赢家编号。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-09-15',
            time: 43,
            memory: 28.94,
            desc: '遍历，只要取到最大数就直接返回',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
