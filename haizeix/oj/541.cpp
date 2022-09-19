#include <algorithm>
#include <climits>
#include <cmath>
#include <cstring>
#include <functional>
#include <iostream>
#include <map>
#include <queue>
#include <set>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <vector>

using namespace std;

struct node {
    int m1, m2, step1, step2;
};
struct person {
    int step, val;
};
vector<vector<node>> vec(20, vector<node>());
queue<person> q;
unordered_set<int> s;
int n, m, a, b, c, d, step = 0;
int main() {
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        cin >> a >> b >> c >> d;
        vec[a].push_back((node){a, b, c, d});
    }
    // for (int i = 0; i < 20; i++) {
    //     if (vec[i].size() == 0) continue;
    //     cout << "============" << endl << "start = " << vec[i][0].m1 << endl;
    //     for (int j = 0; j < vec[i].size(); j++) {
    //         cout << "to " << vec[i][j].m2 << ", step1 = " << vec[i][j].step1
    //              << ", step2 = " << vec[i][j].step2 << endl;
    //     }
    // }
    q.push((person){0, 1});
    while (q.size()) {
        person v = q.front();
        q.pop();
        if (v.val == n) {
            s.insert(v.step);
            continue;
        }
        for (int i = 0; i < vec[v.val].size(); i++) {
            node data = vec[v.val][i];
            q.push((person){v.step + data.step1, data.m2});
        }
    }
    // cout << s.size() << endl;
    // for (auto it = s.begin(); it != s.end(); it++) {
    //     cout << *it << ',';
    // }
    // cout << endl;
    int ans = INT_MAX;
    q.push((person){0, 1});
    while (q.size()) {
        person v = q.front();
        q.pop();
        if (v.val == n) {
            if (s.count(v.step)) {
                ans = min(ans, v.step);
            }
            continue;
        }
        for (int i = 0; i < vec[v.val].size(); i++) {
            node data = vec[v.val][i];
            q.push((person){v.step + data.step2, data.m2});
        }
    }
    if (ans == INT_MAX)
        cout << "IMPOSSIBLE" << endl;
    else
        cout << ans << endl;
    return 0;
}
