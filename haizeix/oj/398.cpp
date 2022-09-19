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

#define MAX 500

struct node {
    int row, col;
};
int dirs[8][2] = {{-2, 1},  {-2, -1}, {2, -1}, {2, 1},
                  {-1, -2}, {1, -2},  {-1, 2}, {1, 2}};
int str[MAX][MAX];
int check[MAX][MAX];

int main() {
    memset(str, 0, sizeof(char) * MAX * MAX);
    memset(check, 0, sizeof(int) * MAX * MAX);
    int n, m, srow, scol;
    cin >> n >> m >> srow >> scol;
    queue<node> q;
    str[srow - 1][scol - 1] = 1;
    q.push((node){srow - 1, scol - 1});
    int ans = 2, size = 1;
    while (q.size()) {
        node data = q.front();
        q.pop();
        for (int i = 0; i < 8; i++) {
            int nrow = data.row + dirs[i][0];
            int ncol = data.col + dirs[i][1];
            if (nrow < 0 || nrow >= n || ncol < 0 || ncol >= m ||
                str[nrow][ncol])
                continue;
            q.push((node){nrow, ncol});
            str[nrow][ncol] = ans;
            // cout << "nrow = " << nrow << ", ncol = " << ncol
            //      << ", str = " << str[nrow][ncol] << endl;
        }
        if (--size == 0) {
            ans++;
            size = q.size();
        }
    }
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (j != 0) cout << ' ';
            cout << str[i][j] - 1;
        }
        cout << endl;
    }

    return 0;
}
