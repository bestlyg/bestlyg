#include <algorithm>
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

#define MAX 1005

struct node {
    int row, col;
};
int dirs[4][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
char data[MAX][MAX];
int check[MAX][MAX];
queue<node> q;

int main() {
    memset(data, 0, sizeof(char) * MAX * MAX);
    memset(check, 0, sizeof(int) * MAX * MAX);
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cin >> data[i][j];
            if (data[i][j] == '1') {
                q.push((node){i, j});
                check[i][j] = 1;
            }
        }
    }
    // for (int i = 0; i < n; i++) {
    //     for (int j = 0; j < m; j++) {
    //         if (j != 0) cout << ' ';
    //         cout << data[i][j];
    //     }
    //     cout << endl;
    // }
    int ans = 2, size = q.size();
    while (q.size()) {
        node v = q.front();
        q.pop();
        for (int i = 0; i < 4; i++) {
            int nrow = v.row + dirs[i][0], ncol = v.col + dirs[i][1];
            if (nrow < 0 || nrow >= n || ncol < 0 || ncol >= m ||
                check[nrow][ncol])
                continue;
            // cout << "row = " << v.row << ", col = " << v.col
            //      << ", nrow = " << nrow << ", ncol = " << ncol << endl;
            check[nrow][ncol] = ans;
            q.push((node){nrow, ncol});
        }
        if (--size == 0) {
            size = q.size();
            ans++;
        }
    }
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (j != 0) cout << ' ';
            cout << check[i][j] - 1;
        }
        cout << endl;
    }
    return 0;
}
