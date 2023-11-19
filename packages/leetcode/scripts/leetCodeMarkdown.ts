import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '689. 三个无重叠子数组的最大和',
    url: 'https://leetcode.cn/problems/max-sum-of-a-pair-with-equal-sum-of-digits',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个下标从 0 开始的数组 nums ，数组中的元素都是 正 整数。请你选出两个下标 i 和 j（i != j），且 nums[i] 的数位和 与  nums[j] 的数位和相等。请你找出所有满足条件的下标 i 和 j ，找出并返回 nums[i] + nums[j] 可以得到的 最大值 。`,
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
        //     date: new Date('2020.12.28').getTime(),
        //     script: Script.TS,
        //     time: 120,
        //     memory: 44.6,
        //     desc: 'dp',
        //     code: ``,
        // },
        // {
        //     date: new Date('2022.06.20').getTime(),
        //     script: Script.CPP,
        //     time: 200,
        //     memory: 66.95,
        //     desc: '有序集合',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 100,
            memory: 24.2,
            desc: 'dp[i]表示以当前为最后一个数组时的最大值',
            code: `class Solution:
    def maxSumOfThreeSubarrays(self, nums: List[int], k: int) -> List[int]:
        n = len(nums)

        sums = [0]
        for num in nums: sums.append(num + sums[-1])

        dp1 = [(0, 0)] * (n + 1)
        for i in range(0, n - k + 1):
            if dp1[i][0] < sums[i + k] - sums[i]:
                dp1[i + 1] = (sums[i + k] - sums[i], i)
            else:
                dp1[i + 1] = dp1[i]

        dp2 = [(0, 0, 0)] * (n + 1)
        for i in range(k, n - k + 1):
            if dp2[i][0] < sums[i + k] - sums[i] + dp1[i - k + 1][0]:
                dp2[i + 1] = (sums[i + k] - sums[i] + dp1[i - k + 1][0], dp1[i - k + 1][1], i)
            else:
                dp2[i + 1] = dp2[i]

        dp3 = [(0, 0, 0, 0)] * (n + 1)
        for i in range(k * 2, n - k + 1):
            if dp3[i][0] < sums[i + k] - sums[i] + dp2[i - k + 1][0]:
                dp3[i + 1] = (sums[i + k] - sums[i] + dp2[i - k + 1][0], dp2[i - k + 1][1], dp2[i - k + 1][2], i)
            else:
                dp3[i + 1] = dp3[i]

        return dp3[n - k + 1][1:]`,
        },
        // {
        //     script: Script.RUST,
        //     time: 564,
        //     memory: 85,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
