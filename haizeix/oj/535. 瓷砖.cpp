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

char str[60][60];
int dirs[4][4] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}}, ans = 1;
int nums[60][60];

void dfs(int row, int col) {
    for (int i = 0; i < 4; i++) {
        int nextRow = row + dirs[i][0], nextCol = col + dirs[i][1];
        if (nums[nextRow][nextCol] || str[nextRow][nextCol] != '.') continue;
        nums[nextRow][nextCol] = 1;
        ans++;
        dfs(nextRow, nextCol);
    }
}

int main() {
    memset(str, 0, sizeof(char) * 60 * 60);
    memset(nums, 0, sizeof(int) * 60 * 60);
    int h, w, row, col;
    char ch;
    cin >> w >> h;
    for (int i = 0; i < h + 2; i++) {
        int j = 0;
        for (; j < w + 2; j++) {
            str[i][j] = '#';
        }
    }
    for (int i = 1; i < h + 1; i++) {
        for (int j = 1; j < w + 1; j++) {
            cin >> ch;
            if (ch == '@') {
                row = i, col = j;
            }
            str[i][j] = ch;
        }
    }
    // for (int i = 0; i <= 1 + h; i++) {
    //     cout << str[i] << endl;
    // }
    dfs(row, col);
    cout << ans << endl;
    return 0;
}
