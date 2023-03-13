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

struct Node {
    int time;
    unordered_set<int> task;
    Node() {}
    Node(int time): time(time) {}
};
class Solution {
public:
    int findMinimumTime(vector<vector<int>>& tasks) {
        // cout <<  "findMinimumTime" << endl;
        Node list[2005];
        for (int i = 0; i < 2005; i++) list[i] = Node(i);
        for (int i = 0; i < tasks.size(); i++) {
            auto &task = tasks[i];
            for (int j = task[0]; j <= task[1]; j++) list[j].task.insert(i);
        }
        int left = 0, right = 2005;
        sort(list + left, list + right, [&](auto &a, auto &b){
            return a.task.size() < b.task.size();
        });
        while (left < right && list[left].task.size() == 0) left++;

        int res = 0;
        while (left < right) {
            // cout << "list.size = " << list.size() << endl;
            // cout << "Time : ";
            // for (auto &node : list) {            
            //     if (node.task.size() == 0) continue;
            //     cout << "(time: " << node.time << ", task: ";
            //     for (auto &task : node.task) cout << task << ", ";
            //     cout << ")" << endl;
            // }
            
            Node cur = list[right - 1];
            // cout << "Cur = " << cur.time << "- ";
            // for (auto &task : cur.task) cout << task << ", ";
            // cout << endl;
            right--;
            res++;
            vector<int> clearTasks;
            for (auto &task : cur.task) {
                // cout << "==" << endl;
                if (--tasks[task][2] == 0) {
                    clearTasks.push_back(task);
                }
            }
            for (int i = left; i < right; i++) {
                for (auto &task : clearTasks) {
                    list[i].task.erase(task);
                }
            }

            sort(list + left, list + right, [&](auto &a, auto &b){
                return a.task.size() < b.task.size();
            });

            while (left < right && list[left].task.size() == 0) left++;
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