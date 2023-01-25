#include <vector>
#include <iostream>
#include <algorithm>
#include <numeric>
#include <cstdio>
#include <unordered_set>
#include <unordered_map>

// bestlyg
# define X first
# define Y second
# define lb(x) ((x) & (-x))
# define mem(a,b) memset(a,b,sizeof(a))
# define debug freopen("input","r",stdin)
# define pii pair<int,int>

#ifdef DEBUG
#define log(frm, args...) {\
    printf(frm, ##args);\
}
#else
#define log(frm, args...)
#endif

typedef long long ll;
using namespace std;

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
        

        for (auto &item : list) {
            cout << "====" << endl
                 << "item(" << item.X << ", " << item.Y << ")" << matrix[item.X][item.Y]
                 << ", rows(" << rows[item.X].X << ", " << rows[item.X].Y << ")"
                 << ", cols(" << cols[item.Y].X << ", " << cols[item.Y].Y << ")" 
                 << endl;
            int rank_row = 1, rank_col = 1, rank, idx = uf.find(pos2Idx(item.X, item.Y, m)), val = matrix[item.X][item.Y];
            auto &row = rows[item.X], &col = cols[item.Y];
            if (row.X != -1)
                rank_row = ans[row.X][row.Y] + (matrix[row.X][row.Y] != val);
            if (col.Y != -1)
                rank_col = ans[col.X][col.Y] + (matrix[col.X][col.Y] != val);
            rank = max(rank_row, rank_col);
            cout << "rank_row = " << rank_row << ", rank_col = " << rank_col << endl;
            for (auto &next : mmap[idx]) {
                cout << "next(" << next.X << ", " << next.Y << ")" << endl;
                ans[next.X][next.Y] = rank;
            }
            row = col = item;
        }

        return ans;
    }

    void print(vector<vector<int>> &list) {
        cout << "====ans====" << endl;
        for (auto &item : list) {
            for (auto &v : item) {
                cout << v << " ";
            }
            cout << endl;
        }
    }
};
// END


void print(vector<vector<int>> &list) {
    cout << "====ans====" << endl;
    for (auto &item : list) {
        for (auto &v : item) {
            printf("%3d ", v);
        }
        cout << endl;
    }
}

int main() {
    vector<vector<int>> matrix = {
        {25, 8, 31, 42, -39, 8, 31, -10, 33, -44, 7, -30, 9, 44, 15, 26}, 
        {-3, -48, -17, -18, 9, -12, -21, 10, 1, 44, -17, 14, -27, 48, -21, -6}, 
        {49, 28, 27, -18, -31, 4, -13, 34, 49, 48, 47, -18, 33, 40, 15, 38}, 
        {5, -28, -49, -38, 1, 32, -25, -50, 29, -32, 35, -46, -43, 48, -49, -6}, 
        {-27, -24, 23, -14, -47, -12, 7, 6, 25, -16, 47, -26, 13, -12, -33, -18}, 
        {45, -48, 3, -26, -23, -36, -17, 38, 17, 12, 15, 46, 37, 40, 47, 26}, 
        {-19, -24, -21, -2, -7, -48, 47, 30, 5, -8, 23, -46, 21, -32, -33, -26}, 
        {-27, 32, 27, -26, 21, -32, -49, -10, 5, 20, -29, 46, -43, -44, 39, 22}, 
        {-43, 48, 27, 26, -27, 12, -1, -10, -27, 12, -29, -34, 41, -28, -25, -30}, 
        {25, -36, 35, -26, 37, -20, 31, 14, -19, -40, -29, -2, -39, -28, 11, 46}, 
        {49, -32, -29, -6, -47, 32, -17, -18, -23, 24, 23, 22, -47, -44, 27, 14}, 
        {37, -44, -33, -18, -47, 24, -17, -46, -43, -32, 15, -46, -27, -8, -25, 46}, 
        {41, -40, 31, -30, 13, -24, -29, 22, -15, -16, 47, 2, -39, 4, -25, -42}, 
        {-3, 12, 7, 14, -7, 8, -37, -34, -7, -12, 39, -38, 1, 44, 27, -34}, 
        {-47, 4, 7, -2, -43, -32, 27, 2, -43, -8, -33, 14, 49, -48, -5, 30}, 
        {-15, 8, -33, -26, -23, -32, -25, 22, 13, -20, -9, 26, 29, 4, -1, 2}, 
    };
    Solution s;
    auto res = s.matrixRankTransform(matrix);
    print(res);
    return 0;
}
