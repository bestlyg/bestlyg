import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2865. 美丽塔 I',
    url: 'https://leetcode.cn/problems/beautiful-towers-i',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回满足 美丽塔 要求的方案中，高度和的最大值 。`,
    solutions: [
        // {
        //     date: new Date('2020.04.26').getTime(),
        //     script: Script.JS,
        //     time: 384,
        //     memory: 44.78,
        //     desc: '归并排序',
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
            time: 41,
            memory: 16.82,
            desc: '单调栈',
            code: `class Solution:
    def maximumSumOfHeights(self, maxHeights: List[int]) -> int:
        n = len(maxHeights)
        s = []
        larr = [-1] * n
        rarr = [n] * n
        for i in range(n):
            while s and maxHeights[s[-1]] >= maxHeights[i]: rarr[s.pop()] = i
            if s: larr[i] = s[-1]
            s.append(i)
        lh = [0] * (n + 2)
        rh = [0] * (n + 2)
        for i in range(n):
            lh[i + 1] = maxHeights[i] * (i - larr[i]) + lh[larr[i] + 1]
        for i in range(n - 1, -1, -1):
            rh[i + 1] = maxHeights[i] * (rarr[i] - i) + rh[rarr[i] + 1]
        return max(lh[i + 1] + rh[i + 1] - maxHeights[i] for i in range(n))`,
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
        //     time: 0,
        //     memory: 2.11,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
