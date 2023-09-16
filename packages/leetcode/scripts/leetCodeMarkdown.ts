import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '198. 打家劫舍',
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
            time: 4,
            memory: 8.1,
            desc: 'dp记录当前下标下的最大值',
            code: `class Solution {
public:
    int rob(vector<int>& nums) {
        int n = nums.size(), res = 0;
        if (n == 1) return nums[0];
        vector<int> dp(n, 0);
        dp[0] = nums[0];
        dp[1] = max(nums[0], nums[1]);
        res = max(dp[0], dp[1]);
        for (int i = 2; i < n; i++) {
            dp[i] = max(dp[i - 1], dp[i - 2] + nums[i]);
            res = max(res, dp[i]);
        }
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 32,
            memory: 16,
            desc: '同上',
            code: `class Solution:
    def rob(self, nums: List[int]) -> int:
        if len(nums) == 1:
            return nums[0]
        dp = [0 for _ in nums]
        dp[0] = nums[0]
        dp[1] = max(nums[1], nums[0])
        for i in range(2, len(nums)):
            dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])
        return max(dp)`,
        },
        {
            script: Script.RUST,
            time: 0,
            memory:1.95,
            desc: '同上',
            code: `impl Solution {
    pub fn rob(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        if n == 1 {
            nums[0]
        } else {
            let mut dp = vec![0; n];
            dp[0] = nums[0];
            dp[1] = nums[1].max(nums[0]);
            for i in 2..n {
                dp[i] = dp[i - 1].max(dp[i - 2] + nums[i]);
            }
            dp.into_iter().max().unwrap()
        }
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
