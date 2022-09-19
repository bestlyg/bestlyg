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

#define MAX 3005

int ans = 0, n, m, f[MAX][MAX], dirs[4][4] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}},
    startRow, startCol;
char data[MAX][MAX], ch;

void dfs(int row, int col) {
    // cout << "row = " << row << ", col = " << col << endl;
    if (f[row][col]) return;
    ans++;
    f[row][col] = 1;
    for (int i = 0; i < 4; i++) {
        int nrow = row + dirs[i][0];
        int ncol = col + dirs[i][1];
        // cout << "nrow = " << nrow << ", ncol = " << ncol << endl;
        if (nrow < 0 || ncol < 0 || nrow >= n || ncol >= m) continue;
        // cout << "data = " << data[nrow][ncol] << endl;
        if (data[nrow][ncol] == data[row][col]) continue;
        dfs(nrow, ncol);
    }
}

int main() {
    memset(data, 0, MAX * MAX * sizeof(char));
    memset(f, 0, MAX * MAX * sizeof(int));
    cin >> n >> m;
    // cout << "n = " << n << ", m = " << m << endl;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cin >> ch;
            data[i][j] = ch;
            // cout << "i = " << i << ", j = " << j << ", ch = " << ch << endl;
        }
    }
    cin >> startRow >> startCol;
    // cout << "startRow = " << startRow << ", startCol = " << startCol << endl;
    // for (int i = 0; i < n; i++) {
    //     for (int j = 0; j < m; j++) {
    //         cout << data[i][j];
    //     }
    //     cout << endl;
    // }
    dfs(startRow - 1, startCol - 1);
    cout << ans << endl;
    return 0;
}
