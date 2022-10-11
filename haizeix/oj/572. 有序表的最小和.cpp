#include <algorithm>
#include <cstdio>
#include <iostream>
#include <queue>

using namespace std;

int main() {
    int n;
    scanf("%d", &n);
    vector<int> list1(n), list2(n);
    for (int i = 0; i < n; i++) scanf("%d", &list1[i]);
    for (int i = 0; i < n; i++) scanf("%d", &list2[i]);
    priority_queue<int> q;
    for (int i = 0; i < n ; i++) {
        if (q.size() == n && list1[i] + list2[0] > q.top()) break;
        for (int j = 0; j < n; j++) {
            if (q.size() == n && list1[i] + list2[j] > q.top()) break;
            if (q.size() == n) q.pop();
            q.push(list1[i] + list2[j]);
        }
    }
    vector<int> ans;
    while (q.size()) {
        ans.push_back(q.top());
        q.pop();
    }
    for (auto it = ans.rbegin(); it != ans.rend(); it++) printf("%d\n", *it);
    return 0;
}
