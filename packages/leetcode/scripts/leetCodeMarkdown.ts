import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '2559. 统计范围内的元音字符串数',
    url: 'https://leetcode.cn/problems/maximum-tastiness-of-candy-basket/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个正整数数组 price ，其中 price[i] 表示第 i 类糖果的价格，另给你一个正整数 k 。商店组合 k 类 不同 糖果打包成礼盒出售。礼盒的 甜蜜度 是礼盒中任意两种糖果 价格 绝对差的最小值。返回礼盒的 最大 甜蜜度。`,
    solutions: [
        //     {
        //       script: Script.TS,
        //       time: 76,
        //       memory: 45.3,
        //       desc: 'dfs',
        //       code: `// 特殊标识符，在左右相等时返回
        // }`,
        //     },
        {
            script: Script.CPP,
            time: 148,
            memory: 63.1,
            desc: '前缀和',
            code: `class Solution {
public:
    vector<int> vowelStrings(vector<string>& words, vector<vector<int>>& queries) {
        unordered_set<char> s{ 'a', 'e', 'i', 'o', 'u'};
        vector<int> sums(1, 0);
        for (auto &w : words) sums.push_back(sums.back() + (s.count(w[0]) && s.count(w.back()) ? 1 : 0));
        vector<int> res;
        for (auto &q : queries) res.push_back(sums[q[1] + 1] - sums[q[0]]);
        return res;
    }
};`,
        },
        //         {
        //             script: Script.PY3,
        //             time: 996,
        //             memory: 27.5,
        //             desc: '同上',
        //             code: `class Solution:
        //     def maximumTastiness(self, price: List[int], k: int) -> int:
        //         price.sort()
        //         n = len(price)
        //         l = 0
        //         r = price[n-1]-price[0]
        //         while l < r:
        //             m = (l+r+1)//2
        //             cnt = 1
        //             prev = price[0]
        //             for i in range(1, n):
        //                 if price[i] - prev >= m:
        //                     cnt += 1
        //                     prev = price[i]
        //             if cnt < k:
        //                 r = m-1
        //             else:
        //                 l = m
        //         return l`,
        //         },
        //         {
        //             script: Script.RUST,
        //             time: 44,
        //             memory: 3.9,
        //             desc: '同上',
        //             code: `impl Solution {
        // pub fn maximum_tastiness(mut price: Vec<i32>, k: i32) -> i32 {
        //     price.sort();
        //     let n = price.len();
        //     let mut l = 0;
        //     let mut r = price[n - 1] - price[0];
        //     while l < r {
        //         let m = (l + r + 1) / 2;
        //         let mut cnt = 1;
        //         let mut prev = price[0];
        //         for i in 1..n {
        //             if price[i] - prev >= m {
        //                 cnt += 1;
        //                 prev = price[i];
        //             }
        //         }
        //         if cnt < k {
        //             r = m - 1;
        //         } else {
        //             l = m
        //         }
        //     }
        //     l
        // }
        // }`,
        //         },
    ],
};

export default leetCodeMarkdown;
