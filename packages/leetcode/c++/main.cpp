// #ifdef LOCAL
#include <vector>
#include <iostream>
#include <algorithm>
#include <numeric>
#include <cstdio>
#include <unordered_set>
#include <unordered_map>
#include <queue>
// #endif

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
void binary(unsigned n, int lastbit = 31) {
    unsigned i;
    for (i = 1 << lastbit; i > 0; i >>= 1)
        printf("%u", !!(n & i));
}
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

const int MAXN = 1e5 + 5;
class Solution {
public:

    int n;
    vector<int> G[MAXN];
    int coins[MAXN];
    int dp[MAXN][2];

    void dfs(int u, int p) {
        int sz = G[u].size();
        for (int i = 0; i < sz; i++) {
            int v = G[u][i];
            if (v == p) continue;
            dfs(v, u);
            dp[u][1] += dp[v][0];
            dp[u][0] += max(dp[v][0], dp[v][1]);
        }
        dp[u][1] += coins[u];
    }

    int collectTheCoins(vector<int>& coins, vector<vector<int>>& edges) {
        n = coins.size();
        for (int i = 0; i < n - 1; i++) {
            int u = edges[i][0], v = edges[i][1];
            G[u + 1].push_back(v + 1);
            G[v + 1].push_back(u + 1);
        }
        dfs(1, 0);
        return max(dp[1][0], dp[1][1]);
    }
};




// END
#ifdef LOCAL
int main() {
    auto cmp = [&](pii x, pii y) -> bool { return x.second < y.second; };
    priority_queue<pii, vector<pii>, decltype(cmp)> q(cmp);
    // Solution s;
    // auto res = s.alphabetBoardPath("leet");
    log("%d\n",1);
    return 0;
}
#endif