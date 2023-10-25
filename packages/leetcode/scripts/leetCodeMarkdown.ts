import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '面试题 08.13. 堆箱子',
    url: 'https://leetcode.cn/problems/pile-box-lcci/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `堆箱子。给你一堆n个箱子，箱子宽 wi、深 di、高 hi。箱子不能翻转，将箱子堆起来时，下面箱子的宽度、高度和深度必须大于上面的箱子。实现一种方法，搭出最高的一堆箱子。箱堆的高度为每个箱子高度的总和。`,
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
        //     time: 316,
        //     memory: 5.92,
        //     desc: 'dfs计算当前值是否可行',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 1056,
            memory: 16.35,
            desc: 'dp[i]表示当前为顶时的最大值',
            code: `class Solution:
    def pileBox(self, box: List[List[int]]) -> int:
        n = len(box)
        box.sort(key=lambda o: o[0] * o[1] * o[2], reverse=True)
        dp = [0] * n
        for i in range(n):
            dp[i] = box[i][2]
            for j in range(i - 1, -1, -1):
                if box[i][0] < box[j][0] and box[i][1] < box[j][1] and box[i][2] < box[j][2]:
                    dp[i] = max(dp[i], dp[j] + box[i][2])
        return max(dp)`,
        },
        // {
        //     script: Script.RUST,
        //     time: 124,
        //     memory: 1.9,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
