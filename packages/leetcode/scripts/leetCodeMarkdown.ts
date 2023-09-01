import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2240. 买钢笔和铅笔的方案数',
    url: 'https://leetcode.cn/problems/number-of-ways-to-buy-pens-and-pencils/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个整数 total ，表示你拥有的总钱数。同时给你两个整数 cost1 和 cost2 ，分别表示一支钢笔和一支铅笔的价格。你可以花费你部分或者全部的钱，去买任意数目的两种笔。请你返回购买钢笔和铅笔的 不同方案数目 。`,
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
        //     date: new Date('2021.05.13').getTime(),
        //     script: Script.TS,
        //     time: 220,
        //     memory: 48.3,
        //     desc: '归并排序',
        //     code: ``,
        // },
        {
            script: Script.CPP,
            time: 16,
            memory: 5.9,
            desc: '枚举',
            code: `class Solution {
public:
    long long waysToBuyPensPencils(int total, int cost1, int cost2) {
        long long idx1 = 0, res = 0;
        while (idx1 * cost1 <= total) {
            res += 1 + (total - idx1 * cost1) / cost2;
            idx1 += 1;
        }
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 664,
            memory: 16,
            desc: '同上',
            code: `class Solution:
    def waysToBuyPensPencils(self, total: int, cost1: int, cost2: int) -> int:
        idx1 = res = 0
        while idx1 * cost1 <= total:
            res += 1 + (total - idx1 * cost1) // cost2
            idx1 += 1
        return res`,
        },
        {
            script: Script.RUST,
            time: 12,
            memory: 2.04,
            desc: '同上',
            code: `impl Solution {
    pub fn ways_to_buy_pens_pencils(total: i32, cost1: i32, cost2: i32) -> i64 {
        let (total, cost1, cost2, mut idx1, mut res) = (
            total as i64, cost1 as i64, cost2 as i64,
            0i64, 0i64
        );
        while idx1 * cost1 <= total {
            res += 1 + (total - cost1 * idx1) / cost2;
            idx1 += 1;
        }
        res
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
