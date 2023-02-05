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
# define pii pair<int,int>

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
vector<vector<int>> dirs = { {0, 1}, {0, -1}, {1, 0}, {-1, 0} };
// START

class Solution {
public:
    int minCapability(vector<int>& nums, int k) {
        int l = 0, r = 0;
        for (auto &num : nums) r = max(r, num);
        while (l < r) {
            int m = (l + r + 1) / 2;
            if (bs(nums, m) > k) r = m - 1;
            else l = m;
        }
        return l;
    }
    int bs(vector<int> &nums, int num) {
        vector<int> dp(nums.size(), 0);
        dp[0] = nums[0] <= num;
        dp[1] = nums[1] <= num;
        for (int i = 2; i < nums.size(); i++) {
            dp[i] = dp[i - 1];
            if (nums[i] >= num) {
                dp[i] = max(dp[i], dp[i - 2] + 1);
            }
        }
        return dp[nums.size() - 1];
    }
};

class Solution {
public:
    long long minCost(vector<int>& basket1, vector<int>& basket2) {
        map<int, int> m1, m2;
        for (auto &num : basket1) m1[num]++;
        for (auto &num : basket2) m2[num]++;
        for (auto &item : m1) {
            if (m2[item.first]) {
                int num = min(m1[item.first], m2[item.first]);
                m1[item.first] -= num;
                m2[item.first] -= num;
                if (m1[item.first] == 0) m1.erase(item.first);
                if (m2[item.first] == 0) m2.erase(item.first);
            }
        }
        
        return -1;
    }
    void change(map<int, int> &m1, map<int, int> &m2, int num1, int num2) {

    }
};

// END
#ifdef LOCAL
int main() {
    Solution s;
    auto res = s.print();
    return 0;
}
#endif

