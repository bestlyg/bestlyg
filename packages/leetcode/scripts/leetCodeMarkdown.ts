import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '309. 买卖股票的最佳时机含冷冻期',
    url: 'https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iv/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。也就是说，你最多可以买 k 次，卖 k 次。`,
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
        //     time: 240,
        //     memory: 82.55,
        //     desc: '排序后遍历，差分数组记录当前值',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 3408,
            memory: 560.76,
            desc: '记忆化递归',
            code: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        n = len(prices)
        @cache
        def dfs(idx: int, cooldown: bool, cur: int):
            if idx == n: return 0
            res = dfs(idx + 1, False, cur)
            if not cooldown:
                if cur != -inf: res = max(res, dfs(idx + 1, True, -inf) + prices[idx] - cur)
                else: res = max(res, dfs(idx + 1, False, prices[idx]))
            return res
        return dfs(0, False, -inf)
        
`,
        },
        // {
        //     script: Script.RUST,
        //     time: 48,
        //     memory: 6.7,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
