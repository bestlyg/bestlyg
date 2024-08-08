import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '3131. 找出与数组相加的整数 I',
    url: 'https://leetcode.cn/problems/find-the-integer-added-to-array-i',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你两个长度相等的数组 nums1 和 nums2。数组 nums1 中的每个元素都与变量 x 所表示的整数相加。如果 x 为负数，则表现为元素值的减少。在与 x 相加后，nums1 和 nums2 相等 。当两个数组中包含相同的整数，并且这些整数出现的频次相同时，两个数组 相等 。返回整数 x 。`,
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
            time: 33,
            memory: 16.32,
            desc: '一定存在x使其相等，则直接找对应位置的数字进行求差值',
            code: `class Solution:
    def addedInteger(self, nums1: List[int], nums2: List[int]) -> int:
        return max(nums2) - max(nums1)`,
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
