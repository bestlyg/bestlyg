import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1632. 矩阵转换后的秩',
  url: 'https://leetcode.cn/problems/rank-transform-of-a-matrix/',
  difficulty: Difficulty.困难,
  tag: [Tag.贪心, Tag.并查集, Tag.图, Tag.拓扑排序, Tag.数组, Tag.矩阵],
  desc: `给你一个 m x n 的矩阵 matrix ，请你返回一个新的矩阵 answer ，其中 answer[row][col] 是 matrix[row][col] 的秩。`,
  solutions: [
    {
      script: Script.CPP,
      time: 580,
      memory: 85.8,
      desc: '遍历',
      code: `# define X first
# define Y second
# define pii pair<int,int>
class UnionFind {
public:
    int n;
    vector<int> data, cnt;
    UnionFind(int n): n(n), data(vector<int>(n, 0)), cnt(vector<int>(n, 1)) {
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
int pos2Idx(int x, int y, int size) { 
    return x * size + y; 
}
void idx2Pos(int idx, int size, int &x, int &y) {
    x = idx / size;
    y = idx % size;
}
vector<vector<int>> dirs = { {0, 1}, {0, -1}, {1, 0}, {-1, 0} };
// START

class Solution {
public:
    vector<vector<int>> matrixRankTransform(vector<vector<int>>& matrix) {
        int n = matrix.size(), m = matrix[0].size();
        vector<vector<int>> ans(n, vector<int>(m, 0));
        vector<vector<bool>> cache(n, vector<bool>(m, false));
        UnionFind uf(n * m);
        for (int i = 0; i < n; i++) {
            unordered_map<int, pii> mmap;
            for (int j = 0; j < m; j++) {
                int val = matrix[i][j];
                if (mmap.count(val)) uf.uni(pos2Idx(mmap[val].X, mmap[val].Y, m), pos2Idx(i, j, m));
                else mmap[val] = make_pair(i, j);
            }
        }
        for (int j = 0; j < m; j++) {
            unordered_map<int, pii> mmap;
            for (int i = 0; i < n; i++) {
                int val = matrix[i][j];
                if (mmap.count(val)) uf.uni(pos2Idx(mmap[val].X, mmap[val].Y, m), pos2Idx(i, j, m));
                else mmap[val] = make_pair(i, j);
            }
        }
        unordered_map<int, vector<pii>> mmap;
        for (int i = 0; i < n * m; i++) {
            int p = uf.find(i), row, col;
            idx2Pos(i, m, row, col);
            mmap[p].push_back(make_pair(row, col));
        }

        vector<pii> list, rows(n, make_pair(-1, -1)), cols(m, make_pair(-1, -1));
        for (int i = 0; i < n; i++) for (int j = 0; j < m; j++) list.push_back(make_pair(i, j));
        sort(list.begin(), list.end(), [&](auto &a, auto &b){ return matrix[a.X][a.Y] < matrix[b.X][b.Y]; });

        auto get_rank = [&](pii &item) -> int {
            int rank_row = 1, rank_col = 1, rank = ans[item.X][item.Y], val = matrix[item.X][item.Y];
            auto &row = rows[item.X], &col = cols[item.Y];
            if (row.X != -1) rank_row = ans[row.X][row.Y] + (matrix[row.X][row.Y] != val);
            if (col.Y != -1) rank_col = ans[col.X][col.Y] + (matrix[col.X][col.Y] != val);
            rank = max(rank, max(rank_row, rank_col));
            return rank;
        };

        for (auto &item : list) {
            if (!cache[item.X][item.Y]) {
                int idx = uf.find(pos2Idx(item.X, item.Y, m)), rank = get_rank(item);
                for (auto &next : mmap[idx]) {
                    rank = max(rank, get_rank(next));
                }
                for (auto &next : mmap[idx]) {
                    cache[next.X][next.Y] = true;
                    ans[next.X][next.Y] = rank;
                }
            }
            rows[item.X] = cols[item.Y] = item;
        }

        return ans;
    }
};
// END`,
    },
    {
      script: Script.PY3,
      time: 2832,
      memory: 15.2,
      desc: '同上',
      code: `class Solution:
    def countPoints(self, points: List[List[int]], queries: List[List[int]]) -> List[int]:
        ans = [0] * len(queries)
        def d(a, b): return pow(abs(a[0] - b[0]), 2) + pow(abs(a[1] - b[1]), 2)
        for i in range(0, len(queries)):
            for p in points:
                if d(p, queries[i]) <= pow(queries[i][2], 2):
                    ans[i] += 1
        return ans`,
    },
    {
      script: Script.RUST,
      time: 20,
      memory: 2.2,
      desc: '同上',
      code: `impl Solution {
    pub fn count_points(points: Vec<Vec<i32>>, queries: Vec<Vec<i32>>) -> Vec<i32> {
        let d =
            |a: &Vec<i32>, b: &Vec<i32>| (a[0] - b[0]).abs().pow(2) + (a[1] - b[1]).abs().pow(2);
        let mut ans = vec![0; queries.len()];
        for i in 0..queries.len() {
            for p in points.iter() {
                if d(&queries[i], p) <= queries[i][2].pow(2) {
                    ans[i] += 1;
                }
            }
        }
        ans
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;
