import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: true,
    name: '743. 网络延迟时间',
    url: 'https://leetcode.cn/problems/find-the-number-of-winning-players',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `请你返回游戏中 胜利玩家 的数目。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-11-01',
            time: 6,
            memory: 18.07,
            desc: 'bfs',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
