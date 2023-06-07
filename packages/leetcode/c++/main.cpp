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
#define pii pair<int, int>
#define lb(x) ((x) & (-x))
#define mem(a, b) memset(a, b, sizeof(a))
#define debug freopen("input", "r", stdin)
#define SORT(list, fn) sort(list.begin(), list.end(), [&](auto &v1, auto &v2){ fn });

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

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

// string bin = bitset<10>(n).to_string();
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
vector<vector<int>> dirs2 = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}, {1, 1}, {1, -1}, {-1, 1}, {-1, -1}};
ll gcd(ll a, ll b) {
    if (a < b) return gcd(b, a);
    if (b == 0) return a;
    return gcd(b, a % b);
}
ll phi(ll n) {
    ll i = 2, x = n;
    while (i * i <= n) {
        if (x % i == 0) n -= n / i;
        while (x % i == 0) x /= i;
        i += 1;
    }
    if (x != 1) n -= n / x;
    return n;
}
ll quick_mul(ll a, ll b, ll mod) {
    ll ans = 0, temp = a;
    while (b) {
        if (b & 1) ans = (ans + temp) % mod;
        temp = (temp + temp) % mod;
        b >>= 1;
    }
    return ans;
}
ll quick_pow(ll a, ll b, ll mod) {
    ll ans = 1, temp = a;
    while (b) {
        if (b & 1) ans = quick_mul(ans, temp, mod) % mod;
        temp = quick_mul(temp, temp, mod) % mod;
        b >>= 1;
    }
    return ans;
}
set<ll> get_factors(ll num) {
    set<ll> s;
    ll i = 1;
    for (; i * i <= num; i++) {
        if (num % i == 0) {
            s.insert(i);
            s.insert(num / i);
        }
    }
    return s;
}
vector<int> get_sums(vector<int> &arr) {
    vector<int> sums(1, 0);
    for (auto &num : arr) sums.push_back(sums.back() + num);
    return sums;
}
// START


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


*/