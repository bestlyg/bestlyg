import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2684. 矩阵中移动的最大次数',
    url: 'https://leetcode.cn/problems/maximum-number-of-moves-in-a-grid',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回你在矩阵中能够 移动 的 最大 次数。`,
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
        {
            script: Script.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 226,
            memory: 41.75,
            desc: 'dfs',
            code: `dirs = [(1, 1), (0, 1), (-1, 1)]

    class Solution:
        def maxMoves(self, grid: List[List[int]]) -> int:
            n, m = len(grid), len(grid[0])
            @cache
            def dfs(row: int, col: int) -> int:
                ans = 0
                for x, y in dirs:
                    nrow, ncol = row + x, col + y
                    if 0 <= nrow < n and 0 <= ncol < m and grid[row][col] < grid[nrow][ncol]:
                        ans = max(ans, 1 + dfs(nrow, ncol))
                return ans
            return max(dfs(row, 0) for row in range(n))`,
        },

        //         {
        //             script: Script.CPP,
        //             time: 44,
        //             memory: 70.5,
        //             desc: '同上',
        //             code: `class Solution {
        // public:
        //     int getScore(vector<int>& player) {
        //         int cur = 0, sum = 0;
        //         for (auto &v: player) {
        //             sum += v + v * ((cur & 0b11) != 0);
        //             cur = cur << 1 | (v == 10);
        //         }
        //         return sum;
        //     }
        //     int isWinner(vector<int>& player1, vector<int>& player2) {
        //         int s1 = getScore(player1), s2 = getScore(player2);
        //         return s1 > s2 ? 1 : s2 > s1 ? 2 : 0;
        //     }
        // };`,
        //         },
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
