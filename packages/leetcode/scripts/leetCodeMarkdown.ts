import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2719. 统计整数数目',
    url: 'https://leetcode.cn/problems/count-of-integers/description/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回好整数的数目。`,
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
            time: 232,
            memory: 18.31,
            desc: '数位dp',
            code: `def digit_dp(n: int, min_num: str, max_num: str, min_sum: int, max_sum: int):
    @cache
    def dfs(i: int, val: int, limit_low: bool, limit_high: bool) -> int:
        if val > max_sum: return 0
        if i == n: return val >= min_sum
        lo = int(min_num[i]) if limit_low else 0
        hi = int(max_num[i]) if limit_high else 9
        return sum(
            dfs(i + 1, val + d, limit_low and lo == d, limit_high and hi == d)
            for d in range(lo, hi + 1)
        )
    return  dfs
    
class Solution:
    def count(self, num1: str, num2: str, min_sum: int, max_sum: int) -> int:
        dfs = digit_dp(len(num2), num1.zfill(len(num2)), num2, min_sum, max_sum)
        return dfs(0, 0, True, True) % (10 ** 9 + 7)`,
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
        //     time: 0,
        //     memory: 2.11,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;
