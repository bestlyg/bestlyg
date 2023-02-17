#include <vector>
#include <iostream>
#include <algorithm>
#include <numeric>
#include <cstdio>
#include <unordered_set>
#include <unordered_map>
#include <queue>

// bestlyg
# define X first
# define Y second
# define lb(x) ((x) & (-x))
# define mem(a,b) memset(a,b,sizeof(a))
# define debug freopen("input","r",stdin)
// # define pii pair<int,int>

#ifdef DEBUG
#define log(frm, args...) {\
    printf(frm, ##args);\
}
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
// auto cmp = [&](node x, node y) -> bool { return x.second < y.second; };
// priority_queue<node, vector<node>, declty   pe(cmp)> q(cmp);
#endif

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
// vector<vector<int>> dirs = { {0, 1}, {0, -1}, {1, 0}, {-1, 0} };
// START


#define MAX 105

class Solution {
public:
    int largest1BorderedSquare(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size();
        // 0: l, 1: r, 2 : t, 3: b
        int cache[MAX][MAX][4] = {0}, cnt;
        for (int i = 0; i < n; i++) {
            cnt = 0;
            for (int j = 0; j < m; j++) {
                cache[i][j][0] = cnt;
                cnt = grid[i][j] == 1 ? cnt + 1 : 0;
            }
            cnt = 0;
            for (int j = n - 1; j >= 0; j--) {
                cache[i][j][1] = cnt;
                cnt = grid[i][j] == 1 ? cnt + 1 : 0;
            }
        }
        for (int j = 0; j < m; j++) {
            cnt = 0;
            for (int i = 0; i < n; i++) {
                cache[i][j][2] = cnt;
                cnt = grid[i][j] == 1 ? cnt + 1 : 0;
            }
            cnt = 0;
            for (int i = n - 1; i >= 0; i--) {
                cache[i][j][3] = cnt;
                cnt = grid[i][j] == 1 ? cnt + 1 : 0;
            }
        }

        for (int i = 0; i < n; i++) {
             for (int j = 0; j < m; j++) {
                printf("(%d, %d, %d, %d), ", cache[i][j][0],cache[i][j][1],cache[i][j][2],cache[i][j][3]);
             }
             cout << endl;
        }
        cnt = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (grid[i][j] == 0) continue;
                cout << "i = " << i << ", j = " << j << endl;
                cnt = max(cnt, 1);
                for (int k = 1; k <= min(cache[i][j][1], cache[i][j][3]); k++) {
                    if (cache[i + k][j][2] >= k && cache[i][j + k][3] >= k) cnt = max(cnt, (int)pow(k + 1, 2));
                }
            }
        }

        return cnt;
    }
};

// END
#ifdef LOCAL
int main() {
    Solution s;
    auto res = s.alphabetBoardPath("leet");
    return 0;
}
#endif