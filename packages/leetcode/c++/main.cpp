// #ifdef LOCAL
#include <algorithm>
#include <cstdio>
#include <iostream>
#include <numeric>
#include <queue>
#include <unordered_map>
#include <unordered_set>
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
// START

class Solution {
   public:
    vector<int> minReverseOperations(int n, int p, vector<int> &banned, int k) {
        vector<int> res(n, -1);
        res[p] = 0;
        if (k == 0 || k == 1) return res;
        vector<bool> used(n, false), banlist(n, false);
        used[p] = true;
        for (auto &i : banned) {
            banlist[i] = true;
        }
        queue<int> q;
        int size = 1, cnt = 1;
        q.push(p);
        while (q.size()) {
            int p = q.front();
            q.pop();
            for (int i = p; i + 1 - k <= p && i < n; i++) {
                if (i + 1 - k < 0) continue;
                int start = i + 1 - k, end = i,
                    revp = (end - start + 1) - 1 - (p - start) + start;
                if (banlist[revp] || used[revp]) continue;
                used[revp] = true;
                q.push(revp);
                res[revp] = cnt;
            }
            if (--size == 0) {
                cnt++;
                size = q.size();
            }
        }
        return res;
    }
};

// END
#ifdef LOCAL
int main() {
    auto cmp = [&](pii x, pii y) -> bool { return x.second < y.second; };
    priority_queue<pii, vector<pii>, decltype(cmp)> q(cmp);
    // Solution s;
    // auto res = s.alphabetBoardPath("leet");
    log("%d\n", 1);
    return 0;
}
#endif