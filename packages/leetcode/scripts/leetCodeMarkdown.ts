import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist:! true,
    name: '2594. 修车的最少时间',
    url: 'https://leetcode.cn/problems/minimum-time-to-repair-cars/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个整数数组 ranks ，表示一些机械工的 能力值 。ranksi 是第 i 位机械工的能力值。能力值为 r 的机械工可以在 r * n2 分钟内修好 n 辆车。同时给你一个整数 cars ，表示总共需要修理的汽车数目。请你返回修理所有汽车 最少 需要多少时间。`,
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
            time: 112,
            memory: 51.34,
            desc: '二分答案',
            code: `class Solution {
public:
    typedef long long ll;
    ll repairCars(vector<int>& ranks, int cars) {
        auto comp = [&](ll t) {
            ll res = 0;
            for (auto &rank : ranks) {
                res += floor(sqrt(1.0 * t / rank));
            }
            return res;
        };
        ll l = 0, r = LLONG_MAX;
        while (l < r) {
            ll m = (r - l) / 2 + l;
            if (comp(m) >= cars) r = m;
            else l = m + 1;
        }
        return l;
    }
};`,
        },
        {
            script: Script.PY,
            time: 1292,
            memory: 20.16,
            desc: '同上',
            code: `class Solution:
    def repairCars(self, ranks: List[int], cars: int) -> int:
        l = 0
        r = 2 ** 63 - 1
        while l < r:
            m = (r - l) // 2 + l
            if sum(floor(sqrt(m / rank)) for rank in ranks) >= cars:
                r = m
            else:
                l = m + 1
        return l`,
        },
        {
            script: Script.RUST,
            time: 56,
            memory: 2.98,
            desc: '同上',
            code: `impl Solution {
    pub fn repair_cars(ranks: Vec<i32>, cars: i32) -> i64 {
        let cars = cars as i64;
        let mut l = 0;
        let mut r = i64::MAX;
        while l < r {
            let m = (r - l) / 2 + l;
            if ranks
                .iter()
                .map(|rank| (m as f64 / *rank as f64).sqrt().floor() as i64)
                .sum::<i64>()
                >= cars
            {
                r = m;
            } else {
                l = m + 1;
            }
        }
        l
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
