import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1494. 并行课程 II',
    url: 'https://leetcode.cn/problems/parallel-courses-ii/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个整数 n 表示某所大学里课程的数目，编号为 1 到 n ，数组 relations 中， relations[i] = [xi, yi]  表示一个先修课的关系，也就是课程 xi 必须在课程 yi 之前上。同时你还有一个整数 k 。在一个学期中，你 最多 可以同时上 k 门课，前提是这些课的先修课在之前的学期里已经上过了。请你返回上完所有课最少需要多少个学期。`,
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
            time: 680,
            memory: 168.4,
            desc: 'dfs遍历，判断同一期每个点上课的情况',
            code: `#define SIZE 13
struct Node {
    int idx, child_cnt;
    unordered_set<int> parents, children;

};
class Solution {
public:
    int minNumberOfSemesters(int n, vector<vector<int>>& relations, int k) {
        vector<Node> list(n);

        for (int i = 0; i < n; i++) {
            list[i].idx = i;
            list[i].child_cnt = 0;
        }

        for (auto &item : relations) {
            list[item[1] - 1].parents.insert(item[0] - 1);
            list[item[0] - 1].children.insert(item[1] - 1);
        }

        // for (int i = 0; i < n; i++) {
        //     cout << "i = " << i
        //          << ", parent = ";
        //     for (auto &p : list[i].parents) cout << p << ", ";
        //     cout << ", children = ";
        //     for (auto &c : list[i].children) cout << c << ", ";
        //     cout << endl;
        // }

        int empty = 0, res = INT_MAX;
        for (int i = 0; i < n; i++) {
            if (list[i].parents.size() == 0) empty |= 1 << i;
        }

        unordered_map<int, unordered_map<int, unordered_map<int, unordered_map<int, int>>>> cache;
        function<int(int, int, int, int)> dfs = [&](int empty, int used, int cur_res, int cur_k){
            if (cache[empty][used][cur_res][cur_k]) return cache[empty][used][cur_res][cur_k];
            // cout << "dfs "
            //      << ", empty = " << bitset<SIZE>(empty).to_string()
            //      << ", used = " << bitset<SIZE>(used).to_string()
            //      << ", cur_res = " << cur_res
            //      << ", cur_k = " << cur_k
            //      << endl;
            if (used == (1 << n) - 1) {
                if (cur_k) cur_res += 1;
                return cache[empty][used][cur_res][cur_k] = cur_res;
            }

            if (cur_k == k || empty == 0) {
                int next_empty = empty;
                for (int i = 0; i < n; i++) {
                    if ((used & (1 << i)) == 0 && list[i].parents.size() == 0) next_empty |= 1 << i;
                }
                return cache[empty][used][cur_res][cur_k] = dfs(next_empty, used, cur_res + 1, 0);
            }

            int res = INT_MAX;
            for (int i = 0; i < n; i++) {
                if (empty & (1 << i)) {
                    for (auto &c : list[i].children) list[c].parents.erase(i);
                    res = min(res, dfs(empty & ~(1 << i), used | (1 << i), cur_res, cur_k + 1));
                    for (auto &c : list[i].children) list[c].parents.insert(i);
                }
            }
            return cache[empty][used][cur_res][cur_k] = res;
        };

        return dfs(empty, 0, 0, 0);
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
