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
// START
class Solution {
public:
    int minimizeMax(vector<int>& nums, int p) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        auto check = [&](int target) -> bool {
            int cnt = 0;
            for(int i = 0, j = 0; i < n; i++){
                while(j < n && nums[j] - nums[i] <= target) j++;
                cnt += j - i - 1;
                if(cnt >= p) return true;
            }
            return false;
        };
        int l = 0, r = 1e9 + 7;
        while(l < r){
            int mid = (l + r) / 2;
            if(check(mid)) r = mid;
            else l = mid + 1;
        }
        return l;
    }
};
/*
unordered_map<int, unordered_map<int, int>> m;
int dfs(string &sn, int idx, int mask, bool limit, bool empty) {
    if (idx == sn.size()) return empty ? 0 : 1;
    if (!limit && !empty && m[idx].count(mask)) return m[idx][mask];
    int res = 0;
    if (empty) res += dfs(sn, idx + 1, mask, false, true);
    for (int j = empty ? 1 : 0, nmax = limit ? sn[idx] - '0' : 9; j <= nmax; j++)
        if ((mask & (1 << j)) == 0) res += dfs(sn, idx + 1, mask | (1 << j), limit && j == nmax, false);
    return m[idx][mask] = res;
};
*/


#define pii pair<int, int>
#define X first
#define Y second
struct Node {
    int idx, price;
    vector<int> next;
};
struct QNode {
    int i, sum;
    vector<int> list;
};
class Solution {
public:
    int minimumTotalPrice(int n, vector<vector<int>>& edges, vector<int>& price, vector<vector<int>>& trips) {
        // cout << "====" << endl;
        vector<Node> list(n);
        for (int i = 0; i < n; i++) {
            list[i].idx = i;
            list[i].price = price[i];
        }
        for (auto &edge : edges) {
            list[edge[0]].next.push_back(edge[1]);
            list[edge[1]].next.push_back(edge[0]);
        }
        vector<vector<QNode>> roads(n, vector<QNode>(n));
        for (int i = 0; i < n; i++) {
            roads[i][i] = QNode{ i, list[i].price, vector<int>(1, i)};
            queue<QNode> q;
            q.push(QNode{ i, list[i].price, vector<int>(1, i)});
            unordered_set<int> used;
            used.insert(i);
            while (q.size()) {
                auto cur = q.front();
                q.pop();
                for (auto &next : list[cur.i].next) {
                    if (used.count(next)) continue;
                    used.insert(next);
                    auto nextNode = cur;
                    nextNode.i = next;
                    nextNode.sum += list[next].price;
                    nextNode.list.push_back(next);
                    roads[i][next] = nextNode;
                    q.push(nextNode);
                }
            }
        }
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                cout << "i = " << i << ", j = " << j << ", sum = " << roads[i][j].sum << ", list = ";
                for (auto &item : roads[i][j].list) cout << item << ", ";
                cout << endl;
            }
        }
        
        int sums = 0, res = 0x7fffffff;
        vector<int> weights(n, 0);
        for (auto &trip : trips) {
            sums += roads[trip[0]][trip[1]].sum;
            for (auto &item : roads[trip[0]][trip[1]].list) {
                weights[item]++;
            }
            // for (int i = 0; i < n; i++) {
            // cout << "i = " << i << ", w = " << weights[i] << ", ";
            // }
            // cout << endl;
        }
        

        unordered_set<int> used;
        function<pii(int)> discount = [&](int start) -> pii {
            pii res = make_pair(list[start].price / 2 * weights[start], 0);
            for (auto &next : list[start].next) {
                if (used.count(next)) continue;
                used.insert(next);
                auto nextRes = discount(next);
                res.X += nextRes.Y;
                res.Y += max(nextRes.X, nextRes.Y);
                used.erase(next);
            }
            return res;
        };
        // cout << "sum = " << sums << endl;
        for (int i = 7; i < 8; i++) {
            used.insert(i);
            auto disres = discount(i);
            // cout << "i = " << i << ", X = " << disres.X << ", y = " << disres.Y << endl;
            res = min(res, sums - max(disres.X, disres.Y));
            used.erase(i);
        }
        return res;
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