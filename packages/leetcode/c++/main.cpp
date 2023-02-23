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
// priority_queue<node, vector<node>, decltype(cmp)> q(cmp);
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
class Solution {
public:
    vector<int> circularPermutation(int n, int start) {
        vector<int> ans(pow(2, n));
        ans[0] = start;
        unordered_set<int> used;
        used.insert(start);
        dfs(ans, used, n, start, 1);
        return ans;
    }
    bool dfs(vector<int> &ans, unordered_set<int> &used, int n, int prev, int idx) {
        if (idx == pow(2, n)) {
            return compare(n, ans[0], ans[idx - 1]);
        }
        for (int i = 0; i < n; i++) {
            int v = prev & (1 << i), next = prev;
            if (v) next &= ~(1 << i);
            else next |= (1 << i); 
            if (used.count(next)) continue;
            used.insert(next);
            ans[idx] = next;
            if (dfs(ans, used, n, next, idx + 1)) return true;
            used.erase(next);
        }
        return false;
    }
    bool compare(int n, int num1, int num2) {
        int cnt = 0;
        for (int i = 0; i < n; i++) {
            int v1 = num1 & (1 << i), v2 = num2 & (1 << i);
            if (v1 != v2) cnt++;
        }
        return cnt == 1;
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