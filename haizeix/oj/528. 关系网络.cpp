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
    int step, val;
};
int n, x, y, data[105][105], check[105] = {0}, size = 1, step = 0;
queue<node> q;
int main() {
    cin >> n >> x >> y;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            cin >> data[i][j];
        }
    }
    q.push((node){0, x});
    check[x] = 1;
    while (q.size()) {
        node item = q.front();
        if (item.val == y) {
            cout << item.step - 1 << endl;
            return 0;
        }
        q.pop();
        for (int i = 1; i <= n; i++) {
            if (check[i] || data[item.val][i] == 0) continue;
            q.push((node){step + 1, i});
        }
        if (--size == 0) {
            size = q.size();
            step++;
        }
    }
    cout << 0 << endl;
    return 0;
}
