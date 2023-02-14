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

class Solution {
public:
    int longestWPI(vector<int>& hours) {
        int n = hours.size(), ans = 0;
        for (auto &h : hours) h = h > 8 ? 1 : -1;
        vector<int> sums(1, 0);
        for (auto &h : hours) sums.push_back(sums.back() + h);

        cout << "sums: ";
        for (auto &v : sums) cout << v << ", ";
        cout << endl;

        int prev = 0;
        for (int i = 1; i <= n; i++) {
            cout << "i = " << i << ", ans = " << ans << ", prev = " << prev << ", val = " << i - prev << endl;
            if (sums[i] - prev > 0)
            ans = max(ans, i - prev);
            if (sums[i] < sums[prev]) prev = i;
        }
        return ans;
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