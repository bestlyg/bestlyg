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

struct node {
    int x, y;
};
int ans = 0, n, m, k, f[MAX][MAX], dirs[4][2] = {1, 0, -1, 0, 0, 1, 0, -1},
    startRow, startCol;
char data[MAX][MAX], ch;
stack<node> s;

void dfs(int row, int col) {
    // cout << "row = " << row << ", col = " << col << endl;
    if (f[row][col]) return;
    ans++;
    f[row][col] = 1;
    s.push((node){row, col});
    for (int i = 0; i < 4; i++) {
        int nrow = row + dirs[i][0];
        int ncol = col + dirs[i][1];
        // cout << "nrow = " << nrow << ", ncol = " << ncol << endl;
        if (nrow < 0 || ncol < 0 || nrow >= n || ncol >= m ||
            data[nrow][ncol] == data[row][col])
            continue;
        dfs(nrow, ncol);
    }
}

int main() {
    memset(data, 0, MAX * MAX * sizeof(char));
    memset(f, 0, MAX * MAX * sizeof(int));
    scanf("%d %d %d", &n, &m, &k);
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cin >> data[i][j];
        }
    }
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (f[i][j]) continue;
            ans = 0;
            dfs(i, j);
            while (s.size()) {
                node d = s.top();
                s.pop();
                f[d.x][d.y] = ans;
            }
        }
    }
    // for (int i = 0; i < n; i++) {
    //     for (int j = 0; j < m; j++) {
    //         cout << mmap[i][j] << ' ';
    //     }
    //     cout << endl;
    // }
    for (int i = 0; i < k; i++) {
        scanf("%d %d", &startRow, &startCol);
        printf("%d\n", f[startRow - 1][startCol - 1]);
    }
    return 0;
}
