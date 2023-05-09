// #ifdef LOCAL
#include <algorithm>
#include <cstdio>
#include <iostream>
#include <numeric>
#include <queue>
#include <unordered_map>
#include <unordered_set>
#include <set>
#include <vector>
// #endif

// bestlyg
#define X first
#define Y second
#define lb(x) ((x) & (-x))
#define mem(a, b) memset(a, b, sizeof(a))
#define debug freopen("input", "r", stdin)
#define pii pair<int, int>

#ifdef DEBUG
#define log(frm, args...) \
    { printf(frm, ##args); }
#else
#define log(frm, args...)
#endif

typedef long long ll;
using namespace std;

#ifdef LOCAL
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};
void binary(unsigned n, int lastbit = 31) {
    unsigned i;
    for (i = 1 << lastbit; i > 0; i >>= 1) printf("%u", !!(n & i));
}
#endif

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
int gcd(int a, int b) {
    if (a < b) return gcd(b, a);
    if (b == 0) return a;
    return gcd(b, a % b);
}
vector<int> get_sums(vector<int> &arr) {
    vector<int> sums(1, 0);
    for (auto &num : arr) sums.push_back(sums.back() + num);
    return sums;
}
// START

#define X first
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
};

// END
#ifdef LOCAL
int main() {
    auto cmp = [&](pii x, pii y) -> bool { return x.second < y.second; };
    priority_queue<pii, vector<pii>, decltype(cmp)> q(cmp);
    vector<int> stones = {3,2,4,1};
    int k = 2;
    Solution s;
    auto res = s.mergeStones(stones, k);
    log("%d\n", 1);
    return 0;
}
#endif
