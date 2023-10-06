import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '714. 买卖股票的最佳时机含手续费',
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
            time: 516,
            memory: 28.4,
            desc: '同122题',
            code: `class Solution:
    def maxProfit(self, prices: List[int], fee: int) -> int:
        n = len(prices)
        # [i][0] i天买， [i][1] i天卖
        dp = [[-inf for _ in range(2)] for _ in range(n)]
        dp[0][0] = -prices[0]
        dp[0][1] = 0
        res = 0
        num1 = 0
        num2 = -prices[0]
        for i in range(1, n):
            dp[i][0] = max(dp[i][0], num1 - prices[i])
            dp[i][1] = max(dp[i][1], num2 + prices[i] - fee)
            res = max(res, dp[i][0], dp[i][1])
            num1 = max(num1, dp[i][1])
            num2 = max(num2, dp[i][0])
        return res
        
        
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
