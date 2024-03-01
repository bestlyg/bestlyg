import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2369. 检查数组是否存在有效划分',
    url: 'https://leetcode.cn/problems/check-if-there-is-a-valid-partition-for-the-array',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个下标从 0 开始的整数数组 nums ，你必须将数组划分为一个或多个 连续 子数组。如果数组 至少 存在一种有效划分，返回 true ，否则，返回 false 。`,
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
            time: 125,
            memory: 30.87,
            desc: 'dp[i]表示以i为节点时是否能够满足要求',
            code: `class Solution:
    def validPartition(self, nums: List[int]) -> bool:
        n = len(nums)
        dp = [False] * n
        dp[0] = False
        dp[1] = nums[0] == nums[1]
        if n == 2: return dp[1]
        dp[2] = nums[0] == nums[1] - 1 == nums[2] - 2 or \\
                nums[0] == nums[1] == nums[2]
        for i in range(3, n):
            dp[i] = dp[i - 2] and nums[i] == nums[i - 1] or \\
                    dp[i - 3] and nums[i] == nums[i - 1] == nums[i - 2] or \\
                    dp[i - 3] and nums[i] == nums[i - 1] + 1 == nums[i - 2] + 2
        return dp[n - 1]`,
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
