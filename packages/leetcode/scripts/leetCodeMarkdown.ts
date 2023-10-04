import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '188. 买卖股票的最佳时机 IV',
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
        {
            date: new Date('2020.12.28').getTime(),
            script: Script.TS,
            time: 120,
            memory: 44.6,
            desc: 'dp',
            code: `function maxProfit(k: number, prices: number[]): number {
    const len = prices.length;
    if (len === 0) return 0;
    k = Math.min(~~(len / 2), k);
    const buy = new Array(len).fill(0).map(() => new Array(k + 1).fill(0));
    const sell = new Array(len).fill(0).map(() => new Array(k + 1).fill(0));
    [buy[0][0], sell[0][0]] = [-prices[0], 0];
    for (let i = 1; i <= k; ++i) buy[0][i] = sell[0][i] = -Number.MAX_VALUE;
    for (let i = 1; i < len; ++i) {
      const price = prices[i];
      const prevBuy = buy[i - 1];
      const prevSell = sell[i - 1];
      buy[i][0] = Math.max(prevBuy[0], prevSell[0] - price);
      for (let j = 1; j <= k; ++j) {
        buy[i][j] = Math.max(prevBuy[j], prevSell[j] - price);
        sell[i][j] = Math.max(prevSell[j], prevBuy[j - 1] + price);
      }
    }
    return Math.max(...sell[len - 1]);
}`,
        },
        // {
        //     script: Script.CPP,
        //     time: 240,
        //     memory: 82.55,
        //     desc: '排序后遍历，差分数组记录当前值',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 256,
            memory: 31.78,
            desc: 'dp[i][j][k]表示i天j笔手上有无',
            code: `class Solution:
    def maxProfit(self, k: int, prices: List[int]) -> int:
        n = len(prices)
        # [i][j][k] i天j笔手上有无
        dp = [[[-inf for _ in range(2)] for _ in range(k + 1)] for _ in range(n + 1)]
        nums = [[-inf for _ in range(2)] for _ in range(k + 1)]
        res = dp[0][0][0] = dp[0][0][1] = nums[0][0] = 0
        for i in range(0, n):
            dp[i][0][0] = 0
            dp[i][0][1] = -prices[i]
            for j in range(1, k + 1):
                dp[i][j][0] = nums[j - 1][1] + prices[i]
                dp[i][j][1] = nums[j][0] - prices[i]
                res = max(res, dp[i][j][0])
            for j in range(0, k + 1):
                nums[j][0] = max(nums[j][0], dp[i][j][0])
                nums[j][1] = max(nums[j][1], dp[i][j][1])
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
