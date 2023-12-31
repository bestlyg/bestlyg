import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '1599. 经营摩天轮的最大利润',
    url: 'https://leetcode.cn/problems/buy-two-chocolates',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回在购买两块巧克力后，最多能剩下多少钱。`,
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
        //     date: new Date('2021.01.29').getTime(),
        //     script: Script.TS,
        //     time: 352,
        //     memory: 46.7,
        //     desc: '二分',
        //     code: ``,
        // },

        {
            script: Script.PY,
            time: 1200,
            memory: 20.89,
            desc: '模拟',
            code: `class Solution:
    def minOperationsMaxProfit(self, customers: List[int], boardingCost: int, runningCost: int) -> int:
        costCnt = costSum = resSum =0
        resCnt = -1
        mask = 0b0000
        wait = 0
        
        def walk():
            nonlocal costCnt, costSum, resSum, resCnt, mask, wait
            cnt = min(wait, 4)
            costSum += cnt * boardingCost - runningCost
            wait -= cnt
            costCnt += 1
            mask = ((mask << 1) | 0b0001) & 0b1111
            if costSum > resSum:
                resCnt, resSum = costCnt, costSum

        for v in customers:
            wait += v
            walk()

        while wait: walk()
        return resCnt`,
        },
        //         {
        //             script: Script.CPP,
        //             time: 44,
        //             memory: 70.5,
        //             desc: '同上',
        //             code: `class Solution {
        // public:
        //     int getScore(vector<int>& player) {
        //         int cur = 0, sum = 0;
        //         for (auto &v: player) {
        //             sum += v + v * ((cur & 0b11) != 0);
        //             cur = cur << 1 | (v == 10);
        //         }
        //         return sum;
        //     }
        //     int isWinner(vector<int>& player1, vector<int>& player2) {
        //         int s1 = getScore(player1), s2 = getScore(player2);
        //         return s1 > s2 ? 1 : s2 > s1 ? 2 : 0;
        //     }
        // };`,
        //         },
        // {
        //     script: Script.RUST,
        //     time: 12,
        //     memory: 2.12,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
