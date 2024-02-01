import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: 'LCP 24. 数字游戏',
    url: 'https://leetcode.cn/problems/5TxKeK/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `主办方请小扣回答出一个长度为 N 的数组，第 i 个元素(0 <= i < N)表示将 0~i 号计数器 初始 所示数字操作成满足所有条件 nums[a]+1 == nums[a+1],(0 <= a < i) 的最小操作数。`,
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
            time: 248,
            memory:34.91,
            desc: '依次递增转换为使每个数都保持一致的最小步数',
            code: `class Solution:
    def numsGame(self, nums: List[int]) -> List[int]:
        lq = []
        rq = []
        res = []
        rsum = lsum = 0
        mod = 10 ** 9 + 7
        for i in range(len(nums)):
            num = nums[i] - i
            if lq and -lq[0] >= num:
                lsum += num
                heappush(lq, -num)
            else:
                rsum += num
                heappush(rq, num)
            # print(f'lq = {lq}, lsum = {lsum}')
            # print(f'rq = {rq}, rsum = {rsum}')
            if len(lq) > len(rq):
                num = -heappop(lq)
                lsum -= num
                rsum += num
                heappush(rq, num)            
            elif len(lq) < len(rq) - 1:
                num = heappop(rq)
                lsum += num
                rsum -= num
                heappush(lq, -num)
            # print(f'lq = {lq}, lsum = {lsum}')
            # print(f'rq = {rq}, rsum = {rsum}')
            if (i + 1) % 2 == 0:
                res.append((rsum - lsum) % mod)
            else:
                res.append((rsum - lsum - rq[0]) % mod)
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
