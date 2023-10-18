import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '2530. 执行 K 次操作后的最大分数',
    url: 'https://leetcode.cn/problems/maximal-score-after-applying-k-operations',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个正整数 n ，请你计算在 [1，n] 范围内能被 3、5、7 整除的所有整数之和。返回一个整数，用于表示给定范围内所有满足约束条件的数字之和。`,
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
        //     script: Script.CPP,
        //     time: 4,
        //     memory: 9.2,
        //     desc: '双指针',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 1604,
            memory: 44.59,
            desc: '堆存储',
            code: `class Node:
        def __init__(self, val):
            self.val = val
        def __lt__(self, o):
            return o.val < self.val
    
    class Solution:
        def maxKelements(self, nums: List[int], k: int) -> int:
            q = [Node(num) for num in nums]
            heapify(q)
            res = 0
            while k:
                res += q[0].val
                heappush(q, Node(ceil(heappop(q).val / 3)))
                k -= 1
            return res
    `,
        },
        {
            script: Script.PY,
            time: 344,
            memory: 29.59,
            desc: '堆存储',
            code: `class Solution:
    def maxKelements(self, nums: List[int], k: int) -> int:
        for i in range(len(nums)): nums[i] *= -1
        heapify(nums)
        res = 0
        for _ in range(k):
            res += -nums[0]
            heappush(nums, -ceil(heappop(nums) / -3))
        return res
`,
        },
        // {
        //     script: Script.RUST,
        //     time: 0,
        //     memory: 2.12,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
