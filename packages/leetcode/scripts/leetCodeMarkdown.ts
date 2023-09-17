import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '213. 打家劫舍 II',
    url: 'https://leetcode.cn/problems/WHnhjV',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `在完成所有的赠送后，请找到拥有最多宝石的勇者和拥有最少宝石的勇者，并返回他们二者的宝石数量之差。`,
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
        //     date: new Date('2020.08.05').getTime(),
        //     script: Script.TS,
        //     time: 96,
        //     memory: 40.3,
        //     desc: '归并排序',
        //     code: ``,
        // },
        {
            script: Script.CPP,
            time: 0,
            memory: 8.26,
            desc: 'dp[0][j]表示首个不选的时候最大值，dp[1][j]表示首个选的时候最大值',
            code: `class Solution {
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        vector<vector<int>> dp(n + 1, vector<int>(2, 0));
        dp[1][1] = nums[0];
        int res = nums[0];
        for (int i = 2; i < n + 1; i++) {
            dp[i][0] = max(dp[i - 1][0], dp[i - 2][0] + nums[i - 1]);
            if (i != n)  dp[i][1] = max(dp[i - 1][1], dp[i - 2][1] + nums[i - 1]);
            res = max(res, max(dp[i][0], dp[i][1]));
        }
        return res;
    }
};
`,
        },
        {
            script: Script.PY,
            time: 32,
            memory: 15.9,
            desc: '同上',
            code: `class Solution:
    def rob(self, nums: List[int]) -> int:
        n = len(nums)
        dp = [[0, 0] for _ in range(n + 1)]
        dp[1][1] = nums[0]
        res = nums[0]
        for i in range(2, n + 1):
            dp[i][0] = max(dp[i - 1][0], dp[i - 2][0] + nums[i - 1])
            if i != n:
                dp[i][1] = max(dp[i - 1][1], dp[i - 2][1] + nums[i - 1])
            res = max(res, dp[i][0], dp[i][1])
        return res`,
        },
        {
            script: Script.RUST,
            time: 0,
            memory: 1.93,
            desc: '同上',
            code: `impl Solution {
    pub fn rob(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let mut dp = vec![vec![0; 2]; n + 1];
        dp[1][1] = nums[0];
        let mut res = nums[0];
        for i in 2..n + 1 {
            dp[i][0] = dp[i - 1][0].max(dp[i - 2][0] + nums[i - 1]);
            if i != n {
                dp[i][1] = dp[i - 1][1].max(dp[i - 2][1] + nums[i - 1]);
            }
            res = res.max(dp[i][0].max(dp[i][1]))
        }
        res
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
