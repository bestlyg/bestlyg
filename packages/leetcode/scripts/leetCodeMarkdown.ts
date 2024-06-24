import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '503. 下一个更大元素 II',
    url: 'https://leetcode.cn/problems/detect-capital',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你找出并返回一个长度为 n 的美丽字符串，该字符串还满足：在字典序大于 s 的所有美丽字符串中字典序最小。如果不存在这样的字符串，则返回一个空字符串。`,
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
            time: 57,
            memory: 18.21,
            desc: '单调栈',
            code: `class Solution:
    def nextGreaterElements(self, nums: List[int]) -> List[int]:
        n = len(nums)
        arr = [-1] * n
        s = []
        def run(need_append):
            for i in range(n):
                while s and nums[s[-1]] < nums[i]: arr[s.pop()] = nums[i]
                if need_append: s.append(i)
        run(True)
        run(False)
        return arr`,
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
