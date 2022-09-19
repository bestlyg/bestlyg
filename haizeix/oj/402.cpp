#include <algorithm>
#include <climits>
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
    int floor, step;
};
int dirs[2] = {1, -1};
int data[MAX];
int check[MAX];
queue<node> q;

int main() {
    memset(data, 0, sizeof(char) * MAX);
    memset(check, 0, sizeof(int) * MAX);
    int n, a, b;
    cin >> n >> a >> b;
    if (a == b) {
        cout << 0 << endl;
        return 0;
    }
    for (int i = 1; i <= n; i++) {
        cin >> data[i];
    }
    q.push((node){a, 0});
    check[a] = 1;
    while (q.size()) {
        node v = q.front();
        // printf("floor = %d, step = %d\n", v.floor, v.step);
        q.pop();
        for (int i = 0; i < 2; i++) {
            int nfloor = v.floor + data[v.floor] * dirs[i];
            // printf("nfloor = %d\n", nfloor);
            if (nfloor < 1 || nfloor > n || check[nfloor]) continue;
            if (nfloor == b) {
                cout << v.step + 1 << endl;
                return 0;
            }
            check[nfloor] = 1;
            q.push((node){nfloor, v.step + 1});
        }
    }
    cout << -1 << endl;
    return 0;
}
