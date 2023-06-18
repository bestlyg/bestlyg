// #ifdef LOCAL
#include <algorithm>
#include <cstdio>
#include <iostream>
#include <numeric>
#include <queue>
#include <unordered_map>
#include <map>
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

class Solution {
public:
    int paintWalls(vector<int>& cost, vector<int>& time) {
        int n = cost.size();

        vector<map<int, int>> dp(n + 1);
        dp[0][0] = 0;
        for (int i = 1; i <= n; i++) {
            int cur_cost = cost[i - 1], cur_time = time[i - 1];
            for (auto &item : dp[i - 1]) {
                if (item.second > 0) {
                    dp[i][item.first] = max(dp[i][item.first], item.second - 1);
                } else {
                    dp[i][item.first + cur_cost] = min(dp[i][item.first + cur_cost], cur_time);
                }
            }
        }
        return dp[n].begin()->first;
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

[8,7,5,15]
[1,1,2,1]
输出：
5
预期：
12

[49,35,32,20,30,12,42]
[1,1,2,2,1,1,2]
输出：
64
预期：
62

[97,15,44,90,50,48,44,40,46,21]
[1,1,2,2,2,3,2,3,2,2]
输出：
105
预期：
103

[8,7,5,15]
[1,1,2,1]
[49,35,32,20,30,12,42]
[1,1,2,2,1,1,2]
[1,2,3,2]
[1,2,3,2]
[2,3,4,2]
[1,1,1,1]
[1075,964,1089,226,102,1329,235,579,1059,871,1137,1071,973,558,540,818,1257,663,526,1067,26,598,1160,1122,1222,676,505,767,1199,157,86,342,1277,918,304,1036,697]
[5,6,3,1,4,3,4,5,2,2,3,2,4,6,6,4,5,5,2,2,1,1,2,4,6,6,2,4,3,3,4,2,3,4,6,1,5]
[1251,218,566,134,299,1160,1359,899,356,29,313,640,206,617,211,949,1365,796,596,935,475,1034,1105,1026,769,426,236,409,577,216,1350,1229,317,786,419,799,678]
[3,3,3,5,1,5,1,1,4,5,6,6,5,6,5,6,3,3,5,5,6,5,1,6,5,5,4,1,2,2,3,4,1,6,1,2,1]

class Solution {
public:
    int paintWalls(vector<int>& cost, vector<int>& time) {
        int n = cost.size();

        vector<int> idxs;
        for (int i = 0; i < n; i++) idxs.push_back(i);
        sort(idxs.begin(), idxs.end(), [&](auto &i1, auto &i2) {
            int cost1 = cost[i1], cnt1 = time[i1] + 1;
            int cost2 = cost[i2], cnt2 = time[i2] + 1;
            return 1.0 * cost1 / cnt1 < 1.0 * cost2 / cnt2;
        });

        // for (auto &i : idxs) {
        //     cout << "i = " << i << ", cost = " << cost[i] 
        //          << ", t = " << time[i]
        //          << ", r = " << 1.0 * cost[i] / (time[i] + 1)
        //          << endl;
        // }
        
        function<int(int, int, int)> dfs = [&](int prev, int cur, int cnt) {
            // cout << "prev = " << prev << ", cur = " << cur << ", cnt = " << cnt << endl;
            if (cnt >= n) return cur;
            int res = INT_MAX;
            for (int i = prev + 1; i < n; i++) {
                res = min(res, dfs(i, cur + cost[idxs[i]], cnt + 1 + time[idxs[i]]));
            }
            return res;
        };

        return dfs(-1, 0, 0);
    }
};


[1075,964,1089,226,102,1329,235,579,1059,871,1137,1071,973,558,540,818,1257,663,526,1067,26,598,1160,1122,1222,676,505,767,1199,157,86,342,1277,918,304,1036,697]
[5,6,3,1,4,3,4,5,2,2,3,2,4,6,6,4,5,5,2,2,1,1,2,4,6,6,2,4,3,3,4,2,3,4,6,1,5]
[1251,218,566,134,299,1160,1359,899,356,29,313,640,206,617,211,949,1365,796,596,935,475,1034,1105,1026,769,426,236,409,577,216,1350,1229,317,786,419,799,678]
[3,3,3,5,1,5,1,1,4,5,6,6,5,6,5,6,3,3,5,5,6,5,1,6,5,5,4,1,2,2,3,4,1,6,1,2,1]
[607,77,1307,214,948,727,1029,397,298,1196,681,1097,281,1543,264,866,544,582,474,877,1353,604,158,1144,666,816,373,320,755,1478,1453,512,1128,1037,1587,1450,961,509,354,523,1548]
[1,5,3,4,1,6,6,5,3,1,6,4,5,2,1,6,3,5,5,2,6,5,5,6,1,3,4,6,5,4,6,2,4,6,2,1,4,4,2,2,6]
*/