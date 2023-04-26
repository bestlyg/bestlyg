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

class Solution {
public:
    int makeArrayIncreasing(vector<int>& arr1, vector<int>& arr2) {
        set<int> s;
        for (auto &num : arr2) s.insert(num);
        unordered_map<int, unordered_map<int, int>> m;
        function<int(int, int)> dfs = [&](int idx, int pre) -> int {
            if (m[idx].count(pre)) return m[idx][pre];
            if (idx == - 1) return m[idx][pre] = 0;
            int res = INT_MAX;
            if (arr1[idx] < pre) res = dfs(idx - 1, arr1[idx]);
            auto find = s.lower_bound(pre);
            if (find != s.begin()) {
                int next = dfs(idx - 1, *(--find));
                if (next != INT_MAX) res = min(res, 1 + next);
            }
            return m[idx][pre] = res;
        };
        int res = dfs(arr1.size() - 1, INT_MAX);
        return res == INT_MAX ? -1 : res;
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

/*
[56,22,79,41,8,39,81,59,74,14,45,49,15,10,28,16,77,22,65,8,36,79,94,44,80,72,8,96,78]
[39,92,69,55,9,44,26,76,40,77,16,69,40,64,12,48,66,7,59,10,33,72,97,60,79,68,25,63]
输出：
72
预期：
7

4
[[0,1],[1,2],[1,3]]
[2,2,10,6]
[[0,3],[2,1],[2,3]]
2
[[0,1]]
[2,2]
[[0,0]]

9
[[2,5],[3,4],[4,1],[1,7],[6,7],[7,0],[0,5],[5,8]]
[4,4,6,4,2,4,2,14,8]
[[1,5],[2,7],[4,3],[1,8],[2,8],[4,3],[1,5],[1,4],[2,1],[6,0],[0,7],[8,6],[4,0],[7,5],[7,5],[6,0],[5,1],[1,1],[7,5],[1,7],[8,7],[2,3],[4,1],[3,5],[2,5],[3,7],[0,1],[5,8],[5,3],[5,2]]
输出：
434
预期：
429

*/