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

char str[120][120];
int dirs[4][4] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}}, ans = 0, cnt = 0;
int f[120][120];

void dfs(int row, int col) {
    // cout << "row = " << row << ", col = " << col << ", cnt = " << cnt <<
    // endl;
    if (f[row][col]) return;
    if (str[row][col] != '1') {
        ans = max(ans, cnt);
        return;
    }
    f[row][col] = 1;
    cnt++;
    for (int i = 0; i < 4; i++) {
        int nextRow = row + dirs[i][0];
        int nextCol = col + dirs[i][1];
        dfs(nextRow, nextCol);
    }
}

int main() {
    memset(str, 0, sizeof(char) * 120 * 120);
    memset(f, 0, sizeof(int) * 120 * 120);
    int n, m;
    cin >> n >> m;
    for (int i = 1; i < n + 1; i++) {
        for (int j = 1; j < m + 1; j++) {
            cin >> str[i][j];
            // cout << "i = " << i << ", j = " << j << ", val = " << str[i][j]
            //      << endl;
        }
    }
    // for (int i = 1; i < n + 1; i++) {
    //     for (int j = 1; j < m + 1; j++) {
    //         cout << str[i][j];
    //     }
    //     cout << endl;
    // }
    for (int i = 1; i < n + 2; i++) {
        for (int j = 1; j < m + 2; j++) {
            if (str[i][j] == '1') {
                cnt = 0;
                dfs(i, j);
            }
        }
    }
    cout << ans << endl;
    return 0;
}
