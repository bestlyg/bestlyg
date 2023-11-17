import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2736. 最大和查询',
    url: 'https://leetcode.cn/problems/maximum-sum-queries',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你两个长度为 n 、下标从 0 开始的整数数组 nums1 和 nums2 ，另给你一个下标从 1 开始的二维数组 queries ，其中 queries[i] = [xi, yi] 。对于第 i 个查询，在所有满足 nums1[j] >= xi 且 nums2[j] >= yi 的下标 j (0 <= j < n) 中，找出 nums1[j] + nums2[j] 的 最大值 ，如果不存在满足条件的 j 则返回 -1 。返回数组 answer ，其中 answer[i] 是第 i 个查询的答案。`,
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
            time: 340,
            memory: 56.66,
            desc: '单调栈',
            code: `class Solution:
    def maximumSumQueries(self, nums1: List[int], nums2: List[int], queries: List[List[int]]) -> List[int]:
        n = len(nums1)
        nums = [(nums1[i], nums2[i]) for i in range(n)]
        nums.sort()

        qn = len(queries)
        qlist = [i for i in range(qn)]
        qlist.sort(key = lambda i: queries[i])
        
        stack = []
        ans = [0] * qn

        while qlist:
            qidx = qlist.pop()
            x, y = queries[qidx]
            while nums and x <= nums[-1][0]:
                xnum, ynum = nums.pop()
                while stack and stack[-1][1] <= xnum + ynum:
                    stack.pop()
                if not stack or stack[-1][0] < ynum:
                    stack.append((ynum, xnum + ynum))
            idx = bisect_left(stack, (y, 0))
            ans[qidx] = stack[idx][1] if idx < len(stack) else -1
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
