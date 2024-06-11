import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '419. 甲板上的战舰',
    url: 'https://leetcode.cn/problems/maximum-number-of-operations-with-the-same-score-ii',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `在确保 所有操作分数相同 的前提下，请你求出 最多 能进行多少次操作。请你返回按照上述要求 最多 可以进行的操作次数。`,
    solutions: [
        // {
        //     date: new Date('2020.11.11').getTime(),
        //     script: Script.JS,
        //     time: 140,
        //     memory: 45.82,
        //     desc: 'dp',
        //     code: ``,
        // },
        // {
        //     date: new Date('2020.07.25').getTime(),
        //     script: Script.TS,
        //     time: 188,
        //     memory: 39.68,
        //     desc: 'dp[i][j] = 分成i份时，只有前j个元素时的最小值',
        //     code: ``,
        // },

        // {
        //     date: new Date('2022.03.28').getTime(),
        //     script: Script.CPP,
        //     time: 0,
        //     memory: 6.32,
        //     desc: '模拟',
        //     code: ``,
        // },
        {
            script: Script.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 37,
            memory: 18.76,
            desc: 'dfs',
            code: `dirs = [(0, 1), (1, 0), (0, -1), (-1, 0)]

class Solution:
    def countBattleships(self, board: List[List[str]]) -> int:
        n = len(board)
        m = len(board[0])
        res = 0
        def check(i: int, j: int) -> int:
            board[i][j] = '.'
            for dir in dirs:
                ni = i + dir[0]
                nj = j + dir[1]
                if 0 <= ni < n and 0 <= nj < m and board[ni][nj] == 'X':
                    check(ni, nj)
        for i in range(n):
            for j in range(m):
                if board[i][j] == 'X':
                    res += 1
                    check(i, j)
        return res`,
        },
        // {
        //     script: Script.RUST,
        //     time: 53,
        //     memory: 13.54,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
