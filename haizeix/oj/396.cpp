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

int nums[40][40], f[40][40], dirs[4][4] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}}, n;

void draw(int row, int col) {
    if (nums[row][col] != 2) return;
    nums[row][col] = 0;
    for (int i = 0; i < 4; i++) {
        int nextRow = row + dirs[i][0], nextCol = col + dirs[i][1];
        if (nextRow < 0 || nextCol < 0 || nextRow >= n || nextCol >= n)
            continue;
        draw(nextRow, nextCol);
    }
}

int main() {
    memset(nums, 0, sizeof(int) * 40 * 40);
    memset(f, 0, sizeof(int) * 40 * 40);
    int num;
    cin >> n;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cin >> num;
            if (num == 0) {
                nums[i][j] = 2;
            } else {
                nums[i][j] = 1;
            }
        }
    }
    // for (int i = 0; i < n; i++) {
    //     for (int j = 0; j < n; j++) {
    //         cout << nums[i][j] << ' ';
    //     }
    //     cout << endl;
    // }
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (i == 0 || j == 0 || i == n - 1 || j == n - 1) {
                draw(i, j);
            }
        }
    }
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (j != 0) cout << ' ';
            cout << nums[i][j];
        }
        cout << endl;
    }
    return 0;
}
