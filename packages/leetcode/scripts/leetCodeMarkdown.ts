import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1793. 好子数组的最大分数',
    url: 'https://leetcode.cn/problems/maximum-score-of-a-good-subarray/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回 好 子数组的最大可能 分数 。`,
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
            time: 266,
            memory: 27.5,
            desc: '先求出每个下标当最小值的范围，再对范围判断是否存在k',
            code: `class Solution:
    def maximumScore(self, nums: List[int], k: int) -> int:
        k += 1
        nums = [inf] + nums + [inf]
        s = []
        n = len(nums)
        arr1 = [0] * n
        arr2 = [n - 1] * n
        for i in range(1, n - 1):
            while s and nums[s[-1]] > nums[i]:
                arr2[s.pop()] = i
            if s: arr1[i] = s[-1]
            s.append(i)
        ans = 0
        for i in range(1, n - 1):
            left = arr1[i]
            right = arr2[i]
            if left < k < right:
                ans = max(ans, (right - left - 1) * nums[i])
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
