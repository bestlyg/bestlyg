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

class DinnerPlates {
public:
    int capacity, last;
    vector<vector<int>> ss;
    unordered_set<int> used;
    priority_queue<int, vector<int>, greater<int>> q;

    DinnerPlates(int capacity): capacity(capacity), last(0) {
        ss.push_back(vector<int>());
    }

    int get_last() {
        if (ss[last].size() == capacity) last++;
        if (last == ss.size()) ss.push_back(vector<int>());
        return last;
    }
    
    void push(int val) {
        while (q.size() && q.top() > last) q.pop();
        if (q.empty()) {
            ss[get_last()].push_back(val);
        } else {
            int idx = q.top();
            ss[idx].push_back(val);
            if (ss[idx].size() == capacity) q.pop(), used.erase(idx);
        }
    }
    
    int pop() {
        while (last > 0 && ss[last].size() == 0) last--;
        if (last == 0 && ss[last].size() == 0) return -1;
        int back = ss[last].back();
        ss[last].pop_back();
        return back;
    }
    
    int popAtStack(int index) {
        if (index > last || ss[index].size() == 0) return -1;
        int back = ss[index].back();
        ss[index].pop_back();
        if (!used.count(index)) q.push(index), used.insert(index);
        return back;
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