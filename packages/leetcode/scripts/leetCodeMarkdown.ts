import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '6447. 给墙壁刷油漆',
    url: 'https://leetcode.cn/problems/painting-the-walls/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你两个长度为 n 下标从 0 开始的整数数组 cost 和 time ，分别表示给 n 堵不同的墙刷油漆需要的开销和时间。请你返回刷完 n 堵墙最少开销为多少。`,
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
//         {
//             script: Script.CPP,
//             time: 848,
//             memory: 18.7,
//             desc: '同上',
//             code: `class Solution {
// public:
//     int specialPerm(vector<int>& nums) {
//         int n = nums.size(), MOD = 1e9 + 7;
//         int cache[1 << n][n + 1];
//         memset(cache, 0, sizeof(cache));
//         function<int(int, int)> dfs = [&](int used, int prev) -> int {
//             if (used == (1 << n) - 1) return 1;
//             if (cache[used][prev + 1]) return cache[used][prev + 1];
//             int res = 0;
//             for (int i = 0; i < n; i++) {
//                 if (used & (1 << i)) continue;
//                 if (prev == -1 || nums[i] % nums[prev] == 0 || nums[prev] % nums[i] == 0) {
//                     res = (dfs(used | (1 << i), i) + res) % MOD;
//                 }
//             }
//             return cache[used][prev + 1] = res;
//         };
//         return dfs(0, -1);
//     }
// };`,
//         },
        {
            script: Script.PY3,
            time: 2596,
            memory: 491,
            desc: '同上',
            code: `class Solution:
    def paintWalls(self, cost: List[int], time: List[int]) -> int:
        n = len(cost)
        @cache
        def dfs(idx: int, cnt: int):
            if cnt >= n - idx: return 0
            if idx == n: return inf
            return min(dfs(idx + 1, cnt + time[idx]) + cost[idx], dfs(idx + 1, cnt - 1))
        return dfs(0, 0)`,
        },
//         {
//             script: Script.RUST,
//             time: 296,
//             memory: 3.6,
//             desc: '同上',
//             code: `impl Solution {
//     pub fn special_perm(nums: Vec<i32>) -> i32 {
//         let n = nums.len();
//         let mut cache = vec![vec![0; n + 1]; 1 << n];
//         fn dfs(nums: &Vec<i32>, cache: &mut Vec<Vec<i32>>, n: usize, used: i32, prev: i32) -> i32 {
//             if (used as usize) == (1 << (n as u64)) - 1 {
//                 1
//             } else if cache[used as usize][(prev + 1) as usize] != 0 {
//                 cache[used as usize][(prev + 1) as usize]
//             } else {
//                 for i in 0..n {
//                     if (used & (1 << i)) == 0
//                         && (prev == -1
//                             || nums[i] % nums[prev as usize] == 0
//                             || nums[prev as usize] % nums[i] == 0)
//                     {
//                         cache[used as usize][(prev + 1) as usize] = (cache[used as usize]
//                             [(prev + 1) as usize]
//                             + dfs(nums, cache, n, used | (1 << i), i as i32))
//                             % (1000000000 + 7);
//                     }
//                 }
//                 cache[used as usize][(prev + 1) as usize]
//             }
//         }
//         return dfs(&nums, &mut cache, n, 0, -1);
//     }
// }`,
//         },
    ],
};

export default leetCodeMarkdown;
