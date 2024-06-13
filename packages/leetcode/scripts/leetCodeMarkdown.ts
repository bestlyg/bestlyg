import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2813. 子序列最大优雅度',
    url: 'https://leetcode.cn/problems/maximum-elegance-of-a-k-length-subsequence',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `你的任务是从 items 所有长度为 k 的子序列中，找出 最大优雅度 。`,
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
            time: 237,
            memory: 42.13,
            desc: '从大到小收益排序后，遍历时记录当前类目存在的次数',
            code: `class Solution:
    def findMaximumElegance(self, items: List[List[int]], k: int) -> int:
        items.sort(key = lambda item: -item[0])
        print(items)
        set1 = set()
        stack2 = []
        cur = 0
        for i in range(k):
            item = items[i]
            cur += item[0]
            if item[1] in set1:
                stack2.append(item[0])
            else:
                set1.add(item[1])
        res = cur + len(set1) ** 2
        for i in range(k, len(items)):
            item = items[i]
            if item[1] not in set1 and len(stack2):
                cur += item[0] - stack2.pop()
                set1.add(item[1])
            res = max(res, cur + len(set1) ** 2)
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
