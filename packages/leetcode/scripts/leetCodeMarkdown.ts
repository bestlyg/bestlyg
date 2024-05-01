import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '2462. 雇佣 K 位工人的总代价',
    url: 'https://leetcode.cn/problems/number-of-employees-who-met-the-target',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你用整数表示并返回工作至少 target 小时的员工数。`,
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
        {
            script: Script.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 305,
            memory: 32.84,
            desc: '遍历',
            code: `class Solution:
    def totalCost(self, costs: List[int], k: int, candidates: int) -> int:
        n = len(costs)
        q = []
        for i in range(candidates): 
            heappush(q, (costs[i], i))
            if n - 1 - i >= candidates:
                heappush(q, (costs[n - 1 - i], n - 1 - i))
        l = candidates
        r = n - 1 - candidates
        res = 0
        while k:
            picked, picked_index = heappop(q)
            res += picked
            if l <= r:
                if picked_index < l:
                    heappush(q, (costs[l], l))
                    l += 1
                else:
                    heappush(q, (costs[r], r))
                    r -= 1
            k -= 1
        return res`,
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
        //     time: 53,
        //     memory: 13.54,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
