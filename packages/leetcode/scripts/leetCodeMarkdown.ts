import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist:! true,
    name: '2605. 从两个数字数组里生成最小数字',
    url: 'https://leetcode.cn/problems/form-smallest-number-from-two-digit-arrays',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你两个只包含 1 到 9 之间数字的数组 nums1 和 nums2 ，每个数组中的元素 互不相同 ，请你返回 最小 的数字，两个数组都 至少 包含这个数字的某个数位。`,
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
        //     date: new Date('2021.05.13').getTime(),
        //     script: Script.TS,
        //     time: 220,
        //     memory: 48.3,
        //     desc: '归并排序',
        //     code: ``,
        // },
        // {
        //     script: Script.CPP,
        //     time: 104,
        //     memory: 86.8,
        //     desc: '排序',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 40,
            memory: 15.7,
            desc: '同上',
            code: `class Solution:
    def minNumber(self, nums1: List[int], nums2: List[int]) -> int:
        nums1.sort()
        nums2.sort()
        for num in nums1:
            if num in nums2:
                return num
        return min(nums1[0] * 10 + nums2[0], nums2[0] * 10 + nums1[0])`,
        },
        // {
        //     script: Script.RUST,
        //     time: 32,
        //     memory: 4.1,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
