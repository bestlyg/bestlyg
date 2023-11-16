import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '2760. 最长奇偶子数组',
    url: 'https://leetcode.cn/problems/maximum-sum-with-exactly-k-elements',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个下标从 0 开始的整数数组 nums 和一个整数 k 。请你返回执行以上操作恰好 k 次后的最大得分。`,
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
            time: 96,
            memory: 15.67,
            desc: '遍历',
            code: `class Solution:
    def longestAlternatingSubarray(self, nums: List[int], threshold: int) -> int:
        n = len(nums)
        i = 0
        ans = 0
        while i < n:
            if nums[i] <= threshold and nums[i] % 2 == 0:
                start = i
                while i + 1 < n and nums[i + 1] % 2 != nums[i] % 2 and nums[i + 1] <= threshold:
                    i += 1
                ans = max(ans, i - start + 1)
            i += 1
        return ans`,
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
