import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2481. 分割圆的最少切割次数',
    url: 'https://leetcode.cn/problems/minimum-cuts-to-divide-a-circle/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个整数 n ，请你返回将圆切割成相等的 n 等分的 最少 切割次数。`,
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
            time: 4,
            memory: 5.9,
            desc: '奇数的只能按照中心点分，偶数能按照两端分',
            code: `class Solution {
public:
    int numberOfCuts(int n) {
        if (n == 1) return 0;
        if (n % 2 == 0) return n / 2;
        return n;
    }
};`,
        },
//                 {
//                     script: Script.PY3,
//                     time: 588,
//                     memory: 56.4,
//                     desc: '同上',
//                     code: `class Solution:
//     def canMakePaliQueries(self, s: str, queries: List[List[int]]) -> List[bool]:
//         list = [1]
//         for c in s:
//             list.append(list[-1] ^ (1 << (ord(c) - ord('a'))))

//         def check(q: List[int]):
//             l, r, k = q[0], q[1], q[2]
//             val = list[r+1] ^ list[l]
//             cnt = 0
//             for i in range(26):
//                 if val & (1 << i):
//                     cnt += 1
//             if (r-l+1) % 2:
//                 return 2 * k >= cnt - 1
//             else:
//                 return 2 * k >= cnt

//         return [check(q) for q in queries]`,
//                 },
//                 {
//                     script: Script.RUST,
//                     time: 28,
//                     memory: 9.5,
//                     desc: '同上',
//                     code: `impl Solution {
//     pub fn can_make_pali_queries(s: String, queries: Vec<Vec<i32>>) -> Vec<bool> {
//         let mut list = vec![0];
//         for c in s.as_bytes() {
//             list.push(list.last().unwrap() ^ (1 << (*c - b'a')));
//         }
//         let check = |q: Vec<i32>| -> bool {
//             let l = q[0] as usize;
//             let r = q[1] as usize;
//             let k = q[2];
//             let val = list[r + 1] ^ list[l];
//             let mut cnt = 0;
//             for i in 0..26 {
//                 if (val & (1 << i)) != 0 {
//                     cnt += 1;
//                 }
//             }
//             if (r - l + 1) % 2 == 0 {
//                 2 * k >= cnt
//             } else {
//                 2 * k >= cnt - 1
//             }
//         };
//         queries.into_iter().map(|q| check(q)).collect()
//     }
// }`,
//                 },
    ],
};

export default leetCodeMarkdown;
