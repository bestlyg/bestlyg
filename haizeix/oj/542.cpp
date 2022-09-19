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

#define MAX 205
struct node {
    int x, y, z, r;
};
int dirs[2] = {1, -1};
int data[MAX];
int check[MAX];
queue<node> q;

double dist(node n1, node n2) {
    return sqrt(pow(n1.x - n2.x, 2) + pow(n1.y - n2.y, 2) +
                pow(n1.z - n2.z, 2));
}

int main() {
    memset(data, 0, sizeof(char) * MAX);
    int t;
    cin >> t;
    while (t--) {
        while (q.size()) q.pop();
        int n, h, r, x, y, z;
        cin >> n >> h >> r;
        node list[n];
        int check[n];
        for (int i = 0; i < n; i++) {
            cin >> x >> y >> z;
            node v = (node){x, y, z, r};
            list[i] = v;
            if (z <= r) q.push(v);
            check[i] = z <= r;
        }
        int ans = 0;
        while (q.size()) {
            node v = q.front();
            if (h - v.z <= r) {
                ans = 1;
                break;
            }
            q.pop();
            for (int i = 0; i < n; i++) {
                if (check[i] || dist(v, list[i]) > 2.0 * r) continue;
                check[i] = 1;
                q.push(list[i]);
            }
        }
        cout << (ans ? "Yes" : "No") << endl;
    }
    return 0;
}
