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

#define MAX 200

struct node {
    int row, col;
};
int dirs[8][2] = {{-2, 1},  {-2, -1}, {2, -1}, {2, 1},
                  {-1, -2}, {1, -2},  {-1, 2}, {1, 2}};
char str[MAX][MAX];
int check[MAX][MAX];

int main() {
    memset(str, 0, sizeof(char) * MAX * MAX);
    memset(check, 0, sizeof(int) * MAX * MAX);
    int n, m;
    cin >> m >> n;
    queue<node> q;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cin >> str[i][j];
            if (str[i][j] == 'K') q.push((node){i, j});
        }
    }
    // for (int i = 0; i < n; i++) {
    //     for (int j = 0; j < m; j++) {
    //         cout << str[i][j] << ' ';
    //     }
    //     cout << endl;
    // }
    int ans = 0, size = 1;
    while (q.size()) {
        node data = q.front();
        if (str[data.row][data.col] == 'H') break;
        q.pop();
        for (int i = 0; i < 8; i++) {
            int nrow = data.row + dirs[i][0];
            int ncol = data.col + dirs[i][1];
            if (nrow < 0 || nrow >= n || ncol < 0 || ncol >= m ||
                check[nrow][ncol] || str[nrow][ncol] == '*')
                continue;
            q.push((node){nrow, ncol});
            check[nrow][ncol] = 1;
        }
        if (--size == 0) {
            ans++;
            size = q.size();
        }
    }
    cout << ans << endl;
    return 0;
}
