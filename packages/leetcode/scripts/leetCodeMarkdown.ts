import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1263. 推箱子',
  url: 'https://leetcode.cn/problems/minimum-moves-to-move-a-box-to-their-target-location/',
  difficulty: Difficulty.简单,
  tag: [],
  desc: `返回将箱子推到目标位置的最小 推动 次数，如果无法做到，请返回 -1。`,
  solutions: [
    //     {
    //       script: Script.TS,
    //       time: 184,
    //       memory: 48.3,
    //       desc: '遍历',
    //       code: `function isValid(s: string): boolean {
    //     while (s != "") {
    //         const n = s.replace("abc", "");
    //         if (n == s) return false;
    //         s = n;
    //     }
    //     return s == "";
    // };`,
    //     },
    {
      script: Script.CPP,
      time: 72,
      memory: 15.4,
      desc: 'dfs每次统计左右子树的差值',
      code: `#define X first
#define Y second
#define pii pair<int, int>

class UnionFind {
    public:
    int n;
    vector<int> data, cnt;
    UnionFind(int n) : n(n), data(vector<int>(n, 0)), cnt(vector<int>(n, 1)) {
        iota(data.begin(), data.end(), 0);
    }
    int size(int v) { return cnt[find(v)]; }
    int find(int v) {
        if (data[v] == v) return v;
        return data[v] = find(data[v]);
    }
    void uni(int v1, int v2) {
        int p1 = find(v1), p2 = find(v2);
        if (p1 != p2) cnt[p1] += cnt[p2], data[p2] = p1;
    }
    bool same(int v1, int v2) { return find(v1) == find(v2); }
};
int pos2Idx(int x, int y, int size) { return x * size + y; }
void idx2Pos(int idx, int size, int &x, int &y) {
    x = idx / size;
    y = idx % size;
}
vector<vector<int>> dirs = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
// 记录箱子和人的位置
struct Node {
    pii p, b;
    Node(pii p, pii b): p(p), b(b) {}
};
class Solution {
public:
    int minPushBox(vector<vector<char>>& grid) {
        pii t, p, b;
        int n = grid.size(), m = grid[0].size();
        // 统计箱子和人的位置放置重复计算
        unordered_map<int, unordered_map<int, bool>> used;
        // 判断两个坐标是否相等
        auto is_same = [&](pii a, pii b) -> bool {
            return a.X == b.X && a.Y == b.Y;
        };
        // 针对当前Node值，计算并查集，计算时要排除箱子位置，用于后面判断人是不是能到这个点
        auto get_uf = [&](Node cur) -> UnionFind {
            UnionFind uf(n * m);
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < m; j++) {
                    if (grid[i][j] == '.' && !is_same(cur.b, make_pair(i, j))) {
                        for (int k = 0; k < 4; k++) {
                            int ni = i + dirs[k][0], nj = j + dirs[k][1];
                            if (0 <= ni && ni < n && 0 <= nj && nj < m && grid[ni][nj] == '.' && !is_same(cur.b, make_pair(ni, nj))) {
                                uf.uni(pos2Idx(i, j, m), pos2Idx(ni, nj, m));
                            }
                        }
                    }
                }
            }
            return uf;
        };
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (grid[i][j] == 'T') t = make_pair(i, j), grid[i][j] = '.';
                else if (grid[i][j] == 'B') b = make_pair(i, j), grid[i][j] = '.';
                else if (grid[i][j] == 'S') p = make_pair(i, j), grid[i][j] = '.';
            }
        }
        queue<Node> q;
        q.push(Node(p, b));
        int size = 1, step = 0;
        while (q.size()) {
            auto cur = q.front();
            q.pop();
            if (is_same(cur.b, t)) return step;
            auto uf = get_uf(cur);
            for (int k = 0; k < 4; k++) {
                int ni = cur.b.X + dirs[k][0], nj = cur.b.Y + dirs[k][1],
                    bi = cur.b.X - dirs[k][0], bj = cur.b.Y - dirs[k][1];
                // 如果箱子要推到(ni, nj), 那么人要在(bi, bj)位置上推，所以这两个位置都要空，且这个位置没有被统计过
                if (0 <= ni && ni < n && 0 <= nj && nj < m && grid[ni][nj] == '.' &&
                    0 <= bi && bi < n && 0 <= bj && bj < m && grid[bi][bj] == '.' &&
                    uf.same(pos2Idx(cur.p.X, cur.p.Y, m), pos2Idx(bi, bj, m)) &&
                    !used[pos2Idx(cur.b.X, cur.b.Y, m)][pos2Idx(ni, nj, m)]) {
                    q.push(Node(make_pair(cur.b.X, cur.b.Y), make_pair(ni, nj)));
                    used[pos2Idx(cur.b.X, cur.b.Y, m)][pos2Idx(ni, nj, m)] = true;
                }
            }
            if (--size == 0) {
                size = q.size();
                step++;
            }
        }

        return -1;
    }
};`,
    },
//     {
//       script: Script.PY3,
//       time: 324,
//       memory: 48.6,
//       desc: '同上',
//       code: `class Solution:
//     def minIncrements(self, n: int, cost: List[int]) -> int:
//         level = log2(n+1)
//         res = 0

//         def dfs(root: int, l: int) -> int:
//             nonlocal res
//             if l == level : return cost[root]
//             left = dfs(root * 2 + 1, l + 1)
//             right = dfs(root * 2 + 2, l + 1)
//             if left == right :return left + cost[root]
//             res += abs(left -right)
//             return max(left, right ) + cost[root]
//         dfs(0, 1)
//         return res`,
//     },
//     {
//       script: Script.RUST,
//       time: 24,
//       memory:3.4,
//       desc: '同上',
//       code: `impl Solution {
//     pub fn min_increments(n: i32, cost: Vec<i32>) -> i32 {        
//         let level = ((n + 1) as f64).log2() as u32;
//         let mut res = 0;
//         fn dfs(cost: &Vec<i32>, level: u32, res: &mut i32, root: usize, l: u32) -> i32 {
//             if l == level {
//                 cost[root]
//             } else {
//                 let left = dfs(cost, level, res, root * 2 + 1, l + 1);
//                 let right = dfs(cost, level, res, root * 2 + 2, l + 1);
//                 if left == right {
//                     left + cost[root]
//                 } else {
//                     *res += (right - left).abs();
//                     left.max(right) + cost[root]
//                 }
//             }
//         }
//         dfs(&cost, level, &mut res, 0, 1);
//         res
//     }
// }`,
    // },
  ],
};

export default leetCodeMarkdown;
