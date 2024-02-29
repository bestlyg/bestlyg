import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2581. 统计可能的树根数目',
    url: 'https://leetcode.cn/problems/count-number-of-possible-root-nodes/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你二维整数数组 edges ，Bob 的所有猜测和整数 k ，请你返回可能成为树根的 节点数目 。如果没有这样的树，则返回 0。`,
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
            time: 425,
            memory: 97.89,
            desc: '先统计以0为根的猜对个数， 再对每个节点为根进行dfs',
            code: `class Solution:
    def rootCount(self, edges: List[List[int]], guesses: List[List[int]], k: int) -> int:
        nodes = [[] for _ in range(len(edges) + 1)]
        for n1, n2 in edges:
            nodes[n1].append(n2)
            nodes[n2].append(n1)
        s = {(n1, n2) for n1, n2 in guesses}
        def dfs(node: int, parent: int) -> int:
            ans = 0
            for child in nodes[node]:
                if child != parent:
                    ans += (node, child) in s
                    ans += dfs(child, node)
            return ans
        def reroot(node: int, parent: int, cnt: int) -> int:
            ans = cnt >= k
            for child in nodes[node]:
                if child != parent:
                    ans += reroot(child, node, cnt + ((child, node) in s) - ((node, child) in s))
            return ans
        return reroot(0, -1, dfs(0, -1))`,
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
