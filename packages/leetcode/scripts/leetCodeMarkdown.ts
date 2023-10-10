import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2731. 移动机器人',
    url: 'https://leetcode.cn/problems/movement-of-robots/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回指令重复执行 d 秒后，所有机器人之间两两距离之和。`,
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
        //     date: new Date('2020.12.28').getTime(),
        //     script: Script.TS,
        //     time: 120,
        //     memory: 44.6,
        //     desc: 'dp',
        //     code: ``,
        // },
        {
            script: Script.CPP,
            time: 108,
            memory: 97.32,
            desc: '贪心，忽略碰撞',
            code: `class Solution {
public:
    int sumDistance(vector<int>& nums, string s, int d) {
        long long n = nums.size(), res = 0, MOD = 1e9 + 7;
        vector<long long> arr;
        for (int i = 0; i < n; i++) {
            arr.push_back(s[i] == 'L' ? nums[i] - d : nums[i] + d);
        }
        sort(arr.begin(), arr.end());
        for (int i = 1; i < n; i++) {
            long long v = (arr[i] - arr[i - 1]) % MOD * (n - i) * i % MOD;
            res = (res + v) % MOD;
        }
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 136,
            memory: 26.55,
            desc: '同上',
            code: `class Solution:
    def sumDistance(self, nums: List[int], s: str, d: int) -> int:
        n = len(nums)
        arr = [nums[i] - d if s[i] == 'L' else nums[i] + d for i in range(n)]
        arr.sort()
        return sum((arr[i] - arr[i - 1]) * (n - i) * i for i in range(1, n)) % 1000000007`,
        },
        {
            script: Script.RUST,
            time: 24,
            memory: 4.51,
            desc: '同上',
            code: `impl Solution {
    pub fn sum_distance(nums: Vec<i32>, s: String, d: i32) -> i32 {
        let s = s.chars().into_iter().collect::<Vec<_>>();
        let n = nums.len();
        let mut res = 0;
        const MOD: i64 = 1000000007;
        let mut arr = vec![];
        for i in 0..n {
            arr.push(if s[i] == 'L' {
                (nums[i] - d) as i64
            } else {
                (nums[i] + d) as i64
            })
        }
        arr.sort();
        for i in 1..n {
            let v = (arr[i] - arr[i - 1]) % MOD * ((n as i64) - i as i64) * (i as i64);
            res = (res + v) % MOD;
        }
        res as i32
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;
