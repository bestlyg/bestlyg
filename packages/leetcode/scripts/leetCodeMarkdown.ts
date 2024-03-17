import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '310. 最小高度树',
    url: 'https://leetcode.cn/problems/minimum-height-trees',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你找到所有的 最小高度树 并按 任意顺序 返回它们的根节点标签列表。`,
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
            time: 295,
            memory: 67.80,
            desc: 'dfs',
            code: `class Solution:
    def findMinHeightTrees(self, n: int, edges: List[List[int]]) -> List[int]:
        if n == 1: return [0]
        if n == 2: return [0, 1]
        nodes = [[] for _ in range(n)]
        for n1, n2 in edges:
            nodes[n1].append(n2)
            nodes[n2].append(n1)
        @cache
        def dfs(node: int, parent: int) -> int:
            return 1 + max(dfs(child, node) if child != parent else 0 for child in nodes[node])
        ans_val = inf
        ans_arr = []
        for node in range(n):
            if len(nodes[node]) == 1: continue
            res = dfs(node, -1)
            if res <= ans_val:
                if res < ans_val: ans_arr.clear()
                ans_val = res
                ans_arr.append(node)
        return ans_arr`,
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
