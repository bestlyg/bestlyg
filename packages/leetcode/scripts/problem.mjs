import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3222. 求出硬币游戏的赢家',
    url: 'https://leetcode.cn/problems/find-the-winning-player-in-coin-game',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `两名玩家都采取 最优 策略，请你返回游戏的赢家。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-11-01',
            time: 0,
            memory: 16.56,
            desc: '只有1个75和4个10才能组成115的价格',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
