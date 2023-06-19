import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1262. 可被三整除的最大和',
    url: 'https://leetcode.cn/problems/greatest-sum-divisible-by-three/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个整数数组 nums，请你找出并返回能被三整除的元素最大和。`,
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
            time: 24,
            memory: 26,
            desc: '求出总和，模3判断多了的数字',
            code: `class Solution {
public:
    int maxSumDivThree(vector<int>& nums) {
        int sum = 0;
        vector<int> v1, v2;
        for (auto &num : nums) {
            sum += num;
            switch (num % 3) {
                case 1: v1.push_back(num); break;
                case 2: v2.push_back(num); break;
            }
        }
        if (sum % 3 == 0) return sum;
        sort(v1.begin(), v1.end());
        sort(v2.begin(), v2.end());
        if (sum % 3 == 2) swap(v1, v2);
        int res = v1.size() ? sum - v1[0] : 0;
        if (v2.size() > 1) res = max(res, sum - v2[0] - v2[1]);
        return res;
    }
};`,
        },
        {
            script: Script.CPP,
            time: 72,
            memory: 36,
            desc: 'dp表示余i个数的时候的最大和',
            code: `class Solution {
public:
    int maxSumDivThree(vector<int>& nums) {
        vector<int> dp = {0, INT_MIN, INT_MIN};
        for (auto &num : nums) {
            auto nextDp = dp;
            for (int i = 0; i < 3; i++) {
                int idx = (i + num) % 3;
                nextDp[idx] = max(nextDp[idx], dp[i] + num);
            }
            dp = nextDp;
        }
        return dp[0];
    }
};`,
        },
//         {
//             script: Script.PY3,
//             time: 132,
//             memory: 27.8,
//             desc: '同上',
//             code: `class Solution:
//     def findValueOfPartition(self, nums: List[int]) -> int:
//         nums.sort()
//         return min(nums[i] - nums[i - 1] for i in range(1, len(nums)))`,
//         },
//         {
//             script: Script.RUST,
//             time: 24,
//             memory: 3.5,
//             desc: '同上',
//             code: `impl Solution {
// pub fn find_value_of_partition(mut nums: Vec<i32>) -> i32 {
//     nums.sort();
//     (1..nums.len())
//         .into_iter()
//         .map(|i| nums[i] - nums[i - 1])
//         .min()
//         .unwrap()
// }
// }`,
//         },
    ],
};

export default leetCodeMarkdown;
