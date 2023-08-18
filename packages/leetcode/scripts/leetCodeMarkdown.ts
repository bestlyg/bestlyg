import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1388. 3n 块披萨',
    url: 'https://leetcode.cn/problems/pizza-with-3n-slices/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回你可以获得的披萨大小总和的最大值。`,
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
            time: 28,
            memory: 14.1,
            desc: '题目转化为3n个块中，选n个不相邻的块的最大和,dp[i][j]表示存在前i个块时，选取j个块的最大值',
            code: `class Solution {
public:
    int maxSizeSlices(vector<int>& slices) {
        int m = slices.size() / 3;
        auto check = [&](vector<int> nums) {
            int n = nums.size();
            vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));
            for (int i = 1; i <= n; i++) {
                for (int j = 1; j <= m; j++) {
                    dp[i][j] = max(dp[i - 1][j], nums[i - 1]);
                    if (i >= 2) dp[i][j] = max(dp[i][j], dp[i - 2][j - 1] + nums[i - 1]);
                }
            }
            return dp[n][m];
        };
        return max(
            check(vector<int>(slices.begin() + 1, slices.end())),
            check(vector<int>(slices.begin(), slices.end() - 1))
        );
    }
};`,
        },
        {
            script: Script.PY,
            time: 444,
            memory: 16.19,
            desc: '同上',
            code: `class Solution:
    def maxSizeSlices(self, slices: List[int]) -> int:
        m = len(slices) // 3

        def check(nums: List[int]) -> int:
            n = len(nums)
            dp = [[0 for _ in range(m + 1)] for _ in range(n + 1)]
            for i in range(1, n+1):
                for j in range(1, m+1):
                    dp[i][j] = max(dp[i-1][j], nums[i-1])
                    if i >= 2:
                        dp[i][j] = max(dp[i][j], dp[i-2][j-1]+nums[i-1])
            return dp[n][m]

        return max(check(slices[1:]), check(slices[0:-1]))`,
        },
        {
            script: Script.RUST,
            time: 4,
            memory: 2.16,
            desc: '同上',
            code: `impl Solution {
    pub fn max_size_slices(slices: Vec<i32>) -> i32 {
        use std::cmp::max;
        let m = slices.len() / 3;
        let check = |nums: &[i32]| -> i32 {
            let n = nums.len();
            let mut dp = vec![vec![0; m + 1]; n + 1];
            for i in 1..=n {
                for j in 1..=m {
                    dp[i][j] = max(dp[i - 1][j], nums[i - 1]);
                    if i >= 2 {
                        dp[i][j] = max(dp[i][j], dp[i - 2][j - 1] + nums[i - 1])
                    }
                }
            }
            dp[n][m]
        };
        max(check(&slices[1..]), check(&slices[0..slices.len() - 1]))
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
