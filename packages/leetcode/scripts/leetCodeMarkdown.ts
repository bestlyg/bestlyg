import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '2673. 使二叉树所有路径值相等的最小代价',
    url: 'https://leetcode.cn/problems/count-valid-paths-in-a-tree/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回树中的 合法路径数目 。`,
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
            time: 233,
            memory: 45.47,
            desc: 'dfs时记录左右的节点的值，进行遍历和平衡',
            code: `class Solution:
    def minIncrements(self, n: int, cost: List[int]) -> int:
        ans = 0
        def dfs(node: int) -> int:
            nonlocal ans
            if node * 2 > n: return cost[node - 1]
            l, r = dfs(node * 2), dfs(node * 2 + 1)
            maxn = max(l, r)
            ans += 2 * maxn - l - r
            return maxn + cost[node - 1]
        dfs(1)
        return ans`,
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
