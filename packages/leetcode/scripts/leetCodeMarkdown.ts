import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '3072. 将元素分配到两个数组中 II',
    url: 'https://leetcode.cn/problems/distribute-elements-into-two-arrays-ii',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回整数数组 result 。`,
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
            time: 6345,
            memory: 33.59,
            desc: '有序数组存储后模拟',
            code: `from sortedcontainers import SortedList
    class Solution:
        def resultArray(self, nums: List[int]) -> List[int]:
            res1 = [nums[0]]
            sorted1 = SortedList(res1)
            res2 = [nums[1]]
            sorted2 = SortedList(res2)
            for num in nums[2:]:
                cnt1 = len(res1) - bisect_right(sorted1, num)
                cnt2 = len(res2) - bisect_right(sorted2, num)
                if cnt1 > cnt2 or (cnt1 == cnt2 and len(res1) <= len(res2)):
                    res1.append(num)
                    sorted1.add(num)
                else:
                    res2.append(num)
                    sorted2.add(num)
            return res1 + res2`,
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
