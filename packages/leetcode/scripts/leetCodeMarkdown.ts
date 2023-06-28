import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1681. 最小不兼容性',
    url: 'https://leetcode.cn/problems/minimum-incompatibility/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个整数数组 nums​​​ 和一个整数 k 。你需要将这个数组划分到 k 个相同大小的子集中，使得同一个子集里面没有两个相同的元素。一个子集的 不兼容性 是该子集里面最大值和最小值的差。请你返回将数组分成 k 个子集后，各子集 不兼容性 的 和 的 最小值 ，如果无法分成分成 k 个子集，返回 -1 。`,
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
            time: 1852,
            memory:303.8,
            desc: '状态压缩+记忆化搜索',
            code: `#define MAX 8
class Solution {
public:
    int minimumIncompatibility(vector<int>& nums, int k) {
        int n = nums.size(), m[17] = {0};
        for (auto &num : nums) {
            m[num]++;
            if (m[num] > k) return -1;
        }
        if (k == n) return 0;
        sort(nums.begin(), nums.end());

        // cout << "nums : ";
        // for (auto &num : nums) cout << num << ", ";
        // cout << endl;

        // int dp[k + 1][1 << n];
        // memset(dp, 0, sizeof(dp));
        // for (int i = 1; i <= k; i++) {
        //     int res = 0x3f3f3f3f;
        // }

        // return dp[k][1 << n];

        unordered_map<int, unordered_map<int, int>> cache;
        function<int(int, int)> dfs = [&](int cur, int used) {
            // cout << "==> cur = " << cur << ", used = " << bitset<MAX>(used).to_string() << endl;
            if (cur == k) return 0;
            if (cache[cur][used]) return cache[cur][used];
            // cout << "in" << endl;
            int res = 0x3f3f3f3f;
            auto lists = comp(n / k, n, used, nums);

            // cout << "lists = ";
            // for (auto &list : lists) {
            //     cout << "[";
            //     for (auto &num : list) {
            //         cout << num << ", ";
            //     }
            //     cout << "], ";
            // }
            // cout << endl;

            for (auto &list : lists) {
                int next_used = used, nmin = INT_MAX, nmax = INT_MIN;
                for (auto &i : list) {
                    nmin = min(nmin, nums[i]);
                    nmax = max(nmax, nums[i]);
                    next_used |= 1 << i;
                }
                auto next = dfs(cur + 1, next_used);
                // cout << "nmin = " << nmin << ", nmax = " << nmax << endl;
                // cout << "res = " << res << ", dfs = " << next << endl;
                res = min(res,  next + nmax - nmin);
            }

            // cout << "==> cur = " << cur << ", used = " << bitset<MAX>(used).to_string() << ", res = " << res << endl;

            return cache[cur][used] = res;
        };
        return dfs(0, 0);
    }
    vector<vector<int>> comp(int cnt, int total, int used, vector<int>& nums) {
        // cout << "comp " << cnt << ", " << total << ", " << bitset<MAX>(used).to_string() << endl;

        vector<vector<int>> res;
        vector<int> list;
        function<void(int, int)> dfs = [&](int idx, int sum) {

            // cout << "dfs " << idx << ", " << sum << ", list = ";
            // for (auto &item : list) cout << item << ", ";
            // cout << endl;

            if (total - idx < sum) return;
            else if (sum == 0) res.push_back(list);
            else {
                int cur_num = nums[idx];
                bool is_used = used & (1 << idx);
                if (!is_used) {
                    list.push_back(idx);

                    int next_idx = idx + 1;
                    while (next_idx < total && nums[next_idx] == nums[idx]) next_idx++;
                    dfs(next_idx, sum - 1);

                    list.pop_back();
                }

                int next_idx = idx + 1;
                while (next_idx < total && nums[idx] == nums[next_idx] && !is_used) next_idx++;
                dfs(next_idx, sum);
            }
        };
        dfs(0, cnt);
        return res;
    }
};`,
        },
//         {
//             script: Script.PY,
//             time: 104,
//             memory: 24.2,
//             desc: '同上',
//             code: `class Solution:
//     def maximumSum(self, arr: List[int]) -> int:
//         dp0 = dp1 = res = -inf
//         for num in arr:
//             dp1 = max(dp0, dp1 + num)
//             dp0 = max(dp0, 0) + num
//             res = max(res, max(dp0, dp1))
//         return res`,
//         },
//         {
//             script: Script.RUST,
//             time: 8,
//             memory: 3,
//             desc: '同上',
//             code: `impl Solution {
//     pub fn maximum_sum(arr: Vec<i32>) -> i32 {
//         use std::cmp::max;
//         let (mut dp0, mut dp1, mut res) = (-0x3f3f3f3f, -0x3f3f3f3f, -0x3f3f3f3f);
//         for num in arr {
//             dp1 = max(dp0, dp1 + num);
//             dp0 = max(dp0, 0) + num;
//             res = max(res, max(dp0, dp1));
//         }
//         res
//     }
// }`,
//         },
    ],
};

export default leetCodeMarkdown;
