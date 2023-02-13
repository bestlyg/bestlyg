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
    int id(char c) {
        switch (c) {
            case 'Q': return 0;
            case 'W': return 1;
            case 'E': return 2;
            case 'R': return 3;
        }
        return -1;
    }
    bool isBalance(int *cnt, int target) {
        return cnt[0] <= target && cnt[1] <= target && cnt[2] <= target && cnt[3] <= target;
    }
    int balancedString(string s) {
        int n = s.size(), m = n / 4, cnt[4] = {0};
        for (auto &c : s) cnt[id(c)] += 1;
        if (isBalance(cnt, m)) return 0;
        int ans = 0x3f3f3f3f;
        for (int l = 0, r = 0; r < n; r++) {
            cnt[id(s[r])]--;
            while (l < r && isBalance(cnt, m)) {
                cnt[id(s[l])]++;
                if (isBalance(cnt, m)) l++;
                else { cnt[id(s[l])]--; break; }
            }
            if (isBalance(cnt, m)) ans = min(ans, r - l + 1);
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