import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '123. 买卖股票的最佳时机 III',
    url: 'https://leetcode.cn/problems/earliest-possible-day-of-full-bloom',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个整数数组 flowerbed 表示花坛，由若干 0 和 1 组成，其中 0 表示没种植花，1 表示种植了花。另有一个数 n ，能否在不打破种植规则的情况下种入 n 朵花？能则返回 true ，不能则返回 false 。`,
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
        //     date: new Date('2020.08.05').getTime(),
        //     script: Script.TS,
        //     time: 96,
        //     memory: 40.3,
        //     desc: '归并排序',
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
            time: 1924,
            memory: 80.1,
            desc: 'dp[i][j][k]表示i天j笔手上有无',
            code: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        n = len(prices)
        # [i][j][k] i天j笔手上有无
        dp = [[[-inf for _ in range(2)] for _ in range(3)] for _ in range(n)]
        num0 = dp[0][0][0] = 0
        num1 = dp[0][0][1] = -prices[0]
        res = 0
        num2 = num3 = -inf
        for i in range(1, n):
            dp[i][0][0] = dp[i - 1][0][0]
            dp[i][0][1] = num0 - prices[i]
            dp[i][1][0] = num1 + prices[i]
            dp[i][1][1] = num2 - prices[i]
            dp[i][2][0] = num3 + prices[i]
            num0 = max(num0, dp[i][0][0])
            num1 = max(num1, dp[i][0][1])
            num2 = max(num2, dp[i][1][0])
            num3 = max(num3, dp[i][1][1])
            res = max(res, dp[i][1][0], dp[i][2][0])
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
