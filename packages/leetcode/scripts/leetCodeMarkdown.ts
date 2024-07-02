import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '3115. 质数的最大距离',
    url: 'https://leetcode.cn/problems/maximum-prime-difference',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回两个（不一定不同的）质数在 nums 中 下标 的 最大距离。`,
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
            time: 403,
            memory: 28.54,
            desc: '遍历',
            code: `def is_prime(num: int) -> bool:
    if num < 2: return False
    for v in range(2, num):
        if num % v == 0: return False
    return True
arr = [is_prime(num) for num in range(103)]

class Solution:
    def maximumPrimeDifference(self, nums: List[int]) -> int:
        v1 = v2 = -1
        for i in range(len(nums)):
            if is_prime(nums[i]):
                if v1 == -1: v1 = i
                v2 = i
        return v2 - v1
                    `,
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
