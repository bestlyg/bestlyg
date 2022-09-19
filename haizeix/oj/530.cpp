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
    int row, col, step;
};
int n, m, cnt, dir = 0, step = 0, mark[1000][55][55];
int dirs[4][2] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
char data[55][55];
string str;
queue<node> q;
void getDir() {
    cin >> str;
    if (str == "NORTH")
        dir = 0;
    else if (str == "SOUTH")
        dir = 1;
    else if (str == "WEST")
        dir = 2;
    else
        dir = 3;
}
int main() {
    memset(mark, 0, sizeof(int) * 55 * 55);
    cin >> n >> m;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cin >> data[i][j];
            if (data[i][j] == '*') {
                q.push((node){i, j, 0});
                data[i][j] = '.';
            }
        }
    }
    // for (int i = 0; i < n; i++) {
    //     for (int j = 0; j < m; j++) {
    //         cout << data[i][j];
    //     }
    //     cout << endl;
    // }
    cin >> cnt;
    for (int i = 0; i < cnt; i++) {
        getDir();
        while (q.size() && q.front().step == step) {
            node v = q.front();
            q.pop();
            for (int i = 1; i <= n * m; i++) {
                int nrow = v.row + dirs[dir][0] * i;
                int ncol = v.col + dirs[dir][1] * i;
                // cout << "nrow = " << nrow << ", ncol = " << ncol << endl;
                if (nrow < 0 || nrow >= n || ncol < 0 || ncol >= m ||
                    data[nrow][ncol] == 'X')
                    break;
                if (!mark[step][nrow][ncol]) {
                    mark[step][nrow][ncol] = 1;
                    q.push((node){nrow, ncol, v.step + 1});
                }
            }
        }
        step++;
    }
    while (q.size()) {
        node v = q.front();
        q.pop();
        data[v.row][v.col] = '*';
    }
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cout << data[i][j];
        }
        cout << endl;
    }
    return 0;
}
