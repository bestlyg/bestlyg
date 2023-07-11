import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1911. 最大子序列交替和',
    url: 'https://leetcode.cn/problems/maximum-alternating-subsequence-sum/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `一个下标从 0 开始的数组的 交替和 定义为 偶数 下标处元素之 和 减去 奇数 下标处元素之 和 。给你一个数组 nums ，请你返回 nums 中任意子序列的 最大交替和 `,
    solutions: [
        //         {
        //             script: Script.TS,
        //             time: 156,
        //             memory: 69,
        //             desc: '对于每个是对象的value，进行dfs',
        //             code: `type Obj = Record<any, any>;

        // function compactObject(obj: Obj): Obj {
        //     const res: any = Array.isArray(obj) ? [] : {};
        //     for (const [k, v] of Object.entries(obj)) {
        //         if (Boolean(v)) {
        //             const newv = typeof v === 'object' ? compactObject(v) : v;
        //             if (Array.isArray(obj)) res.push(newv);
        //             else res[k] = newv;
        //         }
        //     }
        //     return res;
        // };`,
        // },
        {
            script: Script.CPP,
            time: 328,
            memory: 149.5,
            desc: 'dp[i][j]表示以nums[i]结尾的时候，奇数和偶数时的最大结果',
            code: `class Solution {
public:
    typedef long long ll;
    ll maxAlternatingSum(vector<int>& nums) {
        int n = nums.size();
        vector<vector<ll>> dp(n, vector<ll>(2, 0));
        dp[0][0] = nums[0];
        for (int i = 1; i < n; i++) {
            dp[i][0] = max(dp[i - 1][0], dp[i - 1][1] + nums[i]);
            dp[i][1] = max(dp[i - 1][1], dp[i - 1][0] - nums[i]);
        }
        return dp[n - 1][0];
    }
};`,
        },
        {
            script: Script.PY,
            time: 1092,
            memory: 30.2,
            desc: '同上',
            code: `class Solution:
    def maxAlternatingSum(self, nums: List[int]) -> int:
        even = nums[0]
        odd = 0
        for i in range(1, len(nums)):
            even, odd = max(even, odd + nums[i]), max(odd, even - nums[i])
        return even`,
        },
        {
            script: Script.RUST,
            time: 12,
            memory: 2.8,
            desc: '同上',
            code: `impl Solution {
    pub fn max_alternating_sum(nums: Vec<i32>) -> i64 {
        let mut odd = 0;
        let mut even = nums[0] as i64;
        for i in 1..nums.len() {
            even = even.max(odd + nums[i] as i64);
            odd = odd.max(even - nums[i] as i64);
        }
        even
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
