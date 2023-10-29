import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '274. H 指数',
    url: 'https://leetcode.cn/problems/h-index',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个整数数组 citations ，其中 citations[i] 表示研究者的第 i 篇论文被引用的次数。计算并返回该研究者的 h 指数。`,
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
        //     time: 64,
        //     memory: 31.09,
        //     desc: '排序后计算间隔',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 36,
            memory: 16.2,
            desc: '遍历',
            code: `class Solution:
    def hIndex(self, citations: List[int]) -> int:
        n = len(citations)
        citations.sort()
        res = 0
        for i in range(n):
            if n - i <= citations[i]: res = max(res, n - i)
        return res`,
        },
        // {
        //     script: Script.RUST,
        //     time: 16,
        //     memory: 4.29,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
