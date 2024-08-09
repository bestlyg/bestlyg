import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '3132. 找出与数组相加的整数 II',
    url: 'https://leetcode.cn/problems/find-the-integer-added-to-array-ii/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你两个整数数组 nums1 和 nums2。从 nums1 中移除两个元素，并且所有其他元素都与变量 x 所表示的整数相加。如果 x 为负数，则表现为元素值的减少。执行上述操作后，nums1 和 nums2 相等 。当两个数组中包含相同的整数，并且这些整数出现的频次相同时，两个数组 相等 。返回能够实现数组相等的 最小 整数 x 。`,
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
            time: 562,
            memory: 16.57,
            desc: '排序后暴力枚举',
            code: `class Solution:
    def minimumAddedInteger(self, nums1: List[int], nums2: List[int]) -> int:
        nums1.sort()
        nums2.sort()
        n = len(nums1)
        res = inf
        for i in range(n):
            for j in range(i):
                i1 = 0
                while i1 < n and (i1 == i or i1 == j): i1 += 1
                i2 = 0
                diff = nums2[i2] - nums1[i1]
                need_skip = False
                while i1 < n:
                    if nums2[i2] - nums1[i1] != diff:
                        need_skip = True
                        break
                    i1 += 1
                    while i1 < n and (i1 == i or i1 == j): i1 += 1
                    i2 += 1
                if not need_skip:
                    res = min(res, diff)
        return res`,
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
