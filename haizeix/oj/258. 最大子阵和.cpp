#include <iostream>

using namespace std;

int main() {
    int n, list[105][105] = {0}, ans = 0x80000000;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            cin >> list[i][j];
        }
    }
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            list[i][j] = list[i][j] + list[i - 1][j] + list[i][j - 1] - list[i - 1][j - 1];
        }
    }
    // for (int i = 1; i <= n; i++) {
    //     for (int j = 1; j <= n; j++) {
    //         cout << list[i][j] << ' ';
    //     }
    //     cout << endl;
    // }
    for (int row1 = 1; row1 <= n; row1++) {
        for (int row2 = row1; row2 <= n; row2++) {
            int prev = 0;
            for (int c = 1; c <= n; c++) {
                int sum = list[row2][c] - list[row1 - 1][c];
                ans = max(ans, sum - prev);
                prev = min(prev, sum);
            }
        }
    }
    cout << ans << endl;
    return 0;
}
