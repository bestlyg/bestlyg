import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2806. 取整购买后的账户余额',
    url: 'https://leetcode.cn/problems/account-balance-after-rounded-purchase',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回一个整数，表示你在愿意支出金额为 purchaseAmount 块钱的前提下，购买之后剩下的余额。`,
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
            time: 24,
            memory: 16.45,
            desc: '遍历',
            code: `class Solution:
    def accountBalanceAfterPurchase(self, purchaseAmount: int) -> int:
        cnt = 0
        while (cnt + 1) * 10 < purchaseAmount: cnt += 1
        if abs(cnt * 10 - purchaseAmount) < abs((cnt + 1) * 10 - purchaseAmount):
            return 100 - 10 * cnt
        else:
            return 100 - 10 * (cnt + 1)`,
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
