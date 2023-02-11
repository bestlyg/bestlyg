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
vector<vector<int>> dirs = { {0, 1}, {0, -1}, {1, 0}, {-1, 0} };
// START

class Solution {
public:
    int dieSimulator(int n, vector<int>& rollMax) {
        int mod = 1e9 + 7;
        vector<vector<vector<int>>> dp(n + 1, vector<vector<int>>(6, vector<int>(16, 0)));
        for (int j = 0; j < 6; j++) dp[1][j][1] = 1;
        // 第i次投骰子
        for (int i = 1; i <= n; i++) {
            // 骰子点数是j
            for (int j = 0; j < 6; j++) {
                // 对于每个点数已经消耗了k次连续投掷次数
                for (int k = 0; k < rollMax[j]; k++) {
                    // 当前次投了p点
                    for (int p = 0; p < 6; p++) {
                        if (p != j) dp[i][p][1] = (dp[i][p][1] + dp[i - 1][j][k]) % mod;
                        else if (k < rollMax[j] - 1) dp[i][p][k + 1] = (dp[i][p][k + 1] + dp[i - 1][j][k]) % mod;
                    }
                }
            }
        }
        int res = 0;
        for (int i = 0; i < 6; i++) {
            for (int j = 1; j <= rollMax[i]; j++) {
                res = (res + dp[n][i][j]) % mod;
            }
        }
        return res;
    }
};

// END
#ifdef LOCAL
int main() {
    Solution s;
    auto res = s.print();
    return 0;
}
#endif

