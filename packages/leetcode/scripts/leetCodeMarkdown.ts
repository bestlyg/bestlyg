import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '6894. 所有子数组中不平衡数字之和',
    url: 'https://leetcode.cn/problems/sum-of-imbalance-numbers-of-all-subarrays/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个下标从 0 开始的整数数组 nums ，请你返回它所有 子数组 的 不平衡数字 之和。`,
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
            time: 816,
            memory: 137.5,
            desc: '平衡树',
            code: `class Solution {
public:
    int sumImbalanceNumbers(vector<int>& nums) {
        int n = nums.size(), res = 0;
        for (int i = 1; i < n; i++) {
            map<int, int> m;
            int cnt = 0;
            for (int j = i; j >= 0; j--) {
                m[nums[j]]++;
                if (m[nums[j]] > 1) {
                    res += cnt;
                    continue;
                }
                auto it = m.find(nums[j]);
                auto prev = it;
                if (prev != m.begin()) {
                    prev--;
                    if (nums[j] - prev->first > 1) cnt++;
                }

                auto next = it;
                next++;
                if (next != m.end()) {
                    if (next->first - nums[j] > 1) cnt++;
                }
                if (it != m.begin() && next != m.end()) cnt--;
                res += cnt;
            }
        }
        return res;
    }
};`,
        },
//         {
//             script: Script.PY,
//             time: 744,
//             memory: 27.6,
//             desc: '同上',
//             code: `def get_primes2(n: int) -> List[bool]:
//         n += 3
//         primes = [True for _ in range(n)]
//         primes[0] = primes[1] = False
//         for i in range(2, n):
//             if primes[i]:
//                 j = 2
//                 while i * j < n:
//                     primes[i*j] = False
//                     j += 1
//         return primes
    
//     primes = get_primes2(1000000)
    
//     class Solution:
//         def findPrimePairs(self, n: int) -> List[List[int]]:
//             res = []
//             if n >= 2 and primes[n-2]:
//                 res.append([2, n-2])
//             for i in range(3, n//2 + 1, 2):
//                 if primes[i] and primes[n-i]:
//                     res.append([i, n-i])
//             return res`,
//         },
//         {
//             script: Script.RUST,
//             time: 224,
//             memory: 3.6,
//             desc: '同上',
//             code: `pub fn get_primes2(mut n: usize) -> Vec<bool> {
//     n += 3;
//     let mut primes = vec![true; n];
//     primes[0] = false;
//     primes[1] = false;
//     for i in 2..n {
//         if primes[i] {
//             let mut j = 2;
//             while i * j < n {
//                 primes[i * j] = false;
//                 j += 1;
//             }
//         }
//     }
//     primes
// }

// impl Solution {
//     pub fn find_prime_pairs(n: i32) -> Vec<Vec<i32>> {
//         let n = n as usize;
//         let primes = get_primes2(n);
//         let mut res = vec![];
//         if n >= 2 && primes[n - 2] {
//             res.push(vec![2, (n as i32) - 2]);
//         }
//         let mut i = 3;
//         while i <= n / 2 {
//             if primes[i] && primes[n - i] {
//                 res.push(vec![i as i32, (n - i) as i32]);
//             }
//             i += 2;
//         }
//         res
//     }
// }`,
//         },
    ],
};

export default leetCodeMarkdown;
