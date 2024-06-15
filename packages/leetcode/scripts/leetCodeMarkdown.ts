import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2779. 数组的最大美丽值',
    url: 'https://leetcode.cn/problems/maximum-beauty-of-an-array-after-applying-operation',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `对数组 nums 执行上述操作任意次后，返回数组可能取得的 最大 美丽值。`,
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
            time: 259,
            memory: 36.05,
            desc: '差分数组',
            code: `class Solution:
    def maximumBeauty(self, nums: List[int], k: int) -> int:
        base = min(nums) - k
        arr = [0] * (max(nums) + k + 2 - base)
        for num in nums:
            arr[num - k - base] += 1
            arr[num + k + 1 - base] -= 1
        for i in range(1, len(arr)): arr[i] += arr[i - 1]
        return max(arr)`,
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
