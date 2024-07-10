import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2970. 统计移除递增子数组的数目 I',
    url: 'https://leetcode.cn/problems/count-the-number-of-incremovable-subarrays-i',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个下标从 0 开始的 正 整数数组 nums 。如果 nums 的一个子数组满足：移除这个子数组后剩余元素 严格递增 ，那么我们称这个子数组为 移除递增 子数组。比方说，[5, 3, 4, 6, 7] 中的 [3, 4] 是一个移除递增子数组，因为移除该子数组后，[5, 3, 4, 6, 7] 变为 [5, 6, 7] ，是严格递增的。请你返回 nums 中 移除递增 子数组的总数目。`,
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

        // {
        //     date: new Date('2022.03.28').getTime(),
        //     script: Script.CPP,
        //     time: 0,
        //     memory: 6.32,
        //     desc: '模拟',
        //     code: ``,
        // },
        {
            script: Script.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 261,
            memory: 16.5,
            desc: '遍历',
            code: `class Solution:
    def incremovableSubarrayCount(self, nums: List[int]) -> int:
        def check(nums: List[int]) -> int:
            for i in range(1, len(nums)):
                if nums[i - 1] >= nums[i]: return 0
            return 1
        return sum(check(nums[0:j] + nums[i:]) for i in range(len(nums) + 1) for j in range(i))`,
        },
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
