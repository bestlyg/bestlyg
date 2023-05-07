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
    int maxTotalFruits(vector<vector<int>>& fruits, int startPos, int k) {
        int res = 0;
        vector<vector<int>> l, r;
        r.push_back(vector<int>{ -1, 0});
        for (auto &item : fruits) {
            item[0] -= startPos;
            if (item[0] < 0) {
                item[0] = -item[0];
                l.push_back(item);
            } else if (item[0] > 0) {
                r.push_back(item);
            } else {
                res += item[1];
            }
        }
        l.push_back(vector<int>{ -1, 0});
        reverse(l.begin(), l.end());
        l.push_back(vector<int>{ INT_MAX, 0});
        r.push_back(vector<int>{ INT_MAX, 0});
        vector<int> sumL(1, 0), sumR(1, 0);
        for (auto &item : l) sumL.push_back(sumL.back() + item[1]);
        for (auto &item : r) sumR.push_back(sumR.back() + item[1]);
        cout << "L : ";
        for (auto &item : l) {
            cout << "(" << item[0] << ", " << item[1] << "), ";
        }
        cout << endl;
        cout << "SumL: ";
        for (auto &num : sumL) cout << num << ", ";
        cout << endl;
        cout << "R : ";
        for (auto &item : r) {
            cout << "(" << item[0] << ", " << item[1] << "), ";
        }
        cout << endl;
        cout << "SumR: ";
        for (auto &num : sumR) cout << num << ", ";
        cout << endl;

        cout << endl;
        int f1 = f(l, sumL, r, sumR, k);
        cout << "f1 = " << f1 << endl;

        int f2 = f(r, sumR, l, sumL, k);
        cout << "f2 = " << f2 << endl;
        return res;
    }
    int f(vector<vector<int>> &left, vector<int> &sumL, vector<vector<int>> &right, vector<int> &sumR, int k) {
        int res = sumR[bs(right, k)] - sumR[0];
        for (int i = 0; i < left.size() && left[i][0] <= k; i++) {
            int val = sumL[i + 1] - sumL[0];
            val += sumR[bs(right, k - left[i][0] * 2)] - sumR[0];
            res = max(res, val);
        }
        return res;
    }
    int bs(vector<vector<int>> &list, int target) {
        if (target <= 0) return 0;
        int l = 0, r = list.size();
        while (l < r) {
            int m = (l + r) / 2;
            if (list[m][0] > target) r = m;
            else l = m + 1;
        }
        return l;
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

class Solution {
public:
    int minIncrements(int n, vector<int>& cost) {
        int level = log2(n + 1), res = 0;
        function<int(int, int)> dfs = [&](int root, int l) -> int {
            if (l == level) return cost[root];
            int left = dfs(root * 2 + 1, l + 1), right = dfs(root * 2 + 2, l + 1);
            if (left == right) return left + cost[root];
            res += abs(right - left);
            return max(left, right) + cost[root];
        };
        dfs(0, 1);
        return res;
    }
};
