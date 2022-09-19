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

#define MAX 105
struct node {
    int row, col, step, d;
};
int dirs[4][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
char data[MAX][MAX];
int check[MAX][MAX][MAX];
queue<node> q;

int main() {
    memset(data, 0, sizeof(char) * MAX * MAX);
    memset(check, 0, sizeof(int) * MAX * MAX * MAX);
    int m, n, d;
    cin >> n >> m >> d;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cin >> data[i][j];
        }
    }
    // for (int i = 0; i < n; i++) {
    //     for (int j = 0; j < m; j++) {
    //         cout << data[i][j];
    //     }
    //     cout << endl;
    // }
    q.push((node){0, 0, 0, d});
    while (q.size()) {
        node v = q.front();
        q.pop();
        for (int i = 0; i < 4; i++) {
            for (int j = 2; j <= v.d; j++) {
                int nrow = v.row + dirs[i][0] * j;
                int ncol = v.col + dirs[i][1] * j;
                if (nrow < 0 || nrow >= n || ncol < 0 || ncol >= m) break;
                if (nrow == n - 1 && ncol == m - 1) {
                    cout << v.step + 1 << endl;
                    return 0;
                }
                if (check[nrow][ncol][v.d - j] || data[nrow][ncol] == 'L')
                    continue;
                check[nrow][ncol][v.d - j] = 1;
                q.push((node){nrow, ncol, v.step + 1, v.d - j});
            }
            int nrow = v.row + dirs[i][0];
            int ncol = v.col + dirs[i][1];
            if (nrow < 0 || nrow >= n || ncol < 0 || ncol >= m ||
                check[nrow][ncol][v.d] || data[nrow][ncol] == 'L')
                continue;
            if (nrow == n - 1 && ncol == m - 1) {
                cout << v.step + 1 << endl;
                return 0;
            }
            check[nrow][ncol][v.d] = 1;
            q.push((node){nrow, ncol, v.step + 1, v.d});
        }
    }
    cout << "impossible" << endl;
    return 0;
}
