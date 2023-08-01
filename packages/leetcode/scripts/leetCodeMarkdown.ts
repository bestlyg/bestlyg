import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2681. 英雄的力量',
    url: 'https://leetcode.cn/problems/power-of-heroes/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回所有可能的 非空 英雄组的 力量 之和。`,
    solutions: [
        // {
        //     date: new Date('2020/10/06').getTime(),
        //     script: Script.JS,
        //     time: 224,
        //     memory: 54.2,
        //     desc: 'dfs',
        //     code: ``,
        // },
        {
            script: Script.CPP,
            time: 88,
            memory: 88.63,
            desc: '排序后遍历统计',
            code: `class Solution {
public:
    typedef long long ll;
    int sumOfPower(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        // min (...cnt) max， sum统计min为最小值的情况个数，pow(2, cnt)
        ll res = 0, MOD = 1e9 + 7, sum = 0;
        for (int i = 0; i < nums.size(); i++) {
            ll num = nums[i], num2 = num * num % MOD;
            // 当子序列内只有num时的情况
            res += num2 * num % MOD;
            // 前面最小值的和 乘以 最大值的平方
            res += sum * num2 % MOD;
            // 重新累加最小值的和
            sum = ((sum * 2 % MOD) + num) % MOD;
        }
        return res % MOD;
    }
};`,
        },
        {
            script: Script.PY,
            time: 168,
            memory: 25.5,
            desc: '同上',
            code: `class Solution:
    def sumOfPower(self, nums: List[int]) -> int:
        nums.sort()
        res = sum = 0
        MOD = 1000000000 + 7
        for i in range(len(nums)):
            num = nums[i]
            num2 = num * num % MOD
            res += num2 * num % MOD + sum * num2 % MOD
            sum = (sum * 2 % MOD + num) % MOD
        return int(res % MOD)`,
        },
        {
            script: Script.RUST,
            time: 24,
            memory: 3.37,
            desc: '同上',
            code: `impl Solution {
    pub fn sum_of_power(nums: Vec<i32>) -> i32 {
        let mut nums: Vec<i64> = nums.into_iter().map(|v| v as i64).collect();
        nums.sort();
        let mut res = 0i64;
        let mut sum = 0i64;
        const MOD: i64 = 1000000000 + 7;
        for i in 0..nums.len() {
            let num = nums[i];
            let num2 = num * num % MOD;
            res += num2 * num % MOD + sum * num2 % MOD;
            sum = (sum * 2 % MOD + num) % MOD
        }
        (res % MOD) as i32
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
