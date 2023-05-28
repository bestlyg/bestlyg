import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1439. 有序矩阵中的第 k 个最小数组和',
    url: 'https://leetcode.cn/problems/find-the-kth-smallest-sum-of-a-matrix-with-sorted-rows/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个 m * n 的矩阵 mat，以及一个整数 k ，矩阵中的每一行都以非递减的顺序排列。`,
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
            time: 156,
            memory: 32.9,
            desc: '每次求和只取前k个数字，后面数字不需要',
            code: `class Solution {
public:
    int kthSmallest(vector<vector<int>>& mat, int k) {
        vector<int> list(1, 0);
        for (auto &m : mat) {
            vector<int> next;
            for (auto &num1 : list) {
                for (auto &num2 : m) {
                    next.push_back(num1 + num2);
                }
            }
            sort(next.begin(), next.end());
            if (next.size() > k) next.resize(k);
            list = next;
        }
        return list.back();
    }
};`,
        },
        {
            script: Script.CPP,
            time: 16,
            memory: 8.3,
            desc: '求出最大最小值，二分答案',
            code: `class Solution {
public:
    int kthSmallest(vector<vector<int>>& mat, int k) {
        int n = mat.size(), m = mat[0].size(), l = 0, r = 0, base = 0;
        for (int i = 0; i < n; i++) l += mat[i][0], r += mat[i][m - 1], base += mat[i][0];
        function<bool(int, int, int&)> dfs = [&](int idx, int sum, int &cnt) {
            if (idx == -1) return --cnt == 0;
            for (int i = 0; i < mat[idx].size() && sum - (mat[idx][i] - mat[idx][0]) >= 0; i++)
                if (dfs(idx - 1, sum - (mat[idx][i] - mat[idx][0]), cnt)) return true;
            return false;
        };
        while (l < r) {
            int m = (l + r) / 2, cnt = k;
            if (dfs(n - 1, m - base, cnt)) r = m;
            else l = m + 1;
        }
        return l;
    }
};`,
        },
        //         {
        //             script: Script.PY3,
        //             time: 168,
        //             memory: 16.7,
        //             desc: '同上',
        //             code: `class Solution:
        //     def minimumCost(self, s: str) -> int:
        //         res = 0
        //         for i in range(1, len(s)):
        //             if s[i] != s[i - 1]: res += min(i, len(s) - i)
        //         return res
        // `,
        //         },
        //         {
        //             script: Script.RUST,
        //             time: 0,
        //             memory: 2.7,
        //             desc: '同上',
        //             code: `pub fn str_to_vec(s: &String) -> Vec<char> {
        //     s.chars().collect()
        // }
        // impl Solution {
        //     pub fn minimum_cost(s: String) -> i64 {
        //         let mut res = 0i64;
        //         let s = str_to_vec(&s);
        //         for i in 1..s.len() {
        //             if s[i] != s[i - 1] {
        //                 res += i.min(s.len() - i) as i64;
        //             }
        //         }
        //         res
        //     }
        // }`,
        //         },
    ],
};

export default leetCodeMarkdown;
