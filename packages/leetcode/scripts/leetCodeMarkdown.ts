import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1254. 统计封闭岛屿的数目',
    url: 'https://leetcode.cn/problems/number-of-closed-islands/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `二维矩阵 grid 由 0 （土地）和 1 （水）组成。岛是由最大的4个方向连通的 0 组成的群，封闭岛是一个 完全 由1包围（左、上、右、下）的岛。请返回 封闭岛屿 的数目。`,
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
            time: 20,
            memory: 13,
            desc: 'bfs',
            code: `#define X first
#define Y second
#define pii pair<int, int>
vector<vector<int>> dirs = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

class Solution {
public:
    int closedIsland(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size(), res = 0;
        bool used[100][100] = {0};
        auto check = [&](int i, int j) {
            bool res = true;
            queue<pii> q;
            q.push(make_pair(i, j));
            used[i][j] = true;
            while (q.size()) {
                auto cur = q.front();
                q.pop();
                for (auto &dir : dirs) {
                    int ni = cur.X + dir[0], nj = cur.Y + dir[1];
                    if (ni < 0 || ni >= n || nj < 0 || nj >= m || grid[ni][nj] == 1 || used[ni][nj]) continue;
                    if (ni == 0 || ni == n - 1 || nj == 0 || nj == m - 1) res = false;
                    q.push(make_pair(ni, nj));
                    used[ni][nj] = true;
                }
            }
            return res;
        };
        for (int i = 1; i < n - 1; i++) {
            for (int j = 1; j < m - 1; j++) {
                if (grid[i][j] == 0 && !used[i][j] && check(i, j)) res += 1;
            }
        }
        return res;
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
