import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '994. 腐烂的橘子',
    url: 'https://leetcode.cn/problems/rotting-oranges',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回 直到单元格中没有新鲜橘子为止所必须经过的最小分钟数。如果不可能，返回 -1 。`,
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
            time: 37,
            memory: 16.37,
            desc: 'bfs',
            code: `dirs = [(0, 1), (1, 0), (0, -1), (-1, 0)]
    class Solution:
        def orangesRotting(self, grid: List[List[int]]) -> int:
            n, m = len(grid), len(grid[0])
            count = sum([grid[i][j] == 1 for i in range(n) for j in range(m)])
            if count == 0: return 0
            q = deque([(i, j) for i in range(n) for j in range(m) if grid[i][j] == 2])
            step = 0
            size = len(q)
            while q:
                i, j = q.popleft()
                for dir in dirs:
                    ni, nj = i + dir[0], j + dir[1]
                    if 0 <= ni < n and 0 <= nj < m and grid[ni][nj] == 1:
                        count -= 1
                        grid[ni][nj] = 2
                        q.append((ni, nj))
                size -= 1
                if size == 0:
                    step += 1
                    size = len(q)
            return step - 1 if count == 0 else -1`,
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
