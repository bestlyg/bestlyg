import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '3274. 检查棋盘方格颜色是否相同',
    url: 'https://leetcode.cn/problems/check-if-two-chessboard-squares-have-the-same-color',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `如果这两个方格颜色相同，返回 true，否则返回 false。`,
    solutions: [
        {
            script: LeetCodeScript.PY3,
            // date: '2024-11-01',
            time: 38,
            memory:16.98,
            desc: '获取坐标值直接判断',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};
