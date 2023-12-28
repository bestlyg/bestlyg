import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2735. 收集巧克力',
    url: 'https://leetcode.cn/problems/collecting-chocolates/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `假设你可以执行任意次操作，请返回收集所有类型巧克力所需的最小成本。`,
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
        //     date: new Date('2021.01.29').getTime(),
        //     script: Script.TS,
        //     time: 352,
        //     memory: 46.7,
        //     desc: '二分',
        //     code: ``,
        // },

        {
            script: Script.PY,
            time: 2948,
            memory: 24.91,
            desc: '对每一个偏移求出最小值',
            code: `class Solution:
    def minCost(self, nums: List[int], x: int) -> int:
        n = len(nums)
        dp = [[inf] * n for _ in range(n + 1)]
        for i in range(n): dp[0][i] = nums[i]
        res = sum(nums)
        for offset in range(1, n):
            for i in range(n):
                dp[offset][i] = min(dp[offset - 1][i], nums[(i + offset) % n])
            res = min(res, sum(dp[offset]) + x * offset)
        return res`,
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
        //     time: 12,
        //     memory: 2.12,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
