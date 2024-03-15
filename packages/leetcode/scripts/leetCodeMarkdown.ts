import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2312. 卖木头块',
    url: 'https://leetcode.cn/problems/selling-pieces-of-wood',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回切割一块大小为 m x n 的木块后，能得到的 最多 钱数。`,
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
            time: 6046,
            memory: 38.27,
            desc: 'dfs',
            code: `class Solution:
    def sellingWood(self, m: int, n: int, prices: List[List[int]]) -> int:
        price_map = {}
        for k1, k2, price in prices:
            if k1 not in price_map: price_map[k1] = {}
            item_map = price_map[k1]
            if k2 not in item_map: item_map[k2] = price
        @cache
        def dfs(m: int, n: int) -> int:
            ans = 0
            if m in price_map and n in price_map[m]:
                ans += price_map[m][n]
            for i in range(1, m):
                ans = max(ans, dfs(i, n) + dfs(m - i, n))
            for i in range(1, n):
                ans = max(ans, dfs(m, i) + dfs(m, n - i))
            return ans
        return dfs(m, n)`,
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
