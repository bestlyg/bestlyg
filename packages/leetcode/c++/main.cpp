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


#define MAX 105

class Solution {
public:
    int largest1BorderedSquare(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size();
        // 0: l, 1: r, 2 : t, 3: b
        int cache[MAX][MAX][4] = {0}, cnt;
        for (int i = 0; i < n; i++) {
            cnt = 0;
            for (int j = 0; j < m; j++) {
                cache[i][j][0] = cnt;
                cnt = grid[i][j] == 1 ? cnt + 1 : 0;
            }
            cnt = 0;
            for (int j = n - 1; j >= 0; j--) {
                cache[i][j][1] = cnt;
                cnt = grid[i][j] == 1 ? cnt + 1 : 0;
            }
        }
        for (int j = 0; j < m; j++) {
            cnt = 0;
            for (int i = 0; i < n; i++) {
                cache[i][j][2] = cnt;
                cnt = grid[i][j] == 1 ? cnt + 1 : 0;
            }
            cnt = 0;
            for (int i = n - 1; i >= 0; i--) {
                cache[i][j][3] = cnt;
                cnt = grid[i][j] == 1 ? cnt + 1 : 0;
            }
        }

        for (int i = 0; i < n; i++) {
             for (int j = 0; j < m; j++) {
                printf("(%d, %d, %d, %d), ", cache[i][j][0],cache[i][j][1],cache[i][j][2],cache[i][j][3]);
             }
             cout << endl;
        }
        cnt = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (grid[i][j] == 0) continue;
                cout << "i = " << i << ", j = " << j << endl;
                cnt = max(cnt, 1);
                for (int k = 1; k <= min(cache[i][j][1], cache[i][j][3]); k++) {
                    if (cache[i + k][j][2] >= k && cache[i][j + k][3] >= k) cnt = max(cnt, (int)pow(k + 1, 2));
                }
            }
        }

        return cnt;
=======
class Solution {
public:
    int squareFreeSubsets(vector<int>& nums) {
        unordered_map<int, int> cm;
        map<int, int> m;
        for (auto &num : nums) m[num]++;
        vector<int> numlist;
        for (auto &item : m) numlist.push_back(item.first);
        int ans = 0, cnt = 0;
        for (auto &item : m) {
            if (canMod(item.first)) continue;

            const s = toSet(item.first);

            int cnt = 0;
            for (auto &num : numlist) {
                if (!s.count(num)) cnt++;
            }

            ans += count(cnt) * item.second;
            ans += 1;

            for (auto &citem : cm) {
                ans += count(cnt + 1) * item.second;
                ans += count(cnt + citem.second) * item.second;
            }

            cnt++;
            cm[item.first] = s.size() - cnt;
            cout << "ans = " << ans << ", cnt = " << cnt << endl;
        }
        return ans;
    }
    bool canMod(int num) {
        if (num == 1) return false;
        int v = sqrt(num);
        if (v * v == num) return true;
        for (int i = 2; i <= num; i++) {
            if (num % i == 0) {
                num /= i;
                if (num % i == 0) return true;
            }
        }
        return false;
    }
    unordered_set<int> toSet(int num) {
        unordered_set<int> list;
        for (int i = 2; i <= num; i++) {
            if (num % i == 0) list.insert(i), num /= i;
        }
        return list;
    }
    int count(int cnt) {
        int res = cnt, prev = 1, next = 2;
        for (int i = cnt; i > 1; i--) {
            res += prev;
            prev += next++;
        }
        return res;
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


/*
11 
11 2
11 19
11 7
2
2 19
2 7
19 
19 7
7
11 2 19


[11,2,19,7,9,27]
输出：
10
预期：
15

[26,6,4,27,6,18]
输出：
10
预期：
3

[26,6,4,27,6,18]
[3,5,6,2]
[11,2,19,7,9,27]
[1]
[3,4,4,5]



输入：
[8,11,17,2,29,21,20,22]
输出：
45
预期：
39

2 11 17 21 22 29


class Solution {
public:
    int squareFreeSubsets(vector<int>& nums) {
        // 质数表
        const int MAXK = 10;
        int prime[10] = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29};

        // 检查 x 是否为平方数
        auto check = [&](int x) {
            for (int i = 0; i < MAXK; i++) if (x % (prime[i] * prime[i]) == 0) return true;
            return false;
        };

        const int MOD = 1e9 + 7;
        int n = nums.size();
        long long f[n + 1][1 << MAXK];
        memset(f, 0, sizeof(f));
        f[0][0] = 1;
        for (int i = 1; i <= n; i++) {
            // 不把第 i 个数加入子集的方案数
            for (int j = 0; j < (1 << MAXK); j++) f[i][j] = f[i - 1][j];
            int x = nums[i - 1];
            // 如果 x 是平方数，那么肯定不能把它加入子集，直接看下一个数
            if (check(x)) continue;
            // 计算第 i 个数的质因数分解
            int msk = 0;
            for (int j = 0; j < MAXK; j++) if (x % prime[j] == 0) msk |= 1 << j;
            // 把第 i 个数加入子集的方案数
            for (int j = 0; j < (1 << MAXK); j++) if ((j & msk) == 0) f[i][j | msk] = (f[i][j | msk] + f[i - 1][j]) % MOD;
        }

        long long ans = 0;
        for (int j = 0; j < (1 << MAXK); j++) ans = (ans + f[n][j]) % MOD;
        // 注意题目求的是非空子集，因此要扣掉空集合
        ans = (ans - 1 + MOD) % MOD;
        return ans;
    }
};

作者：tsreaper
链接：https://leetcode.cn/problems/count-the-number-of-square-free-subsets/solution/zhuang-ya-dp-by-tsreaper-dwts/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

*/


